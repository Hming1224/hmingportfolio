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
        const guideGrid = document.querySelector('.cs-guide-list-grid');
        const guideCard = document.querySelector('.cs-guide-list-card');
        const guideTitle = guideCard?.querySelector('h4');
        const guideListItem = guideCard?.querySelector('.cs-guide-list-item');
        const guideMarker = guideCard?.querySelector('.cs-guide-list-marker');
        const guideDot = guideCard?.querySelector('.cs-guide-list-dot');
        const guideLine = guideCard?.querySelector('.cs-guide-list-line');
        const personaList = document.querySelector('.cs-persona-list');
        const personaCard = document.querySelector('.cs-persona-card');
        const personaCopy = personaCard?.querySelector('.cs-persona-copy');
        const personaTags = personaCard?.querySelector('.cs-persona-tags');
        const personaMedia = personaCard?.querySelector('.cs-zoomable-image');
        const videoList = document.querySelector('.cs-video-showcase-list');
        const videoCard = document.querySelector('.cs-video-showcase-card');
        const videoMedia = videoCard?.querySelector('.cs-video-showcase-media');
        const videoMeta = videoCard?.querySelector('.cs-video-showcase-meta');
        const video = videoCard?.querySelector('.cs-video-showcase-video');
        const videoCopy = videoCard?.querySelector('.cs-video-showcase-copy');
        const reflectionCard = document.querySelector('.cs-reflection-card');
        const reflectionNum = reflectionCard?.querySelector('.cs-reflection-card-num');
        const reflectionTitle = reflectionCard?.querySelector('.cs-reflection-card-title');
        const iterationList = document.querySelector('.cs-iteration-list');
        const iterationBoard = document.querySelector('.cs-iteration-board');
        const iterationHead = iterationBoard?.querySelector('.cs-iteration-head');
        const iterationBadge = iterationBoard?.querySelector('.cs-iteration-badge');
        const iterationTitle = iterationBoard?.querySelector('.cs-iteration-title');
        const iterationBody = iterationBoard?.querySelector('.cs-iteration-body');
        const iterationLabel = iterationBoard?.querySelector('.cs-iteration-label');
        const iterationCopy = iterationBoard?.querySelector('.cs-iteration-copy');
        const iterationCompare = iterationBoard?.querySelector('.cs-iteration-compare');
        const iterationPanel = iterationBoard?.querySelector('.cs-iteration-panel');
        const iterationCaption = iterationPanel?.querySelector('figcaption');
        const iterationPanelMedia = iterationPanel?.querySelector('.cs-iteration-panel-media');
        const iterationPanelImage = iterationPanel?.querySelector('.cs-iteration-panel-image');
        const iterationArrow = iterationBoard?.querySelector('.cs-iteration-arrow');
        const topicCardStyle = topicCard ? getComputedStyle(topicCard) : null;
        const topicKickerStyle = topicKicker ? getComputedStyle(topicKicker) : null;
        const topicArtStyle = topicArt ? getComputedStyle(topicArt) : null;
        const articleStyle = article ? getComputedStyle(article) : null;
        const articleHeadingStyle = articleHeading ? getComputedStyle(articleHeading) : null;
        const articleNumStyle = articleNum ? getComputedStyle(articleNum) : null;
        const richCopyStyle = richCopy ? getComputedStyle(richCopy) : null;
        const guideGridStyle = guideGrid ? getComputedStyle(guideGrid) : null;
        const guideCardStyle = guideCard ? getComputedStyle(guideCard) : null;
        const guideTitleStyle = guideTitle ? getComputedStyle(guideTitle) : null;
        const guideListItemStyle = guideListItem ? getComputedStyle(guideListItem) : null;
        const guideMarkerStyle = guideMarker ? getComputedStyle(guideMarker) : null;
        const guideDotStyle = guideDot ? getComputedStyle(guideDot) : null;
        const guideLineStyle = guideLine ? getComputedStyle(guideLine) : null;
        const personaListStyle = personaList ? getComputedStyle(personaList) : null;
        const personaCardStyle = personaCard ? getComputedStyle(personaCard) : null;
        const personaCopyStyle = personaCopy ? getComputedStyle(personaCopy) : null;
        const personaTagsStyle = personaTags ? getComputedStyle(personaTags) : null;
        const personaMediaStyle = personaMedia ? getComputedStyle(personaMedia) : null;
        const videoListStyle = videoList ? getComputedStyle(videoList) : null;
        const videoCardStyle = videoCard ? getComputedStyle(videoCard) : null;
        const videoMediaStyle = videoMedia ? getComputedStyle(videoMedia) : null;
        const videoMetaStyle = videoMeta ? getComputedStyle(videoMeta) : null;
        const videoStyle = video ? getComputedStyle(video) : null;
        const videoCopyStyle = videoCopy ? getComputedStyle(videoCopy) : null;
        const reflectionCardStyle = reflectionCard ? getComputedStyle(reflectionCard) : null;
        const reflectionNumStyle = reflectionNum ? getComputedStyle(reflectionNum) : null;
        const reflectionTitleStyle = reflectionTitle ? getComputedStyle(reflectionTitle) : null;
        const iterationListStyle = iterationList ? getComputedStyle(iterationList) : null;
        const iterationBoardStyle = iterationBoard ? getComputedStyle(iterationBoard) : null;
        const iterationHeadStyle = iterationHead ? getComputedStyle(iterationHead) : null;
        const iterationBadgeStyle = iterationBadge ? getComputedStyle(iterationBadge) : null;
        const iterationTitleStyle = iterationTitle ? getComputedStyle(iterationTitle) : null;
        const iterationBodyStyle = iterationBody ? getComputedStyle(iterationBody) : null;
        const iterationLabelStyle = iterationLabel ? getComputedStyle(iterationLabel) : null;
        const iterationCopyStyle = iterationCopy ? getComputedStyle(iterationCopy) : null;
        const iterationCompareStyle = iterationCompare ? getComputedStyle(iterationCompare) : null;
        const iterationPanelStyle = iterationPanel ? getComputedStyle(iterationPanel) : null;
        const iterationCaptionStyle = iterationCaption ? getComputedStyle(iterationCaption) : null;
        const iterationPanelMediaStyle = iterationPanelMedia ? getComputedStyle(iterationPanelMedia) : null;
        const iterationPanelImageStyle = iterationPanelImage ? getComputedStyle(iterationPanelImage) : null;
        const iterationArrowStyle = iterationArrow ? getComputedStyle(iterationArrow) : null;
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
            article: document.querySelectorAll('.laushu-article, .laushu-kicker, .laushu-article-num, .laushu-copy').length,
            guide: document.querySelectorAll('.laushu-guide-grid, .laushu-guide-card, .laushu-guide-marker, .laushu-guide-dot, .laushu-guide-line, .laushu-guide-item').length,
            persona: document.querySelectorAll('.laushu-persona-list, .laushu-persona, .laushu-persona-copy, .laushu-persona-tags').length,
            videoShowcase: document.querySelectorAll('.laushu-demo-list, .laushu-demo-card, .laushu-demo-media-wrap, .laushu-demo-media, .laushu-demo-meta, .laushu-demo-video, .laushu-demo-copy').length,
            reflection: document.querySelectorAll('.laushu-learning-card, .laushu-learning-num, .laushu-learning-title').length,
            iteration: document.querySelectorAll('.laushu-iter-list, .laushu-iter-board, .laushu-iter-head, .laushu-iter-badge, .laushu-iter-title, .laushu-iter-body, .laushu-iter-label, .laushu-iter-paras, .laushu-iter-compare, .laushu-iter-frame, .laushu-iter-media, .laushu-iter-card, .laushu-iter-arrow').length
          },
          counts: {
            topicCard: document.querySelectorAll('.cs-topic-card').length,
            topicCardKicker: document.querySelectorAll('.cs-topic-card-kicker').length,
            topicCardIllustrated: document.querySelectorAll('.cs-topic-card--illustrated').length,
            topicCardArt: document.querySelectorAll('.cs-topic-card-art').length,
            article: document.querySelectorAll('.cs-article').length,
            articleNum: document.querySelectorAll('.cs-article-num').length,
            richCopy: document.querySelectorAll('.cs-rich-copy').length,
            guideGrid: document.querySelectorAll('.cs-guide-list-grid').length,
            guideCard: document.querySelectorAll('.cs-guide-list-card').length,
            guideListItem: document.querySelectorAll('.cs-guide-list-item').length,
            guideMarker: document.querySelectorAll('.cs-guide-list-marker').length,
            guideDot: document.querySelectorAll('.cs-guide-list-dot').length,
            guideLine: document.querySelectorAll('.cs-guide-list-line').length,
            personaList: document.querySelectorAll('.cs-persona-list').length,
            personaCard: document.querySelectorAll('.cs-persona-card').length,
            personaCopy: document.querySelectorAll('.cs-persona-copy').length,
            personaTags: document.querySelectorAll('.cs-persona-tags').length,
            videoShowcaseList: document.querySelectorAll('.cs-video-showcase-list').length,
            videoShowcaseCard: document.querySelectorAll('.cs-video-showcase-card').length,
            videoShowcaseMedia: document.querySelectorAll('.cs-video-showcase-media').length,
            videoShowcaseMeta: document.querySelectorAll('.cs-video-showcase-meta').length,
            videoShowcaseVideo: document.querySelectorAll('.cs-video-showcase-video').length,
            videoShowcaseCopy: document.querySelectorAll('.cs-video-showcase-copy').length,
            reflectionCard: document.querySelectorAll('.cs-reflection-card').length,
            reflectionNum: document.querySelectorAll('.cs-reflection-card-num').length,
            reflectionTitle: document.querySelectorAll('.cs-reflection-card-title').length,
            iterationList: document.querySelectorAll('.cs-iteration-list').length,
            iterationBoard: document.querySelectorAll('.cs-iteration-board').length,
            iterationHead: document.querySelectorAll('.cs-iteration-head').length,
            iterationBadge: document.querySelectorAll('.cs-iteration-badge').length,
            iterationTitle: document.querySelectorAll('.cs-iteration-title').length,
            iterationBody: document.querySelectorAll('.cs-iteration-body').length,
            iterationLabel: document.querySelectorAll('.cs-iteration-label').length,
            iterationCopy: document.querySelectorAll('.cs-iteration-copy').length,
            iterationCompare: document.querySelectorAll('.cs-iteration-compare').length,
            iterationPanel: document.querySelectorAll('.cs-iteration-panel').length,
            iterationPanelMedia: document.querySelectorAll('.cs-iteration-panel-media').length,
            iterationPanelImage: document.querySelectorAll('.cs-iteration-panel-image').length,
            iterationArrow: document.querySelectorAll('.cs-iteration-arrow').length
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
          },
          guide: guideGrid && guideCard && guideTitle && guideListItem && guideMarker && guideDot && guideLine && {
            gridDisplay: guideGridStyle.display,
            gridColumns: guideGridStyle.gridTemplateColumns,
            cardPadding: guideCardStyle.padding,
            cardRadius: guideCardStyle.borderRadius,
            cardOverflow: guideCardStyle.overflow,
            cardShadow: guideCardStyle.boxShadow,
            titleBg: guideTitleStyle.backgroundImage,
            titleWeight: guideTitleStyle.fontWeight,
            titleWhiteSpace: guideTitleStyle.whiteSpace,
            itemDisplay: guideListItemStyle.display,
            markerDisplay: guideMarkerStyle.display,
            dotWidth: guideDotStyle.width,
            dotBg: guideDotStyle.backgroundColor,
            lineDisplay: guideLineStyle.display,
            lineWidth: guideLineStyle.width
          },
          persona: personaList && personaCard && personaCopy && personaTags && personaMedia && {
            listDisplay: personaListStyle.display,
            cardDisplay: personaCardStyle.display,
            cardColumns: personaCardStyle.gridTemplateColumns,
            cardPadding: personaCardStyle.padding,
            cardRadius: personaCardStyle.borderRadius,
            cardBg: personaCardStyle.backgroundColor,
            cardShadow: personaCardStyle.boxShadow,
            copyAlignSelf: personaCopyStyle.alignSelf,
            tagsDisplay: personaTagsStyle.display,
            tagsColor: personaTagsStyle.color,
            mediaOrder: personaMediaStyle.order,
            mediaRadius: personaMediaStyle.borderRadius
          },
          videoShowcase: videoList && videoCard && videoMedia && videoMeta && video && videoCopy && {
            listDisplay: videoListStyle.display,
            cardDisplay: videoCardStyle.display,
            cardColumns: videoCardStyle.gridTemplateColumns,
            cardRadius: videoCardStyle.borderRadius,
            cardOverflow: videoCardStyle.overflow,
            mediaPosition: videoMediaStyle.position,
            mediaAspectRatio: videoMediaStyle.aspectRatio,
            metaPosition: videoMetaStyle.position,
            metaDisplay: videoMetaStyle.display,
            videoDisplay: videoStyle.display,
            videoObjectFit: videoStyle.objectFit,
            copyDisplay: videoCopyStyle.display
          },
          reflection: reflectionCard && reflectionNum && reflectionTitle && {
            cardAlignItems: reflectionCardStyle.alignItems,
            cardRadius: reflectionCardStyle.borderRadius,
            numDisplay: reflectionNumStyle.display,
            numRadius: reflectionNumStyle.borderRadius,
            numWeight: reflectionNumStyle.fontWeight,
            titleWeight: reflectionTitleStyle.fontWeight,
            titleLineHeight: reflectionTitleStyle.lineHeight
          },
          iteration: iterationList && iterationBoard && iterationHead && iterationBadge && iterationTitle && iterationBody && iterationLabel && iterationCopy && iterationCompare && iterationPanel && iterationCaption && iterationPanelMedia && iterationPanelImage && iterationArrow && {
            listDisplay: iterationListStyle.display,
            boardDisplay: iterationBoardStyle.display,
            boardRadius: iterationBoardStyle.borderRadius,
            boardPadding: iterationBoardStyle.padding,
            headDisplay: iterationHeadStyle.display,
            badgeDisplay: iterationBadgeStyle.display,
            badgeRadius: iterationBadgeStyle.borderRadius,
            badgeWeight: iterationBadgeStyle.fontWeight,
            titleWeight: iterationTitleStyle.fontWeight,
            bodyDisplay: iterationBodyStyle.display,
            bodyColumns: iterationBodyStyle.gridTemplateColumns,
            labelWeight: iterationLabelStyle.fontWeight,
            copyDisplay: iterationCopyStyle.display,
            compareDisplay: iterationCompareStyle.display,
            compareDirection: iterationCompareStyle.flexDirection,
            panelPosition: iterationPanelStyle.position,
            panelRadius: iterationPanelStyle.borderRadius,
            panelOverflow: iterationPanelStyle.overflow,
            captionDisplay: iterationCaptionStyle.display,
            captionWeight: iterationCaptionStyle.fontWeight,
            mediaDisplay: iterationPanelMediaStyle.display,
            imageDisplay: iterationPanelImageStyle.display,
            arrowPosition: iterationArrowStyle.position,
            arrowTransform: iterationArrowStyle.transform
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
    result.oldCounts.guide !== 0 ||
    result.oldCounts.persona !== 0 ||
    result.oldCounts.videoShowcase !== 0 ||
    result.oldCounts.reflection !== 0 ||
    result.oldCounts.iteration !== 0 ||
    result.counts.topicCard !== 13 ||
    result.counts.topicCardKicker !== 7 ||
    result.counts.topicCardIllustrated !== 3 ||
    result.counts.topicCardArt !== 3 ||
    result.counts.article !== 10 ||
    result.counts.articleNum !== 10 ||
    result.counts.richCopy !== 10 ||
    result.counts.guideGrid !== 1 ||
    result.counts.guideCard !== 3 ||
    result.counts.guideListItem !== 6 ||
    result.counts.guideMarker !== 6 ||
    result.counts.guideDot !== 6 ||
    result.counts.guideLine !== 6 ||
    result.counts.personaList !== 1 ||
    result.counts.personaCard !== 3 ||
    result.counts.personaCopy !== 3 ||
    result.counts.personaTags !== 3 ||
    result.counts.videoShowcaseList !== 1 ||
    result.counts.videoShowcaseCard !== 3 ||
    result.counts.videoShowcaseMedia !== 3 ||
    result.counts.videoShowcaseMeta !== 3 ||
    result.counts.videoShowcaseVideo !== 3 ||
    result.counts.videoShowcaseCopy !== 3 ||
    result.counts.reflectionCard !== 3 ||
    result.counts.reflectionNum !== 3 ||
    result.counts.reflectionTitle !== 3 ||
    result.counts.iterationList !== 1 ||
    result.counts.iterationBoard !== 6 ||
    result.counts.iterationHead !== 6 ||
    result.counts.iterationBadge !== 6 ||
    result.counts.iterationTitle !== 6 ||
    result.counts.iterationBody !== 6 ||
    result.counts.iterationLabel !== 6 ||
    result.counts.iterationCopy !== 6 ||
    result.counts.iterationCompare !== 6 ||
    result.counts.iterationPanel !== 12 ||
    result.counts.iterationPanelMedia !== 12 ||
    result.counts.iterationPanelImage !== 12 ||
    result.counts.iterationArrow !== 6 ||
    result.topicCard?.radius !== "16px" ||
    !["flex", "inline-flex"].includes(result.topicKicker?.display) ||
    result.topicKicker?.fontWeight !== "700" ||
    result.topicArt?.display !== "flex" ||
    result.article?.titleWeight !== "800" ||
    result.guide?.gridDisplay !== "grid" ||
    result.guide?.cardRadius !== "18px" ||
    result.guide?.cardOverflow !== "hidden" ||
    result.guide?.titleWeight !== "800" ||
    result.guide?.itemDisplay !== "flex" ||
    result.guide?.markerDisplay !== "flex" ||
    result.guide?.dotWidth !== "10px" ||
    result.guide?.lineWidth !== "1px" ||
    result.persona?.listDisplay !== "grid" ||
    result.persona?.cardDisplay !== "grid" ||
    result.persona?.cardRadius !== "16px" ||
    result.persona?.tagsDisplay !== "block" ||
    result.videoShowcase?.listDisplay !== "grid" ||
    result.videoShowcase?.cardDisplay !== "grid" ||
    result.videoShowcase?.cardRadius !== "16px" ||
    result.videoShowcase?.cardOverflow !== "hidden" ||
    result.videoShowcase?.mediaPosition !== "relative" ||
    result.videoShowcase?.metaPosition !== "absolute" ||
    result.videoShowcase?.metaDisplay !== "flex" ||
    result.videoShowcase?.videoDisplay !== "block" ||
    result.videoShowcase?.videoObjectFit !== "cover" ||
    result.videoShowcase?.copyDisplay !== "flex" ||
    result.reflection?.cardAlignItems !== "flex-start" ||
    result.reflection?.cardRadius !== "16px" ||
    !["inline-flex", "flex"].includes(result.reflection?.numDisplay) ||
    result.reflection?.numWeight !== "800" ||
    result.reflection?.titleWeight !== "800" ||
    result.iteration?.listDisplay !== "flex" ||
    result.iteration?.boardDisplay !== "flex" ||
    result.iteration?.boardRadius !== "20px" ||
    result.iteration?.headDisplay !== "flex" ||
    result.iteration?.badgeRadius !== "999px" ||
    result.iteration?.badgeWeight !== "600" ||
    result.iteration?.titleWeight !== "800" ||
    result.iteration?.bodyDisplay !== "grid" ||
    result.iteration?.labelWeight !== "800" ||
    result.iteration?.copyDisplay !== "flex" ||
    result.iteration?.compareDisplay !== "flex" ||
    result.iteration?.panelPosition !== "relative" ||
    result.iteration?.panelRadius !== "16px" ||
    result.iteration?.panelOverflow !== "hidden" ||
    result.iteration?.captionDisplay !== "flex" ||
    result.iteration?.captionWeight !== "700" ||
    result.iteration?.mediaDisplay !== "flex" ||
    result.iteration?.imageDisplay !== "block" ||
    result.iteration?.arrowPosition !== "relative" ||
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
