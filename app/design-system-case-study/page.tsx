import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "../../styles/case-study-design-system-case-study.css";
import { CaseStudyShell, type TocSection } from "../../components/case-study";
import { getNextProject, getProjectBySlug } from "../../data/projects";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import ActDivider from "./components/ActDivider";
import { translateDs } from "./i18n";
import {
  EvolutionCasesSection,
  FrameworkSection,
  GovernanceSection,
  HeroSection,
  OutcomeSection,
  ReflectionSection,
  StartingPointSection,
  TurningPointsSection,
  WhySection,
} from "./sections";

const SLUG = "design-system-case-study";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const project = getProjectBySlug(SLUG, locale);
  const description = project.seoDescription ?? project.description;

  return createLocalizedMetadata(locale, `/${SLUG}`, {
    en: { title: project.title, description },
    "zh-TW": { title: project.title, description },
  });
}

export default async function DesignSystemCaseStudyPage() {
  const locale = (await getLocale()) as Locale;
  const t = (text: string) => translateDs(locale, text);
  const project = getProjectBySlug(SLUG, locale);
  const nextProject = getNextProject(project.slug, locale);
  const nextProjectLabel = nextProject.navigationTitle ?? nextProject.title;
  const tocSections: TocSection[] = [
    { id: "cs-sec-overview", title: t("專案總覽") },
    { id: "cs-sec-motivation", title: t("起心動念") },
    { id: "cs-sec-turning-points", title: t("三次轉折") },
    { id: "cs-sec-framework", title: t("判斷框架") },
    { id: "cs-sec-evolution", title: t("三個演化案例") },
    { id: "cs-sec-governance", title: t("治理與驗證") },
    { id: "cs-sec-outcome", title: t("最終成果") },
    { id: "cs-sec-reflection", title: t("學習反思") },
  ];

  return (
    <CaseStudyShell
      theme="theme-design-system-case-study"
      tocSections={tocSections}
      nextNav={{
        homeLabel: t("返回首頁"),
        nextHref: nextProject.status === "published" ? nextProject.href : undefined,
        nextLabel: `${t("下一個專案")}${t("：")}${nextProjectLabel}`,
      }}
      hero={<HeroSection />}
    >
      <WhySection />
      <StartingPointSection />
      <ActDivider
        actLabel="ACT 2"
        kicker={t("轉折與框架")}
        title={t("三次真實問題，換來一套判斷框架")}
        lead={t("第一版規劃做出來後，文件脫節、跑版和流程混雜，才真正改變了後續做法。接下來三次實作問題，各補上了一條新的判斷規則。")}
      />
      <TurningPointsSection />
      <FrameworkSection />
      <ActDivider
        actLabel="ACT 3"
        kicker={t("三個演化案例")}
        title={t("把判斷框架放回真實案例")}
        lead={t("接下來三個案例分別從重複版型、過早共用與語意混淆出發，看看同一套框架如何導向不同決定。")}
      />
      <EvolutionCasesSection />
      <ActDivider
        actLabel="ACT 4"
        kicker={t("治理與成果")}
        title={t("把品質固定在流程裡")}
        lead={t("自動檢查守住正確性，人工驗收守住設計意圖；四個案例頁如今沿用同一套依據。")}
      />
      <GovernanceSection />
      <OutcomeSection />
      <ReflectionSection />
    </CaseStudyShell>
  );
}
