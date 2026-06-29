import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type CaseMediaVariant = 'contained' | 'full' | 'zoomable' | 'scroll';

interface CaseMediaProps {
  caption?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: CaseMediaVariant;
}

export default function CaseMedia({
  caption,
  children,
  className,
  contentClassName,
  variant = 'contained',
}: CaseMediaProps) {
  return (
    <figure className={cn('cs-media', `cs-media--${variant}`, className)}>
      <div className={cn('cs-media-frame', contentClassName)}>
        {children}
      </div>
      {caption ? <figcaption className="cs-media-caption">{caption}</figcaption> : null}
    </figure>
  );
}

