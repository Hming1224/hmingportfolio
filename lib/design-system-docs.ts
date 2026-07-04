export type DesignSystemLocale = "en" | "zh-TW";
export type DesignSystemDocKind = "foundation" | "component" | "reference";

export type DesignSystemDoc = {
  kind: DesignSystemDocKind;
  slug: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  category: string;
  source?: string;
  usage: string[];
  usageZh?: string[];
  states?: string[];
  statesZh?: string[];
  tokens?: string[];
  accessibility?: string[];
  accessibilityZh?: string[];
  references?: string[];
  demo?: string;
};

import { designSystemSections } from "./design-system-data";

export { designSystemSections };

const foundations: DesignSystemDoc[] = [
  ["colors", "Colors", "色彩", "Primitive、semantic、project tone 與 status colors。", ["品牌紫色只用於主要 CTA 與 active 訊號。", "專案色只影響局部 tone，不覆蓋全站骨架。"], ["--hm-purple-50…900", "--hm-paper / surface / ink", "--hm-success / warning / error / info", "--hm-chart-1…6"]],
  ["typography", "Typography", "字體與排版", "Space Grotesk 與響應式字級、字重、行高規格。", ["標題維持清楚層級，正文優先可讀性。", "英文完整單字換行，不使用 anywhere 強制切字。"], ["--hm-fs-h1…xs", "--hm-fw-regular…bold", "--hm-ink / --hm-muted"]],
  ["spacing", "Spacing", "間距", "4px 基準的數字間距與既有 T-shirt aliases。", ["優先使用 token；只在幾何對齊有明確理由時例外。", "section 留白大於元件內距。"], ["--hm-space-1…20", "--hm-space-3xs…3xl", "--hm-page-gutter"]],
  ["radius", "Border Radius", "圓角", "控制項、卡片、面板與 pill 的圓角語言。", ["同層級元件使用相同圓角。", "按鈕與 badge 使用 pill，不把所有卡片做成膠囊。"], ["--hm-radius-sm / md / lg", "--hm-radius-btn", "--hm-radius-pill"]],
  ["shadows", "Shadows", "陰影", "從輕量分層到 overlay 的 elevation 系統。", ["陰影只表達層級，不取代邊框。", "hover elevation 不造成版面位移。"], ["--hm-shadow-sm / md / lg / xl", "--hm-shadow-card-hover"]],
  ["motion", "Motion", "動效", "從即時回饋到圖片與頁面入場的時間與 easing。", ["動畫分配注意力，不做無意義裝飾。", "所有非必要動畫尊重 reduced motion。"], ["--hm-duration-instant / fast / base", "--hm-duration-card / image / enter", "--hm-ease-default / out / in-out / spring"]],
].map(([slug, title, titleZh, descriptionZh, usage, tokens]) => ({
  kind: "foundation" as const,
  slug: slug as string,
  title: title as string,
  titleZh: titleZh as string,
  description: descriptionZh as string,
  descriptionZh: descriptionZh as string,
  category: "Foundations",
  usage: usage as string[],
  tokens: tokens as string[],
}));

type ComponentSeed = {
  slug: string;
  title: string;
  titleZh: string;
  category: string;
  source: string;
  demo?: string;
  states?: string[];
  statesZh?: string[];
  tokens?: string[];
  usage?: string[];
  usageZh?: string[];
  accessibility?: string[];
  accessibilityZh?: string[];
};

