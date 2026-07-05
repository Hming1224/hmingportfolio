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

async function waitForLayoutSettled(page: Page) {
  await page
    .evaluate(async () => {
      if ("fonts" in document) {
        await document.fonts.ready;
      }
    })
    .catch(() => undefined);

  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
}

async function getHorizontalOverflowState(page: Page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const viewportWidth = doc.clientWidth;
    const documentOverflow = Math.max(0, doc.scrollWidth - viewportWidth);

    function selectorFor(element: HTMLElement) {
      const className = typeof element.className === "string" ? element.className.trim() : "";
      return `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}${
        className ? `.${className.replace(/\s+/g, ".")}` : ""
      }`;
    }

    function hasContainingOverflowAncestor(element: HTMLElement) {
      let current = element.parentElement;

      while (current && current !== document.body) {
        const style = getComputedStyle(current);
        const overflowX = style.overflowX;
        if (overflowX === "auto" || overflowX === "scroll" || overflowX === "hidden" || overflowX === "clip") {
          return true;
        }
        current = current.parentElement;
      }

      return false;
    }

    const offenders = Array.from(document.querySelectorAll<HTMLElement>("body *"))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const overflow = Math.max(0, rect.right - viewportWidth, -rect.left);
        return {
          selector: selectorFor(element),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          overflow: Math.ceil(overflow),
          contained: hasContainingOverflowAncestor(element),
          overflowX: getComputedStyle(element).overflowX,
        };
      })
      .filter((item) => item.width > 0 && item.overflow > 0);

    const uncontainedOffenders = offenders.filter((item) => !item.contained);
    const uncontainedOverflow = Math.max(0, ...uncontainedOffenders.map((item) => item.overflow));

    return {
      overflow: uncontainedOffenders.length > 0 ? uncontainedOverflow : offenders.length === 0 ? documentOverflow : 0,
      documentOverflow,
      offenders: offenders.slice(0, 8),
      uncontainedOffenders: uncontainedOffenders.slice(0, 8),
    };
  });
}

async function getHorizontalOverflowDiagnostics(page: Page) {
  const state = await getHorizontalOverflowState(page);
  return `document overflow=${state.documentOverflow}; uncontainedOffenders=${JSON.stringify(
    state.uncontainedOffenders,
  )}; offenders=${JSON.stringify(state.offenders)}`;
}

export async function expectNoHorizontalOverflow(page: Page) {
  await waitForLayoutSettled(page);
  try {
    await expect.poll(async () => (await getHorizontalOverflowState(page)).overflow, {
      message: "Expected uncontained horizontal overflow to settle at 0px",
    }).toBe(0);
  } catch (error) {
    const diagnostics = await getHorizontalOverflowDiagnostics(page).catch(() => "Overflow diagnostics unavailable");
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${message}\n\n${diagnostics}`);
  }
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
  await page.waitForLoadState("networkidle").catch(() => undefined);
  return response;
}

export async function basicPageSmoke(page: Page, route: string) {
  const errors = collectConsoleErrors(page);
  const response = await gotoAndWait(page, route);

  await expectNot404(page, response?.status());
  await expectNoHorizontalOverflow(page);
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
