import { expect, test } from "@playwright/test";
import {
  collectConsoleErrors,
  expectNoConsoleErrors,
  expectNoHorizontalOverflow,
  expectNot404,
  gotoAndWait,
  setViewport,
} from "./helpers";

const routes = ["/en/contact", "/zh-TW/contact"];

test.describe("contact route light smoke", () => {
  for (const route of routes) {
    for (const width of [1440, 390]) {
      test(`${route} renders contact form at ${width}px`, async ({ page }) => {
        await setViewport(page, width);
        const errors = collectConsoleErrors(page);
        const response = await gotoAndWait(page, route);

        await expectNot404(page, response?.status());
        expect(response?.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
        expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
        await expectNoHorizontalOverflow(page);
        await expect(page.locator("form.contact-form")).toBeVisible();
        await expect(page.locator('input[name="_gotcha"]')).toBeHidden();
        await expect(page.locator('input[name="name"]')).toBeVisible();
        await expect(page.locator('input[name="company"]')).toBeVisible();
        await expect(page.locator('input[name="email"]')).toBeVisible();
        await expect(page.locator('input[name="phone"]')).toBeVisible();
        await expect(page.locator('textarea[name="message"]')).toBeVisible();
        expectNoConsoleErrors(errors);
      });
    }
  }
});

test.describe("@form contact review modal", () => {
  for (const route of routes) {
    test(`${route} opens review modal without submitting external endpoint`, async ({ page }) => {
      await setViewport(page, 390);
      const errors = collectConsoleErrors(page);
      await page.route("https://formspree.io/**", async (route) => {
        throw new Error(`External form submit should not be called in smoke: ${route.request().url()}`);
      });
      await gotoAndWait(page, route);

      await page.locator('input[name="name"]').fill("Brian Huang");
      await page.locator('input[name="company"]').fill("Hming Design");
      await page.locator('input[name="email"]').fill("hello@example.com");
      await page.locator('input[name="phone"]').fill("0912 345 678");
      await page.locator('textarea[name="message"]').fill("Smoke test message");
      await page.getByRole("button", { name: /Send Message|傳送訊息|送出訊息/ }).click();

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog).toContainText("Brian Huang");
      await expect(dialog).toContainText("Hming Design");
      await expect(dialog).toContainText("hello@example.com");
      await expect(dialog).toContainText("0912 345 678");
      await expect(dialog).toContainText("Smoke test message");

      const actionButtons = dialog.locator(".contact-review-actions .ds-button");
      await expect(actionButtons.nth(0)).toContainText(/Confirm Send|確認送出/);
      await expect(actionButtons.nth(1)).toContainText(/Cancel|返回修改/);

      const confirmBox = await actionButtons.nth(0).boundingBox();
      const cancelBox = await actionButtons.nth(1).boundingBox();
      expect(confirmBox?.y ?? 0).toBeLessThan(cancelBox?.y ?? Number.POSITIVE_INFINITY);

      await actionButtons.nth(1).click();
      await expect(dialog).toHaveCount(0);
      await expect(page.locator('input[name="name"]')).toHaveValue("Brian Huang");
      await expect(page.locator('input[name="company"]')).toHaveValue("Hming Design");
      await expect(page.locator('input[name="email"]')).toHaveValue("hello@example.com");
      await expect(page.locator('input[name="phone"]')).toHaveValue("0912 345 678");
      await expect(page.locator('textarea[name="message"]')).toHaveValue("Smoke test message");

      await page.getByRole("button", { name: /Send Message|傳送訊息|送出訊息/ }).click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);

      await expectNoHorizontalOverflow(page);
      expectNoConsoleErrors(errors);
    });
  }
});
