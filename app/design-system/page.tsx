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
            <section key="getting-started" style={{ scrollMarginTop: 112 }} id="getting-started">
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

          <section key="foundations" style={{ scrollMarginTop: 112 }} id="foundations">
            <div style={{ display: "grid", gridTemplateColumns: "40px auto 1fr", gap: 14, alignItems: "center", marginBottom: "var(--hm-space-md)" }}>
              <span style={{ height: 1, background: "var(--hm-line-strong)" }} />
              <h2 style={{ margin: 0, fontSize: "clamp(26px, 3.2vw, 32px)", lineHeight: 1.3, color: "var(--text-heading)" }}>{locale === "en" ? "Foundations & Tokens" : "基礎與 Tokens"}</h2>
              <span style={{ height: 1, background: "var(--hm-line-strong)" }} />
            </div>
            <Accordion type="multiple" defaultValue={["color", "structure", "surface"]}>
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
        <section key="cta" style={{ scrollMarginTop: 112, padding: 28, border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 92%, white)", boxShadow: "var(--shadow-sm)" }} id="cta">
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
