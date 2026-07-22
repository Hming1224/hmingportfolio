import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type BeforeAfterPanelTone = 'blue' | 'cyan' | 'purple' | 'neutral';

export type BeforeAfterPanelProps = {
  bodyClassName?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  title: ReactNode;
  tone?: BeforeAfterPanelTone;
};

/**
 * Visual shell for a single before / after state panel.
 * Media, annotations, route-specific geometry, and figure semantics stay in children.
 */
export function BeforeAfterPanel({
  bodyClassName,
  children,
  className,
  headerClassName,
  title,
  tone = 'neutral',
}: BeforeAfterPanelProps) {
  return (
    <div className={cn('cs-before-after-state-panel', className)} data-tone={tone}>
      <div className={cn('cs-before-after-state-panel-head', headerClassName)}>
        <div className="cs-before-after-state-panel-title">{title}</div>
      </div>
      <div className={cn('cs-before-after-state-panel-body', bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
