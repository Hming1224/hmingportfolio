import { expect, test } from "@playwright/test";
import {
  collectConsoleErrors,
  expectElementDoesNotOverflowViewport,
  expectNavbarDesignSystemLink,
  expectNoConsoleErrors,
  expectNoHorizontalOverflow,
  expectNot404,
  gotoAndWait,
  openDesignSystemDoc,
  setViewport,
} from "./helpers";

const routes = ["/design-system", "/en/design-system", "/zh-TW/design-system"];
const widths = [1440, 1024, 768, 390];

test.describe("design system route smoke", () => {
  for (const route of routes) {
    for (const width of widths) {
      test(`${route} renders at ${width}px`, async ({ page }) => {
        await setViewport(page, width);
        const errors = collectConsoleErrors(page);
        const response = await gotoAndWait(page, route);

        await expectNot404(page, response?.status());
        await expectNoHorizontalOverflow(page);
        await expectNavbarDesignSystemLink(page);
        await expect(page.getByText("Co-worked with AI agent").first()).toBeVisible();
        await expect(page.locator("nav").filter({ hasText: /Foundations|基礎規範/ }).first()).toBeVisible();
        await expect(page.getByRole("button", { name: /Foundations|基礎規範/ }).first()).toBeVisible();
        expectNoConsoleErrors(errors);
      });
    }
  }

  test("locks approved catalog and backlog content", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await setViewport(page, 1440);
    await openDesignSystemDoc(page, "/en/design-system#future-backlog");

    await expect(page.getByText(/Future candidates not shown in the live catalog: Radio and Alert/)).toBeVisible();
    await expect(page.getByText(/Backlog contracts not shown in this catalog: Select, Checkbox, and EmptyState/)).toBeVisible();
    await expect(page.getByText(/Gap Analysis|Remediation Plan/)).toHaveCount(0);

    const nav = page.locator("aside nav").first();
    await expect(nav.getByText(/^Radio$/)).toHaveCount(0);
    await expect(nav.getByText(/^Alert$/)).toHaveCount(0);
    await expect(nav.getByText(/^Select$/)).toHaveCount(0);
    await expect(nav.getByText(/^Checkbox$/)).toHaveCount(0);
    await expect(nav.getByText(/^EmptyState$/)).toHaveCount(0);

    await expectNoHorizontalOverflow(page);
    expectNoConsoleErrors(errors);
  });
});

