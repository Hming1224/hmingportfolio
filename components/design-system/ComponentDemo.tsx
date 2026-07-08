"use client";

import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import AdvantechProposalTabs from "@/app/advantech/components/ProposalTabs";
import { painCards } from "@/app/crypto-arsenal/data";
import { proposalScenario1Tabs } from "@/app/advantech/data";
import { getContactData } from "@/data/contact";
import { getProjects } from "@/data/projects";
import type { DesignSystemLocale } from "@/lib/design-system-docs";
import CaseTOC, { type TocSection } from "../CaseTOC";
import ProjectCard from "../ProjectCard";
import WorkCategoryTabs from "../WorkCategoryTabs";
import Button from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Skeleton } from "../ui/Skeleton";
import { Toast } from "../ui/Toast";
import CaseHero from "../case-study/CaseHero";
import { CaseCard, CaseGrid, CaseMedia, CaseSection, CaseSectionHeader, type CaseInfoItem } from "../case-study";
import { BeforeAfterPanel } from "../case-study/BeforeAfterPanel";
import { BeforeAfterNarrativeFrame } from "../case-study/BeforeAfterNarrativeFrame";
import FlowScrollHint from "../case-study/FlowScrollHint";
import ZoomableImage from "../case-study/ZoomableImage";
import { registerDesignSystemReturnTarget } from "./DesignSystemReturnBar";
import styles from "./DesignSystemExplorer.module.css";

const caseExamples = {
  en: {
    sectionKicker: "Problem Definition",
    sectionTitle: "Users could see strategy PnL, but not the actual position state",
    sectionDescription: "The shared CaseSectionHeader keeps the kicker, title, and optional description consistent before route-specific diagrams or media appear.",
    sectionBody: "Major case-study sections carry headings, anchors, and body content while preserving the reading rhythm used across Advantech.",
    cardTitle: "Supporting insight",
    cardBody: "Strategy traders needed to understand side, size, entry price, mark price, PnL, and TP / SL distance without leaving Crypto Arsenal.",
    cardMeta: "Crypto Arsenal / ProblemSection",
    gridTitle: "Three repeated pain cards",
    gridItems: ["Position state is unclear", "Manual close lacks confidence", "TP / SL setup needs stronger context"],
    mediaCaption: "Crypto Arsenal current-state product UI",
    beforeTitle: "AI Chatbot component",
    flowTitle: "Overflow affordance for wide analysis boards",
    flowBody: "FlowScrollHint appears before wide content such as Advantech AI feature matrices and process boards. It signals horizontal overflow; it is not a standalone visual component.",
    zoomCaption: "ZoomableImage is used through case media and lightbox wrappers for real product screenshots.",
    localExceptions: [
      "Advantech Board 2 / 3: route-local multi-comparison boards in SolutionSection.",
      "CaseTOC: protected floating navigation in CaseStudyShell.",
      "Laushu task flow: route-local diagram geometry and connector endpoints.",
      "Crypto matrix / FlowMatrixBoard: visual storytelling matrix, not a shared ARIA grid.",
    ],
  },
  "zh-TW": {
    sectionKicker: "問題定義",
    sectionTitle: "用戶痛點：整體策略賺賠看得到，倉位狀態卻看不見",
    sectionDescription: "CaseSectionHeader 統一 kicker、title 與 optional description，讓 頁面限定 diagram 或 media 出現前先建立清楚段落層級。",
    sectionBody: "主要案例 section 會承載標題、anchor 與內文內容，同時維持 Advantech 案例頁使用的閱讀節奏。",
    cardTitle: "Supporting insight",
    cardBody: "交易者需要在 Crypto Arsenal 裡直接理解倉位方向、數量、入場價、標記價、浮動盈虧，以及距離止盈 / 止損還有多遠。",
    cardMeta: "Crypto Arsenal / ProblemSection",
    gridTitle: "三張重複痛點卡",
    gridItems: ["倉位狀態不清楚", "手動平倉缺乏信心", "止盈止損設定需要更完整語境"],
    mediaCaption: "Crypto Arsenal 介面現況產品畫面",
    beforeTitle: "AI Chatbot 元件",
    flowTitle: "寬版分析 board 的 overflow 提示",
    flowBody: "FlowScrollHint 出現在 Advantech AI 功能矩陣與流程 board 這類寬版內容前，用來提示可以橫向滑動；它不是獨立視覺元件。",
    zoomCaption: "ZoomableImage 透過案例 media 與 lightbox wrapper 使用於真實產品截圖。",
    localExceptions: [
      "Advantech Board 2 / 3：SolutionSection 內的 頁面限定多比較 board。",
      "CaseTOC：CaseStudyShell 裡受保護的浮動導覽。",
      "Laushu task flow：頁面限定 diagram geometry 與 connector endpoints。",
      "Crypto matrix / FlowMatrixBoard：視覺敘事矩陣，不是 shared ARIA grid。",
    ],
  },
} satisfies Record<DesignSystemLocale, Record<string, string | string[] | string[][]>>;

const cryptoPainCardDemo = {
  en: {
    quote:
      "I can see how much the strategy earned, but the interface does not show whether the current position is long or short, or whether it is gaining or losing.",
    name: "Strategy developer A",
    role: "Trader following automated strategies",
    tone: painCards[0].tone,
  },
  "zh-TW": {
    ...painCards[0],
  },
} satisfies Record<DesignSystemLocale, {
  quote: string;
  name: string;
  role: string;
  tone: "orange" | "blue";
}>;

const cryptoPainAvatarIcons = {
  orange: {
    src: "/projects/crypto-arsenal/problem/icons/developer.svg",
    size: 36,
  },
  blue: {
    src: "/projects/crypto-arsenal/problem/icons/trader.svg",
    size: 32,
  },
} as const;

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function FakeImagePlaceholder({ className }: { className?: string }) {
  return (
    <div className={classNames(styles.fakeImagePlaceholder, className)} aria-hidden="true">
      <svg className={styles.fakeImageIcon} viewBox="0 0 71 71" fill="none" focusable="false">
        <path
          className={styles.fakeImageIconBase}
          d="M 0 0 L 10.44109120965004 0 L 60.53152185678482 0 L 71 0 L 71 10.644176229834557 L 71 43.78931784629822 L 71 59.89065110683441 L 71 71 L 59.980786979198456 71 L 10.950571119785309 71 L 0 71 L 0 59.95735055208206 L 0 57.754618406295776 L 0 10.541073724627495 L 0 0 Z"
        />
        <path
          className={styles.fakeImageIconBack}
          d="M 41.80194388769793 0 C 43.29682664574073 1.1746894529978236 44.94355051349451 3.0824684555983355 46.35086208188811 4.474040746285784 L 56.71305518789667 14.846905128580254 L 59.648457070178736 17.831609126149264 C 60.05220022636033 18.23833376120072 60.915431831459884 19.134707235211238 61.35155487060547 19.445540239594514 L 61.35155487060547 35.546874034948345 L 61.35155487060547 46.65622329711914 L 50.332346210199105 46.65622329711914 L 1.302128806430777 46.65622329711914 C 1.1162391605571804 46.518244776249844 0.29301365682114766 46.41840102309877 0 46.3615455529562 L 0.11579088731718001 46.30746148858347 C 0.3415487000946761 45.87133842986728 1.2801493205829197 44.9091640661386 1.644925694362062 44.50001268377386 L 4.58879143610356 41.22694074955207 L 13.3945252227849 31.454872878121165 C 16.294570125662016 28.230335625669387 19.23039202696976 25.036514778556686 22.126623432169186 21.808302888456577 C 22.50235488341662 21.38944448377676 22.964962991908315 20.912273655495458 23.263315525641058 20.441482626877743 C 24.05915338529929 19.937479676746477 26.646355263367656 16.68375414240003 27.47318632164048 15.852762927665152 C 28.127856262861684 15.062818589822665 29.028462750484348 14.337148935847168 29.659350436854787 13.539022954991959 C 31.276819106634846 11.49264203187684 33.159218612045265 9.701762290685025 34.88616875865891 7.768953670822734 L 38.61138203429239 3.611294121292656 C 39.66112813960873 2.418577308076304 40.7192632521274 1.1552754744915696 41.80194388769793 0 Z"
          transform="translate(9.648427963256836 24.343820571899414)"
        />
        <path
          className={styles.fakeImageIconFront}
          d="M 0 24.506232566968002 C 0.30208420961245047 24.35147475301826 3.2546149574303738 20.89216402277708 3.7431837171636007 20.354117153994412 L 16.97537927847001 5.815619229955173 C 18.65989590210146 3.972046014779992 20.52635006563251 1.7769413512914578 22.237144989736542 0 C 22.601574683775983 0.49547458268765027 23.413844780453754 1.3172447909033198 23.859605520204475 1.7908785502076117 L 26.84257647310243 4.942821836222285 C 28.89547491729705 7.111303166068087 30.89040782524377 9.406944326464647 32.91175842285156 11.536874893570694 C 32.61340588266872 12.007665887224555 32.15079776417588 12.484836680068204 31.77506630480548 12.903695053641005 C 28.87883483699226 16.131906703994137 25.943012872214815 19.325727313913955 23.04296790664146 22.55026432689166 L 14.23723392958846 32.32233147258838 L 11.29336812420336 35.59540316373161 C 10.928591742538096 36.00455451571024 9.989991101758191 36.9667288079819 9.764233284100024 37.4028518343089 L 9.648442394279554 37.456935894665015 C 9.941456057435381 37.513791360585145 10.764681578968773 37.6136351063212 10.95057122886113 37.75161361694336 L 0 37.75161361694336 L 0 26.70896462233114 L 0 24.506232566968002 Z"
          transform="translate(0 33.24834442138672)"
        />
        <path
          className={styles.fakeImageIconSun}
          d="M 6.160112212890684 0.036917607842692185 C 9.929629812039547 -0.35268102840194215 13.301921791875753 2.38567321905466 13.694432512494954 6.154844183075747 C 14.086943233114155 9.924084444948095 11.351154046911448 13.298456755861942 7.582260657395511 13.693879618621752 C 3.809276314323436 14.089718499922785 0.4303985674438772 11.350325210369915 0.037471828296543434 7.5770635571595655 C -0.35545491085079034 3.8037323416023407 2.3865039246812882 0.4269322626285499 6.160112212890684 0.036917607842692185 Z"
          transform="translate(12.90068244934082 10.328210830688477)"
        />
      </svg>
    </div>
  );
}

