import { expect, test, type Browser, type Page } from "@playwright/test";
import { gotoAndWait } from "./helpers";

const cases = [
  { route: "/en/advantech", slug: "advantech" },
  { route: "/en/crypto-arsenal", slug: "crypto-arsenal" },
  { route: "/en/design-system-case-study", slug: "design-system-case-study" },
  { route: "/en/laushu", slug: "laushu" },
];

type DataLayerEvent = ["event", string, Record<string, unknown>];

async function createTrackedPage(browser: Browser, baseURL: string | undefined) {
  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();
  await page.addInitScript(() => {
    (window as typeof window & { dataLayer?: unknown[] }).dataLayer = [];
  });
  await page.clock.install();
  return { context, page };
}

async function gotoTracked(page: Page, route: string) {
  const response = await page.goto(route, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible" });
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => undefined);
  return response;
}

async function scrollToPercent(page: Page, percent: number) {
  await page.evaluate((targetPercent) => {
    const top = Math.max(0, document.documentElement.scrollHeight * (targetPercent / 100) - window.innerHeight);
    window.scrollTo(0, top);
    window.dispatchEvent(new Event("scroll"));
  }, percent);
  await page.clock.fastForward(20);
}

async function setVisibility(page: Page, state: "hidden" | "visible") {
  return page.evaluate((visibilityState) => {
    Object.defineProperty(document, "visibilityState", { configurable: true, value: visibilityState });
    document.dispatchEvent(new Event("visibilitychange"));
    return document.visibilityState;
  }, state);
}

async function eventsNamed(page: Page, name: string) {
  return page.evaluate((eventName) => {
    const layer = window.dataLayer as unknown as unknown[][] | undefined;
    return (layer ?? []).filter(
      (entry): entry is DataLayerEvent => entry[0] === "event" && entry[1] === eventName,
    );
  }, name);
}

test("shared smoke navigation opts out before analytics can load", async ({ page }) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    if (/googletagmanager\.com|google-analytics\.com|clarity\.ms/i.test(request.url())) {
      externalRequests.push(request.url());
    }
  });

  await gotoAndWait(page, "/en/advantech");
  await page.waitForTimeout(250);

  await expect(page.locator("#_next-ga, #ms-clarity, script[src*='googletagmanager.com'], script[src*='clarity.ms']")).toHaveCount(0);
  await expect.poll(() => externalRequests).toEqual([]);
  await expect(page.evaluate(() => localStorage.getItem("hming_analytics_opt_out"))).resolves.toBe("1");
});

test("analytics opt-out route never loads analytics in a clean context", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    if (/googletagmanager\.com|google-analytics\.com|clarity\.ms/i.test(request.url())) {
      externalRequests.push(request.url());
    }
  });

  try {
    await gotoTracked(page, "/en/analytics-opt-out");
    await page.waitForTimeout(250);
    await expect(page.locator("#_next-ga, #ms-clarity, script[src*='googletagmanager.com'], script[src*='clarity.ms']")).toHaveCount(0);
    await expect.poll(() => externalRequests).toEqual([]);
    await expect(page.evaluate(() => localStorage.getItem("hming_analytics_opt_out"))).resolves.toBeNull();
  } finally {
    await context.close();
  }
});

