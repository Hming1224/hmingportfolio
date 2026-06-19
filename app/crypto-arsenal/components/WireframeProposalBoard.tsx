"use client";

import { useLocale } from "next-intl";
import CaseProposalTabs, { type CaseProposalTab } from "../../components/CaseProposalTabs";
import type { Locale } from "../../../i18n/routing";
import type { WireframeBoard } from "../data";
import { translateCryptoArsenal } from "../i18n";

type WireframeProposalBoardProps = {
  board: WireframeBoard;
};

export default function WireframeProposalBoard({ board }: WireframeProposalBoardProps) {
  const locale = useLocale() as Locale;
  const t = (text: string) => translateCryptoArsenal(locale, text);
  const tabs: CaseProposalTab[] = board.proposals.map((proposal) => ({
    label: proposal.label,
    adopted: proposal.adopted,
    slides: proposal.slides.map((slide) => ({
      image: slide.img,
      alt: slide.alt,
      caption: slide.caption,
      width: slide.width,
      height: slide.height,
    })),
    reasonTitle: proposal.reasonTitle,
    reasonBody: proposal.reasonBody,
    referenceImages: proposal.referenceImages?.map((item) => ({
      image: item.img,
      alt: item.alt,
      width: item.width,
      height: item.height,
    })),
  }));

  return (
    <>
      <div className="ca-wf-banner">
        <span className="ca-wf-banner-kicker">{t(board.kicker)}</span>
        <h3 className="ca-wf-banner-title">{t(board.title)}</h3>
      </div>

      <CaseProposalTabs
        tabs={tabs}
        defaultTab={board.defaultProposalIndex ?? 0}
        t={t}
        imageSizes="(max-width: 768px) 100vw, 1120px"
        classes={{
          root: "ca-wf-board",
          tabs: "ca-wf-tabs",
          tab: "ca-wf-tab",
          tabActive: "is-active",
          tabAdopted: "is-adopted",
          tabStar: "ca-wf-tab-star",
          tabStarInactive: "case-proposal-star-muted",
          tabStarActive: "ca-wf-tab-star-active",
          panel: "ca-wf-panel",
          stage: "ca-wf-stage",
          nav: "ca-wf-nav",
          navIcon: "ca-wf-nav-icon",
          frame: "ca-wf-frame",
          shot: "ca-wf-shot",
          shotOverlay: "ca-wf-shot-overlay",
          shotCount: "ca-wf-shot-count",
          caption: "ca-wf-cap",
          mobileControls: "ca-wf-mobile-controls",
          stepDots: "ca-wf-step-dots",
          dot: "ca-wf-dot",
          dotActive: "is-active",
          reason: "ca-wf-reason",
          reasonTitle: "ca-wf-reason-title",
          reasonBody: "ca-wf-reason-body",
          references: "ca-wf-references",
          reference: "ca-wf-reference",
        }}
        labels={{
          previous: t("上一張 wireframe"),
          next: t("下一張 wireframe"),
          currentPage: t("Wireframe 目前頁數"),
          stepDots: t("Wireframe 步驟"),
          switchToStep: t("切換到步驟"),
        }}
      />
    </>
  );
}
