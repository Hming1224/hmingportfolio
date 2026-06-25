import type { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type CaseCardVariant = 'default' | 'accent' | 'metric' | 'media';

interface CaseCardProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  variant?: CaseCardVariant;
}

export default function CaseCard({
  as: Component = 'article',
  children,
  className,
  variant = 'default',
}: CaseCardProps) {
  return (
    <Component className={cn('cs-card', `cs-card--${variant}`, className)}>
      {children}
    </Component>
  );
}

