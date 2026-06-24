import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import DesignSystemPlayground from "../../components/DesignSystemPlayground";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import enMessages from "../../i18n/dictionaries/en";
import zhMessages from "../../i18n/dictionaries/zh-TW";

type Messages = typeof enMessages;

const messageMap: Record<Locale, Messages> = {
  en: enMessages,
  "zh-TW": zhMessages,
};

function getMessages(locale: Locale) {
  return messageMap[locale].designSystem;
}

const foundationGroups = {
  en: [
    {
      id: "color",
      title: "Color tokens",
      description: "Primitive scales, semantic aliases, and state tones aligned with docs/design-system.md.",
      columns: ["Token", "Value", "Usage"],
      rows: [
        ["--hm-purple-50 ~ 900", "10-step scale", "Brand actions and layered accents"],
        ["--hm-success / warning / error / info", "semantic palette", "Feedback, validation, and system states"],
        ["--hm-chart-1 ~ 6", "data palette", "Charts and lightweight data storytelling"],
        ["--text-heading / body / secondary", "semantic text", "Headings, body copy, and supportive text hierarchy"],
      ],
    },
    {
      id: "type",
      title: "Type & spacing",
      description: "Responsive sizing keeps layout stable from mobile to large desktop canvases.",
      columns: ["Token", "Desktop", "Mobile"],
      rows: [
        ["--fs-h1", "32px", "24px"],
        ["--fs-h2", "28px", "22px"],
        ["--fs-h3", "24px", "18px"],
        ["--fs-body", "16px", "16px"],
        ["Breakpoints", "768 / 1024 / 1440", "shared in CSS + lib/breakpoints.ts"],
      ],
    },
    {
      id: "shape-motion",
      title: "Radius, shadow, motion, layers",
      description: "Shape language and transitions make the system feel calm, tactile, and predictable.",
      columns: ["Category", "Tokens", "Notes"],
      rows: [
        ["Radius", "8 / 12 / 16 / 200 / 999", "Cards, badges, buttons, and pills"],
        ["Shadow", "sm / md / lg / xl", "Cards, floating surfaces, and image treatments"],
        ["Motion", "fast / base / slow / enter / reveal", "Consistent transition rhythm and reduced-motion support"],
        ["Layers", "base / sticky / navbar / overlay / modal / toast", "Explicit z-index scale for overlays"],
      ],
    },
  ],
  "zh-TW": [
    {
      id: "color",
      title: "色彩 token",
      description: "對齊 docs/design-system.md 的 primitive 色階、語意色與狀態色。",
      columns: ["Token", "值", "用途"],
      rows: [
        ["--hm-purple-50 ~ 900", "10 階色票", "品牌 CTA 與分層重點"],
        ["--hm-success / warning / error / info", "語意狀態色", "回饋、驗證與系統狀態"],
        ["--hm-chart-1 ~ 6", "圖表色盤", "資料視覺化與輕量敘事圖表"],
        ["--text-heading / body / secondary", "文字語意階", "標題、內文與輔助文字層級"],
      ],
    },
    {
      id: "type",
      title: "字級與斷點",
      description: "用響應式 token 維持手機到大桌機的一致節奏。",
      columns: ["Token", "桌機", "手機"],
      rows: [
        ["--fs-h1", "32px", "24px"],
        ["--fs-h2", "28px", "22px"],
        ["--fs-h3", "24px", "18px"],
        ["--fs-body", "16px", "16px"],
        ["Breakpoints", "768 / 1024 / 1440", "CSS 與 lib/breakpoints.ts 共用"],
      ],
    },
    {
      id: "shape-motion",
      title: "圓角、陰影、動效、層級",
      description: "用一致的形狀語言與轉場節奏，讓系統穩定又有手感。",
      columns: ["類別", "Tokens", "說明"],
      rows: [
        ["圓角", "8 / 12 / 16 / 200 / 999", "卡片、badge、按鈕與 pill"],
        ["陰影", "sm / md / lg / xl", "卡片、浮層與影像區塊"],
        ["動效", "fast / base / slow / enter / reveal", "統一的 transition 節奏與 reduced-motion 支援"],
        ["層級", "base / sticky / navbar / overlay / modal / toast", "overlay 類元件的 z-index 階梯"],
      ],
    },
  ],
} satisfies Record<Locale, Array<{ id: string; title: string; description: string; columns: string[]; rows: string[][] }>>;

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;

  return createLocalizedMetadata(locale, "/design-system", {
    en: {
      title: "Design System",
      description:
        "Explore the design system behind Brian Huang's portfolio, from principles and tokens to live component demos and a maturity roadmap.",
    },
    "zh-TW": {
      title: "設計系統",
      description:
        "探索黃宣銘 Brian Huang 作品集背後的設計系統，從設計原則、token 到 live component demo 與成熟度藍圖。",
    },
  });
}

