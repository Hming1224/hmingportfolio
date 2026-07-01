import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export type CaseGridVariant = 'two' | 'three' | 'four' | 'auto' | 'stack';

export interface CaseGridProps {
  children: ReactNode;
  className?: string;
  /** Use two/three/four/auto/stack for stable grid shells; route-specific breakpoints stay CSS-owned. */
  variant?: CaseGridVariant;
}

/**
 * Shared case-study grid shell.
 * Keep special flow, timeline, matrix, and diagram geometry in route-local components/CSS.
 */
export default function CaseGrid({
  children,
  className,
  variant = 'three',
}: CaseGridProps) {
  return (
    <div className={cn('cs-grid', `cs-grid--${variant}`, className)}>
      {children}
    </div>
  );
}
