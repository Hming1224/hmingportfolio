"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getAboutData } from "@/data/about";
import { getContactData } from "@/data/contact";
import { getProjects } from "@/data/projects";
import type { DesignSystemLocale } from "@/lib/design-system-docs";
import ProjectCard from "../ProjectCard";
import Button from "../ui/Button";
import { Skeleton } from "../ui/Skeleton";
import { Toast } from "../ui/Toast";
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
    beforeBody: "Advantech Board 1 uses BeforeAfterNarrativeFrame to compare a 360px chat window against a 640px version that better supports detailed analysis.",
    beforePoint: "The shared frame owns the narrative shell and panels; the route owns screenshots, redlines, and the specific design judgment.",
    panelInternal: "Internal-only anatomy",
    panelBody: "The exported BeforeAfterPanel renders labeled state panels inside BeforeAfterNarrativeFrame. Routes adopt the narrative frame, not this panel as a standalone production pattern.",
    caseBeforeAfterBody: "CaseBeforeAfter is an independent two-panel comparison component with no current direct route adoption in Advantech, Crypto Arsenal, or Laushu. Its `.cs-before-after-panel` selector belongs to this component boundary, not BeforeAfterNarrativeFrame.",
    flowTitle: "Overflow affordance for wide analysis boards",
    flowBody: "FlowScrollHint appears before wide content such as Advantech AI feature matrices and process boards. It signals horizontal overflow; it is not a standalone visual component.",
    proposalTitle: "Advantech proposal tabs",
    proposalTabs: ["Proposal 1: Alert bar", "Proposal 2: System notification · adopted", "Proposal 3: Chart button · adopted"],
    proposalBody: "Scenario 1 compares notification patterns for overage risk analysis. The adopted variants are marked with text and visual state.",
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
    beforeBody: "Advantech Board 1 使用 BeforeAfterNarrativeFrame，比較 360px 聊天視窗與更適合閱讀詳細分析的 640px 版本。",
    beforePoint: "共用 frame 負責敘事外殼與 panel；route 負責截圖、redline 與具體設計判斷。",
    panelInternal: "Internal-only anatomy",
    panelBody: "exported BeforeAfterPanel 只負責在 BeforeAfterNarrativeFrame 內呈現 labeled state panels。正式 route 採用的是 narrative frame，不是把這個 panel 當成獨立 production pattern。",
    caseBeforeAfterBody: "CaseBeforeAfter 是獨立的兩欄比較元件；Advantech、Crypto Arsenal、Laushu 目前正式案例頁沒有直接使用。它的 `.cs-before-after-panel` selector 屬於自己的 component boundary，不屬於 BeforeAfterNarrativeFrame。",
    flowTitle: "寬版分析 board 的 overflow affordance",
    flowBody: "FlowScrollHint 出現在 Advantech AI 功能矩陣與流程 board 這類寬版內容前，用來提示可以橫向滑動；它不是獨立視覺元件。",
    proposalTitle: "Advantech proposal tabs",
    proposalTabs: ["提案一：警示通知欄", "提案二：系統通知 · 採用", "提案三：圖表按鈕 · 採用"],
    proposalBody: "Scenario 1 比較需量超約分析的通知入口，採用方案需要同時用文字與視覺狀態標記。",
    zoomCaption: "ZoomableImage 透過案例 media 與 lightbox wrapper 使用於真實產品截圖。",
    localExceptions: [
      "Advantech Board 2 / 3：SolutionSection 內的 route-local 多比較 board。",
      "CaseTOC：CaseStudyShell 裡受保護的浮動導覽。",
      "Laushu task flow：route-local diagram geometry 與 connector endpoints。",
      "Crypto matrix / FlowMatrixBoard：視覺敘事矩陣，不是 shared ARIA grid。",
    ],
  },
} satisfies Record<DesignSystemLocale, Record<string, string | string[] | string[][]>>;

