'use client';

import {
  ArrowRight,
  Blocks,
  BrainCircuit,
  CircleCheckBig,
  Compass,
  DatabaseBackup,
  FileCode2,
  FlaskConical,
  FolderTree,
  Play,
  RefreshCw,
  Search,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import OutcomeDepthCarousel, { type OutcomeItem } from './OutcomeDepthCarousel';
import WorkflowCarousel, { type WorkflowStage } from './WorkflowCarousel';

const mindsetIcons = [Compass, FlaskConical, Blocks, DatabaseBackup];
const workflowPathIcons = [Search, Play, RefreshCw];
const WORKFLOW_START = 3;
const PATHS_STEP = 10;
const OUTCOMES_STEP = 11;
const STORY_STEP_COUNT = 12;
const MINDSET_SEQUENCE_DURATION = 5700;
const MINDSET_REPLAY_DELAY = 3000;
/* 極矮的手機（iPhone SE 等）舞台只剩約 555px，釘住的 story 塞不下一段的內容。
   這個尺寸改成一般文件往下捲，全部段落攤開。查詢字串必須與 ai-impact.css
   裡的靜態版面 media query 一字不差，行為與版面才不會脫鉤。 */
const STATIC_STORY_QUERY = '(max-width: 768px) and (max-height: 700px)';

function toMilliseconds(value: string) {
  const duration = Number.parseFloat(value);
  if (!Number.isFinite(duration)) return 600;
  return value.trim().endsWith('ms') ? duration : duration * 1000;
}

export type MindsetItem = { title: string; body: string };
export type MindsetEvidence = {
  kind: 'skill' | 'memory';
  eyebrow: string;
  title: string;
  fileName: string;
  items: string[];
  caption: string;
};
export type WorkflowPath = { title: string; stages: string; body: string };

type StoryLabels = {
  mindset: { title: string; lead: string };
  workflow: {
    title: string;
    lead: string;
    progressLabel: string;
    pathsLabel: string;
    pathsTitle: string;
    labels: {
      tools: string;
      usage: string;
      skill: string;
      input: string;
      action: string;
      output: string;
      nextPhase: string;
    };
  };
  outcomes: {
    title: string;
    lead: string;
    carousel: string;
    previous: string;
    next: string;
    stages: string;
    skills: string;
  };
};

type AiImpactStoryStageProps = {
  mindsetItems: MindsetItem[];
  mindsetEvidence: MindsetEvidence[];
  workflowItems: WorkflowStage[];
  workflowPaths: WorkflowPath[];
  outcomes: OutcomeItem[];
  labels: StoryLabels;
};

type StorySection = 'mindset' | 'workflow' | 'outcomes';
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function getSection(step: number): StorySection {
  if (step < WORKFLOW_START) return 'mindset';
  if (step < OUTCOMES_STEP) return 'workflow';
  return 'outcomes';
}

function MindsetProof({ item }: { item: MindsetEvidence }) {
  return (
    <figure className={`ai-impact-proof ai-impact-proof--${item.kind}`}>
      <div className="ai-impact-proof__surface">
        <div className="ai-impact-proof__body">
          <div className="ai-impact-proof__heading">
            <span>{item.eyebrow}</span>
            <h3>{item.title}</h3>
          </div>
          <span className="ai-impact-proof__file">
            {item.kind === 'skill' ? <FileCode2 aria-hidden="true" /> : <BrainCircuit aria-hidden="true" />}
            <span>{item.fileName}</span>
          </span>
          <div className={`ai-impact-proof__diagram ai-impact-proof__diagram--${item.kind}`}>
            {item.items.map((entry, index) => (
              <div className="ai-impact-proof__diagram-entry" key={entry}>
                <div className="ai-impact-proof__node">
                  {item.kind === 'skill' ? <CircleCheckBig aria-hidden="true" /> : <FolderTree aria-hidden="true" />}
                  <span>{entry}</span>
                </div>
                {index < item.items.length - 1 ? <ArrowRight aria-hidden="true" /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption><p>{item.caption}</p></figcaption>
    </figure>
  );
}

export default function AiImpactStoryStage({
  mindsetItems,
  mindsetEvidence,
  workflowItems,
  workflowPaths,
  outcomes,
  labels,
}: AiImpactStoryStageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const activeStepRef = useRef(0);
  const wheelGestureRef = useRef(false);
  const wheelTimerRef = useRef<number | null>(null);
  const touchStartRef = useRef<number | null>(null);
  const touchTriggeredRef = useRef(false);
  const mindsetStepsRef = useRef<HTMLOListElement>(null);
  const mindsetNodeRefs = useRef<Array<HTMLLIElement | null>>([]);
  const mindsetRectsRef = useRef<DOMRect[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isStatic, setIsStatic] = useState(false);
  const [staticSection, setStaticSection] = useState<StorySection>('mindset');

  const activeSection = isStatic ? staticSection : getSection(activeStep);
  const mindsetMode = isStatic || activeStep === 0 ? 'overview' : 'detail';
  const evidenceIndex = activeStep === 1 ? 0 : activeStep === 2 ? 1 : null;
  const workflowStage = clamp(activeStep - WORKFLOW_START, 0, workflowItems.length - 1);
  const workflowMode = activeStep === PATHS_STEP ? 'paths' : 'stages';
  /* 捲動提示從第一步一路陪到底，只有走進最後一段（03 成果）才收掉。
     靜態版面沒有「下一步」可言，整個不顯示。 */
  const isLastStep = isStatic || activeStep === STORY_STEP_COUNT - 1;

  const getMetrics = useCallback(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return null;
    const stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 112;
    const top = root.getBoundingClientRect().top + window.scrollY;
    const range = Math.max(root.offsetHeight - stage.offsetHeight, 1);
    return { root, stage, stickyTop, top, range };
  }, []);

  const goToStep = useCallback((step: number, behavior: ScrollBehavior = 'smooth') => {
    const metrics = getMetrics();
    if (!metrics) return;
    const nextStep = clamp(step, 0, STORY_STEP_COUNT - 1);
    window.scrollTo({
      top: metrics.top - metrics.stickyTop + metrics.range * (nextStep / (STORY_STEP_COUNT - 1)),
      behavior,
    });
  }, [getMetrics]);

  /* 導覽列與階段點是「直接跳到某一段」，距離超過一步就別平滑捲動——
     中間每個 scene 都會被快速掃過一次，只剩干擾。相鄰的一步維持平滑。 */
  const jumpToStep = useCallback((step: number) => {
    if (isStatic) {
      const scenes = rootRef.current?.querySelectorAll<HTMLElement>('.ai-impact-story__scene');
      const index = step < WORKFLOW_START ? 0 : step < OUTCOMES_STEP ? 1 : 2;
      scenes?.[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const target = clamp(step, 0, STORY_STEP_COUNT - 1);
    goToStep(target, Math.abs(target - activeStepRef.current) > 1 ? 'instant' : 'smooth');
  }, [goToStep, isStatic]);

  useEffect(() => {
    const query = window.matchMedia(STATIC_STORY_QUERY);
    const sync = () => setIsStatic(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  /* 靜態版面沒有 step 可推，導覽改用「哪一段在畫面上」決定 active。 */
  useEffect(() => {
    const story = rootRef.current;
    if (!isStatic || !story) return;
    const scenes = Array.from(
      story.querySelectorAll<HTMLElement>('.ai-impact-story__scene'),
    );
    if (!scenes.length) return;
    const sections: StorySection[] = ['mindset', 'workflow', 'outcomes'];
    /* 每個 scene 都比視窗高，用 intersectionRatio 判斷會永遠達不到門檻。
       改成經典 scrollspy：只看視窗中央那條窄帶被哪一段佔住。 */
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (!visible) return;
      const index = scenes.indexOf(visible.target as HTMLElement);
      if (index >= 0) setStaticSection(sections[index]);
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    scenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, [isStatic]);

  useEffect(() => {
    if (isStatic) return;
    const story = rootRef.current;
    const stage = stageRef.current;
    const hero = document.querySelector<HTMLElement>('.ai-impact-hero');
    if (!story || !stage || !hero) return;

    const pageRoot = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setProgress = (progress: number, isMobileLayout = false) => {
      const clampedProgress = clamp(progress, 0, 1);
      const segmentProgress = (start: number, end: number) => {
        if (clampedProgress <= start) return 0;
        if (clampedProgress >= end) return 1;
        return (clampedProgress - start) / (end - start);
      };
      const heroExitProgress = isMobileLayout
        ? segmentProgress(0.3, 0.8)
        : segmentProgress(0.24, 0.56);
      const storyEnterProgress = isMobileLayout
        ? segmentProgress(0.08, 0.55)
        : segmentProgress(0.56, 1);

      pageRoot.style.setProperty('--ai-story-hero-opacity', Math.max(0.001, 1 - heroExitProgress).toFixed(3));
      pageRoot.style.setProperty('--ai-story-stage-opacity', Math.max(0.001, storyEnterProgress).toFixed(3));
      pageRoot.style.setProperty('--ai-story-hero-y', `${Math.round(-72 * heroExitProgress)}px`);
      pageRoot.style.setProperty('--ai-story-stage-y', `${Math.round(96 * (1 - storyEnterProgress))}px`);
      pageRoot.style.setProperty('--ai-story-hero-scale', (1 - 0.02 * heroExitProgress).toFixed(3));
      pageRoot.style.setProperty('--ai-story-stage-scale', (0.98 + 0.02 * storyEnterProgress).toFixed(3));
    };

    const clearProgress = () => {
      pageRoot.style.removeProperty('--ai-story-hero-opacity');
      pageRoot.style.removeProperty('--ai-story-stage-opacity');
      pageRoot.style.removeProperty('--ai-story-hero-y');
      pageRoot.style.removeProperty('--ai-story-stage-y');
      pageRoot.style.removeProperty('--ai-story-hero-scale');
      pageRoot.style.removeProperty('--ai-story-stage-scale');
    };

    if (reducedMotion) {
      pageRoot.dataset.aiStoryVisible = 'true';
      setProgress(1);
      return () => {
        delete pageRoot.dataset.aiStoryVisible;
        clearProgress();
      };
    }

    let frame = 0;
    let gateAnimationFrame = 0;
    let lastScrollY = window.scrollY;
    let gateAnimating = false;

    const setStoryVisibility = (progress: number) => {
      if (progress > 0.02) pageRoot.dataset.aiStoryVisible = 'true';
      else delete pageRoot.dataset.aiStoryVisible;
    };

    const getStoryTop = () => {
      let top = 0;
      let element: HTMLElement | null = story;
      while (element) {
        top += element.offsetTop;
        element = element.offsetParent as HTMLElement | null;
      }
      return top;
    };

    const requestProgressUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    const animateGate = (fromY: number, toY: number, fromProgress: number, toProgress: number) => {
      gateAnimating = true;
      const duration = 720;
      const startTime = window.performance.now();
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easeInOutCubic = (t: number) => (
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      );
      const easeOutBack = (t: number) => {
        const c1 = 0.72;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      };

      const tick = (time: number) => {
        const elapsed = Math.min(1, (time - startTime) / duration);
        const scrollEase = easeOutBack(elapsed);
        const progressEase = (easeInOutCubic(elapsed) + easeOutCubic(elapsed)) / 2;
        const distance = toY - fromY;
        const maxOvershoot = distance === 0 ? 0 : 24 / Math.abs(distance);
        const boundedScrollEase = clamp(scrollEase, 0 - maxOvershoot, 1 + maxOvershoot);
        const currentY = fromY + distance * boundedScrollEase;
        const currentProgress = fromProgress + (toProgress - fromProgress) * progressEase;

        setProgress(currentProgress);
        setStoryVisibility(currentProgress);
        window.scrollTo({ top: currentY, behavior: 'auto' });
        lastScrollY = currentY;

        if (elapsed < 1) {
          gateAnimationFrame = window.requestAnimationFrame(tick);
          return;
        }

        gateAnimating = false;
        gateAnimationFrame = 0;
        window.scrollTo({ top: toY, behavior: 'auto' });
        setProgress(toProgress);
        setStoryVisibility(toProgress);
        lastScrollY = toY;
        requestProgressUpdate();
      };

      if (gateAnimationFrame) window.cancelAnimationFrame(gateAnimationFrame);
      gateAnimationFrame = window.requestAnimationFrame(tick);
    };

    function updateProgress() {
      frame = 0;
      if (gateAnimating) return;

      const storyTop = getStoryTop();
      const isMobileLayout = window.matchMedia('(max-width: 900px)').matches;
      const start = isMobileLayout
        ? Math.max(0, storyTop - Math.min(window.innerHeight * 0.4, 320))
        : Math.max(0, storyTop - window.innerHeight - 120);
      const end = isMobileLayout
        ? Math.max(start + 1, storyTop - 48)
        : Math.max(start + 1, storyTop - 120);
      const progress = (window.scrollY - start) / (end - start);
      const scrollingDown = window.scrollY >= lastScrollY;
      const crossedGate = !isMobileLayout && (scrollingDown
        ? progress > 0.25 && progress < 0.98
        : progress > 0.02 && progress < 0.75);

      if (crossedGate) {
        animateGate(window.scrollY, scrollingDown ? end : start, clamp(progress, 0, 1), scrollingDown ? 1 : 0);
        return;
      }

      const snappedProgress = progress > 0.98 ? 1 : progress < 0.02 ? 0 : progress;
      setProgress(snappedProgress, isMobileLayout);
      setStoryVisibility(snappedProgress);
      lastScrollY = window.scrollY;
    }

    updateProgress();
    window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    window.addEventListener('resize', requestProgressUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (gateAnimationFrame) window.cancelAnimationFrame(gateAnimationFrame);
      window.removeEventListener('scroll', requestProgressUpdate);
      window.removeEventListener('resize', requestProgressUpdate);
      delete pageRoot.dataset.aiStoryVisible;
      clearProgress();
    };
  }, [isStatic]);

  useEffect(() => {
    if (isStatic) return;
    const update = () => {
      frameRef.current = null;
      const metrics = getMetrics();
      if (!metrics) return;
      const rect = metrics.root.getBoundingClientRect();
      const progress = clamp((metrics.stickyTop - rect.top) / metrics.range, 0, 1);
      const nextStep = Math.round(progress * (STORY_STEP_COUNT - 1));
      metrics.root.dataset.progress = progress.toFixed(3);
      if (nextStep !== activeStepRef.current) {
        setDirection(nextStep > activeStepRef.current ? 'forward' : 'backward');
        activeStepRef.current = nextStep;
        setActiveStep(nextStep);
      }
    };

    const scheduleUpdate = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(update);
    };
    const isPinned = () => {
      const metrics = getMetrics();
      if (!metrics) return false;
      const rect = metrics.root.getBoundingClientRect();
      return rect.top <= metrics.stickyTop + 2 && rect.bottom >= metrics.stage.offsetHeight + metrics.stickyTop - 2;
    };
    const unlockWheel = () => {
      if (wheelTimerRef.current !== null) window.clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(() => { wheelGestureRef.current = false; }, 420);
    };
    const handleWheel = (event: WheelEvent) => {
      if (!isPinned() || Math.abs(event.deltaY) < 8) return;
      const target = activeStepRef.current + (event.deltaY > 0 ? 1 : -1);
      if (target < 0 || target >= STORY_STEP_COUNT) return;
      event.preventDefault();
      unlockWheel();
      if (wheelGestureRef.current) return;
      wheelGestureRef.current = true;
      goToStep(target);
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
      const target = activeStepRef.current + (delta > 0 ? 1 : -1);
      if (Math.abs(delta) < 10 || target < 0 || target >= STORY_STEP_COUNT) return;
      event.preventDefault();
      if (touchTriggeredRef.current || Math.abs(delta) < 36) return;
      touchTriggeredRef.current = true;
      goToStep(target);
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
  }, [getMetrics, goToStep, isStatic]);

  useLayoutEffect(() => {
    if (isStatic) return;
    const nodes = mindsetNodeRefs.current.filter((node): node is HTMLLIElement => Boolean(node));
    if (!nodes.length) return;
    const nextRects = nodes.map((node) => node.getBoundingClientRect());
    const previousRects = mindsetRectsRef.current;
    if (previousRects.length === nextRects.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node, index) => {
        const styles = window.getComputedStyle(node);
        const duration = toMilliseconds(styles.getPropertyValue('--hm-duration-enter'));
        const easing = styles.getPropertyValue('--hm-ease-in-out').trim() || 'ease-in-out';
        node.getAnimations().forEach((animation) => animation.cancel());
        node.animate({
          transform: [
            `translate3d(${previousRects[index].left - nextRects[index].left}px, ${previousRects[index].top - nextRects[index].top}px, 0)`,
            'translate3d(0, 0, 0)',
          ],
        }, {
          duration,
          easing,
        });
      });
    }
    mindsetRectsRef.current = nextRects;
  }, [mindsetMode, isStatic]);

  useEffect(() => {
    const element = mindsetStepsRef.current;
    if (!element) return;

    let sequenceTimer = 0;
    let resetTimer = 0;
    let replayTimer = 0;
    let active = false;
    const resetDuration = toMilliseconds(
      window.getComputedStyle(element).getPropertyValue('--hm-duration-enter'),
    );

    const clearTimers = () => {
      window.clearTimeout(sequenceTimer);
      window.clearTimeout(resetTimer);
      window.clearTimeout(replayTimer);
    };
    const stop = () => {
      clearTimers();
      element.classList.remove('is-animated', 'is-resetting');
    };
    const play = () => {
      if (!active) return;
      element.classList.add('is-animated');
      sequenceTimer = window.setTimeout(() => {
        element.classList.replace('is-animated', 'is-resetting');
        resetTimer = window.setTimeout(() => {
          element.classList.remove('is-resetting');
          replayTimer = window.setTimeout(play, MINDSET_REPLAY_DELAY);
        }, resetDuration);
      }, MINDSET_SEQUENCE_DURATION);
    };

    const observer = new IntersectionObserver(([entry]) => {
      active = !isStatic && activeStep === 0 && entry.isIntersecting;
      stop();
      if (active && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) play();
    }, { threshold: 0.3 });

    observer.observe(element);
    return () => {
      active = false;
      stop();
      observer.disconnect();
    };
  }, [activeStep, isStatic]);

  const sectionClass = (section: StorySection) => {
    if (isStatic) return 'is-active';
    const order = { mindset: 0, workflow: 1, outcomes: 2 };
    if (section === activeSection) return 'is-active';
    return order[section] < order[activeSection] ? 'is-before' : 'is-after';
  };
  const sceneHidden = (section: StorySection) => !isStatic && activeSection !== section;
  const style = {
    '--story-scroll-height': `calc(var(--ai-viewport-space) + ${(STORY_STEP_COUNT - 1) * 100}svh)`,
  } as CSSProperties;

  return (
    <div className="ai-impact-story" data-static={isStatic ? 'true' : undefined} data-active-step={activeStep + 1} data-active-section={activeSection} data-direction={direction} data-progress="0.000" ref={rootRef} style={style}>
      <div
        className="ai-impact-story__stage"
        ref={stageRef}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'PageDown') {
            event.preventDefault();
            goToStep(activeStep + 1);
          } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
            event.preventDefault();
            goToStep(activeStep - 1);
          }
        }}
      >
        <nav className="ai-impact-story__nav" aria-label="AI Impact sections">
          {[
            { section: 'mindset' as const, number: '01', title: labels.mindset.title, step: 0 },
            { section: 'workflow' as const, number: '02', title: labels.workflow.title, step: WORKFLOW_START },
            { section: 'outcomes' as const, number: '03', title: labels.outcomes.title, step: OUTCOMES_STEP },
          ].map((item) => (
            <button type="button" className={activeSection === item.section ? 'is-active' : ''} aria-current={activeSection === item.section ? 'step' : undefined} onClick={() => jumpToStep(item.step)} key={item.section}>
              <span>{item.number}</span><span className="ai-impact-story__nav-label"><span>{item.title}</span></span>
            </button>
          ))}
        </nav>

        <section className={`ai-impact-story__scene ai-impact-story__scene--mindset ${sectionClass('mindset')}`} aria-labelledby="ai-impact-mindset" aria-hidden={sceneHidden('mindset')} inert={sceneHidden('mindset')}>
          <div className="ai-impact-story__intro">
            <p className="ai-impact-section__number">01</p>
            <h2 id="ai-impact-mindset">{labels.mindset.title}</h2>
            <p>{labels.mindset.lead}</p>
          </div>
          <div className={`ai-impact-story-mindset is-${mindsetMode}${activeStep === 2 ? ' is-complete' : ''}`}>
            <ol className="ai-impact-story-mindset__steps ai-impact-mindset__steps" ref={mindsetStepsRef}>
              {mindsetItems.map((item, index) => {
                const Icon = mindsetIcons[index];
                return (
                  <li className="ai-impact-story-mindset__step ai-impact-mindset__step" key={item.title} ref={(node) => { mindsetNodeRefs.current[index] = node; }}>
                    <span className="ai-impact-mindset__icon" aria-hidden="true"><Icon size={28} strokeWidth={1.8} /></span>
                    <div>
                      <span className="ai-impact-mindset__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      <h3>{item.title}</h3><p>{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="ai-impact-story-mindset__proof" aria-live="polite">
              {isStatic
                ? mindsetEvidence.map((item) => <MindsetProof item={item} key={item.kind} />)
                : evidenceIndex !== null && mindsetEvidence[evidenceIndex]
                  ? <MindsetProof item={mindsetEvidence[evidenceIndex]} key={mindsetEvidence[evidenceIndex].kind} />
                  : null}
            </div>
          </div>
        </section>

        <section className={`ai-impact-story__scene ai-impact-story__scene--workflow ${sectionClass('workflow')}`} aria-labelledby="ai-impact-workflow" aria-hidden={sceneHidden('workflow')} inert={sceneHidden('workflow')}>
          <div className={`ai-impact-story-workflow is-${workflowMode}`}>
            <div className="ai-impact-story__intro">
              <p className="ai-impact-section__number">02</p>
              <h2 id="ai-impact-workflow">{labels.workflow.title}</h2>
              <p>{labels.workflow.lead}</p>
            </div>
            <div className={`ai-impact-story-workflow__panel${isStatic || workflowMode === 'stages' ? ' is-active' : ''}`}>
              <WorkflowCarousel items={workflowItems} progressLabel={labels.workflow.progressLabel} labels={labels.workflow.labels} activeStage={workflowStage} onStageSelect={(stage) => jumpToStep(WORKFLOW_START + stage)} embedded />
            </div>
            <div className={`ai-impact-story-workflow__paths${isStatic || workflowMode === 'paths' ? ' is-active' : ''}`}>
              <div className="ai-impact-workflow-paths" id="ai-impact-workflow-paths">
                <div className="ai-impact-workflow-paths__intro"><p>{labels.workflow.pathsLabel}</p><h3>{labels.workflow.pathsTitle}</h3></div>
                <div className="ai-impact-workflow-paths__grid">
                  {workflowPaths.map((path, index) => {
                    const Icon = workflowPathIcons[index];
                    return (
                      <article key={path.title}>
                        <div className="ai-impact-workflow-paths__card-heading">
                          <span className="ai-impact-workflow-paths__icon" aria-hidden="true"><Icon /></span>
                          <div><span>{path.stages}</span><h4>{path.title}</h4></div>
                        </div>
                        <p>{path.body}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`ai-impact-story__scene ai-impact-story__scene--outcomes ${sectionClass('outcomes')}`} aria-labelledby="ai-impact-example" aria-hidden={sceneHidden('outcomes')} inert={sceneHidden('outcomes')}>
          <div className="ai-impact-story__intro">
            <p className="ai-impact-section__number">03</p><h2 id="ai-impact-example">{labels.outcomes.title}</h2><p>{labels.outcomes.lead}</p>
          </div>
          <OutcomeDepthCarousel items={outcomes} labels={{ carousel: labels.outcomes.carousel, previous: labels.outcomes.previous, next: labels.outcomes.next, stages: labels.outcomes.stages, skills: labels.outcomes.skills }} />
        </section>

        <p className={`ai-impact-story__hint${isLastStep ? ' is-hidden' : ''}`} aria-hidden={isLastStep}>
          <span>{labels.workflow.labels.nextPhase}</span><ArrowRight aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}
