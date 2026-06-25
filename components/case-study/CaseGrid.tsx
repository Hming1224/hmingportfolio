import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type CaseGridVariant = 'two' | 'three' | 'four' | 'auto';

interface CaseGridProps {
  children: ReactNode;
  className?: string;
  variant?: CaseGridVariant;
}

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

