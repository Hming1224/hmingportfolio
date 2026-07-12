"use client";

import { useState, type KeyboardEvent } from "react";
import {
  Tabs,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from "../../../components/animate-ui/primitives/base/tabs";

export interface WalkthroughStep {
  src: string;
  alt: string;
  caption: string;
}

export interface WalkthroughFlow {
  id: string;
  label: string;
  steps: WalkthroughStep[];
}

export interface WalkthroughLabels {
  flows: string;
  stage: string;
  step: string;
  prev: string;
  next: string;
  goToStep: string;
}

interface OutcomeWalkthroughProps {
  kicker: string;
  title: string;
  flows: WalkthroughFlow[];
  labels: WalkthroughLabels;
}

/**
 * 總覽區的整案成果走查：以期末交付的實際 UI 圖面重現三條核心流程，
 * 讓看的人自己「點下一步」走完，而不是只看單一元件或影片。
 */
export default function OutcomeWalkthrough({
  kicker,
  title,
  flows,
  labels,
}: OutcomeWalkthroughProps) {
  const initialFlow = flows[0];

  if (!initialFlow) return null;

  return (
    <Tabs defaultValue={initialFlow.id} className="cs-outcome-walkthrough">
      <div className="cs-walkthrough-copy">
        <p className="cs-walkthrough-kicker cs-copy-title">{kicker}</p>
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
            <WalkthroughFlowPanel flow={flow} labels={labels} />
          </TabsPanel>
        ))}
      </TabsPanels>
    </Tabs>
  );
}

function WalkthroughFlowPanel({ flow, labels }: { flow: WalkthroughFlow; labels: WalkthroughLabels }) {
  const [stepIndex, setStepIndex] = useState(0);

  const total = flow.steps.length;
  const step = flow.steps[stepIndex] ?? flow.steps[0]!;

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
          {flow.steps.map((item, index) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={item.src}
              src={item.src}
              alt={index === stepIndex ? item.alt : ""}
              className={index === stepIndex ? "is-active" : undefined}
              aria-hidden={index !== stepIndex}
              draggable={false}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        <div className="cs-walkthrough-panel">
          <p className="cs-walkthrough-progress" aria-hidden="true">
            {labels.step} {String(stepIndex + 1).padStart(2, "0")}
          </p>
          <p className="cs-walkthrough-caption cs-copy-body" aria-live="polite">
            {step.caption}
          </p>
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
        </div>
    </div>
  );
}
