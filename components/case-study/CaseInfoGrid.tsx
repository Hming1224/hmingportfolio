import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface CaseInfoItem {
  label: ReactNode;
  value: ReactNode;
}

interface CaseInfoGridProps {
  items: CaseInfoItem[];
  className?: string;
}

export default function CaseInfoGrid({ items, className }: CaseInfoGridProps) {
  return (
    <div className={cn('cs-info-row', className)}>
      {items.map((item, index) => (
        <div className="cs-info-card" key={`${String(item.label)}-${index}`}>
          <span className="cs-info-label">{item.label}</span>
          <span className="cs-info-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
