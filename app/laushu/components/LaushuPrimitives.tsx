import type { ReactNode } from "react";
import { CaseCard, CaseSectionHeader } from "../../../components/case-study";

export function InfoCard({ title, number, image, children }: { title: string; number?: string; image?: string; children: ReactNode }) {
  return (
    <CaseCard className={`cs-topic-card${image ? " cs-topic-card--illustrated" : ""}`}>
      {number ? <span className="cs-topic-card-kicker">{number}</span> : null}
      {image ? (
        <span className="cs-topic-card-art" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" loading="lazy" />
        </span>
      ) : null}
      <h4>{title}</h4>
      <p>{children}</p>
    </CaseCard>
  );
}

export function ArticleBlock({ title, number, kicker, children }: { title: string; number?: string; kicker?: string; children: ReactNode }) {
  return (
    <section className="cs-article">
      {kicker ? <p className="cs-article-kicker">{kicker}</p> : null}
      <h3>
        {number ? <span className="cs-article-num">{number} / </span> : null}
        {title}
      </h3>
      <div className="cs-rich-copy">{children}</div>
    </section>
  );
}

/** Figma 風格 section 標題：小寫眉標 + 大論點句 + 分隔線（對齊 Figma node 2797:1521）。 */
export function LaushuHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <CaseSectionHeader className="cs-section-header--case-wide" kicker={eyebrow} title={title} />;
}