const localExceptionExamples = {
  en: [
    {
      pattern: "ProjectCard hover overlay",
      liveUsage: "Homepage / Selected Works (`components/Works.tsx`)",
      whyLocal: "It is bound to project metadata, cover media, logo, tags, CTA, and the protected hover overlay anatomy for portfolio exploration.",
      boundary: "Local / product-specific pattern. It is not a generic Card because removing project storytelling context would weaken the interaction contract.",
      extraction: "Revisit only if another product surface needs the same project-story card anatomy, overlay behavior, and CTA model.",
    },
    {
      pattern: "CaseTOC",
      liveUsage: "CaseStudyShell across Advantech, Crypto Arsenal, and Laushu case routes (`components/CaseTOC.tsx`).",
      whyLocal: "It is shaped by long-form case reading, section anchors, scroll position, and production visibility rules. On desktop it floats beside the case body; at the production narrow breakpoint it stays hidden.",
      boundary: "Protected case-study navigation pattern, local to the case-study reading experience. It is not part of the live component examples and should not be wrapped into a generic docs TOC.",
      extraction: "Revisit only if another long-form product story needs the same floating anchor model and scroll behavior.",
    },
    {
      pattern: "Advantech Board 2 / Board 3",
      liveUsage: "Advantech case route, SolutionSection scenario boards for overage warning and abnormal energy analysis.",
      whyLocal: "The multi-comparison layout, copy density, comparison axes, and AI proposal evaluation are tied to this case's business logic.",
      boundary: "Project-specific visual board, not a shared component contract.",
      extraction: "Componentize only when a second case repeats the same structure and interaction needs.",
    },
    {
      pattern: "Laushu task flow",
      liveUsage: "Laushu case route task-flow diagrams and route-local flow CSS.",
      whyLocal: "Diagram geometry, connector endpoints, min-width rules, and step relationships are bound to this project flow.",
      boundary: "Route-local diagram and story-specific flow visualization, not part of the shared component library.",
      extraction: "Revisit only if multiple routes need the same diagram grammar without case-specific connector logic.",
    },
    {
      pattern: "Crypto matrix / FlowMatrixBoard",
      liveUsage: "Crypto Arsenal ResearchSection matrices for close-position and TP / SL flow analysis.",
      whyLocal: "It is a visual storytelling matrix for crypto product risk and decision structure, not a reusable data table.",
      boundary: "Project-specific matrix and visual storytelling pattern, not a shared ARIA grid or data grid contract.",
      extraction: "Revisit only if repeated cases need the same matrix semantics, navigation, and accessibility contract.",
    },
    {
      pattern: "BeforeAfterPanel",
      liveUsage: "Internal part of BeforeAfterNarrativeFrame (`components/case-study/BeforeAfterPanel.tsx`).",
      whyLocal: "Routes adopt BeforeAfterNarrativeFrame; the exported panel only renders labeled state panels inside that frame.",
      boundary: "Internal-only anatomy. It is not directly route-adopted and not exposed as an independent route-level pattern.",
      extraction: "Revisit only if panel composition becomes a standalone shared contract outside the narrative frame.",
    },
    {
      pattern: "CaseBeforeAfter",
      liveUsage: "Component exists in `components/case-study/CaseBeforeAfter.tsx`; rg found no direct route adoption in current case routes.",
      whyLocal: "It remains an independent simple two-panel comparison component and has not been refactored into BeforeAfterNarrativeFrame.",
      boundary: "No current direct route adoption. `.cs-before-after-panel` belongs to CaseBeforeAfter and is not a BeforeAfterNarrativeFrame selector.",
      extraction: "Revisit if a live route adopts it repeatedly or if it needs a documented migration path.",
    },
  ],
  "zh-TW": [
    {
      pattern: "ProjectCard hover overlay",
      liveUsage: "首頁 / Selected Works（`components/Works.tsx`）",
      whyLocal: "它綁定 project metadata、cover、logo、tags、CTA 與作品探索用的 hover overlay anatomy。",
      boundary: "Local / product-specific pattern。它不是 generic Card，否則會失去 project storytelling context。",
      extraction: "只有當其他產品區塊也需要同一套專案卡片 anatomy、overlay 行為與 CTA model，才重新評估抽象化。",
    },
    {
      pattern: "CaseTOC",
      liveUsage: "Advantech、Crypto Arsenal、Laushu case routes 的 CaseStudyShell（`components/CaseTOC.tsx`）。",
      whyLocal: "它依案例頁長篇閱讀、section anchor、scroll position 與正式站 visibility rules 設計；桌機浮在案例正文旁，窄版斷點維持隱藏。",
      boundary: "Protected case-study navigation pattern，屬於 case-study reading experience。它不放在 live component examples，也不應包裝成 generic docs TOC。",
      extraction: "只有當另一個長篇產品故事也需要相同 floating anchor model 與 scroll behavior，才重新評估。",
    },
    {
      pattern: "Advantech Board 2 / Board 3",
      liveUsage: "Advantech case route 的 SolutionSection，需量超約預警與設備能耗異常分析 scenario boards。",
      whyLocal: "multi-comparison layout、copy density、comparison axis 與 AI proposal evaluation 都和此案例的 business logic 綁定。",
      boundary: "Project-specific visual board，不是 shared component contract。",
      extraction: "只有第二個以上案例出現相同結構與互動需求時，才考慮 componentize。",
    },
    {
      pattern: "Laushu task flow",
      liveUsage: "Laushu case route 的任務流程圖與 route-local flow CSS。",
      whyLocal: "diagram geometry、connector endpoints、min-width rules 與 step relationship 都和此專案流程綁定。",
      boundary: "Route-local diagram 與 story-specific flow visualization，不屬於 shared component library。",
      extraction: "只有多個 route 需要同一套 diagram grammar，且不需要塞入 case-specific connector logic，才重新評估。",
    },
    {
      pattern: "Crypto matrix / FlowMatrixBoard",
      liveUsage: "Crypto Arsenal ResearchSection 的平倉與 TP / SL flow analysis matrices。",
      whyLocal: "它是用來說明 crypto product risk / decision structure 的 visual storytelling matrix，不是可重用資料表格。",
      boundary: "Project-specific matrix 與 visual storytelling pattern，不是 shared ARIA grid 或 data grid contract。",
      extraction: "只有重複案例需要同樣的矩陣語意、導覽與 accessibility contract，才重新評估。",
    },
    {
      pattern: "BeforeAfterPanel",
      liveUsage: "BeforeAfterNarrativeFrame 的 internal part（`components/case-study/BeforeAfterPanel.tsx`）。",
      whyLocal: "正式 route 採用 BeforeAfterNarrativeFrame；exported panel 只負責在 frame 內呈現 labeled state panels。",
      boundary: "Internal-only anatomy。它沒有被 route 直接採用，也不是獨立 route-level pattern。",
      extraction: "只有 panel composition 離開 narrative frame 後成為獨立 shared contract，才重新評估。",
    },
    {
      pattern: "CaseBeforeAfter",
      liveUsage: "元件存在於 `components/case-study/CaseBeforeAfter.tsx`；rg 未找到目前 case routes 的直接 adoption。",
      whyLocal: "它仍是獨立的簡單兩欄比較元件，尚未 refactor 成 BeforeAfterNarrativeFrame。",
      boundary: "目前沒有直接 route adoption。`.cs-before-after-panel` 屬於 CaseBeforeAfter，不是 BeforeAfterNarrativeFrame selector。",
      extraction: "若 live route 重複採用，或需要正式 migration path，再重新評估。",
    },
  ],
} satisfies Record<DesignSystemLocale, Array<Record<"pattern" | "liveUsage" | "whyLocal" | "boundary" | "extraction", string>>>;

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
      usage: zh ? "Contact form / 送出前確認" : "Contact form / review-before-submit",
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
      flow: zh
        ? [
            "Real usage：Contact form",
            "Purpose：送出前確認訊息內容",
            "Flow：送出訊息 → 確認 Modal → 確認送出 → Toast 成功 / 失敗",
            "Boundary：Modal 不負責結果回饋，結果由 Toast 承擔",
            "Accessibility：primary action DOM order 已與 keyboard order 對齊",
          ]
        : [
            "Real usage: Contact form",
            "Purpose: review message before sending",
            "Flow: Send Message → Review Modal → Confirm Send → Toast success / error",
            "Boundary: Modal does not own result feedback; Toast handles the outcome",
            "Accessibility: primary action DOM order matches keyboard order",
          ],
    },
    skeletonDemo: {
      usage: zh ? "Contact confirmation Modal / pending summary" : "Contact confirmation Modal / pending summary",
      title: zh ? "確認送出內容" : "Review your message",
      description: zh ? "送出中，摘要區暫時顯示處理狀態。" : "Sending; the summary area temporarily shows a processing state.",
      confirm: zh ? "送出中..." : "Sending...",
      cancel: zh ? "返回修改" : "Cancel",
      notes: zh
        ? [
            "Real usage：Contact confirmation Modal pending state",
            "Purpose：確認送出後，告訴使用者表單仍在處理中",
            "Boundary：Skeleton 只支援 summary area，不取代 Button loading",
            "Result：完成後由 Toast 顯示成功或失敗",
          ]
        : [
            "Real usage: Contact confirmation Modal pending state",
            "Purpose: show the submission is still processing",
            "Boundary: Skeleton supports the summary area; it does not replace Button loading",
            "Result: Toast shows success or failure when processing completes",
          ],
    },
    localExceptionFields: {
      liveUsage: zh ? "真實使用位置" : "Live usage",
      whyLocal: zh ? "為什麼保留 local" : "Why it stays local",
      boundary: zh ? "shared component 邊界" : "Shared boundary",
      extraction: zh ? "什麼情況才重新評估抽象化" : "Extraction condition",
    },
  };
}

