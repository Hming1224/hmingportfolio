import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "../../styles/case-study-crypto-arsenal.css";
import { CaseStudyShell, type TocSection } from "../../components/case-study";
import { getNextProject, getProjectBySlug } from "../../data/projects";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import { translateCryptoArsenal } from "./i18n";
import {
  HeroSection,
  BackgroundSection,
  RoleSection,
  ProblemSection,
  CurrentSection,
  DecisionSection,
  ResearchSection,
  WireframeSection,
  IterationSection,
  FinalSection,
  ImpactSection,
  ReflectSection,
} from "./sections";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const project = getProjectBySlug("crypto-arsenal", locale);
  const description = project.seoDescription ?? project.description;

  return createLocalizedMetadata(locale, "/crypto-arsenal", {
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

export default async function CryptoArsenalPage() {
  const locale = (await getLocale()) as Locale;
  const t = (text: string) => translateCryptoArsenal(locale, text);
  const project = getProjectBySlug("crypto-arsenal", locale);
  const nextProject = getNextProject(project.slug, locale);
  const tocSections: TocSection[] = [
    { id: "cs-sec-background", title: t("專案背景") },
    { id: "cs-sec-role", title: t("工作模式") },
    { id: "cs-sec-problem", title: t("問題定義") },
    { id: "cs-sec-current", title: t("介面現況") },
    { id: "cs-sec-decision", title: t("關鍵決策") },
    { id: "cs-sec-research", title: t("競品參考") },
    { id: "cs-sec-wireframe", title: t("Wireframe") },
    { id: "cs-sec-iteration", title: t("設計迭代") },
    { id: "cs-sec-final", title: t("最終介面") },
    { id: "cs-sec-impact", title: t("設計成效") },
    { id: "cs-sec-reflect", title: t("學習反思") },
  ];

  return (
    <CaseStudyShell
      theme="theme-crypto-arsenal"
      tocSections={tocSections}
      nextNav={{
        nextHref: nextProject.href ?? "#",
        homeLabel: t("返回首頁"),
        nextLabel: `${t("下一個專案")}${t("：")}${nextProject.title}`,
      }}
      hero={<HeroSection />}
    >
      <BackgroundSection />
      <RoleSection />
      <ProblemSection />
      <CurrentSection />
      <DecisionSection />
      <ResearchSection />
      <WireframeSection />
      <IterationSection />
      <FinalSection />
      <ImpactSection />
      <ReflectSection />
    </CaseStudyShell>
  );
}
