import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type CaseSectionHeaderTone = 'default' | 'secondary' | 'warning' | 'inverse';

interface CaseSectionHeaderProps {
  className?: string;
  description?: ReactNode;
  kicker?: ReactNode;
  title: ReactNode;
  tone?: CaseSectionHeaderTone;
}

export default function CaseSectionHeader({
  className,
  description,
  kicker,
  title,
  tone = 'default',
}: CaseSectionHeaderProps) {
  return (
    <header className={cn('cs-section-header', `cs-section-header--${tone}`, className)}>
      {kicker ? <p className="cs-section-kicker">{kicker}</p> : null}
      <h2 className="cs-section-title">{title}</h2>
      {description ? <div className="cs-section-description">{description}</div> : null}
      <div className="cs-divider" />
    </header>
  );
}
