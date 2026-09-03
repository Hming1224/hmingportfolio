'use client';

import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { runAiImpactTransition } from './AiImpactViewTransition';

const HOLD_DURATION = 800;

export default function AiImpactRevealEntry() {
  const t = useTranslations('aiImpact');
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  const activeRef = useRef(false);
  const triggeredRef = useRef(false);
  const pointerRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [charging, setCharging] = useState(false);

  function clearFrame() {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }

  async function complete() {
    if (triggeredRef.current || !buttonRef.current) return;
    triggeredRef.current = true;
    activeRef.current = false;
    clearFrame();
    setProgress(1);
    setCharging(false);
    await runAiImpactTransition({
      anchor: buttonRef.current,
      direction: 'enter',
      navigate: () => router.push('/ai-impact'),
      readySelector: '.ai-impact-page',
    });
  }

  function tick(now: number) {
    if (!activeRef.current) return;
    const nextProgress = Math.min((now - startedAtRef.current) / HOLD_DURATION, 1);
    setProgress(nextProgress);
    if (nextProgress >= 1) {
      void complete();
      return;
    }
    frameRef.current = requestAnimationFrame(tick);
  }

  function start() {
    if (activeRef.current || triggeredRef.current) return;
    activeRef.current = true;
    startedAtRef.current = performance.now();
    setCharging(true);
    clearFrame();
    frameRef.current = requestAnimationFrame(tick);
  }

  function cancel() {
    if (!activeRef.current || triggeredRef.current) return;
    activeRef.current = false;
    pointerRef.current = null;
    clearFrame();
    setCharging(false);
    setProgress(0);
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

  useEffect(() => () => clearFrame(), []);

  return (
    <div className="ai-impact-entry">
      <button
        ref={buttonRef}
        className={`ai-impact-reveal${charging ? ' is-charging' : ''}`}
        type="button"
        aria-label={t('revealAria')}
        style={{ '--charge-progress': progress } as CSSProperties}
        onContextMenu={(event) => event.preventDefault()}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onPointerCancel={handlePointerEnd}
        onPointerDown={handlePointerDown}
        onPointerLeave={cancel}
        onPointerUp={handlePointerEnd}
      >
        <span className="ai-impact-reveal__fill" aria-hidden="true" />
        <span className="ai-impact-reveal__label">{t('reveal')}</span>
        <span className="ai-impact-reveal__label ai-impact-reveal__label--active" aria-hidden="true">
          {t('reveal')}
        </span>
      </button>
      <span className="ai-impact-entry__hint">{t('revealHint')}</span>
    </div>
  );
}