const componentSeeds: ComponentSeed[] = [
  { slug: "button", title: "Button / LinkButton", titleZh: "按鈕 / 連結按鈕", category: "General", source: "components/ui/Button.tsx", demo: "button", states: ["default", "hover", "focus", "active", "disabled", "loading", "size: sm/md/lg", "variant: primary/secondary/danger"], tokens: ["--hm-btn-primary-bg", "--hm-btn-height-md", "--hm-btn-radius", "--hm-btn-transition-duration", "--hm-btn-font-size-md"], usage: ["Live examples use homepage hero CTAs, Selected Work card CTAs, Contact submit, and case-study next navigation.", "Use as a command button when no href is provided.", "When href is provided, treat it as a LinkButton contract for navigation.", "Do not use danger for normal navigation or project tone."], usageZh: ["範例改用首頁 Hero CTA、Selected Work 卡片 CTA、Contact submit 與案例頁下一步導覽的真實語境。", "沒有 href 時才是 command button。", "有 href 時視為 LinkButton contract，用於導頁或錨點。", "danger 只用於破壞性操作，不用於一般導覽或專案色。"], accessibility: ["Renders a native button or anchor according to href.", "Loading state sets aria-busy and disables repeat action."], accessibilityZh: ["依 href 輸出 button 或 anchor 語意。", "loading 狀態會設定 aria-busy 並避免重複送出。"] },
  { slug: "language-switcher", title: "LanguageSwitcher", titleZh: "語系切換", category: "General", source: "components/LanguageSwitcher.tsx", demo: "language-switcher", states: ["closed", "open", "selected", "loading"], usage: ["Lives at the end of the global navbar.", "Preserves the current route and hash when switching locale.", "Documented as a reference-style example here to avoid embedding a second interactive locale switcher inside the docs page."], usageZh: ["放在全站導覽列尾端。", "切換語系時保留目前路徑與 hash。", "此處採 reference-style 文件化，避免在文件站內嵌第二個可操作語系選單。"], tokens: ["--hm-surface", "--hm-ink", "--hm-line", "--hm-radius-md"], accessibility: ["Uses button semantics with aria-expanded for the menu trigger."], accessibilityZh: ["選單 trigger 使用 button 與 aria-expanded 標示狀態。"] },
  { slug: "navbar", title: "Navbar", titleZh: "導覽列", category: "Shell", source: "components/Navbar.tsx", demo: "navbar", states: ["default", "hidden on scroll", "mobile open", "language menu open"], usage: ["Global brand and primary navigation shell.", "Scroll hides and restores the navbar without changing page layout.", "Documented as anatomy and behavior notes instead of a nested live navbar."], usageZh: ["全站品牌與主要導覽骨架。", "向下捲動暫時收起，停止或向上捲動時恢復，不改變頁面排版。", "此處以 anatomy 與 behavior notes 文件化，不在文件站內嵌第二個全站導覽。"], tokens: ["--hm-paper", "--hm-ink", "--hm-line", "--hm-duration-slow", "--hm-ease-out", "--hm-space-md", "--hm-shadow-sm"], accessibility: ["Uses nav semantics and keeps the mobile menu button state explicit."], accessibilityZh: ["使用 nav 語意，手機選單按鈕需明確標示展開狀態。"] },
  { slug: "footer", title: "Footer", titleZh: "頁腳", category: "Shell", source: "components/Footer.tsx", demo: "footer", states: ["default", "social hover", "mobile stacked"], usage: ["Closes general pages and case-study pages.", "Keeps copyright and external social links minimal."], usageZh: ["放在一般頁面與案例頁最底部。", "只保留必要版權資訊與外部社群連結。"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-space-xl"], accessibility: ["Uses footer semantics and accessible names for social links."], accessibilityZh: ["使用 footer 語意，社群圖示需有可讀名稱。"] },
  { slug: "scroll-progress", title: "ScrollProgress", titleZh: "滾動進度條", category: "Shell", source: "components/ScrollProgress.tsx", demo: "scroll-progress", states: ["0%", "in progress", "100%"], usage: ["Supports long case-study reading progress.", "Stays fixed without taking document layout space."], usageZh: ["用於較長案例頁的閱讀進度提示。", "固定在視窗頂端，不占用文件排版高度。"], tokens: ["--hm-purple", "--hm-duration-fast"], accessibility: ["Decorative progress should stay aria-hidden unless reopened as an accessible status feature."], accessibilityZh: ["裝飾型進度提示維持 aria-hidden，除非未來重新定義為可讀狀態。"] },
  { slug: "tabs", title: "Tabs", titleZh: "標籤頁", category: "Navigation", source: "components/animate-ui/primitives/base/tabs.tsx", demo: "tabs", states: ["default", "hover", "focus", "selected", "disabled"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-radius-md", "--hm-duration-fast"], usage: ["Live usage is the homepage Selected Work switch between Industry Projects and Academic / Side Projects.", "Treat this as a local portfolio pattern unless another route needs the same view switch."], usageZh: ["真實使用位置是首頁 Selected Work 的企業應用 / 學校產出切換。", "除非其他 route 也需要同樣的檢視切換，否則視為作品集 local pattern。"], accessibility: ["Use tablist, tab, and tabpanel semantics when the production component provides tabs."], accessibilityZh: ["正式 tabs 需維持 tablist、tab、tabpanel 語意。"] },
  { slug: "case-toc", title: "CaseTOC", titleZh: "案例目錄", category: "Navigation", source: "components/CaseTOC.tsx", demo: "case-toc", states: ["hidden before content", "visible", "active section"], usage: ["Protected floating navigation pattern for long case-study pages.", "Do not change the interaction unless explicitly approved."], usageZh: ["案例頁長篇內容的受保護浮動導覽 pattern。", "未明確批准前不要改互動或浮動行為。"], tokens: ["--hm-ink", "--hm-muted", "--hm-duration-fast"], accessibility: ["Uses nav semantics with section links."], accessibilityZh: ["使用 nav 語意與章節連結。"] },
  { slug: "year-rail", title: "YearRail", titleZh: "年份導覽", category: "Navigation", source: "components/YearRail.tsx", demo: "year-rail", states: ["default", "active year", "reduced motion"], usage: ["Route-specific pattern for the About experience timeline.", "The active year follows the current `.experience-card[data-year]` reading focus."], usageZh: ["About 經歷時間軸的 route-specific pattern。", "目前年份依 `.experience-card[data-year]` 的閱讀焦點自動更新。"], tokens: ["--hm-muted", "--hm-ink", "--hm-purple", "--hm-duration-fast"], accessibility: ["提供 aria-label 與可聚焦按鈕。"] },
  { slug: "case-next-nav", title: "CaseNextNav", titleZh: "下一案例導覽", category: "Navigation", source: "components/case-study/CaseStudyShell.tsx", demo: "case-next-nav", states: ["previous", "next", "disabled"], usage: ["放在案例正文與 Footer 之間。", "提供返回首頁與前往下一個案例的明確出口。"], tokens: ["--hm-surface", "--hm-ink", "--hm-duration-fast"], accessibility: ["包含前往下一個專案的明確提示文字。"] },
  { slug: "accordion", title: "Accordion", titleZh: "手風琴", category: "Navigation", source: "components/ui/Accordion.tsx", demo: "accordion", states: ["collapsed", "expanded", "single", "multiple", "keyboard focus"], tokens: ["--hm-line", "--hm-surface", "--hm-radius-sm", "--hm-duration-fast", "--hm-ease-out"], usage: ["用於可分組的長列表導覽或文件區塊，例如 Design System sidebar。", "預設展開目前所在分類；需要多分類同時開啟時使用 multiple 模式。"], accessibility: ["Header 使用 button，並同步 aria-expanded 與 aria-controls。", "Panel 使用 role=\"region\" 並以 aria-labelledby 關聯 header。", "支援 Enter、Space 切換，方向鍵可在 header 之間移動焦點。"] },
  { slug: "floating-input", title: "FloatingInput", titleZh: "浮動標籤輸入框", category: "Data Entry", source: "components/Contact.tsx", demo: "input", states: ["empty", "focus", "filled", "error", "success", "disabled", "loading"], tokens: ["--hm-surface", "--hm-line", "--hm-ink", "--hm-muted", "--hm-purple", "--hm-error", "--hm-duration-fast"], usage: ["Live usage is the Contact page form for name, company, email, and phone fields."], usageZh: ["真實使用位置是 Contact page 表單中的姓名、公司、Email 與電話欄位。"] },
  { slug: "floating-textarea", title: "FloatingTextarea", titleZh: "浮動標籤多行輸入", category: "Data Entry", source: "components/Contact.tsx", demo: "textarea", states: ["empty", "focus", "filled", "error", "disabled"], tokens: ["--hm-surface", "--hm-line", "--hm-ink", "--hm-muted", "--hm-purple", "--hm-error"], usage: ["Live usage is the Contact page message field."], usageZh: ["真實使用位置是 Contact page 的訊息內容欄位。"] },
  { slug: "contact-method", title: "ContactMethod", titleZh: "聯絡方式", category: "Data Entry", source: "components/Contact.tsx", demo: "contact-method", states: ["default", "hover", "focus"], usage: ["顯示 Email、電話或社群帳號與對應動作。", "可複製資料使用 button；外部社群使用 link。"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-radius-md", "--hm-duration-fast"] },
  { slug: "select", title: "Select", titleZh: "下拉選單", category: "Data Entry", source: "components/ui/Select.tsx", demo: "select", states: ["placeholder", "open", "selected", "focus", "error", "disabled"], tokens: ["--hm-surface", "--hm-line", "--hm-ink", "--hm-muted", "--hm-radius-md", "--hm-duration-fast"], usage: ["Contract-only component.", "No current live usage in the portfolio.", "Use when options exceed four and keyboard navigation / focus management is required."], usageZh: ["Contract-only 元件。", "作品集目前沒有正式使用。", "選項超過 4 個，且需要鍵盤導覽與焦點管理時才使用。"] },
  { slug: "checkbox", title: "Checkbox", titleZh: "核取方塊", category: "Data Entry", source: "components/ui/Checkbox.tsx", demo: "checkbox", states: ["unchecked", "checked", "focus", "error", "disabled"], tokens: ["--hm-purple", "--hm-line", "--hm-surface", "--hm-radius-sm"], usage: ["Contract-only component.", "No current live usage in the portfolio.", "Use for multi-select choices or independent boolean settings."], usageZh: ["Contract-only 元件。", "作品集目前沒有正式使用。", "用於多選或獨立的 boolean 設定。"] },
  { slug: "radio", title: "Radio", titleZh: "單選按鈕", category: "Data Entry", source: "components/ui/Radio.tsx", demo: "radio", states: ["unchecked", "checked", "focus", "error", "disabled"], tokens: ["--hm-purple", "--hm-line", "--hm-surface", "--hm-radius-pill"], usage: ["Contract-only component.", "No current live usage in the portfolio.", "Use for mutually exclusive choices with fewer than four options."], usageZh: ["Contract-only 元件。", "作品集目前沒有正式使用。", "用於少於 4 個選項的單選互斥情境。"] },
  { slug: "project-card", title: "ProjectCard", titleZh: "專案卡片", category: "Data Display", source: "components/Works.tsx", demo: "project-card", states: ["default", "three-layer hover", "coming soon"], usage: ["Live usage: Homepage / Selected Work.", "The example uses real project metadata, media, tags, CTA, and the protected hover overlay anatomy from `components/Works.tsx`.", "The hover overlay, scrim, image scale, and info panel are protected interaction details.", "Coming Soon cards must not look clickable."], usageZh: ["真實使用位置：Homepage / Selected Work。", "範例使用真實 project metadata、media、tags、CTA，並保留 `components/Works.tsx` 的受保護 hover overlay anatomy。", "hover overlay、scrim、圖片縮放與資訊面板是受保護互動細節。", "Coming Soon 卡片不能看起來可點。"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-radius-lg", "--hm-shadow-card-hover", "--hm-duration-base"], accessibility: ["Published projects provide one clear navigation target; disabled placeholders stay non-interactive."], accessibilityZh: ["已公開案例提供單一明確導覽目標；未上線 placeholder 維持不可互動。"] },
  { slug: "section-heading", title: "SectionHeading", titleZh: "區塊標題", category: "Data Display", source: "app/about-me/page.tsx", demo: "section-heading", states: ["default", "responsive"], usage: ["分隔首頁與 About 的主要內容章節。", "左右線段只輔助層級，不取代清楚的標題文字。"], tokens: ["--hm-ink", "--hm-line", "--hm-space-md"], accessibility: ["使用 <h2> 或適當的層級。"] },
  { slug: "project-tag", title: "ProjectTag", titleZh: "專案標籤", category: "Data Display", source: "components/Works.tsx", demo: "tags", states: ["default", "project tone"], usage: ["標示專案使用的技術、角色或分類。"], tokens: ["--hm-surface", "--hm-ink", "--hm-radius-pill"], accessibility: ["不應作為可點擊元素，僅供展示。"] },
  { slug: "social-link", title: "SocialLink", titleZh: "社群連結", category: "Data Display", source: "components/Footer.tsx", demo: "social-link", states: ["default", "hover", "focus"], usage: ["用圖示連到 LinkedIn、GitHub 等外部個人頁面。", "新視窗開啟時必須加上安全 rel 屬性。"], tokens: ["--hm-muted", "--hm-ink", "--hm-duration-fast"], accessibility: ["提供 aria-label 說明圖示意義。"] },
  { slug: "skill-category-card", title: "SkillCategoryCard", titleZh: "技能分類卡", category: "Data Display", source: "app/about-me/page.tsx", demo: "skill-card", states: ["default", "hover", "focus"], usage: ["將技能依 Product、Design、AI 等主題分組。", "內容保持可掃讀，不將每個單項技能再做成卡片。"], tokens: ["--hm-surface", "--hm-ink", "--hm-radius-md", "--hm-duration-base"], accessibility: ["確保列表使用 <ul> 與 <li> 語意。"] },
  { slug: "experience-card", title: "ExperienceCard", titleZh: "經歷卡片", category: "Data Display", source: "app/about-me/page.tsx", demo: "experience-card", states: ["before reveal", "visible", "active year"], usage: ["呈現單一工作、實習或專案經歷。", "年份需與 YearRail 及錨點 id 保持一致。"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-radius-lg", "--hm-duration-slow"], accessibility: ["使用 <article> 封裝獨立經歷內容。"] },
  { slug: "hero-badge", title: "HeroBadge", titleZh: "Hero 徽章", category: "Data Display", source: "components/Hero.tsx", demo: "hero-badge", states: ["default", "animated", "reduced motion"], usage: ["在首頁 Hero 簡短標示目前職涯定位或求職狀態。", "只保留一個核心訊息，避免取代主標題。"], tokens: ["--hm-purple", "--hm-surface", "--hm-radius-pill", "--hm-duration-base"], accessibility: ["動畫必須尊重 prefers-reduced-motion。"] },
  { slug: "case-hero", title: "CaseHero", titleZh: "案例 Hero", category: "Case Study", source: "components/case-study/CaseHero.tsx", demo: "case-hero", states: ["Advantech", "Crypto Arsenal", "Laushu", "mobile"], usage: ["Live references: Advantech HeroSection, Crypto Arsenal HeroSection, and Laushu HeroSection.", "Owns the reusable case-study hero shell: cover, title area, tags, summary, and project metadata composition.", "Cover media can be full-bleed, but readable content stays inside the 1440px content container."], usageZh: ["真實 reference：Advantech HeroSection、Crypto Arsenal HeroSection 與 Laushu HeroSection。", "負責案例頁 Hero 的共用骨架：封面、標題區、標籤、摘要與專案資訊組合。", "封面可 full-bleed，但可讀內容維持在 1440px 內容寬內。"], tokens: ["--hm-container", "--text-heading", "--cs-accent", "--cs-surface"], accessibility: ["Hero heading remains the page-level title for the case study."], accessibilityZh: ["Hero 標題維持案例頁主標語意。"] },
  { slug: "case-section", title: "CaseSection", titleZh: "案例區塊", category: "Case Study", source: "components/case-study/CaseSection.tsx", demo: "case-section", states: ["paper", "surface", "custom class"], usage: ["Live example reflects Crypto Arsenal problem-section rhythm and Advantech normal section anchors.", "Wraps normal case-study content sections and anchors them for CaseTOC.", "Paper and surface variants create reading rhythm; highly custom full-bleed sections can stay route-local."], usageZh: ["範例對齊 Crypto Arsenal problem-section 節奏與 Advantech 一般 section anchor。", "包裝一般案例內容 section，並提供 CaseTOC 錨點。", "paper / surface variant 建立閱讀節奏；高度客製滿版 section 可保留 route-local。"], tokens: ["--hm-container", "--cs-surface", "--cs-line", "--hm-space-3xl"] },
  { slug: "case-section-header", title: "CaseSectionHeader", titleZh: "案例區塊標題", category: "Case Study", source: "components/case-study/CaseSectionHeader.tsx", demo: "case-section-header", states: ["default", "secondary", "warning", "inverse"], usage: ["Live reference: Crypto Arsenal ProblemSection, ResearchSection, DecisionSection, and ImpactSection.", "Standardizes kicker, title, and optional description anatomy for case-study sections.", "Use it before adding route-local heading geometry."], usageZh: ["真實 reference：Crypto Arsenal ProblemSection、ResearchSection、DecisionSection 與 ImpactSection。", "統一案例 section 的 kicker、title 與 optional description 結構。", "新增 route-local 標題幾何前，先使用這個共用標題骨架。"], tokens: ["--cs-text-heading", "--cs-text-secondary", "--cs-accent"] },
  { slug: "case-card", title: "CaseCard", titleZh: "案例卡片", category: "Case Study", source: "components/case-study/CaseCard.tsx", demo: "case-card", states: ["default", "accent", "metric", "media"], usage: ["Live references: Crypto Arsenal pain cards, research evidence cards, and Advantech analysis / result cards.", "Shared card shell for supporting insight, decision, evidence, metric, or structured content blocks.", "Do not use it to absorb timeline, flow, matrix, or diagram geometry."], usageZh: ["真實 reference：Crypto Arsenal pain cards / research evidence cards，以及 Advantech analysis / result cards。", "負責 supporting insight、decision、evidence、metric 或 structured content 的穩定卡片外框。", "不要拿它吸收 timeline、flow、matrix 或 diagram 的內容幾何。"], tokens: ["--cs-surface", "--cs-line", "--hm-radius-lg", "--shadow-sm"] },
  { slug: "case-grid", title: "CaseGrid", titleZh: "案例網格", category: "Case Study", source: "components/case-study/CaseGrid.tsx", demo: "case-grid", states: ["two", "three", "four", "auto", "stack"], usage: ["Live example reflects the three-card Crypto Arsenal pain grid.", "Shared responsive grid shell for cards and repeatable case-study content.", "Special matrix columns, timeline widths, and diagram min-width values remain local."], usageZh: ["範例對齊 Crypto Arsenal 三張痛點卡 grid。", "卡片與重複案例內容的共用 RWD grid 外框。", "特殊矩陣欄位、timeline 寬度與 diagram min-width 留在 local。"], tokens: ["--hm-grid-gutter", "--hm-space-md", "--hm-container"] },
  { slug: "case-media", title: "CaseMedia", titleZh: "案例媒體", category: "Case Study", source: "components/case-study/CaseMedia.tsx", demo: "case-media", states: ["contained", "full", "zoomable", "scroll"], usage: ["Live references: Crypto Arsenal CurrentSection / FinalSection and Advantech AnalysisSection media wrappers.", "Owns figure, media frame, optional caption, and scroll-container shell.", "Does not own crop, aspect ratio, video behavior, or flow / matrix / diagram geometry."], usageZh: ["真實 reference：Crypto Arsenal CurrentSection / FinalSection 與 Advantech AnalysisSection media wrappers。", "負責 figure、media frame、optional caption 與 scroll-container 外框。", "不負責裁切比例、影片行為、流程圖 / 矩陣 / diagram 幾何。"], tokens: ["--cs-surface", "--cs-line", "--hm-radius-lg"] },
  { slug: "case-before-after", title: "CaseBeforeAfter", titleZh: "前後比較", category: "Case Study", source: "components/case-study/CaseBeforeAfter.tsx", demo: "case-before-after", states: ["desktop horizontal", "mobile stacked"], usage: ["rg adoption check: no current direct route adoption found in Advantech, Crypto Arsenal, or Laushu.", "Simple two-panel before / after comparison component.", "It remains independent and has not been refactored to use BeforeAfterPanel.", "The .cs-before-after-panel selector boundary belongs to CaseBeforeAfter."], usageZh: ["rg adoption check：Advantech、Crypto Arsenal、Laushu 目前未找到直接 route adoption。", "簡單兩欄 before / after 比較元件。", "目前仍是獨立元件，尚未改用 BeforeAfterPanel。", "`.cs-before-after-panel` selector 邊界屬於 CaseBeforeAfter。"], tokens: ["--cs-surface", "--cs-line", "--cs-accent", "--hm-space-md"] },
  { slug: "before-after-narrative-frame", title: "BeforeAfterNarrativeFrame", titleZh: "敘事型前後比較框架", category: "Case Study", source: "components/case-study/BeforeAfterNarrativeFrame.tsx", demo: "before-after-narrative", states: ["blue", "cyan", "purple", "neutral", "slot-based"], usage: ["Live example reflects Advantech SolutionSection Board 1: AI Chatbot component width iteration.", "Implemented shared slot-based narrative layout frame for single-comparison before / after stories.", "Owns the CaseCard shell, header / badge / title anatomy, optional intro, points, panel layout, connector, and data-tone hook.", "Does not own media wrappers, lightbox behavior, redlines, image sizing, crop, figure semantics, or route-specific storytelling geometry.", "Adopted by Crypto IterationSection, Laushu iteration board, and Advantech Board 1 pilot; Advantech Board 2 / 3 remain route-local."], usageZh: ["範例對齊 Advantech SolutionSection Board 1：AI Chatbot 元件寬度迭代。", "已實作的 slot-based 敘事型 before / after 共用 layout frame，適合單一比較故事。", "負責 CaseCard 外框、header / badge / title、optional intro、points、panel layout、connector 與 data-tone hook。", "不負責 media wrapper、lightbox、redline、圖片尺寸 / 裁切、figure 語意或 route-specific storytelling geometry。", "已用於 Crypto IterationSection、Laushu iteration board、Advantech Board 1 pilot；Advantech Board 2 / 3 仍保留 route-local。"], tokens: ["--cs-accent", "--cs-surface", "--cs-line", "--hm-space-md"] },
  { slug: "before-after-panel", title: "BeforeAfterPanel", titleZh: "Before / After 視覺面板", category: "Case Study", source: "components/case-study/BeforeAfterPanel.tsx", demo: "before-after-panel", states: ["blue", "cyan", "purple", "neutral"], usage: ["Internal-only anatomy.", "Used internally by BeforeAfterNarrativeFrame only; not directly route-adopted.", "Not used by CaseBeforeAfter and not a semantic figure component."], usageZh: ["Internal-only anatomy。", "目前只供 BeforeAfterNarrativeFrame 內部使用，沒有直接 route adoption。", "未被 CaseBeforeAfter 使用，也不是 semantic figure component。"], tokens: ["--cs-before-after-state-panel-*", "--cs-accent", "--cs-surface", "--cs-line"] },
  { slug: "zoomable-image", title: "ZoomableImage", titleZh: "可放大圖片", category: "Case Study", source: "components/case-study/ZoomableImage.tsx", demo: "zoom", states: ["default", "hover", "focus", "lightbox open", "fullscreen mode"], usage: ["Live context: product screenshots in case media and route-specific lightbox wrappers.", "Owns shared image display, zoom trigger, and image lightbox behavior.", "Does not own route-specific crop / ratio, video playback, video lightbox, or flow / matrix / diagram layout."], usageZh: ["真實語境：案例 media 與 route-specific lightbox wrappers 中的產品截圖。", "負責共用圖片顯示、放大 trigger 與 image lightbox 行為。", "不負責 route-specific 裁切 / 比例、影片播放、影片 lightbox 或流程圖 / 矩陣 / diagram layout。"], tokens: ["--hm-paper", "--hm-ink", "--hm-shadow-xl", "--hm-z-modal"], accessibility: ["Includes dialog semantics, aria-modal, localized close label, Escape close, backdrop close, and scroll lock.", "Focus trap / return-focus is a documented future improvement unless code implements it."], accessibilityZh: ["包含 dialog 語意、aria-modal、本地化關閉文字、Escape 關閉、backdrop 關閉與 scroll lock。", "focus trap / return-focus 仍屬 future improvement，除非 code 已實作。"] },
  { slug: "flow-scroll-hint", title: "FlowScrollHint", titleZh: "橫向捲動提示", category: "Case Study", source: "components/case-study/FlowScrollHint.tsx", demo: "flow-scroll-hint", states: ["hidden", "visible when next scroll container overflows"], usage: ["Live references: Advantech AnalysisSection, ProcessSection, ScenarioSection, and CaseFlowFrame overflow content.", "Decorative overflow affordance for wide flow, table, matrix, or diagram content.", "It detects the following sibling scroll container and toggles data-visible.", "Do not expand it into an interactive control or accessible instruction unless a future accessibility task reopens the decision."], usageZh: ["真實 reference：Advantech AnalysisSection、ProcessSection、ScenarioSection 與 CaseFlowFrame 的寬版內容。", "寬版 flow、table、matrix 或 diagram 的裝飾型 overflow 提示。", "偵測下一個 sibling scroll container，並切換 data-visible。", "未來 accessibility 任務重開前，不要把它擴成互動控制或可讀指示文字。"], tokens: ["--hm-muted", "--hm-duration-fast"], accessibility: ["Currently aria-hidden decorative UI by governance decision."], accessibilityZh: ["依治理決策，目前維持 aria-hidden 裝飾 UI。"] },
  { slug: "proposal-tabs", title: "ProposalTabs", titleZh: "方案比較標籤", category: "Case Study", source: "app/advantech/components/ProposalTabs.tsx", demo: "proposal-tabs", states: ["default", "hover", "selected"], usage: ["Live references: Advantech ProposalTabs and Crypto Arsenal WireframeProposalBoard.", "Compares multiple proposals for the same problem and explains adopted / rejected rationale.", "Case-specific pattern boundary: route supplies proposal data, captions, and adoption reasoning; shared CaseProposalTabs owns tab / carousel behavior."], usageZh: ["真實 reference：Advantech ProposalTabs 與 Crypto Arsenal WireframeProposalBoard。", "比較同一問題的多個設計提案與採用 / 未採用理由。", "case-specific pattern 邊界：route 提供 proposal data、caption 與採用理由；shared CaseProposalTabs 負責 tab / carousel 行為。"] },
  { slug: "case-info-card", title: "CaseInfoCard", titleZh: "案例資訊卡", category: "Case Study", source: "case study HeroSection.tsx", demo: "case-info-card", states: ["default", "responsive"], usage: ["Live references: Advantech, Crypto Arsenal, and Laushu HeroSection metadata grids.", "Presents timeline, team, role, scope, and tools.", "Mobile layout stacks by content without shrinking text below readable size."], usageZh: ["真實 reference：Advantech、Crypto Arsenal 與 Laushu HeroSection metadata grids。", "呈現時間、團隊、角色、負責項目與工具。", "手機版依內容堆疊，不縮小到難以閱讀。"] },
  { slug: "toast", title: "Toast", titleZh: "通知", category: "Feedback", source: "components/ui/Toast.tsx", demo: "toast", states: ["success", "warning", "error", "info", "dismissed"], usage: ["Live usage is Contact form success / error feedback.", "Use for non-blocking temporary feedback after an action."], usageZh: ["真實使用位置是 Contact form 的成功 / 失敗回饋。", "用於操作後的非阻斷式臨時通知。"], tokens: ["--hm-paper", "--hm-ink", "--hm-shadow-md", "--hm-radius-md", "--hm-duration-base"], accessibility: ["使用 role=\"status\" 或 role=\"alert\"。"] },
  { slug: "alert", title: "Alert", titleZh: "行內提示", category: "Feedback", source: "components/ui/Alert.tsx", demo: "alert", states: ["success", "warning", "error", "info", "dismissible"], usage: ["Contract-only component.", "No current live usage in the portfolio.", "Use for persistent or manually dismissed inline messages."], usageZh: ["Contract-only 元件。", "作品集目前沒有正式使用。", "用於表單頂部或區塊內的永久 / 手動關閉提示。"], tokens: ["--hm-surface", "--hm-ink", "--hm-error", "--hm-radius-md"], accessibility: ["狀態顏色需搭配圖示，不可僅依賴色彩。"] },
  { slug: "modal", title: "Modal", titleZh: "對話框", category: "Feedback", source: "components/ui/Modal.tsx", demo: "modal", states: ["closed", "open", "keyboard focus", "dismissed"], usage: ["Contract-only component.", "No current live usage in the portfolio.", "Use only when the current task must be interrupted for a response."], usageZh: ["Contract-only 元件。", "作品集目前沒有正式使用。", "只有目前操作必須被中斷並要求回應時才使用。"], tokens: ["--hm-paper", "--hm-ink", "--hm-shadow-xl", "--hm-radius-lg", "--hm-duration-base"], accessibility: ["開啟時焦點進入對話框，關閉時歸還。支援 Esc 關閉。"] },
  { slug: "skeleton", title: "Skeleton", titleZh: "骨架屏", category: "Feedback", source: "components/ui/Skeleton.tsx", demo: "skeleton", states: ["loading", "reduced motion"], usage: ["Contract-only component.", "No current live usage in the portfolio.", "Use as a loading placeholder only when data latency would otherwise shift layout."], usageZh: ["Contract-only 元件。", "作品集目前沒有正式使用。", "只有資料延遲會造成版面跳動時，才作為 loading placeholder 使用。"], tokens: ["--hm-line", "--hm-duration-slow", "--hm-radius-md"], accessibility: ["需有 aria-busy 或 aria-hidden，避免讀取閃爍。"] },
  { slug: "empty-state", title: "EmptyState", titleZh: "空狀態", category: "Feedback", source: "components/ui/EmptyState.tsx", demo: "empty", states: ["message only", "description", "with CTA"], usage: ["Contract-only component.", "No current live usage in the portfolio.", "Use when there is no data or no search result, paired with a clear recovery action when possible."], usageZh: ["Contract-only 元件。", "作品集目前沒有正式使用。", "無資料或搜尋無結果時顯示，適合搭配清楚的恢復動作。"], tokens: ["--hm-muted", "--hm-ink", "--hm-space-md"], accessibility: ["提供清晰說明文字取代空白。"] },
];

const components: DesignSystemDoc[] = componentSeeds.map((item) => ({
  kind: "component",
  slug: item.slug,
  title: item.title,
  titleZh: item.titleZh,
  category: item.category,
  source: item.source,
  demo: item.demo,
  description: `Reusable ${item.title} pattern used by the live portfolio.`,
  descriptionZh: `作品集目前實際使用的 ${item.titleZh} pattern，文件以 production code 為準。`,
  usage: item.usage ?? [
    `Use ${item.title} only where its documented interaction and information hierarchy apply.`,
    "Prefer the shared implementation over duplicating page-specific markup.",
  ],
  usageZh: item.usageZh,
  states: item.states,
  statesZh: item.statesZh,
  tokens: item.tokens ?? ["--hm-ink", "--hm-surface", "--hm-line", "--hm-duration-fast"],
  accessibility: item.accessibility ?? [
    "Keyboard focus must remain visible.",
    "Do not rely on color alone to communicate state.",
    "Interactive controls need an accessible name.",
  ],
  accessibilityZh: item.accessibilityZh,
  references: [item.source],
}));

const references: DesignSystemDoc[] = [
  {
    kind: "reference",
    slug: "tokens",
    title: "Token Reference",
    titleZh: "Token 總表",
    description: "Single reference for primitive, semantic, component, layout, motion, and accessibility tokens.",
    descriptionZh: "Primitive、semantic、component、layout、motion 與 accessibility token 的單一查詢入口。",
    category: "Reference",
    usage: ["新元件先查 token，再決定是否需要新增。", "Deprecated alias 只供遷移，不供新 code 使用。"],
    tokens: ["Seed → Map → Component", "Primitive → Semantic → Component"],
  },
  {
    kind: "reference",
    slug: "button-tokens",
    title: "Button Token Inheritance",
    titleZh: "Button Token 繼承",
    description: "Seed → Map → Component inheritance for primary button states.",
    descriptionZh: "Primary Button 從 Seed、Map 到 Component 的三層繼承與狀態解析。",
    category: "Reference",
    usage: ["元件只消費 `--hm-btn-*`。", "品牌與主題差異在 Map 或 Component 層覆寫。"],
    tokens: ["--hm-seed-*", "--hm-map-*", "--hm-btn-*"],
    demo: "button",
  },
  {
    kind: "reference",
    slug: "local-exceptions",
    title: "What Stays Local",
    titleZh: "刻意保留在 local scope 的 pattern",
    description: "Route-specific patterns that are intentionally documented as local exceptions instead of being forced into shared components.",
    descriptionZh: "刻意以 local exception 文件化、而不是硬抽成 shared component 的 route-specific patterns。",
    category: "Reference",
    usage: [
      "These patterns are not gaps; they are component boundary decisions based on local scope, story-specific UI, and reuse threshold.",
      "ProjectCard hover overlay, CaseTOC, Advantech Board 2 / 3, Laushu task flow, and Crypto matrix / FlowMatrixBoard each keep live route references and explicit shared boundaries.",
      "BeforeAfterPanel is internal-only inside BeforeAfterNarrativeFrame, while CaseBeforeAfter remains an independent component with no current direct route adoption.",
      "Select, Checkbox, Radio, Alert, Modal, Skeleton, and EmptyState are contract-only components for future product surfaces or maintenance consistency.",
      "Componentize only when structure and behavior repeat beyond one case; keep project-specific story logic local until that reuse threshold is met.",
    ],
    usageZh: [
      "這些 pattern 不是遺漏，而是依 local scope、story-specific UI 與 reuse threshold 做出的 component boundary 判斷。",
      "ProjectCard hover overlay、CaseTOC、Advantech Board 2 / 3、Laushu task flow、Crypto matrix / FlowMatrixBoard 都補上真實使用位置與 shared boundary。",
      "BeforeAfterPanel 是 BeforeAfterNarrativeFrame 內部使用的 internal-only anatomy；CaseBeforeAfter 則維持獨立元件，目前沒有直接 route adoption。",
      "Select、Checkbox、Radio、Alert、Modal、Skeleton、EmptyState 是為未來產品介面或維護一致性保留的 contract-only components。",
      "只有當結構與行為跨案例重複時才 componentize；project-specific story logic 在達到 reuse threshold 前保留 local。",
    ],
    demo: "local-exceptions",
    references: [
      "components/Works.tsx",
      "components/CaseTOC.tsx",
      "components/case-study/CaseStudyShell.tsx",
      "app/advantech/sections/SolutionSection.tsx",
      "app/laushu/page.tsx",
      "app/laushu/components/TaskFlowDiagrams.tsx",
      "app/crypto-arsenal/sections/ResearchSection.tsx",
      "app/crypto-arsenal/components/FlowMatrixBoard.tsx",
      "components/case-study/BeforeAfterPanel.tsx",
      "components/case-study/CaseBeforeAfter.tsx",
      "docs/design-system/06-governance.md",
      "docs/design-system/03-components.md",
    ],
  },
  {
    kind: "reference",
    slug: "gaps",
    title: "Gap Analysis",
    titleZh: "缺口分析",
    description: "Live status of design-system infrastructure and documentation gaps.",
    descriptionZh: "設計系統基礎建設、元件與文件缺口的即時狀態。",
    category: "Reference",
    usage: ["Critical：影響基礎能力。", "High：影響可用性與一致性。", "Medium：影響擴充與維護效率。"],
  },
  {
    kind: "reference",
    slug: "plan",
    title: "Remediation Plan v1.1",
    titleZh: "缺口修復計劃 v1.1",
    description: "Updated 2026-06-25. Tracks 15 infrastructure tasks and 21 original documentation stubs.",
    descriptionZh: "更新於 2026-06-25，追蹤 15 個基礎任務與原始 21 個元件文件 stub。",
    category: "Reference",
    usage: ["8 個原完整頁維持完成。", "17 個既有元件文件納入補完。", "4 個原 Gap 元件已有 code，改列文件完成。"],
  },
];

export const designSystemDocs = [...foundations, ...components, ...references];

export function getDesignSystemDoc(kind: string, slug: string) {
  const normalizedKind =
    kind === "foundations" ? "foundation" : kind === "components" ? "component" : "reference";
  return designSystemDocs.find((doc) => doc.kind === normalizedKind && doc.slug === slug);
}

export function getDesignSystemHref(kind: DesignSystemDocKind, slug: string) {
  const segment =
    kind === "foundation" ? "foundations" : kind === "component" ? "components" : "reference";
  return `/design-system/${segment}/${slug}`;
}
