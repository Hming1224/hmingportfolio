import { expect, test, type Page } from '@playwright/test';
import {
  collectConsoleErrors,
  expectNoConsoleErrors,
  expectNoHorizontalOverflow,
  gotoAndWait,
} from './helpers';

async function scrollStoryToStep(page: Page, step: number) {
  const story = page.locator('.ai-impact-story');
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });
  await story.evaluate((element, targetStep) => {
    const stage = element.querySelector<HTMLElement>('.ai-impact-story__stage');
    if (!stage) return;
    const top = element.getBoundingClientRect().top + window.scrollY;
    const stickyTop = Number.parseFloat(window.getComputedStyle(stage).top);
    const range = element.offsetHeight - stage.offsetHeight;
    window.scrollTo(0, top - stickyTop + range * (targetStep / 11));
  }, step);
  await expect(story).toHaveAttribute('data-active-step', String(step + 1));
}

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
    await expect(button).not.toHaveClass(/is-charging/);
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
    await expect(page.locator('.ai-impact-hero__copy')).toHaveCSS('opacity', '1');
    await expectNoHorizontalOverflow(page);

    await page.evaluate(() => window.scrollTo(0, 900));
    await page.getByRole('button', { name: 'Back to Home' }).click();
    await expect(page).toHaveURL(/\/en\/?$/, { timeout: 6000 });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page.locator('.hero-subtitle')).toHaveCSS('opacity', '1');
    await expect(page.locator('.hero-actions')).toHaveCSS('opacity', '1');
    expectNoConsoleErrors(errors);
  });

  for (const destination of [
    { name: 'Selected Work', url: /\/en\/?#projects$/, target: '#projects' },
    { name: 'About', url: /\/en\/about-me\/?$/ },
    { name: 'Design System', url: /\/en\/design-system\/?$/ },
    { name: 'Contact', url: /\/en\/contact\/?$/ },
  ]) {
    test(`navbar ${destination.name} link keeps its destination`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await gotoAndWait(page, '/en/ai-impact');
      await page.getByRole('link', { name: destination.name, exact: true }).click();
      await expect(page).toHaveURL(destination.url);

      if (destination.target) {
        await expect(page.locator(destination.target)).toBeInViewport();
      } else {
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      }
    });
  }

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
    const story = page.locator('.ai-impact-story');
    await scrollStoryToStep(page, 3);
    await expect(page.locator('.ai-impact-workflow-carousel')).toHaveAttribute('data-active-stage', '1');

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

    await expect(story).toHaveAttribute('data-active-step', '5');
    await expect(page.locator('.ai-impact-workflow-carousel')).toHaveAttribute('data-active-stage', '2');
    await expect(page.locator('.ai-impact-workflow-slide[data-stage="2"]')).toBeVisible();
    await expect(page.locator('.ai-impact-workflow-next-hint')).toContainText('滑動觀看下一步');
    await expectNoHorizontalOverflow(page);
  });
});

