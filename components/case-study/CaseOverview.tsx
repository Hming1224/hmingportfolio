'use client';

import { useId, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Building2, CircleHelp, Lightbulb, Quote, ShieldCheck, UserRound, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import CaseSection from './CaseSection';

export interface CaseOverviewStat {
  value: string;
  label: string;
  note?: string;
}

export interface CaseOverviewMedia {
  src: string;
  alt: string;
  caption?: string;
  fit?: 'cover' | 'contain';
}

export interface CaseOverviewDetail {
  label: string;
  text: string;
  note?: string;
  icon?: 'user' | 'business' | 'hypothesis' | 'question' | 'quote' | 'validation';
  variant?: 'default' | 'highlight' | 'quote';
}

export interface CaseOverviewItem {
  kind?: 'problem' | 'goal' | 'impact';
  label: string;
  title: string;
  text?: string;
  details?: readonly CaseOverviewDetail[];
  stat?: CaseOverviewStat;
  media?: CaseOverviewMedia;
  visual?: ReactNode;
}

export interface CaseOverviewProps {
  id?: string;
  className?: string;
  kicker: string;
  title: string;
  lead?: ReactNode;
  items: readonly CaseOverviewItem[];
  itemsLabel: string;
  showcase?: ReactNode;
}

export default function CaseOverview({
  id = 'cs-sec-overview',
  className,
  kicker,
  title,
  lead,
  items,
  itemsLabel,
  showcase,
}: CaseOverviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsId = useId();
  const activeItem = items[activeIndex] ?? items[0];

  if (!activeItem) return null;

  const hasEvidence = Boolean(activeItem.visual || activeItem.media || activeItem.stat);
  const evidenceFirst = activeItem.kind === 'impact' && hasEvidence;

  const selectStep = (index: number) => {
    setActiveIndex(Math.min(Math.max(index, 0), items.length - 1));
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const lastIndex = items.length - 1;
    let nextIndex = activeIndex;

    if (event.key === 'ArrowRight') nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
    else if (event.key === 'ArrowLeft') nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = lastIndex;
    else return;

    event.preventDefault();
    selectStep(nextIndex);
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus();
  };

  const previousItem = items[activeIndex - 1];
  const nextItem = items[activeIndex + 1];

  return (
    <CaseSection id={id} className={cn('cs-overview', className)} kicker={kicker} title={title}>
      {lead ? <p className="cs-section-lead cs-overview-lead">{lead}</p> : null}

      <div className="cs-overview-carousel">
        <div
          className="cs-overview-steps"
          role="tablist"
          aria-label={itemsLabel}
          onKeyDown={handleTabKeyDown}
        >
          {items.map((item, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={item.label}
                id={`${tabsId}-tab-${index}`}
                type="button"
                role="tab"
                aria-controls={`${tabsId}-panel`}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                className="cs-overview-step-tab"
                data-state={selected ? 'active' : 'inactive'}
                onClick={() => selectStep(index)}
              >
                <span className="cs-overview-step-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <article
          id={`${tabsId}-panel`}
          className="cs-overview-stage"
          role="tabpanel"
          aria-labelledby={`${tabsId}-tab-${activeIndex}`}
          data-has-evidence={hasEvidence}
          data-evidence-first={evidenceFirst}
          key={activeIndex}
        >
          <h3 className="cs-overview-stage-title">{activeItem.title}</h3>

          <div className="cs-overview-stage-copy">
            {activeItem.text ? <p className="cs-overview-stage-text cs-copy-body">{activeItem.text}</p> : null}
            {activeItem.details ? (
              <dl className="cs-overview-stage-details">
                {activeItem.details.map((detail) => {
                  const DetailIcon = detail.icon ? overviewDetailIcons[detail.icon] : null;
                  return (
                    <div key={detail.label} className="cs-overview-detail-card" data-variant={detail.variant ?? 'default'}>
                      {DetailIcon ? (
                        <span className="cs-overview-detail-icon" aria-hidden="true">
                          <DetailIcon />
                        </span>
                      ) : null}
                      <div className="cs-overview-detail-copy">
                        <dt>{detail.label}</dt>
                        <dd>{detail.text}</dd>
                        {detail.note ? <small>{detail.note}</small> : null}
                      </div>
                    </div>
                  );
                })}
              </dl>
            ) : null}
          </div>

          <OverviewEvidence item={activeItem} />

          <footer className="cs-overview-stage-footer">
            <div className="cs-overview-stage-controls">
              {previousItem ? (
                <button type="button" onClick={() => selectStep(activeIndex - 1)}>
                  ← {previousItem.label}
                </button>
              ) : null}
              {nextItem ? (
                <button type="button" className="cs-overview-stage-next" onClick={() => selectStep(activeIndex + 1)}>
                  {nextItem.label} →
                </button>
              ) : null}
            </div>
          </footer>
        </article>
      </div>

      {showcase}
    </CaseSection>
  );
}

const overviewDetailIcons: Record<NonNullable<CaseOverviewDetail['icon']>, LucideIcon> = {
  user: UserRound,
  business: Building2,
  hypothesis: Lightbulb,
  question: CircleHelp,
  quote: Quote,
  validation: ShieldCheck,
};

function OverviewEvidence({ item }: { item: CaseOverviewItem }) {
  if (item.visual) {
    return <div className="cs-overview-stage-visual">{item.visual}</div>;
  }

  if (item.media) {
    return (
      <figure className="cs-overview-stage-media">
        <div className="cs-overview-stage-media-viewport">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.media.src}
            alt={item.media.alt}
            className={`is-${item.media.fit ?? 'cover'}`}
            draggable={false}
          />
        </div>
        {item.media.caption ? <figcaption>{item.media.caption}</figcaption> : null}
      </figure>
    );
  }

  if (!item.stat) return null;

  return (
    <div className="cs-overview-stage-evidence">
      <span className="cs-overview-evidence-value">{item.stat.value}</span>
      <strong className="cs-overview-evidence-label">{item.stat.label}</strong>
      {item.stat.note ? <span className="cs-overview-evidence-note">{item.stat.note}</span> : null}
    </div>
  );
}
