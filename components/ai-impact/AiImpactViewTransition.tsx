'use client';

import { flushSync } from 'react-dom';

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
};

let activeAnimation: Animation | null = null;
let transitioning = false;

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
}: CircularTransitionOptions) {
  if (transitioning) return false;
  transitioning = true;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const transitionDocument = document as TransitionDocument;

  if (!transitionDocument.startViewTransition || reduceMotion) {
    navigate();
    await waitForRoute(readySelector);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    transitioning = false;
    return true;
  }

  activeAnimation?.cancel();
  const { clipPath, originX, originY } = getThemeTransitionClipPaths(anchor);
  document.documentElement.dataset.aiImpactTransition = direction;
  document.documentElement.style.setProperty('--ai-transition-x', `${originX}%`);
  document.documentElement.style.setProperty('--ai-transition-y', `${originY}%`);

  const transition = transitionDocument.startViewTransition(async () => {
    flushSync(navigate);
    await waitForRoute(readySelector);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });

  try {
    await transition.ready;
    activeAnimation = document.documentElement.animate(
      { clipPath: direction === 'enter' ? clipPath : [...clipPath].reverse() },
      {
        duration: 760,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        pseudoElement:
          direction === 'enter' ? '::view-transition-new(root)' : '::view-transition-old(root)',
      },
    );
  } catch {
    transitioning = false;
    delete document.documentElement.dataset.aiImpactTransition;
    document.documentElement.style.removeProperty('--ai-transition-x');
    document.documentElement.style.removeProperty('--ai-transition-y');
    return true;
  }

  transition.finished.finally(() => {
    activeAnimation = null;
    transitioning = false;
    delete document.documentElement.dataset.aiImpactTransition;
    document.documentElement.style.removeProperty('--ai-transition-x');
    document.documentElement.style.removeProperty('--ai-transition-y');
  });

  return true;
}
