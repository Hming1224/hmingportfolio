import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "../../styles/case-study-design-system-case-study.css";
import { CaseStudyShell, type TocSection } from "../../components/case-study";
import { getNextProject, getProjectBySlug } from "../../data/projects";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import { translateDs } from "./i18n";
import {
  EvolutionASection,
  EvolutionBSection,
  EvolutionCSection,
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
    { id: "cs-sec-why", title: t("為什麼要建 Design System") },
    { id: "cs-sec-starting-point", title: t("起點") },
    { id: "cs-sec-turning-points", title: t("三次轉折") },
    { id: "cs-sec-framework", title: t("決策框架") },
    { id: "cs-sec-evolution-a", title: t("演化實例 A") },
    { id: "cs-sec-evolution-b", title: t("演化實例 B") },
    { id: "cs-sec-evolution-c", title: t("演化實例 C") },
    { id: "cs-sec-governance", title: t("Governance 與 AI 協作") },
    { id: "cs-sec-outcome", title: t("Outcome") },
    { id: "cs-sec-reflection", title: t("Reflection") },
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
      <TurningPointsSection />
      <FrameworkSection />
      <EvolutionASection />
      <EvolutionBSection />
      <EvolutionCSection />
      <GovernanceSection />
      <OutcomeSection />
      <ReflectionSection />
    </CaseStudyShell>
  );
}
