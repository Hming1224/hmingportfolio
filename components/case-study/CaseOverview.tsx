import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import CaseSection from './CaseSection';

export interface CaseOverviewStat {
  /** 大字級數字，例如「3 秒」「−58%」。 */
  value: string;
  /** 數字代表什麼，一行內講完。 */
  label: string;
  /** 補充脈絡或數據屬性（例如「訪談客戶實例」），維持證據誠實。 */
  note?: string;
}

export interface CaseOverviewItem {
  label: string;
  text: string;
  stat?: CaseOverviewStat;
}

export interface CaseOverviewProps {
  /** TOC 錨點 id，預設 'cs-sec-overview'。 */
  id?: string;
  className?: string;
  kicker: string;
  /** 結論式標題：一句話講完這個案子改變了什麼。 */
  title: string;
  /** 標題下的一段導言。 */
  lead?: ReactNode;
  /** 問題／設計目標／解決方案／影響等摘要，可把對應關鍵數據放進同一格。 */
  items: readonly CaseOverviewItem[];
  /** 摘要清單的 aria-label。 */
  itemsLabel: string;
  /** 整案互動走查等展示區塊，由呼叫端組好整塊傳入。 */
  showcase?: ReactNode;
}

/**
 * 案例頁「專案總覽」共用骨架：
 * 結論標題 → 導言 → 數據與 TL;DR 整合摘要 → 互動展示。
 * 文字一律由呼叫端翻譯後傳入；配色與間距微調交給各案例的 theme CSS。
 */
export default function CaseOverview({
  id = 'cs-sec-overview',
  className,
  kicker,
  title,
  lead,
  items,
  itemsLabel,
  showcase,
}: CaseOverviewProps) {
  return (
    <CaseSection id={id} className={cn('cs-overview', className)} kicker={kicker} title={title}>
      {lead ? <p className="cs-section-lead cs-overview-lead">{lead}</p> : null}

      <div className="cs-overview-summary" role="list" aria-label={itemsLabel}>
        {items.map((item) => (
          <article key={item.label} className="cs-overview-summary-item" role="listitem">
            {item.stat ? (
              <div className="cs-overview-stat">
                <span className="cs-overview-stat-value">{item.stat.value}</span>
                <span className="cs-overview-stat-label">{item.stat.label}</span>
                {item.stat.note ? <span className="cs-overview-stat-note">{item.stat.note}</span> : null}
              </div>
            ) : null}
            <div className="cs-overview-summary-copy">
              <p className="cs-overview-summary-label cs-copy-title">{item.label}</p>
              <p className="cs-overview-summary-text cs-copy-body">{item.text}</p>
            </div>
          </article>
        ))}
      </div>

      {showcase}
    </CaseSection>
  );
}
