import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "../../components/ui/Accordion";
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

function buildFoundationGroups(locale: Locale): TokenGroup[] {
  const zh = locale === "zh-TW";
  const columns = zh ? ["Token", "值", "用途"] : ["Token", "Value", "Usage"];
  const rowsFor = (types: Array<(typeof designSystemTokenRows)[number]["type"]>) =>
    designSystemTokenRows
      .filter((row) => types.includes(row.type))
      .map((row) => [row.token, row.value, zh ? row.usageZh ?? row.usage : row.usage]);

  return [
    {
      id: "color",
      title: zh ? "色彩與語意 tokens" : "Color and semantic tokens",
      description: zh
        ? "直接鏡像 styles/tokens.css：primitive 色階、semantic alias、status、case-study tone 與 chart palette。"
        : "Mirrors styles/tokens.css: primitive scales, semantic aliases, status colors, case-study tones, and chart palette.",
      columns,
      rows: rowsFor(["color"]),
    },
    {
      id: "structure",
      title: zh ? "字級、間距與版面" : "Type, spacing, and layout",
      description: zh
        ? "收錄響應式字級、4px / T-shirt spacing、container、gutter、z-index 與 breakpoint reference。"
        : "Documents responsive type, 4px / T-shirt spacing, container, gutter, z-index, and breakpoint references.",
      columns,
      rows: rowsFor(["type", "spacing", "layout"]),
    },
    {
      id: "surface",
      title: zh ? "圓角、陰影與動效" : "Radius, shadows, and motion",
      description: zh
        ? "對齊 02-tokens.md 的 radius、elevation、duration 與 easing；不在頁面新增 runtime token。"
        : "Aligned to 02-tokens.md for radius, elevation, duration, and easing; this page does not create runtime tokens.",
      columns,
      rows: rowsFor(["radius", "shadow", "motion"]),
    },
  ];
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
            <Accordion type="multiple" defaultValue={["color", "structure", "surface"]}>
              {tokenGroupRows.map(group => (
                <AccordionItem key={group.id} value={group.id}>
                  <AccordionHeader>{group.title}</AccordionHeader>
                  <AccordionPanel>
                    <p className={styles.mutedText}>{group.description}</p>
                    <div className={styles.tableShell}>
                      <table className={styles.tokenTable}>
                        <thead>
                          <tr>
                            {group.columns.map(col => <th key={col}>{col}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {group.rows.map(row => (
                            <tr key={row[0]}>
                              {row.map((cell, cellIndex) => <td key={`${row[0]}-${cellIndex}`}>{cell}</td>)}
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
