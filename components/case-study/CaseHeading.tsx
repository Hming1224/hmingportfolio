import type { CSSProperties } from 'react';
import CaseSectionHeader from './CaseSectionHeader';

type CaseHeadingTone = 'default' | 'white';

export interface CaseHeadingProps {
  kicker?: string;
  title: string;
  /** 'default' delegates to CaseSectionHeader unless a custom style is supplied; 'white' is for dark custom sections. */
  tone?: CaseHeadingTone;
  /** Preserves legacy custom-section spacing without adding a new visual variant. */
  style?: CSSProperties;
}

/**
 * Compatibility wrapper for section headings.
 * Standard sections should prefer CaseSectionHeader / CaseSection; custom dark sections can use tone="white".
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
