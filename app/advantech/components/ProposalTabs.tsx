'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import type { Locale } from '../../../i18n/routing';
import { translateAdvantech } from '../i18n';

export type ProposalTab = {
  label: string;
  images: string[];
  concept: string;
  reasonTitle: string;
  reason: string;
  adopted?: boolean;
};

type Props = {
  tabs: ProposalTab[];
  defaultTab?: number;
};

export default function ProposalTabs({ tabs, defaultTab = 0 }: Props) {
  const locale = useLocale() as Locale;
  const t = (text: string) => translateAdvantech(locale, text);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [slideIdx, setSlideIdx] = useState(0);

  const tab = tabs[activeTab];
  const slides = tab.images;
  const canPrev = slideIdx > 0;
  const canNext = slideIdx < slides.length - 1;

  function handleTabChange(idx: number) {
    setActiveTab(idx);
    setSlideIdx(0);
  }

  return (
    <div className="cs-sol-prop">
      {/* Tab bar */}
      <div className="cs-sol-tabs">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            className={`cs-sol-tab${i === activeTab ? ' cs-sol-tab-on' : ''}`}
            onClick={() => handleTabChange(i)}
          >
            {t.adopted && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={i === activeTab
                  ? '/projects/advantech/solution/star-blue.svg'
                  : '/projects/advantech/solution/star-gray.svg'}
                alt=""
                width={16}
                height={16}
                style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 6, flexShrink: 0 }}
              />
            )}
            {t.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="cs-sol-tab-bd">
        {/* Image + nav buttons */}
        <div className="cs-sol-mock">
          <button
            className="cs-sol-nav-btn"
            disabled={!canPrev}
            onClick={() => setSlideIdx((s) => s - 1)}
            aria-label={t("上一張")}
          >
            ‹
          </button>
          <div className="cs-sol-mock-img">
            <Image
              src={slides[slideIdx]}
              alt={tab.label}
              width={660}
              height={371}
              unoptimized
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
            />
          </div>
          <button
            className="cs-sol-nav-btn"
            disabled={!canNext}
            onClick={() => setSlideIdx((s) => s + 1)}
            aria-label={t("下一張")}
          >
            ›
          </button>
        </div>

        {/* Text */}
        <div className="cs-sol-txt">
          <div>
            <p className="cs-sol-txt-h">{t("流程概念")}</p>
            <p className="cs-sol-txt-p">{tab.concept}</p>
          </div>
          <div>
            <p className="cs-sol-txt-h">{tab.reasonTitle}</p>
            <p className="cs-sol-txt-p">{tab.reason}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
