"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AdvantechProposalTabs from "@/app/advantech/components/ProposalTabs";
import { proposalScenario1Tabs } from "@/app/advantech/data";
import { getAboutData } from "@/data/about";
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
import CaseBeforeAfter from "../case-study/CaseBeforeAfter";
import { BeforeAfterNarrativeFrame } from "../case-study/BeforeAfterNarrativeFrame";
import ZoomableImage from "../case-study/ZoomableImage";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "../ui/Accordion";
import { registerDesignSystemReturnTarget } from "./DesignSystemReturnBar";
import styles from "./DesignSystemExplorer.module.css";

const caseExamples = {
  en: {
    caseHeroTitle: "Giving Traders Back Control: Manual Close & Take-Profit / Stop-Loss Flow Design for a Quant Trading Platform",
    caseHeroMeta: "WEB · FinTech · Crypto · UX Design · UI Design",
    caseHeroItems: [
      ["Timeline", "2023.06 - 2023.08"],
      ["Team", "1 product owner · 1 UI/UX designer · 2 full-stack engineers"],
      ["Role", "UI/UX Designer"],
      ["Scope", "Secondary research · wireframes · prototype · handoff video"],
    ],
    sectionKicker: "Problem Definition",
    sectionTitle: "Users could see strategy PnL, but not the actual position state",
    sectionDescription: "The shared CaseSectionHeader keeps the kicker, title, and optional description consistent before route-specific diagrams or media appear.",
    cardTitle: "Supporting insight",
    cardBody: "Strategy traders needed to understand side, size, entry price, mark price, PnL, and TP / SL distance without leaving Crypto Arsenal.",
    cardMeta: "Crypto Arsenal / ProblemSection",
    gridTitle: "Three repeated pain cards",
    gridItems: ["Position state is unclear", "Manual close lacks confidence", "TP / SL setup needs stronger context"],
    mediaCaption: "CaseMedia wraps competitor screenshots and product UI while leaving crop, ratio, and storytelling geometry to the route.",
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
    caseHeroTitle: "重掌交易主控權：量化交易平台的手動平倉與止盈止損流程設計",
    caseHeroMeta: "WEB · FinTech · Crypto · UX Design · UI Design",
    caseHeroItems: [
      ["時間進程", "2023.06 - 2023.08"],
      ["團隊成員", "1 位產品負責人 · 1 位 UIUX 設計師 · 2 位全端工程師"],
      ["我的角色", "UIUX 設計師"],
      ["負責項目", "二手研究 · 線框稿 · 原型設計 · 設計交付影片"],
    ],
    sectionKicker: "問題定義",
    sectionTitle: "用戶痛點：整體策略賺賠看得到，倉位狀態卻看不見",
    sectionDescription: "CaseSectionHeader 統一 kicker、title 與 optional description，讓 route-specific diagram 或 media 出現前先建立清楚段落層級。",
    cardTitle: "Supporting insight",
    cardBody: "交易者需要在 Crypto Arsenal 裡直接理解倉位方向、數量、入場價、標記價、浮動盈虧，以及距離止盈 / 止損還有多遠。",
    cardMeta: "Crypto Arsenal / ProblemSection",
    gridTitle: "三張重複痛點卡",
    gridItems: ["倉位狀態不清楚", "手動平倉缺乏信心", "止盈止損設定需要更完整語境"],
    mediaCaption: "CaseMedia 負責包裝競品截圖與產品畫面；裁切比例、圖片重點與敘事幾何仍由 route 決定。",
    beforeTitle: "AI Chatbot 元件",
    flowTitle: "寬版分析 board 的 overflow affordance",
    flowBody: "FlowScrollHint 出現在 Advantech AI 功能矩陣與流程 board 這類寬版內容前，用來提示可以橫向滑動；它不是獨立視覺元件。",
    zoomCaption: "ZoomableImage 透過案例 media 與 lightbox wrapper 使用於真實產品截圖。",
    localExceptions: [
      "Advantech Board 2 / 3：SolutionSection 內的 route-local 多比較 board。",
      "CaseTOC：CaseStudyShell 裡受保護的浮動導覽。",
      "Laushu task flow：route-local diagram geometry 與 connector endpoints。",
      "Crypto matrix / FlowMatrixBoard：視覺敘事矩陣，不是 shared ARIA grid。",
    ],
  },
} satisfies Record<DesignSystemLocale, Record<string, string | string[] | string[][]>>;

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
  | "Shared case-study pattern"
  | "Route-local pattern"
  | "Internal anatomy"
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
      classification: "Extraction candidate",
      description: "Can be promoted later if the same structure repeats across independent routes.",
    },
  ],
  "zh-TW": [
    {
      classification: "Shared case-study pattern",
      description: "可在案例頁之間重複使用，但仍綁定 case-study reading flow 或案例頁模板。",
    },
    {
      classification: "Route-local pattern",
      description: "與特定故事、資料結構或 route composition 綁定。",
    },
    {
      classification: "Internal anatomy",
      description: "依附在 parent component 或 route section 下才有完整意義的內部組成。",
    },
    {
      classification: "Extraction candidate",
      description: "當同一結構跨獨立 route 重複出現時，可重新評估是否提升為 reusable component。",
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
      pattern: "CaseTOC",
      classification: "Shared case-study pattern",
      currentUsage: "CaseStudyShell across Advantech, Crypto Arsenal, and Laushu case routes.",
      boundary: "Navigation contract is scoped to case-study section anchors, scroll position, production visibility rules, and desktop floating layout.",
      extractionCondition: "Revisit only if another long-form product story needs the same floating anchor model and scroll behavior.",
      source: "components/CaseTOC.tsx",
      status: "Protected case-study navigation pattern",
      nextStep: "Keep visible in Navigation; standardize docs around production CaseTOC behavior.",
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
      boundary: "Routes adopt BeforeAfterNarrativeFrame; the exported panel renders labeled state panels inside that parent frame.",
      extractionCondition: "Revisit only if panel composition becomes a standalone shared contract outside the narrative frame.",
      source: "components/case-study/BeforeAfterPanel.tsx",
      status: "Internal part",
      nextStep: "Keep under BeforeAfterNarrativeFrame anatomy and boundary reference.",
    },
    {
      pattern: "CaseBeforeAfter",
      classification: "Extraction candidate",
      currentUsage: "Source-level case-study component; no direct route adoption found in current case routes.",
      boundary: "Independent two-panel comparison component. `.cs-before-after-panel` belongs to CaseBeforeAfter and is not a BeforeAfterNarrativeFrame selector.",
      extractionCondition: "Revisit if a live route adopts it repeatedly or if it needs a documented migration path.",
      source: "components/case-study/CaseBeforeAfter.tsx",
      status: "Source-level component",
      nextStep: "Keep documented as a candidate until production adoption changes.",
    },
  ],
  "zh-TW": [
    {
      pattern: "ProjectCard hover overlay",
      classification: "Route-local pattern",
      currentUsage: "首頁 / Selected Works。",
      boundary: "綁定 project metadata、cover、logo、tags、CTA 與作品探索用的 hover overlay anatomy。",
      extractionCondition: "只有當其他產品區塊也需要同一套專案卡片 anatomy、overlay 行為與 CTA model，才重新評估抽象化。",
      source: "components/Works.tsx",
      status: "Product-specific portfolio pattern",
      nextStep: "維持為 route-owned project card pattern。",
    },
    {
      pattern: "CaseTOC",
      classification: "Shared case-study pattern",
      currentUsage: "Advantech、Crypto Arsenal、Laushu case routes 的 CaseStudyShell。",
      boundary: "navigation contract 限定在案例頁 section anchors、scroll position、正式站 visibility rules 與桌機 floating layout。",
      extractionCondition: "只有當另一個長篇產品故事也需要相同 floating anchor model 與 scroll behavior，才重新評估。",
      source: "components/CaseTOC.tsx",
      status: "Protected case-study navigation pattern",
      nextStep: "保留在 Navigation，並持續以 production CaseTOC 行為為準整理文件。",
    },
    {
      pattern: "ScrollProgress",
      classification: "Shared case-study pattern",
      currentUsage: "在案例頁長篇內容中顯示閱讀進度，協助使用者理解目前瀏覽位置。",
      boundary: "它屬於案例頁 shell 行為，因為依賴整頁 scroll position、route 高度、viewport 行為與 fixed navigation offset；不是任務進度或任意流程的通用 Progress 元件。",
      extractionCondition: "只有當非案例頁也需要相同閱讀進度 affordance，且具備穩定 API 與共用 scroll model 時，才重新評估抽出。",
      source: "components/ScrollProgress.tsx / components/case-study/CaseStudyShell.tsx",
      status: "Case-study shell behavior",
      nextStep: "維持為 shared case-study pattern 文件。",
    },
    {
      pattern: "CaseNextNav",
      classification: "Shared case-study pattern",
      currentUsage: "放在案例頁結尾，引導讀者前往下一個專案。",
      boundary: "它屬於案例頁閱讀流程，依賴案例順序、locale-aware routes、project metadata 與案例模板結尾位置；不是通用 pagination、breadcrumb 或全站 navigation 元件。",
      extractionCondition: "只有當多個獨立內容區塊也需要相同 next-content navigation pattern，且不再只綁定案例頁時，才重新評估抽出。",
      source: "components/case-study/CaseStudyShell.tsx",
      status: "Case-study ending navigation pattern",
      nextStep: "維持為 shared case-study pattern 文件。",
    },
    {
      pattern: "CaseInfoCard",
      classification: "Shared case-study pattern",
      currentUsage: "在案例頁 overview 區塊呈現角色、時程、範圍、工具或專案背景等結構化 metadata。",
      boundary: "它屬於案例頁模板的組成結構，語意來自 case overview context，而不是通用 Card component contract。",
      extractionCondition: "只有當相同 metadata card contract 被多個獨立路由重用，且欄位、variants 與 accessibility requirements 穩定後，才重新評估抽出。",
      source: "components/case-study/CaseInfoGrid.tsx / components/case-study/CaseHero.tsx",
      status: "Case-study hero metadata anatomy",
      nextStep: "維持為 shared case-study pattern 文件。",
    },
    {
      pattern: "Advantech Board 2 / Board 3",
      classification: "Route-local pattern",
      currentUsage: "Advantech SolutionSection 的需量超約預警與設備能耗異常分析 scenario boards。",
      boundary: "multi-comparison layout、copy density、comparison axis 與 AI proposal evaluation 都和 Advantech business logic 綁定。",
      extractionCondition: "只有第二個以上案例出現相同結構與互動需求時，才考慮 componentize。",
      source: "app/advantech/sections/SolutionSection.tsx",
      status: "Project-specific visual board",
      nextStep: "在其他案例出現同結構前，維持 route composition。",
    },
    {
      pattern: "YearRail",
      classification: "Route-local pattern",
      currentUsage: "About route 的經歷時間軸。",
      boundary: "綁定 `.experience-card[data-year]`、About 頁 chronology、section anchors 與 scroll-reading behavior；不是通用 timeline 或 pagination 元件。",
      extractionCondition: "只有當另一個獨立 route 也需要相同 year-anchor rail，且具備共用語意、鍵盤期待與不綁特定 route 的 section mapping 時，才重新評估提升。",
      source: "components/YearRail.tsx / app/about-me/page.tsx",
      status: "About timeline navigation pattern",
      nextStep: "保留在 route-local boundary 文件中，不作為通用 Navigation visible component。",
    },
    {
      pattern: "Laushu task flow",
      classification: "Route-local pattern",
      currentUsage: "Laushu case route 的任務流程圖與 route-level flow CSS。",
      boundary: "diagram geometry、connector endpoints、min-width rules 與 step relationship 都和此專案流程綁定。",
      extractionCondition: "只有多個 route 需要同一套 diagram grammar，且不需要塞入 case-specific connector logic，才重新評估。",
      source: "app/laushu/components/TaskFlowDiagrams.tsx",
      status: "Story-specific flow visualization",
      nextStep: "維持為 route-owned diagram grammar。",
    },
    {
      pattern: "Crypto matrix / FlowMatrixBoard",
      classification: "Route-local pattern",
      currentUsage: "Crypto Arsenal ResearchSection 的平倉與 TP / SL flow analysis matrices。",
      boundary: "用來說明 crypto product risk / decision structure 的 visual storytelling matrix，不是 reusable data table contract。",
      extractionCondition: "只有重複案例需要同樣的矩陣語意、導覽與 accessibility contract，才重新評估。",
      source: "app/crypto-arsenal/components/FlowMatrixBoard.tsx",
      status: "Project-specific matrix",
      nextStep: "維持為 case-specific matrix pattern。",
    },
    {
      pattern: "BeforeAfterPanel",
      classification: "Internal anatomy",
      currentUsage: "BeforeAfterNarrativeFrame 的 internal part。",
      boundary: "正式 route 採用 BeforeAfterNarrativeFrame；exported panel 只在 parent frame 內渲染 labeled state panels。",
      extractionCondition: "只有 panel composition 離開 narrative frame 後成為獨立 shared contract，才重新評估。",
      source: "components/case-study/BeforeAfterPanel.tsx",
      status: "Internal part",
      nextStep: "保留在 BeforeAfterNarrativeFrame anatomy 與 boundary reference。",
    },
    {
      pattern: "CaseBeforeAfter",
      classification: "Extraction candidate",
      currentUsage: "source-level case-study component；目前 case routes 未找到 direct adoption。",
      boundary: "獨立兩欄比較元件。`.cs-before-after-panel` 屬於 CaseBeforeAfter，不是 BeforeAfterNarrativeFrame selector。",
      extractionCondition: "若 live route 重複採用，或需要正式 migration path，再重新評估。",
      source: "components/case-study/CaseBeforeAfter.tsx",
      status: "Source-level component",
      nextStep: "在 production adoption 改變前，保留為 candidate 文件。",
    },
  ],
} satisfies Record<DesignSystemLocale, BoundaryReferenceItem[]>;

