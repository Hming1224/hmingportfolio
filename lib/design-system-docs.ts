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
  states?: string[];
  tokens?: string[];
  accessibility?: string[];
  references?: string[];
  demo?: string;
};

export const designSystemSections = [
  {
    label: "Foundations",
    labelZh: "基礎規範",
    items: ["colors", "typography", "spacing", "radius", "shadows", "motion"].map(
      (slug) => ({ kind: "foundation" as const, slug }),
    ),
  },
  {
    label: "General",
    labelZh: "一般元件",
    items: ["button", "copy-button", "language-switcher"].map((slug) => ({
      kind: "component" as const,
      slug,
    })),
  },
  {
    label: "Shell",
    labelZh: "網站骨架",
    items: ["navbar", "footer", "scroll-progress"].map((slug) => ({
      kind: "component" as const,
      slug,
    })),
  },
  {
    label: "Navigation",
    labelZh: "導覽",
    items: ["tabs", "case-toc", "year-rail", "case-next-nav"].map((slug) => ({
      kind: "component" as const,
      slug,
    })),
  },
  {
    label: "Data Entry",
    labelZh: "資料輸入",
    items: [
      "floating-input",
      "floating-textarea",
      "contact-method",
      "select",
      "checkbox",
      "radio",
    ].map((slug) => ({ kind: "component" as const, slug })),
  },
  {
    label: "Data Display",
    labelZh: "資料展示",
    items: [
      "project-card",
      "section-heading",
      "project-tag",
      "social-link",
      "skill-category-card",
      "experience-card",
      "hero-badge",
    ].map((slug) => ({ kind: "component" as const, slug })),
  },
  {
    label: "Case Study",
    labelZh: "案例頁",
    items: [
      "case-hero",
      "case-section",
      "zoomable-image",
      "proposal-tabs",
      "case-info-card",
    ].map((slug) => ({ kind: "component" as const, slug })),
  },
  {
    label: "Feedback",
    labelZh: "系統回饋",
    items: ["toast", "alert", "modal", "skeleton", "empty-state"].map((slug) => ({
      kind: "component" as const,
      slug,
    })),
  },
  {
    label: "Reference",
    labelZh: "參考資料",
    items: ["tokens", "button-tokens", "gaps", "plan"].map((slug) => ({
      kind: "reference" as const,
      slug,
    })),
  },
] as const;

const foundations: DesignSystemDoc[] = [
  ["colors", "Colors", "色彩", "Primitive、semantic、project tone 與 status colors。", ["品牌紫色只用於主要 CTA 與 active 訊號。", "專案色只影響局部 tone，不覆蓋全站骨架。"], ["--hm-purple-50…900", "--hm-paper / surface / ink", "--hm-success / warning / error / info", "--hm-chart-1…6"]],
  ["typography", "Typography", "字體與排版", "Space Grotesk 與響應式字級、字重、行高規格。", ["標題維持清楚層級，正文優先可讀性。", "英文完整單字換行，不使用 anywhere 強制切字。"], ["--hm-fs-h1…xs", "--hm-fw-regular…bold", "--hm-text-heading / body / secondary"]],
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
  tokens?: string[];
  usage?: string[];
  accessibility?: string[];
};

