import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type CaseFeatureRowProps = {
  className?: string;
  flipped?: boolean;
  media: ReactNode;
  mediaClassName?: string;
  note: ReactNode;
  noteClassName?: string;
  variant?: 'process' | 'prototype';
};

export default function CaseFeatureRow({
  className,
  flipped = false,
  media,
  mediaClassName,
  note,
  noteClassName,
  variant = 'prototype',
}: CaseFeatureRowProps) {
  const mediaNode = <div className={cn('cs-feature-row-media', mediaClassName)}>{media}</div>;
  const noteNode = <div className={cn('cs-feature-row-note', noteClassName)}>{note}</div>;

  return (
    <div className={cn('cs-feature-row', `cs-feature-row--${variant}`, className)}>
      {flipped ? (
        <>
          {mediaNode}
          {noteNode}
        </>
      ) : (
        <>
          {noteNode}
          {mediaNode}
        </>
      )}
    </div>
  );
}
