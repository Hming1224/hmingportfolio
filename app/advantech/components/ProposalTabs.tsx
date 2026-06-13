'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import type { Locale } from '../../../i18n/routing';
import { translateAdvantech } from '../i18n';

export type ProposalTab = {
  label: string;
  slides: ProposalSlide[];
  reasonTitle: string;
  reason: string;
  adopted?: boolean;
};

export type ProposalSlide = {
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
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [slideIdx, setSlideIdx] = useState(0);

  const tab = tabs[activeTab];
  const slides = tab.slides;
  const slide = slides[slideIdx] ?? slides[0];
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
        <div className="cs-sol-stage">
          <button
            className="cs-sol-nav-btn"
            disabled={!canPrev}
            onClick={() => setSlideIdx((s) => s - 1)}
            aria-label={t("上一張")}
          >
            ‹
          </button>

          <figure className="cs-sol-frame">
            <div className="cs-sol-mock-img">
              <Image
                key={slide.image}
                src={slide.image}
                alt={t(slide.caption)}
                width={960}
                height={540}
                sizes="(max-width: 768px) 100vw, 1120px"
                unoptimized
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <figcaption className="cs-sol-cap">{t(slide.caption)}</figcaption>
          </figure>

          <button
            className="cs-sol-nav-btn"
            disabled={!canNext}
            onClick={() => setSlideIdx((s) => s + 1)}
            aria-label={t("下一張")}
          >
            ›
          </button>
        </div>

        <div className="cs-sol-step-dots" aria-label={t("提案步驟")}>
          {slides.map((item, index) => (
            <button
              key={item.image}
              type="button"
              className={`cs-sol-dot${index === slideIdx ? ' cs-sol-dot-on' : ''}`}
              aria-label={`${t("切換到步驟")} ${index + 1}`}
              aria-current={index === slideIdx ? 'step' : undefined}
              onClick={() => setSlideIdx(index)}
            />
          ))}
        </div>

        <div className="cs-sol-reason">
          <p className="cs-sol-txt-h">{t(tab.reasonTitle)}</p>
          <p className="cs-sol-txt-p">{t(tab.reason)}</p>
        </div>
      </div>
    </div>
  );
}
