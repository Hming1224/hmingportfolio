import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { designSystemDocs } from "../../lib/design-system-docs";
import { designSystemSections } from "../../lib/design-system-data";
import DesignSystemExplorer from "../../components/design-system/DesignSystemExplorer";
import Button from "../../components/ui/Button";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import enMessages from "../../i18n/dictionaries/en";
import zhMessages from "../../i18n/dictionaries/zh-TW";
import styles from "../../components/design-system/DesignSystemExplorer.module.css";

type Messages = typeof enMessages;

const messageMap: Record<Locale, Messages> = {
  en: enMessages,
  "zh-TW": zhMessages,
};

function getMessages(locale: Locale) {
  return messageMap[locale].designSystem;
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
              <Button href="#general">
                {copy.hero.primaryAction}
              </Button>
              <Button variant="secondary" href="#component-boundaries">
                {copy.hero.secondaryAction}
              </Button>
            </div>
          </div>
          <div className={styles.highlightsGrid} aria-label={copy.hero.highlightsAriaLabel}>
            {copy.hero.highlights.map((highlight) => (
              <article className={styles.highlightCard} key={highlight.title}>
                <h2 className={styles.highlightTitle}>{highlight.title}</h2>
                <p className={styles.highlightLead}>{highlight.lead}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DesignSystemExplorer
        locale={locale}
        sections={designSystemSections}
        docs={designSystemDocs}
        toc={copy.toc}
        gettingStartedContent={
          <article className={styles.docArticle} id="getting-started" key="getting-started">
            <section className={styles.section} key="getting-started">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionRule} />
                <h2 className={styles.sectionTitle}>{copy.introduction.heading}</h2>
                <span className={styles.sectionRule} />
              </div>
              <div className={styles.groupHeader}>
                <p className={styles.groupKicker}>{copy.introduction.soulKicker}</p>
                <p className={styles.groupLead}>{copy.introduction.soulLead}</p>
              </div>
              <article className={styles.card}>
                <h3 className={styles.cardTitle}>{copy.introduction.soulTitle}</h3>
                <p className={styles.cardBody}>{copy.introduction.soulBody}</p>
                <div className={styles.keywordList} aria-label={copy.introduction.keywordsAriaLabel}>
                  {copy.introduction.keywords.map((keyword) => (
                    <span className={styles.pill} key={keyword}>{keyword}</span>
                  ))}
                </div>
              </article>
              <div className={styles.groupHeader}>
                <p className={styles.groupKicker}>{copy.introduction.principlesKicker}</p>
                <p className={styles.groupLead}>{copy.introduction.principlesLead}</p>
              </div>
              <div className={styles.principleGrid}>
                {copy.introduction.principles.map((principle, index) => {
                  return (
                    <article className={`${styles.card} ${styles.principleCard}`} key={principle.title}>
                      <p className={styles.principleIndex}>0{index + 1}</p>
                      <h3 className={styles.principleTitle}>{principle.title}</h3>
                      <p className={styles.principleDesc}>{principle.desc}</p>
                    </article>
                  );
                })}
              </div>
              <div className={styles.groupHeader}>
                <p className={styles.groupKicker}>{copy.introduction.architectureKicker}</p>
                <p className={styles.groupLead}>{copy.introduction.architectureLead}</p>
              </div>
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
            </section>
          </article>
        }
        seeMoreContent={
          <article className={`${styles.docArticle} ${styles.seeMoreArticle}`} id="see-more" key="see-more">
            <header className={`${styles.docHeader} ${styles.seeMoreHeader}`}>
              <p className={styles.eyebrow}>{copy.cta.eyebrow}</p>
              <h2 className={styles.docTitle}>{copy.cta.workspaceTitle}</h2>
              <p className={styles.docDescription}>{copy.cta.body}</p>
            </header>
            <section className={styles.seeMoreActions} key="see-more">
              <div className={styles.actions}>
                <Button href="/#projects">
                  {copy.cta.primaryAction}
                </Button>
                <Button variant="secondary" href="/contact">
                  {copy.cta.secondaryAction}
                </Button>
              </div>
            </section>
          </article>
        }
      />

      <Footer />
    </main>
  );
}
