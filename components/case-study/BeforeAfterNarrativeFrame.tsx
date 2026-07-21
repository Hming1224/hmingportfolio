import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { BeforeAfterPanel } from './BeforeAfterPanel';
import CaseCard from './CaseCard';

type BeforeAfterNarrativeTone = 'blue' | 'cyan' | 'purple' | 'neutral';

type BeforeAfterNarrativePoint = {
  label: ReactNode;
  content: ReactNode;
};

export type BeforeAfterNarrativeFrameProps = {
  after: ReactNode;
  afterClassName?: string;
  afterLabel?: ReactNode;
  badge: ReactNode;
  before: ReactNode;
  beforeClassName?: string;
  beforeLabel?: ReactNode;
  bodyClassName?: string;
  className?: string;
  comparisonClassName?: string;
  connector?: ReactNode;
  headerClassName?: string;
  intro?: ReactNode;
  points?: BeforeAfterNarrativePoint[];
  title: ReactNode;
  tone?: BeforeAfterNarrativeTone;
};

function DefaultConnector() {
  return (
    <div className="cs-before-after-narrative-connector" aria-hidden="true">
      <svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none">
        <path
          d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function NarrativePanel({
  children,
  className,
  label,
  tone,
}: {
  children: ReactNode;
  className?: string;
  label?: ReactNode;
  tone: BeforeAfterNarrativeTone;
}) {
  if (label) {
    return (
      <BeforeAfterPanel
        title={label}
        tone={tone}
        className={cn('cs-before-after-narrative-panel', className)}
        headerClassName="cs-before-after-narrative-panel-head"
        bodyClassName="cs-before-after-narrative-panel-body"
      >
        {children}
      </BeforeAfterPanel>
    );
  }

  return (
    <div className={cn('cs-before-after-narrative-panel', className)}>
      <div className="cs-before-after-narrative-panel-body">{children}</div>
    </div>
  );
}

/**
 * Slot-based layout frame for Before / After narrative anatomy.
 * Media, annotations, image sizing, and route-specific storytelling geometry stay local.
 */
export function BeforeAfterNarrativeFrame({
  after,
  afterClassName,
  afterLabel,
  badge,
  before,
  beforeClassName,
  beforeLabel,
  bodyClassName,
  className,
  comparisonClassName,
  connector,
  headerClassName,
  intro,
  points,
  title,
  tone = 'neutral',
}: BeforeAfterNarrativeFrameProps) {
  const hasPoints = Boolean(points?.length);

  function ToneArticle({
    children,
    ...props
  }: ComponentPropsWithoutRef<'article'>) {
    return (
      <article {...props} data-tone={tone}>
        {children}
      </article>
    );
  }

  return (
    <CaseCard as={ToneArticle} className={cn('cs-before-after-narrative', className)}>
      <header className={cn('cs-before-after-narrative-header', headerClassName)}>
        <span className="cs-before-after-narrative-badge">{badge}</span>
        <h3 className="cs-before-after-narrative-title">{title}</h3>
      </header>

      {intro ? <div className="cs-before-after-narrative-intro">{intro}</div> : null}

      {hasPoints ? (
        <div className={cn('cs-before-after-narrative-body', bodyClassName)}>
          {points?.map((point, index) => (
            <div className="cs-before-after-narrative-point" key={index}>
              <div className="cs-before-after-narrative-point-label">{point.label}</div>
              <div className="cs-before-after-narrative-point-content">{point.content}</div>
            </div>
          ))}
        </div>
      ) : null}

      <div className={cn('cs-before-after-narrative-comparison', comparisonClassName)}>
        <NarrativePanel className={beforeClassName} label={beforeLabel} tone={tone}>
          {before}
        </NarrativePanel>
        {connector ?? <DefaultConnector />}
        <NarrativePanel className={afterClassName} label={afterLabel} tone={tone}>
          {after}
        </NarrativePanel>
      </div>
    </CaseCard>
  );
}