test.describe('AI Impact page', () => {
  test('hero hands off to section 01 with the Design System scroll gate', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoAndWait(page, '/zh-TW/ai-impact');

    const hero = page.locator('.ai-impact-hero');
    const stage = page.locator('.ai-impact-story__stage');
    await expect(hero).toHaveCSS('position', 'sticky');
    await expect(stage).toHaveCSS('opacity', '0.001');

    await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'auto' }));
    await expect(page.locator('html')).toHaveAttribute('data-ai-story-visible', 'true');
    await expect.poll(async () => Number.parseFloat(await hero.evaluate((element) => getComputedStyle(element).opacity))).toBeLessThan(0.01);
    await expect.poll(async () => Number.parseFloat(await stage.evaluate((element) => getComputedStyle(element).opacity))).toBeGreaterThan(0.99);
    await expect.poll(() => page.evaluate(() => {
      const story = document.querySelector<HTMLElement>('.ai-impact-story');
      if (!story) return Number.POSITIVE_INFINITY;
      const storyTop = story.getBoundingClientRect().top + window.scrollY;
      return Math.abs(window.scrollY - (storyTop - 120));
    })).toBeLessThan(2);
    await expect(page.locator('.ai-impact-story')).toHaveAttribute('data-active-step', '1');

    await page.evaluate(() => window.scrollTo({ top: 100, behavior: 'auto' }));
    await expect(page.locator('html')).not.toHaveAttribute('data-ai-story-visible');
    await expect.poll(async () => Number.parseFloat(await hero.evaluate((element) => getComputedStyle(element).opacity))).toBeGreaterThan(0.99);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2);
  });

  test('language change uses the AI Impact loading variant', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoAndWait(page, '/en/ai-impact');

    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('button', { name: 'Select language' }).click();
    await page.getByRole('menuitemradio', { name: '繁體中文' }).evaluate((element) => {
      window.setTimeout(() => (element as HTMLButtonElement).click(), 0);
    });

    await expect(page.locator('.language-loading-backdrop--ai-impact')).toBeVisible();
    await expect(page.locator('.language-loading-overlay--ai-impact')).toBeVisible();
    await expect(page.locator('.language-loading-animation--ai-impact')).toBeVisible();
  });

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
      await expect(page.locator('.ai-impact-story')).toHaveCount(1);
      await expect(page.locator('.ai-impact-story__scene')).toHaveCount(3);
      await expect(page.locator("[data-hero-variant='ai-impact'] .hero-decoration")).toHaveCount(13);
      await expect(page.locator('.ai-impact-dots--highlight')).toHaveCSS('animation-name', 'aiDotWave');
      await expect(page.locator('.ai-impact-dots--highlight')).toHaveCSS('animation-timing-function', 'linear');
      await expect(page.locator('.ai-impact-dots--highlight')).toHaveCSS('mask-size', '100% 100%');
      await expect(page.locator('.ai-impact-story-mindset__step')).toHaveCount(4);
      await expect(page.locator('.ai-impact-mindset__number')).toHaveText(['01', '02', '03', '04']);
      await expect(page.locator('.ai-impact-workflow-slide')).toHaveCount(7);
      await expect(page.locator('.ai-impact-workflow-slide__media')).toHaveCount(0);
      await expect(page.locator('.ai-impact-workflow-paths article')).toHaveCount(3);
      await expect(page.locator('.ai-impact-outcomes__card')).toHaveCount(4);
      await scrollStoryToStep(page, 2);
      await expect(page.getByText(mindsetDetail, { exact: false })).toBeAttached();
      await expect(page.locator('.ai-impact-proof--memory')).toBeVisible();
      await expect(page.locator('.ai-impact-proof__file')).toHaveCount(1);
      await expect(page.locator('.ai-impact-proof__node')).toHaveCount(4);
      await scrollStoryToStep(page, 3);
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
    await scrollStoryToStep(page, 11);

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

  test('desktop scroll maps the twelve scenes and all seven workflow phases', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    const errors = collectConsoleErrors(page);
    await gotoAndWait(page, '/en/ai-impact');

    const story = page.locator('.ai-impact-story');
    const carousel = page.locator('.ai-impact-workflow-carousel');
    await expect(page.locator('.ai-impact-story__stage')).toHaveCSS('position', 'sticky');
    await expect(carousel.locator('li.is-active .ai-impact-workflow-progress__direction')).toHaveCount(1);
    await expect(carousel.locator('.ai-impact-workflow-next-hint')).toContainText('Scroll for next phase');

    await scrollStoryToStep(page, 0);
    await expect(story).toHaveAttribute('data-active-section', 'mindset');
    await expect(page.locator('.ai-impact-story-mindset')).toHaveClass(/is-overview/);
    await scrollStoryToStep(page, 1);
    await expect(page.locator('.ai-impact-proof--skill')).toBeVisible();
    await expect.poll(async () => page.locator('.ai-impact-mindset__icon').evaluateAll((icons) => {
      const first = getComputedStyle(icons[0]).backgroundColor;
      const last = getComputedStyle(icons[3]).backgroundColor;
      return first !== last;
    })).toBe(true);
    await scrollStoryToStep(page, 2);
    await expect(page.locator('.ai-impact-proof--memory')).toBeVisible();
    await expect(page.locator('.ai-impact-story-mindset__step').last().locator('.ai-impact-mindset__icon')).toHaveCSS(
      'animation-name',
      'aiMindsetNode',
    );
    await expect.poll(async () => page.locator('.ai-impact-mindset__icon').evaluateAll((icons) => {
      const restingBackground = getComputedStyle(document.body).backgroundColor;
      return icons.every((icon) => getComputedStyle(icon).backgroundColor !== restingBackground);
    })).toBe(true);
    await scrollStoryToStep(page, 3);
    await expect(story).toHaveAttribute('data-active-section', 'workflow');
    await expect(carousel).toHaveAttribute('data-active-stage', '1');
    await scrollStoryToStep(page, 9);
    await expect(carousel).toHaveAttribute('data-active-stage', '7');
    await expect.poll(() => carousel.getAttribute('data-progress')).toBe('1.000');
    await expect(carousel.locator('.ai-impact-workflow-progress__direction')).toHaveCount(0);
    await expect(carousel.locator('.ai-impact-workflow-next-hint')).toHaveClass(/is-hidden/);
    await scrollStoryToStep(page, 10);
    await expect(page.locator('.ai-impact-story-workflow')).toHaveClass(/is-paths/);
    await scrollStoryToStep(page, 11);
    await expect(story).toHaveAttribute('data-active-section', 'outcomes');
    await expectNoHorizontalOverflow(page);
    expectNoConsoleErrors(errors);
  });

  test('the four mindset nodes persist and reflow from a row into the left rail', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoAndWait(page, '/zh-TW/ai-impact');
    await scrollStoryToStep(page, 0);

    const nodes = page.locator('.ai-impact-story-mindset__step');
    const rowPositions = await nodes.evaluateAll((elements) => elements.map((element, index) => {
      element.setAttribute('data-node-identity', String(index));
      const rect = element.getBoundingClientRect();
      return { left: rect.left, top: rect.top };
    }));

    await scrollStoryToStep(page, 1);
    await expect(nodes).toHaveCount(4);
    await page.waitForTimeout(700);
    for (let index = 0; index < 4; index += 1) {
      await expect(nodes.nth(index)).toHaveAttribute('data-node-identity', String(index));
    }
    const railPositions = await nodes.evaluateAll((elements) => elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, top: rect.top };
    }));

    expect(Math.abs(railPositions[1].left - railPositions[0].left)).toBeLessThan(2);
    expect(railPositions[1].top - railPositions[0].top).toBeGreaterThan(60);
    expect(Math.abs(rowPositions[1].left - rowPositions[0].left)).toBeGreaterThan(150);
  });

  for (const width of [1024, 1440]) {
    test(`desktop mindset overview distributes the four nodes across the full rail at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await gotoAndWait(page, '/zh-TW/ai-impact');
      await scrollStoryToStep(page, 0);

      const geometry = await page.locator('.ai-impact-story-mindset__steps').evaluate((rail) => {
        const icons = Array.from(rail.querySelectorAll<HTMLElement>('.ai-impact-mindset__icon'));
        const positions = icons.map((icon) => {
          const step = icon.closest<HTMLElement>('.ai-impact-story-mindset__step')!;
          return step.offsetLeft + icon.offsetLeft;
        });
        const centers = icons.map((icon, index) => positions[index] + icon.offsetWidth / 2);
        const firstIcon = icons[0];
        const lastIcon = icons.at(-1)!;

        return {
          firstInset: positions[0],
          lastInset: rail.clientWidth - positions.at(-1)! - lastIcon.offsetWidth,
          gaps: centers.slice(1).map((center, index) => center - centers[index]),
        };
      });

      expect(Math.abs(geometry.firstInset)).toBeLessThan(2);
      expect(Math.abs(geometry.lastInset)).toBeLessThan(2);
      expect(Math.max(...geometry.gaps) - Math.min(...geometry.gaps)).toBeLessThan(2);
      await expectNoHorizontalOverflow(page);
    });
  }

  test('section transitions use the full viewport without clipping the scene', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoAndWait(page, '/zh-TW/ai-impact');
    await scrollStoryToStep(page, 0);

    const stage = page.locator('.ai-impact-story__stage');
    const scene = page.locator('.ai-impact-story__scene--mindset');
    await expect(stage).toHaveCSS('overflow', 'visible');
    await expect.poll(async () => scene.evaluate((element) => Math.round(element.getBoundingClientRect().width))).toBe(1440);
    await expect.poll(async () => scene.evaluate((element) => Math.round(element.getBoundingClientRect().left))).toBe(0);
    await expectNoHorizontalOverflow(page);
  });

  test('mindset overview restores the four-node light and connector sequence', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoAndWait(page, '/zh-TW/ai-impact');
    await scrollStoryToStep(page, 0);

    const sequence = page.locator('.ai-impact-story-mindset__steps');
    await expect(sequence).toHaveClass(/is-animated/);
    await sequence.evaluate((element) => {
      const stateWindow = window as typeof window & { __mindsetSequenceHistory?: string[] };
      stateWindow.__mindsetSequenceHistory = [];
      const observer = new MutationObserver(() => {
        stateWindow.__mindsetSequenceHistory?.push(element.className);
      });
      observer.observe(element, { attributes: true, attributeFilter: ['class'] });
      window.setTimeout(() => observer.disconnect(), 11_000);
    });
    const nodeAnimations = await page.locator('.ai-impact-mindset__icon').evaluateAll((icons) => icons.map((icon) => {
      const style = getComputedStyle(icon);
      return { name: style.animationName, delay: style.animationDelay };
    }));
    expect(nodeAnimations).toEqual([
      { name: 'aiMindsetNode', delay: '0s' },
      { name: 'aiMindsetNode', delay: '1.52s' },
      { name: 'aiMindsetNode', delay: '3.04s' },
      { name: 'aiMindsetNode', delay: '4.56s' },
    ]);
    const beamAnimations = await page.locator('.ai-impact-story-mindset__step').evaluateAll((steps) => (
      steps.slice(0, -1).map((step) => {
        const style = getComputedStyle(step, '::after');
        return { name: style.animationName, delay: style.animationDelay, duration: style.animationDuration };
      })
    ));
    expect(beamAnimations).toEqual([
      { name: 'aiMindsetGlow', delay: '0.4s', duration: '1.31s' },
      { name: 'aiMindsetGlow', delay: '1.92s', duration: '1.31s' },
      { name: 'aiMindsetGlow', delay: '3.44s', duration: '1.31s' },
    ]);
    for (let index = 0; index < beamAnimations.length; index += 1) {
      const beamDelay = Number.parseFloat(beamAnimations[index].delay);
      const beamDuration = Number.parseFloat(beamAnimations[index].duration);
      const nextNodeDelay = Number.parseFloat(nodeAnimations[index + 1].delay);
      expect(Math.abs(nextNodeDelay - (beamDelay + beamDuration * 0.85))).toBeLessThan(0.02);
    }
    await expect.poll(async () => page.locator('.ai-impact-story-mindset__step').first().evaluate((step) => (
      getComputedStyle(step, '::after').animationName
    ))).toBe('aiMindsetGlow');
    await expect.poll(() => page.evaluate(() => {
      const stateWindow = window as typeof window & { __mindsetSequenceHistory?: string[] };
      return stateWindow.__mindsetSequenceHistory?.some((className) => className.includes('is-resetting'));
    }), { timeout: 7_000 }).toBe(true);
    await expect.poll(() => page.evaluate(() => {
      const stateWindow = window as typeof window & { __mindsetSequenceHistory?: string[] };
      const history = stateWindow.__mindsetSequenceHistory ?? [];
      const resetIndex = history.findIndex((className) => className.includes('is-resetting'));
      return resetIndex >= 0 && history.slice(resetIndex + 1).some((className) => className.includes('is-animated'));
    }), { timeout: 5_000 }).toBe(true);
  });

  test('section navigation jumps to the first scene of 01, 02 and 03', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoAndWait(page, '/zh-TW/ai-impact');
    const story = page.locator('.ai-impact-story');
    const nav = page.locator('.ai-impact-story__nav');
    await scrollStoryToStep(page, 0);

    await nav.getByRole('button', { name: /02/ }).click();
    await expect(story).toHaveAttribute('data-active-step', '4');
    await nav.getByRole('button', { name: /03/ }).click();
    await expect(story).toHaveAttribute('data-active-step', '12');
    await nav.getByRole('button', { name: /01/ }).click();
    await expect(story).toHaveAttribute('data-active-step', '1');
  });

  test('workflow skills explain their purpose on hover and keyboard focus', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoAndWait(page, '/zh-TW/ai-impact');
    await scrollStoryToStep(page, 3);

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

  test('mobile uses the same staged story and reduced motion preserves every scene', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoAndWait(page, '/en/ai-impact');
    const story = page.locator('.ai-impact-story');
    await expect(page.locator('.ai-impact-story__stage')).toHaveCSS('position', 'sticky');
    await scrollStoryToStep(page, 4);
    await expect(story).toHaveAttribute('data-active-step', '5');
    await expect(page.locator('.ai-impact-workflow-carousel')).toHaveAttribute('data-active-stage', '2');
    await expectNoHorizontalOverflow(page);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload();
    await expect(page.locator('.ai-impact-dots--highlight')).toHaveCSS('animation-name', 'none');
    await expect(page.locator('.ai-impact-dots--highlight')).toHaveCSS('opacity', '0');
    await expect(page.locator('.ai-impact-story__stage')).toHaveCSS('position', 'sticky');
    await expect.poll(async () => Number.parseFloat(
      await page.locator('.ai-impact-story__scene--mindset').evaluate((element) => getComputedStyle(element).transitionDuration),
    )).toBeLessThan(0.001);
    await expect(page.locator('.ai-impact-story__scene')).toHaveCount(3);
    await expectNoHorizontalOverflow(page);
  });

  test('all workflow breakpoints keep the intended layout without overflow', async ({ page }) => {
    const breakpoints = [
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 900 },
      { width: 1440, height: 900 },
    ];

    for (const breakpoint of breakpoints) {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await gotoAndWait(page, '/en/ai-impact');

      await expect(page.locator('.ai-impact-workflow-slide')).toHaveCount(7);
      await expect(page.locator('.ai-impact-story__stage')).toHaveCSS('position', 'sticky');
      await expect(page.locator('.ai-impact-workflow-track')).toHaveCSS('display', 'flex');
      await expectNoHorizontalOverflow(page);
    }
  });

  test('workflow heading stays clear of the section tabs', async ({ page }) => {
    for (const width of [1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await gotoAndWait(page, '/zh-TW/ai-impact');
      await scrollStoryToStep(page, 3);

      const layout = await page.evaluate(() => {
        const title = document.querySelector<HTMLElement>('#ai-impact-workflow');
        const nav = document.querySelector<HTMLElement>('.ai-impact-story__nav');
        if (!title || !nav) return null;

        const titleBox = title.getBoundingClientRect();
        const navBox = nav.getBoundingClientRect();
        return {
          titleTop: titleBox.top,
          navBottom: navBox.bottom,
        };
      });

      expect(layout).not.toBeNull();
      if (!layout) continue;
      expect(layout.titleTop - layout.navBottom).toBeGreaterThanOrEqual(16);
      await expectNoHorizontalOverflow(page);
    }
  });

  test('sections use the viewport below the navbar and 32px gap', async ({ page }) => {
    const viewports = [
      { width: 390, height: 844 },
      { width: 1024, height: 900 },
      { width: 1440, height: 900 },
    ];

    await page.setViewportSize(viewports[0]);
    await gotoAndWait(page, '/zh-TW/ai-impact');

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.evaluate(() => new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve()));
      }));

      const layout = await page.evaluate(() => {
        const pageElement = document.querySelector<HTMLElement>('.ai-impact-page');
        const navbar = document.querySelector<HTMLElement>('.site-nav');
        const story = document.querySelector<HTMLElement>('.ai-impact-story');
        const sticky = document.querySelector<HTMLElement>('.ai-impact-story__stage');
        if (!pageElement || !navbar || !story || !sticky) return null;

        const topGap = Number.parseFloat(
          window.getComputedStyle(pageElement).getPropertyValue('--ai-section-top-gap'),
        );
        const navbarHeight = navbar.getBoundingClientRect().height;
        const availableHeight = window.innerHeight - navbarHeight - topGap;

        return {
          availableHeight,
          stickyHeight: sticky.getBoundingClientRect().height,
          stickyTop: Number.parseFloat(window.getComputedStyle(sticky).top),
          expectedTop: navbarHeight + topGap,
        };
      });

      expect(layout).not.toBeNull();
      if (!layout) continue;

      expect(layout.stickyTop).toBeCloseTo(layout.expectedTop, 0);
      expect(layout.stickyHeight).toBeLessThanOrEqual(layout.availableHeight + 1);
    }
  });
});
