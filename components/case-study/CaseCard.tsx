import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type CaseCardVariant = 'default' | 'accent' | 'metric' | 'media';

interface CaseCardProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  variant?: CaseCardVariant;
}

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
