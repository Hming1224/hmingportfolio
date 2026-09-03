import { expect, test } from '@playwright/test';
import {
  collectConsoleErrors,
  expectNoConsoleErrors,
  expectNoHorizontalOverflow,
  gotoAndWait,
} from './helpers';

test.describe('AI Impact reveal entry', () => {
  for (const width of [390, 768, 1024, 1440]) {
    test(`entry stays inside the initial hero viewport at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width === 390 ? 844 : width === 768 ? 1024 : 900 });
      const errors = collectConsoleErrors(page);
      await gotoAndWait(page, '/en');

      const entry = page.locator('.ai-impact-entry');
      const hero = page.locator('.hero').first();
      await expect(entry).toBeVisible();
      const [entryBox, heroBox] = await Promise.all([entry.boundingBox(), hero.boundingBox()]);
      expect(entryBox).not.toBeNull();
      expect(heroBox).not.toBeNull();
      if (entryBox && heroBox) {
        expect(entryBox.y).toBeGreaterThanOrEqual(heroBox.y);
        expect(entryBox.y + entryBox.height).toBeLessThanOrEqual(page.viewportSize()!.height);
      }
      await expectNoHorizontalOverflow(page);
      expectNoConsoleErrors(errors);
    });
  }

  test('early release resets progress and does not navigate', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoAndWait(page, '/en');
    const button = page.locator('.ai-impact-reveal');

    await button.hover();
    await page.mouse.down();
    await page.waitForTimeout(220);
    await page.mouse.up();
    await page.waitForTimeout(320);

    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(button).toHaveCSS('--charge-progress', '0');
  });

  test('holding with pointer enters once and Back to Home returns to the top', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    const errors = collectConsoleErrors(page);
    await gotoAndWait(page, '/en');
    const button = page.locator('.ai-impact-reveal');

    await button.hover();
    await page.mouse.down();
    await page.waitForTimeout(850);
    await page.mouse.up();
    await expect(page).toHaveURL(/\/en\/ai-impact\/?$/, { timeout: 6000 });
    await expect(page.locator('.ai-impact-page')).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.evaluate(() => window.scrollTo(0, 900));
    await page.getByRole('button', { name: 'Back to Home' }).click();
    await expect(page).toHaveURL(/\/en\/?$/, { timeout: 6000 });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    expectNoConsoleErrors(errors);
  });

  test('Space and Enter support the same hold threshold', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await gotoAndWait(page, '/zh-TW');
    const button = page.locator('.ai-impact-reveal');

    await button.focus();
    await page.keyboard.down('Space');
    await page.waitForTimeout(220);
    await page.keyboard.up('Space');
    await expect(page).toHaveURL(/\/zh-TW\/?$/);

    await page.keyboard.down('Enter');
    await page.waitForTimeout(850);
    await page.keyboard.up('Enter');
    await expect(page).toHaveURL(/\/zh-TW\/ai-impact\/?$/, { timeout: 6000 });
  });

  test('unsupported View Transitions API keeps the navigation fallback', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(document, 'startViewTransition', { configurable: true, value: undefined });
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoAndWait(page, '/en');
    const button = page.locator('.ai-impact-reveal');

    await button.hover();
    await page.mouse.down();
    await page.waitForTimeout(850);
    await page.mouse.up();
    await expect(page).toHaveURL(/\/en\/ai-impact\/?$/, { timeout: 6000 });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });

  test('reduced motion keeps the result and skips the circular animation', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoAndWait(page, '/en');
    const button = page.locator('.ai-impact-reveal');

    await button.hover();
    await page.mouse.down();
    await page.waitForTimeout(850);
    await page.mouse.up();
    await expect(page).toHaveURL(/\/en\/ai-impact\/?$/, { timeout: 6000 });
    await expect(page.locator('.ai-impact-page')).toBeVisible();
    await expect(page.locator('html')).not.toHaveAttribute('data-ai-impact-transition');
    await expect(page.locator('.ai-impact-page .hero-decoration').first()).toHaveCSS('animation-name', 'none');
  });
});

test.describe('AI Impact touch input', () => {
  test.use({ hasTouch: true });

  test('touch hold reaches the same 800ms threshold', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoAndWait(page, '/en');
    const buttonBox = await page.locator('.ai-impact-reveal').boundingBox();
    expect(buttonBox).not.toBeNull();
    if (!buttonBox) return;

    const client = await page.context().newCDPSession(page);
    const touchPoint = { x: buttonBox.x + buttonBox.width / 2, y: buttonBox.y + buttonBox.height / 2 };
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [touchPoint] });
    await page.waitForTimeout(850);
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });

    await expect(page).toHaveURL(/\/en\/ai-impact\/?$/, { timeout: 6000 });
  });

  test('mobile swipe advances exactly one complete workflow stage', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoAndWait(page, '/zh-TW/ai-impact');
    const carousel = page.locator('.ai-impact-workflow-carousel');

    await carousel.evaluate((element) => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top - 64);
    });
    await expect(carousel).toHaveAttribute('data-active-stage', '1');

    const client = await page.context().newCDPSession(page);
    await client.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: 195, y: 620 }],
    });
    await client.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: 195, y: 500 }],
    });
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });

    await expect(carousel).toHaveAttribute('data-active-stage', '2');
    await expect(carousel.locator('.ai-impact-workflow-slide[data-stage="2"]')).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
});

test.describe('AI Impact page', () => {
  for (const { route, mindsetDetail, researchDetail } of [
    {
      route: '/en/ai-impact',
      mindsetDetail: 'Methods and learning files stay usable when I switch agents or platforms',
      researchDetail: 'Claude structures the project plan first. ChatGPT then helps design the interview guide and survey. NotebookLM organizes transcripts',
    },
    {
      route: '/zh-TW/ai-impact',
      mindsetDetail: '保存方法與學習檔案，換 Agent 或平台仍能接續',
      researchDetail: 'Claude 先規劃專案計劃書；ChatGPT 接著設計訪綱與問卷；NotebookLM 在訪談後整理逐字稿與研究洞察',
    },
  ]) {
    test(`${route} renders complete content without overflow`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      const errors = collectConsoleErrors(page);
      await gotoAndWait(page, route);

      await expect(page.getByRole('heading', { name: 'The AI Impact', level: 1 })).toBeVisible();
      await expect(page.locator('.ai-impact-section')).toHaveCount(3);
      await expect(page.locator("[data-hero-variant='ai-impact'] .hero-decoration")).toHaveCount(13);
      await expect(page.locator('.ai-impact-dots--highlight')).toHaveCSS('animation-name', 'aiDotWave');
      await expect(page.locator('.ai-impact-dots--highlight')).toHaveCSS('animation-timing-function', 'linear');
      await expect(page.locator('.ai-impact-dots--highlight')).toHaveCSS('mask-size', '100% 100%');
      await expect(page.locator('.ai-impact-mindset__step')).toHaveCount(4);
      await expect(page.locator('.ai-impact-mindset__number')).toHaveText(['01', '02', '03', '04']);
      await expect(page.locator('.ai-impact-mindset__evidence figure')).toHaveCount(2);
      await expect(page.locator('.ai-impact-workflow-slide')).toHaveCount(7);
      await expect(page.locator('.ai-impact-workflow-slide__media')).toHaveCount(0);
      await expect(page.locator('.ai-impact-workflow-paths article')).toHaveCount(4);
      await expect(page.locator('.ai-impact-outcomes__card')).toHaveCount(4);
      await expect(page.getByText(mindsetDetail, { exact: false })).toBeAttached();
      await expect(page.getByText(researchDetail, { exact: false })).toBeAttached();
      await expectNoHorizontalOverflow(page);
      expectNoConsoleErrors(errors);
    });
  }

  test('outcome depth carousel reveals workflow and skill badges on hover', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const errors = collectConsoleErrors(page);
    await gotoAndWait(page, '/zh-TW/ai-impact');

    const carousel = page.locator('.ai-impact-outcomes');
    const activeCard = carousel.locator('.ai-impact-outcomes__card.is-active');
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      const outcomes = document.querySelector<HTMLElement>('.ai-impact-outcomes');
      if (outcomes) window.scrollTo(0, outcomes.offsetTop);
    });

    await expect(carousel.locator('.ai-impact-outcomes__card')).toHaveCount(4);
    await expect(activeCard.locator('.ai-impact-outcomes__details')).toHaveCSS('opacity', '0');
    await activeCard.hover();
    await expect(activeCard.locator('.ai-impact-outcomes__details')).toHaveCSS('opacity', '1');
    await expect(activeCard.getByText('frontend-craft', { exact: true })).toBeVisible();

    await carousel.getByRole('button', { name: '下一個成果' }).click();
    await expect(carousel.locator('.ai-impact-outcomes__card.is-active')).toContainText('AI Loop');
    await expectNoHorizontalOverflow(page);
    expectNoConsoleErrors(errors);
  });

  test('desktop scroll snaps to complete workflow stages in both directions', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    const errors = collectConsoleErrors(page);
    await gotoAndWait(page, '/en/ai-impact');

    const carousel = page.locator('.ai-impact-workflow-carousel');
    const panel = page.locator('.ai-impact-workflow-carousel__sticky');
    await expect(panel).toHaveCSS('position', 'sticky');
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
    });

    const scrollToProgress = async (progress: number) => {
      const targetY = await carousel.evaluate((element, targetProgress) => {
        const panelElement = element.querySelector<HTMLElement>('.ai-impact-workflow-carousel__sticky');
        if (!panelElement) return window.scrollY;
        const top = element.getBoundingClientRect().top + window.scrollY;
        const range = element.clientHeight - panelElement.clientHeight;
        const nextY = top - 80 + range * targetProgress;
        window.scrollTo(0, nextY);
        return nextY;
      }, progress);
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBeCloseTo(targetY, 0);
    };

    await scrollToProgress(1);
    await expect(carousel).toHaveAttribute('data-active-stage', '7');
    await expect.poll(() => carousel.getAttribute('data-progress')).toBe('1.000');

    await scrollToProgress(0.5);
    await expect(carousel).toHaveAttribute('data-active-stage', '4');

    await scrollToProgress(0.2);
    await expect(carousel).toHaveAttribute('data-active-stage', '2');
    await expect.poll(async () => carousel.evaluate((element) => {
      const offset = Number.parseFloat(element.style.getPropertyValue('--workflow-offset'));
      const width = element.querySelector<HTMLElement>('.ai-impact-workflow-carousel__sticky')?.clientWidth ?? 0;
      return Math.abs(offset + width);
    })).toBeLessThan(1);

    await scrollToProgress(0);
    await expect(carousel).toHaveAttribute('data-active-stage', '1');
    await expect.poll(() => carousel.getAttribute('data-progress')).toBe('0.000');
    await expectNoHorizontalOverflow(page);
    expectNoConsoleErrors(errors);
  });

  test('workflow skills explain their purpose on hover and keyboard focus', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoAndWait(page, '/zh-TW/ai-impact');

    const firstSkill = page.locator('.ai-impact-skill').first();
    const firstTip = firstSkill.getByRole('tooltip');
    await expect(firstTip).toHaveCSS('opacity', '0');

    await firstSkill.hover();
    await expect(firstTip).toHaveCSS('opacity', '1');
    await expect(firstTip).toContainText('整理公司、產品與競品資料');

    await page.mouse.move(0, 0);
    await firstSkill.focus();
    await expect(firstTip).toHaveCSS('opacity', '1');
    await expect(firstSkill).toHaveAttribute('aria-describedby', 'workflow-skill-1-1');
  });

  test('mobile uses the same staged workflow and reduced motion keeps the vertical fallback', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoAndWait(page, '/en/ai-impact');
    const carousel = page.locator('.ai-impact-workflow-carousel');
    const panel = page.locator('.ai-impact-workflow-carousel__sticky');
    const track = page.locator('.ai-impact-workflow-track');

    await expect(panel).toHaveCSS('position', 'sticky');
    await expect(track).toHaveCSS('display', 'flex');
    await carousel.evaluate((element) => {
      const panelElement = element.querySelector<HTMLElement>('.ai-impact-workflow-carousel__sticky');
      if (!panelElement) return;
      const top = element.getBoundingClientRect().top + window.scrollY;
      const range = element.clientHeight - panelElement.clientHeight;
      window.scrollTo(0, top - 64 + range / 6);
    });
    await expect(carousel).toHaveAttribute('data-active-stage', '2');
    await expect(carousel.locator('.ai-impact-workflow__boundary')).toHaveCount(0);
    await expect(carousel.getByText('Can continue to')).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload();
    await expect(page.locator('.ai-impact-dots--highlight')).toHaveCSS('animation-name', 'none');
    await expect(page.locator('.ai-impact-dots--highlight')).toHaveCSS('opacity', '0');
    await expect(panel).toHaveCSS('position', 'static');
    await expect(track).toHaveCSS('transform', 'none');
    await expectNoHorizontalOverflow(page);
  });

  test('all workflow breakpoints keep the intended layout without overflow', async ({ page }) => {
    const breakpoints = [
      { width: 390, height: 844, position: 'sticky', display: 'flex' },
      { width: 768, height: 1024, position: 'sticky', display: 'flex' },
      { width: 1024, height: 900, position: 'sticky', display: 'flex' },
      { width: 1440, height: 900, position: 'sticky', display: 'flex' },
    ];

    for (const breakpoint of breakpoints) {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await gotoAndWait(page, '/en/ai-impact');

      await expect(page.locator('.ai-impact-workflow-slide')).toHaveCount(7);
      await expect(page.locator('.ai-impact-workflow-carousel__sticky')).toHaveCSS(
        'position',
        breakpoint.position,
      );
      await expect(page.locator('.ai-impact-workflow-track')).toHaveCSS(
        'display',
        breakpoint.display,
      );
      await expectNoHorizontalOverflow(page);
    }
  });
});