test.describe("CaseTOC scoped demo", () => {
  for (const route of ["/en/design-system#case-toc", "/zh-TW/design-system#case-toc"]) {
    test(`${route} keeps navigation scoped inside demo`, async ({ page }) => {
      await setViewport(page, 1440);
      const errors = collectConsoleErrors(page);
      await openDesignSystemDoc(page, route);

      const demo = page.locator('section[aria-label*="CaseTOC"]').first();
      await expect(demo).toBeVisible();
      await expect(demo.locator(".cs-toc-link").first()).toBeVisible();
      await expect(demo.locator("#cs-sec-ds-toc-role")).toBeVisible();

      const scrollHost = demo.locator(".cs-toc-layout > div").first();
      const beforeWindowScroll = await page.evaluate(() => window.scrollY);
      const roleLink = demo.locator(".cs-toc-link", { hasText: /My Role|我的角色/ }).first();

      await roleLink.click();
      await expect(page).toHaveURL(/#case-toc$/);
      await expect(roleLink).toHaveAttribute("aria-current", "true");

      const afterWindowScroll = await page.evaluate(() => window.scrollY);
      const hostScrollTop = await scrollHost.evaluate((element) => element.scrollTop);
      expect(Math.abs(afterWindowScroll - beforeWindowScroll)).toBeLessThanOrEqual(8);
      expect(hostScrollTop).toBeGreaterThan(0);

      await scrollHost.evaluate((element) => {
        const target = element.querySelector<HTMLElement>("#cs-sec-ds-toc-analysis");
        if (!target) return;
        element.scrollTop = target.offsetTop;
        element.dispatchEvent(new Event("scroll", { bubbles: true }));
      });
      await expect(demo.locator(".cs-toc-link", { hasText: /Analysis|分析洞察/ }).first()).toHaveAttribute(
        "aria-current",
        "true",
      );
      await expectNoHorizontalOverflow(page);
      expectNoConsoleErrors(errors);
    });
  }
});

test.describe("ProjectCard docs", () => {
  test("renders production ProjectCard example without mobile overflow", async ({ page }) => {
    await setViewport(page, 390);
    const errors = collectConsoleErrors(page);
    await openDesignSystemDoc(page, "/en/design-system#project-card");

    await expect(page.locator(".project-card").first()).toBeVisible();
    await expectElementDoesNotOverflowViewport(page, ".project-card");
    await page.locator(".project-card a, .project-card button").first().focus();
    await expect(page.locator(".project-info").first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
    expectNoConsoleErrors(errors);
  });
});

test.describe("DemoBlock label contract", () => {
  for (const route of [
    "/en/design-system#tabs",
    "/en/design-system#case-hero",
    "/en/design-system#modal",
    "/en/design-system#skeleton",
  ]) {
    test(`${route} keeps context label spacing inside example surface`, async ({ page }) => {
      await setViewport(page, 1024);
      const errors = collectConsoleErrors(page);
      await openDesignSystemDoc(page, route);

      const metrics = await page.locator("[class*=demoSurface]").first().evaluate((surface) => {
        const block = surface.querySelector<HTMLElement>("[class*=demoBlock]");
        const label = surface.querySelector<HTMLElement>("[class*=demoUsageLine]");
        if (!block || !label) return null;

        const surfaceRect = surface.getBoundingClientRect();
        const blockRect = block.getBoundingClientRect();
        const labelRect = label.getBoundingClientRect();
        const component = Array.from(block.children).find((child) => child !== label) as HTMLElement | undefined;
        const componentRect = component?.getBoundingClientRect();

        return {
          labelCount: surface.querySelectorAll("[class*=demoUsageLine]").length,
          labelInsideSurface:
            labelRect.left >= surfaceRect.left - 1 &&
            labelRect.right <= surfaceRect.right + 1 &&
            labelRect.top >= surfaceRect.top - 1 &&
            labelRect.bottom <= surfaceRect.bottom + 1,
          labelOutsideComponent: componentRect ? labelRect.bottom <= componentRect.top : false,
          visualGap: componentRect ? componentRect.top - labelRect.bottom : null,
          leftDelta: Math.abs(labelRect.left - blockRect.left),
        };
      });

      expect(metrics).not.toBeNull();
      if (!metrics) return;

      expect(metrics.labelCount).toBe(1);
      expect(metrics.labelInsideSurface).toBe(true);
      expect(metrics.labelOutsideComponent).toBe(true);
      expect(metrics.visualGap).not.toBeNull();
      expect(Math.abs((metrics.visualGap ?? 0) - 16)).toBeLessThanOrEqual(1);
      expect(metrics.leftDelta).toBeLessThanOrEqual(1);
      await expectNoHorizontalOverflow(page);
      expectNoConsoleErrors(errors);
    });
  }
});

test.describe("Before / After docs", () => {
  for (const route of [
    "/en/design-system#case-before-after",
    "/en/design-system#before-after-narrative-frame",
    "/zh-TW/design-system#case-before-after",
    "/zh-TW/design-system#before-after-narrative-frame",
  ]) {
    test(`${route} renders component contract and section order`, async ({ page }) => {
      await setViewport(page, 390);
      const errors = collectConsoleErrors(page);
      await openDesignSystemDoc(page, route);
      const doc = page.locator("article", { has: page.locator(".cs-before-after, .cs-before-after-narrative") }).first();

      await expect(doc.locator(".cs-before-after, .cs-before-after-narrative").first()).toBeVisible();
      await expect(doc.getByRole("heading", { name: /Examples|範例/ })).toBeVisible();
      await expect(doc.getByRole("heading", { name: /When to use|使用時機/ })).toBeVisible();
      await expect(doc.getByRole("heading", { name: /States \/ Behavior|行為 \/ 邊界|Behavior|狀態/ }).first()).toBeVisible();
      await expect(doc.getByRole("heading", { name: /Anatomy|結構/ })).toBeVisible();
      await expect(doc.getByRole("heading", { name: /Code guidance|程式使用/ })).toBeVisible();
      await expect(doc.getByRole("heading", { name: /Design Tokens|設計 Token/ })).toBeVisible();
      await expect(doc.getByRole("heading", { name: /Accessibility|無障礙/ })).toBeVisible();
      await expect(doc.getByRole("heading", { name: /Reference|參考/ })).toBeVisible();
      await expect(doc.getByText(/BeforeAfterPanel is rendered internally|BeforeAfterPanel 由這個 frame 內部渲染/)).toHaveCount(route.includes("narrative") ? 1 : 0);
      await expectNoHorizontalOverflow(page);
      expectNoConsoleErrors(errors);
    });
  }
});

test.describe("Button / LinkButton docs", () => {
  for (const route of ["/en/design-system#button", "/zh-TW/design-system#button"]) {
    test(`${route} renders shared button contract and return flow`, async ({ page }) => {
      await setViewport(page, 1440);
      const errors = collectConsoleErrors(page);
      await openDesignSystemDoc(page, route);
      const doc = page.locator("article", { has: page.getByRole("heading", { name: /Button \/ LinkButton|按鈕 \/ 連結按鈕/ }) }).first();

      await expect(doc.locator(".ds-button").first()).toBeVisible();
      const buttonCount = await doc.locator(".ds-button").count();
      expect(buttonCount).toBeLessThanOrEqual(12);
      await expect(doc.getByRole("heading", { name: /Code guidance|程式使用/ })).toBeVisible();
      await expect(doc.getByRole("heading", { name: /Accessibility|無障礙/ })).toBeVisible();
      await expect(doc.locator("header code", { hasText: "components/ui/Button.tsx" })).toHaveCount(0);

      const learnMore = doc.getByRole("link", { name: /Learn More|了解更多/ }).first();
      if ((await learnMore.count()) > 0) {
        const urlBefore = page.url();
        await learnMore.click();
        await expect(page).toHaveURL(urlBefore);
      }

      await expectNoHorizontalOverflow(page);
      expectNoConsoleErrors(errors);
    });
  }
});