function ReferenceCard({
  title,
  description,
  items,
  locale,
}: {
  title: string;
  description: string;
  items: string[];
  locale: DesignSystemLocale;
}) {
  const copy = getCopy(locale);

  return (
    <article className={styles.demoReferenceCard}>
      <p className={styles.demoBadge}>{copy.referenceStyle}</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
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
  const [toastVisible, setToastVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("enterprise");
  const [activeProposal, setActiveProposal] = useState(1);
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
          <p>Link Button</p>
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
          <p>CTA Button(Default)</p>
          <div className={styles.buttonSpecControls}>
            <Button className={styles.buttonSpecCta} onClick={() => undefined} size="lg" type="button">
              {zh ? "了解更多" : "Learn More"}
            </Button>
          </div>
        </div>
        <div className={styles.buttonSpecRow} data-button-spec-row>
          <p>CTA Button(Disabled)</p>
          <div className={styles.buttonSpecControls}>
            <Button className={styles.buttonSpecCta} size="lg" disabled>
              {zh ? "即將上線" : "Coming Soon"}
            </Button>
          </div>
        </div>
        <div className={styles.buttonSpecRow} data-button-spec-row>
          <p>CTA Button(Processing)</p>
          <div className={styles.buttonSpecControls}>
            <Button className={styles.buttonSpecCta} loading loadingLabel={zh ? "傳送中..." : "Sending..."}>
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
      ? ["Selected Work", "About", "Design System", "Contact", "Resume"]
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

        <ul className={styles.languageUsageNotes}>
          <li>{demoZh ? "真實使用位置：全站 Navbar" : "Real usage: global site header"}</li>
          <li>{demoZh ? "行為：正式站切換語言時會保留目前 route 與 hash" : "Behavior: preserves the current route and hash when switching locale in production"}</li>
          <li>{demoZh ? "狀態：closed / open / selected / loading" : "States: closed / open / selected / loading"}</li>
        </ul>
      </section>
    );
  }

  if (type === "navbar") {
    return (
      <ReferenceCard
        locale={locale}
        title={zh ? "真實 Navbar 是全站唯一導覽外殼" : "The real Navbar is the single global navigation shell"}
        description={zh ? "它負責品牌入口、主要頁面導覽、履歷入口與語系切換。" : "It carries the brand entry, primary page navigation, resume access, and locale switching."}
        items={[
          zh ? "主要連結：Projects、About、Design System、Contact、Resume" : "Primary links: Projects, About, Design System, Contact, Resume",
          ...copy.navbarBehavior,
        ]}
      />
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

  if (type === "scroll-progress") {
    return (
      <div style={{ width: "100%", maxWidth: "300px" }}>
        <div><span /></div>
        <p>{zh ? "目前閱讀進度 64%" : "Current reading progress: 64%"}</p>
      </div>
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
    const activeProjects = projects.filter((project) => project.category === activeTab);

    return (
      <div className={styles.worksTabsDemo}>
        <div className={styles.demoUsageLine}>Homepage / Selected Work</div>
        <div className={styles.liveTabsList} role="tablist" aria-label={zh ? "精選案例分類" : "Selected Work categories"}>
          {tabs.map((tab) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === tab.value}
              className={activeTab === tab.value ? styles.isSelectedDemoTab : undefined}
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.liveTabsPanel} role="tabpanel">
          {activeProjects.slice(0, 2).map((project) => (
            <article className={styles.tabProjectSummary} key={project.slug}>
              <strong>{project.navigationTitle ?? project.title}</strong>
              <span>{project.status === "coming-soon" ? (zh ? "即將上線" : "Coming Soon") : project.date}</span>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (type === "year-rail") {
    return (
      <div className={styles.yearRailDemo}>
        <nav className={styles.liveYearRail} aria-label={zh ? "About 經歷年份" : "About experience years"}>
          {aboutData.experienceYears.map((year) => (
            <a className={year === firstExperience.year ? styles.isActiveYear : undefined} href="#preview" key={year}>{year}</a>
          ))}
        </nav>
        <article className={styles.liveExperienceSummary}>
          <time>{firstExperience.year}</time>
          <h3>{firstExperience.title}</h3>
          <p>{firstExperience.role}</p>
          <span>{firstExperience.date}</span>
        </article>
      </div>
    );
  }

  if (type === "case-next-nav") {
    return (
      <div style={{ display: "flex", gap: "16px", justifyContent: "space-between", width: "100%" }}>
        <Button variant="secondary">← {zh ? "返回首頁" : "Back home"}</Button>
        <Button>{zh ? "下一個專案" : "Next project"} →</Button>
      </div>
    );
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
      <ReferenceCard
        locale={locale}
        title={zh ? "CaseBeforeAfter 是獨立元件，目前沒有直接 route adoption" : "CaseBeforeAfter is independent with no current direct route adoption"}
        description={caseCopy.caseBeforeAfterBody}
        items={[
          "components/case-study/CaseBeforeAfter.tsx",
          zh ? "目前 Advantech / Crypto Arsenal / Laushu 正式案例頁沒有直接使用" : "No current direct route adoption in Advantech / Crypto Arsenal / Laushu",
          ".cs-before-after-panel belongs to CaseBeforeAfter",
          zh ? "邊界：不是 BeforeAfterNarrativeFrame 的替代元件，也不作為 live route example 呈現" : "Boundary: not a BeforeAfterNarrativeFrame replacement or live route example",
        ]}
      />
    );
  }

  if (type === "before-after-narrative") {
    return (
      <section className={styles.beforeAfterNarrativeDemo}>
        <p className={styles.demoUsageLine}>Advantech / SolutionSection / Board 1</p>
        <div className={styles.beforeAfterHeaderDemo}>
          <span>Scenario 1</span>
          <h3>{caseCopy.beforeTitle}</h3>
          <p>{caseCopy.beforeBody}</p>
        </div>
        <div className={styles.beforeAfterPointDemo}>
          <strong>{zh ? "修正視窗寬度" : "Window width refinement"}</strong>
          <p>{caseCopy.beforePoint}</p>
        </div>
        <div className={styles.beforeAfterPanelsDemo}>
          <article>
            <span>Before</span>
            <div className={styles.beforeAfterImageDemo}>
              <Image src="/projects/advantech/solution/iter-chatbot-before.webp" alt="" fill sizes="320px" />
            </div>
            <strong>360px</strong>
          </article>
          <article>
            <span>After</span>
            <div className={styles.beforeAfterImageDemo}>
              <Image src="/projects/advantech/solution/iter-chatbot-after.webp" alt="" fill sizes="320px" />
            </div>
            <strong>640px</strong>
          </article>
        </div>
      </section>
    );
  }

  if (type === "before-after-panel") {
    return (
      <ReferenceCard
        locale={locale}
        title={caseCopy.panelInternal}
        description={caseCopy.panelBody}
        items={[
          "components/case-study/BeforeAfterPanel.tsx",
          zh ? "供 BeforeAfterNarrativeFrame 內部 state panels 使用" : "Used inside BeforeAfterNarrativeFrame state panels",
          zh ? "沒有 direct route adoption，也不是 standalone production pattern" : "No direct route adoption; not a standalone production pattern",
          zh ? "CaseBeforeAfter 有自己的內部 panel function 與 selector 邊界" : "CaseBeforeAfter has its own internal panel function and selector boundary",
        ]}
      />
    );
  }

  if (type === "local-exceptions") {
    const fieldLabels = copy.localExceptionFields;

    return (
      <section className={styles.localExceptionsDemo} aria-label={zh ? "刻意保留在 local scope 的 patterns" : "What stays local"}>
        <div className={styles.localExceptionsIntro}>
          <p className={styles.demoBadge}>{zh ? "Governance reference" : "Governance reference"}</p>
          <h3>{zh ? "刻意保留在 local scope 的 pattern" : "What stays local"}</h3>
          <p>
            {zh
              ? "這些 pattern 依 component boundary、story-specific UI 與 reuse threshold 決定保留在 local scope。"
              : "These patterns stay local based on component boundaries, story-specific UI, and the reuse threshold."}
          </p>
        </div>
        <div className={styles.localExceptionGrid}>
          {localExceptionExamples[locale].map((item) => (
            <article className={styles.localExceptionCard} key={item.pattern}>
              <h4>{item.pattern}</h4>
              <dl>
                <div>
                  <dt>{fieldLabels.liveUsage}</dt>
                  <dd>{item.liveUsage}</dd>
                </div>
                <div>
                  <dt>{fieldLabels.whyLocal}</dt>
                  <dd>{item.whyLocal}</dd>
                </div>
                <div>
                  <dt>{fieldLabels.boundary}</dt>
                  <dd>{item.boundary}</dd>
                </div>
                <div>
                  <dt>{fieldLabels.extraction}</dt>
                  <dd>{item.extraction}</dd>
                </div>
              </dl>
            </article>
          ))}
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
    const proposals = caseCopy.proposalTabs;
    return (
      <div className={styles.proposalTabsDemo}>
        <p className={styles.demoUsageLine}>Advantech / ProposalTabs / Scenario 1</p>
        <h3>{caseCopy.proposalTitle}</h3>
        <div className={styles.liveTabsList} role="tablist">
          {proposals.map((tab, index) => (
            <button
              aria-selected={activeProposal === index}
              className={activeProposal === index ? styles.isSelectedDemoTab : undefined}
              key={tab}
              onClick={() => setActiveProposal(index)}
              role="tab"
              type="button"
            >{tab}</button>
          ))}
        </div>
        <div className={styles.proposalPanelDemo}>
          <strong>{proposals[activeProposal]}</strong>
          <p>{caseCopy.proposalBody}</p>
        </div>
      </div>
    );
  }

  if (type === "case-info-card") {
    return (
      <div className={styles.caseInfoGridDemo}>
        {caseCopy.caseHeroItems.map(([label, value]) => (
          <article key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
          </article>
        ))}
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
      <>
        <Button onClick={() => setToastVisible(true)}>{zh ? "顯示 Contact toast" : "Show contact toast"}</Button>
        {toastVisible ? (
          <Toast message={copy.contactToastSuccess} tone="success" onClose={() => setToastVisible(false)} />
        ) : null}
      </>
    );
  }

  if (type === "modal") {
    const modal = copy.modalDemo;

    return (
      <div className={styles.contactModalDemo}>
        <p className={styles.demoUsageLine}>{modal.usage}</p>
        <article className={styles.contactModalFrame} aria-label={modal.title}>
          <header className={styles.contactModalHeader}>
            <div>
              <h3>{modal.title}</h3>
              <p>{modal.description}</p>
            </div>
            <span aria-hidden="true" className={styles.contactModalClose}>×</span>
          </header>
          <dl className={styles.contactReviewListDemo}>
            {modal.fields.map(([label, value]) => (
              <div key={label} className={styles.contactReviewRowDemo}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.contactReviewActionsDemo}>
            <Button type="button" className={styles.contactReviewPrimaryDemo}>{modal.confirm}</Button>
            <Button type="button" variant="secondary">{modal.cancel}</Button>
          </div>
        </article>
        <ul className={styles.contactFlowNotes}>
          {modal.flow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
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
        <ul className={styles.contactFlowNotes}>
          {skeleton.notes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
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
