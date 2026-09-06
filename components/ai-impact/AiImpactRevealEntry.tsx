'use client';

import type { KeyboardEvent, MouseEvent, PointerEvent } from 'react';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { prefetchFullRoute } from '@/lib/route-prefetch';
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
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const holdTimerRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const triggeredRef = useRef(false);
  const pointerRef = useRef<number | null>(null);
  const fillDoneRef = useRef<(() => void) | null>(null);

  function clearHoldTimer() {
    if (holdTimerRef.current !== null) window.clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
  }

  function detachFillListener() {
    fillDoneRef.current?.();
    fillDoneRef.current = null;
  }

  async function complete() {
    if (triggeredRef.current || !buttonRef.current) return;
    triggeredRef.current = true;
    activeRef.current = false;
    clearHoldTimer();
    detachFillListener();

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
    // 長按這 800ms 就是拿來把 RSC payload 抓回來的，導頁當下才不用等網路。
    prefetchFullRoute(router, '/ai-impact');
    activeRef.current = true;
    buttonRef.current?.classList.add('is-charging');
    clearHoldTimer();
    detachFillListener();

    /* 交棒的時機綁在充能條自己的 transitionend，不是另外算一個 800ms 計時器。
       計時器會比 CSS transition 早幾毫秒到，畫面被 View Transition 凍住時
       進度條就停在 99%，看起來像「充滿了卻卡住不動」。 */
    const fill = fillRef.current;
    if (fill) {
      const onFillEnd = (event: TransitionEvent) => {
        if (event.propertyName !== 'clip-path' || event.target !== fill) return;
        void complete();
      };
      fill.addEventListener('transitionend', onFillEnd);
      fillDoneRef.current = () => fill.removeEventListener('transitionend', onFillEnd);
    }

    /* transitionend 在背景分頁、或動畫被系統略過時不會來，留一個保底計時器。 */
    holdTimerRef.current = window.setTimeout(() => {
      void complete();
    }, HOLD_DURATION + (fill ? 220 : 0));
  }

  function cancel() {
    if (!activeRef.current || triggeredRef.current) return;
    activeRef.current = false;
    pointerRef.current = null;
    clearHoldTimer();
    /* 先拆監聽再收回填色，否則回彈的那段 transition 也會觸發 transitionend。 */
    detachFillListener();
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
    prefetchFullRoute(router, '/ai-impact');
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
      detachFillListener();
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
      <span className="ai-impact-reveal__fill" ref={fillRef} aria-hidden="true" />
      <span className="ds-button-content ai-impact-reveal__label"><span>{text}</span></span>
      <span className="ds-button-content ai-impact-reveal__label ai-impact-reveal__label--active" aria-hidden="true">
        <span>{text}</span>
      </span>
    </button>
  );
}
