import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "../../components/ui/Accordion";
import { designSystemDocs } from "../../lib/design-system-docs";
import { designSystemSections } from "../../lib/design-system-data";
import DesignSystemExplorer from "../../components/design-system/DesignSystemExplorer";
import Button from "../../components/ui/Button";
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
    <main style={{ background: "var(--hm-paper)", color: "var(--text-body)" }}>
      <Navbar />

      <section style={{ padding: "148px 0 56px", background: "radial-gradient(circle at top right, color-mix(in srgb, var(--hm-purple-soft) 80%, white) 0%, transparent 34%), linear-gradient(180deg, color-mix(in srgb, var(--hm-surface) 65%, white) 0%, transparent 100%)" }} aria-labelledby="ds-title">
        <div style={{ width: "min(var(--hm-container), calc(100% - 96px))", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: "var(--hm-space-lg)", alignItems: "end" }}>
          <div >
            <p style={{ margin: "0 0 var(--hm-space-xs)", fontSize: "var(--hm-fs-sm)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--hm-purple)" }}>{copy.hero.eyebrow}</p>
            <h1 id="ds-title" style={{ margin: 0, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.18, letterSpacing: "-0.01em", color: "var(--text-heading)" }}>{copy.hero.title}</h1>
            <p style={{ margin: "var(--hm-space-sm) 0 0", maxWidth: 760, fontSize: 18, lineHeight: 1.7, color: "var(--text-secondary)" }}>{copy.hero.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--hm-space-xs)", marginTop: 28 }}>
              <Button href="#getting-started">
                {copy.hero.primaryAction}
              </Button>
              <Button variant="secondary" href="#tokens">
                {copy.hero.secondaryAction}
              </Button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))", gap: "var(--hm-space-sm)" }} aria-label={copy.hero.statsAriaLabel}>
            {copy.hero.stats.map((stat) => (
              <article key={stat.label} style={{ border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 92%, white)", boxShadow: "var(--shadow-sm)", padding: "var(--hm-space-md)" }}>
                <strong style={{ display: "block", fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1, color: "var(--text-heading)" }}>{stat.value}</strong>
                <span style={{ display: "block", marginTop: "var(--hm-space-2xs)", color: "var(--text-secondary)", lineHeight: 1.5 }}>{stat.label}</span>
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
            <section style={{ scrollMarginTop: 112 }} id="getting-started">
            <div style={{ display: "grid", gridTemplateColumns: "40px auto 1fr", gap: 14, alignItems: "center", marginBottom: "var(--hm-space-md)" }}>
              <span style={{ height: 1, background: "var(--hm-line-strong)" }} />
              <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.2vw, 32px)", lineHeight: 1.3, color: "var(--text-heading)" }}>{copy.introduction.heading}</h2>
              <span style={{ height: 1, background: "var(--hm-line-strong)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18 }}>
              <article style={{ padding: 28, border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 92%, white)", boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ margin: 0, fontSize: "var(--hm-fs-h4)", lineHeight: 1.4, color: "var(--text-heading)" }}>{copy.introduction.soulTitle}</h3>
                <p style={{ margin: "var(--hm-space-2xs) 0 0", lineHeight: 1.7, color: "var(--text-secondary)" }}>{copy.introduction.soulBody}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--hm-space-xs)" }} aria-label={copy.introduction.keywordsAriaLabel}>
                  {copy.introduction.keywords.map((keyword) => (
                    <span key={keyword} style={{ display: "inline-flex", alignItems: "center", minHeight: 34, padding: "0 14px", borderRadius: "var(--hm-radius-pill)", background: "var(--hm-purple-light)", color: "var(--hm-purple)", fontSize: "var(--hm-fs-sm)", fontWeight: 500 }}>{keyword}</span>
                  ))}
                </div>
              </article>
              <article style={{ padding: 28, border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 92%, white)", boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ margin: 0, fontSize: "var(--hm-fs-h4)", lineHeight: 1.4, color: "var(--text-heading)" }}>{copy.introduction.architectureTitle}</h3>
                <p style={{ margin: "var(--hm-space-2xs) 0 0", lineHeight: 1.7, color: "var(--text-secondary)" }}>{copy.introduction.architectureBody}</p>
                <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                  {copy.introduction.architectureCards.map((card) => (
                    <section key={card.title} style={{ padding: 20, borderRadius: "var(--hm-radius-md)", border: "1px solid var(--hm-line)", background: "var(--hm-surface)" }}>
                      <p style={{ margin: "0 0 16px", color: "var(--hm-purple)", fontSize: "var(--hm-fs-sm)", fontWeight: 600 }}>{card.kicker}</p>
                      <h4 style={{ margin: 0, fontSize: "var(--hm-fs-h4)", lineHeight: 1.4, color: "var(--text-heading)" }}>{card.title}</h4>
                      <p style={{ margin: "var(--hm-space-2xs) 0 0", lineHeight: 1.7, color: "var(--text-secondary)" }}>{card.body}</p>
                    </section>
                  ))}
                </div>
              </article>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18, marginTop: 18 }}>
              {designPrinciples.map((principle, index) => {
                const [english, chinese] = principle.split(" / ");
                return (
                  <article key={principle} style={{ padding: 24, border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 92%, white)", boxShadow: "var(--shadow-sm)" }}>
                    <p style={{ margin: "0 0 16px", color: "var(--hm-purple)", fontSize: "var(--hm-fs-sm)", fontWeight: 600 }}>0{index + 1}</p>
                    <h3 style={{ margin: 0, fontSize: "var(--hm-fs-h4)", lineHeight: 1.4, color: "var(--text-heading)" }}>{english}</h3>
                    <p style={{ margin: "var(--hm-space-2xs) 0 0", lineHeight: 1.7, color: "var(--text-secondary)" }}>{chinese}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section style={{ scrollMarginTop: 112 }} id="foundations">
            <div style={{ display: "grid", gridTemplateColumns: "40px auto 1fr", gap: 14, alignItems: "center", marginBottom: "var(--hm-space-md)" }}>
              <span style={{ height: 1, background: "var(--hm-line-strong)" }} />
              <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.2vw, 32px)", lineHeight: 1.3, color: "var(--text-heading)" }}>{locale === "en" ? "Foundations & Tokens" : "基礎與 Tokens"}</h2>
              <span style={{ height: 1, background: "var(--hm-line-strong)" }} />
            </div>
            <Accordion type="multiple" defaultValue={["color", "spacing", "motion"]}>
              {tokenGroupRows.map(group => (
                <AccordionItem key={group.id} value={group.id}>
                  <AccordionHeader>{group.title}</AccordionHeader>
                  <AccordionPanel>
                    <p style={{ color: "var(--hm-muted)", marginBottom: "var(--hm-space-md)" }}>{group.description}</p>
                    <div style={{ maxWidth: "100%", overflowX: "auto", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 96%, white)" }}>
                      <table style={{ width: "100%", minWidth: 720, borderCollapse: "collapse" }}>
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
        <section style={{ scrollMarginTop: 112, padding: 28, border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 92%, white)", boxShadow: "var(--shadow-sm)" }} id="cta">
            <div>
              <p style={{ margin: "0 0 var(--hm-space-xs)", fontSize: "var(--hm-fs-sm)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--hm-purple)" }}>{copy.cta.eyebrow}</p>
              <h2 style={{ margin: 0, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.18, letterSpacing: "-0.01em", color: "var(--text-heading)" }}>{copy.cta.title}</h2>
              <p style={{ margin: "var(--hm-space-sm) 0 0", maxWidth: 760, fontSize: 18, lineHeight: 1.7, color: "var(--text-secondary)" }}>{copy.cta.body}</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--hm-space-xs)", marginTop: "var(--hm-space-md)" }}>
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
