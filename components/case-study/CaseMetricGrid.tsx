import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import CaseGrid from './CaseGrid';

interface CaseMetricGridProps {
  children: ReactNode;
  className?: string;
}

export default function CaseMetricGrid({ children, className }: CaseMetricGridProps) {
  return (
    <CaseGrid variant="three" className={cn('cs-metric-grid', className)}>
      {children}
    </CaseGrid>
  );
}

