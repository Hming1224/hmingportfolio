import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import DesignSystemPlayground from "../../components/DesignSystemPlayground";
import { Link } from "../../i18n/navigation";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import { designPrinciples, designSystemTokenRows } from "../../lib/design-system-data";
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


const spacingVisuals = [4, 8, 12, 16, 24, 32, 40, 48, 64, 80] as const;


const tokenFilters = {
  en: [
    { value: "all", label: "All" },
    { value: "color", label: "Color" },
    { value: "type", label: "Type" },
    { value: "spacing", label: "Spacing" },
    { value: "radius", label: "Radius" },
    { value: "shadow", label: "Shadow" },
    { value: "motion", label: "Motion" },
    { value: "layout", label: "Layout" },
  ],
  "zh-TW": [
    { value: "all", label: "全部" },
    { value: "color", label: "Color" },
    { value: "type", label: "Type" },
    { value: "spacing", label: "Spacing" },
    { value: "radius", label: "Radius" },
    { value: "shadow", label: "Shadow" },
    { value: "motion", label: "Motion" },
    { value: "layout", label: "Layout" },
  ],
} satisfies Record<Locale, Array<{ value: string; label: string }>>;


const colorGroupDefinitions: Record<Locale, Array<{ id: string; title: string; tokens: string[] }>> = {
  en: [
    { id: "purple", title: "Purple", tokens: ["--hm-purple", "--hm-purple-hover", "--hm-purple-soft", "--hm-purple-light"] },
    { id: "neutral", title: "Neutrals", tokens: ["--hm-paper", "--hm-surface", "--hm-ink", "--hm-muted", "--hm-line", "--hm-line-strong"] },
    { id: "text", title: "Semantic text", tokens: ["--text-heading", "--text-body", "--text-secondary", "--text-muted"] },
    { id: "accent", title: "Accent", tokens: ["--hm-blue", "--hm-green", "--hm-peach", "--hm-brown"] },
    { id: "project-tone", title: "Project tone", tokens: [".tone-advantech --tag-text", ".tone-advantech --tag-bg", ".tone-laushu --tag-text", ".tone-laushu --tag-bg"] },
  ],
  "zh-TW": [
    { id: "purple", title: "Purple", tokens: ["--hm-purple", "--hm-purple-hover", "--hm-purple-soft", "--hm-purple-light"] },
    { id: "neutral", title: "中性色", tokens: ["--hm-paper", "--hm-surface", "--hm-ink", "--hm-muted", "--hm-line", "--hm-line-strong"] },
    { id: "text", title: "語意文字", tokens: ["--text-heading", "--text-body", "--text-secondary", "--text-muted"] },
    { id: "accent", title: "Accent", tokens: ["--hm-blue", "--hm-green", "--hm-peach", "--hm-brown"] },
    { id: "project-tone", title: "Project tone", tokens: [".tone-advantech --tag-text", ".tone-advantech --tag-bg", ".tone-laushu --tag-text", ".tone-laushu --tag-bg"] },
  ]
};

