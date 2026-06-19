"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useRef, useState } from "react";

export type CaseProposalSlide = {
  image: string;
  alt?: string;
  caption: string;
  width?: number;
  height?: number;
};

export type CaseProposalReference = {
  image: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseProposalTab = {
  label: string;
  adopted?: boolean;
  slides: CaseProposalSlide[];
  reasonTitle: string;
  reasonBody: string;
  referenceImages?: CaseProposalReference[];
};

type CaseProposalTabsClasses = {
  root: string;
  tabs: string;
  tab: string;
  tabActive: string;
  tabAdopted?: string;
  tabStar: string;
  tabStarInactive?: string;
  tabStarActive?: string;
  panel: string;
  stage: string;
  nav: string;
  navIcon: string;
  frame: string;
  shot: string;
  shotOverlay?: string;
  shotCount: string;
  caption: string;
  mobileControls?: string;
  stepDots: string;
  dot: string;
  dotActive: string;
  reason: string;
  reasonTitle: string;
  reasonBody: string;
  references?: string;
  reference?: string;
};

type CaseProposalTabsLabels = {
  previous: string;
  next: string;
  currentPage: string;
  stepDots: string;
  switchToStep: string;
};

type CaseProposalTabsProps = {
  tabs: CaseProposalTab[];
  classes: CaseProposalTabsClasses;
  labels: CaseProposalTabsLabels;
  t: (text: string) => string;
  defaultTab?: number;
  imageSizes: string;
  defaultImageWidth?: number;
  defaultImageHeight?: number;
  renderTabLabel?: (label: string) => ReactNode;
};

function defaultRenderTabLabel(label: string) {
  const match = label.match(/^(.+?[:：])\s*(.+)$/);
  if (!match) return label;
  return (
    <>
      {match[1]}
      <br />
      {match[2]}
    </>
  );
}

function ArrowIcon({ className, direction }: { className: string; direction: "left" | "right" }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={direction === "left" ? "M10.875 4.5L6.375 9L10.875 13.5" : "M7.125 4.5L11.625 9L7.125 13.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1452 1.32973L16.5549 6.21763L21.9521 7.00126C23.9112 7.28533 24.6948 9.69499 23.2745 11.0761L19.3759 14.8768L20.2967 20.2446C20.6297 22.1939 18.5825 23.6828 16.8291 22.7621L12 20.225L7.17087 22.7621C5.41749 23.6828 3.37025 22.1939 3.70329 20.2446L4.62406 14.8768L0.725495 11.0761C-0.694838 9.69499 0.0887943 7.28533 2.04787 7.00126L7.44514 6.21763L9.85481 1.32973C10.7364 -0.443242 13.2636 -0.443242 14.1452 1.32973Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function CaseProposalTabs({
  tabs,
  classes,
  labels,
  t,
  defaultTab = 0,
  imageSizes,
  defaultImageWidth = 960,
  defaultImageHeight = 540,
  renderTabLabel = defaultRenderTabLabel,
}: CaseProposalTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [slideIndex, setSlideIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const tab = tabs[activeTab] ?? tabs[0];
  const slides = tab.slides;
  const slide = slides[slideIndex] ?? slides[0];
  const canGoPrev = slideIndex > 0;
  const canGoNext = slideIndex < slides.length - 1;

  function selectTab(index: number) {
    setActiveTab(index);
    setSlideIndex(0);
  }

  function goPrev() {
    if (!canGoPrev) return;
    setSlideIndex((index) => index - 1);
  }

  function goNext() {
    if (!canGoNext) return;
    setSlideIndex((index) => index + 1);
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current == null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = touchEndX - touchStartX.current;
    const swipeThreshold = 36;

    if (deltaX <= -swipeThreshold) {
      goNext();
    } else if (deltaX >= swipeThreshold) {
      goPrev();
    }

    touchStartX.current = null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.tabs} role="tablist">
        {tabs.map((item, index) => {
          const isActive = index === activeTab;
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={[
                classes.tab,
                isActive ? classes.tabActive : "",
                item.adopted && classes.tabAdopted ? classes.tabAdopted : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => selectTab(index)}
            >
              {item.adopted ? (
                <StarIcon
                  className={[
                    classes.tabStar,
                    isActive ? classes.tabStarActive : classes.tabStarInactive,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              ) : null}
              <span>{renderTabLabel(t(item.label))}</span>
            </button>
          );
        })}
      </div>

      <div className={classes.panel}>
        <div className={classes.stage}>
          <button type="button" className={classes.nav} aria-label={labels.previous} disabled={!canGoPrev} onClick={goPrev}>
            <ArrowIcon className={classes.navIcon} direction="left" />
          </button>

          <figure className={classes.frame}>
            <div className={classes.shot} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <Image
                key={slide.image}
                src={slide.image}
                alt={t(slide.alt ?? slide.caption)}
                width={slide.width ?? defaultImageWidth}
                height={slide.height ?? defaultImageHeight}
                sizes={imageSizes}
                unoptimized
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              {classes.shotOverlay ? (
                <div className={classes.shotOverlay}>
                  <button
                    type="button"
                    className={`${classes.nav} ${classes.nav}-mobile`}
                    aria-label={labels.previous}
                    disabled={!canGoPrev}
                    onClick={goPrev}
                  >
                    <ArrowIcon className={classes.navIcon} direction="left" />
                  </button>
                  <button
                    type="button"
                    className={`${classes.nav} ${classes.nav}-mobile`}
                    aria-label={labels.next}
                    disabled={!canGoNext}
                    onClick={goNext}
                  >
                    <ArrowIcon className={classes.navIcon} direction="right" />
                  </button>
                </div>
              ) : null}
              <div className={classes.shotCount} aria-label={labels.currentPage}>
                {slideIndex + 1} / {slides.length}
              </div>
            </div>
            <figcaption className={classes.caption}>{t(slide.caption)}</figcaption>
            {classes.mobileControls ? (
              <div className={classes.mobileControls}>
                <button
                  type="button"
                  className={`${classes.nav} ${classes.nav}-mobile`}
                  aria-label={labels.previous}
                  disabled={!canGoPrev}
                  onClick={goPrev}
                >
                  <ArrowIcon className={classes.navIcon} direction="left" />
                </button>
                <button
                  type="button"
                  className={`${classes.nav} ${classes.nav}-mobile`}
                  aria-label={labels.next}
                  disabled={!canGoNext}
                  onClick={goNext}
                >
                  <ArrowIcon className={classes.navIcon} direction="right" />
                </button>
              </div>
            ) : null}
          </figure>

          <button type="button" className={classes.nav} aria-label={labels.next} disabled={!canGoNext} onClick={goNext}>
            <ArrowIcon className={classes.navIcon} direction="right" />
          </button>
        </div>

        <div className={classes.stepDots} aria-label={labels.stepDots}>
          {slides.map((item, index) => (
            <button
              key={item.image}
              type="button"
              className={`${classes.dot}${index === slideIndex ? ` ${classes.dotActive}` : ""}`}
              aria-label={`${labels.switchToStep} ${index + 1}`}
              aria-current={index === slideIndex ? "step" : undefined}
              onClick={() => setSlideIndex(index)}
            />
          ))}
        </div>

        <div className={classes.reason}>
          <p className={classes.reasonTitle}>{t(tab.reasonTitle)}</p>
          <p className={classes.reasonBody}>{t(tab.reasonBody)}</p>
          {tab.referenceImages && classes.references && classes.reference ? (
            <div className={classes.references}>
              {tab.referenceImages.map((item) => (
                <figure key={item.image} className={classes.reference}>
                  <Image
                    src={item.image}
                    alt={t(item.alt)}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 768px) 100vw, 48vw"
                    unoptimized
                  />
                </figure>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
