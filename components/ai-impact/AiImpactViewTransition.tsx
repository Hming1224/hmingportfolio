'use client';

/**
 * Circular route transition adapted from Magic UI's Animated Theme Toggler.
 * Source: https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/animated-theme-toggler.tsx
 * MIT License, Copyright (c) Magic UI.
 */

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type TransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void> | void) => ViewTransition;
};

type CircularTransitionOptions = {
  anchor: HTMLElement;
  direction: 'enter' | 'leave';
  navigate: () => void;
  readySelector: string;
  scrollTarget?: string;
};

let activeAnimation: Animation | null = null;
let transitioning = false;
let contentReadyTimer: number | null = null;

function toMilliseconds(value: string) {
  const normalized = value.trim();
  if (normalized.endsWith('ms')) return Number.parseFloat(normalized);
  if (normalized.endsWith('s')) return Number.parseFloat(normalized) * 1000;
  return 0;
}

/* 兩個方向的手感不一樣，不能共用同一條曲線。
   進場是「圓從按鈕長大」：套 --hm-ease-out（cubic-bezier(0.22, 1, 0.36, 1)）會在
   四分之一的時間就走完 79% 的半徑，圓還沒長就蓋滿畫面，看起來是跳接。
   等速才會從第一個影格就穩定往外推，看得到它長大。
   離場是圓縮小，同一條曲線前快後慢，最後那一小圈會慢慢收起來，手感是對的，維持原樣。 */
function getTransitionMotion(direction: 'enter' | 'leave') {
  const styles = getComputedStyle(document.documentElement);
  const enterDuration = toMilliseconds(styles.getPropertyValue('--hm-duration-enter')) || 600;
  const fastDuration = toMilliseconds(styles.getPropertyValue('--hm-duration-fast'));
  const leaveEasing = styles.getPropertyValue('--hm-ease-out').trim() || 'cubic-bezier(0.22, 1, 0.36, 1)';

  if (direction === 'enter') {
    return { duration: enterDuration, easing: 'linear' };
  }

  return { duration: enterDuration + fastDuration, easing: leaveEasing };
}

function releaseTransitionContent() {
  if (document.documentElement.dataset.aiImpactContentReady) return;
  document.documentElement.dataset.aiImpactContentReady = 'true';
  window.dispatchEvent(new Event('ai-impact-transition-content-ready'));
}

function finishAiImpactTransition() {
  if (contentReadyTimer !== null) {
    window.clearTimeout(contentReadyTimer);
    contentReadyTimer = null;
  }
  releaseTransitionContent();
  /* fill: 'forwards' 的動畫跑完不會自己消失，會一直掛在文件的動畫清單上。
     下一次轉場重新產生同一個 ::view-transition-new(root) 時，舊動畫會再度套用、
     把 clip-path 直接拉到終點——畫面上就是圓圈瞬間跳掉或殘留一圈黑。
     這裡只是把跑完的動畫清掉，不影響任何位置或尺寸計算。 */
  activeAnimation?.cancel();
  activeAnimation = null;
  transitioning = false;
  delete document.documentElement.dataset.aiImpactTransition;
  delete document.documentElement.dataset.aiImpactContentReady;
  document.documentElement.style.removeProperty('--ai-transition-x');
  document.documentElement.style.removeProperty('--ai-transition-y');
  window.dispatchEvent(new Event('ai-impact-transition-end'));
}

function waitForRoute(selector: string) {
  return new Promise<void>((resolve) => {
    if (document.querySelector(selector)) {
      resolve();
      return;
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        window.clearTimeout(timeout);
        resolve();
      }
    });
    const timeout = window.setTimeout(() => {
      observer.disconnect();
      resolve();
    }, 4000);

    observer.observe(document.body, { childList: true, subtree: true });
  });
}

function getThemeTransitionClipPaths(anchor: HTMLElement) {
  const { left, top, width, height } = anchor.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const viewportRadius = Math.hypot(window.innerWidth, window.innerHeight) / Math.SQRT2;
  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
  const radius = (maxRadius / viewportRadius) * 100 + 1;
  const originX = (x / window.innerWidth) * 100;
  const originY = (y / window.innerHeight) * 100;

  return {
    clipPath: [
      `circle(0% at ${originX}% ${originY}%)`,
      `circle(${radius}% at ${originX}% ${originY}%)`,
    ],
    originX,
    originY,
  };
}

export async function runAiImpactTransition({
  anchor,
  direction,
  navigate,
  readySelector,
  scrollTarget,
}: CircularTransitionOptions) {
  if (transitioning) return false;
  transitioning = true;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const transitionDocument = document as TransitionDocument;
  const motion = getTransitionMotion(direction);
  const restoreScroll = () => {
    if (scrollTarget) {
      document.querySelector(scrollTarget)?.scrollIntoView();
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${window.location.search}${scrollTarget}`,
      );
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  if (!transitionDocument.startViewTransition || reduceMotion) {
    navigate();
    await waitForRoute(readySelector);
    restoreScroll();
    transitioning = false;
    return true;
  }

  activeAnimation?.cancel();
  const { clipPath, originX, originY } = getThemeTransitionClipPaths(anchor);
  document.documentElement.dataset.aiImpactTransition = direction;
  document.documentElement.style.setProperty('--ai-transition-x', `${originX}%`);
  document.documentElement.style.setProperty('--ai-transition-y', `${originY}%`);

  const transition = transitionDocument.startViewTransition(async () => {
    navigate();
    await waitForRoute(readySelector);
    restoreScroll();
  });

  try {
    await transition.ready;
    activeAnimation = document.documentElement.animate(
      { clipPath: direction === 'enter' ? clipPath : [...clipPath].reverse() },
      {
        duration: motion.duration,
        easing: motion.easing,
        fill: 'forwards',
        pseudoElement:
          direction === 'enter' ? '::view-transition-new(root)' : '::view-transition-old(root)',
      },
    );
    contentReadyTimer = window.setTimeout(releaseTransitionContent, 440);
  } catch {
    finishAiImpactTransition();
    return true;
  }

  transition.finished.finally(finishAiImpactTransition);

  return true;
}
