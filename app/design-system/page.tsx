import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "../../components/ui/Accordion";
import { designSystemDocs } from "../../lib/design-system-docs";
import { designSystemSections } from "../../lib/design-system-data";
import DesignSystemExplorer from "../../components/design-system/DesignSystemExplorer";
import { Link } from "../../i18n/navigation";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import { designPrinciples } from "../../lib/design-system-data";
import enMessages from "../../i18n/dictionaries/en";
import zhMessages from "../../i18n/dictionaries/zh-TW";

type Messages = typeof enMessages;




type TokenGroup = {
  id: string;
  title: string;
  description: string;
  columns: string[];
  rows: string[][];
};

const messageMap: Record<Locale, Messages> = {
  en: enMessages,
  "zh-TW": zhMessages,
};

function getMessages(locale: Locale) {
  return messageMap[locale].designSystem;
}




const foundationGroups: Record<Locale, TokenGroup[]> = {
  en: [
    {
      id: "color",
      title: "Color tokens",
      description: "Real portfolio color tokens and semantic aliases from tokens.css.",
      columns: ["Token", "Value", "Usage"],
      rows: [
        ["--hm-purple", "var(--hm-purple-600)", "Primary CTA"],
        ["--hm-paper / --hm-surface", "#fff / #f9f9f9", "Page and soft surface"],
        ["--text-heading / body / secondary", "semantic text", "Type hierarchy"],
        ["--hm-success / warning / error / info", "semantic states", "System feedback"],
      ],
    },
    {
      id: "spacing",
      title: "Spacing and rhythm",
      description: "T-shirt spacing tokens plus the exceptions documented in design-system.md.",
      columns: ["Token", "Value", "Usage"],
      rows: [
        ["--hm-space-sm", "16px", "Compact section spacing"],
        ["--hm-space-md", "24px", "Default card spacing"],
        ["--hm-space-lg", "32px", "Large block spacing"],
        ["--hm-space-3xl", "80px", "Major breathing room"],
      ],
    },
    {
      id: "motion",
      title: "Motion and elevation",
      description: "Motion, radius, and shadow tokens that shape the tactile feeling of the interface.",
      columns: ["Category", "Token", "Usage"],
      rows: [
        ["Radius", "--hm-radius-button", "Primary button pill"],
        ["Shadow", "--shadow-card-hover", "Project card hover"],
        ["Duration", "--hm-duration-base", "Default transition"],
        ["Easing", "--hm-ease-out", "Settle and hover easing"],
      ],
    },
  ],
  "zh-TW": [
    {
      id: "color",
      title: "色彩 tokens",
      description: "來自 tokens.css 的真實作品集色票與語意別名。",
      columns: ["Token", "值", "用途"],
      rows: [
        ["--hm-purple", "var(--hm-purple-600)", "主要 CTA"],
        ["--hm-paper / --hm-surface", "#fff / #f9f9f9", "頁面與柔和 surface"],
        ["--text-heading / body / secondary", "語意文字", "閱讀層級"],
        ["--hm-success / warning / error / info", "狀態色", "系統回饋"],
      ],
    },
    {
      id: "spacing",
      title: "間距與節奏",
      description: "以 T-shirt 間距 token 為主，搭配文件裡定義的少數例外。",
      columns: ["Token", "值", "用途"],
      rows: [
        ["--hm-space-sm", "16px", "緊湊區塊間距"],
        ["--hm-space-md", "24px", "預設卡片內距"],
        ["--hm-space-lg", "32px", "大型 block 間距"],
        ["--hm-space-3xl", "80px", "大段留白"],
      ],
    },
    {
      id: "motion",
      title: "動效與立體感",
      description: "塑造介面手感的 motion、radius 與 shadow token。",
      columns: ["類別", "Token", "用途"],
      rows: [
        ["Radius", "--hm-radius-button", "主要按鈕膠囊圓角"],
        ["Shadow", "--shadow-card-hover", "專案卡 hover"],
        ["Duration", "--hm-duration-base", "預設 transition"],
        ["Easing", "--hm-ease-out", "hover 與 settle easing"],
      ],
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;

  return createLocalizedMetadata(locale, "/design-system", {
    en: {
      title: "Design System",
      description:
        "Explore the design system behind Brian Huang's portfolio, from principles and foundations to live components and the full token reference.",
    },
    "zh-TW": {
      title: "設計系統",
      description:
        "探索黃宣銘 Brian Huang 作品集背後的設計系統，從設計原則、foundation 到 live 元件與完整 token reference。",
    },
  });
}

export default async function DesignSystemPage() {
  const locale = (await getLocale()) as Locale;
  const copy = getMessages(locale);
const tokenGroupRows = foundationGroups[locale];
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
              <a className="ds-anchor-link" href="#getting-started">
                {copy.hero.primaryAction}
              </a>
              <a className="ds-anchor-link is-secondary" href="#tokens">
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

          <section className="ds-section" id="getting-started">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.introduction.heading}</h2>
              <span />
            </div>
            <div className="ds-intro-grid">
              <article className="ds-soul-card">
                <h3>{copy.introduction.soulTitle}</h3>
                <p>{copy.introduction.soulBody}</p>
                <div className="ds-keyword-row" aria-label={copy.introduction.keywordsAriaLabel}>
                  {copy.introduction.keywords.map((keyword) => (
                    <span key={keyword}>{keyword}</span>
                  ))}
                </div>
              </article>
              <article className="ds-architecture-card">
                <h3>{copy.introduction.architectureTitle}</h3>
                <p>{copy.introduction.architectureBody}</p>
                <div className="ds-architecture-split">
                  {copy.introduction.architectureCards.map((card) => (
                    <section key={card.title} className="ds-architecture-pane">
                      <p className="ds-pane-kicker">{card.kicker}</p>
                      <h4>{card.title}</h4>
                      <p>{card.body}</p>
                    </section>
                  ))}
                </div>
              </article>
            </div>
            <div className="ds-principles-grid">
              {designPrinciples.map((principle, index) => {
                const [english, chinese] = principle.split(" / ");
                return (
                  <article key={principle} className="ds-principle-card">
                    <p className="ds-principle-index">0{index + 1}</p>
                    <h3>{english}</h3>
                    <p>{chinese}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="ds-section" id="foundations">
            <div className="ds-section-heading">
              <span />
              <h2>{locale === "en" ? "Foundations & Tokens" : "基礎與 Tokens"}</h2>
              <span />
            </div>
            <Accordion type="multiple" defaultValue={["color", "spacing", "motion"]}>
              {tokenGroupRows.map(group => (
                <AccordionItem key={group.id} value={group.id}>
                  <AccordionHeader>{group.title}</AccordionHeader>
                  <AccordionPanel>
                    <p style={{ color: "var(--hm-muted)", marginBottom: "var(--hm-space-md)" }}>{group.description}</p>
                    <div className="ds-context-table-wrap">
                      <table className="ds-context-table">
                        <thead>
                          <tr>
                            {group.columns.map(col => <th key={col}>{col}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {group.rows.map(row => (
                            <tr key={row[0]}>
                              {row.map(cell => <td key={cell}>{cell}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="ds-section" id="components" style={{ borderTop: "1px solid var(--hm-line)", marginTop: "var(--hm-space-2xl)", paddingTop: "var(--hm-space-2xl)" }}>
            <div className="ds-section-heading">
              <span />
              <h2>{locale === "en" ? "Component Explorer" : "元件庫"}</h2>
              <span />
            </div>
            <DesignSystemExplorer
              locale={locale}
              sections={designSystemSections.slice(1)}
              docs={designSystemDocs}
            />
          </section>

          <section className="ds-section ds-cta" id="cta">
            <div>
              <p className="ds-eyebrow">{copy.cta.eyebrow}</p>
              <h2>{copy.cta.title}</h2>
              <p>{copy.cta.body}</p>
            </div>
            <div className="ds-cta-actions">
              <Link className="ds-anchor-link" href="/#projects">
                {copy.cta.primaryAction}
              </Link>
              <Link className="ds-anchor-link is-secondary" href="/contact">
                {copy.cta.secondaryAction}
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
