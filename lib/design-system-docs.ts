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
  props: Array<{ name: string; type: string; description: string; usedBy?: string }>;
  notes?: string[];
};

export type DesignSystemTokenMapping = {
  token: string;
  role: string;
  usage?: string;
};

export type DesignSystemStateRow = {
  state: string;
  appliesTo: string;
  behavior: string;
  liveUsage: string;
  trigger?: string;
  whatChanges?: string;
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
  stateRows?: DesignSystemStateRow[];
  stateRowsZh?: DesignSystemStateRow[];
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
  {
    kind: "foundation",
    slug: "colors",
    title: "Colors",
    titleZh: "色彩",
    description: "Grouped color tokens for brand actions, text, surfaces, accents, feedback, and case-study tones.",
    descriptionZh: "依品牌操作、文字、surface、accent、回饋與案例 tone 分組的色彩 tokens。",
    category: "Foundations",
    usage: [
      "Start from semantic tokens such as `--hm-purple`, `--hm-ink`, and `--hm-surface` before using primitive scale values.",
      "Use purple for primary actions and active signals.",
      "Use project tone aliases only inside case-study contexts.",
    ],
    usageZh: [
      "優先使用 `--hm-purple`、`--hm-ink`、`--hm-surface` 這類 semantic token，再考慮 primitive 色階。",
      "紫色只用於主要操作與 active 訊號。",
      "Project tone aliases 只放在案例頁語境內。",
    ],
    tokens: ["--hm-purple-*", "--hm-paper / --hm-surface", "--hm-ink / --text-*", "--hm-success / warning / error / info", "--cs-*"],
    references: ["styles/tokens.css", "lib/design-system-data.ts", "docs/design-system/02-tokens.md"],
  },
  {
    kind: "foundation",
    slug: "typography",
    title: "Typography",
    titleZh: "字體與排版",
    description: "Type scale and text roles used by headings, body copy, labels, and helper text.",
    descriptionZh: "用於標題、內文、label 與輔助文字的字級與文字角色。",
    category: "Foundations",
    usage: [
      "Use the heading scale to keep page and section hierarchy clear.",
      "Use body and small text tokens for dense UI labels and helper copy.",
      "Keep full English words readable; avoid forced character-by-character breaks.",
    ],
    usageZh: [
      "用 heading scale 維持頁面與 section 層級。",
      "密集 UI label 與 helper copy 使用 body / small text tokens。",
      "英文單字需保持可讀，不用逐字強制斷行。",
    ],
    tokens: ["--fs-h1…xs", "--hm-fs-h1…xs", "--hm-fw-regular…bold"],
    references: ["styles/tokens.css", "lib/design-system-data.ts", "docs/design-system/02-tokens.md"],
  },
  {
    kind: "foundation",
    slug: "spacing",
    title: "Spacing",
    titleZh: "間距",
    description: "Spacing scale for component padding, content rhythm, grid gaps, and section distance.",
    descriptionZh: "用於元件內距、內容節奏、grid gaps 與 section distance 的間距刻度。",
    category: "Foundations",
    usage: [
      "Use smaller steps for compact controls and tags.",
      "Use medium steps for card internals and same-section rhythm.",
      "Use large steps for section distance and major page breathing room.",
    ],
    usageZh: [
      "小刻度用於 compact controls 與 tags。",
      "中刻度用於卡片內距與同一 section 的節奏。",
      "大刻度用於 section 間距與主要頁面留白。",
    ],
    tokens: ["--hm-space-1…20", "--hm-space-3xs…3xl", "--hm-page-gutter"],
    references: ["styles/tokens.css", "lib/design-system-data.ts", "docs/design-system/02-tokens.md"],
  },
  {
    kind: "foundation",
    slug: "radius",
    title: "Border Radius",
    titleZh: "圓角",
    description: "Radius tokens for controls, cards, panels, badges, and CTA buttons.",
    descriptionZh: "用於控制項、卡片、面板、badge 與 CTA button 的圓角 tokens。",
    category: "Foundations",
    usage: [
      "Use the same radius for components at the same visual level.",
      "Use pill radius for badges and compact controls.",
      "Use the button radius only for shared CTA buttons.",
    ],
    usageZh: [
      "同視覺層級的元件使用一致圓角。",
      "Badge 與 compact controls 使用 pill radius。",
      "Button radius 只用於 shared CTA buttons。",
    ],
    tokens: ["--hm-radius-sm / md / lg", "--hm-radius-pill", "--hm-radius-button"],
    references: ["styles/tokens.css", "lib/design-system-data.ts", "docs/design-system/02-tokens.md"],
  },
  {
    kind: "foundation",
    slug: "shadows",
    title: "Shadows",
    titleZh: "陰影",
    description: "Elevation tokens for light card lift, panels, overlays, and hover emphasis.",
    descriptionZh: "用於輕卡片層級、面板、overlay 與 hover emphasis 的 elevation tokens。",
    category: "Foundations",
    usage: [
      "Use shadows to express elevation, not as a replacement for borders.",
      "Use stronger shadows for overlays and high-focus surfaces.",
      "Hover elevation should not shift layout.",
    ],
    usageZh: [
      "陰影用來表達層級，不取代邊框。",
      "較強陰影用於 overlay 與高焦點 surface。",
      "Hover elevation 不應造成版面位移。",
    ],
    tokens: ["--shadow-sm / md / lg / xl", "--hm-shadow-sm / md / lg / xl", "--shadow-card-hover"],
    references: ["styles/tokens.css", "lib/design-system-data.ts", "docs/design-system/02-tokens.md"],
  },
  {
    kind: "foundation",
    slug: "motion",
    title: "Motion",
    titleZh: "動效",
    description: "Duration and easing tokens for state changes, hover feedback, reveals, and page entry motion.",
    descriptionZh: "用於狀態切換、hover feedback、reveal 與頁面進場的 duration / easing tokens。",
    category: "Foundations",
    usage: [
      "Use fast durations for micro-interactions.",
      "Use base or slow durations for visible interface movement.",
      "Respect reduced-motion behavior for non-essential animation.",
    ],
    usageZh: [
      "Micro-interactions 使用較快 duration。",
      "明顯介面移動使用 base 或 slow duration。",
      "非必要動畫需尊重 reduced-motion 行為。",
    ],
    tokens: ["--hm-duration-*", "--hm-ease-*"],
    references: ["styles/tokens.css", "lib/design-system-data.ts", "docs/design-system/02-tokens.md"],
  },
];

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
  stateRows?: DesignSystemStateRow[];
  stateRowsZh?: DesignSystemStateRow[];
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
  {
    slug: "button",
    title: "Button / LinkButton",
    titleZh: "按鈕 / 連結按鈕",
    category: "General",
    source: "components/ui/Button.tsx",
    hideSourceInHeader: true,
    status: "Live route component",
    statusZh: "正式 route 元件",
    description: "Action components used for form submission, portfolio navigation, and project CTAs.",
    descriptionZh: "用於表單送出、作品集導覽與專案 CTA 的行動元件。",
    exampleLabel: "Production usage examples",
    exampleLabelZh: "正式站使用範例",
    demo: "button",
    stateRows: [
      { state: "Default", appliesTo: "Button / LinkButton", behavior: "Renders the primary or secondary visual treatment from the shared `.ds-button` contract.", liveUsage: "Hero navigation, ProjectCard CTA, Contact submit." },
      { state: "Hover / focus", appliesTo: "Button / LinkButton", behavior: "Uses shared hover colors and visible focus state from the global token CSS.", liveUsage: "General CTA focus and ProjectCard CTA interactions." },
      { state: "Active", appliesTo: "Button / LinkButton", behavior: "Primary action uses the active background token while pressed.", liveUsage: "CTA press feedback across navigation and submit actions." },
      { state: "Disabled", appliesTo: "Button", behavior: "Native button is disabled, non-interactive, and uses class-based disabled styling.", liveUsage: "Coming Soon CTA and unavailable next-project CTA." },
      { state: "Loading / processing", appliesTo: "Button", behavior: "Sets `aria-busy`, disables repeat action, and swaps label for `loadingLabel` with spinner.", liveUsage: "Contact submit and review confirmation flow." },
      { state: "Navigation / link behavior", appliesTo: "LinkButton", behavior: "`href` switches the component to anchor / locale-aware Link semantics.", liveUsage: "Hero View My Work / My Journey, ProjectCard CTA, case navigation." },
    ],
    stateRowsZh: [
      { state: "Default", appliesTo: "Button / LinkButton", behavior: "使用共用 `.ds-button` contract 的 primary 或 secondary 視覺樣式。", liveUsage: "Hero 導覽、ProjectCard CTA、Contact submit。" },
      { state: "Hover / focus", appliesTo: "Button / LinkButton", behavior: "使用 global token CSS 裡的 hover color 與可見 focus state。", liveUsage: "一般 CTA focus 與 ProjectCard CTA 互動。" },
      { state: "Active", appliesTo: "Button / LinkButton", behavior: "Primary action 按下時使用 active background token。", liveUsage: "導覽與送出動作的 CTA press feedback。" },
      { state: "Disabled", appliesTo: "Button", behavior: "輸出 disabled native button，不可互動，並使用 class-based disabled styling。", liveUsage: "Coming Soon CTA 與 unavailable next-project CTA。" },
      { state: "Loading / processing", appliesTo: "Button", behavior: "設定 `aria-busy`、避免重複操作，並用 spinner 與 `loadingLabel` 取代原 label。", liveUsage: "Contact submit 與送出前確認流程。" },
      { state: "Navigation / link behavior", appliesTo: "LinkButton", behavior: "傳入 `href` 時切換成 anchor / locale-aware Link 語意。", liveUsage: "Hero View My Work / My Journey、ProjectCard CTA、case navigation。" },
    ],
    usage: [
      "Use Button for in-place actions, form submit, disabled states, and loading states.",
      "Use LinkButton when the action navigates to another route or anchor.",
      "Use one primary action per section when possible.",
      "Use disabled state only when the action is unavailable, not as decoration.",
      "Use loading state for async actions such as Contact submit.",
    ],
    usageZh: [
      "Button 用於原地操作、表單送出、disabled state 與 loading state。",
      "動作會導到其他 route 或 anchor 時，使用 LinkButton 語意。",
      "同一個 section 盡量只保留一個 primary action。",
      "disabled state 只用在動作真的不可用時，不拿來當裝飾。",
      "async action 例如 Contact submit，才使用 loading state。",
    ],
    anatomyParts: [
      { part: "Root element", description: "Renders native `<button>` when no `href` is provided; renders `<a>` or locale-aware Link when `href` is provided.", owner: "Button.tsx", code: ".ds-button" },
      { part: "Label", description: "Visible action text passed through `children` or replaced by `loadingLabel` during loading.", owner: "Caller", code: ".ds-button-content span" },
      { part: "Icon / loader slot", description: "Loader2 spinner appears only when `loading` is true.", owner: "Button.tsx", code: ".ds-button-spinner" },
      { part: "Disabled state", description: "Native disabled behavior for action buttons; disabled anchors are not part of the current contract.", owner: "Button.tsx", code: ":disabled / [aria-disabled=\"true\"]" },
      { part: "Link wrapper / href behavior", description: "Hash, http, mailto, and tel use native anchor; internal routes use the i18n Link wrapper.", owner: "Button.tsx", code: "href branch" },
      { part: "Loading indicator", description: "Loading state sets `aria-busy`, disables the button, and prevents duplicate submit.", owner: "Button.tsx", code: "loading / loadingLabel" },
    ],
    anatomyPartsZh: [
      { part: "Root element", description: "沒有 `href` 時輸出 native `<button>`；有 `href` 時輸出 `<a>` 或 locale-aware Link。", owner: "Button.tsx", code: ".ds-button" },
      { part: "Label", description: "透過 `children` 傳入可見 action text；loading 時由 `loadingLabel` 取代。", owner: "Caller", code: ".ds-button-content span" },
      { part: "Icon / loader slot", description: "`loading` 為 true 時才出現 Loader2 spinner。", owner: "Button.tsx", code: ".ds-button-spinner" },
      { part: "Disabled state", description: "action button 使用 native disabled 行為；目前 contract 不包含 disabled anchor。", owner: "Button.tsx", code: ":disabled / [aria-disabled=\"true\"]" },
      { part: "Link wrapper / href behavior", description: "hash、http、mailto、tel 使用 native anchor；internal routes 使用 i18n Link wrapper。", owner: "Button.tsx", code: "href branch" },
      { part: "Loading indicator", description: "loading state 會設定 `aria-busy`、停用 button，避免重複 submit。", owner: "Button.tsx", code: "loading / loadingLabel" },
    ],
    codeGuidance: {
      importPath: "components/ui/Button.tsx",
      example: "import Button from \"@/components/ui/Button\";\n\n<Button type=\"submit\" loading={isSubmitting} loadingLabel=\"Sending...\">\n  Send Message\n</Button>\n\n<Button href=\"/#projects\">\n  View My Work\n</Button>",
      props: [
        { name: "children", type: "ReactNode", usedBy: "Button / LinkButton", description: "Visible action label." },
        { name: "href", type: "string", usedBy: "LinkButton", description: "Switches rendering to native anchor or locale-aware Link." },
        { name: "type", type: "ButtonHTMLAttributes<HTMLButtonElement>[\"type\"]", usedBy: "Button", description: "Native button type; defaults to `button` when omitted." },
        { name: "disabled", type: "boolean", usedBy: "Button", description: "Disables native button actions such as Coming Soon or unavailable submit." },
        { name: "loading", type: "boolean", usedBy: "Button", description: "Shows spinner, sets `aria-busy`, and disables duplicate action." },
        { name: "loadingLabel", type: "string", usedBy: "Button", description: "Replaces the visible label while loading." },
        { name: "variant", type: "\"primary\" | \"secondary\" | \"danger\"", usedBy: "Button / LinkButton", description: "Controls visual treatment; danger is reserved for destructive actions." },
        { name: "size", type: "\"sm\" | \"md\" | \"lg\"", usedBy: "Button / LinkButton", description: "Controls height and width behavior for compact, default, or full-width CTA contexts." },
        { name: "className", type: "string", usedBy: "Button / LinkButton", description: "Optional styling hook for route-local layout, not for redefining the contract." },
      ],
      notes: ["Button and LinkButton share one implementation; `href` determines the rendered semantic element.", "Use `loading`, not `isLoading`, in the current production API."],
    },
    codeGuidanceZh: {
      importPath: "components/ui/Button.tsx",
      example: "import Button from \"@/components/ui/Button\";\n\n<Button type=\"submit\" loading={isSubmitting} loadingLabel=\"傳送中...\">\n  送出訊息\n</Button>\n\n<Button href=\"/#projects\">\n  查看作品\n</Button>",
      props: [
        { name: "children", type: "ReactNode", usedBy: "Button / LinkButton", description: "可見 action label。" },
        { name: "href", type: "string", usedBy: "LinkButton", description: "切換成 native anchor 或 locale-aware Link render。" },
        { name: "type", type: "ButtonHTMLAttributes<HTMLButtonElement>[\"type\"]", usedBy: "Button", description: "native button type；未傳入時預設為 `button`。" },
        { name: "disabled", type: "boolean", usedBy: "Button", description: "停用 Coming Soon 或 unavailable submit 這類 native button action。" },
        { name: "loading", type: "boolean", usedBy: "Button", description: "顯示 spinner、設定 `aria-busy`，並避免重複操作。" },
        { name: "loadingLabel", type: "string", usedBy: "Button", description: "loading 時取代可見 label。" },
        { name: "variant", type: "\"primary\" | \"secondary\" | \"danger\"", usedBy: "Button / LinkButton", description: "控制視覺樣式；danger 只保留給破壞性操作。" },
        { name: "size", type: "\"sm\" | \"md\" | \"lg\"", usedBy: "Button / LinkButton", description: "控制 compact、default 或 full-width CTA 情境的高度與寬度行為。" },
        { name: "className", type: "string", usedBy: "Button / LinkButton", description: "route-local layout 的 optional styling hook，不用來重定義 contract。" },
      ],
      notes: ["Button 與 LinkButton 共用同一個 implementation；是否傳入 `href` 決定輸出的語意元素。", "目前 production API 使用 `loading`，不是 `isLoading`。"],
    },
    tokenMappings: [
      { token: "--hm-btn-primary-bg", role: "Primary background", usage: ".ds-button-primary default background." },
      { token: "--hm-btn-primary-color", role: "Primary text color", usage: ".ds-button-primary foreground." },
      { token: "--hm-btn-radius", role: "Button radius", usage: "Pill radius shared by Button and LinkButton." },
      { token: "--hm-btn-height-md / --hm-btn-height-sm", role: "Height", usage: "Controls md and sm button minimum heights." },
      { token: "--hm-btn-padding-inline-md / --hm-btn-padding-inline-sm", role: "Padding", usage: "Controls horizontal padding for md and sm sizes; lg is full-width." },
      { token: "--hm-btn-font-weight", role: "Font weight", usage: "Shared label weight." },
      { token: "--hm-btn-transition-duration", role: "Transition", usage: "Background, color, and shadow transitions." },
      { token: "--disabled", role: "Disabled background", usage: ".ds-button:disabled class-based state." },
      { token: ".ds-button-spinner", role: "Loading spinner", usage: "Class-based Loader2 animation; no new token added." },
    ],
    tokenMappingsZh: [
      { token: "--hm-btn-primary-bg", role: "Primary background", usage: ".ds-button-primary default background。" },
      { token: "--hm-btn-primary-color", role: "Primary text color", usage: ".ds-button-primary foreground。" },
      { token: "--hm-btn-radius", role: "Button radius", usage: "Button 與 LinkButton 共用的 pill radius。" },
      { token: "--hm-btn-height-md / --hm-btn-height-sm", role: "Height", usage: "控制 md 與 sm button minimum height。" },
      { token: "--hm-btn-padding-inline-md / --hm-btn-padding-inline-sm", role: "Padding", usage: "控制 md 與 sm 的水平 padding；lg 是 full-width。" },
      { token: "--hm-btn-font-weight", role: "Font weight", usage: "共用 label weight。" },
      { token: "--hm-btn-transition-duration", role: "Transition", usage: "background、color、shadow transitions。" },
      { token: "--disabled", role: "Disabled background", usage: ".ds-button:disabled class-based state。" },
      { token: ".ds-button-spinner", role: "Loading spinner", usage: "Class-based Loader2 animation；沒有新增 token。" },
    ],
    tokens: ["--hm-btn-primary-bg", "--hm-btn-primary-color", "--hm-btn-radius", "--hm-btn-height-md", "--hm-btn-padding-inline-md", "--hm-btn-font-weight", "--hm-btn-transition-duration", "--disabled"],
    accessibility: ["Use native button semantics for in-place actions.", "Use link semantics for navigation.", "Disabled buttons must not be interactive.", "Loading state should communicate progress and prevent duplicate submit.", "Visible focus state must remain available.", "LinkButton text should describe the destination."],
    accessibilityZh: ["原地操作使用 native button 語意。", "導覽使用 link 語意。", "Disabled buttons 必須不可互動。", "Loading state 需要傳達處理中並避免重複送出。", "可見 focus state 必須保留。", "LinkButton 文字需要說明目的地。"],
    referenceCards: [
      { label: "Source", value: "components/ui/Button.tsx" },
      { label: "Live usage", value: "Home hero / Contact form / ProjectCard CTA / case navigation" },
      { label: "CSS classes", value: ".ds-button / .ds-button-primary / .ds-button-secondary / .ds-button-spinner" },
      { label: "Boundary", value: "Button = action / submit; LinkButton = navigation via href" },
    ],
    referenceCardsZh: [
      { label: "Source", value: "components/ui/Button.tsx" },
      { label: "Live usage", value: "Home hero / Contact form / ProjectCard CTA / case navigation" },
      { label: "CSS classes", value: ".ds-button / .ds-button-primary / .ds-button-secondary / .ds-button-spinner" },
      { label: "Boundary", value: "Button = action / submit；LinkButton = navigation via href" },
    ],
  },
  {
    slug: "language-switcher",
    title: "LanguageSwitcher",
    titleZh: "語系切換",
    category: "General",
    source: "components/LanguageSwitcher.tsx",
    hideSourceInHeader: true,
    status: "Live component",
    statusZh: "正式元件",
    description: "A locale switcher used in the global Navbar.",
    descriptionZh: "用於全站 Navbar 的語系切換元件。",
    demo: "language-switcher",
    stateRows: [
      { state: "Closed", appliesTo: "LanguageSwitcher", trigger: "Default render or menu closes.", behavior: "Only the trigger is visible.", whatChanges: "`.language-switcher` renders without `is-open`; the menu remains non-interactive.", liveUsage: "Global Navbar." },
      { state: "Open", appliesTo: "LanguageSwitcher", trigger: "User clicks the trigger button.", behavior: "The language menu opens.", whatChanges: "`aria-expanded` becomes true and `.language-switcher.is-open` exposes the menu.", liveUsage: "Global Navbar language menu." },
      { state: "Selected", appliesTo: "Language option", trigger: "Current `useLocale()` value matches an option.", behavior: "The current locale is marked as selected.", whatChanges: "The option receives `aria-checked` and a visible checkmark.", liveUsage: "English / Traditional Chinese options." },
      { state: "Loading / pending", appliesTo: "Locale transition", trigger: "User chooses a different locale.", behavior: "The switcher disables repeat actions and shows the loading overlay.", whatChanges: "`showLoading` or `isPending` disables controls while `LanguageLoadingPortal` renders.", liveUsage: "Locale route replacement." },
      { state: "Route / hash preservation", appliesTo: "Locale transition", trigger: "A different locale is selected.", behavior: "The current pathname and `window.location.hash` are kept.", whatChanges: "`router.replace(`${pathname}${hash}`, { locale: nextLocale })` changes locale without dropping the hash.", liveUsage: "All localized public routes." },
      { state: "Dismiss", appliesTo: "Open menu", trigger: "Outside pointer down or Escape key.", behavior: "The menu closes without changing locale.", whatChanges: "Document listeners call `setOpen(false)` while the menu is open.", liveUsage: "Navbar interaction cleanup." },
    ],
    stateRowsZh: [
      { state: "Closed", appliesTo: "LanguageSwitcher", trigger: "預設 render 或選單關閉。", behavior: "只顯示 trigger。", whatChanges: "`.language-switcher` 不帶 `is-open`；menu 維持不可互動。", liveUsage: "全站 Navbar。" },
      { state: "Open", appliesTo: "LanguageSwitcher", trigger: "使用者點擊 trigger button。", behavior: "語系選單展開。", whatChanges: "`aria-expanded` 變為 true，`.language-switcher.is-open` 顯示 menu。", liveUsage: "全站 Navbar 語系選單。" },
      { state: "Selected", appliesTo: "Language option", trigger: "目前 `useLocale()` 符合某個 option。", behavior: "目前語系被標示為 selected。", whatChanges: "option 取得 `aria-checked` 與可見 checkmark。", liveUsage: "English / 繁體中文 options。" },
      { state: "Loading / pending", appliesTo: "Locale transition", trigger: "使用者選擇不同語系。", behavior: "切換期間停用重複操作並顯示 loading overlay。", whatChanges: "`showLoading` 或 `isPending` 停用控制項，同時 render `LanguageLoadingPortal`。", liveUsage: "Locale route replacement。" },
      { state: "Route / hash preservation", appliesTo: "Locale transition", trigger: "選到不同語系。", behavior: "保留目前 pathname 與 `window.location.hash`。", whatChanges: "`router.replace(`${pathname}${hash}`, { locale: nextLocale })` 切換語系但不丟失 hash。", liveUsage: "所有 localized public routes。" },
      { state: "Dismiss", appliesTo: "Open menu", trigger: "點擊外部或按 Escape。", behavior: "關閉選單，不改變語系。", whatChanges: "選單開啟時的 document listeners 會呼叫 `setOpen(false)`。", liveUsage: "Navbar 互動收尾。" },
    ],
    usage: [
      "Use inside the global Navbar.",
      "Use when the same route exists in multiple locales.",
      "Do not use it as a generic dropdown.",
      "Preserve the current route and hash when switching locales.",
    ],
    usageZh: [
      "用於全站 Navbar 內。",
      "當同一路由有多語版本時使用。",
      "不要把它當成 generic dropdown。",
      "切換語系時保留目前 route 與 hash。",
    ],
    anatomyParts: [
      { part: "Trigger button", description: "Button that opens and closes the language menu.", owner: "LanguageSwitcher.tsx", code: ".language-switcher-trigger" },
      { part: "Current locale label", description: "Localized short label from `useTranslations(\"language\")`.", owner: "i18n dictionaries", code: "language.current" },
      { part: "Chevron", description: "Inline SVG affordance that rotates with the open state.", owner: "LanguageSwitcher.tsx / tokens.css", code: ".language-switcher-trigger svg" },
      { part: "Dropdown panel", description: "Menu container for available locale options.", owner: "LanguageSwitcher.tsx", code: ".language-switcher-menu" },
      { part: "Option row", description: "Button rendered for each `languageOptions` item.", owner: "LanguageSwitcher.tsx", code: "role=\"menuitemradio\"" },
      { part: "Selected checkmark", description: "Visible selected indicator for the active locale.", owner: "LanguageSwitcher.tsx", code: "aria-checked / ✓" },
      { part: "Navbar context", description: "Production placement inside the global Navbar link group.", owner: "Navbar.tsx", code: "<LanguageSwitcher />" },
    ],
    anatomyPartsZh: [
      { part: "Trigger button", description: "開啟與關閉語系選單的 button。", owner: "LanguageSwitcher.tsx", code: ".language-switcher-trigger" },
      { part: "Current locale label", description: "來自 `useTranslations(\"language\")` 的當前語系短標籤。", owner: "i18n dictionaries", code: "language.current" },
      { part: "Chevron", description: "隨 open state 旋轉的 inline SVG affordance。", owner: "LanguageSwitcher.tsx / tokens.css", code: ".language-switcher-trigger svg" },
      { part: "Dropdown panel", description: "承載可選語系的 menu container。", owner: "LanguageSwitcher.tsx", code: ".language-switcher-menu" },
      { part: "Option row", description: "由每個 `languageOptions` item render 的 button。", owner: "LanguageSwitcher.tsx", code: "role=\"menuitemradio\"" },
      { part: "Selected checkmark", description: "目前語系的可見 selected indicator。", owner: "LanguageSwitcher.tsx", code: "aria-checked / ✓" },
      { part: "Navbar context", description: "正式站放在全站 Navbar link group 內。", owner: "Navbar.tsx", code: "<LanguageSwitcher />" },
    ],
    codeGuidance: {
      importPath: "components/LanguageSwitcher.tsx",
      example: "import LanguageSwitcher from \"@/components/LanguageSwitcher\";\n\n<div className=\"nav-links\">\n  <LanguageSwitcher />\n</div>",
      props: [
        { name: "props", type: "none", description: "The production component reads locale, translations, pathname, and router from app context." },
      ],
      notes: [
        "Mount it inside the localized app tree so `useLocale`, `useTranslations`, `usePathname`, and `useRouter` are available.",
        "The production component is designed for Navbar placement; use a docs-safe wrapper for documentation demos that must not navigate.",
        "Route and hash preservation are owned by the current `router.replace(`${pathname}${hash}`, { locale: nextLocale })` branch.",
      ],
    },
    codeGuidanceZh: {
      importPath: "components/LanguageSwitcher.tsx",
      example: "import LanguageSwitcher from \"@/components/LanguageSwitcher\";\n\n<div className=\"nav-links\">\n  <LanguageSwitcher />\n</div>",
      props: [
        { name: "props", type: "none", description: "正式元件從 app context 讀取 locale、translations、pathname 與 router。" },
      ],
      notes: [
        "需掛在 localized app tree 內，讓 `useLocale`、`useTranslations`、`usePathname` 與 `useRouter` 可用。",
        "正式元件為 Navbar placement 設計；文件 demo 需要避免導頁時使用 docs-safe wrapper。",
        "Route 與 hash preservation 由目前 `router.replace(`${pathname}${hash}`, { locale: nextLocale })` 分支負責。",
      ],
    },
    tokenMappings: [
      { token: ".language-switcher-trigger", role: "Trigger surface", usage: "Pill button surface inside Navbar." },
      { token: "--hm-line", role: "Border", usage: "Trigger and dropdown panel border." },
      { token: "--hm-radius-pill / --hm-radius-md", role: "Radius", usage: "Pill trigger and menu panel corners." },
      { token: ".language-switcher-menu", role: "Dropdown panel", usage: "Absolute menu surface." },
      { token: "--hm-purple-light", role: "Selected row", usage: "Selected / hover language row background." },
      { token: "--hm-ink / --hm-muted", role: "Text", usage: "Current label and option text." },
      { token: "--hm-purple-soft", role: "Focus / hover", usage: "Focus ring and active color treatment." },
    ],
    tokenMappingsZh: [
      { token: ".language-switcher-trigger", role: "Trigger surface", usage: "Navbar 內的 pill button surface。" },
      { token: "--hm-line", role: "Border", usage: "Trigger 與 dropdown panel 邊線。" },
      { token: "--hm-radius-pill / --hm-radius-md", role: "Radius", usage: "Pill trigger 與 menu panel 圓角。" },
      { token: ".language-switcher-menu", role: "Dropdown panel", usage: "絕對定位的 menu surface。" },
      { token: "--hm-purple-light", role: "Selected row", usage: "Selected / hover language row 背景。" },
      { token: "--hm-ink / --hm-muted", role: "Text", usage: "當前 label 與 option 文字。" },
      { token: "--hm-purple-soft", role: "Focus / hover", usage: "Focus ring 與 active color treatment。" },
    ],
    tokens: ["language-switcher-trigger", "--hm-line", "--hm-radius-pill", "--hm-radius-md", "language-switcher-menu", "--hm-purple-light", "--hm-ink", "--hm-muted", "--hm-purple-soft"],
    accessibility: [
      "Trigger exposes the menu state with `aria-expanded` and `aria-haspopup`.",
      "Selected locale is perceivable through `aria-checked` and the visible checkmark.",
      "Options are keyboard reachable because they are buttons inside a menu.",
      "Escape and outside click close the open menu.",
      "Language names are written out as English and 繁體中文.",
      "Locale changes happen only after an explicit option click.",
    ],
    accessibilityZh: [
      "Trigger 以 `aria-expanded` 與 `aria-haspopup` 暴露 menu state。",
      "目前語系透過 `aria-checked` 與可見 checkmark 表示。",
      "選項是 menu 內的 button，因此可透過鍵盤到達。",
      "Escape 與外部點擊會關閉已開啟的選單。",
      "語系名稱完整寫成 English 與繁體中文。",
      "只有明確點擊 option 才會切換語系。",
    ],
    referenceCards: [
      { label: "Source path", value: "components/LanguageSwitcher.tsx" },
      { label: "Live usage", value: "Global Navbar" },
      { label: "Related", value: "Navbar" },
      { label: "Boundary", value: "Locale switcher, not a generic Select / dropdown" },
      { label: "Behavior", value: "Preserves current route and hash" },
    ],
    referenceCardsZh: [
      { label: "Source path", value: "components/LanguageSwitcher.tsx" },
      { label: "Live usage", value: "全站 Navbar" },
      { label: "Related", value: "Navbar" },
      { label: "Boundary", value: "語系切換，不是 generic Select / dropdown" },
      { label: "Behavior", value: "保留目前 route 與 hash" },
    ],
  },
  {
    slug: "navbar",
    title: "Navbar",
    titleZh: "導覽列",
    category: "Shell",
    source: "components/Navbar.tsx",
    hideSourceInHeader: true,
    status: "Live shell pattern",
    statusZh: "正式 shell pattern",
    description: "The global navigation shell for portfolio routes.",
    descriptionZh: "作品集 route 的全站導覽骨架。",
    demo: "navbar",
    stateRows: [
      { state: "Default / visible", appliesTo: "Navbar", trigger: "Page loads or scroll rests near top.", behavior: "The fixed navigation remains visible.", whatChanges: "`.site-nav` stays visible and `data-nav-hidden` is false.", liveUsage: "All public portfolio routes." },
      { state: "Scroll hidden", appliesTo: "Navbar", trigger: "Reader scrolls downward past the threshold.", behavior: "Navbar hides until scroll direction changes or scrolling settles.", whatChanges: "`.site-nav.is-hidden` toggles through `setNavHidden`.", liveUsage: "Long pages and case-study reading." },
      { state: "Mobile closed", appliesTo: "Navbar", trigger: "Small viewport with menu closed.", behavior: "Only brand and menu button stay visible.", whatChanges: "`.site-nav` renders without `is-open`.", liveUsage: "Mobile public routes." },
      { state: "Mobile open", appliesTo: "Navbar", trigger: "User clicks the menu button.", behavior: "Mobile menu opens and the navbar stays visible.", whatChanges: "`aria-expanded` becomes true and `.site-nav.is-open` exposes `.nav-links`.", liveUsage: "Mobile route navigation." },
      { state: "Localized links", appliesTo: "Nav links", trigger: "Current locale changes.", behavior: "Labels come from `useTranslations(\"nav\")` while hrefs stay route-aware through i18n Link.", whatChanges: "Dictionary values update Projects / About / Design System / Contact / Resume labels.", liveUsage: "English and Traditional Chinese routes." },
      { state: "Design System link", appliesTo: "Nav links", trigger: "Navbar renders.", behavior: "Design System remains a first-class route in the global shell.", whatChanges: "The `/design-system` link is rendered with localized Link semantics.", liveUsage: "Portfolio navigation." },
      { state: "Resume link", appliesTo: "External document link", trigger: "User clicks Resume.", behavior: "Opens the localized resume target in a new tab and sends analytics.", whatChanges: "`sendGAEvent(\"resume_click\")` fires before the menu closes.", liveUsage: "Global resume access." },
      { state: "LanguageSwitcher slot", appliesTo: "Navbar composition", trigger: "Navbar renders.", behavior: "Locale switching is delegated to LanguageSwitcher.", whatChanges: "`<LanguageSwitcher />` is mounted at the end of `.nav-links`.", liveUsage: "Global Navbar." },
    ],
    stateRowsZh: [
      { state: "Default / visible", appliesTo: "Navbar", trigger: "頁面載入或捲動停在頂部附近。", behavior: "固定導覽列保持可見。", whatChanges: "`.site-nav` 維持可見，`data-nav-hidden` 為 false。", liveUsage: "所有 public portfolio routes。" },
      { state: "Scroll hidden", appliesTo: "Navbar", trigger: "讀者向下捲動超過 threshold。", behavior: "Navbar 暫時隱藏，直到捲動方向改變或捲動停止。", whatChanges: "`setNavHidden` 切換 `.site-nav.is-hidden`。", liveUsage: "長頁面與案例閱讀。" },
      { state: "Mobile closed", appliesTo: "Navbar", trigger: "小 viewport 且選單關閉。", behavior: "只保留 brand 與 menu button。", whatChanges: "`.site-nav` 不帶 `is-open`。", liveUsage: "手機 public routes。" },
      { state: "Mobile open", appliesTo: "Navbar", trigger: "使用者點擊 menu button。", behavior: "手機選單展開，Navbar 保持可見。", whatChanges: "`aria-expanded` 變為 true，`.site-nav.is-open` 顯示 `.nav-links`。", liveUsage: "手機 route navigation。" },
      { state: "Localized links", appliesTo: "Nav links", trigger: "目前 locale 改變。", behavior: "標籤來自 `useTranslations(\"nav\")`，href 透過 i18n Link 維持 route-aware。", whatChanges: "Dictionary 更新 Projects / About / Design System / Contact / Resume labels。", liveUsage: "英文與繁中 routes。" },
      { state: "Design System link", appliesTo: "Nav links", trigger: "Navbar render。", behavior: "Design System 是 global shell 內的一級 route。", whatChanges: "以 localized Link semantics render `/design-system` link。", liveUsage: "作品集導覽。" },
      { state: "Resume link", appliesTo: "External document link", trigger: "使用者點擊 Resume。", behavior: "用新分頁開啟 localized resume target 並送出 analytics。", whatChanges: "關閉選單前觸發 `sendGAEvent(\"resume_click\")`。", liveUsage: "全站履歷入口。" },
      { state: "LanguageSwitcher slot", appliesTo: "Navbar composition", trigger: "Navbar render。", behavior: "語系切換由 LanguageSwitcher 承擔。", whatChanges: "`<LanguageSwitcher />` 掛在 `.nav-links` 最後。", liveUsage: "全站 Navbar。" },
    ],
    usage: [
      "Use as the global route navigation shell.",
      "Use for all public portfolio routes.",
      "Do not reuse it inside docs examples or nested sections as an interactive nav.",
      "Keep page section offsets aligned with fixed navbar height.",
    ],
    usageZh: [
      "作為全站 route navigation shell 使用。",
      "用於所有 public portfolio routes。",
      "不要把它作為互動導覽重複放進 docs examples 或巢狀 section。",
      "頁面 section offset 需與 fixed navbar height 對齊。",
    ],
    anatomyParts: [
      { part: "Root", description: "Fixed navigation landmark with open and hidden state classes.", owner: "Navbar.tsx", code: ".site-nav" },
      { part: "Brand / identity", description: "Home link containing the animated brand mark.", owner: "Navbar.tsx / AnimatedLogo", code: ".brand" },
      { part: "Nav links", description: "Localized links for project, about, design system, contact, resume, and language switching.", owner: "Navbar.tsx / i18n dictionaries", code: ".nav-links" },
      { part: "Desktop link group", description: "Wide-screen inline navigation group.", owner: "styles/tokens.css", code: ".nav-links" },
      { part: "Mobile menu button", description: "Two-line menu button that controls the open state.", owner: "Navbar.tsx", code: ".menu-button / aria-expanded" },
      { part: "Mobile menu panel", description: "Responsive expanded link area driven by `.site-nav.is-open`.", owner: "styles/tokens.css", code: ".site-nav.is-open .nav-links" },
      { part: "LanguageSwitcher slot", description: "Locale switcher mounted inside the nav link group.", owner: "Navbar.tsx / LanguageSwitcher.tsx", code: "<LanguageSwitcher />" },
      { part: "Fixed shell / backdrop", description: "Global fixed surface, blur, line, and hidden-on-scroll behavior.", owner: "styles/tokens.css / Navbar.tsx", code: ".site-nav / .nav-line / is-hidden" },
    ],
    anatomyPartsZh: [
      { part: "Root", description: "帶有 open 與 hidden state class 的 fixed navigation landmark。", owner: "Navbar.tsx", code: ".site-nav" },
      { part: "Brand / identity", description: "包含 animated brand mark 的首頁連結。", owner: "Navbar.tsx / AnimatedLogo", code: ".brand" },
      { part: "Nav links", description: "作品、關於、Design System、聯絡、履歷與語系切換的 localized links。", owner: "Navbar.tsx / i18n dictionaries", code: ".nav-links" },
      { part: "Desktop link group", description: "寬螢幕的 inline navigation group。", owner: "styles/tokens.css", code: ".nav-links" },
      { part: "Mobile menu button", description: "控制 open state 的雙線 menu button。", owner: "Navbar.tsx", code: ".menu-button / aria-expanded" },
      { part: "Mobile menu panel", description: "由 `.site-nav.is-open` 驅動的 responsive expanded link area。", owner: "styles/tokens.css", code: ".site-nav.is-open .nav-links" },
      { part: "LanguageSwitcher slot", description: "掛在 nav link group 內的語系切換元件。", owner: "Navbar.tsx / LanguageSwitcher.tsx", code: "<LanguageSwitcher />" },
      { part: "Fixed shell / backdrop", description: "全站 fixed surface、blur、line 與 hidden-on-scroll behavior。", owner: "styles/tokens.css / Navbar.tsx", code: ".site-nav / .nav-line / is-hidden" },
    ],
    codeGuidance: {
      importPath: "components/Navbar.tsx",
      example: "import Navbar from \"@/components/Navbar\";\n\n<Navbar />",
      props: [
        { name: "props", type: "none", description: "Navbar reads localized labels from `nav` dictionary and owns its open / scroll state internally." },
      ],
      notes: [
        "Navbar is an app shell component, not a reusable section component.",
        "Mount it once per public route shell, alongside route content and Footer.",
        "It depends on `next-intl`, `@/i18n/navigation`, `AnimatedLogo`, and `LanguageSwitcher`.",
        "Do not duplicate full LanguageSwitcher behavior in Navbar documentation examples.",
      ],
    },
    codeGuidanceZh: {
      importPath: "components/Navbar.tsx",
      example: "import Navbar from \"@/components/Navbar\";\n\n<Navbar />",
      props: [
        { name: "props", type: "none", description: "Navbar 從 `nav` dictionary 讀取 localized labels，並自行管理 open / scroll state。" },
      ],
      notes: [
        "Navbar 是 app shell component，不是可重複塞進 section 的元件。",
        "每個 public route shell 只掛一次，與 route content、Footer 並列。",
        "它依賴 `next-intl`、`@/i18n/navigation`、`AnimatedLogo` 與 `LanguageSwitcher`。",
        "Navbar 文件範例不要重複完整 LanguageSwitcher 互動。",
      ],
    },
    tokenMappings: [
      { token: ".site-nav", role: "Navbar height / fixed shell", usage: "Global fixed top navigation surface." },
      { token: "--hm-z-navbar", role: "Z-index", usage: "Keeps navigation above route content." },
      { token: "rgba(255,255,255,0.94) / backdrop-filter", role: "Backdrop / surface", usage: "Production translucent navbar surface." },
      { token: ".nav-line / --hm-line", role: "Divider", usage: "Bottom line and shell separation." },
      { token: ".nav-links a", role: "Link text", usage: "Primary route and resume links." },
      { token: "--mobile-nav-closed-height / --mobile-nav-open-height", role: "Mobile panel height", usage: "Responsive closed and open menu heights." },
      { token: "--hm-duration-fast / --hm-duration-slow", role: "Transition", usage: "Menu, line, and hide / show transitions." },
    ],
    tokenMappingsZh: [
      { token: ".site-nav", role: "Navbar height / fixed shell", usage: "全站 fixed top navigation surface。" },
      { token: "--hm-z-navbar", role: "Z-index", usage: "讓導覽保持在 route content 上方。" },
      { token: "rgba(255,255,255,0.94) / backdrop-filter", role: "Backdrop / surface", usage: "正式站半透明 navbar surface。" },
      { token: ".nav-line / --hm-line", role: "Divider", usage: "底線與 shell 分隔。" },
      { token: ".nav-links a", role: "Link text", usage: "主要 route 與履歷連結。" },
      { token: "--mobile-nav-closed-height / --mobile-nav-open-height", role: "Mobile panel height", usage: "手機收合與展開選單高度。" },
      { token: "--hm-duration-fast / --hm-duration-slow", role: "Transition", usage: "Menu、line 與 hide / show transitions。" },
    ],
    tokens: [".site-nav", "--hm-z-navbar", "backdrop-filter", ".nav-line", ".nav-links a", "--mobile-nav-closed-height", "--mobile-nav-open-height", "--hm-duration-fast", "--hm-duration-slow"],
    accessibility: [
      "Root uses a `nav` landmark with a localized accessible label.",
      "Mobile menu button exposes open state through `aria-expanded` and localized labels.",
      "Links and the resume target remain keyboard focusable.",
      "Current implementation does not add `aria-current`; add it only when route-aware active state is implemented.",
      "Docs examples should avoid duplicate nested navigation landmarks.",
    ],
    accessibilityZh: [
      "Root 使用 `nav` landmark 並提供 localized accessible label。",
      "手機 menu button 透過 `aria-expanded` 與 localized label 暴露開啟狀態。",
      "連結與履歷入口維持可鍵盤聚焦。",
      "目前實作尚未加入 `aria-current`；只有導入 route-aware active state 時再補。",
      "文件範例應避免重複巢狀 navigation landmarks。",
    ],
    referenceCards: [
      { label: "Source path", value: "components/Navbar.tsx" },
      { label: "Live usage", value: "All public portfolio routes" },
      { label: "Related components", value: "LanguageSwitcher / AnimatedLogo" },
      { label: "Boundary", value: "Global shell only, not local section nav" },
      { label: "CSS classes", value: ".site-nav / .nav-top / .nav-links / .menu-button / .nav-line" },
    ],
    referenceCardsZh: [
      { label: "Source path", value: "components/Navbar.tsx" },
      { label: "Live usage", value: "所有 public portfolio routes" },
      { label: "Related components", value: "LanguageSwitcher / AnimatedLogo" },
      { label: "Boundary", value: "只屬於 global shell，不是 local section nav" },
      { label: "CSS classes", value: ".site-nav / .nav-top / .nav-links / .menu-button / .nav-line" },
    ],
  },
  {
    slug: "footer",
    title: "Footer",
    titleZh: "頁腳",
    category: "Shell",
    source: "components/Footer.tsx",
    hideSourceInHeader: true,
    status: "Live shell pattern",
    statusZh: "正式 shell pattern",
    description: "The closing navigation and contact area for portfolio routes.",
    descriptionZh: "作品集 route 結尾的導覽與聯絡區域。",
    demo: "footer",
    stateRows: [
      { state: "Default", appliesTo: "Footer", trigger: "Footer renders at the end of a public route.", behavior: "Shows copyright text and social links.", whatChanges: "`.site-footer` lays out copy and `.social-links` in one row on wide screens.", liveUsage: "Public portfolio routes." },
      { state: "Responsive stack", appliesTo: "Footer", trigger: "Viewport reaches mobile footer breakpoint.", behavior: "Footer content stacks to protect width.", whatChanges: "Responsive CSS changes alignment and wrapping for the footer row.", liveUsage: "Mobile public routes." },
      { state: "External links", appliesTo: "Social links", trigger: "User opens a social link.", behavior: "Links open external profiles in a new tab.", whatChanges: "`target=\"_blank\"` and `rel=\"noopener noreferrer\"` are set on each social anchor.", liveUsage: "LinkedIn and GitHub links." },
      { state: "Contact links", appliesTo: "Footer boundary", trigger: "Reader needs direct contact.", behavior: "Footer keeps social closure while the Contact route owns the full contact form.", whatChanges: "Footer does not duplicate contact form actions.", liveUsage: "Global page closure." },
      { state: "Locale behavior", appliesTo: "Footer label", trigger: "Locale changes.", behavior: "Social links accessible label comes from the `footer` dictionary.", whatChanges: "`getTranslations(\"footer\")` supplies the social links label.", liveUsage: "English and Traditional Chinese routes." },
    ],
    stateRowsZh: [
      { state: "Default", appliesTo: "Footer", trigger: "Footer 在 public route 結尾 render。", behavior: "顯示 copyright 文字與社群連結。", whatChanges: "寬螢幕時 `.site-footer` 讓 copy 與 `.social-links` 同列排列。", liveUsage: "Public portfolio routes。" },
      { state: "Responsive stack", appliesTo: "Footer", trigger: "Viewport 到達手機 footer breakpoint。", behavior: "Footer 內容堆疊以保護寬度。", whatChanges: "Responsive CSS 調整 footer row 的對齊與換行。", liveUsage: "手機 public routes。" },
      { state: "External links", appliesTo: "Social links", trigger: "使用者開啟社群連結。", behavior: "用新分頁開啟外部 profile。", whatChanges: "每個 social anchor 都設定 `target=\"_blank\"` 與 `rel=\"noopener noreferrer\"`。", liveUsage: "LinkedIn 與 GitHub links。" },
      { state: "Contact links", appliesTo: "Footer boundary", trigger: "讀者需要直接聯絡。", behavior: "Footer 提供社群收尾，完整 contact form 由 Contact route 負責。", whatChanges: "Footer 不重複 contact form action。", liveUsage: "全站頁尾收束。" },
      { state: "Locale behavior", appliesTo: "Footer label", trigger: "Locale 改變。", behavior: "Social links accessible label 來自 `footer` dictionary。", whatChanges: "`getTranslations(\"footer\")` 提供 social links label。", liveUsage: "英文與繁中 routes。" },
    ],
    usage: [
      "Use at the end of public portfolio pages.",
      "Use it to provide closure, social links, and secondary navigation context.",
      "Do not use it as a content card.",
      "Keep full contact tasks on the Contact route.",
    ],
    usageZh: [
      "用於 public portfolio pages 的結尾。",
      "用來提供頁面收束、社群連結與次要導覽語境。",
      "不要把它當成內容卡片。",
      "完整聯絡任務保留在 Contact route。",
    ],
    anatomyParts: [
      { part: "Root", description: "Footer landmark and production footer surface.", owner: "Footer.tsx", code: ".site-footer" },
      { part: "Navigation links", description: "Footer currently keeps navigation minimal and does not duplicate primary nav links.", owner: "Footer.tsx", code: "none in current implementation" },
      { part: "Social links", description: "External profile anchors rendered from the local social link list.", owner: "Footer.tsx", code: ".social-links / .social-link" },
      { part: "Contact block", description: "Footer points to social profiles; the Contact route owns form and direct contact details.", owner: "Footer.tsx / Contact route", code: "socialLinks" },
      { part: "Copyright / footer note", description: "Static copyright line rendered before social links.", owner: "Footer.tsx", code: ".site-footer p" },
      { part: "Responsive columns", description: "Global CSS controls row and stacked layouts.", owner: "styles/tokens.css", code: ".site-footer" },
    ],
    anatomyPartsZh: [
      { part: "Root", description: "Footer landmark 與正式 footer surface。", owner: "Footer.tsx", code: ".site-footer" },
      { part: "Navigation links", description: "目前 Footer 保持極簡，不重複 primary nav links。", owner: "Footer.tsx", code: "目前實作無" },
      { part: "Social links", description: "由 local social link list render 的外部 profile anchors。", owner: "Footer.tsx", code: ".social-links / .social-link" },
      { part: "Contact block", description: "Footer 指向社群 profile；表單與直接聯絡細節由 Contact route 負責。", owner: "Footer.tsx / Contact route", code: "socialLinks" },
      { part: "Copyright / footer note", description: "社群連結前的靜態 copyright line。", owner: "Footer.tsx", code: ".site-footer p" },
      { part: "Responsive columns", description: "Row 與 stacked layouts 由 global CSS 控制。", owner: "styles/tokens.css", code: ".site-footer" },
    ],
    codeGuidance: {
      importPath: "components/Footer.tsx",
      example: "import Footer from \"@/components/Footer\";\n\n<Footer />",
      props: [
        { name: "props", type: "none", description: "Footer is an async server component that reads the `footer` dictionary on render." },
      ],
      notes: [
        "Mount it as part of the public page shell after route content.",
        "Social link data currently lives inside `Footer.tsx`.",
        "Do not use Footer as a generic card or sample link list.",
      ],
    },
    codeGuidanceZh: {
      importPath: "components/Footer.tsx",
      example: "import Footer from \"@/components/Footer\";\n\n<Footer />",
      props: [
        { name: "props", type: "none", description: "Footer 是 async server component，render 時讀取 `footer` dictionary。" },
      ],
      notes: [
        "作為 public page shell 的一部分，掛在 route content 之後。",
        "Social link data 目前位於 `Footer.tsx` 內。",
        "不要把 Footer 當成 generic card 或 sample link list。",
      ],
    },
    tokenMappings: [
      { token: ".site-footer", role: "Surface", usage: "Footer root layout and white page surface." },
      { token: "clamp(24px, 8vw, 120px)", role: "Spacing", usage: "Production horizontal footer padding." },
      { token: ".site-footer p", role: "Text", usage: "Copyright note font size and weight." },
      { token: ".social-link", role: "Link state", usage: "Social profile anchor and hover image swap." },
      { token: "--hm-line", role: "Divider / docs crop", usage: "Docs visual crop border and global line language." },
    ],
    tokenMappingsZh: [
      { token: ".site-footer", role: "Surface", usage: "Footer root layout 與白色頁面 surface。" },
      { token: "clamp(24px, 8vw, 120px)", role: "Spacing", usage: "正式 footer 水平 padding。" },
      { token: ".site-footer p", role: "Text", usage: "Copyright note 字級與字重。" },
      { token: ".social-link", role: "Link state", usage: "社群 profile anchor 與 hover image swap。" },
      { token: "--hm-line", role: "Divider / docs crop", usage: "Docs visual crop border 與 global line language。" },
    ],
    tokens: [".site-footer", "clamp(24px, 8vw, 120px)", ".site-footer p", ".social-link", "--hm-line"],
    accessibility: [
      "Footer uses a semantic `footer` element.",
      "Social links have clear accessible names: LinkedIn and GitHub.",
      "External links use `rel=\"noopener noreferrer\"`.",
      "Decorative social logo images use empty alt text.",
      "Footer text and links must keep readable contrast against the page surface.",
    ],
    accessibilityZh: [
      "Footer 使用語意化 `footer` element。",
      "社群連結有清楚 accessible names：LinkedIn 與 GitHub。",
      "外部連結使用 `rel=\"noopener noreferrer\"`。",
      "裝飾性的社群 logo 圖片使用空 alt。",
      "Footer 文字與連結需維持相對頁面 surface 的可讀對比。",
    ],
    referenceCards: [
      { label: "Source path", value: "components/Footer.tsx" },
      { label: "Live usage routes", value: "Public portfolio and case-study shells" },
      { label: "Boundary", value: "Global footer / shell, not a generic card" },
      { label: "Social links", value: "LinkedIn / GitHub" },
    ],
    referenceCardsZh: [
      { label: "Source path", value: "components/Footer.tsx" },
      { label: "Live usage routes", value: "Public portfolio and case-study shells" },
      { label: "Boundary", value: "Global footer / shell，不是 generic card" },
      { label: "Social links", value: "LinkedIn / GitHub" },
    ],
  },
  { slug: "scroll-progress", title: "ScrollProgress", titleZh: "滾動進度條", category: "Shell", source: "components/ScrollProgress.tsx", demo: "scroll-progress", states: ["0%", "in progress", "100%"], usage: ["Supports long case-study reading progress.", "Stays fixed without taking document layout space."], usageZh: ["用於較長案例頁的閱讀進度提示。", "固定在視窗頂端，不占用文件排版高度。"], tokens: ["--hm-purple", "--hm-duration-fast"], accessibility: ["Decorative progress should stay aria-hidden unless reopened as an accessible status feature."], accessibilityZh: ["裝飾型進度提示維持 aria-hidden，除非未來重新定義為可讀狀態。"] },
  { slug: "tabs", title: "Tabs", titleZh: "標籤頁", category: "Navigation", source: "components/animate-ui/primitives/base/tabs.tsx", demo: "tabs", states: ["default", "hover", "focus", "selected", "disabled"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-radius-md", "--hm-duration-fast"], usage: ["Live usage is the homepage Selected Work switch between Industry Projects and Academic / Side Projects.", "Treat this as a local portfolio pattern unless another route needs the same view switch."], usageZh: ["真實使用位置是首頁 Selected Work 的企業應用 / 學校產出切換。", "除非其他 route 也需要同樣的檢視切換，否則視為作品集 local pattern。"], accessibility: ["Use tablist, tab, and tabpanel semantics when the production component provides tabs."], accessibilityZh: ["正式 tabs 需維持 tablist、tab、tabpanel 語意。"] },
  { slug: "year-rail", title: "YearRail", titleZh: "年份導覽", category: "Navigation", source: "components/YearRail.tsx", demo: "year-rail", states: ["default", "active year", "reduced motion"], usage: ["Route-specific pattern for the About experience timeline.", "The active year follows the current `.experience-card[data-year]` reading focus."], usageZh: ["About 經歷時間軸的 route-specific pattern。", "目前年份依 `.experience-card[data-year]` 的閱讀焦點自動更新。"], tokens: ["--hm-muted", "--hm-ink", "--hm-purple", "--hm-duration-fast"], accessibility: ["提供 aria-label 與可聚焦按鈕。"] },
  {
    slug: "case-toc",
    title: "CaseTOC",
    titleZh: "案例頁目錄",
    category: "Navigation",
    source: "components/CaseTOC.tsx",
    hideSourceInHeader: true,
    status: "Live route pattern",
    statusZh: "正式 route pattern",
    description: "A floating section navigator for long-form case studies.",
    descriptionZh: "用於長篇案例頁的浮動章節導覽。",
    exampleLabel: "Case-study reading navigation",
    exampleLabelZh: "案例閱讀導覽",
    demo: "case-toc",
    stateRows: [
      { state: "Desktop floating visible", appliesTo: "CaseTOC", trigger: "Viewport is wider than the production TOC breakpoint and first case section reaches the navbar area.", behavior: "The nav fades in beside the case content.", whatChanges: "`.cs-toc.is-visible` becomes visible and interactive inside the fixed desktop container.", liveUsage: "Advantech, Crypto Arsenal, and Laushu case routes." },
      { state: "Active section", appliesTo: "CaseTOC", trigger: "Scrollspy or controlled `activeSectionId` selects a section id.", behavior: "The matching link receives the active visual state.", whatChanges: "Active item uses `.cs-toc-item--active`, accent color, stronger weight, and `aria-current`.", liveUsage: "Long-form case route section awareness." },
      { state: "Anchor navigation", appliesTo: "CaseTOC", trigger: "Reader clicks a TOC link in production routes.", behavior: "The component prevents the default link jump, sets active state, and scrolls the target section into view.", whatChanges: "Target section scrolls with reduced-motion support and temporary scroll lock.", liveUsage: "CaseStudyShell pages with real `tocSections` and `id^=\"cs-sec-\"` anchors." },
      { state: "Mobile hidden behavior", appliesTo: "CaseTOC", trigger: "Viewport is at or below the production hidden breakpoint.", behavior: "The floating TOC is removed from the visual layout to protect reading space.", whatChanges: "`@media (max-width: 1300px)` keeps `.cs-toc` hidden; page content remains naturally readable.", liveUsage: "Tablet and mobile case-study reading." },
      { state: "Docs-local scoped interaction", appliesTo: "Design-system example", trigger: "Reader clicks a TOC link in the docs demo.", behavior: "The demo uses `onNavigate` so navigation is scoped to the right-side sample container.", whatChanges: "No browser hash change and no whole-page scroll; active state follows the demo container.", liveUsage: "Only `/design-system#case-toc` documentation preview." },
    ],
    stateRowsZh: [
      { state: "Desktop floating visible", appliesTo: "CaseTOC", trigger: "viewport 大於正式 TOC breakpoint，且第一個案例 section 到達 navbar 區域。", behavior: "導覽在案例內容旁淡入。", whatChanges: "`.cs-toc.is-visible` 在 fixed desktop container 內變成可見且可互動。", liveUsage: "Advantech、Crypto Arsenal、Laushu case routes。" },
      { state: "Active section", appliesTo: "CaseTOC", trigger: "scrollspy 或受控 `activeSectionId` 選中某個 section id。", behavior: "對應 link 取得 active 視覺狀態。", whatChanges: "Active item 使用 `.cs-toc-item--active`、accent color、較重字重與 `aria-current`。", liveUsage: "長篇案例頁的章節位置感。" },
      { state: "Anchor navigation", appliesTo: "CaseTOC", trigger: "讀者在正式案例頁點擊 TOC link。", behavior: "元件阻止預設跳轉、設定 active state，並捲動到目標 section。", whatChanges: "目標 section scroll into view，支援 reduced motion 與暫時 scroll lock。", liveUsage: "使用真實 `tocSections` 與 `id^=\"cs-sec-\"` anchors 的 CaseStudyShell pages。" },
      { state: "Mobile hidden behavior", appliesTo: "CaseTOC", trigger: "viewport 小於或等於正式隱藏 breakpoint。", behavior: "浮動 TOC 從視覺版面移除，保護閱讀空間。", whatChanges: "`@media (max-width: 1300px)` 讓 `.cs-toc` 維持隱藏；頁面內容仍可自然閱讀。", liveUsage: "平板與手機案例頁閱讀。" },
      { state: "Docs-local scoped interaction", appliesTo: "Design-system example", trigger: "讀者在 docs demo 點擊 TOC link。", behavior: "demo 使用 `onNavigate`，讓導覽只作用在右側 sample container。", whatChanges: "不改 browser hash、不捲動整頁；active state 跟右側 demo container 同步。", liveUsage: "只用於 `/design-system#case-toc` 文件預覽。" },
    ],
    usage: [
      "Use for long-form case-study pages with many sections.",
      "Use when readers need persistent section awareness while reading a case.",
      "Do not use CaseTOC as a generic documentation TOC.",
      "On production mobile breakpoints, hide it to protect reading space.",
    ],
    usageZh: [
      "用於章節較多的長篇案例頁。",
      "當讀者需要在閱讀案例時持續知道目前章節位置，使用 CaseTOC。",
      "不要把 CaseTOC 當成 generic documentation TOC。",
      "正式站手機斷點需隱藏它，保護閱讀空間。",
    ],
    anatomyParts: [
      { part: "TOC root", description: "Navigation landmark rendered by CaseTOCView with visibility controlled by props or production scroll state.", owner: "CaseTOCView", code: ".cs-toc" },
      { part: "List", description: "Maps the provided `sections` array into a vertical section list.", owner: "CaseTOCView", code: ".cs-toc-list" },
      { part: "Link item", description: "Anchor link targeting each real case-study section id.", owner: "CaseTOCView", code: ".cs-toc-link" },
      { part: "Active indicator", description: "Visual and semantic active state for the current section.", owner: "CaseTOCView", code: ".cs-toc-item--active / aria-current" },
      { part: "Section anchors", description: "Production sections must expose ids that match `TocSection.id`.", owner: "Case route / CaseStudyShell children", code: "id=\"cs-sec-*\"" },
      { part: "Desktop fixed container", description: "Shared case-study CSS places the TOC in the left gutter on wide screens.", owner: "styles/case-study.css", code: "@media (min-width: 1025px) .cs-toc" },
      { part: "Mobile hidden behavior", description: "The TOC is hidden when the viewport cannot safely preserve reading width.", owner: "styles/case-study.css", code: "@media (max-width: 1300px) .cs-toc" },
    ],
    anatomyPartsZh: [
      { part: "TOC root", description: "CaseTOCView 輸出的 navigation landmark，由 props 或正式 scroll state 控制可見性。", owner: "CaseTOCView", code: ".cs-toc" },
      { part: "List", description: "將傳入的 `sections` array 映射成垂直章節清單。", owner: "CaseTOCView", code: ".cs-toc-list" },
      { part: "Link item", description: "指向每個真實案例 section id 的 anchor link。", owner: "CaseTOCView", code: ".cs-toc-link" },
      { part: "Active indicator", description: "目前章節的視覺與語意 active state。", owner: "CaseTOCView", code: ".cs-toc-item--active / aria-current" },
      { part: "Section anchors", description: "正式 section 必須提供與 `TocSection.id` 對應的 id。", owner: "Case route / CaseStudyShell children", code: "id=\"cs-sec-*\"" },
      { part: "Desktop fixed container", description: "共用 case-study CSS 在寬螢幕把 TOC 放進左側 gutter。", owner: "styles/case-study.css", code: "@media (min-width: 1025px) .cs-toc" },
      { part: "Mobile hidden behavior", description: "viewport 無法安全保留閱讀寬度時隱藏 TOC。", owner: "styles/case-study.css", code: "@media (max-width: 1300px) .cs-toc" },
    ],
    codeGuidance: {
      importPath: "components/CaseTOC.tsx",
      example: "import CaseTOC, { type TocSection } from \"@/components/CaseTOC\";\n\nconst tocSections: TocSection[] = [\n  { id: \"cs-sec-overview\", title: \"Overview\" },\n  { id: \"cs-sec-solution\", title: \"Solution\" },\n];\n\n<aside className=\"cs-toc-aside\">\n  <CaseTOC sections={tocSections} />\n</aside>",
      props: [
        { name: "sections", type: "TocSection[]", description: "Required section ids and visible labels; ids must match real section anchors." },
        { name: "activeSectionId", type: "string | undefined", description: "Optional controlled active section id. Production routes usually let CaseTOC manage scrollspy state." },
        { name: "visible", type: "boolean | undefined", description: "Optional controlled visibility. Production routes usually let CaseTOC manage visibility from scroll position." },
        { name: "onNavigate", type: "(id: string) => void", description: "Optional scoped navigation hook used by the docs demo. Production routes use the component's page scroll behavior." },
      ],
      notes: ["Production scroll behavior belongs to CaseTOC inside CaseStudyShell.", "The docs demo uses `visible` and `onNavigate` to preserve the production visual state while scoping interaction to the preview container."],
    },
    codeGuidanceZh: {
      importPath: "components/CaseTOC.tsx",
      example: "import CaseTOC, { type TocSection } from \"@/components/CaseTOC\";\n\nconst tocSections: TocSection[] = [\n  { id: \"cs-sec-overview\", title: \"專案總覽\" },\n  { id: \"cs-sec-solution\", title: \"設計方案\" },\n];\n\n<aside className=\"cs-toc-aside\">\n  <CaseTOC sections={tocSections} />\n</aside>",
      props: [
        { name: "sections", type: "TocSection[]", description: "必填的 section id 與可見 label；id 必須對應真實 section anchors。" },
        { name: "activeSectionId", type: "string | undefined", description: "可選的受控 active section id。正式 route 通常讓 CaseTOC 自行管理 scrollspy state。" },
        { name: "visible", type: "boolean | undefined", description: "可選的受控 visibility。正式 route 通常讓 CaseTOC 從 scroll position 管理可見性。" },
        { name: "onNavigate", type: "(id: string) => void", description: "docs demo 使用的 scoped navigation hook。正式 route 使用元件內建 page scroll 行為。" },
      ],
      notes: ["正式 scroll behavior 屬於 CaseStudyShell 內的 CaseTOC。", "docs demo 使用 `visible` 與 `onNavigate` 保留 production visual state，同時把互動限制在 preview container。"],
    },
    tokenMappings: [
      { token: ".cs-toc", role: "Floating root container", usage: "Fixed desktop placement, glass surface, shadow, visibility transition, and pointer-event gating." },
      { token: ".cs-toc-list", role: "Vertical section list", usage: "Column layout and left border from `--cs-line`." },
      { token: ".cs-toc-link", role: "Section link", usage: "Text size, muted color, padding, border, and transition." },
      { token: ".cs-toc-item--active .cs-toc-link", role: "Active link state", usage: "Maps active section to `--cs-accent`, font weight, and active border." },
      { token: "--cs-line", role: "Line color", usage: "TOC container border and list rail." },
      { token: "--cs-accent", role: "Active section color", usage: "Active link text and rail color, mapped by each case theme." },
      { token: "--hm-duration-fast / --hm-duration-base", role: "Motion timing", usage: "Link hover and TOC visibility transitions." },
      { token: "@media (max-width: 1300px)", role: "Mobile / narrow breakpoint", usage: "Keeps the floating TOC hidden below the production reading-width threshold." },
    ],
    tokenMappingsZh: [
      { token: ".cs-toc", role: "Floating root container", usage: "負責 desktop fixed placement、玻璃 surface、shadow、visibility transition 與 pointer-event 控制。" },
      { token: ".cs-toc-list", role: "Vertical section list", usage: "Column layout 與來自 `--cs-line` 的左側 rail。" },
      { token: ".cs-toc-link", role: "Section link", usage: "文字尺寸、muted color、padding、border 與 transition。" },
      { token: ".cs-toc-item--active .cs-toc-link", role: "Active link state", usage: "把 active section 映射成 `--cs-accent`、字重與 active border。" },
      { token: "--cs-line", role: "Line color", usage: "TOC container border 與 list rail。" },
      { token: "--cs-accent", role: "Active section color", usage: "Active link 文字與 rail color，由各案例 theme 映射。" },
      { token: "--hm-duration-fast / --hm-duration-base", role: "Motion timing", usage: "Link hover 與 TOC visibility transitions。" },
      { token: "@media (max-width: 1300px)", role: "Mobile / narrow breakpoint", usage: "低於正式閱讀寬度門檻時維持隱藏 floating TOC。" },
    ],
    tokens: [".cs-toc", ".cs-toc-list", ".cs-toc-link", ".cs-toc-item--active", "--cs-line", "--cs-accent", "--hm-duration-fast", "--hm-duration-base"],
    accessibility: ["TOC links remain keyboard reachable when the desktop TOC is visible.", "The active section is exposed visually and with `aria-current`.", "Production links target real section headings or anchored sections.", "Mobile hiding does not remove essential navigation because the case page keeps its natural reading order."],
    accessibilityZh: ["Desktop TOC 可見時，TOC links 必須可用鍵盤操作。", "目前章節以視覺狀態與 `aria-current` 暴露。", "正式 links 必須指向真實 section heading 或 anchored section。", "手機隱藏不會移除必要導覽，因為案例頁仍保留自然閱讀順序。"],
    referenceCards: [
      { label: "Source", value: "components/CaseTOC.tsx" },
      { label: "Live usage", value: "CaseStudyShell / Advantech, Crypto Arsenal, Laushu case routes" },
      { label: "CSS", value: ".cs-toc / .cs-toc-list / .cs-toc-link / .cs-toc-item--active" },
      { label: "Boundary", value: "Long-form case-study navigation, not a generic docs TOC" },
      { label: "Docs demo note", value: "Scoped container interaction only; no browser hash or page scroll change" },
    ],
    referenceCardsZh: [
      { label: "Source", value: "components/CaseTOC.tsx" },
      { label: "Live usage", value: "CaseStudyShell / Advantech、Crypto Arsenal、Laushu case routes" },
      { label: "CSS", value: ".cs-toc / .cs-toc-list / .cs-toc-link / .cs-toc-item--active" },
      { label: "Boundary", value: "長篇案例頁導覽，不是 generic docs TOC" },
      { label: "Docs demo note", value: "互動只作用於 scoped container；不改 browser hash 或 page scroll" },
    ],
  },
  { slug: "case-next-nav", title: "CaseNextNav", titleZh: "下一案例導覽", category: "Navigation", source: "components/case-study/CaseStudyShell.tsx", demo: "case-next-nav", states: ["previous", "next", "disabled"], usage: ["放在案例正文與 Footer 之間。", "提供返回首頁與前往下一個案例的明確出口。"], tokens: ["--hm-surface", "--hm-ink", "--hm-duration-fast"], accessibility: ["包含前往下一個專案的明確提示文字。"] },
  { slug: "accordion", title: "Accordion", titleZh: "手風琴", category: "Navigation", source: "components/ui/Accordion.tsx", demo: "accordion", states: ["collapsed", "expanded", "single", "multiple", "keyboard focus"], tokens: ["--hm-line", "--hm-surface", "--hm-radius-sm", "--hm-duration-fast", "--hm-ease-out"], usage: ["用於可分組的長列表導覽或文件區塊，例如 Design System sidebar。", "預設展開目前所在分類；需要多分類同時開啟時使用 multiple 模式。"], accessibility: ["Header 使用 button，並同步 aria-expanded 與 aria-controls。", "Panel 使用 role=\"region\" 並以 aria-labelledby 關聯 header。", "支援 Enter、Space 切換，方向鍵可在 header 之間移動焦點。"] },
  { slug: "floating-input", title: "FloatingInput", titleZh: "浮動標籤輸入框", category: "Data Entry", source: "components/Contact.tsx", demo: "input", states: ["empty", "focus", "filled", "error", "success", "disabled", "loading"], tokens: ["--hm-surface", "--hm-line", "--hm-ink", "--hm-muted", "--hm-purple", "--hm-error", "--hm-duration-fast"], usage: ["Live usage is the Contact page form for name, company, email, and phone fields."], usageZh: ["真實使用位置是 Contact page 表單中的姓名、公司、Email 與電話欄位。"] },
  { slug: "floating-textarea", title: "FloatingTextarea", titleZh: "浮動標籤多行輸入", category: "Data Entry", source: "components/Contact.tsx", demo: "textarea", states: ["empty", "focus", "filled", "error", "disabled"], tokens: ["--hm-surface", "--hm-line", "--hm-ink", "--hm-muted", "--hm-purple", "--hm-error"], usage: ["Live usage is the Contact page message field."], usageZh: ["真實使用位置是 Contact page 的訊息內容欄位。"] },
  { slug: "contact-method", title: "ContactMethod", titleZh: "聯絡方式", category: "Data Entry", source: "components/Contact.tsx", demo: "contact-method", states: ["default", "hover", "focus"], usage: ["顯示 Email、電話或社群帳號與對應動作。", "可複製資料使用 button；外部社群使用 link。"], tokens: ["--hm-surface", "--hm-ink", "--hm-muted", "--hm-radius-md", "--hm-duration-fast"] },
  { slug: "select", title: "Select", titleZh: "下拉選單", category: "Data Entry", source: "components/ui/Select.tsx", demo: "select", states: ["placeholder", "open", "selected", "focus", "error", "disabled"], tokens: ["--hm-surface", "--hm-line", "--hm-ink", "--hm-muted", "--hm-radius-md", "--hm-duration-fast"], usage: ["Contract-only candidate.", "No current live usage in portfolio routes.", "Not a production example; keep it for future product surfaces or maintenance consistency.", "Use when options exceed four and keyboard navigation / focus management is required."], usageZh: ["Contract-only 候選元件。", "目前正式作品集 route 尚未直接使用。", "不是目前正式站的 production example；先保留給未來產品介面或維護一致性。", "選項超過 4 個，且需要鍵盤導覽與焦點管理時才使用。"] },
  { slug: "checkbox", title: "Checkbox", titleZh: "核取方塊", category: "Data Entry", source: "components/ui/Checkbox.tsx", demo: "checkbox", states: ["unchecked", "checked", "focus", "error", "disabled"], tokens: ["--hm-purple", "--hm-line", "--hm-surface", "--hm-radius-sm"], usage: ["Contract-only candidate.", "No current live usage in portfolio routes.", "Not a production example; do not add it to Contact unless a real multi-select task appears.", "Use for multi-select choices or independent boolean settings."], usageZh: ["Contract-only 候選元件。", "目前正式作品集 route 尚未直接使用。", "不是目前正式站的 production example；除非真的出現多選任務，不應硬塞進 Contact。", "用於多選或獨立的 boolean 設定。"] },
  { slug: "radio", title: "Radio", titleZh: "單選按鈕", category: "Data Entry", source: "components/ui/Radio.tsx", demo: "radio", states: ["unchecked", "checked", "focus", "error", "disabled"], tokens: ["--hm-purple", "--hm-line", "--hm-surface", "--hm-radius-pill"], usage: ["Contract-only candidate.", "No current live usage in portfolio routes.", "Not a production example; implement in production first if a real mutually exclusive choice appears.", "Use for mutually exclusive choices with fewer than four options."], usageZh: ["Contract-only 候選元件。", "目前正式作品集 route 尚未直接使用。", "不是目前正式站的 production example；若未來有真實互斥選項，應先導入 production 再文件化。", "用於少於 4 個選項的單選互斥情境。"] },
  {
    slug: "project-card",
    title: "ProjectCard",
    titleZh: "專案卡片",
    category: "Data Display",
    source: "components/ProjectCard.tsx",
    hideSourceInHeader: true,
    status: "Live component",
    statusZh: "正式元件",
    description: "A project storytelling card used in Selected Works.",
    descriptionZh: "用於 Selected Works 的專案敘事卡片。",
    exampleLabel: "Selected Works card",
    exampleLabelZh: "Selected Works 卡片",
    demo: "project-card",
    stateRows: [
      { state: "Default", appliesTo: "ProjectCard", trigger: "Card renders in the Selected Works list.", behavior: "Shows cover media as the primary surface with project metadata available in the card structure.", whatChanges: "Root `.project-card` sets aspect ratio, radius, surface, and isolated media layer.", liveUsage: "Homepage / Selected Works." },
      { state: "Hover / focus overlay", appliesTo: "ProjectCard", trigger: "Pointer hover or keyboard focus within a published card.", behavior: "The information panel becomes visible and the image subtly scales.", whatChanges: "`.project-info` slides in, `.project-scrim` appears, and `.project-image` scales on hover / focus-within.", liveUsage: "Desktop and keyboard exploration of published project cards." },
      { state: "Published CTA", appliesTo: "ProjectCard", trigger: "`project.status` is not `coming-soon`.", behavior: "The CTA links to the project detail route.", whatChanges: "ProjectCard renders shared Button with `href={project.href ?? \"/\"}` and size `lg`.", liveUsage: "Published Advantech, Crypto Arsenal, and Laushu project cards." },
      { state: "Coming soon / disabled CTA", appliesTo: "ProjectCard", trigger: "`project.status === \"coming-soon\"`.", behavior: "The card communicates unavailable status without behaving like a link.", whatChanges: "ProjectCard renders shared Button with `disabled` and localized Coming Soon label.", liveUsage: "Unavailable Selected Works placeholders." },
      { state: "Responsive stacked / mobile layout", appliesTo: "ProjectCard", trigger: "Viewport reaches the homepage mobile breakpoints.", behavior: "The card becomes a vertical flow so image, metadata, tags, and CTA do not depend on hover.", whatChanges: "`styles/home.css` changes `.project-card` to flex column, makes `.project-info` static, hides scrim, and removes image scale.", liveUsage: "Selected Works at tablet and mobile widths." },
    ],
    stateRowsZh: [
      { state: "Default", appliesTo: "ProjectCard", trigger: "卡片在 Selected Works list 中 render。", behavior: "以 cover media 作為主要 surface，並保留專案 metadata 結構。", whatChanges: "Root `.project-card` 設定 aspect ratio、radius、surface 與 isolated media layer。", liveUsage: "Homepage / Selected Works。" },
      { state: "Hover / focus overlay", appliesTo: "ProjectCard", trigger: "滑鼠 hover 或鍵盤 focus 進入已發布卡片。", behavior: "資訊面板出現，圖片輕微放大。", whatChanges: "`.project-info` slide in，`.project-scrim` 顯示，`.project-image` 在 hover / focus-within scale。", liveUsage: "桌機與鍵盤探索已發布專案卡片。" },
      { state: "Published CTA", appliesTo: "ProjectCard", trigger: "`project.status` 不是 `coming-soon`。", behavior: "CTA 連到專案詳情 route。", whatChanges: "ProjectCard render shared Button，帶入 `href={project.href ?? \"/\"}` 與 size `lg`。", liveUsage: "已發布的 Advantech、Crypto Arsenal、Laushu 專案卡片。" },
      { state: "Coming soon / disabled CTA", appliesTo: "ProjectCard", trigger: "`project.status === \"coming-soon\"`。", behavior: "卡片傳達尚未上線狀態，但不表現成可點擊連結。", whatChanges: "ProjectCard render shared Button，帶入 `disabled` 與本地化 Coming Soon label。", liveUsage: "Selected Works 中未上線的 placeholder。" },
      { state: "Responsive stacked / mobile layout", appliesTo: "ProjectCard", trigger: "viewport 進入首頁 mobile breakpoints。", behavior: "卡片改成直向 flow，圖片、metadata、tags 與 CTA 不依賴 hover。", whatChanges: "`styles/home.css` 將 `.project-card` 改為 flex column，`.project-info` 變 static，隱藏 scrim，移除圖片 scale。", liveUsage: "Selected Works 在平板與手機寬度。" },
    ],
    usage: [
      "Use when presenting a portfolio project in Selected Works.",
      "Use for project-level storytelling with cover media, metadata, tags, and one CTA.",
      "Do not use ProjectCard as a generic content card.",
      "Use only when the card links to or represents a real project.",
    ],
    usageZh: [
      "用於 Selected Works 中呈現作品集專案。",
      "適合承載 cover media、metadata、tags 與單一 CTA 的專案層級敘事。",
      "不要把 ProjectCard 當成 generic content card。",
      "只有當卡片連到或代表真實專案時才使用。",
    ],
    anatomyParts: [
      { part: "Card root", description: "Project card shell with project tone and stable id.", owner: "ProjectCard", code: ".project-card / tone-${project.tone}" },
      { part: "Cover", description: "Full-card media layer on desktop and responsive image frame on mobile.", owner: "ProjectCard + styles/home.css", code: ".project-media / .project-image" },
      { part: "Logo / title / metadata", description: "Project identity, title, and date sourced from `ProjectSummary`.", owner: "ProjectCard", code: ".project-logo-wrap / .project-title" },
      { part: "Description", description: "Short project summary shown in the desktop info panel and hidden in the mobile compact layout.", owner: "ProjectCard", code: ".project-description" },
      { part: "Tags", description: "Project tags rendered from real project data and toned by project color class.", owner: "ProjectCard", code: ".project-tags / .tone-* .project-tags span" },
      { part: "CTA", description: "Shared Button rendered as link for published projects or disabled button for coming-soon projects.", owner: "ProjectCard + Button", code: "<Button href ... size=\"lg\"> / <Button disabled>" },
      { part: "Scrim / hover overlay", description: "Desktop affordance that reveals the information panel and adds image contrast.", owner: "styles/home.css", code: ".project-scrim / .project-info / :focus-within" },
      { part: "Disabled action state", description: "Coming-soon projects keep the CTA non-interactive while preserving layout parity.", owner: "ProjectCard", code: "project.status === \"coming-soon\"" },
    ],
    anatomyPartsZh: [
      { part: "Card root", description: "帶有 project tone 與穩定 id 的專案卡片外殼。", owner: "ProjectCard", code: ".project-card / tone-${project.tone}" },
      { part: "Cover", description: "桌機是整張卡的 media layer；手機改成響應式圖片框。", owner: "ProjectCard + styles/home.css", code: ".project-media / .project-image" },
      { part: "Logo / title / metadata", description: "來自 `ProjectSummary` 的專案識別、標題與日期。", owner: "ProjectCard", code: ".project-logo-wrap / .project-title" },
      { part: "Description", description: "桌機 info panel 顯示的短專案摘要，手機 compact layout 會隱藏。", owner: "ProjectCard", code: ".project-description" },
      { part: "Tags", description: "從真實 project data render，並由 project tone class 控制色彩。", owner: "ProjectCard", code: ".project-tags / .tone-* .project-tags span" },
      { part: "CTA", description: "已發布專案使用 shared Button link；coming-soon 專案使用 disabled button。", owner: "ProjectCard + Button", code: "<Button href ... size=\"lg\"> / <Button disabled>" },
      { part: "Scrim / hover overlay", description: "桌機用來顯示 info panel 並增加圖片對比的互動 affordance。", owner: "styles/home.css", code: ".project-scrim / .project-info / :focus-within" },
      { part: "Disabled action state", description: "Coming-soon 專案維持 CTA 不可互動，同時保留排版一致性。", owner: "ProjectCard", code: "project.status === \"coming-soon\"" },
    ],
    codeGuidance: {
      importPath: "components/ProjectCard.tsx",
      example: "import ProjectCard from \"@/components/ProjectCard\";\nimport { getProjects } from \"@/data/projects\";\n\nconst [project] = getProjects(locale);\n\n<ProjectCard project={project} />",
      props: [
        { name: "project", type: "ProjectSummary", description: "Required project data object. ProjectCard reads title, date, description, cover, logo, tags, tone, status, href, slug, and optional cardId." },
      ],
      notes: ["ProjectCard does not accept a separate `locale` prop; localized project data comes from `getProjects(locale)` before rendering.", "The component uses shared Button internally for the published or coming-soon CTA.", "Homepage reveal animation is owned by `Works.tsx`, not ProjectCard itself."],
    },
    codeGuidanceZh: {
      importPath: "components/ProjectCard.tsx",
      example: "import ProjectCard from \"@/components/ProjectCard\";\nimport { getProjects } from \"@/data/projects\";\n\nconst [project] = getProjects(locale);\n\n<ProjectCard project={project} />",
      props: [
        { name: "project", type: "ProjectSummary", description: "必填的 project data object。ProjectCard 讀取 title、date、description、cover、logo、tags、tone、status、href、slug 與 optional cardId。" },
      ],
      notes: ["ProjectCard 不接受額外的 `locale` prop；本地化 project data 在 render 前由 `getProjects(locale)` 提供。", "元件內部使用 shared Button 處理已發布或 coming-soon CTA。", "首頁 reveal animation 屬於 `Works.tsx`，不是 ProjectCard 自身責任。"],
    },
    tokenMappings: [
      { token: ".project-card", role: "Card surface", usage: "Aspect ratio, min-height, radius, overflow, background, and isolation." },
      { token: ".project-media / .project-image", role: "Cover / media sizing", usage: "Desktop full-card media layer; mobile responsive image frame; image uses object-fit cover." },
      { token: ".project-scrim", role: "Overlay / scrim", usage: "Desktop hover / focus contrast layer with opacity transition." },
      { token: "border-radius: 12px", role: "Radius", usage: "Class-based value shared by card, media frame, and info panel in `styles/home.css`." },
      { token: ".project-tags span / .tone-*", role: "Tag styling", usage: "Class-based tag background and text color mapped by project tone." },
      { token: "Button size=\"lg\"", role: "CTA styling", usage: "ProjectCard delegates CTA appearance to the shared Button component." },
      { token: "--hm-duration-base / --hm-duration-slow", role: "Transition", usage: "Scrim, info panel, and image hover / focus transitions." },
      { token: "@media (max-width: 768px) / @media (max-width: 440px)", role: "Responsive layout", usage: "Class-based mobile stacked layout and compact metadata behavior." },
    ],
    tokenMappingsZh: [
      { token: ".project-card", role: "Card surface", usage: "控制 aspect ratio、min-height、radius、overflow、background 與 isolation。" },
      { token: ".project-media / .project-image", role: "Cover / media sizing", usage: "桌機 full-card media layer；手機 responsive image frame；圖片使用 object-fit cover。" },
      { token: ".project-scrim", role: "Overlay / scrim", usage: "桌機 hover / focus 的對比層與 opacity transition。" },
      { token: "border-radius: 12px", role: "Radius", usage: "`styles/home.css` 內 card、media frame 與 info panel 共用的 class-based value。" },
      { token: ".project-tags span / .tone-*", role: "Tag styling", usage: "依 project tone 映射 tag background 與文字色。" },
      { token: "Button size=\"lg\"", role: "CTA styling", usage: "ProjectCard 將 CTA 外觀交給 shared Button。" },
      { token: "--hm-duration-base / --hm-duration-slow", role: "Transition", usage: "Scrim、info panel 與圖片 hover / focus transition。" },
      { token: "@media (max-width: 768px) / @media (max-width: 440px)", role: "Responsive layout", usage: "Class-based 手機直向排版與 compact metadata 行為。" },
    ],
    tokens: [".project-card", ".project-media", ".project-image", ".project-scrim", ".project-info", ".project-tags", "Button size=\"lg\"", "--hm-duration-base", "--hm-duration-slow"],
    accessibility: ["Card CTA should expose a clear destination through the shared Button label.", "The hover overlay is also reachable through keyboard focus via `:focus-within`.", "Coming-soon actions render as disabled buttons and must not behave like links.", "Project title, metadata, and CTA remain readable without relying on hover-only disclosure on mobile.", "Image alt text uses the project title, while decorative logos use empty alt text."],
    accessibilityZh: ["卡片 CTA 需要透過 shared Button label 清楚說明目的地。", "Hover overlay 也能透過 `:focus-within` 由鍵盤 focus 觸發。", "Coming-soon action render 成 disabled button，不能表現成 link。", "手機版不依賴 hover-only disclosure，專案標題、metadata 與 CTA 仍需可讀。", "圖片 alt 使用 project title；裝飾 logo 使用空 alt。"],
    referenceCards: [
      { label: "Source", value: "components/ProjectCard.tsx" },
      { label: "Live usage", value: "Homepage / Selected Works" },
      { label: "Data source", value: "getProjects(locale) / ProjectSummary" },
      { label: "CSS", value: "styles/home.css: .project-card, .project-media, .project-info, .project-tags" },
      { label: "Boundary", value: "Project storytelling card, not a generic Card" },
    ],
    referenceCardsZh: [
      { label: "Source", value: "components/ProjectCard.tsx" },
      { label: "Live usage", value: "Homepage / Selected Works" },
      { label: "Data source", value: "getProjects(locale) / ProjectSummary" },
      { label: "CSS", value: "styles/home.css: .project-card、.project-media、.project-info、.project-tags" },
      { label: "Boundary", value: "專案敘事卡片，不是 generic Card" },
    ],
  },
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
  {
    slug: "toast",
    title: "Toast",
    titleZh: "通知",
    category: "Feedback",
    source: "components/ui/Toast.tsx",
    hideSourceInHeader: true,
    status: "Live component",
    statusZh: "正式元件",
    description: "A non-blocking feedback message for Contact submit results.",
    descriptionZh: "用於 Contact 送出結果的非阻斷式回饋訊息。",
    demo: "toast",
    stateRows: [
      { state: "Success result", appliesTo: "Toast", trigger: "Contact submit request resolves successfully.", behavior: "A success toast appears and the form can return to the normal task flow.", whatChanges: "`Toast` renders `Alert` with `tone=\"success\"` inside `.hm-toast-region`.", liveUsage: "Contact form success feedback." },
      { state: "Error result", appliesTo: "Toast", trigger: "Contact submit request fails or returns a non-ok response.", behavior: "An error toast appears without blocking the user from retrying.", whatChanges: "`Toast` renders `Alert` with `tone=\"error\"`; Alert exposes `role=\"alert\"`.", liveUsage: "Contact form error feedback." },
      { state: "Auto-dismiss / dismiss", appliesTo: "Toast", trigger: "`duration` timer completes or the dismiss button is clicked.", behavior: "`onClose` clears the Contact result state.", whatChanges: "The toast unmounts after the default 3000ms timer or manual dismiss.", liveUsage: "Contact success / error status cleanup." },
      { state: "Non-blocking feedback", appliesTo: "Toast", trigger: "Async submit has finished and no blocking decision remains.", behavior: "The message floats above the page while the user can continue.", whatChanges: "`.hm-toast-region` uses fixed bottom-right positioning and does not open a dialog.", liveUsage: "Result feedback after the Contact review modal closes." },
      { state: "Contact submit result", appliesTo: "Contact flow", trigger: "Modal confirmation hands the final result state to Contact.", behavior: "Toast owns success / error messaging; Modal does not display final results.", whatChanges: "Contact renders `<Toast message={t(\"success\" | \"error\")} tone=\"success\" | \"error\" />`.", liveUsage: "Contact submit flow." },
    ],
    stateRowsZh: [
      { state: "Success result", appliesTo: "Toast", trigger: "Contact submit request 成功完成。", behavior: "顯示成功 toast，表單可回到一般任務流程。", whatChanges: "`Toast` 在 `.hm-toast-region` 內 render `tone=\"success\"` 的 `Alert`。", liveUsage: "Contact form 成功回饋。" },
      { state: "Error result", appliesTo: "Toast", trigger: "Contact submit request 失敗或回傳 non-ok response。", behavior: "顯示錯誤 toast，但不阻斷使用者重試。", whatChanges: "`Toast` render `tone=\"error\"` 的 `Alert`；Alert 暴露 `role=\"alert\"`。", liveUsage: "Contact form 錯誤回饋。" },
      { state: "Auto-dismiss / dismiss", appliesTo: "Toast", trigger: "`duration` timer 結束或使用者點擊 dismiss button。", behavior: "`onClose` 清掉 Contact result state。", whatChanges: "toast 會在預設 3000ms timer 或手動 dismiss 後 unmount。", liveUsage: "Contact success / error status cleanup。" },
      { state: "Non-blocking feedback", appliesTo: "Toast", trigger: "async submit 已完成，且沒有需要阻斷處理的決策。", behavior: "訊息浮在頁面上方，使用者仍可繼續操作。", whatChanges: "`.hm-toast-region` 使用 fixed bottom-right positioning，不開啟 dialog。", liveUsage: "Contact review modal 關閉後的結果回饋。" },
      { state: "Contact submit result", appliesTo: "Contact flow", trigger: "Modal confirmation 將最終結果 state 交回 Contact。", behavior: "Toast 負責成功 / 失敗訊息；Modal 不顯示最終結果。", whatChanges: "Contact render `<Toast message={t(\"success\" | \"error\")} tone=\"success\" | \"error\" />`。", liveUsage: "Contact submit flow。" },
    ],
    usage: [
      "Use after an async action finishes and the user can continue their task.",
      "Use for Contact success / error result feedback.",
      "Do not use Modal for success / error result feedback unless the user must make a blocking decision.",
      "Keep messages short and actionable.",
    ],
    usageZh: [
      "用於 async action 完成後，且使用者可以繼續原本任務的情境。",
      "用於 Contact 成功 / 失敗的結果回饋。",
      "除非使用者必須做阻斷式決策，否則不要用 Modal 承擔成功 / 失敗結果回饋。",
      "訊息要短、可理解，並能引導下一步。",
    ],
    anatomyParts: [
      { part: "Root", description: "Fixed toast region that positions the feedback above page content.", owner: "Toast", code: ".hm-toast-region" },
      { part: "Tone / status", description: "Passes success, error, warning, or info tone through to Alert.", owner: "Toast + Alert", code: "tone?: FeedbackTone" },
      { part: "Message", description: "Short result copy rendered as Alert children.", owner: "Caller", code: "message: string" },
      { part: "Dismiss / timeout", description: "Manual dismiss and the duration timer both call `onClose`.", owner: "Toast", code: "duration / onClose" },
      { part: "Container / position", description: "Bottom-right fixed placement constrained to viewport width.", owner: "styles/tokens.css", code: ".hm-toast-region" },
    ],
    anatomyPartsZh: [
      { part: "Root", description: "固定定位的 toast region，將回饋放在頁面內容上方。", owner: "Toast", code: ".hm-toast-region" },
      { part: "Tone / status", description: "將 success、error、warning、info tone 傳給 Alert。", owner: "Toast + Alert", code: "tone?: FeedbackTone" },
      { part: "Message", description: "由 caller 傳入的短結果文案，作為 Alert children 顯示。", owner: "Caller", code: "message: string" },
      { part: "Dismiss / timeout", description: "手動 dismiss 與 duration timer 都會呼叫 `onClose`。", owner: "Toast", code: "duration / onClose" },
      { part: "Container / position", description: "右下 fixed placement，寬度受 viewport 限制。", owner: "styles/tokens.css", code: ".hm-toast-region" },
    ],
    codeGuidance: {
      importPath: "components/ui/Toast.tsx",
      example: "import { Toast } from \"@/components/ui/Toast\";\n\n{status === \"success\" ? (\n  <Toast message={t(\"success\")} tone=\"success\" onClose={() => setStatus(\"idle\")} />\n) : null}\n\n{status === \"error\" ? (\n  <Toast message={t(\"error\")} tone=\"error\" onClose={() => setStatus(\"idle\")} />\n) : null}",
      props: [
        { name: "message", type: "string", description: "Required short feedback message shown inside the Alert." },
        { name: "tone", type: "FeedbackTone", description: "Optional result tone. Contact uses `success` and `error`." },
        { name: "onClose", type: "() => void", description: "Required cleanup callback for auto-dismiss and manual dismiss." },
        { name: "duration", type: "number", description: "Optional auto-dismiss delay in milliseconds. Defaults to 3000." },
      ],
      notes: ["Toast wraps the shared Alert component.", "Use Toast for final Contact submit results; keep review and confirmation inside Modal."],
    },
    codeGuidanceZh: {
      importPath: "components/ui/Toast.tsx",
      example: "import { Toast } from \"@/components/ui/Toast\";\n\n{status === \"success\" ? (\n  <Toast message={t(\"success\")} tone=\"success\" onClose={() => setStatus(\"idle\")} />\n) : null}\n\n{status === \"error\" ? (\n  <Toast message={t(\"error\")} tone=\"error\" onClose={() => setStatus(\"idle\")} />\n) : null}",
      props: [
        { name: "message", type: "string", description: "必填的短回饋訊息，顯示在 Alert 內。" },
        { name: "tone", type: "FeedbackTone", description: "可選的結果 tone。Contact 使用 `success` 與 `error`。" },
        { name: "onClose", type: "() => void", description: "必填的 cleanup callback，用於 auto-dismiss 與手動 dismiss。" },
        { name: "duration", type: "number", description: "可選的 auto-dismiss 毫秒數，預設 3000。" },
      ],
      notes: ["Toast 會包住 shared Alert component。", "Contact 最終送出結果使用 Toast；review 與 confirmation 留在 Modal。"],
    },
    tokenMappings: [
      { token: ".hm-toast-region", role: "Toast placement", usage: "Fixed bottom-right region, z-index, viewport-safe width, and enter animation." },
      { token: ".hm-alert / .hm-alert-success / .hm-alert-error", role: "Result surface", usage: "Toast delegates surface, status color, icon, and dismiss button to Alert." },
      { token: "--hm-z-toast", role: "Layer", usage: "Keeps toast above modal and page content when rendered." },
      { token: "--hm-success / --hm-success-soft", role: "Success tone", usage: "Success text and soft background through Alert tone variables." },
      { token: "--hm-error / --hm-error-soft", role: "Error tone", usage: "Error text and soft background through Alert tone variables." },
      { token: "border-radius: 12px", role: "Radius", usage: "Class-based Alert radius in `styles/tokens.css`." },
      { token: "--hm-duration-base / --hm-ease-out", role: "Motion", usage: "Toast enter animation timing." },
    ],
    tokenMappingsZh: [
      { token: ".hm-toast-region", role: "Toast placement", usage: "右下 fixed region、z-index、viewport-safe width 與 enter animation。" },
      { token: ".hm-alert / .hm-alert-success / .hm-alert-error", role: "Result surface", usage: "Toast 將 surface、status color、icon 與 dismiss button 交給 Alert。" },
      { token: "--hm-z-toast", role: "Layer", usage: "toast render 時保持在 modal 與 page content 上方。" },
      { token: "--hm-success / --hm-success-soft", role: "Success tone", usage: "透過 Alert tone variables 控制成功文字與 soft background。" },
      { token: "--hm-error / --hm-error-soft", role: "Error tone", usage: "透過 Alert tone variables 控制錯誤文字與 soft background。" },
      { token: "border-radius: 12px", role: "Radius", usage: "`styles/tokens.css` 內 class-based Alert radius。" },
      { token: "--hm-duration-base / --hm-ease-out", role: "Motion", usage: "Toast enter animation timing。" },
    ],
    tokens: [".hm-toast-region", ".hm-alert", ".hm-alert-success", ".hm-alert-error", "--hm-z-toast", "--hm-success", "--hm-error", "--hm-duration-base"],
    accessibility: ["Toast uses an `aria-live=\"polite\"` region, while the wrapped Alert exposes status or alert semantics by tone.", "Messages should stay concise so they can be announced and understood quickly.", "Toast must not be the only way to recover from a critical failure when user action is required.", "Do not hide essential form field errors only in a temporary message."],
    accessibilityZh: ["Toast 使用 `aria-live=\"polite\"` region，內層 Alert 依 tone 暴露 status 或 alert 語意。", "訊息需要精簡，讓公告與理解都能快速完成。", "若 critical failure 需要使用者處理，Toast 不能是唯一復原方式。", "必要欄位錯誤不能只藏在暫時性訊息裡。"],
    referenceCards: [
      { label: "Source path", value: "components/ui/Toast.tsx" },
      { label: "Live usage", value: "Contact form success / error" },
      { label: "Boundary", value: "Result feedback, not confirmation" },
      { label: "Related component", value: "Modal handles review-before-submit" },
    ],
    referenceCardsZh: [
      { label: "Source path", value: "components/ui/Toast.tsx" },
      { label: "Live usage", value: "Contact form success / error" },
      { label: "Boundary", value: "結果回饋，不是確認流程" },
      { label: "Related component", value: "Modal 負責送出前確認" },
    ],
  },
  { slug: "alert", title: "Alert", titleZh: "行內提示", category: "Feedback", source: "components/ui/Alert.tsx", demo: "alert", states: ["success", "warning", "error", "info", "dismissible"], usage: ["Contract-only component.", "No standalone live usage in portfolio routes.", "Not a production example; Contact currently uses Toast for submit feedback.", "Use for persistent or manually dismissed inline messages."], usageZh: ["Contract-only 元件。", "目前正式作品集 route 尚未有獨立使用。", "不是目前正式站的 production example；Contact 目前用 Toast 承擔送出回饋。", "用於表單頂部或區塊內的永久 / 手動關閉提示。"], tokens: ["--hm-surface", "--hm-ink", "--hm-error", "--hm-radius-md"], accessibility: ["狀態顏色需搭配圖示，不可僅依賴色彩。"] },
  {
    slug: "modal",
    title: "Modal",
    titleZh: "對話框",
    category: "Feedback",
    source: "components/ui/Modal.tsx",
    hideSourceInHeader: true,
    status: "Live component",
    statusZh: "正式元件",
    description: "A confirmation dialog used to review a Contact message before sending.",
    descriptionZh: "用於送出前檢視 Contact 訊息內容的確認對話框。",
    demo: "modal",
    stateRows: [
      { state: "Open", appliesTo: "Modal", trigger: "Contact form submit passes field validation and opens the review step.", behavior: "A blocking dialog appears with the submitted summary.", whatChanges: "`Modal` renders `.hm-modal-backdrop` and `.hm-modal` with dialog semantics.", liveUsage: "Contact review-before-submit confirmation." },
      { state: "Cancel", appliesTo: "Contact review modal", trigger: "Reader chooses Cancel / Back to edit, close button, backdrop, or Escape while not loading.", behavior: "The dialog closes without clearing the form content.", whatChanges: "`onClose` sets `reviewOpen` false and preserves `pendingSubmission`.", liveUsage: "Returning to edit Contact details." },
      { state: "Confirm", appliesTo: "Contact review modal", trigger: "Reader chooses Confirm Send.", behavior: "The Contact submission request starts.", whatChanges: "Primary Button calls `handleConfirmSend`; status becomes `loading`.", liveUsage: "Sending Contact form data." },
      { state: "Sending", appliesTo: "Contact review modal", trigger: "Submit request is in flight.", behavior: "The primary action shows Button loading and the summary area shows Skeleton rows.", whatChanges: "Buttons are disabled; summary list uses `aria-busy` and Skeleton placeholders.", liveUsage: "Contact pending submission state." },
      { state: "Escape close", appliesTo: "Modal", trigger: "Escape key is pressed while `open` is true.", behavior: "The component calls `onClose`.", whatChanges: "Production Contact `onClose` ignores close while loading.", liveUsage: "Keyboard dismissal before send starts." },
      { state: "Mobile button order", appliesTo: "Contact review actions", trigger: "Viewport reaches the Contact mobile footer breakpoint.", behavior: "Buttons stack to preserve tappable width.", whatChanges: "Desktop visual order uses secondary left / primary right; mobile CSS resets both orders to natural DOM order.", liveUsage: "Contact review modal on mobile." },
      { state: "Result handoff to Toast", appliesTo: "Contact flow", trigger: "The submit request resolves.", behavior: "Modal closes and result feedback is shown by Toast.", whatChanges: "Success / error state renders Toast; Modal does not own final result messaging.", liveUsage: "Contact success / error feedback." },
    ],
    stateRowsZh: [
      { state: "Open", appliesTo: "Modal", trigger: "Contact form submit 通過欄位驗證並進入 review step。", behavior: "顯示阻斷式 dialog，呈現送出摘要。", whatChanges: "`Modal` render `.hm-modal-backdrop` 與具 dialog 語意的 `.hm-modal`。", liveUsage: "Contact 送出前確認。" },
      { state: "Cancel", appliesTo: "Contact review modal", trigger: "讀者在非 loading 狀態選擇 Cancel / 返回修改、close button、backdrop 或 Escape。", behavior: "dialog 關閉，但不清除表單內容。", whatChanges: "`onClose` 將 `reviewOpen` 設為 false，並保留 `pendingSubmission`。", liveUsage: "回到 Contact 欄位修改。" },
      { state: "Confirm", appliesTo: "Contact review modal", trigger: "讀者選擇 Confirm Send / 確認送出。", behavior: "Contact submission request 開始。", whatChanges: "Primary Button 呼叫 `handleConfirmSend`；status 變成 `loading`。", liveUsage: "送出 Contact form data。" },
      { state: "Sending", appliesTo: "Contact review modal", trigger: "submit request 正在進行。", behavior: "主要動作顯示 Button loading，summary area 顯示 Skeleton rows。", whatChanges: "buttons disabled；summary list 使用 `aria-busy` 與 Skeleton placeholders。", liveUsage: "Contact pending submission state。" },
      { state: "Escape close", appliesTo: "Modal", trigger: "`open` 為 true 時按下 Escape。", behavior: "元件呼叫 `onClose`。", whatChanges: "Production Contact 的 `onClose` 會在 loading 時忽略關閉。", liveUsage: "送出開始前的鍵盤關閉。" },
      { state: "Mobile button order", appliesTo: "Contact review actions", trigger: "viewport 進入 Contact mobile footer breakpoint。", behavior: "buttons 堆疊，保留可點擊寬度。", whatChanges: "桌機視覺 order 是 secondary left / primary right；手機 CSS 將兩者重設為自然 DOM order。", liveUsage: "手機 Contact review modal。" },
      { state: "Result handoff to Toast", appliesTo: "Contact flow", trigger: "submit request 完成。", behavior: "Modal 關閉，結果回饋由 Toast 顯示。", whatChanges: "success / error state render Toast；Modal 不負責最終結果訊息。", liveUsage: "Contact 成功 / 失敗回饋。" },
    ],
    usage: [
      "Use when the user should review or confirm a decision before a non-trivial action.",
      "In this portfolio, use it before sending a Contact message.",
      "Do not use Modal for success / error result feedback; Toast handles results.",
      "Avoid modal for low-risk or purely decorative feedback.",
    ],
    usageZh: [
      "用於使用者需要在非輕量動作前檢視或確認決策的情境。",
      "在這個作品集中，Modal 用於 Contact 訊息送出前確認。",
      "不要用 Modal 承擔成功 / 失敗結果回饋；結果由 Toast 處理。",
      "低風險或純裝飾回饋不要使用 modal。",
    ],
    anatomyParts: [
      { part: "Dialog root", description: "The blocking dialog container with semantic dialog attributes.", owner: "Modal", code: ".hm-modal / role=\"dialog\" / aria-modal=\"true\"" },
      { part: "Title", description: "Required title that labels the dialog through `aria-labelledby`.", owner: "Modal", code: "title / #hm-modal-title" },
      { part: "Description", description: "Contact-specific review explanation supplied as children.", owner: "Contact", code: ".contact-review-description" },
      { part: "Summary rows", description: "Name, company, email, optional phone, and message summary before sending.", owner: "Contact", code: ".contact-review-list / .contact-review-row" },
      { part: "Footer actions", description: "Confirm Send first in DOM / keyboard order, Cancel second.", owner: "Contact + Button", code: ".contact-review-actions" },
      { part: "Overlay / backdrop", description: "Full-screen layer that blocks background interaction and supports backdrop close.", owner: "Modal", code: ".hm-modal-backdrop" },
      { part: "Close / escape behavior", description: "Close button, Escape, and backdrop click all call `onClose`.", owner: "Modal", code: "closeLabel / onClose" },
    ],
    anatomyPartsZh: [
      { part: "Dialog root", description: "具 dialog 語意的阻斷式對話框容器。", owner: "Modal", code: ".hm-modal / role=\"dialog\" / aria-modal=\"true\"" },
      { part: "Title", description: "必填 title，透過 `aria-labelledby` 標記 dialog。", owner: "Modal", code: "title / #hm-modal-title" },
      { part: "Description", description: "由 children 傳入的 Contact-specific review 說明。", owner: "Contact", code: ".contact-review-description" },
      { part: "Summary rows", description: "送出前檢視 name、company、email、optional phone 與 message。", owner: "Contact", code: ".contact-review-list / .contact-review-row" },
      { part: "Footer actions", description: "Confirm Send 在 DOM / keyboard order 排第一，Cancel 第二。", owner: "Contact + Button", code: ".contact-review-actions" },
      { part: "Overlay / backdrop", description: "阻擋背景互動的全螢幕 layer，支援 backdrop close。", owner: "Modal", code: ".hm-modal-backdrop" },
      { part: "Close / escape behavior", description: "close button、Escape 與 backdrop click 都會呼叫 `onClose`。", owner: "Modal", code: "closeLabel / onClose" },
    ],
    codeGuidance: {
      importPath: "components/ui/Modal.tsx",
      example: "import { Modal } from \"@/components/ui/Modal\";\n\n<Modal\n  closeLabel={t(\"reviewClose\")}\n  onClose={closeReviewModal}\n  open={reviewOpen}\n  title={t(\"reviewTitle\")}\n>\n  <div className=\"contact-review-modal\">\n    <p className=\"contact-review-description\">{t(\"reviewDescription\")}</p>\n    <dl className=\"contact-review-list\">...</dl>\n    <div className=\"contact-review-actions\">\n      <Button type=\"button\" onClick={handleConfirmSend}>{t(\"reviewConfirm\")}</Button>\n      <Button type=\"button\" variant=\"secondary\" onClick={closeReviewModal}>{t(\"reviewCancel\")}</Button>\n    </div>\n  </div>\n</Modal>",
      props: [
        { name: "open", type: "boolean", description: "Controls whether the modal is mounted." },
        { name: "onClose", type: "() => void", description: "Called by close button, Escape, and backdrop click." },
        { name: "title", type: "string", description: "Required dialog title and accessible label source." },
        { name: "closeLabel", type: "string", description: "Optional accessible label for the close icon button. Defaults to `Close`." },
        { name: "children", type: "ReactNode", description: "Dialog body. Contact supplies review summary and footer actions." },
      ],
      notes: ["Use Modal for review-before-submit confirmation only.", "Do not show success or error results inside Modal; hand them off to Toast."],
    },
    codeGuidanceZh: {
      importPath: "components/ui/Modal.tsx",
      example: "import { Modal } from \"@/components/ui/Modal\";\n\n<Modal\n  closeLabel={t(\"reviewClose\")}\n  onClose={closeReviewModal}\n  open={reviewOpen}\n  title={t(\"reviewTitle\")}\n>\n  <div className=\"contact-review-modal\">\n    <p className=\"contact-review-description\">{t(\"reviewDescription\")}</p>\n    <dl className=\"contact-review-list\">...</dl>\n    <div className=\"contact-review-actions\">\n      <Button type=\"button\" onClick={handleConfirmSend}>{t(\"reviewConfirm\")}</Button>\n      <Button type=\"button\" variant=\"secondary\" onClick={closeReviewModal}>{t(\"reviewCancel\")}</Button>\n    </div>\n  </div>\n</Modal>",
      props: [
        { name: "open", type: "boolean", description: "控制 modal 是否 mount。" },
        { name: "onClose", type: "() => void", description: "close button、Escape 與 backdrop click 會呼叫。" },
        { name: "title", type: "string", description: "必填 dialog title，也是 accessible label 來源。" },
        { name: "closeLabel", type: "string", description: "close icon button 的 optional accessible label，預設 `Close`。" },
        { name: "children", type: "ReactNode", description: "Dialog body。Contact 傳入 review summary 與 footer actions。" },
      ],
      notes: ["Modal 只用於送出前確認。", "不要在 Modal 內顯示成功或失敗結果；結果交給 Toast。"],
    },
    tokenMappings: [
      { token: ".hm-modal-backdrop", role: "Backdrop", usage: "Fixed overlay, z-index, padding, translucent background, and blur." },
      { token: ".hm-modal", role: "Dialog surface", usage: "Width, max-height, overflow, border, radius, paper surface, and shadow." },
      { token: ".hm-modal-header", role: "Header layout", usage: "Title and close button alignment." },
      { token: ".contact-review-actions", role: "Action layout", usage: "Desktop visual order places secondary left and primary right while DOM order keeps primary first." },
      { token: "@media (max-width: 640px) .contact-review-actions", role: "Mobile footer layout", usage: "Stacks actions and resets visual order for narrow screens." },
      { token: "--hm-z-overlay / --hm-z-modal", role: "Layering", usage: "Backdrop and dialog stacking." },
      { token: "border-radius: 16px", role: "Radius", usage: "Class-based modal radius in `styles/tokens.css`." },
      { token: "--shadow-xl", role: "Shadow", usage: "Dialog elevation." },
    ],
    tokenMappingsZh: [
      { token: ".hm-modal-backdrop", role: "Backdrop", usage: "Fixed overlay、z-index、padding、半透明背景與 blur。" },
      { token: ".hm-modal", role: "Dialog surface", usage: "控制 width、max-height、overflow、border、radius、paper surface 與 shadow。" },
      { token: ".hm-modal-header", role: "Header layout", usage: "Title 與 close button alignment。" },
      { token: ".contact-review-actions", role: "Action layout", usage: "桌機視覺 order 是 secondary left / primary right，但 DOM order 維持 primary first。" },
      { token: "@media (max-width: 640px) .contact-review-actions", role: "Mobile footer layout", usage: "窄版 actions 堆疊並重設 visual order。" },
      { token: "--hm-z-overlay / --hm-z-modal", role: "Layering", usage: "Backdrop 與 dialog stacking。" },
      { token: "border-radius: 16px", role: "Radius", usage: "`styles/tokens.css` 內 class-based modal radius。" },
      { token: "--shadow-xl", role: "Shadow", usage: "Dialog elevation。" },
    ],
    tokens: [".hm-modal-backdrop", ".hm-modal", ".hm-modal-header", ".contact-review-actions", "--hm-z-overlay", "--hm-z-modal", "--shadow-xl"],
    accessibility: ["Modal uses `role=\"dialog\"`, `aria-modal=\"true\"`, and `aria-labelledby` when open.", "The title should clearly label the confirmation task.", "Escape, Cancel, backdrop, and close button should close without losing form content when not loading.", "Focus is moved into the dialog on open and returned on close.", "Confirm Send is first in DOM / keyboard order before Cancel, matching the intended Contact confirmation flow.", "Do not use modal for non-critical success / error feedback."],
    accessibilityZh: ["Modal open 時使用 `role=\"dialog\"`、`aria-modal=\"true\"` 與 `aria-labelledby`。", "Title 需要清楚標示確認任務。", "非 loading 狀態下，Escape、Cancel、backdrop 與 close button 應關閉 dialog，且不遺失表單內容。", "開啟時焦點移入 dialog，關閉時歸還。", "Confirm Send 在 DOM / keyboard order 中排在 Cancel 前，符合 Contact 確認流程。", "不要把 modal 用於非關鍵成功 / 失敗回饋。"],
    referenceCards: [
      { label: "Source path", value: "components/ui/Modal.tsx" },
      { label: "Live usage", value: "Contact review-before-submit" },
      { label: "Boundary", value: "Confirmation only, not result feedback" },
      { label: "Related components", value: "Skeleton for pending summary, Toast for result" },
    ],
    referenceCardsZh: [
      { label: "Source path", value: "components/ui/Modal.tsx" },
      { label: "Live usage", value: "Contact 送出前確認" },
      { label: "Boundary", value: "只負責確認，不負責結果回饋" },
      { label: "Related components", value: "Skeleton 處理 pending summary，Toast 處理結果" },
    ],
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    titleZh: "骨架屏",
    category: "Feedback",
    source: "components/ui/Skeleton.tsx",
    hideSourceInHeader: true,
    status: "Live component",
    statusZh: "正式元件",
    description: "A loading placeholder used in the Contact review modal while the message is being submitted.",
    descriptionZh: "Contact review modal 送出訊息時使用的載入 placeholder。",
    demo: "skeleton",
    stateRows: [
      { state: "Pending", appliesTo: "Skeleton", trigger: "Contact status becomes `loading` after Confirm Send.", behavior: "Skeleton rows replace the review summary values while submission is pending.", whatChanges: "Contact renders `Skeleton` inside `.contact-review-row dd` and sets `aria-busy` on the list.", liveUsage: "Contact confirmation Modal pending summary." },
      { state: "Loaded", appliesTo: "Contact review summary", trigger: "Before sending, or after the pending state ends.", behavior: "Real summary content is shown instead of placeholders.", whatChanges: "Name, company, email, optional phone, and message values replace Skeleton rows.", liveUsage: "Contact review-before-submit summary." },
      { state: "Relation to Button loading", appliesTo: "Contact flow", trigger: "Submit request is in flight.", behavior: "Button loading communicates action progress; Skeleton only supports the summary region.", whatChanges: "Primary Button uses `loading` / `loadingLabel`, while Skeleton appears in the review list.", liveUsage: "Contact confirm-send state." },
      { state: "Relation to Toast result", appliesTo: "Contact flow", trigger: "Submit request resolves.", behavior: "Skeleton disappears with the modal; Toast communicates the final success or error result.", whatChanges: "Modal closes and Contact renders Toast based on `success` or `error`.", liveUsage: "Contact result feedback." },
    ],
    stateRowsZh: [
      { state: "Pending", appliesTo: "Skeleton", trigger: "Confirm Send 後 Contact status 變成 `loading`。", behavior: "送出 pending 時，Skeleton rows 取代 review summary values。", whatChanges: "Contact 在 `.contact-review-row dd` 內 render `Skeleton`，並在 list 上設定 `aria-busy`。", liveUsage: "Contact confirmation Modal pending summary。" },
      { state: "Loaded", appliesTo: "Contact review summary", trigger: "送出前，或 pending state 結束後。", behavior: "顯示真實 summary content，而不是 placeholders。", whatChanges: "name、company、email、optional phone 與 message values 取代 Skeleton rows。", liveUsage: "Contact 送出前 summary。" },
      { state: "Relation to Button loading", appliesTo: "Contact flow", trigger: "submit request 正在進行。", behavior: "Button loading 傳達 action progress；Skeleton 只支援 summary region。", whatChanges: "Primary Button 使用 `loading` / `loadingLabel`，Skeleton 出現在 review list。", liveUsage: "Contact confirm-send state。" },
      { state: "Relation to Toast result", appliesTo: "Contact flow", trigger: "submit request 完成。", behavior: "Skeleton 會隨 modal 消失；最終成功或錯誤結果由 Toast 傳達。", whatChanges: "Modal 關閉，Contact 依 `success` 或 `error` render Toast。", liveUsage: "Contact result feedback。" },
    ],
    usage: [
      "Use when a content region is waiting for async work.",
      "In this portfolio, use it inside the Contact review modal summary while submission is pending.",
      "Do not use it to replace the modal itself.",
      "Do not use it for purely static content.",
    ],
    usageZh: [
      "用於某個內容區域正在等待 async work 的情境。",
      "在這個作品集中，Skeleton 用於 Contact review modal summary 的送出 pending state。",
      "不要用 Skeleton 取代整個 modal。",
      "不要用於純靜態內容。",
    ],
    anatomyParts: [
      { part: "Skeleton root", description: "Visual placeholder span that is hidden from assistive technology.", owner: "Skeleton", code: ".hm-skeleton / aria-hidden=\"true\"" },
      { part: "Line / block placeholder", description: "Caller-provided className controls line width and block height.", owner: "Caller CSS", code: "className / style" },
      { part: "Summary region", description: "Contact review list where pending summary values are replaced.", owner: "Contact", code: ".contact-review-list[aria-busy]" },
      { part: "Loading container", description: "The modal remains intact while only summary cells show placeholders.", owner: "Contact review modal", code: ".contact-review-row dd" },
    ],
    anatomyPartsZh: [
      { part: "Skeleton root", description: "對輔助科技隱藏的視覺 placeholder span。", owner: "Skeleton", code: ".hm-skeleton / aria-hidden=\"true\"" },
      { part: "Line / block placeholder", description: "由 caller 傳入 className 控制 line width 與 block height。", owner: "Caller CSS", code: "className / style" },
      { part: "Summary region", description: "Contact review list 中 pending summary values 被取代的位置。", owner: "Contact", code: ".contact-review-list[aria-busy]" },
      { part: "Loading container", description: "modal 本身保持完整，只有 summary cells 顯示 placeholders。", owner: "Contact review modal", code: ".contact-review-row dd" },
    ],
    codeGuidance: {
      importPath: "components/ui/Skeleton.tsx",
      example: "import { Skeleton } from \"@/components/ui/Skeleton\";\n\n<dl className=\"contact-review-list\" aria-busy={status === \"loading\" || undefined}>\n  <div className=\"contact-review-row\">\n    <dt>{t(\"name\")}</dt>\n    <dd><Skeleton className=\"contact-review-skeleton\" /></dd>\n  </div>\n  <div className=\"contact-review-row is-message\">\n    <dt>{t(\"message\")}</dt>\n    <dd>\n      <Skeleton className=\"contact-review-skeleton is-long\" />\n      <Skeleton className=\"contact-review-skeleton is-medium\" />\n    </dd>\n  </div>\n</dl>",
      props: [
        { name: "className", type: "string", description: "Optional className for caller-owned width, height, or layout adjustments." },
        { name: "style", type: "CSSProperties", description: "Optional inline style for one-off placeholder dimensions." },
      ],
      notes: ["Skeleton renders `aria-hidden=\"true\"`; pair it with a real loading cue such as Button loading or parent `aria-busy`.", "Use it inside the Contact modal summary area only; do not replace the whole modal."],
    },
    codeGuidanceZh: {
      importPath: "components/ui/Skeleton.tsx",
      example: "import { Skeleton } from \"@/components/ui/Skeleton\";\n\n<dl className=\"contact-review-list\" aria-busy={status === \"loading\" || undefined}>\n  <div className=\"contact-review-row\">\n    <dt>{t(\"name\")}</dt>\n    <dd><Skeleton className=\"contact-review-skeleton\" /></dd>\n  </div>\n  <div className=\"contact-review-row is-message\">\n    <dt>{t(\"message\")}</dt>\n    <dd>\n      <Skeleton className=\"contact-review-skeleton is-long\" />\n      <Skeleton className=\"contact-review-skeleton is-medium\" />\n    </dd>\n  </div>\n</dl>",
      props: [
        { name: "className", type: "string", description: "可選 className，用於 caller-owned width、height 或 layout 微調。" },
        { name: "style", type: "CSSProperties", description: "可選 inline style，用於一次性的 placeholder 尺寸。" },
      ],
      notes: ["Skeleton render `aria-hidden=\"true\"`；請搭配 Button loading 或 parent `aria-busy` 等真實 loading cue。", "只在 Contact modal summary area 使用，不取代整個 modal。"],
    },
    tokenMappings: [
      { token: ".hm-skeleton", role: "Skeleton surface", usage: "Block display, minimum height, overflow clipping, radius, disabled surface, gradient, and shimmer." },
      { token: "var(--hm-disabled)", role: "Base surface", usage: "Skeleton base fill color." },
      { token: "color-mix(in srgb, var(--hm-paper) 60%, transparent)", role: "Shimmer highlight", usage: "Class-based gradient highlight in `styles/tokens.css`." },
      { token: "border-radius: 8px", role: "Radius", usage: "Class-based skeleton radius." },
      { token: "min-height: 16px", role: "Height", usage: "Default class-based placeholder height before caller overrides." },
      { token: "--hm-duration-enter", role: "Motion", usage: "Shimmer animation duration." },
      { token: ".contact-review-skeleton", role: "Contact summary dimensions", usage: "Contact-specific width and height for summary rows." },
      { token: "@media (prefers-reduced-motion: reduce)", role: "Reduced motion", usage: "Global token stylesheet reduces animation duration and iteration count." },
    ],
    tokenMappingsZh: [
      { token: ".hm-skeleton", role: "Skeleton surface", usage: "Block display、minimum height、overflow clipping、radius、disabled surface、gradient 與 shimmer。" },
      { token: "var(--hm-disabled)", role: "Base surface", usage: "Skeleton base fill color。" },
      { token: "color-mix(in srgb, var(--hm-paper) 60%, transparent)", role: "Shimmer highlight", usage: "`styles/tokens.css` 內的 class-based gradient highlight。" },
      { token: "border-radius: 8px", role: "Radius", usage: "class-based skeleton radius。" },
      { token: "min-height: 16px", role: "Height", usage: "caller override 前的預設 class-based placeholder height。" },
      { token: "--hm-duration-enter", role: "Motion", usage: "Shimmer animation duration。" },
      { token: ".contact-review-skeleton", role: "Contact summary dimensions", usage: "Contact summary rows 專用 width 與 height。" },
      { token: "@media (prefers-reduced-motion: reduce)", role: "Reduced motion", usage: "全域 token stylesheet 會降低 animation duration 與 iteration count。" },
    ],
    tokens: [".hm-skeleton", "--hm-disabled", "--hm-duration-enter", ".contact-review-skeleton"],
    accessibility: ["Skeleton itself is `aria-hidden`, so it should not be the only loading cue for screen reader users.", "Pair it with Button loading, `aria-busy`, or status text where possible.", "Do not leave Skeleton visible after content has loaded.", "Avoid excessive shimmer for motion-sensitive users; the global reduced-motion rule reduces animation behavior."],
    accessibilityZh: ["Skeleton 本身是 `aria-hidden`，不能成為 screen reader 使用者唯一的 loading cue。", "盡可能搭配 Button loading、`aria-busy` 或 status text。", "內容載入後不要讓 Skeleton 繼續顯示。", "避免過度 shimmer；全域 reduced-motion rule 會降低動畫行為。"],
    referenceCards: [
      { label: "Source path", value: "components/ui/Skeleton.tsx" },
      { label: "Live usage", value: "Contact confirmation modal pending summary" },
      { label: "Boundary", value: "Summary placeholder only, not full modal loading state" },
      { label: "Related components", value: "Modal, Button loading, Toast" },
    ],
    referenceCardsZh: [
      { label: "Source path", value: "components/ui/Skeleton.tsx" },
      { label: "Live usage", value: "Contact confirmation modal pending summary" },
      { label: "Boundary", value: "只負責 summary placeholder，不代表整個 modal loading state" },
      { label: "Related components", value: "Modal、Button loading、Toast" },
    ],
  },
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
  stateRows: item.stateRows,
  stateRowsZh: item.stateRowsZh,
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
    usage: [
      "Search token name, value, type, scope, or usage before adding a new style value.",
      "Filter by type when choosing between color, typography, spacing, radius, shadow, motion, and layout tokens.",
      "Use `styles/tokens.css` as the runtime source of truth.",
    ],
    usageZh: [
      "新增樣式值前，先搜尋 token name、value、type、scope 或 usage。",
      "在色彩、字體、間距、圓角、陰影、動效與版面 tokens 之間選擇時，可先依類型篩選。",
      "`styles/tokens.css` 是 runtime source of truth。",
    ],
    tokens: ["Seed → Map → Component", "Primitive → Semantic → Component"],
    references: ["styles/tokens.css", "lib/design-system-data.ts", "docs/design-system/02-tokens.md"],
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
