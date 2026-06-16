"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "../../../i18n/routing";
import type { WireframeBoard } from "../data";
import { translateCryptoArsenal } from "../i18n";

type WireframeProposalBoardProps = {
  board: WireframeBoard;
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className="ca-wf-nav-icon"
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

export default function WireframeProposalBoard({ board }: WireframeProposalBoardProps) {
  const locale = useLocale() as Locale;
  const t = (text: string) => translateCryptoArsenal(locale, text);
  const initialProposal = board.defaultProposalIndex ?? 0;
  const [activeProposalIndex, setActiveProposalIndex] = useState(initialProposal);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const proposal = board.proposals[activeProposalIndex] ?? board.proposals[0];
  const slide = proposal.slides[activeSlideIndex] ?? proposal.slides[0];
  const canGoPrev = activeSlideIndex > 0;
  const canGoNext = activeSlideIndex < proposal.slides.length - 1;

  function selectProposal(index: number) {
    setActiveProposalIndex(index);
    setActiveSlideIndex(0);
  }

  function goPrev() {
    if (!canGoPrev) return;
    setActiveSlideIndex((index) => index - 1);
  }

  function goNext() {
    if (!canGoNext) return;
    setActiveSlideIndex((index) => index + 1);
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
    <>
      <div className="ca-wf-banner">
        <span className="ca-wf-banner-kicker">{t(board.kicker)}</span>
        <h3 className="ca-wf-banner-title">{t(board.title)}</h3>
      </div>

      <div className="ca-wf-board">
        <div className="ca-wf-tabs" role="tablist" aria-label={t(board.title)}>
          {board.proposals.map((item, index) => {
            const isActive = index === activeProposalIndex;
            return (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`ca-wf-tab${isActive ? " is-active" : ""}${item.adopted ? " is-adopted" : ""}`}
                onClick={() => selectProposal(index)}
              >
                {item.adopted ? (
                  <svg
                    className="ca-wf-tab-star"
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ flexShrink: 0 }}
                  >
                    <path
                      d="M14.1452 1.32973L16.5549 6.21763L21.9521 7.00126C23.9112 7.28533 24.6948 9.69499 23.2745 11.0761L19.3759 14.8768L20.2967 20.2446C20.6297 22.1939 18.5825 23.6828 16.8291 22.7621L12 20.225L7.17087 22.7621C5.41749 23.6828 3.37025 22.1939 3.70329 20.2446L4.62406 14.8768L0.725495 11.0761C-0.694838 9.69499 0.0887943 7.28533 2.04787 7.00126L7.44514 6.21763L9.85481 1.32973C10.7364 -0.443242 13.2636 -0.443242 14.1452 1.32973Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : null}
                <span>{t(item.label)}</span>
              </button>
            );
          })}
        </div>

        <div className="ca-wf-panel">
          <div className="ca-wf-stage">
            <button
              type="button"
              className="ca-wf-nav"
              aria-label={t("上一張 wireframe")}
              disabled={!canGoPrev}
              onClick={goPrev}
            >
              <ArrowIcon direction="left" />
            </button>

            <figure className="ca-wf-frame">
              <div className="ca-wf-shot" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <Image
                  key={slide.img}
                  src={slide.img}
                  alt={t(slide.alt)}
                  width={slide.width}
                  height={slide.height}
                  sizes="(max-width: 768px) 100vw, 1120px"
                  unoptimized
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="ca-wf-shot-overlay">
                  <button
                    type="button"
                    className="ca-wf-nav ca-wf-nav-mobile"
                    aria-label={t("上一張 wireframe")}
                    disabled={!canGoPrev}
                    onClick={goPrev}
                  >
                    <ArrowIcon direction="left" />
                  </button>

                  <button
                    type="button"
                    className="ca-wf-nav ca-wf-nav-mobile"
                    aria-label={t("下一張 wireframe")}
                    disabled={!canGoNext}
                    onClick={goNext}
                  >
                    <ArrowIcon direction="right" />
                  </button>
                </div>
                <div className="ca-wf-shot-count" aria-label={t("Wireframe 目前頁數")}>
                  {activeSlideIndex + 1} / {proposal.slides.length}
                </div>
              </div>
              <figcaption className="ca-wf-cap">{t(slide.caption)}</figcaption>
            </figure>

            <button
              type="button"
              className="ca-wf-nav"
              aria-label={t("下一張 wireframe")}
              disabled={!canGoNext}
              onClick={goNext}
            >
              <ArrowIcon direction="right" />
            </button>
          </div>

          <div className="ca-wf-step-dots" aria-label={t("Wireframe 步驟")}>
            {proposal.slides.map((item, index) => (
              <button
                key={item.img}
                type="button"
                className={`ca-wf-dot${index === activeSlideIndex ? " is-active" : ""}`}
                aria-label={`${t("切換到步驟")} ${index + 1}`}
                aria-current={index === activeSlideIndex ? "step" : undefined}
                onClick={() => setActiveSlideIndex(index)}
              />
            ))}
          </div>

          <div className="ca-wf-reason">
            <p className="ca-wf-reason-title">{t(proposal.reasonTitle)}</p>
            <p className="ca-wf-reason-body">{t(proposal.reasonBody)}</p>
            {proposal.referenceImages ? (
              <div className="ca-wf-references">
                {proposal.referenceImages.map((item) => (
                  <figure key={item.img} className="ca-wf-reference">
                    <Image
                      src={item.img}
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
    </>
  );
}
