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
        lead={t("文件脫節、跑版、流程混雜——三次轉折不是失誤紀錄，而是這套系統長出判斷規則的過程。")}
      />
      <TurningPointsSection />
      <FrameworkSection />
      <ActDivider
        actLabel="ACT 3"
        kicker={t("三個演化案例")}
        title={t("同一套框架，三種不同的決定")}
        lead={t("共用、保留單頁、先定義用途——三個案例用同一個判斷順序，走到三個不同結論。")}
      />
      <EvolutionCasesSection />
      <GovernanceSection />
      <OutcomeSection />
      <ReflectionSection />
    </CaseStudyShell>
  );
}
