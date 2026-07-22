import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type CaseCardVariant = 'default' | 'accent' | 'metric' | 'media';

export interface CaseCardProps {
  /** Preserves the existing semantic wrapper contract; card styling stays on the shared class shell. */
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Route-local layout may pass style through, but shared card spacing and geometry stay CSS-owned. */
  style?: CSSProperties;
  /** Use default/accent/metric/media for stable card shells, not special flow, timeline, matrix, or diagram geometry. */
  variant?: CaseCardVariant;
}

/**
 * Shared case-study card shell.
 * Card content structure and storytelling-specific layout should stay in route-local composition/CSS.
 */
export default function CaseCard({
  as: Component = 'article',
  children,
  className,
  style,
  variant = 'default',
}: CaseCardProps) {
  return (
    <Component className={cn('cs-card', `cs-card--${variant}`, className)} style={style}>
      {children}
    </Component>
  );
}
