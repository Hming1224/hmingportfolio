import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getLocale } from "next-intl/server";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { designSystemDocs } from "../../lib/design-system-docs";
import { designSystemSections, designSystemTokenRows } from "../../lib/design-system-data";
import DesignSystemExplorer from "../../components/design-system/DesignSystemExplorer";
import Button from "../../components/ui/Button";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import { designPrinciples } from "../../lib/design-system-data";
import enMessages from "../../i18n/dictionaries/en";
import zhMessages from "../../i18n/dictionaries/zh-TW";
import styles from "../../components/design-system/DesignSystemExplorer.module.css";

type Messages = typeof enMessages;




type TokenGroup = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  previewRows: Array<(typeof designSystemTokenRows)[number]>;
  columns: string[];
  rows: Array<(typeof designSystemTokenRows)[number]>;
};

const messageMap: Record<Locale, Messages> = {
  en: enMessages,
  "zh-TW": zhMessages,
};

function getMessages(locale: Locale) {
  return messageMap[locale].designSystem;
}

function buildFoundationGroups(locale: Locale): TokenGroup[] {
  const zh = locale === "zh-TW";
  const columns = zh ? ["Token", "值", "用途"] : ["Token", "Value", "Usage"];
  const rowsFor = (types: Array<(typeof designSystemTokenRows)[number]["type"]>) =>
    designSystemTokenRows
      .filter((row) => types.includes(row.type))
      .map((row) => row);

  const colorRows = rowsFor(["color"]);
  const typeRows = rowsFor(["type"]);
  const spacingRows = rowsFor(["spacing"]);
  const radiusRows = rowsFor(["radius"]);
  const shadowRows = rowsFor(["shadow"]);
  const motionRows = rowsFor(["motion"]);
  const layoutRows = rowsFor(["layout"]);

  return [
    {
      id: "colors",
      eyebrow: "FOUNDATION",
      title: zh ? "Color System" : "Color System",
      description: zh
        ? "照 Figma Make 的 primitive → semantic → component 節奏呈現，但 token 名稱和值以目前 code 為準。"
        : "Presented in the primitive → semantic → component rhythm from Figma Make, with names and values kept from code.",
      previewRows: colorRows.filter((row) =>
        row.token.includes("purple") ||
        ["--hm-paper", "--hm-surface", "--hm-ink", "--hm-muted", "--hm-line"].includes(row.token),
      ),
      columns,
      rows: colorRows,
    },
    {
      id: "typography",
      eyebrow: "FOUNDATION",
      title: zh ? "Typography" : "Typography",
      description: zh
        ? "字級列出目前 code 內的 responsive token 值；preview 使用桌機值呈現層級。"
        : "Type scale values come from the current code data; previews use the desktop value to show hierarchy.",
      previewRows: typeRows,
      columns,
      rows: typeRows,
    },
    {
      id: "spacing",
      eyebrow: "FOUNDATION",
      title: zh ? "Spacing" : "Spacing",
      description: zh
        ? "以目前 code 的 spacing token 命名和值呈現視覺刻度，不搬 Figma 內已過期的命名。"
        : "Visualizes the spacing scale with the current code names and values, without copying stale names from Figma.",
      previewRows: spacingRows,
      columns,
      rows: spacingRows,
    },
    {
      id: "radius",
      eyebrow: "FOUNDATION",
      title: zh ? "Border Radius" : "Border Radius",
      description: zh
        ? "用 pill 與 card 兩種語意呈現目前 code 的 radius token。"
        : "Shows the current radius tokens through pill and card semantics.",
      previewRows: radiusRows,
      columns,
      rows: radiusRows,
    },
    {
      id: "shadows",
      eyebrow: "FOUNDATION",
      title: zh ? "Shadows & Elevation" : "Shadows & Elevation",
      description: zh
        ? "以 elevation preview 表示陰影層級；值仍來自目前 token data。"
        : "Uses elevation previews to show depth while keeping values from the current token data.",
      previewRows: shadowRows,
      columns,
      rows: shadowRows,
    },
    {
      id: "motion",
      eyebrow: "FOUNDATION",
      title: zh ? "Motion" : "Motion",
      description: zh
        ? "把 duration 與 easing 放在同一個 motion panel，對齊 Figma Make 的文件節奏。"
        : "Keeps duration and easing in one motion panel, matching the documentation rhythm from Figma Make.",
      previewRows: motionRows,
      columns,
      rows: motionRows,
    },
    {
      id: "layout",
      eyebrow: "REFERENCE",
      title: zh ? "Layout Reference" : "Layout Reference",
      description: zh
        ? "Figma Foundation 沒有獨立 layout 頁，但 production code 有 container、gutter、z-index 與 breakpoint reference，保留在 token reference。"
        : "Figma has no separate layout foundation page, but production code includes container, gutter, z-index, and breakpoint references, so they stay in the token reference.",
      previewRows: layoutRows,
      columns,
      rows: layoutRows,
    },
  ];
}

