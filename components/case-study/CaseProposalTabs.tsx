"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { useRef, useState } from "react";

type CaseProposalSlide = {
  image: string;
  alt?: string;
  caption: string;
  width?: number;
  height?: number;
};

type CaseProposalReference = {
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

export type CaseProposalTabsVariant = "solution" | "wireframe";

type CaseProposalTabsLabels = {
  previous: string;
  next: string;
  currentPage: string;
  stepDots: string;
  switchToStep: string;
};

type CaseProposalTabsProps = {
  tabs: CaseProposalTab[];
  labels: CaseProposalTabsLabels;
  t: (text: string) => string;
  defaultTab?: number;
  imageSizes: string;
  defaultImageWidth?: number;
  defaultImageHeight?: number;
  renderTabLabel?: (label: string) => ReactNode;
  variant?: CaseProposalTabsVariant;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return <Icon className={className} aria-hidden="true" size={18} strokeWidth={1.8} />;
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
  labels,
  t,
  defaultTab = 0,
  imageSizes,
  defaultImageWidth = 960,
  defaultImageHeight = 540,
  renderTabLabel = defaultRenderTabLabel,
  variant = "solution",
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
    <div className={cx("cs-proposal", `cs-proposal--${variant}`)}>
      <div className="cs-proposal-tabs" role="tablist">
        {tabs.map((item, index) => {
          const isActive = index === activeTab;
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cx(
                "cs-proposal-tab",
                isActive && "is-active",
              )}
              onClick={() => selectTab(index)}
            >
              {item.adopted ? (
                <StarIcon
                  className="cs-proposal-tab-star"
                />
              ) : null}
              <span>{renderTabLabel(t(item.label))}</span>
            </button>
          );
        })}
      </div>

      <div className="cs-proposal-panel">
        <div className="cs-proposal-stage">
          <button type="button" className="cs-proposal-nav" aria-label={labels.previous} disabled={!canGoPrev} onClick={goPrev}>
            <ArrowIcon className="cs-proposal-nav-icon" direction="left" />
          </button>

          <figure className="cs-proposal-frame">
            <div className="cs-proposal-shot" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
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
              <div className="cs-proposal-count" aria-label={labels.currentPage}>
                {slideIndex + 1} / {slides.length}
              </div>
            </div>
            <figcaption className="cs-proposal-caption">{t(slide.caption)}</figcaption>
            {variant === "wireframe" ? (
              <div className="cs-proposal-mobile-controls">
                <button
                  type="button"
                  className="cs-proposal-nav cs-proposal-nav--mobile"
                  aria-label={labels.previous}
                  disabled={!canGoPrev}
                  onClick={goPrev}
                >
                  <ArrowIcon className="cs-proposal-nav-icon" direction="left" />
                </button>
                <button
                  type="button"
                  className="cs-proposal-nav cs-proposal-nav--mobile"
                  aria-label={labels.next}
                  disabled={!canGoNext}
                  onClick={goNext}
                >
                  <ArrowIcon className="cs-proposal-nav-icon" direction="right" />
                </button>
              </div>
            ) : null}
          </figure>

          <button type="button" className="cs-proposal-nav" aria-label={labels.next} disabled={!canGoNext} onClick={goNext}>
            <ArrowIcon className="cs-proposal-nav-icon" direction="right" />
          </button>
        </div>

        <div className="cs-proposal-dots" aria-label={labels.stepDots}>
          {slides.map((item, index) => (
            <button
              key={item.image}
              type="button"
              className={cx("cs-proposal-dot", index === slideIndex && "is-active")}
              aria-label={`${labels.switchToStep} ${index + 1}`}
              aria-current={index === slideIndex ? "step" : undefined}
              onClick={() => setSlideIndex(index)}
            />
          ))}
        </div>

        <div className="cs-proposal-reason">
          <p className="cs-proposal-reason-title">{t(tab.reasonTitle)}</p>
          <p className="cs-proposal-reason-body">{t(tab.reasonBody)}</p>
          {tab.referenceImages ? (
            <div className="cs-proposal-references">
              {tab.referenceImages.map((item) => (
                <figure key={item.image} className="cs-proposal-reference">
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
