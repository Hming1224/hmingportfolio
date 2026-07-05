export type DesignSystemLocale = "en" | "zh-TW";
export type DesignSystemDocKind = "foundation" | "component" | "reference";

export type DesignSystemAnatomyPart = {
  part: string;
  description: string;
  owner: string;
  code: string;
};

export type DesignSystemCodeGuidance = {
  importPath: string;
  example: string;
  props: Array<{ name: string; type: string; description: string }>;
  notes?: string[];
};

export type DesignSystemTokenMapping = {
  token: string;
  role: string;
};

export type DesignSystemDoc = {
  kind: DesignSystemDocKind;
  slug: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  category: string;
  source?: string;
  hideSourceInHeader?: boolean;
  status?: string;
  statusZh?: string;
  exampleLabel?: string;
  exampleLabelZh?: string;
  usage: string[];
  usageZh?: string[];
  behavior?: Array<{ label: string; description: string }>;
  behaviorZh?: Array<{ label: string; description: string }>;
  states?: string[];
  statesZh?: string[];
  tokens?: string[];
  accessibility?: string[];
  accessibilityZh?: string[];
  anatomy?: string[];
  anatomyZh?: string[];
  anatomyParts?: DesignSystemAnatomyPart[];
  anatomyPartsZh?: DesignSystemAnatomyPart[];
  codeGuidance?: DesignSystemCodeGuidance;
  codeGuidanceZh?: DesignSystemCodeGuidance;
  tokenMappings?: DesignSystemTokenMapping[];
  tokenMappingsZh?: DesignSystemTokenMapping[];
  references?: string[];
  referenceCards?: Array<{ label: string; value: string }>;
  referenceCardsZh?: Array<{ label: string; value: string }>;
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
  description?: string;
  descriptionZh?: string;
  hideSourceInHeader?: boolean;
  status?: string;
  statusZh?: string;
  exampleLabel?: string;
  exampleLabelZh?: string;
  demo?: string;
  behavior?: Array<{ label: string; description: string }>;
  behaviorZh?: Array<{ label: string; description: string }>;
  states?: string[];
  statesZh?: string[];
  tokens?: string[];
  usage?: string[];
  usageZh?: string[];
  accessibility?: string[];
  accessibilityZh?: string[];
  anatomy?: string[];
  anatomyZh?: string[];
  anatomyParts?: DesignSystemAnatomyPart[];
  anatomyPartsZh?: DesignSystemAnatomyPart[];
  codeGuidance?: DesignSystemCodeGuidance;
  codeGuidanceZh?: DesignSystemCodeGuidance;
  tokenMappings?: DesignSystemTokenMapping[];
  tokenMappingsZh?: DesignSystemTokenMapping[];
  references?: string[];
  referenceCards?: Array<{ label: string; value: string }>;
  referenceCardsZh?: Array<{ label: string; value: string }>;
};

