import type { CSSProperties } from 'react';
import CaseSectionHeader from './CaseSectionHeader';

interface CaseHeadingProps {
  kicker?: string;
  title: string;
  /** 'default' = 深字配淺底；'white' = 白字配深底（process / result 等深色背景 section）。 */
  tone?: 'default' | 'white';
  /** 給 <h2> 的額外 inline style，例如深色 section 慣用的 marginBottom: 8。 */
  style?: CSSProperties;
}

/**
 * 案例頁的「section 標題 + 分隔線」組合。
 * 標準 section 由 <CaseSection> 內部使用；process / result 這類自帶背景的客製 section
 * 也能直接用 tone="white" 取得一致的標題樣式。
 */
export default function CaseHeading({ kicker, title, tone = 'default', style }: CaseHeadingProps) {
  const isWhite = tone === 'white';
  if (!isWhite && !style) {
    return <CaseSectionHeader kicker={kicker} title={title} />;
  }

  return (
    <>
      {kicker ? <p className="cs-section-kicker">{kicker}</p> : null}
      <h2 className={isWhite ? 'cs-heading-white' : 'cs-heading'} style={style}>
        {title}
      </h2>
      <div className={isWhite ? 'cs-divider-white' : 'cs-divider'} />
    </>
  );
}
