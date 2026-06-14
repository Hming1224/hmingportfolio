"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "../../../i18n/routing";
import type { WireframeBoard } from "../data";
import { translateCryptoArsenal } from "../i18n";

type WireframeProposalBoardProps = {
  board: WireframeBoard;
};

export default function WireframeProposalBoard({ board }: WireframeProposalBoardProps) {
  const locale = useLocale() as Locale;
  const t = (text: string) => translateCryptoArsenal(locale, text);
  const initialProposal = board.defaultProposalIndex ?? 0;
  const [activeProposalIndex, setActiveProposalIndex] = useState(initialProposal);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const proposal = board.proposals[activeProposalIndex] ?? board.proposals[0];
  const slide = proposal.slides[activeSlideIndex] ?? proposal.slides[0];
  const canGoPrev = activeSlideIndex > 0;
  const canGoNext = activeSlideIndex < proposal.slides.length - 1;

  function selectProposal(index: number) {
    setActiveProposalIndex(index);
    setActiveSlideIndex(0);
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
                  <span className="ca-wf-tab-star" aria-hidden="true">
                    ★
                  </span>
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
              onClick={() => setActiveSlideIndex((index) => index - 1)}
            >
              ‹
            </button>

            <figure className="ca-wf-frame">
              <div className="ca-wf-shot">
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
              </div>
              <figcaption className="ca-wf-cap">{t(slide.caption)}</figcaption>
            </figure>

            <button
              type="button"
              className="ca-wf-nav"
              aria-label={t("下一張 wireframe")}
              disabled={!canGoNext}
              onClick={() => setActiveSlideIndex((index) => index + 1)}
            >
              ›
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