export default async function DesignSystemPage() {
  const locale = (await getLocale()) as Locale;
  const copy = getMessages(locale);

  return (
    <main className="ds-page">
      <Navbar />

      <section className="ds-hero" aria-labelledby="ds-title">
        <div className="ds-shell ds-hero-inner">
          <div className="ds-hero-copy">
            <p className="ds-eyebrow">{copy.hero.eyebrow}</p>
            <h1 id="ds-title">{copy.hero.title}</h1>
            <p className="ds-hero-description">{copy.hero.description}</p>
            <div className="ds-hero-actions">
              <a className="ds-anchor-link" href="#principles">
                {copy.hero.primaryAction}
              </a>
              <a className="ds-anchor-link is-secondary" href="#roadmap">
                {copy.hero.secondaryAction}
              </a>
            </div>
          </div>
          <div className="ds-stats-grid" aria-label={copy.hero.statsAriaLabel}>
            {copy.hero.stats.map((stat) => (
              <article key={stat.label} className="ds-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="ds-shell ds-layout">
        <aside className="ds-toc" aria-label={copy.toc.ariaLabel}>
          <p>{copy.toc.title}</p>
          <nav>
            {copy.toc.items.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="ds-content">
          <section className="ds-section" id="principles">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.principles.heading}</h2>
              <span />
            </div>
            <div className="ds-soul-card">
              <h3>{copy.principles.soulTitle}</h3>
              <p>{copy.principles.soulBody}</p>
            </div>
            <div className="ds-principles-grid">
              {copy.principles.items.map((item, index) => (
                <article key={item.title} className="ds-principle-card">
                  <p className="ds-principle-index">0{index + 1}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="ds-section" id="foundation">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.foundation.heading}</h2>
              <span />
            </div>
            <div className="ds-foundation-grid">
              {copy.foundation.cards.map((card) => (
                <article key={card.title} className="ds-foundation-card">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
            <DesignSystemPlayground
              part="tokens"
              dictionary={copy.playground}
              tokenGroups={foundationGroups[locale]}
            />
          </section>

          <section className="ds-section" id="components">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.components.heading}</h2>
              <span />
            </div>
            <div className="ds-narrative-grid">
              {copy.components.items.map((item) => (
                <article key={item.title} className="ds-narrative-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <DesignSystemPlayground
              part="components"
              dictionary={copy.playground}
              tokenGroups={foundationGroups[locale]}
            />
          </section>

          <section className="ds-section" id="roadmap">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.roadmap.heading}</h2>
              <span />
            </div>
            <div className="ds-method-card">
              <h3>{copy.roadmap.methodTitle}</h3>
              <p>{copy.roadmap.methodBody}</p>
            </div>
            <div className="ds-roadmap-grid">
              {copy.roadmap.phases.map((phase) => (
                <section key={phase.title} className="ds-roadmap-card">
                  <div className="ds-roadmap-head">
                    <p>{phase.kicker}</p>
                    <h3>{phase.title}</h3>
                  </div>
                  <div className="ds-roadmap-list">
                    {phase.items.map((item) => (
                      <article key={item.title} className="ds-roadmap-item">
                        <h4>{item.title}</h4>
                        <p><strong>{copy.roadmap.problemLabel}</strong> {item.problem}</p>
                        <p><strong>{copy.roadmap.decisionLabel}</strong> {item.decision}</p>
                        <p><strong>{copy.roadmap.outcomeLabel}</strong> {item.outcome}</p>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="ds-section ds-cta" id="cta">
            <div>
              <p className="ds-eyebrow">{copy.cta.eyebrow}</p>
              <h2>{copy.cta.title}</h2>
              <p>{copy.cta.body}</p>
            </div>
            <div className="ds-cta-actions">
              <a className="ds-anchor-link" href="/#projects">
                {copy.cta.primaryAction}
              </a>
              <a className="ds-anchor-link is-secondary" href="/contact">
                {copy.cta.secondaryAction}
              </a>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
