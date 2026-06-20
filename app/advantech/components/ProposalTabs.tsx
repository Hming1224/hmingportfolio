'use client';

import { useLocale } from 'next-intl';
import CaseProposalTabs, { type CaseProposalTab } from '../../components/CaseProposalTabs';
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
      classes={{
        root: 'cs-sol-prop',
        tabs: 'cs-sol-tabs',
        tab: 'cs-sol-tab',
        tabActive: 'cs-sol-tab-on',
        tabStar: 'cs-sol-tab-star',
        tabStarInactive: 'case-proposal-star-muted',
        tabStarActive: 'cs-sol-tab-star-active',
        panel: 'cs-sol-tab-bd',
        stage: 'cs-sol-stage',
        nav: 'cs-sol-nav-btn',
        navIcon: 'cs-sol-nav-icon',
        frame: 'cs-sol-frame',
        shot: 'cs-sol-mock-img',
        shotCount: 'cs-sol-count',
        caption: 'cs-sol-cap',
        stepDots: 'cs-sol-step-dots',
        dot: 'cs-sol-dot',
        dotActive: 'cs-sol-dot-on',
        reason: 'cs-sol-reason',
        reasonTitle: 'cs-sol-txt-h',
        reasonBody: 'cs-sol-txt-p',
      }}
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
