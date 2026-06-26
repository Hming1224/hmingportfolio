"use client";

import { useLocale } from "next-intl";
import CaseProposalTabs, { type CaseProposalTab } from "../../../components/case-study/CaseProposalTabs";
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
      <div className="cs-proposal-banner">
        <span className="cs-proposal-banner-kicker">{t(board.kicker)}</span>
        <h3 className="cs-proposal-banner-title">{t(board.title)}</h3>
      </div>

      <CaseProposalTabs
        tabs={tabs}
        defaultTab={board.defaultProposalIndex ?? 0}
        t={t}
        imageSizes="(max-width: 768px) 100vw, 1120px"
        variant="wireframe"
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