test.describe("funnel events in a fresh tracking context", () => {
  test("published ProjectCard sends project_open once", async ({ browser, baseURL }) => {
    const { context, page } = await createTrackedPage(browser, baseURL);
    try {
      await gotoTracked(page, "/en");
      const cta = page.locator(".project-card").first().locator("a");
      await cta.evaluate((anchor) => {
        anchor.addEventListener("click", (event) => event.preventDefault(), { capture: true });
      });
      await cta.click();

      const projectOpen = await eventsNamed(page, "project_open");
      expect(projectOpen).toHaveLength(1);
      expect(projectOpen[0][2]).toMatchObject({
        project_slug: "advantech",
        locale: "en",
        destination_path: "/advantech",
      });
    } finally {
      await context.close();
    }
  });

  test("resume_click keeps most recent engaged Case attribution", async ({ browser, baseURL }) => {
    const { context, page } = await createTrackedPage(browser, baseURL);
    await page.addInitScript(() => sessionStorage.setItem("hming-last-case-slug", "advantech"));
    try {
      await gotoTracked(page, "/en");
      const resume = page.locator(".site-nav a[target='_blank']");
      await resume.evaluate((anchor) => {
        anchor.addEventListener("click", (event) => event.preventDefault(), { capture: true });
      });
      await resume.click();

      const resumeClick = await eventsNamed(page, "resume_click");
      expect(resumeClick).toHaveLength(1);
      expect(resumeClick[0][2]).toMatchObject({
        locale: "en",
        project_slug: "advantech",
        last_case_slug: "advantech",
      });
    } finally {
      await context.close();
    }
  });

  test("successful contact_form_submit keeps most recent engaged Case attribution", async ({ browser, baseURL }) => {
    const { context, page } = await createTrackedPage(browser, baseURL);
    await page.addInitScript(() => sessionStorage.setItem("hming-last-case-slug", "advantech"));
    await page.route("https://formspree.io/**", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: "{}" }),
    );
    try {
      await gotoTracked(page, "/en/contact");
      await page.locator('input[name="name"]').fill("Analytics Smoke");
      await page.locator('input[name="company"]').fill("Hming Design");
      await page.locator('input[name="email"]').fill("analytics@example.com");
      await page.locator('textarea[name="message"]').fill("Confirm analytics attribution.");
      await page.getByRole("button", { name: "Send Message" }).click();
      await page.getByRole("dialog").locator(".contact-review-actions .ds-button").first().click();

      await expect.poll(() => eventsNamed(page, "contact_form_submit")).toHaveLength(1);
      expect((await eventsNamed(page, "contact_form_submit"))[0][2]).toMatchObject({
        locale: "en",
        project_slug: "advantech",
        last_case_slug: "advantech",
      });
    } finally {
      await context.close();
    }
  });
});

test.describe("case analytics in a fresh tracking context", () => {
  test("case_engaged needs visible 30 seconds and 50% scroll, then sends once", async ({ browser, baseURL }) => {
    const { context, page } = await createTrackedPage(browser, baseURL);
    try {
      await gotoTracked(page, "/en/advantech");
      await page.clock.fastForward(30_000);
      expect(await eventsNamed(page, "case_engaged")).toHaveLength(0);

      await scrollToPercent(page, 50);
      await page.clock.fastForward(250);
      const engaged = await eventsNamed(page, "case_engaged");
      expect(engaged).toHaveLength(1);
      expect(engaged[0][2]).toMatchObject({
        project_slug: "advantech",
        locale: "en",
        active_seconds: 30,
        scroll_percent: 50,
      });

      await page.clock.fastForward(30_000);
      expect(await eventsNamed(page, "case_engaged")).toHaveLength(1);
    } finally {
      await context.close();
    }
  });

  test("hidden time does not count toward case_engaged", async ({ browser, baseURL }) => {
    const { context, page } = await createTrackedPage(browser, baseURL);
    try {
      await gotoTracked(page, "/en/advantech");
      await scrollToPercent(page, 50);
      expect(await setVisibility(page, "hidden")).toBe("hidden");
      await page.clock.fastForward(31_000);
      expect(await setVisibility(page, "visible")).toBe("visible");
      await page.clock.fastForward(10_000);
      expect(await eventsNamed(page, "case_engaged")).toHaveLength(0);

      await page.clock.fastForward(25_000);
      expect(await eventsNamed(page, "case_engaged")).toHaveLength(1);
    } finally {
      await context.close();
    }
  });

  for (const caseStudy of cases) {
    test(`${caseStudy.slug} sends case_read_90 once`, async ({ browser, baseURL }) => {
      const { context, page } = await createTrackedPage(browser, baseURL);
      try {
        await gotoTracked(page, caseStudy.route);
        await scrollToPercent(page, 90);
        await page.clock.fastForward(250);
        await scrollToPercent(page, 100);

        const readEvents = await eventsNamed(page, "case_read_90");
        expect(readEvents).toHaveLength(1);
        expect(readEvents[0][2]).toMatchObject({
          project_slug: caseStudy.slug,
          locale: "en",
          scroll_percent: 90,
        });
      } finally {
        await context.close();
      }
    });
  }
});
