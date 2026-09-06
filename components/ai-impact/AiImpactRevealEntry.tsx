'use client';

import type { KeyboardEvent, MouseEvent, PointerEvent } from 'react';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { runAiImpactTransition } from './AiImpactViewTransition';

const HOLD_DURATION = 800;
let routeWarmup: Promise<unknown> | null = null;

function warmAiImpactRoute() {
  routeWarmup ??= Promise.all([
    import('./AiImpactStoryStage'),
    import('./WorkflowCarousel'),
    import('./OutcomeDepthCarousel'),
  ]);
  return routeWarmup;
}

export default function AiImpactRevealEntry({ label }: { label?: string } = {}) {
  const t = useTranslations('aiImpact');
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const holdTimerRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const triggeredRef = useRef(false);
  const pointerRef = useRef<number | null>(null);

  function clearHoldTimer() {
    if (holdTimerRef.current !== null) window.clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
  }

  async function complete() {
    if (triggeredRef.current || !buttonRef.current) return;
    triggeredRef.current = true;
    activeRef.current = false;
    clearHoldTimer();

    // Let the fully charged state reach the screen before View Transition
    // snapshots the old page. This avoids batching the last fill frame with
    // the route render, which made the handoff feel like it paused at 100%.
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    await runAiImpactTransition({
      anchor: buttonRef.current,
      direction: 'enter',
      navigate: () => router.push('/ai-impact'),
      readySelector: '.ai-impact-page',
    });
  }

  function start() {
    if (activeRef.current || triggeredRef.current) return;
    void warmAiImpactRoute();
    activeRef.current = true;
    buttonRef.current?.classList.add('is-charging');
    clearHoldTimer();
    holdTimerRef.current = window.setTimeout(() => {
      void complete();
    }, HOLD_DURATION);
  }

  function cancel() {
    if (!activeRef.current || triggeredRef.current) return;
    activeRef.current = false;
    pointerRef.current = null;
    clearHoldTimer();
    buttonRef.current?.classList.remove('is-charging');
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    pointerRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    start();
  }

  function handlePointerEnd(event: PointerEvent<HTMLButtonElement>) {
    if (pointerRef.current !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    cancel();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (![' ', 'Enter'].includes(event.key) || event.repeat) return;
    event.preventDefault();
    start();
  }

  function handleKeyUp(event: KeyboardEvent<HTMLButtonElement>) {
    if (![' ', 'Enter'].includes(event.key)) return;
    event.preventDefault();
    cancel();
  }

  useEffect(() => {
    router.prefetch('/ai-impact');
    const supportsIdleCallback = typeof window.requestIdleCallback === 'function';
    const warmupId = supportsIdleCallback
      ? window.requestIdleCallback(() => {
          void warmAiImpactRoute();
        }, { timeout: HOLD_DURATION })
      : window.setTimeout(() => {
          void warmAiImpactRoute();
        }, HOLD_DURATION);

    return () => {
      if (supportsIdleCallback) window.cancelIdleCallback(warmupId);
      else window.clearTimeout(warmupId);
      clearHoldTimer();
    };
  }, [router]);

  const text = label ?? t('reveal');
  const handlers = {
    onContextMenu: (event: MouseEvent<HTMLButtonElement>) => event.preventDefault(),
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onPointerCancel: handlePointerEnd,
    onPointerDown: handlePointerDown,
    onPointerLeave: cancel,
    onPointerUp: handlePointerEnd,
  };

  return (
    <button
      ref={buttonRef}
      className="ds-button ds-button-secondary ds-button-md ai-impact-reveal-cta"
      type="button"
      aria-label={t('revealAria')}
      {...handlers}
    >
      <span className="ai-impact-reveal__fill" aria-hidden="true" />
      <span className="ds-button-content ai-impact-reveal__label"><span>{text}</span></span>
      <span className="ds-button-content ai-impact-reveal__label ai-impact-reveal__label--active" aria-hidden="true">
        <span>{text}</span>
      </span>
    </button>
  );
}
