import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type CaseSectionHeaderTone = 'default' | 'secondary' | 'warning' | 'inverse';

export interface CaseSectionHeaderProps {
  className?: string;
  description?: ReactNode;
  kicker?: ReactNode;
  title: ReactNode;
  /** Controls semantic color tokens only; section geometry stays owned by the shared CSS shell. */
  tone?: CaseSectionHeaderTone;
}

/**
 * Shared case-study section heading: kicker, h2 title, optional description, and divider.
 * Route-specific storytelling layout should wrap this component instead of changing its DOM.
 */
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