function getColorSections(locale: Locale) {
  return colorGroupDefinitions[locale].map(group => ({
    id: group.id,
    title: group.title,
    items: group.tokens.map(token => {
      const found = designSystemTokenRows.find(r => r.token === token);
      const usage = found ? (locale === "zh-TW" && found.usageZh ? found.usageZh : found.usage) : "";
      const value = found ? found.value : "";
      const swatchClass = "is-" + token.replace("--hm-", "").replace("--text-", "text-").replace(".tone-", "").replace(" --tag-", "-").replace("-bg", "-bg").replace("-text", "-text");
      return { token, value, usage, swatchClass };
    })
  }));
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
  const colorSections = getColorSections(locale);
  const tokenGroupRows = foundationGroups[locale];
  const tokenFilterOptions = tokenFilters[locale];

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

          <section className="ds-section" id="colors">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.colors.heading}</h2>
              <span />
            </div>
            <div className="ds-color-groups">
              {colorSections.map((group) => (
                <section key={group.id} className="ds-color-group-card">
                  <div className="ds-color-group-head">
                    <h3>{group.title}</h3>
                  </div>
                  <div className="ds-color-grid">
                    {group.items.map((item) => (
                      <article key={item.token} className="ds-color-card">
                        <div className={`ds-color-swatch ${item.swatchClass ?? ""}`} aria-hidden="true" />
                        <div className="ds-color-meta">
                          <strong>{item.token}</strong>
                          <span>{item.value}</span>
                          <p>{item.usage}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <div className="ds-rules-grid">
              {copy.colors.rules.map((rule) => (
                <article key={rule.title} className={`ds-rule-card ${rule.tone === "do" ? "is-do" : "is-dont"}`}>
                  <p className="ds-rule-badge">{rule.badge}</p>
                  <h3>{rule.title}</h3>
                  <p>{rule.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="ds-section" id="typography">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.typography.heading}</h2>
              <span />
            </div>
            <div className="ds-type-stack">
              {copy.typography.scale.map((item) => (
                <article key={item.token} className="ds-type-row">
                  <div>
                    <p className={`ds-type-sample ${item.className}`}>{item.sample}</p>
                    <div className="ds-type-meta">
                      <strong>{item.token}</strong>
                      <span>{item.desktop}</span>
                      <span>{item.mobile}</span>
                    </div>
                  </div>
                  <p className="ds-type-note">{item.usage}</p>
                </article>
              ))}
            </div>
            <div className="ds-spec-grid">
              <article className="ds-spec-card">
                <h3>{copy.typography.weightTitle}</h3>
                <div className="ds-weight-list">
                  {copy.typography.weights.map((item) => (
                    <div key={item.label} className="ds-weight-row">
                      <strong style={{ fontWeight: item.weight }}>{item.label}</strong>
                      <span>{item.usage}</span>
                    </div>
                  ))}
                </div>
              </article>
              <article className="ds-spec-card">
                <h3>{copy.typography.lineHeightTitle}</h3>
                <div className="ds-weight-list">
                  {copy.typography.lineHeights.map((item) => (
                    <div key={item.label} className="ds-weight-row">
                      <strong>{item.label}</strong>
                      <span>{item.usage}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section className="ds-section" id="spacing">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.spacing.heading}</h2>
              <span />
            </div>
            <div className="ds-spec-grid">
              <article className="ds-spec-card">
                <h3>{copy.spacing.tokenTitle}</h3>
                <div className="ds-spacing-token-list">
                  {copy.spacing.tokens.map((item) => (
                    <div key={item.token} className="ds-spacing-token-row">
                      <strong>{item.token}</strong>
                      <span>{item.value}</span>
                      <p>{item.usage}</p>
                    </div>
                  ))}
                </div>
              </article>
              <article className="ds-spec-card">
                <h3>{copy.spacing.visualTitle}</h3>
                <div className="ds-spacing-visuals">
                  {spacingVisuals.map((value) => (
                    <div key={value} className="ds-spacing-bar-row">
                      <span>{value}px</span>
                      <div className="ds-spacing-bar-track">
                        <div className="ds-spacing-bar-fill" style={{ width: `${Math.max(value, 4)}px` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
            <div className="ds-context-table-wrap">
              <table className="ds-context-table">
                <thead>
                  <tr>
                    {copy.spacing.contextColumns.map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.spacing.contextRows.map((row) => (
                    <tr key={row.context}>
                      <td>{row.context}</td>
                      <td>{row.token}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <article className="ds-note-card">
              <h3>{copy.spacing.exceptionTitle}</h3>
              <p>{copy.spacing.exceptionBody}</p>
            </article>
          </section>

          <section className="ds-section" id="radius">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.radius.heading}</h2>
              <span />
            </div>
            <div className="ds-radius-grid">
              {copy.radius.items.map((item) => (
                <article key={item.token} className="ds-radius-card">
                  <div className={`ds-radius-demo ${item.className}`} aria-hidden="true" />
                  <strong>{item.token}</strong>
                  <span>{item.value}</span>
                  <p>{item.usage}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="ds-section" id="shadows">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.shadows.heading}</h2>
              <span />
            </div>
            <div className="ds-shadow-grid">
              {copy.shadows.items.map((item) => (
                <article key={item.token} className="ds-shadow-card">
                  <div className={`ds-shadow-demo ${item.className}`} aria-hidden="true" />
                  <strong>{item.token}</strong>
                  <span>{item.value}</span>
                  <p>{item.usage}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="ds-section" id="motion">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.motion.heading}</h2>
              <span />
            </div>
            <div className="ds-spec-grid">
              <article className="ds-spec-card">
                <h3>{copy.motion.durationTitle}</h3>
                <div className="ds-weight-list">
                  {copy.motion.durations.map((item) => (
                    <div key={item.token} className="ds-weight-row">
                      <strong>{item.token}</strong>
                      <span>{item.usage}</span>
                    </div>
                  ))}
                </div>
              </article>
              <article className="ds-spec-card">
                <h3>{copy.motion.easingTitle}</h3>
                <div className="ds-weight-list">
                  {copy.motion.easings.map((item) => (
                    <div key={item.token} className="ds-weight-row">
                      <strong>{item.token}</strong>
                      <span>{item.usage}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
            <div className="ds-motion-demo-grid">
              <article className="ds-motion-card">
                <h3>{copy.motion.demoPrimaryTitle}</h3>
                <button type="button" className="ds-motion-chip">
                  {copy.motion.demoPrimaryLabel}
                </button>
              </article>
              <article className="ds-motion-card">
                <h3>{copy.motion.demoPanelTitle}</h3>
                <div className="ds-motion-panel">
                  <div className="ds-motion-panel-surface">{copy.motion.demoPanelLabel}</div>
                </div>
              </article>
            </div>
          </section>

          <section className="ds-section" id="components">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.components.heading}</h2>
              <span />
            </div>
            <DesignSystemPlayground
              part="components"
              dictionary={copy.playground}
              tokenGroups={tokenGroupRows}
            />
            <div className="ds-inline-actions ds-section-actions">
              <Link className="ds-anchor-link is-secondary" href="/design-system/components/button">
                {locale === "en" ? "Browse component documentation" : "瀏覽完整元件文件"}
              </Link>
            </div>
            <div className="ds-context-table-wrap">
              <table className="ds-context-table">
                <thead>
                  <tr>
                    {copy.components.matrixColumns.map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.components.matrixRows.map((row) => (
                    <tr key={row.component}>
                      <td>{row.component}</td>
                      <td>{row.default}</td>
                      <td>{row.hover}</td>
                      <td>{row.focus}</td>
                      <td>{row.active}</td>
                      <td>{row.disabled}</td>
                      <td>{row.loading}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="ds-section" id="button-tokens">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.buttonTokens.heading}</h2>
              <span />
            </div>
            <div className="ds-button-token-card">
              <div className="ds-button-token-stage">
                <button type="button" className="ds-button-token-demo">
                  {copy.buttonTokens.buttonLabel}
                </button>
              </div>
              <div className="ds-button-token-list">
                {copy.buttonTokens.items.map((item) => (
                  <article key={item.label} className="ds-button-token-row">
                    <strong>{item.label}</strong>
                    <span>{item.token}</span>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="ds-section" id="tokens">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.tokens.heading}</h2>
              <span />
            </div>
            <DesignSystemPlayground
              part="tokens"
              dictionary={copy.playground}
              tokenGroups={tokenGroupRows}
              tokenReferenceRows={designSystemTokenRows}
              tokenReferenceFilters={tokenFilterOptions}
              tokenReferenceTitle={copy.tokens.tableTitle}
              tokenReferenceDescription={copy.tokens.tableDescription}
              tokenReferenceColumns={copy.tokens.columns}
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
