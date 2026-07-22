import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type CaseMediaVariant = 'contained' | 'full' | 'zoomable' | 'scroll';

export interface CaseMediaProps {
  caption?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  /** Selects the shared media shell only; image ratio, crop, and route-specific layout stay in route-local CSS. */
  variant?: CaseMediaVariant;
}

/**
 * Shared case-study media shell.
 * Use contained/full/zoomable/scroll for stable frame behavior, not for storytelling-specific geometry.
 */
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
