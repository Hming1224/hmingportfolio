import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import CaseCard from './CaseCard';

type CaseBeforeAfterProps = {
  after: ReactNode;
  afterLabel?: ReactNode;
  before: ReactNode;
  beforeLabel?: ReactNode;
  className?: string;
};

function BeforeAfterArrow() {
  return (
    <div className="cs-before-after-arrow" aria-hidden="true">
      <svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none">
        <path
          d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function BeforeAfterPanel({
  children,
  label,
}: {
  children: ReactNode;
  label: ReactNode;
}) {
  return (
    <CaseCard className="cs-before-after-panel" variant="media">
      <div className="cs-before-after-head">{label}</div>
      <div className="cs-before-after-content">{children}</div>
    </CaseCard>
  );
}

export default function CaseBeforeAfter({
  after,
  afterLabel = 'After',
  before,
  beforeLabel = 'Before',
  className,
}: CaseBeforeAfterProps) {
  return (
    <div className={cn('cs-before-after', className)}>
      <BeforeAfterPanel label={beforeLabel}>{before}</BeforeAfterPanel>
      <BeforeAfterArrow />
      <BeforeAfterPanel label={afterLabel}>{after}</BeforeAfterPanel>
    </div>
  );
}
