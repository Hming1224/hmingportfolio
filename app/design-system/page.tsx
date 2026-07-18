import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
// 文件頁的 ComponentDemo 會渲染 Case* 共用元件，需要 case-study.css
import "../../styles/case-study.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import SplitText from "../../components/animate-ui/primitives/texts/SplitText";
import { designSystemDocs } from "../../lib/design-system-docs";
import { designSystemSections } from "../../lib/design-system-data";
import DesignSystemExplorer from "../../components/design-system/DesignSystemExplorer";
import Button from "../../components/ui/Button";
import AnimatedContent from "../about-me/AnimatedContent";
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
            <AnimatedContent
              className={styles.heroRevealItem}
              distance={120}
              duration={0.95}
              scale={0.96}
              ease="power3.out"
              threshold={0.05}
            >
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            </AnimatedContent>
            <SplitText
              tag="h1"
              id="ds-title"
              text={copy.hero.title}
              className={styles.heroTitle}
              delay={42}
              duration={0.72}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 34 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-80px"
              resetOnLeave={false}
              textAlign="inherit"
            />
            <AnimatedContent
              className={styles.heroRevealItem}
              delay={0.12}
              distance={120}
              duration={0.95}
              scale={0.96}
              ease="power3.out"
              threshold={0.05}
            >
              <p className={styles.heroDescription}>{copy.hero.description}</p>
            </AnimatedContent>
          </div>
          <div className={styles.highlightsGrid} aria-label={copy.hero.highlightsAriaLabel}>
            {copy.hero.highlights.map((highlight, index) => (
              <AnimatedContent
                className={styles.highlightRevealItem}
                delay={(index + 1) * 0.12}
                distance={120}
                duration={0.95}
                scale={0.96}
                ease="power3.out"
                threshold={0.05}
                key={highlight.title}
              >
                <article className={styles.highlightCard}>
                  <h2 className={styles.highlightTitle}>{highlight.title}</h2>
                  <p className={styles.highlightLead}>{highlight.lead}</p>
                </article>
              </AnimatedContent>
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
          <article className={`${styles.docArticle} ${styles.gettingStartedArticle}`} id="getting-started" key="getting-started">
            <section className={styles.section} key="getting-started">
              <div className={styles.groupHeader}>
                <h2 className={styles.groupTitle}>{copy.introduction.soulKicker}</h2>
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
                <h2 className={styles.groupTitle}>{copy.introduction.principlesKicker}</h2>
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
                <h2 className={styles.groupTitle}>{copy.introduction.architectureKicker}</h2>
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
              <h2 className={styles.docTitle}>{copy.cta.title}</h2>
              <p className={styles.docDescription}>{copy.cta.body}</p>
            </header>
            <section className={styles.seeMoreActions} key="see-more">
              <div className={styles.actions}>
                <Button href="/#projects">
                  {copy.cta.primaryAction}
                </Button>
                <Button variant="secondary" href="/design-system-case-study">
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
