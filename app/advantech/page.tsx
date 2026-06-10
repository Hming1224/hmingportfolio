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
  const project = getProjectBySlug("advantech", locale);
  const nextProject = getNextProject(project.slug, locale);
  const tocSections: TocSection[] = [
    { id: "cs-sec-overview", title: t("專案背景") },
    { id: "cs-sec-background", title: t("產品背景") },
    { id: "cs-sec-role", title: t("我的角色") },
    { id: "cs-sec-process", title: t("設計流程") },
    { id: "cs-sec-analysis", title: t("競品分析") },
    { id: "cs-sec-interview", title: t("使用者訪談") },
    { id: "cs-sec-scenario", title: t("設計情境") },
    { id: "cs-sec-solution", title: t("設計成果") },
    { id: "cs-sec-next", title: t("下一步") },
    { id: "cs-sec-result", title: t("學習反思") },
  ];

  return (
    <CaseStudyShell
      theme="theme-advantech"
      tocSections={tocSections}
      nextNav={{
        nextHref: nextProject.href ?? "#",
        homeLabel: t("返回首頁"),
        nextLabel: `${t("下一個專案")}${t("：")}${nextProject.title}`,
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
