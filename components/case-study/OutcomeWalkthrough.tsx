"use client";

import { useState, type CSSProperties, type KeyboardEvent } from "react";
import {
  Tabs,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from "../animate-ui/primitives/base/tabs";

export interface WalkthroughStep {
  src: string;
  alt: string;
  caption: string;
  media?: "image" | "video";
  poster?: string;
  mask?: string;
}

type WalkthroughVideoStyle = CSSProperties & {
  "--cs-walkthrough-video-mask"?: string;
};

type OutcomeWalkthroughStyle = CSSProperties & {
  "--cs-walkthrough-frame-aspect-ratio"?: string;
};

export interface WalkthroughFlow {
  id: string;
  label: string;
  steps: WalkthroughStep[];
  progressLabel?: string;
}

export interface WalkthroughLabels {
  flows: string;
  stage: string;
  step: string;
  prev: string;
  next: string;
  goToStep: string;
}

export interface OutcomeWalkthroughProps {
  kicker: string;
  title: string;
  flows: WalkthroughFlow[];
  labels: WalkthroughLabels;
  frameAspectRatio?: string;
  ui?: {
    controls?: boolean;
    dots?: boolean;
  };
}

export default function OutcomeWalkthrough({
  kicker,
  title,
  flows,
  labels,
  frameAspectRatio,
  ui,
}: OutcomeWalkthroughProps) {
  const initialFlow = flows[0];
  const style: OutcomeWalkthroughStyle | undefined = frameAspectRatio
    ? { "--cs-walkthrough-frame-aspect-ratio": frameAspectRatio }
    : undefined;

  if (!initialFlow) return null;

  return (
    <Tabs defaultValue={initialFlow.id} className="cs-outcome-walkthrough" style={style}>
      <div className="cs-walkthrough-copy">
        <p className="cs-walkthrough-kicker">{kicker}</p>
        <h3 className="cs-walkthrough-title">{title}</h3>
      </div>

      <TabsHighlight className="project-tabs-highlight cs-walkthrough-tabs">
        <TabsList
          aria-label={labels.flows}
          className="project-tabs-list cs-walkthrough-tabs-list"
          compactOnMobile
          size="medium"
        >
          {flows.map((flow) => (
            <TabsHighlightItem value={flow.id} className="project-tabs-item" key={flow.id}>
              <TabsTab value={flow.id} className="project-tabs-tab cs-walkthrough-tab">
                {flow.label}
              </TabsTab>
            </TabsHighlightItem>
          ))}
        </TabsList>
      </TabsHighlight>

      <TabsPanels className="cs-walkthrough-panels" mode="wait">
        {flows.map((flow) => (
          <TabsPanel key={flow.id} value={flow.id}>
            <WalkthroughFlowPanel flow={flow} labels={labels} ui={ui} />
          </TabsPanel>
        ))}
      </TabsPanels>
    </Tabs>
  );
}

function WalkthroughFlowPanel({
  flow,
  labels,
  ui,
}: {
  flow: WalkthroughFlow;
  labels: WalkthroughLabels;
  ui?: OutcomeWalkthroughProps["ui"];
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const total = flow.steps.length;
  const step = flow.steps[stepIndex] ?? flow.steps[0];
  const showControls = (ui?.controls ?? true) && total > 1;
  const showDots = (ui?.dots ?? true) && total > 1;

  if (!step) return null;

  const goToStep = (index: number) => {
    setStepIndex(Math.min(Math.max(index, 0), total - 1));
  };

  const onStageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToStep(stepIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToStep(stepIndex - 1);
    }
  };

  return (
    <div
      className="cs-walkthrough-stage"
      role="group"
      aria-label={labels.stage}
      tabIndex={0}
      onKeyDown={onStageKeyDown}
    >
      <div className="cs-walkthrough-frame">
        {flow.steps.map((item, index) => {
          const isActive = index === stepIndex;

          if (item.media === "video") {
            const videoStyle: WalkthroughVideoStyle | undefined = item.mask
              ? { "--cs-walkthrough-video-mask": `url(${item.mask})` }
              : undefined;

            return (
              <video
                key={item.src}
                src={item.src}
                poster={item.poster}
                className={`${isActive ? "is-active" : ""}${item.mask ? " cs-walkthrough-video--masked" : ""}`.trim() || undefined}
                style={videoStyle}
                aria-label={isActive ? item.alt : undefined}
                aria-hidden={!isActive}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            );
          }

          return (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={item.src}
              src={item.src}
              alt={isActive ? item.alt : ""}
              className={isActive ? "is-active" : undefined}
              aria-hidden={!isActive}
              draggable={false}
              loading={index === 0 ? "eager" : "lazy"}
            />
          );
        })}
      </div>

      <div className="cs-walkthrough-panel" data-single-step={total === 1}>
        <p className="cs-walkthrough-progress" aria-hidden="true">
          {flow.progressLabel ?? `${labels.step} ${String(stepIndex + 1).padStart(2, "0")}`}
        </p>
        <p className="cs-walkthrough-caption cs-copy-body" aria-live="polite">
          {step.caption}
        </p>
        {showControls ? (
          <div className="cs-walkthrough-controls">
            <button
              type="button"
              className="cs-walkthrough-btn"
              onClick={() => goToStep(stepIndex - 1)}
              disabled={stepIndex === 0}
            >
              {labels.prev}
            </button>
            <button
              type="button"
              className="cs-walkthrough-btn cs-walkthrough-btn--primary"
              onClick={() => goToStep(stepIndex + 1)}
              disabled={stepIndex === total - 1}
            >
              {labels.next}
            </button>
          </div>
        ) : null}
        {showDots ? (
          <div className="cs-walkthrough-dots">
            {flow.steps.map((item, index) => (
              <button
                key={item.src}
                type="button"
                className="cs-walkthrough-dot"
                aria-label={`${labels.goToStep} ${index + 1}`}
                aria-current={index === stepIndex}
                onClick={() => goToStep(index)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
