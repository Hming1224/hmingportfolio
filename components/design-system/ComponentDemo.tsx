"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { getAboutData } from "@/data/about";
import { getContactData } from "@/data/contact";
import { getProjects } from "@/data/projects";
import type { DesignSystemLocale } from "@/lib/design-system-docs";
import Button from "../ui/Button";
import { Alert } from "../ui/Alert";
import { Checkbox } from "../ui/Checkbox";
import { EmptyState } from "../ui/EmptyState";
import { Modal } from "../ui/Modal";
import { Radio } from "../ui/Radio";
import { Select } from "../ui/Select";
import { Skeleton } from "../ui/Skeleton";
import { Toast } from "../ui/Toast";
import ZoomableImage from "../case-study/ZoomableImage";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "../ui/Accordion";
import styles from "./DesignSystemExplorer.module.css";

const options = [
  { label: "Product design", value: "product" },
  { label: "UX research", value: "research" },
  { label: "Design system", value: "system" },
];

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
    panelBody: "BeforeAfterPanel is used inside BeforeAfterNarrativeFrame for labeled state panels. Routes adopt the frame, not this panel directly.",
    caseBeforeAfterBody: "No current direct route adoption was found in Advantech, Crypto Arsenal, or Laushu. It remains an independent simple two-panel component; `.cs-before-after-panel` belongs to CaseBeforeAfter.",
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
    panelBody: "BeforeAfterPanel 只在 BeforeAfterNarrativeFrame 內部呈現 labeled state panel。正式 route 採用的是 frame，不是直接採用 panel。",
    caseBeforeAfterBody: "用 rg 檢查 Advantech、Crypto Arsenal、Laushu 後，未找到目前直接 route adoption。它仍是獨立的簡單兩欄比較元件；`.cs-before-after-panel` selector 邊界屬於 CaseBeforeAfter。",
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
      whyLocal: "It is shaped by long-form case reading, section anchors, scroll position, and floating navigation behavior.",
      boundary: "Protected case-study navigation pattern, local to the case-study reading experience. It should not be wrapped into a generic docs TOC.",
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
      whyLocal: "Routes adopt BeforeAfterNarrativeFrame; the panel only renders labeled internal state panels inside that frame.",
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
    {
      pattern: "No-live / contract-only components",
      liveUsage: "Select, Checkbox, Radio, Alert, Modal, Skeleton, and EmptyState are documented contracts with no current live portfolio route adoption.",
      whyLocal: "These contracts exist for future product surfaces or maintenance consistency instead of current visual reuse.",
      boundary: "They stay documented as component contracts, but examples should not imply production usage that does not exist.",
      extraction: "Revisit when a live route adopts one of these contracts and real usage can replace the contract-only note.",
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
      whyLocal: "它依案例頁長篇閱讀、section anchor、scroll position 與 floating navigation 行為設計。",
      boundary: "Protected case-study navigation pattern，屬於 case-study reading experience，不應包裝成 generic docs TOC。",
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
      whyLocal: "正式 route 採用 BeforeAfterNarrativeFrame；panel 只負責在 frame 內呈現 labeled internal state panels。",
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
    {
      pattern: "No-live / contract-only components",
      liveUsage: "Select、Checkbox、Radio、Alert、Modal、Skeleton、EmptyState 是目前正式作品集 route 尚未直接使用的 documented contracts。",
      whyLocal: "這些 contract 先保留給未來產品介面或維護一致性，不代表目前已有正式視覺重用。",
      boundary: "它們維持 component contract 文件，但 examples 不應暗示不存在的 production usage。",
      extraction: "當 live route 採用其中一個 contract，並能用真實使用情境取代 contract-only note 時再更新。",
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
    navbarBehavior: zh
      ? ["locale-aware links", "desktop / mobile 共用 nav items", "LanguageSwitcher 放在 Navbar 內", "scroll hide / restore"]
      : ["locale-aware links", "shared desktop / mobile nav items", "LanguageSwitcher lives inside Navbar", "scroll hide / restore"],
    contactToastSuccess: zh ? "送出成功！" : "Message Sent!",
    contactToastError: zh ? "傳送失敗，請重試" : "Something went wrong. Please try again.",
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
  children,
  locale,
}: {
  children: ReactNode;
  locale: DesignSystemLocale;
}) {
  const copy = getCopy(locale);

  return (
    <div className={styles.contractOnlyDemo}>
      <p className={styles.demoBadge}>{copy.contractOnly}</p>
      {children}
    </div>
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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("");
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
    return (
      <div className={styles.liveButtonDemo}>
        <Button href="/#projects">{zh ? "查看作品" : "View My Work"}</Button>
        <Button href="/about-me" variant="secondary">{zh ? "我的歷程" : "My Journey"}</Button>
        <Button href={featuredProject.href ?? "/"} size="lg">
          {zh ? "了解更多" : "Learn More"}
        </Button>
        <Button size="lg" disabled>
          {zh ? "即將上線" : "Coming Soon"}
        </Button>
        <Button loading loadingLabel={zh ? "傳送中..." : "Sending..."}>
          {zh ? "送出訊息" : "Send Message"}
        </Button>
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
          <li>{demoZh ? "展示語境：文件站以 navbar 截取示意呈現，只有語言切換器可互動" : "Context: shown inside a navbar crop; only the language switcher is interactive in this docs example"}</li>
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
        description={zh ? "這裡改用 anatomy / behavior reference，不在 docs example 裡嵌入第二個全站 navbar。" : "This example uses anatomy and behavior notes instead of embedding a second global navbar inside the docs page."}
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
      <ContractOnlyCard locale={locale}>
        <div style={{ width: "100%", maxWidth: "320px" }}>
          <Select
            name="design-discipline"
            options={options}
            value={selectValue}
            onChange={setSelectValue}
            placeholder={zh ? "選擇設計分類" : "Choose a discipline"}
          />
        </div>
      </ContractOnlyCard>
    );
  }

  if (type === "checkbox") {
    return (
      <ContractOnlyCard locale={locale}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Checkbox defaultChecked>{zh ? "已選選項" : "Selected option"}</Checkbox>
          <Checkbox>{zh ? "可選選項" : "Available option"}</Checkbox>
          <Checkbox disabled>{zh ? "停用選項" : "Disabled option"}</Checkbox>
        </div>
      </ContractOnlyCard>
    );
  }

  if (type === "radio") {
    return (
      <ContractOnlyCard locale={locale}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Radio name="demo-radio" defaultChecked>{zh ? "產品設計師" : "Product designer"}</Radio>
          <Radio name="demo-radio">{zh ? "產品經理" : "Product manager"}</Radio>
          <Radio name="demo-radio" disabled>{zh ? "不可用" : "Unavailable"}</Radio>
        </div>
      </ContractOnlyCard>
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

  if (type === "case-toc") {
    return (
      <nav style={{ display: "flex", flexDirection: "column", gap: "16px", borderLeft: "2px solid var(--hm-line-strong)", paddingLeft: "16px" }} aria-label={zh ? "案例目錄範例" : "Case table of contents example"}>
        {(zh ? ["專案背景", "研究洞察", "設計方案", "成果反思"] : ["Context", "Insights", "Solution", "Outcome"]).map((item, index) => (
          <a className={index === 1 ? "is-active" : undefined} href="#preview" key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item}
          </a>
        ))}
      </nav>
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
      <div className={styles.projectCardDemoWrap}>
        <p className={styles.demoUsageLine}>Homepage / Selected Work</p>
        <article className={`project-card tone-${featuredProject.tone} card-visible ${styles.projectCardDemo}`}>
          <div className="project-media">
            <Image
              className="project-image"
              src={featuredProject.cover}
              alt={featuredProject.title}
              fill
              sizes="(max-width: 768px) calc(100vw - 48px), 720px"
            />
            <div className="project-scrim" />
          </div>
          <div className="project-info">
            <div className="project-meta">
              <div className="project-logo-wrap">
                <Image src={featuredProject.logo} alt="" fill sizes="168px" />
              </div>
              <div className="project-title">
                <h3>{featuredProject.title}</h3>
                <p>{featuredProject.date}</p>
              </div>
              <p className="project-description">{featuredProject.description}</p>
              <div className="project-tags">
                {featuredProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <Button href={featuredProject.href ?? "/"} size="lg">
              {zh ? "了解更多" : "Learn More"}
            </Button>
          </div>
        </article>
        {comingSoonProject ? (
          <p className={styles.demoUsageLine}>
            {zh ? `Coming Soon 狀態使用不可點擊 CTA：${comingSoonProject.navigationTitle ?? comingSoonProject.title}` : `Coming Soon state uses a disabled CTA: ${comingSoonProject.navigationTitle ?? comingSoonProject.title}`}
          </p>
        ) : null}
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
          ".cs-before-after-panel belongs to CaseBeforeAfter",
          zh ? "不要混同為 BeforeAfterNarrativeFrame 的 replacement" : "Do not treat it as a BeforeAfterNarrativeFrame replacement",
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
          "used inside BeforeAfterNarrativeFrame",
          "not directly adopted by routes",
          "not used by CaseBeforeAfter",
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
              ? "這些不是遺漏或不一致，而是依 component boundary、story-specific UI 與 reuse threshold 做出的保留判斷。"
              : "These are not gaps or inconsistencies; they are boundary decisions based on story-specific UI and the reuse threshold."}
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
      <ContractOnlyCard locale={locale}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "480px" }}>
          <Alert tone="success">{zh ? "Design tokens 已同步。" : "Design tokens are synchronized."}</Alert>
          <Alert tone="warning">{zh ? "發布前請檢查 RWD。" : "Review responsive behavior before release."}</Alert>
        </div>
      </ContractOnlyCard>
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
    return (
      <ContractOnlyCard locale={locale}>
        <Button onClick={() => setModalOpen(true)}>{zh ? "開啟 modal contract" : "Open modal contract"}</Button>
        <Modal open={modalOpen} title={zh ? "檢查 design-system 變更" : "Review design-system change"} onClose={() => setModalOpen(false)}>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>{zh ? "這是 contract-only preview；目前作品集沒有 live modal flow。" : "This is a contract-only preview; the portfolio has no live modal flow today."}</p>
          <div style={{ display: "flex", gap: "12px" }}>
            <Button onClick={() => setModalOpen(false)}>{zh ? "確認" : "Confirm"}</Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>{zh ? "關閉" : "Close"}</Button>
          </div>
        </Modal>
      </ContractOnlyCard>
    );
  }

  if (type === "skeleton") {
    return (
      <ContractOnlyCard locale={locale}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "480px" }} aria-label={zh ? "載入預覽" : "Loading preview"}>
          <Skeleton style={{ width: "42%", height: 18 }} />
          <Skeleton style={{ width: "100%", height: 72 }} />
          <Skeleton style={{ width: "76%", height: 18 }} />
        </div>
      </ContractOnlyCard>
    );
  }

  if (type === "empty") {
    return (
      <ContractOnlyCard locale={locale}>
        <EmptyState
          title={zh ? "沒有符合的元件" : "No matching component"}
          description={zh ? "清除篩選或改看其他分類。" : "Clear filters or browse another category."}
          action={<Button size="sm">{zh ? "清除篩選" : "Clear filters"}</Button>}
        />
      </ContractOnlyCard>
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
