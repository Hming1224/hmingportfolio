import { expect, test } from "@playwright/test";
import {
  basicPageSmoke,
  collectConsoleErrors,
  expectElementDoesNotOverflowViewport,
  expectNoConsoleErrors,
  expectNoHorizontalOverflow,
  gotoAndWait,
  setViewport,
} from "./helpers";

const routes = [
  "/",
  "/en",
  "/zh-TW",
  "/en/about-me",
  "/zh-TW/about-me",
  "/en/advantech",
  "/zh-TW/advantech",
  "/en/crypto-arsenal",
  "/zh-TW/crypto-arsenal",
  "/en/laushu",
  "/zh-TW/laushu",
];

test.describe("site route regression", () => {
  for (const route of routes) {
    for (const width of [1440, 390]) {
      test(`${route} basic smoke at ${width}px`, async ({ page }) => {
        await setViewport(page, width);
        await basicPageSmoke(page, route);
      });
    }
  }
});

test.describe("homepage regression", () => {
  test("Selected Works cards and unavailable state stay intact on mobile", async ({ page }) => {
    await setViewport(page, 390);
    const errors = collectConsoleErrors(page);
    await gotoAndWait(page, "/en");

    await expect(page.getByRole("heading", { name: /Selected Works?/i })).toBeVisible();
    await expect(page.locator(".project-card").first()).toBeVisible();
    await expectElementDoesNotOverflowViewport(page, ".project-card");
    await expect(page.getByText(/Coming Soon/i).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
    expectNoConsoleErrors(errors);
  });
});

test.describe("case route regression", () => {
  for (const route of ["/en/advantech", "/en/crypto-arsenal", "/en/laushu"]) {
    test(`${route} keeps CaseTOC desktop/mobile visibility contract`, async ({ page }) => {
      await setViewport(page, 1440);
      const desktopErrors = collectConsoleErrors(page);
      await gotoAndWait(page, route);
      // CaseTOC fades in only after the first TOC section's top passes the navbar
      // edge (96px) — scroll that section into place instead of guessing a distance,
      // since hero height varies per case route.
      await page.evaluate(() => {
        const link = document.querySelector(".cs-toc a[href^='#']");
        const id = link?.getAttribute("href")?.slice(1);
        const target = id ? document.getElementById(id) : null;
        if (target) {
          window.scrollTo(0, window.scrollY + target.getBoundingClientRect().top - 40);
        }
      });
      await expect(page.locator(".cs-toc").first()).toBeVisible();
      expectNoConsoleErrors(desktopErrors);

      await setViewport(page, 390);
      const mobileErrors = collectConsoleErrors(page);
      await gotoAndWait(page, route);
      await expect(page.locator(".cs-toc").first()).toBeHidden();
      await expectNoHorizontalOverflow(page);
      expectNoConsoleErrors(mobileErrors);
    });
  }
});