const componentSeeds: ComponentSeed[] = [
  { slug: "button", title: "Button / LinkButton", titleZh: "按鈕 / 連結按鈕", category: "General", source: "components/ui/Button.tsx", demo: "button", states: ["default", "hover", "focus", "active", "disabled", "loading", "size: sm/md/lg", "variant: primary/secondary/danger"], tokens: ["--hm-btn-primary-bg", "--hm-btn-height-md", "--hm-btn-radius", "--hm-btn-transition-duration", "--hm-btn-font-size-md"], usage: ["Live examples use homepage hero CTAs, Selected Work card CTAs, Contact submit, and case-study next navigation.", "Use as a command button when no href is provided.", "When href is provided, treat it as a LinkButton contract for navigation.", "Do not use danger for normal navigation or project tone."], usageZh: ["範例改用首頁 Hero CTA、Selected Work 卡片 CTA、Contact submit 與案例頁下一步導覽的真實語境。", "沒有 href 時才是 command button。", "有 href 時視為 LinkButton contract，用於導頁或錨點。", "danger 只用於破壞性操作，不用於一般導覽或專案色。"], accessibility: ["Renders a native button or anchor according to href.", "Loading state sets aria-busy and disables repeat action."], accessibilityZh: ["依 href 輸出 button 或 anchor 語意。", "loading 狀態會設定 aria-busy 並避免重複送出。"] },
  { slug: "language-switcher", title: "LanguageSwitcher", titleZh: "語系切換", category: "General", source: "components/LanguageSwitcher.tsx", demo: "language-switcher", states: ["closed", "open", "selected", "loading"], usage: ["Real usage: global site header.", "Preserves the current route and hash when switching locale.", "States: closed / open / selected / loading."], usageZh: ["真實使用位置：全站 Navbar。", "切換語系時保留目前 route 與 hash。", "狀態：closed / open / selected / loading。"], tokens: ["--hm-surface", "--hm-ink", "--hm-line", "--hm-radius-md"], accessibility: ["Uses button semantics with aria-expanded for the menu trigger.", "Options use menuitemradio with aria-checked for selected state."], accessibilityZh: ["選單 trigger 使用 button 與 aria-expanded 標示狀態。", "選項使用 menuitemradio 與 aria-checked 表示 selected state。"] },
  { slug: "navbar", title: "Navbar", titleZh: "導覽列", category: "Shell", source: "components/Navbar.tsx", demo: "navbar", states: ["default", "hidden on scroll", "mobile open", "language menu open"], usage: ["Global brand and primary navigation shell.", "Scroll hides and restores the navbar without changing page layout.", "Carries project navigation, resume access, and locale switching in one persistent shell."], usageZh: ["全站品牌與主要導覽骨架。", "向下捲動暫時收起，停止或向上捲動時恢復，不改變頁面排版。", "在同一個穩定外殼中承載作品導覽、履歷入口與語系切換。"], tokens: ["--hm-paper", "--hm-ink", "--hm-line", "--hm-duration-slow", "--hm-ease-out", "--hm-space-md", "--hm-shadow-sm"], accessibility: ["Uses nav semantics and keeps the mobile menu button state explicit."], accessibilityZh: ["使用 nav 語意，手機選單按鈕需明確標示展開狀態。"] },
  { slug: "footer", title: "Footer", titleZh: "頁腳", category: "Shell", source: "components/Footer.tsx", demo: "footer", states: ["default", "social hover", "mobile stacked"], usage: ["Closes general pages and case-study pages.", "Keeps copyright and external social links minimal."], usageZh: ["放在一般頁面與案例頁最底部。", "只保留必要版權資訊與外部社群連結。"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-space-xl"], accessibility: ["Uses footer semantics and accessible names for social links."], accessibilityZh: ["使用 footer 語意，社群圖示需有可讀名稱。"] },
  { slug: "scroll-progress", title: "ScrollProgress", titleZh: "滾動進度條", category: "Shell", source: "components/ScrollProgress.tsx", demo: "scroll-progress", states: ["0%", "in progress", "100%"], usage: ["Supports long case-study reading progress.", "Stays fixed without taking document layout space."], usageZh: ["用於較長案例頁的閱讀進度提示。", "固定在視窗頂端，不占用文件排版高度。"], tokens: ["--hm-purple", "--hm-duration-fast"], accessibility: ["Decorative progress should stay aria-hidden unless reopened as an accessible status feature."], accessibilityZh: ["裝飾型進度提示維持 aria-hidden，除非未來重新定義為可讀狀態。"] },
  { slug: "tabs", title: "Tabs", titleZh: "標籤頁", category: "Navigation", source: "components/animate-ui/primitives/base/tabs.tsx", demo: "tabs", states: ["default", "hover", "focus", "selected", "disabled"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-radius-md", "--hm-duration-fast"], usage: ["Live usage is the homepage Selected Work switch between Industry Projects and Academic / Side Projects.", "Treat this as a local portfolio pattern unless another route needs the same view switch."], usageZh: ["真實使用位置是首頁 Selected Work 的企業應用 / 學校產出切換。", "除非其他 route 也需要同樣的檢視切換，否則視為作品集 local pattern。"], accessibility: ["Use tablist, tab, and tabpanel semantics when the production component provides tabs."], accessibilityZh: ["正式 tabs 需維持 tablist、tab、tabpanel 語意。"] },
  { slug: "year-rail", title: "YearRail", titleZh: "年份導覽", category: "Navigation", source: "components/YearRail.tsx", demo: "year-rail", states: ["default", "active year", "reduced motion"], usage: ["Route-specific pattern for the About experience timeline.", "The active year follows the current `.experience-card[data-year]` reading focus."], usageZh: ["About 經歷時間軸的 route-specific pattern。", "目前年份依 `.experience-card[data-year]` 的閱讀焦點自動更新。"], tokens: ["--hm-muted", "--hm-ink", "--hm-purple", "--hm-duration-fast"], accessibility: ["提供 aria-label 與可聚焦按鈕。"] },
  { slug: "case-toc", title: "CaseTOC", titleZh: "案例頁目錄", category: "Navigation", source: "components/CaseTOC.tsx", demo: "case-toc", states: ["desktop visible", "active section", "scrollspy", "mobile hidden"], usage: ["Real usage: CaseStudyShell across Advantech, Crypto Arsenal, and Laushu case routes.", "Purpose: floating navigation for long-form case-study reading.", "Example note: shown in a docs-controlled shell to preserve the production visual state; scroll behavior belongs to the live case route.", "Mobile note: on production mobile breakpoints, CaseTOC is hidden to protect reading space."], usageZh: ["真實使用位置：Advantech、Crypto Arsenal、Laushu case routes 的 CaseStudyShell。", "用途：長篇案例閱讀的浮動章節導覽。", "範例說明：這裡用文件站的展示外框呈現 production 視覺狀態；完整 scroll 行為屬於正式案例頁。", "手機說明：正式站手機斷點會隱藏 CaseTOC，避免佔用閱讀空間。"], tokens: ["--cs-line", "--cs-accent", "--cs-text-muted", "--hm-duration-base"], accessibility: ["Uses nav semantics with aria-label.", "Active section uses aria-current when scrollspy or click state selects a section."], accessibilityZh: ["使用 nav 語意與 aria-label。", "目前 section 由 scrollspy 或點擊狀態選取時使用 aria-current。"] },
  { slug: "case-next-nav", title: "CaseNextNav", titleZh: "下一案例導覽", category: "Navigation", source: "components/case-study/CaseStudyShell.tsx", demo: "case-next-nav", states: ["previous", "next", "disabled"], usage: ["放在案例正文與 Footer 之間。", "提供返回首頁與前往下一個案例的明確出口。"], tokens: ["--hm-surface", "--hm-ink", "--hm-duration-fast"], accessibility: ["包含前往下一個專案的明確提示文字。"] },
  { slug: "accordion", title: "Accordion", titleZh: "手風琴", category: "Navigation", source: "components/ui/Accordion.tsx", demo: "accordion", states: ["collapsed", "expanded", "single", "multiple", "keyboard focus"], tokens: ["--hm-line", "--hm-surface", "--hm-radius-sm", "--hm-duration-fast", "--hm-ease-out"], usage: ["用於可分組的長列表導覽或文件區塊，例如 Design System sidebar。", "預設展開目前所在分類；需要多分類同時開啟時使用 multiple 模式。"], accessibility: ["Header 使用 button，並同步 aria-expanded 與 aria-controls。", "Panel 使用 role=\"region\" 並以 aria-labelledby 關聯 header。", "支援 Enter、Space 切換，方向鍵可在 header 之間移動焦點。"] },
  { slug: "floating-input", title: "FloatingInput", titleZh: "浮動標籤輸入框", category: "Data Entry", source: "components/Contact.tsx", demo: "input", states: ["empty", "focus", "filled", "error", "success", "disabled", "loading"], tokens: ["--hm-surface", "--hm-line", "--hm-ink", "--hm-muted", "--hm-purple", "--hm-error", "--hm-duration-fast"], usage: ["Live usage is the Contact page form for name, company, email, and phone fields."], usageZh: ["真實使用位置是 Contact page 表單中的姓名、公司、Email 與電話欄位。"] },
  { slug: "floating-textarea", title: "FloatingTextarea", titleZh: "浮動標籤多行輸入", category: "Data Entry", source: "components/Contact.tsx", demo: "textarea", states: ["empty", "focus", "filled", "error", "disabled"], tokens: ["--hm-surface", "--hm-line", "--hm-ink", "--hm-muted", "--hm-purple", "--hm-error"], usage: ["Live usage is the Contact page message field."], usageZh: ["真實使用位置是 Contact page 的訊息內容欄位。"] },
  { slug: "contact-method", title: "ContactMethod", titleZh: "聯絡方式", category: "Data Entry", source: "components/Contact.tsx", demo: "contact-method", states: ["default", "hover", "focus"], usage: ["顯示 Email、電話或社群帳號與對應動作。", "可複製資料使用 button；外部社群使用 link。"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-radius-md", "--hm-duration-fast"] },
  { slug: "select", title: "Select", titleZh: "下拉選單", category: "Data Entry", source: "components/ui/Select.tsx", demo: "select", states: ["placeholder", "open", "selected", "focus", "error", "disabled"], tokens: ["--hm-surface", "--hm-line", "--hm-ink", "--hm-muted", "--hm-radius-md", "--hm-duration-fast"], usage: ["Contract-only candidate.", "No current live usage in portfolio routes.", "Not a production example; keep it for future product surfaces or maintenance consistency.", "Use when options exceed four and keyboard navigation / focus management is required."], usageZh: ["Contract-only 候選元件。", "目前正式作品集 route 尚未直接使用。", "不是目前正式站的 production example；先保留給未來產品介面或維護一致性。", "選項超過 4 個，且需要鍵盤導覽與焦點管理時才使用。"] },
  { slug: "checkbox", title: "Checkbox", titleZh: "核取方塊", category: "Data Entry", source: "components/ui/Checkbox.tsx", demo: "checkbox", states: ["unchecked", "checked", "focus", "error", "disabled"], tokens: ["--hm-purple", "--hm-line", "--hm-surface", "--hm-radius-sm"], usage: ["Contract-only candidate.", "No current live usage in portfolio routes.", "Not a production example; do not add it to Contact unless a real multi-select task appears.", "Use for multi-select choices or independent boolean settings."], usageZh: ["Contract-only 候選元件。", "目前正式作品集 route 尚未直接使用。", "不是目前正式站的 production example；除非真的出現多選任務，不應硬塞進 Contact。", "用於多選或獨立的 boolean 設定。"] },
  { slug: "radio", title: "Radio", titleZh: "單選按鈕", category: "Data Entry", source: "components/ui/Radio.tsx", demo: "radio", states: ["unchecked", "checked", "focus", "error", "disabled"], tokens: ["--hm-purple", "--hm-line", "--hm-surface", "--hm-radius-pill"], usage: ["Contract-only candidate.", "No current live usage in portfolio routes.", "Not a production example; implement in production first if a real mutually exclusive choice appears.", "Use for mutually exclusive choices with fewer than four options."], usageZh: ["Contract-only 候選元件。", "目前正式作品集 route 尚未直接使用。", "不是目前正式站的 production example；若未來有真實互斥選項，應先導入 production 再文件化。", "用於少於 4 個選項的單選互斥情境。"] },
  { slug: "project-card", title: "ProjectCard", titleZh: "專案卡片", category: "Data Display", source: "components/ProjectCard.tsx", demo: "project-card", states: ["default", "three-layer hover", "coming soon"], usage: ["Live usage: Homepage / Selected Works.", "Purpose: portfolio work exploration through cover media, logo / title metadata, tags, CTA, and hover / focus overlay anatomy.", "Boundary: this is a local product-specific pattern, not a generic Card contract.", "The hover overlay, scrim, image scale, and info panel belong to the Selected Works interaction model.", "Coming Soon cards must not look clickable."], usageZh: ["真實使用位置：Homepage / Selected Works。", "用途：透過 cover media、logo / title metadata、tags、CTA 與 hover / focus overlay anatomy 支援作品探索。", "邊界：這是 local product-specific pattern，不是 generic Card contract。", "hover overlay、scrim、圖片縮放與資訊面板屬於 Selected Works 的互動模型。", "Coming Soon 卡片不能看起來可點。"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-radius-lg", "--hm-shadow-card-hover", "--hm-duration-base"], accessibility: ["Published projects provide one clear navigation target; disabled placeholders stay non-interactive."], accessibilityZh: ["已公開案例提供單一明確導覽目標；未上線 placeholder 維持不可互動。"] },
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
  { slug: "case-before-after", title: "CaseBeforeAfter", titleZh: "前後比較", category: "Case Study", source: "components/case-study/CaseBeforeAfter.tsx", hideSourceInHeader: true, status: "Source-level component", statusZh: "Source-level component", description: "A reusable two-panel comparison primitive for before / after states.", descriptionZh: "用於 before / after 狀態的可重用雙欄比較 primitive。", exampleLabel: "Two-panel comparison", exampleLabelZh: "雙欄比較", demo: "case-before-after", usage: ["Use for simple two-panel before / after comparisons.", "Good when the comparison itself is reusable, but the route does not need a full narrative frame.", "Do not use it as a replacement for BeforeAfterNarrativeFrame.", "Current status: source-level reusable component with no current direct route adoption."], usageZh: ["適合用在單純的 before / after 雙欄比較。", "如果只是比較兩個狀態，不需要完整案例敘事框架，可以用它。", "不應拿來取代 BeforeAfterNarrativeFrame。", "目前是 source-level reusable component，正式案例 route 尚未直接採用。"], behavior: [{ label: "Scope", description: "Source-level comparison primitive." }, { label: "Route adoption", description: "No current direct route adoption in Advantech, Crypto Arsenal, or Laushu." }, { label: "Responsive layout", description: "The comparison stacks on narrow viewports through the production case-study CSS." }, { label: "Selector boundary", description: "The `.cs-before-after-panel` selector belongs to CaseBeforeAfter." }], behaviorZh: [{ label: "Scope", description: "Source-level comparison primitive。" }, { label: "Route adoption", description: "目前 Advantech、Crypto Arsenal、Laushu 都沒有直接 route adoption。" }, { label: "Responsive layout", description: "窄版會透過 production case-study CSS 改為上下堆疊。" }, { label: "Selector boundary", description: "`.cs-before-after-panel` selector 屬於 CaseBeforeAfter。" }], anatomyParts: [{ part: "Root", description: "Wraps the comparison and owns the two-panel layout.", owner: "CaseBeforeAfter", code: ".cs-before-after" }, { part: "Before panel", description: "Receives the before state through the `before` ReactNode prop.", owner: "CaseBeforeAfter", code: ".cs-before-after-panel" }, { part: "After panel", description: "Receives the after state through the `after` ReactNode prop.", owner: "CaseBeforeAfter", code: ".cs-before-after-panel" }, { part: "Label", description: "Optional before / after labels shown above each content slot.", owner: "CaseBeforeAfter", code: ".cs-before-after-head" }, { part: "Panel content slot", description: "Slot for concise state content, media, or structured comparison details.", owner: "Route / caller", code: ".cs-before-after-content" }, { part: "Selector boundary", description: "The panel selector belongs to this independent component, not BeforeAfterNarrativeFrame.", owner: "CaseBeforeAfter", code: ".cs-before-after-panel" }], anatomyPartsZh: [{ part: "Root", description: "包住整個比較區，負責雙欄 layout。", owner: "CaseBeforeAfter", code: ".cs-before-after" }, { part: "Before panel", description: "透過 `before` ReactNode prop 接收 before 狀態。", owner: "CaseBeforeAfter", code: ".cs-before-after-panel" }, { part: "After panel", description: "透過 `after` ReactNode prop 接收 after 狀態。", owner: "CaseBeforeAfter", code: ".cs-before-after-panel" }, { part: "Label", description: "每個內容 slot 上方的 optional before / after label。", owner: "CaseBeforeAfter", code: ".cs-before-after-head" }, { part: "Panel content slot", description: "放置簡短狀態內容、媒體或結構化比較細節。", owner: "Route / caller", code: ".cs-before-after-content" }, { part: "Selector boundary", description: "這個 panel selector 屬於獨立的 CaseBeforeAfter，不屬於 BeforeAfterNarrativeFrame。", owner: "CaseBeforeAfter", code: ".cs-before-after-panel" }], codeGuidance: { importPath: "components/case-study/CaseBeforeAfter.tsx", example: "import CaseBeforeAfter from \"@/components/case-study/CaseBeforeAfter\";\n\n<CaseBeforeAfter\n  beforeLabel=\"Before\"\n  afterLabel=\"After\"\n  before={<YourBeforeState />}\n  after={<YourAfterState />}\n/>", props: [{ name: "before", type: "ReactNode", description: "Content rendered in the before panel." }, { name: "after", type: "ReactNode", description: "Content rendered in the after panel." }, { name: "beforeLabel", type: "ReactNode", description: "Optional label for the before panel." }, { name: "afterLabel", type: "ReactNode", description: "Optional label for the after panel." }, { name: "className", type: "string", description: "Optional className for the root wrapper." }], notes: ["Use it for simple state comparison only.", "Do not use it as a replacement for BeforeAfterNarrativeFrame."] }, codeGuidanceZh: { importPath: "components/case-study/CaseBeforeAfter.tsx", example: "import CaseBeforeAfter from \"@/components/case-study/CaseBeforeAfter\";\n\n<CaseBeforeAfter\n  beforeLabel=\"Before\"\n  afterLabel=\"After\"\n  before={<YourBeforeState />}\n  after={<YourAfterState />}\n/>", props: [{ name: "before", type: "ReactNode", description: "before panel 內渲染的內容。" }, { name: "after", type: "ReactNode", description: "after panel 內渲染的內容。" }, { name: "beforeLabel", type: "ReactNode", description: "before panel 的 optional label。" }, { name: "afterLabel", type: "ReactNode", description: "after panel 的 optional label。" }, { name: "className", type: "string", description: "root wrapper 的 optional className。" }], notes: ["只用於簡單狀態比較。", "不要拿它取代 BeforeAfterNarrativeFrame。"] }, tokenMappings: [{ token: "--cs-surface", role: "Panel and card surface inherited through the case-study shell." }, { token: "--cs-line", role: "Borders and dividers used by the comparison panels." }, { token: "--cs-accent", role: "Directional arrow and case accent color." }, { token: "--hm-space-md", role: "Shared spacing rhythm for the comparison layout." }], tokenMappingsZh: [{ token: "--cs-surface", role: "透過 case-study shell 繼承的 panel / card surface。" }, { token: "--cs-line", role: "比較 panel 的 border 與 divider。" }, { token: "--cs-accent", role: "方向箭頭與案例 accent color。" }, { token: "--hm-space-md", role: "比較 layout 使用的共用 spacing rhythm。" }], accessibility: ["Content should remain readable in both panels.", "Labels should identify the before / after states.", "Do not rely on color alone to communicate the comparison."], accessibilityZh: ["兩個 panel 內的內容都必須維持可讀。", "Label 需要清楚標示 before / after 狀態。", "不要只依賴顏色傳達比較關係。"], tokens: ["--cs-surface", "--cs-line", "--cs-accent", "--hm-space-md"], referenceCards: [{ label: "Source", value: "components/case-study/CaseBeforeAfter.tsx" }, { label: "CSS", value: ".cs-before-after / .cs-before-after-panel" }, { label: "Usage status", value: "No current direct route adoption" }, { label: "Boundary", value: ".cs-before-after-panel belongs to CaseBeforeAfter" }], referenceCardsZh: [{ label: "Source", value: "components/case-study/CaseBeforeAfter.tsx" }, { label: "CSS", value: ".cs-before-after / .cs-before-after-panel" }, { label: "Usage status", value: "目前沒有直接 route adoption" }, { label: "Boundary", value: ".cs-before-after-panel 屬於 CaseBeforeAfter" }], references: ["components/case-study/CaseBeforeAfter.tsx", "styles/case-study.css"] },
  { slug: "before-after-narrative-frame", title: "BeforeAfterNarrativeFrame", titleZh: "敘事型前後比較框架", category: "Case Study", source: "components/case-study/BeforeAfterNarrativeFrame.tsx", hideSourceInHeader: true, status: "Live route pattern", statusZh: "Live route pattern", description: "A case-study narrative frame for guided before / after comparisons.", descriptionZh: "用於案例頁引導式 before / after 比較的敘事框架。", exampleLabel: "Advantech / SolutionSection / Board 1", exampleLabelZh: "Advantech / SolutionSection / Board 1", demo: "before-after-narrative", usage: ["Use when a case-study section needs a guided before / after narrative.", "Use when the frame must carry scenario, design decision, and comparison structure.", "Live usage: Advantech, Crypto Arsenal, and Laushu.", "The frame owns the repeatable narrative shell; each route owns screenshots, redlines, sizing, and specific design judgment."], usageZh: ["適合用在案例頁需要引導式 before / after 敘事的段落。", "當畫面需要承載情境、設計決策與比較結構時使用。", "已用在 Advantech、Crypto Arsenal、Laushu。", "frame 負責可重複的敘事外框；截圖、redline、尺寸與專案判斷仍由各案例頁負責。"], behavior: [{ label: "Pattern", description: "Live route pattern used by Advantech, Crypto Arsenal, and Laushu." }, { label: "Route-owned content", description: "Routes own screenshots, redlines, sizing, and project-specific judgment." }, { label: "Responsive layout", description: "The comparison stacks on narrow viewports through the production case-study CSS." }, { label: "Panel slots", description: "Before and after content remains route-provided." }, { label: "Comparison flow", description: "The connector communicates relationship, but it cannot be the only meaning." }], behaviorZh: [{ label: "Pattern", description: "Advantech、Crypto Arsenal、Laushu 正式採用的 live route pattern。" }, { label: "Route-owned content", description: "截圖、redline、尺寸與專案判斷由各 route 負責。" }, { label: "Responsive layout", description: "窄版會透過 production case-study CSS 改為上下堆疊。" }, { label: "Panel slots", description: "Before 與 after 內容仍由 route 提供。" }, { label: "Comparison flow", description: "connector 用來傳達關係，但不能成為唯一語意。" }], anatomyParts: [{ part: "Frame shell", description: "Case-study narrative container for a guided comparison.", owner: "BeforeAfterNarrativeFrame", code: ".cs-before-after-narrative" }, { part: "Scenario badge / header", description: "Identifies the comparison moment and frames the section title.", owner: "BeforeAfterNarrativeFrame", code: ".cs-before-after-narrative-header / badge" }, { part: "Before panel", description: "Before state rendered through the internal panel shell.", owner: "BeforeAfterNarrativeFrame + BeforeAfterPanel", code: ".cs-before-after-state-panel" }, { part: "After panel", description: "After state rendered through the internal panel shell.", owner: "BeforeAfterNarrativeFrame + BeforeAfterPanel", code: ".cs-before-after-state-panel" }, { part: "Connector", description: "Visual relationship marker between the before and after panels.", owner: "BeforeAfterNarrativeFrame", code: ".cs-before-after-narrative-connector" }, { part: "Narrative copy", description: "Optional point list supplied by the route when the comparison needs explanation.", owner: "Route / caller", code: "points[]" }, { part: "BeforeAfterPanel internal visual shell", description: "Rendered inside BeforeAfterNarrativeFrame; internal anatomy, not a standalone route-level pattern.", owner: "BeforeAfterPanel", code: "components/case-study/BeforeAfterPanel.tsx" }], anatomyPartsZh: [{ part: "Frame shell", description: "案例頁引導式比較的敘事容器。", owner: "BeforeAfterNarrativeFrame", code: ".cs-before-after-narrative" }, { part: "Scenario badge / header", description: "標示比較情境，並建立 section title。", owner: "BeforeAfterNarrativeFrame", code: ".cs-before-after-narrative-header / badge" }, { part: "Before panel", description: "透過 internal panel shell 渲染 before 狀態。", owner: "BeforeAfterNarrativeFrame + BeforeAfterPanel", code: ".cs-before-after-state-panel" }, { part: "After panel", description: "透過 internal panel shell 渲染 after 狀態。", owner: "BeforeAfterNarrativeFrame + BeforeAfterPanel", code: ".cs-before-after-state-panel" }, { part: "Connector", description: "before 與 after panel 之間的視覺關係標記。", owner: "BeforeAfterNarrativeFrame", code: ".cs-before-after-narrative-connector" }, { part: "Narrative copy", description: "需要補充比較說明時，由 route 提供 optional point list。", owner: "Route / caller", code: "points[]" }, { part: "BeforeAfterPanel internal visual shell", description: "在 BeforeAfterNarrativeFrame 內部渲染；它是 internal anatomy，不是獨立 route-level pattern。", owner: "BeforeAfterPanel", code: "components/case-study/BeforeAfterPanel.tsx" }], codeGuidance: { importPath: "components/case-study/BeforeAfterNarrativeFrame.tsx", example: "import { BeforeAfterNarrativeFrame } from \"@/components/case-study/BeforeAfterNarrativeFrame\";\n\n<BeforeAfterNarrativeFrame\n  badge=\"Scenario 1\"\n  title=\"AI Chatbot component\"\n  beforeLabel=\"Before\"\n  afterLabel=\"After\"\n  before={<BeforeMedia />}\n  after={<AfterMedia />}\n  points={[{ label: \"Decision\", content: \"...\" }]}\n  tone=\"blue\"\n/>", props: [{ name: "badge", type: "ReactNode", description: "Scenario or moment label shown in the frame header." }, { name: "title", type: "ReactNode", description: "Primary heading for the comparison frame." }, { name: "before", type: "ReactNode", description: "Route-provided before-state content." }, { name: "after", type: "ReactNode", description: "Route-provided after-state content." }, { name: "beforeLabel / afterLabel", type: "ReactNode", description: "Labels that enable the internal BeforeAfterPanel shells." }, { name: "points", type: "BeforeAfterNarrativePoint[]", description: "Optional narrative points supplied by the route." }, { name: "tone", type: "\"blue\" | \"cyan\" | \"purple\" | \"neutral\"", description: "Tone preset for panel accent styling." }, { name: "connector", type: "ReactNode", description: "Optional custom connector between before and after panels." }, { name: "className slots", type: "string", description: "Optional className hooks for route-owned sizing and media context." }], notes: ["BeforeAfterPanel is rendered internally by this frame.", "Routes own screenshots, redlines, sizing, and project-specific judgment."] }, codeGuidanceZh: { importPath: "components/case-study/BeforeAfterNarrativeFrame.tsx", example: "import { BeforeAfterNarrativeFrame } from \"@/components/case-study/BeforeAfterNarrativeFrame\";\n\n<BeforeAfterNarrativeFrame\n  badge=\"Scenario 1\"\n  title=\"AI Chatbot component\"\n  beforeLabel=\"Before\"\n  afterLabel=\"After\"\n  before={<BeforeMedia />}\n  after={<AfterMedia />}\n  points={[{ label: \"Decision\", content: \"...\" }]}\n  tone=\"blue\"\n/>", props: [{ name: "badge", type: "ReactNode", description: "frame header 內的情境或比較時刻標籤。" }, { name: "title", type: "ReactNode", description: "比較 frame 的主標題。" }, { name: "before", type: "ReactNode", description: "route 提供的 before-state content。" }, { name: "after", type: "ReactNode", description: "route 提供的 after-state content。" }, { name: "beforeLabel / afterLabel", type: "ReactNode", description: "啟用 internal BeforeAfterPanel shell 的 labels。" }, { name: "points", type: "BeforeAfterNarrativePoint[]", description: "route 提供的 optional narrative points。" }, { name: "tone", type: "\"blue\" | \"cyan\" | \"purple\" | \"neutral\"", description: "panel accent styling 的 tone preset。" }, { name: "connector", type: "ReactNode", description: "before / after panel 之間的 optional custom connector。" }, { name: "className slots", type: "string", description: "route-owned sizing 與 media context 的 optional className hooks。" }], notes: ["BeforeAfterPanel 由這個 frame 內部渲染。", "截圖、redline、尺寸與專案判斷由 route 負責。"] }, tokenMappings: [{ token: ".cs-before-after-narrative", role: "Root shell for the guided narrative frame." }, { token: ".cs-before-after-narrative[data-tone]", role: "Tone-specific accent mapping derived from existing case-study tokens." }, { token: "--cs-before-after-narrative-panel-*", role: "Route-overridable panel shell values." }, { token: "--cs-before-after-state-panel-*", role: "Internal BeforeAfterPanel visual shell values." }, { token: "--hm-blue / --hm-purple / --cs-accent", role: "Tone mapping used by the narrative frame and route themes." }], tokenMappingsZh: [{ token: ".cs-before-after-narrative", role: "引導式 narrative frame 的 root shell。" }, { token: ".cs-before-after-narrative[data-tone]", role: "由既有 case-study tokens 推導的 tone-specific accent mapping。" }, { token: "--cs-before-after-narrative-panel-*", role: "route 可覆寫的 panel shell values。" }, { token: "--cs-before-after-state-panel-*", role: "internal BeforeAfterPanel visual shell values。" }, { token: "--hm-blue / --hm-purple / --cs-accent", role: "narrative frame 與 route theme 使用的 tone mapping。" }], accessibility: ["Before / after labels must be readable.", "The comparison should not rely on arrow direction alone.", "Panel content must remain meaningful when stacked.", "Narrative copy should not duplicate inaccessible visual-only content."], accessibilityZh: ["Before / after labels 必須可讀。", "比較關係不能只依賴箭頭方向。", "窄版堆疊時，panel 內容仍需有意義。", "敘事文字不應只是重複不可讀的純視覺資訊。"], tokens: ["--cs-before-after-narrative-panel-*", "--cs-before-after-state-panel-*", "--cs-accent", "--hm-space-md"], referenceCards: [{ label: "Source", value: "components/case-study/BeforeAfterNarrativeFrame.tsx" }, { label: "Live usage routes", value: "Advantech / Crypto Arsenal / Laushu" }, { label: "Internal part", value: "BeforeAfterPanel" }, { label: "Boundary", value: "Route owns media, redlines, sizing, and project-specific judgment" }], referenceCardsZh: [{ label: "Source", value: "components/case-study/BeforeAfterNarrativeFrame.tsx" }, { label: "Live usage routes", value: "Advantech / Crypto Arsenal / Laushu" }, { label: "Internal part", value: "BeforeAfterPanel" }, { label: "Boundary", value: "media、redline、尺寸與專案判斷由 route 負責" }], references: ["components/case-study/BeforeAfterNarrativeFrame.tsx", "components/case-study/BeforeAfterPanel.tsx", "styles/case-study.css"] },
  { slug: "zoomable-image", title: "ZoomableImage", titleZh: "可放大圖片", category: "Case Study", source: "components/case-study/ZoomableImage.tsx", demo: "zoom", states: ["default", "hover", "focus", "lightbox open", "fullscreen mode"], usage: ["Live context: product screenshots in case media and route-specific lightbox wrappers.", "Owns shared image display, zoom trigger, and image lightbox behavior.", "Does not own route-specific crop / ratio, video playback, video lightbox, or flow / matrix / diagram layout."], usageZh: ["真實語境：案例 media 與 route-specific lightbox wrappers 中的產品截圖。", "負責共用圖片顯示、放大 trigger 與 image lightbox 行為。", "不負責 route-specific 裁切 / 比例、影片播放、影片 lightbox 或流程圖 / 矩陣 / diagram layout。"], tokens: ["--hm-paper", "--hm-ink", "--hm-shadow-xl", "--hm-z-modal"], accessibility: ["Includes dialog semantics, aria-modal, localized close label, Escape close, backdrop close, and scroll lock.", "Focus trap / return-focus is a documented future improvement unless code implements it."], accessibilityZh: ["包含 dialog 語意、aria-modal、本地化關閉文字、Escape 關閉、backdrop 關閉與 scroll lock。", "focus trap / return-focus 仍屬 future improvement，除非 code 已實作。"] },
  { slug: "flow-scroll-hint", title: "FlowScrollHint", titleZh: "橫向捲動提示", category: "Case Study", source: "components/case-study/FlowScrollHint.tsx", demo: "flow-scroll-hint", states: ["hidden", "visible when next scroll container overflows"], usage: ["Live references: Advantech AnalysisSection, ProcessSection, ScenarioSection, and CaseFlowFrame overflow content.", "Decorative overflow affordance for wide flow, table, matrix, or diagram content.", "It detects the following sibling scroll container and toggles data-visible.", "Do not expand it into an interactive control or accessible instruction unless a future accessibility task reopens the decision."], usageZh: ["真實 reference：Advantech AnalysisSection、ProcessSection、ScenarioSection 與 CaseFlowFrame 的寬版內容。", "寬版 flow、table、matrix 或 diagram 的裝飾型 overflow 提示。", "偵測下一個 sibling scroll container，並切換 data-visible。", "未來 accessibility 任務重開前，不要把它擴成互動控制或可讀指示文字。"], tokens: ["--hm-muted", "--hm-duration-fast"], accessibility: ["Currently aria-hidden decorative UI by governance decision."], accessibilityZh: ["依治理決策，目前維持 aria-hidden 裝飾 UI。"] },
  { slug: "proposal-tabs", title: "ProposalTabs", titleZh: "方案比較標籤", category: "Case Study", source: "app/advantech/components/ProposalTabs.tsx", demo: "proposal-tabs", states: ["default", "hover", "selected"], usage: ["Live references: Advantech ProposalTabs and Crypto Arsenal WireframeProposalBoard.", "Compares multiple proposals for the same problem and explains adopted / rejected rationale.", "Case-specific pattern boundary: route supplies proposal data, captions, and adoption reasoning; shared CaseProposalTabs owns tab / carousel behavior."], usageZh: ["真實 reference：Advantech ProposalTabs 與 Crypto Arsenal WireframeProposalBoard。", "比較同一問題的多個設計提案與採用 / 未採用理由。", "case-specific pattern 邊界：route 提供 proposal data、caption 與採用理由；shared CaseProposalTabs 負責 tab / carousel 行為。"] },
  { slug: "case-info-card", title: "CaseInfoCard", titleZh: "案例資訊卡", category: "Case Study", source: "case study HeroSection.tsx", demo: "case-info-card", states: ["default", "responsive"], usage: ["Live references: Advantech, Crypto Arsenal, and Laushu HeroSection metadata grids.", "Presents timeline, team, role, scope, and tools.", "Mobile layout stacks by content without shrinking text below readable size."], usageZh: ["真實 reference：Advantech、Crypto Arsenal 與 Laushu HeroSection metadata grids。", "呈現時間、團隊、角色、負責項目與工具。", "手機版依內容堆疊，不縮小到難以閱讀。"] },
  { slug: "toast", title: "Toast", titleZh: "通知", category: "Feedback", source: "components/ui/Toast.tsx", demo: "toast", states: ["success", "warning", "error", "info", "dismissed"], usage: ["Live usage is Contact form success / error feedback.", "Use for non-blocking temporary feedback after an action."], usageZh: ["真實使用位置是 Contact form 的成功 / 失敗回饋。", "用於操作後的非阻斷式臨時通知。"], tokens: ["--hm-paper", "--hm-ink", "--hm-shadow-md", "--hm-radius-md", "--hm-duration-base"], accessibility: ["使用 role=\"status\" 或 role=\"alert\"。"] },
  { slug: "alert", title: "Alert", titleZh: "行內提示", category: "Feedback", source: "components/ui/Alert.tsx", demo: "alert", states: ["success", "warning", "error", "info", "dismissible"], usage: ["Contract-only component.", "No standalone live usage in portfolio routes.", "Not a production example; Contact currently uses Toast for submit feedback.", "Use for persistent or manually dismissed inline messages."], usageZh: ["Contract-only 元件。", "目前正式作品集 route 尚未有獨立使用。", "不是目前正式站的 production example；Contact 目前用 Toast 承擔送出回饋。", "用於表單頂部或區塊內的永久 / 手動關閉提示。"], tokens: ["--hm-surface", "--hm-ink", "--hm-error", "--hm-radius-md"], accessibility: ["狀態顏色需搭配圖示，不可僅依賴色彩。"] },
  { slug: "modal", title: "Modal", titleZh: "對話框", category: "Feedback", source: "components/ui/Modal.tsx", demo: "modal", states: ["closed", "open", "focus trapped", "primary action first", "dismissed"], usage: ["Real usage: Contact form review-before-submit confirmation.", "Purpose: review message details before sending.", "Flow: Send Message → Review Modal → Confirm Send → Toast success / error.", "Boundary: Modal does not own success or failure feedback; Toast handles the result state.", "The primary action appears before Cancel in DOM and keyboard order."], usageZh: ["真實使用位置：Contact form 的送出前確認。", "目的：送出訊息前再次確認聯絡資訊與訊息內容。", "流程：送出訊息 → 確認 Modal → 確認送出 → Toast 成功 / 失敗回饋。", "邊界：Modal 不負責成功或失敗結果；結果狀態由 Toast 承擔。", "主要動作在 DOM 與鍵盤順序中都排在返回修改之前。"], tokens: ["--hm-paper", "--hm-ink", "--hm-shadow-xl", "--hm-radius-lg", "--hm-duration-base", "--hm-z-modal"], accessibility: ["Focus enters the dialog when opened and returns on close.", "Escape closes the dialog while not loading.", "Footer button DOM order keeps the primary action before the secondary action."], accessibilityZh: ["開啟時焦點進入對話框，關閉時歸還。", "非 loading 狀態可用 Escape 關閉。", "Footer button DOM order 讓主要動作排在次要動作之前。"] },
  { slug: "skeleton", title: "Skeleton", titleZh: "骨架屏", category: "Feedback", source: "components/ui/Skeleton.tsx", demo: "skeleton", states: ["pending summary", "aria-hidden skeleton rows", "reduced motion"], usage: ["Real usage: Contact confirmation Modal pending state.", "Purpose: show the submission is still processing after Confirm Send.", "Boundary: Skeleton is not a persistent placeholder; it appears only during the real pending state.", "It does not replace Button loading; it supports the review summary area while the result is handled by Toast."], usageZh: ["真實使用位置：Contact 確認 Modal 的 pending state。", "目的：確認送出後，告訴使用者送出內容仍在處理中。", "邊界：Skeleton 不是常駐 placeholder，只在真實 pending state 出現。", "它不取代 Button loading；它輔助 review summary 區域，結果回饋仍由 Toast 承擔。"], tokens: ["--hm-line", "--hm-duration-slow", "--hm-radius-md"], accessibility: ["Skeleton marks visual placeholders as aria-hidden.", "The parent summary area uses aria-busy while loading."], accessibilityZh: ["Skeleton 視覺 placeholder 維持 aria-hidden。", "外層 summary area 在 loading 時使用 aria-busy。"] },
  { slug: "empty-state", title: "EmptyState", titleZh: "空狀態", category: "Feedback", source: "components/ui/EmptyState.tsx", demo: "empty", states: ["message only", "description", "with CTA"], usage: ["Backlog candidate.", "No current live usage in portfolio routes.", "Not a production example; use after a real search, filter, or list-empty state exists."], usageZh: ["Backlog 候選元件。", "目前正式作品集 route 尚未直接使用。", "不是目前正式站的 production example；等真實搜尋、篩選或列表空狀態出現後再使用。"], tokens: ["--hm-muted", "--hm-ink", "--hm-space-md"], accessibility: ["提供清晰說明文字取代空白。"] },
];

const components: DesignSystemDoc[] = componentSeeds.map((item) => ({
  kind: "component",
  slug: item.slug,
  title: item.title,
  titleZh: item.titleZh,
  category: item.category,
  source: item.source,
  hideSourceInHeader: item.hideSourceInHeader,
  status: item.status,
  statusZh: item.statusZh,
  exampleLabel: item.exampleLabel,
  exampleLabelZh: item.exampleLabelZh,
  demo: item.demo,
  description: item.description ?? `Reusable ${item.title} pattern used by the live portfolio.`,
  descriptionZh: item.descriptionZh ?? `作品集目前實際使用的 ${item.titleZh} pattern，文件以 production code 為準。`,
  usage: item.usage ?? [
    `Use ${item.title} only where its documented interaction and information hierarchy apply.`,
    "Prefer the shared implementation over duplicating page-specific markup.",
  ],
  usageZh: item.usageZh,
  behavior: item.behavior,
  behaviorZh: item.behaviorZh,
  states: item.states,
  statesZh: item.statesZh,
  tokens: item.tokens ?? ["--hm-ink", "--hm-surface", "--hm-line", "--hm-duration-fast"],
  accessibility: item.accessibility ?? [
    "Keyboard focus must remain visible.",
    "Do not rely on color alone to communicate state.",
    "Interactive controls need an accessible name.",
  ],
  accessibilityZh: item.accessibilityZh,
  anatomy: item.anatomy,
  anatomyZh: item.anatomyZh,
  anatomyParts: item.anatomyParts,
  anatomyPartsZh: item.anatomyPartsZh,
  codeGuidance: item.codeGuidance,
  codeGuidanceZh: item.codeGuidanceZh,
  tokenMappings: item.tokenMappings,
  tokenMappingsZh: item.tokenMappingsZh,
  referenceCards: item.referenceCards,
  referenceCardsZh: item.referenceCardsZh,
  references: item.references ?? [item.source],
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
    slug: "local-exceptions",
    title: "Component Boundaries",
    titleZh: "Component 邊界與 local patterns",
    description: "Shared component boundaries, route-specific local patterns, and extraction conditions used by the live portfolio.",
    descriptionZh: "正式作品集中 shared component 邊界、route-specific local patterns 與重新評估抽象化的條件。",
    category: "Reference",
    usage: [
      "Use shared components when responsibility, structure, and behavior repeat across routes.",
      "Keep project-specific storytelling, diagram geometry, and case logic local until the reuse threshold is real.",
      "ProjectCard hover overlay, Advantech Board 2 / 3, Laushu task flow, and Crypto matrix / FlowMatrixBoard each keep live route references and explicit shared boundaries.",
      "CaseTOC is a visible Navigation component, but its interaction contract remains scoped to the production case-study shell, section anchors, scroll position, and desktop-only floating layout.",
      "BeforeAfterPanel is internal-only inside BeforeAfterNarrativeFrame, while CaseBeforeAfter remains an independent component with no current direct route adoption.",
      "CaseBeforeAfter has its own .cs-before-after-panel selector boundary; it is not a BeforeAfterNarrativeFrame replacement or live route example.",
      "Componentize only when structure and behavior repeat beyond one case; keep project-specific story logic local until that reuse threshold is met.",
    ],
    usageZh: [
      "當 responsibility、結構與行為跨 route 重複時，才使用 shared component。",
      "project-specific storytelling、diagram geometry 與案例邏輯在 reuse threshold 真的出現前保留 local。",
      "ProjectCard hover overlay、Advantech Board 2 / 3、Laushu task flow、Crypto matrix / FlowMatrixBoard 都補上真實使用位置與 shared boundary。",
      "CaseTOC 是可見的 Navigation component，但互動 contract 仍限定在正式案例頁 shell、section anchors、scroll position 與桌機限定的 floating layout。",
      "BeforeAfterPanel 是 BeforeAfterNarrativeFrame 內部使用的 internal-only anatomy；CaseBeforeAfter 則維持獨立元件，目前沒有直接 route adoption。",
      "CaseBeforeAfter 擁有自己的 `.cs-before-after-panel` selector 邊界；它不是 BeforeAfterNarrativeFrame 的替代元件，也不作為 live route example 呈現。",
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
    slug: "future-backlog",
    title: "Future Candidates / Backlog",
    titleZh: "Future candidates / backlog",
    description: "Source-level contracts that are intentionally excluded from the live component catalog until a production route adopts them.",
    descriptionZh: "尚未進入 live component catalog 的 source-level contracts；等正式 route 真的採用後再文件化。",
    category: "Reference",
    usage: [
      "Future candidates not shown in the live catalog: Radio and Alert.",
      "Radio may be useful if the Contact form later adds a small set of inquiry-type choices.",
      "Alert may be useful if failed submissions need a persistent error summary.",
      "Backlog contracts not shown in this catalog: Select, Checkbox, and EmptyState.",
      "They remain source-level candidates only and should return to this site after a real portfolio route adopts them.",
    ],
    usageZh: [
      "未放入 live catalog 的 future candidates：Radio、Alert。",
      "若 Contact 表單未來需要少量詢問類型選項，Radio 可能適合。",
      "若送出失敗需要持續顯示的錯誤摘要，Alert 可能適合。",
      "未放入本 catalog 的 backlog contracts：Select、Checkbox、EmptyState。",
      "它們目前只保留為 source-level candidates；等正式作品集 route 真的採用後，才回到這份文件站。",
    ],
    references: ["components/ui/Radio.tsx", "components/ui/Alert.tsx", "components/ui/Select.tsx", "components/ui/Checkbox.tsx", "components/ui/EmptyState.tsx"],
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
