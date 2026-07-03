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
  { slug: "button", title: "Button / LinkButton", titleZh: "按鈕 / 連結按鈕", category: "General", source: "components/ui/Button.tsx", demo: "button", states: ["default", "hover", "focus", "active", "disabled", "loading", "size: sm/md/lg", "variant: primary/secondary/danger"], tokens: ["--hm-btn-primary-bg", "--hm-btn-height-md", "--hm-btn-radius", "--hm-btn-transition-duration", "--hm-btn-font-size-md"], usage: ["Use as a command button when no href is provided.", "When href is provided, treat it as a LinkButton contract for navigation.", "Do not use danger for normal navigation or project tone."], usageZh: ["沒有 href 時才是 command button。", "有 href 時視為 LinkButton contract，用於導頁或錨點。", "danger 只用於破壞性操作，不用於一般導覽或專案色。"], accessibility: ["Renders a native button or anchor according to href.", "Loading state sets aria-busy and disables repeat action."], accessibilityZh: ["依 href 輸出 button 或 anchor 語意。", "loading 狀態會設定 aria-busy 並避免重複送出。"] },
  { slug: "language-switcher", title: "LanguageSwitcher", titleZh: "語系切換", category: "General", source: "components/LanguageSwitcher.tsx", demo: "language-switcher", states: ["closed", "open", "selected", "loading"], usage: ["Lives at the end of the global navbar.", "Preserves the current route and hash when switching locale."], usageZh: ["放在全站導覽列尾端。", "切換語系時保留目前路徑與 hash。"], tokens: ["--hm-surface", "--hm-ink", "--hm-line", "--hm-radius-md"], accessibility: ["Uses button semantics with aria-expanded for the menu trigger."], accessibilityZh: ["選單 trigger 使用 button 與 aria-expanded 標示狀態。"] },
  { slug: "navbar", title: "Navbar", titleZh: "導覽列", category: "Shell", source: "components/Navbar.tsx", demo: "navbar", states: ["default", "hidden on scroll", "mobile open", "language menu open"], usage: ["Global brand and primary navigation shell.", "Scroll hides and restores the navbar without changing page layout."], usageZh: ["全站品牌與主要導覽骨架。", "向下捲動暫時收起，停止或向上捲動時恢復，不改變頁面排版。"], tokens: ["--hm-paper", "--hm-ink", "--hm-line", "--hm-duration-slow", "--hm-ease-out", "--hm-space-md", "--hm-shadow-sm"], accessibility: ["Uses nav semantics and keeps the mobile menu button state explicit."], accessibilityZh: ["使用 nav 語意，手機選單按鈕需明確標示展開狀態。"] },
  { slug: "footer", title: "Footer", titleZh: "頁腳", category: "Shell", source: "components/Footer.tsx", demo: "footer", states: ["default", "social hover", "mobile stacked"], usage: ["Closes general pages and case-study pages.", "Keeps copyright and external social links minimal."], usageZh: ["放在一般頁面與案例頁最底部。", "只保留必要版權資訊與外部社群連結。"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-space-xl"], accessibility: ["Uses footer semantics and accessible names for social links."], accessibilityZh: ["使用 footer 語意，社群圖示需有可讀名稱。"] },
  { slug: "scroll-progress", title: "ScrollProgress", titleZh: "滾動進度條", category: "Shell", source: "components/ScrollProgress.tsx", demo: "scroll-progress", states: ["0%", "in progress", "100%"], usage: ["Supports long case-study reading progress.", "Stays fixed without taking document layout space."], usageZh: ["用於較長案例頁的閱讀進度提示。", "固定在視窗頂端，不占用文件排版高度。"], tokens: ["--hm-purple", "--hm-duration-fast"], accessibility: ["Decorative progress should stay aria-hidden unless reopened as an accessible status feature."], accessibilityZh: ["裝飾型進度提示維持 aria-hidden，除非未來重新定義為可讀狀態。"] },
  { slug: "tabs", title: "Tabs", titleZh: "標籤頁", category: "Navigation", source: "components/animate-ui/primitives/base/tabs.tsx", demo: "tabs", states: ["default", "hover", "focus", "selected", "disabled"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-radius-md", "--hm-duration-fast"], usage: ["Switches mutually exclusive views at the same hierarchy level."], usageZh: ["用於切換同層級、互斥的內容檢視。"], accessibility: ["Use tablist, tab, and tabpanel semantics when the production component provides tabs."], accessibilityZh: ["正式 tabs 需維持 tablist、tab、tabpanel 語意。"] },
  { slug: "case-toc", title: "CaseTOC", titleZh: "案例目錄", category: "Navigation", source: "components/CaseTOC.tsx", demo: "case-toc", states: ["hidden before content", "visible", "active section"], usage: ["Protected floating navigation pattern for long case-study pages.", "Do not change the interaction unless explicitly approved."], usageZh: ["案例頁長篇內容的受保護浮動導覽 pattern。", "未明確批准前不要改互動或浮動行為。"], tokens: ["--hm-ink", "--hm-muted", "--hm-duration-fast"], accessibility: ["Uses nav semantics with section links."], accessibilityZh: ["使用 nav 語意與章節連結。"] },
  { slug: "year-rail", title: "YearRail", titleZh: "年份導覽", category: "Navigation", source: "components/YearRail.tsx", demo: "year-rail", states: ["default", "active year", "reduced motion"], usage: ["用於 About 經歷時間軸，快速跳到指定年份。", "目前年份依閱讀焦點自動更新。"], tokens: ["--hm-muted", "--hm-ink", "--hm-purple", "--hm-duration-fast"], accessibility: ["提供 aria-label 與可聚焦按鈕。"] },
  { slug: "case-next-nav", title: "CaseNextNav", titleZh: "下一案例導覽", category: "Navigation", source: "components/case-study/CaseStudyShell.tsx", demo: "case-next-nav", states: ["previous", "next", "disabled"], usage: ["放在案例正文與 Footer 之間。", "提供返回首頁與前往下一個案例的明確出口。"], tokens: ["--hm-surface", "--hm-ink", "--hm-duration-fast"], accessibility: ["包含前往下一個專案的明確提示文字。"] },
  { slug: "accordion", title: "Accordion", titleZh: "手風琴", category: "Navigation", source: "components/ui/Accordion.tsx", demo: "accordion", states: ["collapsed", "expanded", "single", "multiple", "keyboard focus"], tokens: ["--hm-line", "--hm-surface", "--hm-radius-sm", "--hm-duration-fast", "--hm-ease-out"], usage: ["用於可分組的長列表導覽或文件區塊，例如 Design System sidebar。", "預設展開目前所在分類；需要多分類同時開啟時使用 multiple 模式。"], accessibility: ["Header 使用 button，並同步 aria-expanded 與 aria-controls。", "Panel 使用 role=\"region\" 並以 aria-labelledby 關聯 header。", "支援 Enter、Space 切換，方向鍵可在 header 之間移動焦點。"] },
  { slug: "floating-input", title: "FloatingInput", titleZh: "浮動標籤輸入框", category: "Data Entry", source: "components/Contact.tsx", demo: "input", states: ["empty", "focus", "filled", "error", "success", "disabled", "loading"], tokens: ["--hm-surface", "--hm-line", "--hm-ink", "--hm-muted", "--hm-purple", "--hm-error", "--hm-duration-fast"], usage: ["用於聯絡表單的單行輸入。"] },
  { slug: "floating-textarea", title: "FloatingTextarea", titleZh: "浮動標籤多行輸入", category: "Data Entry", source: "components/Contact.tsx", demo: "textarea", states: ["empty", "focus", "filled", "error", "disabled"], tokens: ["--hm-surface", "--hm-line", "--hm-ink", "--hm-muted", "--hm-purple", "--hm-error"], usage: ["用於聯絡表單的多行訊息輸入。"] },
  { slug: "contact-method", title: "ContactMethod", titleZh: "聯絡方式", category: "Data Entry", source: "components/Contact.tsx", demo: "contact-method", states: ["default", "hover", "focus"], usage: ["顯示 Email、電話或社群帳號與對應動作。", "可複製資料使用 button；外部社群使用 link。"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-radius-md", "--hm-duration-fast"] },
  { slug: "select", title: "Select", titleZh: "下拉選單", category: "Data Entry", source: "components/ui/Select.tsx", demo: "select", states: ["placeholder", "open", "selected", "focus", "error", "disabled"], tokens: ["--hm-surface", "--hm-line", "--hm-ink", "--hm-muted", "--hm-radius-md", "--hm-duration-fast"], usage: ["當選項超過 4 個時使用。", "支援鍵盤導覽與焦點管理。"] },
  { slug: "checkbox", title: "Checkbox", titleZh: "核取方塊", category: "Data Entry", source: "components/ui/Checkbox.tsx", demo: "checkbox", states: ["unchecked", "checked", "focus", "error", "disabled"], tokens: ["--hm-purple", "--hm-line", "--hm-surface", "--hm-radius-sm"], usage: ["用於多選或獨立的開關設定。"] },
  { slug: "radio", title: "Radio", titleZh: "單選按鈕", category: "Data Entry", source: "components/ui/Radio.tsx", demo: "radio", states: ["unchecked", "checked", "focus", "error", "disabled"], tokens: ["--hm-purple", "--hm-line", "--hm-surface", "--hm-radius-pill"], usage: ["用於少於 4 個選項的單選互斥情境。"] },
  { slug: "project-card", title: "ProjectCard", titleZh: "專案卡片", category: "Data Display", source: "components/Works.tsx", demo: "project-card", states: ["default", "three-layer hover", "coming soon"], usage: ["Primary content unit in Selected Work.", "The hover overlay, scrim, image scale, and info panel are protected interaction details.", "Coming Soon cards must not look clickable."], usageZh: ["Selected Work 的主要內容單位。", "hover overlay、scrim、圖片縮放與資訊面板是受保護互動細節。", "Coming Soon 卡片不能看起來可點。"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-radius-lg", "--hm-shadow-card-hover", "--hm-duration-base"], accessibility: ["Published projects provide one clear navigation target; disabled placeholders stay non-interactive."], accessibilityZh: ["已公開案例提供單一明確導覽目標；未上線 placeholder 維持不可互動。"] },
  { slug: "section-heading", title: "SectionHeading", titleZh: "區塊標題", category: "Data Display", source: "app/about-me/page.tsx", demo: "section-heading", states: ["default", "responsive"], usage: ["分隔首頁與 About 的主要內容章節。", "左右線段只輔助層級，不取代清楚的標題文字。"], tokens: ["--hm-ink", "--hm-line", "--hm-space-md"], accessibility: ["使用 <h2> 或適當的層級。"] },
  { slug: "project-tag", title: "ProjectTag", titleZh: "專案標籤", category: "Data Display", source: "components/Works.tsx", demo: "tags", states: ["default", "project tone"], usage: ["標示專案使用的技術、角色或分類。"], tokens: ["--hm-surface", "--hm-ink", "--hm-radius-pill"], accessibility: ["不應作為可點擊元素，僅供展示。"] },
  { slug: "social-link", title: "SocialLink", titleZh: "社群連結", category: "Data Display", source: "components/Footer.tsx", demo: "social-link", states: ["default", "hover", "focus"], usage: ["用圖示連到 LinkedIn、GitHub 等外部個人頁面。", "新視窗開啟時必須加上安全 rel 屬性。"], tokens: ["--hm-muted", "--hm-ink", "--hm-duration-fast"], accessibility: ["提供 aria-label 說明圖示意義。"] },
  { slug: "skill-category-card", title: "SkillCategoryCard", titleZh: "技能分類卡", category: "Data Display", source: "app/about-me/page.tsx", demo: "skill-card", states: ["default", "hover", "focus"], usage: ["將技能依 Product、Design、AI 等主題分組。", "內容保持可掃讀，不將每個單項技能再做成卡片。"], tokens: ["--hm-surface", "--hm-ink", "--hm-radius-md", "--hm-duration-base"], accessibility: ["確保列表使用 <ul> 與 <li> 語意。"] },
  { slug: "experience-card", title: "ExperienceCard", titleZh: "經歷卡片", category: "Data Display", source: "app/about-me/page.tsx", demo: "experience-card", states: ["before reveal", "visible", "active year"], usage: ["呈現單一工作、實習或專案經歷。", "年份需與 YearRail 及錨點 id 保持一致。"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-radius-lg", "--hm-duration-slow"], accessibility: ["使用 <article> 封裝獨立經歷內容。"] },
  { slug: "hero-badge", title: "HeroBadge", titleZh: "Hero 徽章", category: "Data Display", source: "components/Hero.tsx", demo: "hero-badge", states: ["default", "animated", "reduced motion"], usage: ["在首頁 Hero 簡短標示目前職涯定位或求職狀態。", "只保留一個核心訊息，避免取代主標題。"], tokens: ["--hm-purple", "--hm-surface", "--hm-radius-pill", "--hm-duration-base"], accessibility: ["動畫必須尊重 prefers-reduced-motion。"] },
  { slug: "case-hero", title: "CaseHero", titleZh: "案例 Hero", category: "Case Study", source: "case study section HeroSection.tsx", demo: "case-hero", states: ["Advantech", "Crypto Arsenal", "Laushu", "mobile"], usage: ["案例頁首屏呈現封面、專案標題、標籤與關鍵背景。", "封面保持 full-bleed，資訊內容限制在 1440px 內。"] },
  { slug: "case-section", title: "CaseSection", titleZh: "案例區塊", category: "Case Study", source: "components/case-study/CaseSection.tsx", demo: "case-section", states: ["paper", "surface", "custom class"], usage: ["包裝案例頁的一般內容章節並提供 TOC anchor。", "paper 與 surface 交替建立閱讀節奏；特殊滿版 section 不強制使用。"] },
  { slug: "zoomable-image", title: "ZoomableImage", titleZh: "可放大圖片", category: "Case Study", source: "components/case-study/ZoomableImage.tsx", demo: "zoom", states: ["default", "hover", "focus", "lightbox open"] },
  { slug: "proposal-tabs", title: "ProposalTabs", titleZh: "方案比較標籤", category: "Case Study", source: "app/advantech/components/ProposalTabs.tsx", demo: "proposal-tabs", states: ["default", "hover", "selected"], usage: ["比較同一問題的多個設計提案與採用理由。", "切換提案時重設內部 slide，採用方案需有文字與圖示雙重標記。"] },
  { slug: "case-info-card", title: "CaseInfoCard", titleZh: "案例資訊卡", category: "Case Study", source: "case study HeroSection.tsx", demo: "case-info-card", states: ["default", "responsive"], usage: ["呈現時間、團隊、角色、負責項目與工具。", "手機版依內容堆疊，不縮小到難以閱讀。"] },
  { slug: "toast", title: "Toast", titleZh: "通知", category: "Feedback", source: "components/ui/Toast.tsx", demo: "toast", states: ["success", "warning", "error", "info", "dismissed"], usage: ["用於操作後的非阻斷式臨時通知。"], tokens: ["--hm-paper", "--hm-ink", "--hm-shadow-md", "--hm-radius-md", "--hm-duration-base"], accessibility: ["使用 role=\"status\" 或 role=\"alert\"。"] },
  { slug: "alert", title: "Alert", titleZh: "行內提示", category: "Feedback", source: "components/ui/Alert.tsx", demo: "alert", states: ["success", "warning", "error", "info", "dismissible"], usage: ["用於表單頂部或區塊內的永久/手動關閉提示。"], tokens: ["--hm-surface", "--hm-ink", "--hm-error", "--hm-radius-md"], accessibility: ["狀態顏色需搭配圖示，不可僅依賴色彩。"] },
  { slug: "modal", title: "Modal", titleZh: "對話框", category: "Feedback", source: "components/ui/Modal.tsx", demo: "modal", states: ["closed", "open", "keyboard focus", "dismissed"], usage: ["阻斷目前操作，要求使用者回應。"], tokens: ["--hm-paper", "--hm-ink", "--hm-shadow-xl", "--hm-radius-lg", "--hm-duration-base"], accessibility: ["開啟時焦點進入對話框，關閉時歸還。支援 Esc 關閉。"] },
  { slug: "skeleton", title: "Skeleton", titleZh: "骨架屏", category: "Feedback", source: "components/ui/Skeleton.tsx", demo: "skeleton", states: ["loading", "reduced motion"], usage: ["佔位用，降低頁面跳動感與感知等待時間。"], tokens: ["--hm-line", "--hm-duration-slow", "--hm-radius-md"], accessibility: ["需有 aria-busy 或 aria-hidden，避免讀取閃爍。"] },
  { slug: "empty-state", title: "EmptyState", titleZh: "空狀態", category: "Feedback", source: "components/ui/EmptyState.tsx", demo: "empty", states: ["message only", "description", "with CTA"], usage: ["無資料或搜尋無結果時顯示，可搭配解決動作。"], tokens: ["--hm-muted", "--hm-ink", "--hm-space-md"], accessibility: ["提供清晰說明文字取代空白。"] },
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