function getCopy(locale: DesignSystemLocale) {
  const zh = locale === "zh-TW";

  return {
    contractOnly: zh ? "Contract-only：作品集目前沒有正式使用" : "Contract-only: no current live usage in portfolio",
    referenceStyle: zh ? "Reference-style example" : "Reference-style example",
    liveUsage: zh ? "真實使用位置" : "Live usage",
    source: zh ? "來源" : "Source",
    noLiveUsage: zh ? "目前正式作品集 route 尚未直接使用。" : "No current live usage in portfolio routes.",
    futureContract: zh ? "這個 contract 先保留給未來產品介面或維護一致性。" : "This contract exists for future product surfaces or maintenance consistency.",
    notProductionExample: zh ? "這不是目前正式站的 production example。" : "This is not a current production example.",
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

function CaseTocInteractiveDemo({ locale }: { locale: DesignSystemLocale }) {
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
    <section className={styles.caseTocDemo} aria-label={zh ? "CaseTOC production 視覺狀態" : "CaseTOC production visual state"}>
      <p className={styles.demoUsageLine}>{zh ? "真實使用位置：CaseStudyShell / Advantech case route" : "Real usage: CaseStudyShell / Advantech case route"}</p>
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
  );
}

export default function ComponentDemo({
  type,
  locale,
}: {
  type?: string;
  locale: DesignSystemLocale;
}) {
  const zh = locale === "zh-TW";
  const copy = getCopy(locale);
  const caseCopy = caseExamples[locale];
  const projects = getProjects(locale);
  const featuredProject = projects.find((project) => project.slug === "advantech") ?? projects[0];
  const comingSoonProject = projects.find((project) => project.status === "coming-soon");
  const contactData = getContactData(locale);
  const aboutData = getAboutData(locale);
  const firstSkill = aboutData.skillCategories[0];
  const firstExperience = aboutData.experiences[0];
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
    return <p className={styles.demoFallback}>{zh ? "此 pattern 以正式作品集使用情境為準。" : "This pattern is documented from its live portfolio usage."}</p>;
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
      <div className={styles.buttonSpecDemo}>
        <div className={styles.buttonSpecRow} data-button-spec-row>
          <div className={styles.buttonSpecMeta}>
            <p>{zh ? "主要導覽" : "Primary navigation"}</p>
            <span>{zh ? "Hero 導覽 / route anchor" : "Hero navigation / route anchor"}</span>
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
      </div>
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
      <section className={styles.languageSwitcherDemo}>
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
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="m2.5 4.5 3.5 3 3.5-3" />
              </svg>
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

      </section>
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
    const id = type === "textarea" ? "message" : "email";
    const label = type === "textarea"
      ? zh ? "訊息內容" : "Your message"
      : zh ? "電子信箱" : "Email";

    return (
      <div className={styles.contactFieldDemo}>
        <p className={styles.demoUsageLine}>{zh ? "Contact page / contact form" : "Contact page / contact form"}</p>
        <label className={styles.liveFloatingField} htmlFor={`demo-${id}`}>
          {type === "textarea" ? (
            <textarea id={`demo-${id}`} name={id} placeholder=" " rows={4} defaultValue={zh ? "想聊聊作品集、產品設計或 AI 協作。" : "I would like to talk about portfolio work, product design, or AI collaboration."} />
          ) : (
            <input id={`demo-${id}`} name={id} type="email" placeholder=" " defaultValue={contactData.email} />
          )}
          <span>{label}</span>
        </label>
      </div>
    );
  }

  if (type === "select") {
    return (
      <ContractOnlyCard
        locale={locale}
        title={zh ? "Select contract 尚未進入正式作品集" : "Select contract is not in the live portfolio yet"}
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
        title={zh ? "Checkbox contract 目前只保留為候選" : "Checkbox contract is currently a candidate"}
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
        title={zh ? "Radio contract 尚未有正式使用情境" : "Radio contract has no current production context"}
        recommendation={zh ? "只有當未來表單出現少量互斥選項，且真的能降低填寫成本時，才導入 production。" : "Introduce it only when a future form has a small set of mutually exclusive options and the control genuinely reduces form effort."}
        source="components/ui/Radio.tsx"
        status="candidate"
      />
    );
  }

  if (type === "tabs") {
    const tabs = [
      { value: "enterprise", label: zh ? "企業應用" : "Industry Projects" },
      { value: "school", label: zh ? "學校產出" : "Academic & Side Projects" },
    ];

    return (
      <div className={styles.worksTabsDemo}>
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
                      <span className={styles.tabsWireframeThumb} />
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
      </div>
    );
  }

  if (type === "case-toc") {
    return <CaseTocInteractiveDemo key={locale} locale={locale} />;
  }

  if (type === "accordion") {
    const items = zh
      ? [["foundations", "基礎規範", "色彩、字級、間距與 motion token。"], ["components", "元件", "以 production code 為準的元件狀態與使用方式。"]]
      : [["foundations", "Foundations", "Color, type, spacing, and motion tokens."], ["components", "Components", "States and usage documented from production code."]];

    return (
      <Accordion style={{ width: "100%", maxWidth: "480px" }} defaultValue="foundations" type="single">
        {items.map(([value, title, body]) => (
          <AccordionItem key={value} value={value}>
            <AccordionHeader>{title}</AccordionHeader>
            <AccordionPanel>
              <p>{body}</p>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  if (type === "contact-method") {
    return (
      <div className={styles.contactMethodsDemo}>
        <article>
          <small>{zh ? "電子信箱" : "Email"}</small>
          <strong>{contactData.email}</strong>
          <Button size="sm" variant="secondary">{zh ? "複製" : "Copy"}</Button>
        </article>
        <article>
          <small>{zh ? "電話" : "Phone"}</small>
          <strong>{contactData.phone}</strong>
          <Button size="sm" variant="secondary">{zh ? "複製" : "Copy"}</Button>
        </article>
      </div>
    );
  }

  if (type === "project-card") {
    return (
      <div className={styles.projectCardLiveWrap}>
        <p className={styles.demoUsageLine}>Homepage / Selected Works</p>
        <div className={`projects-list ${styles.projectCardLivePreview}`}>
          <ProjectCard project={featuredProject} />
          {comingSoonProject ? <ProjectCard project={comingSoonProject} /> : null}
        </div>
      </div>
    );
  }

  if (type === "section-heading") {
    return (
      <div className={styles.liveSectionHeadingDemo}>
        <span /><h3>{zh ? "精選案例" : "Selected Work"}</h3><span />
      </div>
    );
  }

  if (type === "tags") {
    return (
      <div className={styles.liveTagDemo}>
        {featuredProject.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    );
  }

  if (type === "social-link") {
    return (
      <div className={styles.liveSocialLinks}>
        <a href={contactData.socials.linkedin.href} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <Image src="/social/linkedin-gray-v2.png" alt="" width={40} height={40} />
        </a>
        <a href={contactData.socials.github.href} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
          <Image src="/social/github-gray-v2.png" alt="" width={40} height={40} />
        </a>
      </div>
    );
  }

  if (type === "skill-card") {
    return (
      <article className={styles.liveSkillCardDemo}>
        <p>{zh ? "About / 專業技能" : "About / Skills"}</p>
        <h3>{firstSkill.title}</h3>
        <ul>
          {firstSkill.skills.slice(0, 5).map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </article>
    );
  }

  if (type === "experience-card") {
    return (
      <article className={styles.liveExperienceCardDemo}>
        <div className={styles.experienceImageDemo}>
          <Image src={firstExperience.image} alt="" fill sizes="240px" />
        </div>
        <div>
          <p>{firstExperience.year}</p>
          <h3>{firstExperience.title}</h3>
          <strong>{firstExperience.role}</strong>
          <span>{firstExperience.date}</span>
        </div>
      </article>
    );
  }

  if (type === "hero-badge") {
    return <div className={styles.liveHeroBadgeDemo}>{zh ? "可接案 / 產品設計與 AI 協作" : "Available / Product design and AI collaboration"}</div>;
  }

  if (type === "case-hero") {
    return (
      <article className={styles.caseHeroDemo}>
        <div className={styles.caseHeroMediaDemo}>
          <Image src="/projects/crypto-arsenal/cover/hero-cover.webp" alt="" fill sizes="720px" loading="eager" />
        </div>
        <div className={styles.caseHeroCopyDemo}>
          <p>{caseCopy.caseHeroMeta}</p>
          <h3>{caseCopy.caseHeroTitle}</h3>
          <div className={styles.caseInfoGridDemo}>
            {caseCopy.caseHeroItems.map(([label, value]) => (
              <article key={label}>
                <small>{label}</small>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
        </div>
      </article>
    );
  }

  if (type === "case-section") {
    return (
      <section className={styles.caseSectionDemo}>
        <p className={styles.demoUsageLine}>Crypto Arsenal / ProblemSection</p>
        <header className={styles.caseSectionHeaderDemo}>
          <span>{caseCopy.sectionKicker}</span>
          <h3>{caseCopy.sectionTitle}</h3>
          <p>{caseCopy.sectionDescription}</p>
        </header>
      </section>
    );
  }

  if (type === "case-section-header") {
    return (
      <section className={styles.caseSectionDemo}>
        <p className={styles.demoUsageLine}>Crypto Arsenal / CaseSectionHeader</p>
        <header className={styles.caseSectionHeaderDemo}>
          <span>{caseCopy.sectionKicker}</span>
          <h3>{caseCopy.sectionTitle}</h3>
          <p>{caseCopy.sectionDescription}</p>
        </header>
      </section>
    );
  }

  if (type === "case-card") {
    return (
      <article className={styles.caseCardDemo}>
        <p className={styles.demoUsageLine}>{caseCopy.cardMeta}</p>
        <h3>{caseCopy.cardTitle}</h3>
        <p>{caseCopy.cardBody}</p>
        <span>{zh ? "responsibility: insight / decision / evidence / structured content" : "responsibility: insight / decision / evidence / structured content"}</span>
      </article>
    );
  }

  if (type === "case-grid") {
    return (
      <section className={styles.caseGridDemo}>
        <p className={styles.demoUsageLine}>Crypto Arsenal / ProblemSection</p>
        <h3>{caseCopy.gridTitle}</h3>
        <div>
          {caseCopy.gridItems.map((item, index) => (
            <article className={styles.caseCardDemo} key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (type === "case-media") {
    return (
      <figure className={styles.caseMediaDemo}>
        <div className={styles.caseMediaFrameDemo}>
          <Image src="/projects/crypto-arsenal/final/final-close-position.webp" alt="" fill sizes="720px" />
        </div>
        <figcaption>{caseCopy.mediaCaption}</figcaption>
      </figure>
    );
  }

  if (type === "case-before-after") {
    return (
      <section className={styles.beforeAfterSourceDemo}>
        <div className="cs-page">
          <CaseBeforeAfter
            beforeLabel="Before"
            afterLabel="After"
            before={
              <div className={styles.beforeAfterStateSlot}>
                <strong>Baseline layout</strong>
                <span>{zh ? "資訊密度偏高" : "Dense layout"}</span>
              </div>
            }
            after={
              <div className={styles.beforeAfterStateSlot}>
                <strong>Refined layout</strong>
                <span>{zh ? "層級更清楚" : "Clearer hierarchy"}</span>
              </div>
            }
          />
        </div>
      </section>
    );
  }

  if (type === "before-after-narrative") {
    return (
      <section className={styles.beforeAfterNarrativeDemo}>
        <div className="cs-page">
          <BeforeAfterNarrativeFrame
            badge="Scenario 1"
            title={caseCopy.beforeTitle}
            beforeLabel="Before"
            afterLabel="After"
            before={
              <div className={styles.beforeAfterMediaSlot}>
                <div className={styles.beforeAfterImageDemo}>
                  <Image src="/projects/advantech/solution/iter-chatbot-before.webp" alt="" fill sizes="320px" />
                </div>
                <strong>360px</strong>
              </div>
            }
            after={
              <div className={styles.beforeAfterMediaSlot}>
                <div className={styles.beforeAfterImageDemo}>
                  <Image src="/projects/advantech/solution/iter-chatbot-after.webp" alt="" fill sizes="320px" />
                </div>
                <strong>640px</strong>
              </div>
            }
          />
        </div>
      </section>
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
      <section className={styles.flowHintDemo}>
        <p className={styles.demoUsageLine}>Advantech / AnalysisSection · ProcessSection · ScenarioSection</p>
        <h3>{caseCopy.flowTitle}</h3>
        <p>{caseCopy.flowBody}</p>
        <div className={styles.flowHintStripDemo} aria-hidden="true">
          <span>{zh ? "設備管理" : "Equipment"}</span>
          <span>{zh ? "現有 WISE iEMS AI 功能" : "Current WISE iEMS AI features"}</span>
          <span>{zh ? "EMS 競品 AI 模組" : "EMS competitor AI modules"}</span>
          <span>{zh ? "可發展機會點" : "Opportunity"}</span>
        </div>
      </section>
    );
  }

  if (type === "proposal-tabs") {
    return (
      <div className={`${styles.proposalTabsDemo} theme-advantech`}>
        <p className={styles.demoUsageLine}>Advantech / SolutionSection / Scenario 1</p>
        <AdvantechProposalTabs defaultTab={1} tabs={proposalScenario1Tabs} />
      </div>
    );
  }

  if (type === "alert") {
    return (
      <ContractOnlyCard
        locale={locale}
        title={zh ? "Alert contract 目前沒有獨立 live usage" : "Alert contract has no standalone live usage yet"}
        recommendation={zh ? "Contact form 若未來需要可持續顯示的錯誤摘要，可以先導入 production；目前 Toast 已承擔送出成功 / 失敗回饋。" : "If the Contact form later needs a persistent error summary, implement it in production first. Today, Toast already handles send success and failure feedback."}
        source="components/ui/Alert.tsx"
        status="contract-only"
      />
    );
  }

  if (type === "toast") {
    return (
      <div className={styles.contactToastDemo}>
        <p className={styles.demoUsageLine}>{zh ? "Contact 送出結果" : "Contact submit result"}</p>
        <div className={styles.contactToastPreviewGrid}>
          <div className={styles.contactToastPreviewSlot}>
            <Toast message={copy.contactToastSuccess} tone="success" duration={600000} onClose={() => undefined} />
          </div>
          <div className={styles.contactToastPreviewSlot}>
            <Toast message={copy.contactToastError} tone="error" duration={600000} onClose={() => undefined} />
          </div>
        </div>
      </div>
    );
  }

  if (type === "modal") {
    const modal = copy.modalDemo;

    return (
      <div className={styles.contactModalDemo}>
        <p className={styles.demoUsageLine}>{modal.usage}</p>
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
      </div>
    );
  }

  if (type === "skeleton") {
    const skeleton = copy.skeletonDemo;

    return (
      <div className={styles.contactModalDemo}>
        <p className={styles.demoUsageLine}>{skeleton.usage}</p>
        <article className={styles.contactModalFrame} aria-label={skeleton.title}>
          <header className={styles.contactModalHeader}>
            <div>
              <h3>{skeleton.title}</h3>
              <p>{skeleton.description}</p>
            </div>
            <span aria-hidden="true" className={styles.contactModalClose}>×</span>
          </header>
          <dl className={styles.contactReviewListDemo} aria-busy="true">
            <div className={styles.contactReviewRowDemo}>
              <dt>{zh ? "你的姓名" : "Your name"}</dt>
              <dd><Skeleton className={styles.contactSkeletonLine} /></dd>
            </div>
            <div className={styles.contactReviewRowDemo}>
              <dt>{zh ? "電子信箱" : "Email"}</dt>
              <dd><Skeleton className={styles.contactSkeletonLine} /></dd>
            </div>
            <div className={styles.contactReviewRowDemo}>
              <dt>{zh ? "訊息內容" : "Your message"}</dt>
              <dd className={styles.contactSkeletonStack}>
                <Skeleton className={styles.contactSkeletonLineLong} />
                <Skeleton className={styles.contactSkeletonLineMedium} />
              </dd>
            </div>
          </dl>
          <div className={styles.contactReviewActionsDemo}>
            <Button type="button" loading loadingLabel={skeleton.confirm} className={styles.contactReviewPrimaryDemo}>
              {skeleton.confirm}
            </Button>
            <Button type="button" variant="secondary" disabled>{skeleton.cancel}</Button>
          </div>
        </article>
      </div>
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
      <figure className={styles.caseMediaDemo}>
        <div className={styles.zoomImageDemo}>
          <ZoomableImage
            alt={zh ? "Crypto Arsenal 最終平倉流程介面" : "Crypto Arsenal final close-position flow UI"}
            src="/projects/crypto-arsenal/final/final-close-position.webp"
            width={1440}
            height={900}
            labels={{ close: zh ? "關閉" : "Close", separator: ": ", zoom: zh ? "放大圖片" : "Zoom image" }}
          />
        </div>
        <figcaption>{caseCopy.zoomCaption}</figcaption>
      </figure>
    );
  }

  return <p className={styles.demoFallback}>{zh ? "正式行為請參考連結的 production source。" : "Live behavior is visible in the linked production source."}</p>;
}