const componentSeeds: ComponentSeed[] = [
  { slug: "button", title: "Button", titleZh: "按鈕", category: "General", source: "components/ui/Button.tsx", demo: "button", states: ["default", "hover", "focus", "active", "disabled", "loading", "danger"], tokens: ["--hm-btn-primary-bg", "--hm-btn-height-md", "--hm-btn-radius", "--hm-btn-transition-duration"] },
  { slug: "copy-button", title: "CopyButton", titleZh: "複製按鈕", category: "General", source: "Design System token reference", demo: "copy", states: ["idle", "copied", "focus", "disabled"] },
  { slug: "language-switcher", title: "LanguageSwitcher", titleZh: "語系切換", category: "General", source: "components/LanguageSwitcher.tsx", states: ["closed", "open", "selected", "loading"] },
  { slug: "navbar", title: "Navbar", titleZh: "導覽列", category: "Shell", source: "components/Navbar.tsx", states: ["default", "hidden on scroll", "mobile open", "language menu open"] },
  { slug: "footer", title: "Footer", titleZh: "頁腳", category: "Shell", source: "components/Footer.tsx", states: ["default", "social hover", "mobile stacked"] },
  { slug: "scroll-progress", title: "ScrollProgress", titleZh: "滾動進度條", category: "Shell", source: "components/ScrollProgress.tsx", states: ["0%", "in progress", "100%"] },
  { slug: "tabs", title: "Tabs", titleZh: "標籤頁", category: "Navigation", source: "components/animate-ui/primitives/base/tabs.tsx", demo: "tabs", states: ["default", "hover", "focus", "selected", "disabled"] },
  { slug: "case-toc", title: "CaseTOC", titleZh: "案例目錄", category: "Navigation", source: "components/CaseTOC.tsx", states: ["hidden before content", "visible", "active section"] },
  { slug: "year-rail", title: "YearRail", titleZh: "年份導覽", category: "Navigation", source: "components/YearRail.tsx", states: ["default", "active year", "reduced motion"] },
  { slug: "case-next-nav", title: "CaseNextNav", titleZh: "下一案例導覽", category: "Navigation", source: "components/case-study/CaseStudyShell.tsx", states: ["previous", "next", "disabled"] },
  { slug: "floating-input", title: "FloatingInput", titleZh: "浮動標籤輸入框", category: "Data Entry", source: "components/Contact.tsx", demo: "input", states: ["empty", "focus", "filled", "error", "success", "disabled"] },
  { slug: "floating-textarea", title: "FloatingTextarea", titleZh: "浮動標籤多行輸入", category: "Data Entry", source: "components/Contact.tsx", demo: "textarea", states: ["empty", "focus", "filled", "error", "disabled"] },
  { slug: "contact-method", title: "ContactMethod", titleZh: "聯絡方式", category: "Data Entry", source: "components/Contact.tsx", states: ["default", "hover", "focus"] },
  { slug: "select", title: "Select", titleZh: "下拉選單", category: "Data Entry", source: "components/ui/Select.tsx", demo: "select", states: ["placeholder", "open", "selected", "focus", "error", "disabled"] },
  { slug: "checkbox", title: "Checkbox", titleZh: "核取方塊", category: "Data Entry", source: "components/ui/Checkbox.tsx", demo: "checkbox", states: ["unchecked", "checked", "focus", "error", "disabled"] },
  { slug: "radio", title: "Radio", titleZh: "單選按鈕", category: "Data Entry", source: "components/ui/Radio.tsx", demo: "radio", states: ["unchecked", "checked", "focus", "error", "disabled"] },
  { slug: "project-card", title: "ProjectCard", titleZh: "專案卡片", category: "Data Display", source: "components/Works.tsx", states: ["default", "three-layer hover", "coming soon"] },
  { slug: "section-heading", title: "SectionHeading", titleZh: "區塊標題", category: "Data Display", source: "app/about-me/page.tsx", states: ["default", "responsive"] },
  { slug: "project-tag", title: "ProjectTag", titleZh: "專案標籤", category: "Data Display", source: "components/Works.tsx", demo: "tags", states: ["default", "project tone"] },
  { slug: "social-link", title: "SocialLink", titleZh: "社群連結", category: "Data Display", source: "components/Footer.tsx", states: ["default", "hover", "focus"] },
  { slug: "skill-category-card", title: "SkillCategoryCard", titleZh: "技能分類卡", category: "Data Display", source: "app/about-me/page.tsx", states: ["default", "hover", "focus"] },
  { slug: "experience-card", title: "ExperienceCard", titleZh: "經歷卡片", category: "Data Display", source: "app/about-me/page.tsx", states: ["before reveal", "visible", "active year"] },
  { slug: "hero-badge", title: "HeroBadge", titleZh: "Hero 徽章", category: "Data Display", source: "components/Hero.tsx", states: ["default", "animated", "reduced motion"] },
  { slug: "case-hero", title: "CaseHero", titleZh: "案例 Hero", category: "Case Study", source: "case study section HeroSection.tsx", states: ["Advantech", "Crypto Arsenal", "Laushu", "mobile"] },
  { slug: "case-section", title: "CaseSection", titleZh: "案例區塊", category: "Case Study", source: "components/case-study/CaseSection.tsx", states: ["paper", "surface", "custom class"] },
  { slug: "zoomable-image", title: "ZoomableImage", titleZh: "可放大圖片", category: "Case Study", source: "components/case-study/ZoomableImage.tsx", demo: "zoom", states: ["default", "hover", "focus", "lightbox open"] },
  { slug: "proposal-tabs", title: "ProposalTabs", titleZh: "方案比較標籤", category: "Case Study", source: "app/advantech/components/ProposalTabs.tsx", states: ["default", "hover", "selected"] },
  { slug: "case-info-card", title: "CaseInfoCard", titleZh: "案例資訊卡", category: "Case Study", source: "case study HeroSection.tsx", states: ["default", "responsive"] },
  { slug: "toast", title: "Toast", titleZh: "通知", category: "Feedback", source: "components/ui/Toast.tsx", demo: "toast", states: ["success", "warning", "error", "info", "dismissed"] },
  { slug: "alert", title: "Alert", titleZh: "行內提示", category: "Feedback", source: "components/ui/Alert.tsx", demo: "alert", states: ["success", "warning", "error", "info", "dismissible"] },
  { slug: "modal", title: "Modal", titleZh: "對話框", category: "Feedback", source: "components/ui/Modal.tsx", demo: "modal", states: ["closed", "open", "keyboard focus", "dismissed"] },
  { slug: "skeleton", title: "Skeleton", titleZh: "骨架屏", category: "Feedback", source: "components/ui/Skeleton.tsx", demo: "skeleton", states: ["loading", "reduced motion"] },
  { slug: "empty-state", title: "EmptyState", titleZh: "空狀態", category: "Feedback", source: "components/ui/EmptyState.tsx", demo: "empty", states: ["message only", "description", "with CTA"] },
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
  states: item.states,
  tokens: item.tokens ?? ["--hm-ink", "--hm-surface", "--hm-line", "--hm-duration-fast"],
  accessibility: item.accessibility ?? [
    "Keyboard focus must remain visible.",
    "Do not rely on color alone to communicate state.",
    "Interactive controls need an accessible name.",
  ],
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
