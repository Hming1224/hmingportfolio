import type { Metadata } from "next";
import "../../styles/case-study-advantech.css";
import {
  CaseStudyShell,
  type TocSection,
} from "../../components/case-study";
import { getNextProject, getProjectBySlug } from "../../data/projects";
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

const project = getProjectBySlug("advantech");
const nextProject = getNextProject(project.slug);

export const metadata: Metadata = {
  title: `${project.title} — Brian Huang`,
  description: project.seoDescription,
};

const tocSections: TocSection[] = [
  { id: 'cs-sec-overview',    title: '專案背景' },
  { id: 'cs-sec-background',  title: '產品背景' },
  { id: 'cs-sec-role',        title: '我的角色' },
  { id: 'cs-sec-process',     title: '設計流程' },
  { id: 'cs-sec-analysis',    title: '競品分析' },
  { id: 'cs-sec-interview',   title: '使用者訪談' },
  { id: 'cs-sec-scenario',    title: '設計情境' },
  { id: 'cs-sec-solution',    title: '設計成果' },
  { id: 'cs-sec-next',        title: '下一步' },
  { id: 'cs-sec-result',      title: '學習反思' },
];

export default function AdventechPage() {
  return (
    <CaseStudyShell
      theme="theme-advantech"
      tocSections={tocSections}
      nextNav={{
        nextHref: nextProject.href ?? "#",
        nextLabel: `下一個專案：${nextProject.title}`,
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
