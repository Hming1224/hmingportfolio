'use client';

import { useLocale } from 'next-intl';
import CaseProposalTabs, { type CaseProposalTab } from '../../../components/case-study/CaseProposalTabs';
import type { Locale } from '../../../i18n/routing';
import { translateAdvantech } from '../i18n';

export type ProposalTab = {
  label: string;
  slides: ProposalSlide[];
  reasonTitle: string;
  reason: string;
  adopted?: boolean;
};

type ProposalSlide = {
  image: string;
  caption: string;
};

type Props = {
  tabs: ProposalTab[];
  defaultTab?: number;
};

export default function ProposalTabs({ tabs, defaultTab = 0 }: Props) {
  const locale = useLocale() as Locale;
  const t = (text: string) => translateAdvantech(locale, text);
  const caseTabs: CaseProposalTab[] = tabs.map((tab) => ({
    label: tab.label,
    adopted: tab.adopted,
    slides: tab.slides.map((slide) => ({
      image: slide.image,
      caption: slide.caption,
    })),
    reasonTitle: tab.reasonTitle,
    reasonBody: tab.reason,
  }));

  return (
    <CaseProposalTabs
      tabs={caseTabs}
      defaultTab={defaultTab}
      t={t}
      imageSizes="(max-width: 768px) 100vw, 1120px"
      variant="solution"
      labels={{
        previous: t('上一張'),
        next: t('下一張'),
        currentPage: t('目前頁數'),
        stepDots: t('提案步驟'),
        switchToStep: t('切換到步驟'),
      }}
    />
  );
}