function getTokenUsage(row: (typeof designSystemTokenRows)[number], locale: Locale) {
  return locale === "zh-TW" ? row.usageZh ?? row.usage : row.usage;
}

function tokenPreviewStyle(row: (typeof designSystemTokenRows)[number]) {
  const value = row.value.split(" / ")[0];
  const cssValue = value.startsWith("#") || value.startsWith("rgb") || value.startsWith("var(")
    ? value
    : `var(${row.token})`;

  return {
    "--token-preview": cssValue,
    "--token-size": value,
    "--token-radius": value,
    "--token-shadow": row.value,
    "--token-duration": value,
    "--token-type-size": value,
  } as CSSProperties;
}

function renderTokenPreview(row: (typeof designSystemTokenRows)[number], locale: Locale) {
  if (row.type === "color") {
    return (
      <article className={styles.tokenPreviewCard} key={row.token}>
        <span className={styles.colorSwatch} style={tokenPreviewStyle(row)} />
        <code>{row.token}</code>
        <span>{row.value}</span>
        <p>{getTokenUsage(row, locale)}</p>
      </article>
    );
  }

  if (row.type === "type") {
    return (
      <article className={styles.tokenPreviewCard} key={row.token}>
        <strong className={styles.typeSample} style={tokenPreviewStyle(row)}>Aa</strong>
        <code>{row.token}</code>
        <span>{row.value}</span>
        <p>{getTokenUsage(row, locale)}</p>
      </article>
    );
  }

  if (row.type === "spacing") {
    return (
      <article className={styles.tokenPreviewCard} key={row.token}>
        <span className={styles.spacingSample} style={tokenPreviewStyle(row)} />
        <code>{row.token}</code>
        <span>{row.value}</span>
        <p>{getTokenUsage(row, locale)}</p>
      </article>
    );
  }

  if (row.type === "radius") {
    return (
      <article className={styles.tokenPreviewCard} key={row.token}>
        <span className={styles.radiusSample} style={tokenPreviewStyle(row)} />
        <code>{row.token}</code>
        <span>{row.value}</span>
        <p>{getTokenUsage(row, locale)}</p>
      </article>
    );
  }

  if (row.type === "shadow") {
    return (
      <article className={styles.tokenPreviewCard} key={row.token}>
        <span className={styles.shadowSample} style={tokenPreviewStyle(row)} />
        <code>{row.token}</code>
        <span>{row.value}</span>
        <p>{getTokenUsage(row, locale)}</p>
      </article>
    );
  }

  if (row.type === "motion") {
    return (
      <article className={styles.tokenPreviewCard} key={row.token}>
        <span className={styles.motionSample} style={tokenPreviewStyle(row)} />
        <code>{row.token}</code>
        <span>{row.value}</span>
        <p>{getTokenUsage(row, locale)}</p>
      </article>
    );
  }

  return (
    <article className={styles.tokenPreviewCard} key={row.token}>
      <strong className={styles.layoutSample}>{row.value}</strong>
      <code>{row.token}</code>
      <p>{getTokenUsage(row, locale)}</p>
    </article>
  );
}

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
  const tokenGroupRows = buildFoundationGroups(locale);

  return (
    <main className={styles.page}>
      <Navbar />

      <section className={styles.hero} aria-labelledby="ds-title">
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1 className={styles.heroTitle} id="ds-title">{copy.hero.title}</h1>
            <p className={styles.heroDescription}>{copy.hero.description}</p>
            <div className={styles.actions}>
              <Button href="#getting-started">
                {copy.hero.primaryAction}
              </Button>
              <Button variant="secondary" href="#tokens">
                {copy.hero.secondaryAction}
              </Button>
            </div>
          </div>
          <div className={styles.statsGrid} aria-label={copy.hero.statsAriaLabel}>
            {copy.hero.stats.map((stat) => (
              <article className={styles.statCard} key={stat.label}>
                <strong className={styles.statValue}>{stat.value}</strong>
                <span className={styles.statLabel}>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DesignSystemExplorer
        locale={locale}
        sections={designSystemSections.slice(1)}
        docs={designSystemDocs}
        toc={copy.toc}
        topContent={
          <>
            <section className={`${styles.card} ${styles.aboutCard}`} key="about-system" id="about-system">
              <div className={styles.aboutBody}>
                <p className={styles.eyebrow}>{copy.about.eyebrow}</p>
                <h2 className={styles.sectionTitle}>{copy.about.title}</h2>
                <p className={styles.cardBody}>{copy.about.body}</p>
              </div>
              <div className={styles.decisionFrame}>
                <p className={styles.decisionLabel}>{copy.about.frameworkLabel}</p>
                <p className={styles.decisionSummary}>{copy.about.framework}</p>
              </div>
              <div aria-disabled="true" className={styles.caseStudyPlaceholder}>
                <span className={styles.placeholderLabel}>{copy.about.caseStudyLabel}</span>
                <span className={styles.placeholderText}>{copy.about.caseStudyPlaceholder}</span>
              </div>
            </section>

            <section className={styles.section} key="getting-started" id="getting-started">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionRule} />
              <h2 className={styles.sectionTitle}>{copy.introduction.heading}</h2>
              <span className={styles.sectionRule} />
            </div>
            <div className={styles.twoColumnGrid}>
              <article className={styles.card}>
                <h3 className={styles.cardTitle}>{copy.introduction.soulTitle}</h3>
                <p className={styles.cardBody}>{copy.introduction.soulBody}</p>
                <div className={styles.keywordList} aria-label={copy.introduction.keywordsAriaLabel}>
                  {copy.introduction.keywords.map((keyword) => (
                    <span className={styles.pill} key={keyword}>{keyword}</span>
                  ))}
                </div>
              </article>
              <article className={styles.card}>
                <h3 className={styles.cardTitle}>{copy.introduction.architectureTitle}</h3>
                <p className={styles.cardBody}>{copy.introduction.architectureBody}</p>
                <div className={styles.nestedGrid}>
                  {copy.introduction.architectureCards.map((card) => (
                    <section className={styles.nestedCard} key={card.title}>
                      <p className={styles.kicker}>{card.kicker}</p>
                      <h4 className={styles.nestedTitle}>{card.title}</h4>
                      <p className={styles.nestedBody}>{card.body}</p>
                    </section>
                  ))}
                </div>
              </article>
            </div>
            <div className={styles.principleGrid}>
              {designPrinciples.map((principle, index) => {
                const [english, chinese] = principle.split(" / ");
                return (
                  <article className={styles.card} key={principle}>
                    <p className={styles.principleIndex}>0{index + 1}</p>
                    <h3 className={styles.principleTitle}>{english}</h3>
                    <p className={styles.principleBody}>{chinese}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className={styles.section} key="foundations" id="foundations">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionRule} />
              <h2 className={styles.sectionTitle}>{locale === "en" ? "Foundations & Tokens" : "基礎與 Tokens"}</h2>
              <span className={styles.sectionRule} />
            </div>
            <div className={styles.foundationIntro}>
              <p className={styles.eyebrow}>FOUNDATION</p>
              <p className={styles.cardBody}>
                {locale === "en"
                  ? "The layout follows the Figma Make foundation pages: a focused category intro, visual token previews, then the token/value/usage reference. Names and values remain sourced from the current code."
                  : "排版跟 Figma Make 的 foundation pages 對齊：先有類別定位、再用 preview 看 token 語意，最後保留 token / value / usage 對照。名稱和值仍以目前 code 為準。"}
              </p>
            </div>
            <div className={styles.foundationStack}>
              {tokenGroupRows.map((group) => (
                <article className={styles.foundationPanel} key={group.id}>
                  <header className={styles.foundationPanelHeader}>
                    <div>
                      <p className={styles.foundationEyebrow}>{group.eyebrow}</p>
                      <h3 className={styles.foundationTitle}>{group.title}</h3>
                      <p className={styles.foundationDescription}>{group.description}</p>
                    </div>
                    <span className={styles.foundationCount}>
                      {group.rows.length} {locale === "en" ? "tokens" : "個 tokens"}
                    </span>
                  </header>
                  <div className={`${styles.tokenPreviewGrid} ${styles[`tokenPreviewGrid_${group.id}`]}`}>
                    {group.previewRows.map((row) => renderTokenPreview(row, locale))}
                  </div>
                  <div className={styles.tableShell}>
                    <table className={styles.tokenTable}>
                      <thead>
                        <tr>
                          {group.columns.map((col) => <th key={col}>{col}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {group.rows.map((row) => (
                          <tr key={row.token}>
                            <td>{row.token}</td>
                            <td>{row.value}</td>
                            <td>{getTokenUsage(row, locale)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      }
      bottomContent={
        <section className={styles.cta} key="cta" id="cta">
            <div>
              <p className={styles.eyebrow}>{copy.cta.eyebrow}</p>
              <h2 className={styles.ctaTitle}>{copy.cta.title}</h2>
              <p className={styles.ctaBody}>{copy.cta.body}</p>
            </div>
            <div className={styles.actions}>
              <Button href="/#projects">
                {copy.cta.primaryAction}
              </Button>
              <Button variant="secondary" href="/contact">
                {copy.cta.secondaryAction}
              </Button>
            </div>
          </section>
      }
    />

      <Footer />
    </main>
  );
}
