import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "../../styles/case-study-advantech.css";
import {
  CaseStudyShell,
  type TocSection,
} from "../../components/case-study";
import { getNextProject, getProjectBySlug } from "../../data/projects";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import { translateAdvantech } from "./i18n";
import {
  HeroSection,
  OverviewSection,
  ProductBackgroundSection,
  RoleSection,
  ProcessSection,
  AnalysisSection,
  InterviewSection,
  ScenarioSection,
  SolutionSection,
  NextStepSection,
  ResultSection,
} from "./sections";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const project = getProjectBySlug("advantech", locale);
  const description = project.seoDescription ?? project.description;

  return createLocalizedMetadata(locale, "/advantech", {
    en: {
      title: project.title,
      description,
    },
    "zh-TW": {
      title: project.title,
      description,
    },
  });
}

export default async function AdventechPage() {
  const locale = (await getLocale()) as Locale;
  const t = (text: string) => translateAdvantech(locale, text);
  const tocLabel = (zh: string, en: string) => (locale === "en" ? en : zh);
  const project = getProjectBySlug("advantech", locale);
  const nextProject = getNextProject(project.slug, locale);
  const nextProjectLabel = nextProject.navigationTitle ?? nextProject.title;
  const tocSections: TocSection[] = [
    { id: "cs-sec-overview", title: tocLabel("專案總覽", "Overview") },
    { id: "cs-sec-background", title: tocLabel("產品脈絡", "Product Context") },
    { id: "cs-sec-role", title: tocLabel("我的角色", "My Role") },
    { id: "cs-sec-process", title: tocLabel("設計流程", "Design Process") },
    { id: "cs-sec-analysis", title: tocLabel("分析洞察", "Analysis") },
    { id: "cs-sec-interview", title: tocLabel("使用者研究", "User Research") },
    { id: "cs-sec-scenario", title: tocLabel("設計策略", "Design Strategy") },
    { id: "cs-sec-solution", title: tocLabel("設計方案", "Solution") },
    { id: "cs-sec-next", title: tocLabel("下一步", "Next Steps") },
    { id: "cs-sec-result", title: tocLabel("Reflections", "Reflections") },
  ];

  return (
    <CaseStudyShell
      theme="theme-advantech"
      tocSections={tocSections}
      nextNav={{
        nextHref: nextProject.status === "published" ? nextProject.href : undefined,
        homeLabel: t("返回首頁"),
        nextLabel: `${t("下一個專案")}${t("：")}${nextProjectLabel}`,
      }}
      hero={<HeroSection />}
    >
      {/* ── 02 Overview ── */}
      <OverviewSection />

      {/* ── 02.5 Product Background ── */}
      <ProductBackgroundSection />

      {/* ── 02.6 My Role ── */}
      <RoleSection />

      {/* ── 04 Process ── */}
      <ProcessSection />

      {/* ── 03 Competitive Analysis ── */}
      <AnalysisSection />

      {/* ── 04 User Interview ── */}
      <InterviewSection />

      {/* ── 05 Design Scenario ── */}
      <ScenarioSection />

      {/* ── 06 Solution ── */}
      <SolutionSection />

      {/* ── 07 Next Step ── */}
      <NextStepSection />

      {/* ── 08 Result ── */}
      <ResultSection />
    </CaseStudyShell>
  );
}
