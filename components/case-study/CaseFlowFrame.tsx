import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import FlowScrollHint from './FlowScrollHint';

type CaseFlowFrameProps = {
  caption?: ReactNode;
  captionClassName?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  header?: ReactNode;
  headerClassName?: string;
  scrollHintLabel?: string;
  variant?: 'default' | 'plain' | 'split';
};

export default function CaseFlowFrame({
  caption,
  captionClassName,
  children,
  className,
  contentClassName,
  header,
  headerClassName,
  scrollHintLabel,
  variant = 'default',
}: CaseFlowFrameProps) {
  return (
    <div className="cs-flow-frame-group">
      {scrollHintLabel ? <FlowScrollHint label={scrollHintLabel} /> : null}
      <figure className={cn('cs-flow-frame', `cs-flow-frame--${variant}`, className)}>
        {header ? <div className={cn('cs-flow-frame-header', headerClassName)}>{header}</div> : null}
        <div className={cn('cs-flow-frame-scroll', contentClassName)}>{children}</div>
        {caption ? (
          <figcaption className={cn('cs-flow-frame-caption', captionClassName)}>
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}
