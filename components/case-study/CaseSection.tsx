import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import CaseHeading from './CaseHeading';

interface CaseSectionProps {
  /** TOC 錨點 id，例如 'cs-sec-overview'。 */
  id: string;
  /** section eyebrow / kicker，例如 'OVERVIEW'。 */
  kicker?: string;
  /** section 標題（自動接 CaseHeading 的標題 + 分隔線）。 */
  title: string;
  /** true → 淺灰底（cs-section-surface）；false → 白底（cs-section）。 */
  surface?: boolean;
  /** 額外 class，例如 'cs-solution-section'。 */
  className?: string;
  children: ReactNode;
}

/**
 * 案例頁的標準內容 section：白底 / 淺灰底容器 + 標題 + 分隔線。
 * 自帶背景圖的客製 section（process / next / result）不走這個元件，
 * 但可沿用 <CaseHeading> 維持標題一致。
 */
export default function CaseSection({
  id,
  kicker,
  title,
  surface = false,
  className,
  children,
}: CaseSectionProps) {
  return (
    <section id={id} className={cn(surface ? 'cs-section-surface' : 'cs-section', className)}>
      <CaseHeading kicker={kicker} title={title} />
      {children}
    </section>
  );
}