function BeforeAfterDemoSlot() {
  return <FakeImagePlaceholder className={styles.beforeAfterPanelImagePlaceholder} />;
}

function BeforeAfterNarrativeConnector() {
  return (
    <div className="cs-before-after-narrative-connector" aria-hidden="true">
      <svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" focusable="false">
        <path
          d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function BeforeAfterNarrativeComparisonDemo() {
  return (
    <div
      className={classNames(
        "cs-before-after-narrative cs-before-after-narrative-comparison",
        styles.beforeAfterComparisonDemo,
      )}
    >
      <BeforeAfterPanel
        title="Before"
        tone="cyan"
        className="cs-before-after-narrative-panel"
        headerClassName="cs-before-after-narrative-panel-head"
        bodyClassName="cs-before-after-narrative-panel-body"
      >
        <BeforeAfterDemoSlot />
      </BeforeAfterPanel>
      <BeforeAfterNarrativeConnector />
      <BeforeAfterPanel
        title="After"
        tone="cyan"
        className="cs-before-after-narrative-panel"
        headerClassName="cs-before-after-narrative-panel-head"
        bodyClassName="cs-before-after-narrative-panel-body"
      >
        <BeforeAfterDemoSlot />
      </BeforeAfterPanel>
    </div>
  );
}

const advantechTocSections = {
  en: [
    { id: "cs-sec-ds-toc-overview", title: "Overview" },
    { id: "cs-sec-ds-toc-background", title: "Product Context" },
    { id: "cs-sec-ds-toc-role", title: "My Role" },
    { id: "cs-sec-ds-toc-process", title: "Design Process" },
    { id: "cs-sec-ds-toc-analysis", title: "Analysis" },
    { id: "cs-sec-ds-toc-interview", title: "User Research" },
    { id: "cs-sec-ds-toc-scenario", title: "Design Strategy" },
    { id: "cs-sec-ds-toc-solution", title: "Solution" },
    { id: "cs-sec-ds-toc-next", title: "Next Steps" },
    { id: "cs-sec-ds-toc-result", title: "Reflections" },
  ],
  "zh-TW": [
    { id: "cs-sec-ds-toc-overview", title: "專案總覽" },
    { id: "cs-sec-ds-toc-background", title: "產品脈絡" },
    { id: "cs-sec-ds-toc-role", title: "我的角色" },
    { id: "cs-sec-ds-toc-process", title: "設計流程" },
    { id: "cs-sec-ds-toc-analysis", title: "分析洞察" },
    { id: "cs-sec-ds-toc-interview", title: "使用者研究" },
    { id: "cs-sec-ds-toc-scenario", title: "設計策略" },
    { id: "cs-sec-ds-toc-solution", title: "設計方案" },
    { id: "cs-sec-ds-toc-next", title: "下一步" },
    { id: "cs-sec-ds-toc-result", title: "Reflections" },
  ],
} satisfies Record<DesignSystemLocale, TocSection[]>;

type BoundaryClassification =
  | "Shared pattern"
  | "Shared case-study pattern"
  | "Route-local pattern"
  | "Internal anatomy"
  | "Internal documentation shell anatomy"
  | "Extraction candidate";

type BoundaryReferenceItem = {
  pattern: string;
  classification: BoundaryClassification;
  currentUsage: string;
  boundary: string;
  extractionCondition: string;
  source: string;
  status: string;
  nextStep: string;
};

const boundaryReferenceGroups = {
  en: [
    {
      classification: "Shared pattern",
      description: "Repeated content or layout conventions shared across public pages before they become standalone component APIs.",
    },
    {
      classification: "Shared case-study pattern",
      description: "Reusable across case-study routes, but tied to the case-study reading flow or template.",
    },
    {
      classification: "Route-local pattern",
      description: "Tied to a specific story, dataset, or route composition.",
    },
    {
      classification: "Internal anatomy",
      description: "Implementation helpers or internal parts whose meaning depends on a parent component or route section.",
    },
    {
      classification: "Internal documentation shell anatomy",
      description: "Parts that only exist to support the design-system documentation shell itself (its sidebar navigation, docs layout), not a general-purpose portfolio component.",
    },
    {
      classification: "Extraction candidate",
      description: "Can be promoted later if the same structure repeats across independent routes.",
    },
  ],
  "zh-TW": [
    {
      classification: "Shared pattern",
      description: "跨公開頁面重複使用的內容或版面慣例；在抽出獨立 元件 API 前，先以 模式 管理。",
    },
    {
      classification: "Shared case-study pattern",
      description: "可在案例頁之間重複使用，但仍綁定 case-study reading flow 或案例頁模板。",
    },
    {
      classification: "Route-local pattern",
      description: "與特定故事、資料結構或 頁面組成綁定。",
    },
    {
      classification: "Internal anatomy",
      description: "依附在 parent 元件 或 頁面 section 下才有完整意義的內部組成。",
    },
    {
      classification: "Internal documentation shell anatomy",
      description: "只為了支援 design-system 文件站骨架 本身（如 sidebar navigation、docs 版面）而存在的部分，不是通用 作品集元件。",
    },
    {
      classification: "Extraction candidate",
      description: "當同一結構跨獨立頁面 重複出現時，可重新評估是否提升為 可重用元件。",
    },
  ],
} satisfies Record<DesignSystemLocale, Array<{ classification: BoundaryClassification; description: string }>>;

const boundaryReferenceItems = {
  en: [
    {
      pattern: "ProjectCard hover overlay",
      classification: "Route-local pattern",
      currentUsage: "Homepage / Selected Works.",
      boundary: "Bound to project metadata, cover media, logo, tags, CTA, and the protected hover overlay anatomy for portfolio exploration.",
      extractionCondition: "Revisit only if another product surface needs the same project-story card anatomy, overlay behavior, and CTA model.",
      source: "components/Works.tsx",
      status: "Product-specific portfolio pattern",
      nextStep: "Keep documented as a route-owned project card pattern.",
    },
    {
      pattern: "ProjectTag",
      classification: "Internal anatomy",
      currentUsage: "Used inside ProjectCard to display Selected Work project metadata and tone tags.",
      boundary: "Belongs to ProjectCard anatomy. It communicates metadata within the Selected Work card, but does not currently expose a standalone tag component contract.",
      extractionCondition: "Promote only if tags are reused across independent parent components with a stable tone, status, or metadata API.",
      source: "components/ProjectCard.tsx / styles/home.css",
      status: "ProjectCard internal anatomy",
      nextStep: "Keep documented through ProjectCard anatomy and this boundary reference.",
    },
    {
      pattern: "SectionHeading",
      classification: "Shared pattern",
      currentUsage: "Used as a shared heading convention across Home and About sections to introduce major content blocks.",
      boundary: "SectionHeading is currently a content hierarchy convention, not a standalone React component. It should not be documented as a generic heading component until the structure, props, and usage contract are extracted.",
      extractionCondition: "Promote only if the same heading structure is extracted into a shared component with stable fields, semantic heading rules, spacing behavior, and responsive requirements.",
      source: "components/Works.tsx / app/about-me/page.tsx / styles/home.css",
      status: "Shared content hierarchy pattern",
      nextStep: "Keep referenced through Component Boundaries and Typography until a stable component API exists.",
    },
    {
      pattern: "Accordion",
      classification: "Internal documentation shell anatomy",
      currentUsage: "Used inside the Design System documentation sidebar to expand and collapse navigation groups.",
      boundary: "Accordion currently belongs to the documentation shell. It is not documented as a general-purpose portfolio component because its live usage, styling, and behavior are tied to the design-system navigation sidebar.",
      extractionCondition: "Promote only if the same disclosure pattern is reused across independent product surfaces with a stable item, trigger, panel, keyboard, and accessibility contract.",
      source: "components/ui/Accordion.tsx / components/design-system/DesignSystemExplorer.tsx / components/design-system/DesignSystemDocsNav.tsx",
      status: "Documentation shell navigation anatomy",
      nextStep: "Keep documented through Component Boundaries; revisit only if the same disclosure contract is adopted outside the documentation shell.",
    },
    {
      pattern: "ScrollProgress",
      classification: "Shared case-study pattern",
      currentUsage: "Shows reading progress on case-study routes as users move through long-form content.",
      boundary: "Belongs to the case-study page shell because it depends on document scroll position, route height, viewport behavior, and fixed navigation offsets. It is not a standalone progress indicator for arbitrary tasks.",
      extractionCondition: "Promote only if non-case-study routes need the same reading-progress affordance with a stable API and shared scroll model.",
      source: "components/ScrollProgress.tsx / components/case-study/CaseStudyShell.tsx",
      status: "Case-study shell behavior",
      nextStep: "Keep documented as a shared case-study pattern.",
    },
    {
      pattern: "CaseNextNav",
      classification: "Shared case-study pattern",
      currentUsage: "Guides readers from the end of one case-study route to the next project.",
      boundary: "Belongs to the case-study reading flow. It depends on case order, locale-aware routes, project metadata, and the ending position of the case template. It is not a generic pagination, breadcrumb, or global navigation component.",
      extractionCondition: "Promote only if multiple independent content sections need the same next-content navigation pattern outside case-study routes.",
      source: "components/case-study/CaseStudyShell.tsx",
      status: "Case-study ending navigation pattern",
      nextStep: "Keep documented as a shared case-study pattern.",
    },
    {
      pattern: "CaseInfoCard",
      classification: "Shared case-study pattern",
      currentUsage: "Displays structured case metadata such as role, timeline, scope, tools, or project context in case-study overview areas.",
      boundary: "Belongs to the case-study template anatomy. Its meaning comes from the case overview context, not from a general-purpose Card contract.",
      extractionCondition: "Promote only if the same metadata card contract is reused across independent routes with stable fields, variants, and accessibility requirements.",
      source: "components/case-study/CaseInfoGrid.tsx / components/case-study/CaseHero.tsx",
      status: "Case-study hero metadata anatomy",
      nextStep: "Keep documented as a shared case-study pattern.",
    },
    {
      pattern: "SocialLink",
      classification: "Internal anatomy",
      currentUsage: "Used inside Footer social link group for LinkedIn and GitHub profile links.",
      boundary: "Belongs to Footer anatomy. Its meaning depends on the footer closure surface, external-link behavior, icon swap, and accessible label.",
      extractionCondition: "Promote only if the same social link contract is reused across independent surfaces with stable icon, label, external-link, and accessibility behavior.",
      source: "components/Footer.tsx / styles/tokens.css",
      status: "Footer internal anatomy",
      nextStep: "Keep referenced under Footer anatomy and this boundary reference.",
    },
    {
      pattern: "HeroBadge",
      classification: "Internal anatomy",
      currentUsage: "Used inside the homepage Hero as a small identity/status cue. A similar class is reused in the About education area for visual consistency.",
      boundary: "HeroBadge is currently Hero anatomy, not a standalone Badge component. It does not expose a stable label, tone, icon, or status API.",
      extractionCondition: "Promote only if badge-like UI appears across independent surfaces with a shared contract for label, tone, icon, semantics, and accessibility.",
      source: "components/Hero.tsx / app/about-me/page.tsx / styles/home.css",
      status: "Hero internal anatomy",
      nextStep: "Keep as Hero anatomy; a generic Badge can be considered later if the contract repeats.",
    },
    {
      pattern: "ContactMethod",
      classification: "Internal anatomy",
      currentUsage: "Used inside the Contact route information card to present email, phone, LinkedIn, and GitHub actions.",
      boundary: "Belongs to Contact section anatomy. It presents contact options within that route context, but does not currently expose a standalone contact-method component contract.",
      extractionCondition: "Promote only if contact method cards are reused across independent surfaces with stable icon, label, action, and accessibility behavior.",
      source: "components/Contact.tsx / styles/contact.css",
      status: "Contact route internal anatomy",
      nextStep: "Keep documented through Contact section boundaries rather than a standalone Data Entry catalog item.",
    },
    {
      pattern: "Advantech Board 2 / Board 3",
      classification: "Route-local pattern",
      currentUsage: "Advantech SolutionSection scenario boards for overage warning and abnormal energy analysis.",
      boundary: "Multi-comparison layout, copy density, comparison axes, and AI proposal evaluation are tied to Advantech business logic.",
      extractionCondition: "Componentize only when a second case repeats the same structure and interaction needs.",
      source: "app/advantech/sections/SolutionSection.tsx",
      status: "Project-specific visual board",
      nextStep: "Keep as route composition until another case repeats the same board structure.",
    },
    {
      pattern: "YearRail",
      classification: "Route-local pattern",
      currentUsage: "About route experience timeline.",
      boundary: "Bound to `.experience-card[data-year]`, the About page chronology, section anchors, and scroll-reading behavior. It is not a general-purpose timeline or pagination component.",
      extractionCondition: "Promote only if another independent route needs the same year-anchor rail with shared semantics, keyboard expectations, and route-agnostic section mapping.",
      source: "components/YearRail.tsx / app/about-me/page.tsx",
      status: "About timeline navigation pattern",
      nextStep: "Keep documented as a route-local boundary instead of a visible general-purpose Navigation component.",
    },
    {
      pattern: "ExperienceCard",
      classification: "Route-local pattern",
      currentUsage: "Used inside the About route experience timeline and paired with YearRail anchors.",
      boundary: "Belongs to the About timeline reading flow and YearRail anchor model. It is not a general-purpose card component.",
      extractionCondition: "Promote only if the same experience card contract is reused across independent routes with stable fields, timeline behavior, and accessibility requirements.",
      source: "app/about-me/page.tsx / components/YearRail.tsx",
      status: "About timeline content pattern",
      nextStep: "Keep documented with the About timeline / YearRail boundary.",
    },
    {
      pattern: "SkillCategoryCard",
      classification: "Route-local pattern",
      currentUsage: "Used in the About skills section to group capabilities, tools, and learning focus areas.",
      boundary: "SkillCategoryCard belongs to the About route content model. Its fields, tone classes, and meaning depend on the About skills storytelling structure.",
      extractionCondition: "Promote only if the same skill/category card contract is reused across independent routes with stable fields, variants, and accessibility requirements.",
      source: "app/about-me/page.tsx / data/about.ts / styles/about.css",
      status: "About skills content pattern",
      nextStep: "Keep documented as an About route pattern, not a generic Data Display card.",
    },
    {
      pattern: "Laushu task flow",
      classification: "Route-local pattern",
      currentUsage: "Laushu case route task-flow diagrams and route-level flow CSS.",
      boundary: "Diagram geometry, connector endpoints, min-width rules, and step relationships are bound to this project flow.",
      extractionCondition: "Revisit only if multiple routes need the same diagram grammar without case-specific connector logic.",
      source: "app/laushu/components/TaskFlowDiagrams.tsx",
      status: "Story-specific flow visualization",
      nextStep: "Keep documented as route-owned diagram grammar.",
    },
    {
      pattern: "Crypto matrix / FlowMatrixBoard",
      classification: "Route-local pattern",
      currentUsage: "Crypto Arsenal ResearchSection matrices for close-position and TP / SL flow analysis.",
      boundary: "Visual storytelling matrix for crypto product risk and decision structure, not a reusable data table contract.",
      extractionCondition: "Revisit only if repeated cases need the same matrix semantics, navigation, and accessibility contract.",
      source: "app/crypto-arsenal/components/FlowMatrixBoard.tsx",
      status: "Project-specific matrix",
      nextStep: "Keep referenced as a case-specific matrix pattern.",
    },
    {
      pattern: "BeforeAfterPanel",
      classification: "Internal anatomy",
      currentUsage: "Internal part of BeforeAfterNarrativeFrame.",
      boundary: "BeforeAfterPanel is internal anatomy of BeforeAfterNarrativeFrame. Routes adopt the parent frame; the panel only renders labeled state panels inside that frame.",
      extractionCondition: "Revisit only if the panel leaves BeforeAfterNarrativeFrame and becomes a standalone shared contract across independent parents.",
      source: "components/case-study/BeforeAfterPanel.tsx",
      status: "Internal part",
      nextStep: "Keep under BeforeAfterNarrativeFrame anatomy; do not present it as a standalone route-level pattern.",
    },
  ],
  "zh-TW": [
    {
      pattern: "ProjectCard hover overlay",
      classification: "Route-local pattern",
      currentUsage: "首頁 Selected Works 區塊。",
      boundary: "綁定 project metadata、cover、logo、tags、CTA 與作品探索用的 hover overlay 內部組成。",
      extractionCondition: "只有當其他產品區塊也需要同一套專案卡片 內部組成、overlay 行為與 CTA model，才重新評估抽象化。",
      source: "components/Works.tsx",
      status: "Product-specific portfolio pattern",
      nextStep: "維持為 頁面自有 project card 模式。",
    },
    {
      pattern: "ProjectTag",
      classification: "Internal anatomy",
      currentUsage: "用在 ProjectCard 裡，呈現 Selected Work card 的 project metadata 與 tone tags。",
      boundary: "屬於 ProjectCard 的內部組成，用來在 Selected Work card 裡呈現專案 metadata；目前沒有獨立的 tag 元件契約。",
      extractionCondition: "只有當 tags 被多個獨立 parent 元件重用，且具備穩定 tone、狀態 或 metadata API 時，才重新評估提升為獨立元件。",
      source: "components/ProjectCard.tsx / styles/home.css",
      status: "ProjectCard internal anatomy",
      nextStep: "維持在 ProjectCard 內部組成 與這份 邊界參考 中說明。",
    },
    {
      pattern: "SectionHeading",
      classification: "Shared pattern",
      currentUsage: "用於 Home 與 About 等頁面的主要內容區塊開頭，維持一致的 section heading 層級與閱讀節奏。",
      boundary: "SectionHeading 目前是內容層級慣例，不是獨立 React 元件；在結構、props 與使用契約被抽出前，不應被文件化為 通用 heading 元件。",
      extractionCondition: "只有當相同 heading 結構被抽成共用 元件，且欄位、語意 heading 規則、間距 行為與 RWD 需求穩定後，才重新評估提升為 visible 元件。",
      source: "components/Works.tsx / app/about-me/page.tsx / styles/home.css",
      status: "Shared content hierarchy pattern",
      nextStep: "在穩定 元件 API 出現前，維持於 Component Boundaries 與 Typography reference 中說明。",
    },
    {
      pattern: "Accordion",
      classification: "Internal documentation shell anatomy",
      currentUsage: "用於 Design System 文件側邊欄，展開或收合導覽分類。",
      boundary: "Accordion 目前屬於 文件站骨架 的內部組成；因為它的 實際使用位置、樣式與互動行為都綁定 design-system navigation sidebar，所以不作為通用 作品集元件 文件化。",
      extractionCondition: "只有當相同 disclosure 模式 被多個獨立產品區塊重用，且 item、觸發、panel、keyboard 與 accessibility 契約穩定後，才重新評估提升為 visible 元件。",
      source: "components/ui/Accordion.tsx / components/design-system/DesignSystemExplorer.tsx / components/design-system/DesignSystemDocsNav.tsx",
      status: "Documentation shell navigation anatomy",
      nextStep: "維持透過 Component Boundaries 說明；只有當相同 disclosure 契約 在 文件站骨架 之外被採用時才重新評估。",
    },
    {
      pattern: "ScrollProgress",
      classification: "Shared case-study pattern",
      currentUsage: "在案例頁長篇內容中顯示閱讀進度，協助使用者理解目前瀏覽位置。",
      boundary: "它屬於案例頁 骨架 行為，因為依賴整頁 scroll position、頁面高度、視窗行為與 fixed navigation offset；不是任務進度或任意流程的通用 Progress 元件。",
      extractionCondition: "只有當非案例頁也需要相同閱讀進度 提示，且具備穩定 API 與共用 scroll model 時，才重新評估抽出。",
      source: "components/ScrollProgress.tsx / components/case-study/CaseStudyShell.tsx",
      status: "Case-study shell behavior",
      nextStep: "維持為 共享案例頁模式文件。",
    },
    {
      pattern: "CaseNextNav",
      classification: "Shared case-study pattern",
      currentUsage: "放在案例頁結尾，引導讀者前往下一個專案。",
      boundary: "它屬於案例頁閱讀流程，依賴案例順序、locale-aware 頁面、project metadata 與案例模板結尾位置；不是通用 pagination、breadcrumb 或全站 navigation 元件。",
      extractionCondition: "只有當多個獨立內容區塊也需要相同 next-content navigation 模式，且不再只綁定案例頁時，才重新評估抽出。",
      source: "components/case-study/CaseStudyShell.tsx",
      status: "Case-study ending navigation pattern",
      nextStep: "維持為 共享案例頁模式文件。",
    },
    {
      pattern: "CaseInfoCard",
      classification: "Shared case-study pattern",
      currentUsage: "在案例頁 overview 區塊呈現角色、時程、範圍、工具或專案背景等結構化 metadata。",
      boundary: "它屬於案例頁模板的組成結構，語意來自 case overview 脈絡，而不是通用 Card 元件契約。",
      extractionCondition: "只有當相同 metadata card 契約被多個獨立路由重用，且欄位、variants 與 accessibility requirements 穩定後，才重新評估抽出。",
      source: "components/case-study/CaseInfoGrid.tsx / components/case-study/CaseHero.tsx",
      status: "Case-study hero metadata anatomy",
      nextStep: "維持為 共享案例頁模式文件。",
    },
    {
      pattern: "SocialLink",
      classification: "Internal anatomy",
      currentUsage: "用在 Footer social link group，連到 LinkedIn 與 GitHub profile。",
      boundary: "屬於 Footer 的內部組成；語意依賴 footer 收尾區塊、外部連結行為、icon swap 與 accessible 標籤。",
      extractionCondition: "只有當同一套 social link 契約被多個獨立 表面重用，且 icon、標籤、external-link 與 accessibility 行為穩定時，才重新評估提升為獨立元件。",
      source: "components/Footer.tsx / styles/tokens.css",
      status: "Footer internal anatomy",
      nextStep: "維持在 Footer 內部組成 與這份 邊界參考 中說明。",
    },
    {
      pattern: "HeroBadge",
      classification: "Internal anatomy",
      currentUsage: "用於首頁 Hero 內的小型身份／狀態提示；About education 區塊也借用相同 class 以維持視覺一致性。",
      boundary: "HeroBadge 目前是 Hero 的內部組成，不是獨立 Badge 元件；它尚未提供穩定的 標籤、tone、icon 或 狀態 API。",
      extractionCondition: "只有當 badge-like UI 在多個獨立區塊中重複出現，且 標籤、tone、icon、語意與 accessibility 契約穩定後，才重新評估抽出。",
      source: "components/Hero.tsx / app/about-me/page.tsx / styles/home.css",
      status: "Hero internal anatomy",
      nextStep: "維持為 Hero 內部組成；若 契約重複出現，未來再評估 通用 Badge。",
    },
    {
      pattern: "ContactMethod",
      classification: "Internal anatomy",
      currentUsage: "用在 Contact 頁面 的資訊卡中，呈現 email、電話、LinkedIn 與 GitHub actions。",
      boundary: "屬於 Contact 區塊的內部組成，用來在該路由脈絡中呈現聯絡方式；目前沒有獨立的 contact-method 元件契約。",
      extractionCondition: "只有當 contact method cards 被多個獨立 表面重用，且 icon、標籤、action 與 accessibility 行為穩定時，才重新評估提升為獨立元件。",
      source: "components/Contact.tsx / styles/contact.css",
      status: "Contact route internal anatomy",
      nextStep: "維持在 Contact section boundaries 中說明，不作為獨立 Data Entry catalog item。",
    },
    {
      pattern: "Advantech Board 2 / Board 3",
      classification: "Route-local pattern",
      currentUsage: "Advantech SolutionSection 的需量超約預警與設備能耗異常分析 scenario boards。",
      boundary: "multi-comparison 版面、copy density、comparison axis 與 AI proposal evaluation 都和 Advantech business logic 綁定。",
      extractionCondition: "只有第二個以上案例出現相同結構與互動需求時，才考慮 componentize。",
      source: "app/advantech/sections/SolutionSection.tsx",
      status: "Project-specific visual board",
      nextStep: "在其他案例出現同結構前，維持 頁面組成。",
    },
    {
      pattern: "YearRail",
      classification: "Route-local pattern",
      currentUsage: "About 頁面 的經歷時間軸。",
      boundary: "綁定 `.experience-card[data-year]`、About 頁 chronology、section anchors 與 scroll-reading behavior；不是通用 timeline 或 pagination 元件。",
      extractionCondition: "只有當另一個獨立頁面 也需要相同 year-anchor rail，且具備共用語意、鍵盤期待與不綁特定 頁面 的 section mapping 時，才重新評估提升。",
      source: "components/YearRail.tsx / app/about-me/page.tsx",
      status: "About timeline navigation pattern",
      nextStep: "保留在 頁面限定 邊界 文件中，不作為通用 Navigation visible 元件。",
    },
    {
      pattern: "ExperienceCard",
      classification: "Route-local pattern",
      currentUsage: "用在 About 頁面 的 experience timeline，並與 YearRail anchors 配對。",
      boundary: "屬於 About 頁面的時間軸模式，語意依賴 About 頁面 的內容模型、YearRail anchor 與時間序閱讀流程；不是通用 Card 元件。",
      extractionCondition: "只有當相同 experience card 契約被多個獨立頁面 重用，且欄位、timeline behavior 與 accessibility requirements 穩定時，才重新評估提升。",
      source: "app/about-me/page.tsx / components/YearRail.tsx",
      status: "About timeline content pattern",
      nextStep: "維持在 About timeline / YearRail 邊界 中說明。",
    },
    {
      pattern: "SkillCategoryCard",
      classification: "Route-local pattern",
      currentUsage: "用於 About 頁面的 skills 區塊，整理能力分類、工具與學習重點。",
      boundary: "SkillCategoryCard 屬於 About 頁面 的內容模型；其欄位、tone class 與語意都依賴 About skills 的敘事結構。",
      extractionCondition: "只有當相同 skill/category card 契約被多個獨立路由重用，且欄位、variants 與 accessibility requirements 穩定後，才重新評估抽出。",
      source: "app/about-me/page.tsx / data/about.ts / styles/about.css",
      status: "About skills content pattern",
      nextStep: "維持為 About 頁面模式，不作為 通用 Data Display card。",
    },
    {
      pattern: "Laushu task flow",
      classification: "Route-local pattern",
      currentUsage: "Laushu 案例頁 的任務流程圖與 頁面-level flow CSS。",
      boundary: "diagram geometry、connector endpoints、min-width rules 與 step relationship 都和此專案流程綁定。",
      extractionCondition: "只有多個 頁面 需要同一套 diagram grammar，且不需要塞入 case-specific connector logic，才重新評估。",
      source: "app/laushu/components/TaskFlowDiagrams.tsx",
      status: "Story-specific flow visualization",
      nextStep: "維持為 頁面自有 diagram grammar。",
    },
    {
      pattern: "Crypto matrix / FlowMatrixBoard",
      classification: "Route-local pattern",
      currentUsage: "Crypto Arsenal ResearchSection 的平倉與 TP / SL flow analysis matrices。",
      boundary: "用來說明 crypto product risk / decision structure 的 visual storytelling matrix，不是 可重用 data table 契約。",
      extractionCondition: "只有重複案例需要同樣的矩陣語意、導覽與 accessibility 契約，才重新評估。",
      source: "app/crypto-arsenal/components/FlowMatrixBoard.tsx",
      status: "Project-specific matrix",
      nextStep: "維持為 case-specific matrix 模式。",
    },
    {
      pattern: "BeforeAfterPanel",
      classification: "Internal anatomy",
      currentUsage: "BeforeAfterNarrativeFrame 的 internal part。",
      boundary: "BeforeAfterPanel 是 BeforeAfterNarrativeFrame 的 內部組成。正式頁面 採用 parent frame；panel 只在該 frame 內渲染 labeled state panels。",
      extractionCondition: "只有 panel 離開 BeforeAfterNarrativeFrame，並在多個獨立 parent 中形成 獨立 shared 契約，才重新評估。",
      source: "components/case-study/BeforeAfterPanel.tsx",
      status: "Internal part",
      nextStep: "保留在 BeforeAfterNarrativeFrame 內部組成；不要呈現成 獨立頁面層級模式。",
    },
  ],
} satisfies Record<DesignSystemLocale, BoundaryReferenceItem[]>;

function getCopy(locale: DesignSystemLocale) {
  const zh = locale === "zh-TW";

  return {
    contractOnly: zh ? "僅保留契約：作品集目前沒有正式使用" : "Contract-only: no current live usage in portfolio",
    referenceStyle: zh ? "Reference-style example" : "Reference-style example",
    liveUsage: zh ? "真實使用位置" : "Live usage",
    source: zh ? "來源" : "Source",
    noLiveUsage: zh ? "目前正式作品集頁面尚未直接使用。" : "No current live usage in portfolio routes.",
    futureContract: zh ? "這個 契約 先保留給未來產品介面或維護一致性。" : "This contract exists for future product surfaces or maintenance consistency.",
    notProductionExample: zh ? "這不是目前正式站範例。" : "This is not a current production example.",
    navbarBehavior: zh
      ? ["locale-aware links", "desktop / mobile 共用 nav items", "LanguageSwitcher 放在 Navbar 內", "scroll hide / restore"]
      : ["locale-aware links", "shared desktop / mobile nav items", "LanguageSwitcher lives inside Navbar", "scroll hide / restore"],
    contactToastSuccess: zh ? "送出成功！" : "Message Sent!",
    contactToastError: zh ? "傳送失敗，請重試" : "Something went wrong. Please try again.",
    modalDemo: {
      usage: zh ? "Contact 送出前確認" : "Contact review before submit",
      title: zh ? "確認送出內容" : "Review your message",
      description: zh ? "送出前，請再確認一次你的聯絡資訊與訊息內容。" : "Please confirm the details before sending.",
      fields: zh
        ? [
            ["你的姓名", "黃宣銘"],
            ["服務單位", "Hming Design"],
            ["電子信箱", "hello@hmingdesign.com"],
            ["手機號碼", "0912 345 678"],
            ["訊息內容", "想了解作品集設計系統與案例頁整理方式。"],
          ]
        : [
            ["Your name", "Brian Huang"],
            ["Company / Organization", "Hming Design"],
            ["Email", "hello@hmingdesign.com"],
            ["Phone", "0912 345 678"],
            ["Your message", "I would like to discuss the portfolio design system and case-study documentation."],
          ],
      cancel: zh ? "返回修改" : "Cancel",
      confirm: zh ? "確認送出" : "Confirm Send",
    },
    skeletonDemo: {
      usage: zh ? "Contact pending summary" : "Contact pending summary",
      title: zh ? "確認送出內容" : "Review your message",
      description: zh ? "送出中，摘要區暫時顯示處理狀態。" : "Sending; the summary area temporarily shows a processing state.",
      confirm: zh ? "送出中..." : "Sending...",
      cancel: zh ? "返回修改" : "Cancel",
    },
    boundaryFields: {
      classification: zh ? "Classification" : "Classification",
      currentUsage: zh ? "Current usage" : "Current usage",
      boundary: zh ? "Boundary" : "Boundary",
      extractionCondition: zh ? "Extraction condition" : "Extraction condition",
      item: zh ? "Item" : "Item",
      source: zh ? "Source / route" : "Source / route",
      status: zh ? "Status" : "Status",
      nextStep: zh ? "Next step" : "Next step",
    },
  };
}

function ContractOnlyCard({
  locale,
  title,
  status = "contract-only",
  recommendation,
  source,
}: {
  locale: DesignSystemLocale;
  title: string;
  status?: "contract-only" | "candidate" | "backlog";
  recommendation: string;
  source?: string;
}) {
  const copy = getCopy(locale);
  const zh = locale === "zh-TW";
  const statusLabel = {
    "contract-only": zh ? "Contract-only" : "Contract-only",
    candidate: zh ? "Candidate" : "Candidate",
    backlog: zh ? "Backlog" : "Backlog",
  }[status];

  return (
    <article className={styles.contractOnlyDemo}>
      <div>
        <p className={styles.demoBadge}>{statusLabel}</p>
        <h3>{title}</h3>
        {source ? <code className={styles.contractSource}>{source}</code> : null}
      </div>
      <ul>
        <li>{copy.noLiveUsage}</li>
        <li>{copy.futureContract}</li>
        <li>{copy.notProductionExample}</li>
      </ul>
      <p>{recommendation}</p>
    </article>
  );
}

function CaseTocInteractiveDemo({ contextLabel, locale }: { contextLabel?: string; locale: DesignSystemLocale }) {
  const zh = locale === "zh-TW";
  const sections = advantechTocSections[locale];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries[0]?.target.id) {
          setActiveSectionId(visibleEntries[0].target.id);
        }
      },
      {
        root: container,
        rootMargin: "0px 0px -58% 0px",
        threshold: 0,
      },
    );

    sections.forEach(({ id }) => {
      const section = container.querySelector<HTMLElement>(`#${id}`);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleNavigate = (id: string) => {
    const container = scrollContainerRef.current;
    const target = container?.querySelector<HTMLElement>(`#${id}`);
    if (!container || !target) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const top = container.scrollTop + targetRect.top - containerRect.top;
    const pageX = window.scrollX;
    const pageY = window.scrollY;

    setActiveSectionId(id);
    container.scrollTo({ top, behavior: "auto" });
    window.requestAnimationFrame(() => window.scrollTo(pageX, pageY));
  };

  return (
    <DemoBlock
      className={styles.caseTocDemo}
      contextLabel={contextLabel ?? (zh ? "真實使用位置：CaseStudyShell / Advantech 案例頁" : "Real usage: CaseStudyShell / Advantech case route")}
    >
      <section aria-label={zh ? "CaseTOC production 視覺狀態" : "CaseTOC production visual state"}>
        <div className={`cs-page theme-advantech ${styles.caseTocPreviewShell}`}>
          <div className="cs-toc-layout">
            <aside className="cs-toc-aside">
              <CaseTOC
                sections={sections}
                activeSectionId={activeSectionId}
                visible
                onNavigate={handleNavigate}
              />
            </aside>
            <p className={styles.caseTocMobileNote}>
              {zh
                ? "手機版正式案例頁不使用側邊目錄；目錄會直接隱藏，這裡只保留可捲動的假 section 示意閱讀位置。"
                : "Mobile case pages do not use the side table of contents; it is hidden, so this example keeps only the scrollable section preview."}
            </p>
            <div className={styles.caseTocRouteCrop} ref={scrollContainerRef}>
              {sections.map((section, index) => (
                <section
                  className={styles.caseTocWireSection}
                  id={section.id}
                  key={section.id}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h4>{section.title}</h4>
                  <div aria-hidden="true" />
                </section>
              ))}
            </div>
          </div>
        </div>
        <ul className={styles.caseTocNotes}>
          <li>{zh ? "行為：點擊章節標題只會移動右側示意內容；active state 跟隨右側目前可見大標。" : "Behavior: clicking a section label only moves the right-side sample content; the active state follows the visible heading inside that container."}</li>
          <li>{zh ? "正式邊界：正式案例頁仍使用自己的頁面 scroll 與窄版隱藏規則。" : "Production boundary: live case routes still use their own page scroll and narrow-breakpoint visibility rules."}</li>
        </ul>
      </section>
    </DemoBlock>
  );
}

function DemoContextLabel({ children }: { children?: string }) {
  if (!children) {
    return null;
  }

  return <p className={styles.demoUsageLine}>{children}</p>;
}

function DemoBlock({
  children,
  className,
  contextLabel,
}: {
  children: ReactNode;
  className?: string;
  contextLabel?: string;
}) {
  return (
    <div className={[styles.demoBlock, className].filter(Boolean).join(" ")}>
      <DemoContextLabel>{contextLabel}</DemoContextLabel>
      {children}
    </div>
  );
}

export default function ComponentDemo({
  type,
  locale,
  contextLabel,
}: {
  type?: string;
  locale: DesignSystemLocale;
  contextLabel?: string;
}) {
  const zh = locale === "zh-TW";
  const copy = getCopy(locale);
  const caseCopy = caseExamples[locale];
  const projects = getProjects(locale);
  const featuredProject = projects.find((project) => project.slug === "advantech") ?? projects[0];
  const contactData = getContactData(locale);
  const [copied, setCopied] = useState(false);
  const [contactReviewPreviewOpen, setContactReviewPreviewOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [languageDemoLocale, setLanguageDemoLocale] = useState<DesignSystemLocale>(locale);
  const languageDemoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!languageMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!languageDemoRef.current?.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [languageMenuOpen]);

  if (!type) {
    return <p className={styles.demoFallback}>{zh ? "此 模式 以正式作品集使用情境為準。" : "This pattern is documented from its live portfolio usage."}</p>;
  }

  if (type === "button") {
    const registerButtonReturn = () => {
      registerDesignSystemReturnTarget({
        locale,
        scrollY: window.scrollY,
        target: `${window.location.pathname}#general`,
      });
    };

    return (
      <DemoBlock className={styles.buttonSpecDemo} contextLabel={contextLabel}>
        <div className={styles.buttonSpecRow} data-button-spec-row>
          <div className={styles.buttonSpecMeta}>
            <p>{zh ? "主要導覽" : "Primary navigation"}</p>
            <span>{zh ? "Hero 導覽 / 頁面 anchor" : "Hero navigation / route anchor"}</span>
            <span>{zh ? "來源：Home hero" : "Source: Home hero"}</span>
          </div>
          <div className={styles.buttonSpecControls}>
            <Button href="/#projects" onClick={registerButtonReturn}>
              {zh ? "查看作品" : "View My Work"}
            </Button>
            <Button href="/about-me" onClick={registerButtonReturn} variant="secondary">
              {zh ? "我的歷程" : "My Journey"}
            </Button>
          </div>
        </div>

        <div className={styles.buttonSpecRow} data-button-spec-row>
          <div className={styles.buttonSpecMeta}>
            <p>{zh ? "區塊 CTA" : "Section CTA"}</p>
            <span>{zh ? "Project CTA / 不可用動作" : "Project CTA / unavailable action"}</span>
            <span>{zh ? "來源：ProjectCard" : "Source: ProjectCard"}</span>
          </div>
          <div className={styles.buttonSpecControls}>
            <Button className={styles.buttonSpecCta} onClick={() => undefined} size="lg" type="button">
              {zh ? "了解更多" : "Learn More"}
            </Button>
            <Button className={styles.buttonSpecCta} size="lg" disabled>
              {zh ? "即將上線" : "Coming Soon"}
            </Button>
          </div>
        </div>

        <div className={styles.buttonSpecRow} data-button-spec-row>
          <div className={styles.buttonSpecMeta}>
            <p>{zh ? "非同步送出" : "Async submit"}</p>
            <span>{zh ? "Contact 送出 loading state" : "Contact submit loading state"}</span>
            <span>{zh ? "來源：Contact form" : "Source: Contact form"}</span>
          </div>
          <div className={styles.buttonSpecControls}>
            <Button className={styles.buttonSpecCta} loading loadingLabel={zh ? "傳送中..." : "Sending..."} type="submit">
              {zh ? "送出訊息" : "Send Message"}
            </Button>
          </div>
        </div>
      </DemoBlock>
    );
  }

  if (type === "copy") {
    return (
      <Button
        variant="secondary"
        onClick={async () => {
          await navigator.clipboard.writeText("--hm-purple: #5d62d8;");
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Copied" : "Copy token"}
      </Button>
    );
  }

  if (type === "language-switcher") {
    const languageOptions = [
      { locale: "en" as const, label: "English", shortLabel: "EN" },
      { locale: "zh-TW" as const, label: "繁體中文", shortLabel: "繁體中文" },
    ];
    const currentLanguage = languageOptions.find((option) => option.locale === languageDemoLocale) ?? languageOptions[0];
    const demoZh = languageDemoLocale === "zh-TW";
    const navContextItems = zh
      ? ["精選案例", "關於我", "Design System", "聯絡資訊", "下載履歷"]
      : ["Selected Work", "About", "Design System", "Contact", "Resume"];

    return (
      <DemoBlock className={styles.languageSwitcherDemo} contextLabel={contextLabel}>
        <div className={styles.languageNavbarCrop} aria-label={zh ? "Navbar 語境中的語系切換示意" : "Language switcher in navbar context"}>
          <div className={styles.languageNavbarContext} aria-hidden="true">
            <span className={styles.languageBrandMark}>H</span>
            <div className={styles.languageNavLinks}>
              {navContextItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div ref={languageDemoRef} className={`${styles.languageDemoSwitcher} ${languageMenuOpen ? styles.isLanguageDemoOpen : ""}`}>
            <button
              autoFocus
              aria-expanded={languageMenuOpen}
              aria-haspopup="menu"
              aria-label={demoZh ? "選擇語言，文件站安全示意" : "Select language, docs-safe demo"}
              className={styles.languageDemoTrigger}
              onClick={() => setLanguageMenuOpen((open) => !open)}
              type="button"
            >
              <span>{currentLanguage.shortLabel}</span>
              <ChevronDown aria-hidden="true" size={12} strokeWidth={1.8} />
            </button>

            <div className={styles.languageDemoMenu} role="menu" aria-label={demoZh ? "語言選單示意" : "Language menu demo"}>
              {languageOptions.map((option) => {
                const selected = option.locale === languageDemoLocale;

                return (
                  <button
                    aria-checked={selected}
                    className={selected ? styles.isLanguageDemoSelected : undefined}
                    key={option.locale}
                    onClick={() => {
                      setLanguageDemoLocale(option.locale);
                      setLanguageMenuOpen(false);
                    }}
                    role="menuitemradio"
                    type="button"
                  >
                    <span>{option.label}</span>
                    {selected ? <span aria-hidden="true">✓</span> : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </DemoBlock>
    );
  }

  if (type === "navbar") {
    const navItems = zh
      ? ["精選案例", "關於我", "Design System", "聯絡資訊", "下載履歷"]
      : ["Selected Work", "About", "Design System", "Contact", "Resume"];

    return (
      <section className={styles.navbarShellDemo} aria-label={zh ? "Navbar shell visual states" : "Navbar shell visual states"}>
        <div className={styles.navbarDemoFrame}>
          <div className={styles.navbarDemoLabel}>{zh ? "桌機導覽骨架" : "Desktop shell"}</div>
          <div className={styles.navbarDemoBar} aria-hidden="true">
            <span className={styles.navbarDemoBrand}>H</span>
            <div className={styles.navbarDemoLinks}>
              {navItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
              <span className={styles.navbarDemoLanguage}>{zh ? "繁體中文" : "EN"}</span>
            </div>
          </div>
        </div>
        <div className={styles.navbarDemoFrame}>
          <div className={styles.navbarDemoLabel}>{zh ? "手機選單骨架" : "Mobile menu shell"}</div>
          <div className={styles.navbarMobileShell} aria-hidden="true">
            <div className={styles.navbarMobileTop}>
              <span className={styles.navbarDemoBrand}>H</span>
              <span className={styles.navbarMobileButton}><span /><span /></span>
            </div>
            <div className={styles.navbarMobilePanel}>
              {navItems.slice(0, 4).map((item) => (
                <span key={item}>{item}</span>
              ))}
              <span className={styles.navbarDemoLanguage}>{zh ? "繁體中文" : "EN"}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (type === "footer") {
    return (
      <footer className={styles.liveFooterDemo}>
        <p>© Brian Huang 2026 Copyright. All Rights Reserved.</p>
        <div className={styles.liveSocialLinks} aria-label={zh ? "社群連結" : "Social links"}>
          {[
            ["LinkedIn", "https://www.linkedin.com/in/brian-huang-a36759128", "/social/linkedin-gray-v2.png"],
            ["GitHub", "https://github.com/Hming1224", "/social/github-gray-v2.png"],
          ].map(([label, href, src]) => (
            <a href={href} key={label} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Image src={src} alt="" width={32} height={32} />
            </a>
          ))}
        </div>
      </footer>
    );
  }

  if (type === "input" || type === "textarea") {
    const fieldContextLabel = contextLabel ?? (zh ? "Contact form field pattern" : "Contact form field pattern");

    return (
      <DemoBlock className={styles.contactFieldDemo} contextLabel={fieldContextLabel}>
        {type === "textarea" ? (
          <div className={styles.contactFieldGrid}>
            <div className="form-field is-textarea">
              <textarea id="demo-message-empty" name="message" placeholder=" " rows={4} required />
              <label htmlFor="demo-message-empty">{zh ? "訊息內容" : "Your message"}</label>
            </div>
            <div className="form-field is-textarea">
              <textarea id="demo-message-filled" name="message-preview" placeholder=" " rows={4} defaultValue={zh ? "想聊聊作品集、產品設計或網站合作。" : "I would like to talk about portfolio work, product design, or website collaboration."} required />
              <label htmlFor="demo-message-filled">{zh ? "訊息內容" : "Your message"}</label>
            </div>
          </div>
        ) : (
          <div className={styles.contactFieldGrid}>
            <div className="form-field">
              <input id="demo-name-empty" name="name" type="text" placeholder=" " required />
              <label htmlFor="demo-name-empty">{zh ? "你的姓名" : "Your name"}</label>
            </div>
            <div className="form-field">
              <input id="demo-email-filled" name="email" type="email" placeholder=" " defaultValue={contactData.email} required />
              <label htmlFor="demo-email-filled">{zh ? "電子信箱" : "Email"}</label>
            </div>
            <div className="form-field input--error">
              <input id="demo-company-error" name="company" type="text" placeholder=" " aria-invalid="true" aria-describedby="demo-company-error-message" required />
              <label htmlFor="demo-company-error">{zh ? "服務單位" : "Company"}</label>
              <p id="demo-company-error-message" className="form-error">{zh ? "此欄位為必填" : "This field is required"}</p>
            </div>
          </div>
        )}
      </DemoBlock>
    );
  }

  if (type === "select") {
    return (
      <ContractOnlyCard
        locale={locale}
        title={zh ? "Select 契約 尚未進入正式作品集" : "Select contract is not in the live portfolio yet"}
        recommendation={zh ? "若未來 Contact form 增加詢問類型或服務分類，且選項超過四個，再先導入 production flow 後回頭文件化。" : "If the Contact form later adds inquiry type or service-category choices with more than four options, implement it in production first and document the real flow afterward."}
        source="components/ui/Select.tsx"
        status="candidate"
      />
    );
  }

  if (type === "checkbox") {
    return (
      <ContractOnlyCard
        locale={locale}
        title={zh ? "Checkbox 契約 目前只保留為候選" : "Checkbox contract is currently a candidate"}
        recommendation={zh ? "作品集目前沒有多選設定或同意事項需要它；不要為了保留元件而塞進 Contact form。" : "The portfolio currently has no multi-select setting or consent task that needs it; do not force it into the Contact form just to keep the component visible."}
        source="components/ui/Checkbox.tsx"
        status="candidate"
      />
    );
  }

  if (type === "radio") {
    return (
      <ContractOnlyCard
        locale={locale}
        title={zh ? "Radio 契約 尚未有正式使用情境" : "Radio contract has no current production context"}
        recommendation={zh ? "只有當未來表單出現少量互斥選項，且真的能降低填寫成本時，才導入 production。" : "Introduce it only when a future form has a small set of mutually exclusive options and the control genuinely reduces form effort."}
        source="components/ui/Radio.tsx"
        status="candidate"
      />
    );
  }

  if (type === "tabs") {
    const tabs = [
      { value: "enterprise", label: zh ? "企業應用" : "Industry Projects" },
      { value: "school", label: zh ? "學校與個人專案" : "Academic & Side Projects" },
    ];

    return (
      <DemoBlock className={styles.worksTabsDemo} contextLabel={contextLabel}>
        <WorkCategoryTabs
          ariaLabel={zh ? "精選案例分類" : "Selected Work categories"}
          tabs={tabs.map((tab) => {
            const itemCount = tab.value === "enterprise" ? 3 : 2;

            return {
              ...tab,
              content: (
                <div className={styles.tabsWireframePanel} aria-label={`${tab.label} panel context`}>
                  {Array.from({ length: itemCount }, (_, index) => (
                    <div className={styles.tabsWireframeCard} key={`${tab.value}-${index}`}>
                      <FakeImagePlaceholder className={styles.tabsWireframeThumb} />
                      <span className={styles.tabsWireframeLines}>
                        <span className={styles.tabsWireframeLine} />
                        <span className={styles.tabsWireframeLine} />
                        <span className={styles.tabsWireframeLine} />
                      </span>
                    </div>
                  ))}
                </div>
              ),
            };
          })}
        />
      </DemoBlock>
    );
  }

  if (type === "case-toc") {
    return <CaseTocInteractiveDemo contextLabel={contextLabel} key={locale} locale={locale} />;
  }

  if (type === "project-card") {
    return (
      <DemoBlock className={styles.projectCardLiveWrap} contextLabel={contextLabel ?? "Homepage / Selected Works"}>
        <div className={`projects-list ${styles.projectCardLivePreview}`}>
          <ProjectCard project={featuredProject} />
        </div>
      </DemoBlock>
    );
  }

  if (type === "case-hero") {
    const infoItems: CaseInfoItem[] = [
      {
        label: zh ? "時間進程" : "Timeline",
        value: (
          <span className="cs-info-value--timeline">
            <span>2024.06</span>
            <span className="cs-info-timeline-sep" aria-hidden="true">–</span>
            <span>2024.08</span>
          </span>
        ),
      },
      {
        label: zh ? "團隊成員" : "Team",
        value: zh ? (
          <>
            2 位設計師
            <br />
            2 位後端工程師
            <br />
            1 位 PM
          </>
        ) : (
          <>
            2 Designers
            <br />
            2 Backend Engineers
            <br />
            1 PM
          </>
        ),
      },
      { label: zh ? "我的角色" : "My Role", value: zh ? "UIUX 設計師" : "UI/UX Designer" },
      {
        label: zh ? "負責項目" : "Responsibilities",
        value: zh ? (
          <>
            競品分析
            <br />
            終端使用者訪談
            <br />
            線框稿
            <br />
            原型設計
            <br />
            產品行銷影片
          </>
        ) : (
          <>
            Competitive Analysis
            <br />
            End-user Interviews
            <br />
            Wireframing
            <br />
            Prototyping
            <br />
            Product Marketing Videos
          </>
        ),
      },
      {
        label: zh ? "使用軟體" : "Software Used",
        value: (
          <>
            Figma
            <br />
            FigJam
            <br />
            Canva
            <br />
            Screen studio
            <br />
            Adobe After Effects
          </>
        ),
      },
    ];

    return (
      <DemoBlock contextLabel={contextLabel}>
        <div className={`cs-page theme-advantech ${styles.caseHeroDemo}`}>
          <CaseHero
            cover={{
              src: "/projects/advantech/cover/hero-cover.webp",
              alt: "WISE-iEMS ECOWatch UI",
              unoptimized: true,
            }}
            meta={
              <>
                <span className="cs-badge">Early Design Project</span>
                <span className="cs-tags">WEB・B2B・AI Chatbot・UX Design・UI Design</span>
              </>
            }
            title={zh
              ? "賦能廠務人員與系統整合商：以生成式 AI 優化 EcoWatch 與 HVAC 維運使用流程"
              : "Empowering Facility Operators and System Integrators: Streamlining EcoWatch and HVAC Operations via Generative AI"}
            infoItems={infoItems}
            infoGridClassName={`cs-info-row--divided ${styles.caseHeroInfoGrid}`}
          />
        </div>
      </DemoBlock>
    );
  }

  if (type === "case-section") {
    return (
      <DemoBlock className={styles.caseSectionDemoShell} contextLabel={contextLabel}>
        <div className="cs-page theme-advantech">
          <CaseSection
            id="cs-sec-ds-case-section-demo"
            className={`cs-overview ${styles.caseSectionSourceDemo}`}
            kicker={zh ? "專案總覽" : "Project Overview"}
            title={zh ? "為能源與 HVAC 工作流程設計更聰明的 GenAI 聊天機器人。" : "Designing a smarter GenAI chatbot for energy and HVAC workflows."}
          >
            <div className="cs-overview-body cs-stack-box">
              <div className={styles.caseSectionTextPlaceholder} aria-hidden="true">
                <span />
                <span />
              </div>
            </div>
            <FakeImagePlaceholder className={`cs-overview-img cs-object-box ${styles.caseSectionMediaPlaceholder}`} />
          </CaseSection>
        </div>
      </DemoBlock>
    );
  }

  if (type === "case-section-header") {
    return (
      <DemoBlock className={styles.caseSectionHeaderDemoShell} contextLabel={contextLabel}>
        <section className={`cs-page theme-crypto-arsenal ${styles.caseSectionHeaderSourceDemo}`}>
          <CaseSectionHeader
            kicker={caseCopy.sectionKicker}
            title={caseCopy.sectionTitle}
          />
          <p className="cs-section-lead">{caseCopy.sectionDescription}</p>
        </section>
      </DemoBlock>
    );
  }

  if (type === "case-card") {
    const card = cryptoPainCardDemo[locale];
    const avatar = cryptoPainAvatarIcons[card.tone];

    return (
      <DemoBlock className={styles.caseCardDemoShell} contextLabel={contextLabel}>
        <CaseCard className={`theme-crypto-arsenal ${styles.caseCardSourceDemo}`}>
          <p className="cs-quote-text">{card.quote}</p>
          <div className="cs-quote-meta">
            <span className={`cs-avatar cs-avatar--${card.tone}`}>
              <Image
                className="cs-avatar-img"
                src={avatar.src}
                alt=""
                width={avatar.size}
                height={avatar.size}
                aria-hidden="true"
              />
            </span>
            <span className="cs-quote-name">{card.name}</span>
            <span className="cs-quote-line" aria-hidden="true" />
            <span className="cs-quote-role">{card.role}</span>
          </div>
        </CaseCard>
      </DemoBlock>
    );
  }

  if (type === "case-grid") {
    return (
      <DemoBlock className={styles.caseStudyComponentDemo} contextLabel={contextLabel}>
        <section className="cs-page theme-crypto">
          <CaseGrid variant="three" className={styles.caseGridSourceDemo}>
            {caseCopy.gridItems.map((item, index) => (
              <div className={styles.caseGridPlaceholderDemo} key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </CaseGrid>
        </section>
      </DemoBlock>
    );
  }

  if (type === "case-media") {
    return (
      <DemoBlock className={styles.caseMediaDemoShell} contextLabel={contextLabel}>
        <CaseMedia
          className={`theme-crypto-arsenal ${styles.caseMediaSourceDemo}`}
          contentClassName={styles.caseMediaContentDemo}
          variant="full"
        >
          <Image
            src="/projects/crypto-arsenal/current/current-state-figure.png"
            alt={zh ? "Crypto Arsenal 策略詳情頁現況" : "Crypto Arsenal current strategy detail UI"}
            width={1441}
            height={1371}
            sizes="(max-width: 768px) 100vw, 860px"
            style={{ width: "100%", height: "auto" }}
            unoptimized
          />
        </CaseMedia>
      </DemoBlock>
    );
  }

  if (type === "case-before-after") {
    return (
      <DemoBlock className={styles.beforeAfterSourceDemo} contextLabel={contextLabel}>
        <div className="cs-page theme-advantech">
          <BeforeAfterNarrativeComparisonDemo />
        </div>
      </DemoBlock>
    );
  }

  if (type === "before-after-narrative") {
    return (
      <DemoBlock className={styles.beforeAfterNarrativeDemo} contextLabel={contextLabel}>
        <div className="cs-page theme-advantech">
          <BeforeAfterNarrativeFrame
            badge="Scenario 1"
            intro={<div className={styles.beforeAfterNarrativeTextPlaceholder} aria-hidden="true"><span /><span /></div>}
            title={
              <>
                <span className="sr-only">{caseCopy.beforeTitle}</span>
                <span className={styles.beforeAfterNarrativeTitlePlaceholder} aria-hidden="true" />
              </>
            }
            beforeLabel="Before"
            afterLabel="After"
            before={<BeforeAfterDemoSlot />}
            after={<BeforeAfterDemoSlot />}
          />
        </div>
      </DemoBlock>
    );
  }

  if (type === "local-exceptions") {
    const fieldLabels = copy.boundaryFields;
    const items = boundaryReferenceItems[locale];
    const groups = boundaryReferenceGroups[locale]
      .map((group) => ({
        ...group,
        items: items.filter((item) => item.classification === group.classification),
      }))
      .filter((group) => group.items.length > 0);

    return (
      <section className={styles.localExceptionsDemo} aria-label="Component boundary reference">
        <div className={styles.boundaryGroupStack}>
          {groups.map((group) => (
            <section className={styles.boundaryGroup} key={group.classification}>
              <header className={styles.boundaryGroupHeader}>
                <h4>{group.classification}</h4>
                <p>{group.description}</p>
              </header>
              <div className={styles.localExceptionGrid}>
                {group.items.map((item) => (
                  <article className={styles.localExceptionCard} key={item.pattern}>
                    <div className={styles.boundaryCardHeader}>
                      <h5>{item.pattern}</h5>
                    </div>
                    <dl>
                      <div>
                        <dt>{fieldLabels.currentUsage}</dt>
                        <dd>{item.currentUsage}</dd>
                      </div>
                      <div>
                        <dt>{fieldLabels.boundary}</dt>
                        <dd>{item.boundary}</dd>
                      </div>
                      <div>
                        <dt>{fieldLabels.extractionCondition}</dt>
                        <dd>{item.extractionCondition}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className={styles.boundaryMatrixWrap}>
          <table className={styles.boundaryMatrix}>
            <caption>{zh ? "Compact reference matrix" : "Compact reference matrix"}</caption>
            <thead>
              <tr>
                <th>{fieldLabels.item}</th>
                <th>{fieldLabels.classification}</th>
                <th>{fieldLabels.source}</th>
                <th>{fieldLabels.status}</th>
                <th>{fieldLabels.nextStep}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.pattern}>
                  <th scope="row">{item.pattern}</th>
                  <td>{item.classification}</td>
                  <td>{item.source}</td>
                  <td>{item.status}</td>
                  <td>{item.nextStep}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (type === "flow-scroll-hint") {
    return (
      <DemoBlock className={styles.flowHintDemo} contextLabel={contextLabel ?? "Advantech / AnalysisSection · ProcessSection · ScenarioSection"}>
        <div className={`cs-page theme-advantech ${styles.flowHintSourceDemo}`}>
          <FlowScrollHint label={zh ? "左右滑動查看更多" : "Swipe horizontally for more"} />
          <div
            aria-label={zh ? "寬版分析 board 範例" : "Wide analysis board example"}
            className={styles.flowHintScrollFrame}
            tabIndex={0}
          >
            <div className={styles.flowHintStripDemo}>
              <span>{zh ? "設備管理" : "Equipment"}</span>
              <span>{zh ? "現有 WISE iEMS AI 功能" : "Current WISE iEMS AI features"}</span>
              <span>{zh ? "EMS 競品 AI 模組" : "EMS competitor AI modules"}</span>
              <span>{zh ? "可發展機會點" : "Opportunity"}</span>
              <span>{zh ? "設計決策證據" : "Decision evidence"}</span>
            </div>
          </div>
        </div>
      </DemoBlock>
    );
  }

  if (type === "proposal-tabs") {
    return (
      <DemoBlock className={`${styles.proposalTabsDemo} theme-advantech`} contextLabel={contextLabel ?? "Advantech / SolutionSection / Scenario 1"}>
        <AdvantechProposalTabs defaultTab={1} tabs={proposalScenario1Tabs} />
      </DemoBlock>
    );
  }

  if (type === "alert") {
    return (
      <ContractOnlyCard
        locale={locale}
        title={zh ? "Alert 契約 目前沒有獨立 實際使用位置" : "Alert contract has no standalone live usage yet"}
        recommendation={zh ? "Contact form 若未來需要可持續顯示的錯誤摘要，可以先導入 production；目前 Toast 已承擔送出成功 / 失敗回饋。" : "If the Contact form later needs a persistent error summary, implement it in production first. Today, Toast already handles send success and failure feedback."}
        source="components/ui/Alert.tsx"
        status="contract-only"
      />
    );
  }

  if (type === "toast") {
    return (
      <DemoBlock className={styles.contactToastDemo} contextLabel={contextLabel ?? (zh ? "Contact 送出結果" : "Contact submit result")}>
        <div className={styles.contactToastPreviewGrid}>
          <div className={styles.contactToastPreviewSlot}>
            <Toast message={copy.contactToastSuccess} tone="success" duration={600000} onClose={() => undefined} />
          </div>
          <div className={styles.contactToastPreviewSlot}>
            <Toast message={copy.contactToastError} tone="error" duration={600000} onClose={() => undefined} />
          </div>
        </div>
      </DemoBlock>
    );
  }

  if (type === "modal") {
    const modal = copy.modalDemo;

    return (
      <DemoBlock className={styles.contactModalDemo} contextLabel={contextLabel ?? modal.usage}>
        <Button type="button" onClick={() => setContactReviewPreviewOpen(true)}>
          {zh ? "預覽送出前確認" : "Preview review before submit"}
        </Button>
        <Modal
          closeLabel={zh ? "關閉預覽" : "Close preview"}
          onClose={() => setContactReviewPreviewOpen(false)}
          open={contactReviewPreviewOpen}
          title={modal.title}
        >
          <div className="contact-review-modal">
            <p className="contact-review-description">{modal.description}</p>
            <dl className="contact-review-list">
              {modal.fields.map(([label, value]) => (
                <div key={label} className="contact-review-row">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="contact-review-actions">
              <Button type="button" onClick={() => setContactReviewPreviewOpen(false)}>{modal.confirm}</Button>
              <Button type="button" variant="secondary" onClick={() => setContactReviewPreviewOpen(false)}>{modal.cancel}</Button>
            </div>
          </div>
        </Modal>
      </DemoBlock>
    );
  }

  if (type === "skeleton") {
    const modal = copy.modalDemo;

    return (
      <DemoBlock className={styles.contactModalDemo} contextLabel={contextLabel ?? copy.skeletonDemo.usage}>
        <article className="hm-modal" aria-label={modal.title}>
          <header className="hm-modal-header">
            <h2>{modal.title}</h2>
            <button className="hm-icon-button" type="button" aria-label={zh ? "關閉預覽" : "Close preview"}>
              <X aria-hidden="true" size={20} strokeWidth={1.5} />
            </button>
          </header>
          <div className="contact-review-modal">
            <p className="contact-review-description">{modal.description}</p>
            <dl className="contact-review-list" aria-busy="true">
              {modal.fields.map(([label], index) => (
                <div className={`contact-review-row${index === modal.fields.length - 1 ? " is-message" : ""}`} key={label}>
                  <dt>{label}</dt>
                  <dd>
                    {index === modal.fields.length - 1 ? (
                      <>
                        <Skeleton className="contact-review-skeleton is-long" />
                        <Skeleton className="contact-review-skeleton is-medium" />
                      </>
                    ) : (
                      <Skeleton className="contact-review-skeleton" />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="contact-review-actions">
              <Button type="button" disabled>
                {modal.confirm}
              </Button>
              <Button type="button" variant="secondary" disabled>{modal.cancel}</Button>
            </div>
          </div>
        </article>
      </DemoBlock>
    );
  }

  if (type === "empty") {
    return (
      <ContractOnlyCard
        locale={locale}
        title={zh ? "EmptyState 目前沒有列表空狀態" : "EmptyState has no current list-empty surface"}
        recommendation={zh ? "目前作品集沒有搜尋、篩選或資料列表空狀態。等 production 出現真實無資料情境，再用真實文案文件化。" : "The portfolio currently has no search, filter, or list-empty state. Document it with real copy only after a production no-data case exists."}
        source="components/ui/EmptyState.tsx"
        status="backlog"
      />
    );
  }

  if (type === "zoom") {
    return (
      <DemoBlock className={styles.zoomableImageDemoShell} contextLabel={contextLabel ?? "Laushu / IterateSection"}>
        <div className="cs-page theme-laushu">
          <CaseMedia
            caption={zh ? "Laushu 設計迭代後的列表資料呈現區" : "Laushu iterated list data view"}
            className={styles.zoomableImageMediaDemo}
            variant="full"
          >
            <ZoomableImage
              alt={zh ? "Laushu 設計迭代後的列表資料呈現區" : "Laushu iterated list data view"}
              className={styles.zoomImageDemo}
              src="/projects/laushu/iterate/ui-list-after.png"
              width={1440}
              height={1024}
              labels={{ close: zh ? "關閉" : "Close", separator: ": ", zoom: zh ? "放大圖片" : "Zoom image" }}
              sizes="min(100vw, 760px)"
            />
          </CaseMedia>
        </div>
      </DemoBlock>
    );
  }

  return <p className={styles.demoFallback}>{zh ? "正式行為請參考連結的 production 原始碼。" : "Live behavior is visible in the linked production source."}</p>;
}
