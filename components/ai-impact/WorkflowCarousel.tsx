'use client';

import { ArrowRight, FileInput, PackageCheck, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

export type WorkflowStage = {
  title: string;
  body: string;
  tools: string;
  usage: string;
  skill: string;
  skillTips: string[];
  input: string;
  action: string;
  output: string;
};

type WorkflowCarouselProps = {
  items: WorkflowStage[];
  progressLabel: string;
  labels: {
    tools: string;
    usage: string;
    skill: string;
    input: string;
    action: string;
    output: string;
  };
};

export default function WorkflowCarousel({ items, progressLabel, labels }: WorkflowCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const activeStageRef = useRef(0);
  const wheelGestureRef = useRef(false);
  const wheelTimerRef = useRef<number | null>(null);
  const touchStartRef = useRef<number | null>(null);
  const touchTriggeredRef = useRef(false);
  const [activeStage, setActiveStage] = useState(0);

  const getMetrics = useCallback(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    if (!root || !panel) return null;

    const stickyTop = window.innerWidth <= 768 ? 64 : 80;
    const top = root.getBoundingClientRect().top + window.scrollY;
    const range = Math.max(root.offsetHeight - panel.offsetHeight, 1);
    return { root, panel, stickyTop, top, range };
  }, []);

  const goToStage = useCallback((stage: number, behavior: ScrollBehavior = 'smooth') => {
    const metrics = getMetrics();
    if (!metrics) return;

    const nextStage = Math.min(Math.max(stage, 0), items.length - 1);
    const progress = nextStage / Math.max(items.length - 1, 1);
    window.scrollTo({ top: metrics.top - metrics.stickyTop + metrics.range * progress, behavior });
  }, [getMetrics, items.length]);

  useEffect(() => {
    const update = () => {
      frameRef.current = null;
      const metrics = getMetrics();
      if (!metrics) return;

      const rect = metrics.root.getBoundingClientRect();
      const progress = Math.min(Math.max((metrics.stickyTop - rect.top) / metrics.range, 0), 1);
      const stage = Math.round(progress * (items.length - 1));
      const snappedProgress = stage / Math.max(items.length - 1, 1);
      const offset = stage * metrics.panel.clientWidth;

      metrics.root.dataset.progress = snappedProgress.toFixed(3);
      metrics.root.style.setProperty('--workflow-offset', `${-offset}px`);
      activeStageRef.current = stage;
      setActiveStage((current) => (current === stage ? current : stage));
    };

    const scheduleUpdate = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(update);
    };

    const isPinned = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      const metrics = getMetrics();
      if (!metrics) return false;
      const rect = metrics.root.getBoundingClientRect();
      return rect.top <= metrics.stickyTop + 2 && rect.bottom >= metrics.panel.offsetHeight + metrics.stickyTop - 2;
    };

    const unlockWheel = () => {
      if (wheelTimerRef.current !== null) window.clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(() => {
        wheelGestureRef.current = false;
      }, 180);
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isPinned() || Math.abs(event.deltaY) < 8) return;
      const direction = event.deltaY > 0 ? 1 : -1;
      const target = activeStageRef.current + direction;
      if (target < 0 || target >= items.length) return;

      event.preventDefault();
      unlockWheel();
      if (wheelGestureRef.current) return;
      wheelGestureRef.current = true;
      goToStage(target);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null;
      touchTriggeredRef.current = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const start = touchStartRef.current;
      const current = event.touches[0]?.clientY;
      if (start === null || current === undefined || !isPinned()) return;

      const delta = start - current;
      if (Math.abs(delta) < 10) return;
      const direction = delta > 0 ? 1 : -1;
      const target = activeStageRef.current + direction;
      if (target < 0 || target >= items.length) return;

      event.preventDefault();
      if (touchTriggeredRef.current || Math.abs(delta) < 36) return;
      touchTriggeredRef.current = true;
      goToStage(target);
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
      touchTriggeredRef.current = false;
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      if (wheelTimerRef.current !== null) window.clearTimeout(wheelTimerRef.current);
    };
  }, [getMetrics, goToStage, items.length]);

  const style = {
    '--workflow-count': items.length,
    '--workflow-scroll-height': `${100 + (items.length - 1) * 100}svh`,
  } as CSSProperties;

  const getSkills = (item: WorkflowStage) => item.skill.split(' + ').map((name, index) => ({
    name,
    tip: item.skillTips[index],
  }));

  return (
    <div
      className="ai-impact-workflow-carousel"
      data-active-stage={activeStage + 1}
      data-progress="0.000"
      ref={rootRef}
      style={style}
    >
      <div className="ai-impact-workflow-carousel__sticky" ref={panelRef}>
        <div className="ai-impact-workflow-progress" aria-label={progressLabel}>
          <p aria-live="polite">
            <span>{String(activeStage + 1).padStart(2, '0')}</span>
            <span aria-hidden="true"> / </span>
            <span>{String(items.length).padStart(2, '0')}</span>
          </p>
          <ol>
            {items.map((item, index) => (
              <li className={index === activeStage ? 'is-active' : ''} key={item.title}>
                <button
                  type="button"
                  aria-label={`${String(index + 1).padStart(2, '0')} ${item.title}`}
                  aria-current={index === activeStage ? 'step' : undefined}
                  onClick={() => goToStage(index)}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="ai-impact-workflow-track">
          {items.map((item, index) => (
            <article className="ai-impact-workflow-slide" key={item.title} data-stage={index + 1} aria-hidden={index !== activeStage}>
              <div className="ai-impact-workflow-slide__copy">
                <p className="ai-impact-workflow-slide__number">{String(index + 1).padStart(2, '0')}</p>
                <h3>{item.title}</h3>
                <p className="ai-impact-workflow-slide__body">{item.body}</p>
                <dl>
                  <div><dt>{labels.tools}</dt><dd>{item.tools}</dd></div>
                  <div><dt>{labels.usage}</dt><dd>{item.usage}</dd></div>
                  <div>
                    <dt>{labels.skill}</dt>
                    <dd className="ai-impact-workflow-skills">
                      {getSkills(item).map((skill, skillIndex) => {
                        const tooltipId = `workflow-skill-${index + 1}-${skillIndex + 1}`;
                        return (
                          <span className="ai-impact-skill" key={skill.name} tabIndex={0} aria-describedby={tooltipId}>
                            <code>{skill.name}</code>
                            <span className="ai-impact-skill__tip" id={tooltipId} role="tooltip">
                              {skill.tip}
                            </span>
                          </span>
                        );
                      })}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="ai-impact-handoff" aria-label={`${item.title} ${labels.output}`}>
                <div className="ai-impact-handoff__node">
                  <FileInput aria-hidden="true" />
                  <span>{labels.input}</span>
                  <strong>{item.input}</strong>
                </div>
                <ArrowRight className="ai-impact-handoff__arrow" aria-hidden="true" />
                <div className="ai-impact-handoff__node ai-impact-handoff__node--active">
                  <Sparkles aria-hidden="true" />
                  <span>{labels.action}</span>
                  <strong>{item.action}</strong>
                </div>
                <ArrowRight className="ai-impact-handoff__arrow" aria-hidden="true" />
                <div className="ai-impact-handoff__node">
                  <PackageCheck aria-hidden="true" />
                  <span>{labels.output}</span>
                  <strong>{item.output}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
