import { chromium } from "playwright";
import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = process.env.BRAND_FILM_BASE_URL ?? "http://127.0.0.1:3000";
const captureDir = path.join(root, "docs/brand-film/assets/captures");
const clipDir = path.join(root, "docs/brand-film/assets/clips");

await fs.mkdir(captureDir, { recursive: true });
await fs.mkdir(clipDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function ready(page, route) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1100);
}

async function screenshot(page, name, options = {}) {
  const file = path.join(captureDir, name);
  await page.screenshot({ path: file, type: "jpeg", quality: 94, ...options });
  return file;
}

async function scrollIntoShot(page, selector, offset = -96) {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: "visible" });
  await locator.scrollIntoViewIfNeeded();
  await page.evaluate((y) => window.scrollBy({ top: y, behavior: "instant" }), offset);
  await page.waitForTimeout(650);
}

const desktop = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
  colorScheme: "light",
  reducedMotion: "no-preference",
});
const page = await desktop.newPage();

await ready(page, "/en");
await screenshot(page, "BF_02_home-hero_default_1920x1080.jpg");

await scrollIntoShot(page, "#projects", -64);
await screenshot(page, "BF_01_home-selected-work_1920x1080.jpg");

await ready(page, "/en/advantech");
await scrollIntoShot(page, "#cs-sec-solution", -88);
await screenshot(page, "BF_03_advantech_solution-entry_1920x1080.jpg");
await scrollIntoShot(page, ".cs-sol-fgroup-f11", -72);
await screenshot(page, "BF_03_advantech_demand-analysis_1920x1080.jpg");

await ready(page, "/en/crypto-arsenal");
await scrollIntoShot(page, "#cs-sec-final", -80);
await screenshot(page, "BF_04_crypto-final-flows_1920x1080.jpg");

await ready(page, "/en");
await scrollIntoShot(page, "#projects", -64);
await scrollIntoShot(page, "#project3", -168);
await screenshot(page, "BF_05_web3-project-card_1920x1080.jpg");

await ready(page, "/en/design-system");
await screenshot(page, "BF_06_design-system-hero_1920x1080.jpg");
await ready(page, "/en/design-system#tokens");
const tokenReference = page.locator("#token-reference");
await tokenReference.waitFor({ state: "visible" });
await tokenReference.scrollIntoViewIfNeeded();
await page.evaluate(() => window.scrollBy({ top: -120, behavior: "instant" }));
await page.waitForTimeout(700);
await screenshot(page, "BF_06_design-system-tokens_1920x1080.jpg");

const css = await fs.readFile(path.join(root, "styles/tokens.css"), "utf8");
const lines = css.split("\n").slice(0, 38).join("\n");
const escaped = lines
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");
await page.setContent(`<!doctype html><html><head><style>
  * { box-sizing: border-box; }
  body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: #18181b; color: #e4e4e7; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  .bar { height: 64px; display: flex; align-items: center; gap: 10px; padding: 0 28px; background: #27272a; color: #a1a1aa; font: 15px/1 Space Grotesk, sans-serif; }
  .dot { width: 13px; height: 13px; border-radius: 50%; background: #52525b; }
  .name { margin-left: 14px; }
  pre { margin: 0; padding: 34px 56px; font-size: 23px; line-height: 1.55; white-space: pre-wrap; }
  .accent { position: absolute; inset: 64px auto 0 0; width: 4px; background: #5d62d8; }
</style></head><body><div class="bar"><i class="dot"></i><i class="dot"></i><i class="dot"></i><span class="name">styles/tokens.css</span></div><div class="accent"></div><pre>${escaped}</pre></body></html>`);
await screenshot(page, "BF_06_code-tokens_1920x1080.jpg");

await desktop.close();

const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  colorScheme: "light",
});
const mobilePage = await mobile.newPage();
await ready(mobilePage, "/en");
await screenshot(mobilePage, "BF_06_home-mobile_390x844.jpg");
await mobile.close();

async function record(name, route, action) {
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    colorScheme: "light",
    recordVideo: { dir: clipDir, size: { width: 1920, height: 1080 } },
  });
  const clipPage = await context.newPage();
  await ready(clipPage, route);
  await action(clipPage);
  const video = clipPage.video();
  const output = path.join(clipDir, name);
  const save = video.saveAs(output);
  await context.close();
  await save;
  const original = await video.path();
  if (original !== output) await fs.unlink(original);
}

await record("BF_02_home-hero_labels_raw.webm", "/en", async (clipPage) => {
  const labels = [".hero-cursor-brian", ".hero-cursor-pm", ".hero-cursor-engineers"];
  for (const selector of labels) {
    const box = await clipPage.locator(selector).boundingBox();
    if (box) await clipPage.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 18 });
    await clipPage.waitForTimeout(420);
  }
  await clipPage.waitForTimeout(650);
});

await record("BF_03_advantech_solution-scroll_raw.webm", "/en/advantech", async (clipPage) => {
  await scrollIntoShot(clipPage, "#cs-sec-solution", -88);
  await clipPage.waitForTimeout(700);
  await clipPage.mouse.wheel(0, 920);
  await clipPage.waitForTimeout(1000);
  await clipPage.mouse.wheel(0, 980);
  await clipPage.waitForTimeout(1000);
});

await record("BF_05_web3-card_raw.webm", "/en", async (clipPage) => {
  await scrollIntoShot(clipPage, "#projects", -64);
  await scrollIntoShot(clipPage, "#project3", -168);
  const card = clipPage.locator("#project3");
  const box = await card.boundingBox();
  if (box) await clipPage.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.55, { steps: 24 });
  await clipPage.waitForTimeout(900);
});

await record("BF_06_design-system-scroll_raw.webm", "/en/design-system#tokens", async (clipPage) => {
  await clipPage.waitForTimeout(500);
  await clipPage.mouse.wheel(0, 920);
  await clipPage.waitForTimeout(900);
  await clipPage.mouse.wheel(0, 920);
  await clipPage.waitForTimeout(900);
});

await browser.close();

const outputs = [
  ...(await fs.readdir(captureDir)).map((name) => `captures/${name}`),
  ...(await fs.readdir(clipDir)).map((name) => `clips/${name}`),
].sort();

await fs.writeFile(
  path.join(root, "docs/brand-film/assets/manifest.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), baseUrl, outputs }, null, 2)}\n`,
  "utf8",
);

console.log(`Generated ${outputs.length} brand-film assets.`);
