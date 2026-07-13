import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "../../styles/case-study-laushu.css";
import { CaseStudyShell, type TocSection } from "../../components/case-study";
import { getNextProject, getProjectBySlug } from "../../data/projects";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import { translateLaushu } from "./i18n";
import {
  ConvergeSection,
  DemoSection,
  HeroSection,
  IterateSection,
  OverviewSection,
  ProblemSection,
  PrototypeSection,
  ReflectionSection,
  UnderstandSection,
} from "./sections";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const project = getProjectBySlug("laushu", locale);
  const description = project.seoDescription ?? project.description;
  return createLocalizedMetadata(locale, "/laushu", {
    en: { title: project.title, description },
    "zh-TW": { title: project.title, description },
  });
}

export default async function LaushuPage() {
  const locale = (await getLocale()) as Locale;
  const t = (text: string) => translateLaushu(locale, text);
  const project = getProjectBySlug("laushu", locale);
  const nextProject = getNextProject(project.slug, locale);
  const nextProjectLabel = nextProject.navigationTitle ?? nextProject.title;

  const tocSections: TocSection[] = [
    { id: "cs-sec-overview", title: t("專案總覽") },
    { id: "cs-sec-problem", title: t("問題定義") },
    { id: "cs-sec-understand", title: t("研究設計") },
    { id: "cs-sec-converge", title: t("收斂與洞察") },
    { id: "cs-sec-iterate", title: t("測試與迭代") },
    { id: "cs-sec-prototype", title: t("原型設計") },
    { id: "cs-sec-demo", title: t("最終成果") },
    { id: "cs-sec-reflection", title: t("學習反思") },
  ];

  return (
    <CaseStudyShell
      theme="theme-laushu"
      tocSections={tocSections}
      nextNav={{
        nextHref: nextProject.status === "published" ? nextProject.href : undefined,
        homeLabel: t("返回首頁"),
        nextLabel: `${t("下一個專案")}${t("：")}${nextProjectLabel}`,
      }}
      hero={<HeroSection />}
    >
      <OverviewSection />
      <ProblemSection />
      <UnderstandSection />
      <ConvergeSection />
      <IterateSection />
      <PrototypeSection />
      <DemoSection />
      <ReflectionSection />
    </CaseStudyShell>
  );
}
