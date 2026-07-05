import { expect, type Page } from "@playwright/test";

export const viewports = {
  desktop: { width: 1440, height: 1200 },
  tablet: { width: 1024, height: 1000 },
  narrow: { width: 768, height: 1000 },
  mobile: { width: 390, height: 900 },
} as const;

export type ConsoleErrors = string[];

export function collectConsoleErrors(page: Page) {
  const errors: ConsoleErrors = [];

  page.on("console", (message) => {
    if (message.type() !== "error") return;
    errors.push(message.text());
  });

  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  return errors;
}

export function expectNoConsoleErrors(errors: ConsoleErrors) {
  expect(errors, `Console errors:\n${errors.join("\n")}`).toHaveLength(0);
}

// knownIssueBudgetPx: temporary allowance for a documented, pre-existing overflow
// bug awaiting its own fix task. Never raise a budget to silence a new failure —
// a new overflow on a route without a budget is a real regression.
export async function expectNoHorizontalOverflow(page: Page, knownIssueBudgetPx = 0) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return Math.max(0, doc.scrollWidth - doc.clientWidth);
  });

  expect(
    overflow,
    `Horizontal overflow ${overflow}px exceeds allowed ${knownIssueBudgetPx}px at ${page.url()}`,
  ).toBeLessThanOrEqual(knownIssueBudgetPx);
}

export async function expectNot404(page: Page, status?: number | null) {
  if (status !== null && status !== undefined) {
    expect(status, `Unexpected response status at ${page.url()}`).toBeLessThan(400);
  }

  await expect(page.locator("main").first()).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/404|This page could not be found|找不到/i);
}

export async function expectNavbarDesignSystemLink(page: Page) {
  await expect(page.locator(".site-nav a", { hasText: /Design System|設計系統/ }).first()).toHaveCount(1);
}

export async function setViewport(page: Page, width: keyof typeof viewports | number) {
  if (typeof width === "number") {
    await page.setViewportSize({ width, height: width <= 430 ? 900 : 1100 });
    return;
  }

  await page.setViewportSize(viewports[width]);
}

export async function gotoAndWait(page: Page, route: string) {
  const response = await page.goto(route, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible" });
  // Best-effort settle. Must be bounded: with no timeout this await never
  // rejects, and on deployed URLs analytics beacons keep the network busy
  // forever — the test then silently burns its whole 60s budget here.
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => undefined);
  return response;
}

export async function basicPageSmoke(page: Page, route: string, knownOverflowBudgetPx = 0) {
  const errors = collectConsoleErrors(page);
  const response = await gotoAndWait(page, route);

  await expectNot404(page, response?.status());
  await expectNoHorizontalOverflow(page, knownOverflowBudgetPx);
  await expectNavbarDesignSystemLink(page);
  expectNoConsoleErrors(errors);
}

export async function openDesignSystemDoc(page: Page, route: string) {
  const response = await gotoAndWait(page, route);
  await expectNot404(page, response?.status());
  await page.locator("article").first().waitFor({ state: "visible" });
  return response;
}

export async function expectElementDoesNotOverflowViewport(page: Page, selector: string) {
  const box = await page.locator(selector).first().boundingBox();
  expect(box, `${selector} should be visible`).not.toBeNull();
  if (!box) return;

  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  if (!viewport) return;

  expect(Math.ceil(box.x + box.width)).toBeLessThanOrEqual(viewport.width);
  expect(Math.floor(box.x)).toBeGreaterThanOrEqual(0);
}
