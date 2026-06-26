import { spawn } from "node:child_process";
import { readFile, rm } from "node:fs/promises";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = "http://localhost:3000/zh-TW/laushu";
const userDataDir = `/private/tmp/hming-laushu-primitives-cdp-${process.pid}-${Date.now()}`;
const viewports = [
  [1440, 1000],
  [390, 900],
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(targetUrl) {
  const res = await fetch(targetUrl);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${targetUrl}`);
  return res.json();
}

async function connect(wsUrl, onEvent) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(new Error(JSON.stringify(data.error)));
      else resolve(data.result);
    }
    onEvent?.(data);
  });

  return {
    send(method, params = {}) {
      const messageId = ++id;
      ws.send(JSON.stringify({ id: messageId, method, params }));
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          pending.delete(messageId);
          reject(new Error(`CDP timeout: ${method}`));
        }, 15000);
        pending.set(messageId, {
          resolve: (value) => {
            clearTimeout(timeout);
            resolve(value);
          },
          reject: (error) => {
            clearTimeout(timeout);
            reject(error);
          },
        });
      });
    },
    close() {
      ws.close();
    },
  };
}

const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "--remote-debugging-port=0",
  `--user-data-dir=${userDataDir}`,
  "about:blank",
], { stdio: "ignore" });

try {
  let remoteDebuggingPort;
  let version;
  for (let i = 0; i < 50; i += 1) {
    try {
      if (!remoteDebuggingPort) {
        const activePort = await readFile(`${userDataDir}/DevToolsActivePort`, "utf8");
        remoteDebuggingPort = activePort.split(/\r?\n/)[0];
      }
      version = await fetchJson(`http://127.0.0.1:${remoteDebuggingPort}/json/version`);
      break;
    } catch {
      await wait(100);
    }
  }
  if (!version?.webSocketDebuggerUrl) throw new Error("Chrome CDP did not start");

  const browser = await connect(version.webSocketDebuggerUrl);
  const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
  const targets = await fetchJson(`http://127.0.0.1:${remoteDebuggingPort}/json/list`);
  const target = targets.find((item) => item.id === targetId);
  const pageErrors = [];
  const page = await connect(target.webSocketDebuggerUrl, (event) => {
    if (event.method === "Runtime.exceptionThrown") pageErrors.push(event.params);
    if (event.method === "Log.entryAdded" && event.params?.entry?.level === "error") pageErrors.push(event.params.entry);
    if (event.method === "Runtime.consoleAPICalled" && ["error", "assert"].includes(event.params?.type)) pageErrors.push(event.params);
  });

  await page.send("Page.enable");
  await page.send("Runtime.enable");
  await page.send("Log.enable");

  const results = [];
  for (const [width, height] of viewports) {
    pageErrors.length = 0;
    await page.send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });
    await page.send("Page.navigate", { url });
    await wait(2500);
    const { result } = await page.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const doc = document.documentElement;
        const topicCard = document.querySelector('.cs-topic-card');
        const topicKicker = document.querySelector('.cs-topic-card-kicker');
        const topicArt = document.querySelector('.cs-topic-card-art');
        const article = document.querySelector('.cs-article');
        const articleHeading = article?.querySelector('h3');
        const articleNum = article?.querySelector('.cs-article-num');
        const richCopy = article?.querySelector('.cs-rich-copy');
        const topicCardStyle = topicCard ? getComputedStyle(topicCard) : null;
        const topicKickerStyle = topicKicker ? getComputedStyle(topicKicker) : null;
        const topicArtStyle = topicArt ? getComputedStyle(topicArt) : null;
        const articleStyle = article ? getComputedStyle(article) : null;
        const articleHeadingStyle = articleHeading ? getComputedStyle(articleHeading) : null;
        const articleNumStyle = articleNum ? getComputedStyle(articleNum) : null;
        const richCopyStyle = richCopy ? getComputedStyle(richCopy) : null;
        const overflowNodes = [...document.querySelectorAll('body *')].filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1);
        }).map((el) => ({
          tag: el.tagName,
          className: String(el.className),
          left: Math.round(el.getBoundingClientRect().left),
          right: Math.round(el.getBoundingClientRect().right),
          width: Math.round(el.getBoundingClientRect().width)
        })).slice(0, 8);
        return {
          viewport: window.innerWidth + 'x' + window.innerHeight,
          overflowX: doc.scrollWidth - doc.clientWidth,
          overflowCount: overflowNodes.length,
          overflowNodes,
          oldCounts: {
            topicCard: document.querySelectorAll('.laushu-info-card, .laushu-info-card--illustrated, .laushu-info-card-art').length,
            article: document.querySelectorAll('.laushu-article, .laushu-kicker, .laushu-article-num, .laushu-copy').length
          },
          counts: {
            topicCard: document.querySelectorAll('.cs-topic-card').length,
            topicCardKicker: document.querySelectorAll('.cs-topic-card-kicker').length,
            topicCardIllustrated: document.querySelectorAll('.cs-topic-card--illustrated').length,
            topicCardArt: document.querySelectorAll('.cs-topic-card-art').length,
            article: document.querySelectorAll('.cs-article').length,
            articleNum: document.querySelectorAll('.cs-article-num').length,
            richCopy: document.querySelectorAll('.cs-rich-copy').length
          },
          topicCard: topicCard && {
            padding: topicCardStyle.padding,
            minHeight: topicCardStyle.minHeight,
            radius: topicCardStyle.borderRadius,
            border: topicCardStyle.borderTopColor,
            shadow: topicCardStyle.boxShadow
          },
          topicKicker: topicKicker && {
            display: topicKickerStyle.display,
            bg: topicKickerStyle.backgroundColor,
            color: topicKickerStyle.color,
            fontWeight: topicKickerStyle.fontWeight
          },
          topicArt: topicArt && {
            display: topicArtStyle.display,
            width: topicArtStyle.width,
            height: topicArtStyle.height,
            radius: topicArtStyle.borderRadius
          },
          article: article && articleHeading && richCopy && {
            maxWidth: articleStyle.maxWidth,
            titleColor: articleHeadingStyle.color,
            titleWeight: articleHeadingStyle.fontWeight,
            numColor: articleNumStyle?.color,
            copyColor: richCopyStyle.color,
            copyLineHeight: richCopyStyle.lineHeight
          }
        };
      })()`,
    });

    results.push({
      ...result.value,
      consoleErrors: pageErrors.length,
      firstError:
        pageErrors[0]?.exceptionDetails?.exception?.description ||
        pageErrors[0]?.exceptionDetails?.text ||
        pageErrors[0]?.args?.[0]?.value ||
        pageErrors[0]?.text ||
        null,
    });
  }

  const failed = results.some((result) => (
    result.overflowX !== 0 ||
    result.oldCounts.topicCard !== 0 ||
    result.oldCounts.article !== 0 ||
    result.counts.topicCard !== 13 ||
    result.counts.topicCardKicker !== 7 ||
    result.counts.topicCardIllustrated !== 3 ||
    result.counts.topicCardArt !== 3 ||
    result.counts.article !== 10 ||
    result.counts.articleNum !== 10 ||
    result.counts.richCopy !== 10 ||
    result.topicCard?.radius !== "16px" ||
    !["flex", "inline-flex"].includes(result.topicKicker?.display) ||
    result.topicKicker?.fontWeight !== "700" ||
    result.topicArt?.display !== "flex" ||
    result.article?.titleWeight !== "800" ||
    result.consoleErrors !== 0
  ));

  console.log(JSON.stringify(results, null, 2));
  if (failed) process.exitCode = 1;

  page.close();
  browser.close();
} finally {
  chrome.kill("SIGTERM");
  await rm(userDataDir, { recursive: true, force: true }).catch(() => {});
}
