import type { DesignSystemDocKind } from "./design-system-docs";

export type DesignSystemTokenRow = {
  token: string;
  value: string;
  type: "color" | "type" | "spacing" | "radius" | "shadow" | "motion" | "layout";
  scope: "global" | "docs-only" | "case-study";
  usage: string;
};

export const designPrinciples = [
  "Set the character before adding decoration / 先建立氣質，再談裝飾",
  "Colors can change, the frame cannot fall apart / 顏色可以換，框架不能散",
  "The main actor must always be obvious / 主角永遠要清楚",
  "Interaction is not decoration, it adds meaning / 互動不是加特效，是補語意",
  "High information density still needs room to breathe / 資訊密度高，也要讓人呼吸",
  "Design should be catchable by engineering / 設計要能被工程接住",
  "Every reachable state deserves design attention / 每個可到達狀態都值得被設計",
] as const;

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
    items: ["accordion", "tabs", "case-toc", "year-rail", "case-next-nav"].map((slug) => ({
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
] satisfies ReadonlyArray<{
  label: string;
  labelZh: string;
  items: ReadonlyArray<{ kind: DesignSystemDocKind; slug: string }>;
}>;

export const designSystemTokenRows = [
  { token: "--hm-purple", value: "var(--hm-purple-600)", type: "color", scope: "global", usage: "Primary CTA and active signal" },
  { token: "--hm-purple-hover", value: "var(--hm-purple-700)", type: "color", scope: "global", usage: "Primary CTA hover" },
  { token: "--hm-purple-soft", value: "var(--hm-purple-100)", type: "color", scope: "global", usage: "Focus ring and soft highlight" },
  { token: "--hm-purple-light", value: "var(--hm-purple-50)", type: "color", scope: "global", usage: "Light hover surfaces" },
  { token: "--hm-paper", value: "#ffffff", type: "color", scope: "global", usage: "Page and card background" },
  { token: "--hm-surface", value: "#f9f9f9", type: "color", scope: "global", usage: "Input, tab, and soft surface background" },
  { token: "--hm-ink", value: "#343434", type: "color", scope: "global", usage: "Primary text and strong UI copy" },
  { token: "--hm-muted", value: "#8e8e9c", type: "color", scope: "global", usage: "Secondary text and placeholder" },
  { token: "--hm-line", value: "rgba(0, 0, 0, 0.08)", type: "color", scope: "global", usage: "Light border and divider" },
  { token: "--hm-line-strong", value: "rgba(0, 0, 0, 0.16)", type: "color", scope: "global", usage: "Outline border" },
  { token: "--text-heading", value: "#1a1a1a", type: "color", scope: "global", usage: "Headings and section titles" },
  { token: "--text-body", value: "#1f2933", type: "color", scope: "global", usage: "Body copy" },
  { token: "--text-secondary", value: "#5d6674", type: "color", scope: "global", usage: "Descriptions and supportive labels" },
  { token: "--text-muted", value: "#8e8e9c", type: "color", scope: "global", usage: "Lowest-emphasis text" },
  { token: "--fs-h1", value: "32px", type: "type", scope: "global", usage: "Desktop page main heading" },
  { token: "--fs-h2", value: "28px", type: "type", scope: "global", usage: "Desktop section heading" },
  { token: "--fs-h3", value: "24px", type: "type", scope: "global", usage: "Desktop card heading" },
  { token: "--fs-h4", value: "18px", type: "type", scope: "global", usage: "Desktop subheading" },
  { token: "--fs-body", value: "16px", type: "type", scope: "global", usage: "Body text" },
  { token: "--fs-sm", value: "14px", type: "type", scope: "global", usage: "Small labels" },
  { token: "--fs-xs", value: "12px", type: "type", scope: "global", usage: "Tiny helper copy" },
  { token: "--hm-space-3xs", value: "4px", type: "spacing", scope: "global", usage: "Micro gap" },
  { token: "--hm-space-2xs", value: "8px", type: "spacing", scope: "global", usage: "Tight gap" },
  { token: "--hm-space-xs", value: "12px", type: "spacing", scope: "global", usage: "Compact padding" },
  { token: "--hm-space-sm", value: "16px", type: "spacing", scope: "global", usage: "Default small spacing" },
  { token: "--hm-space-md", value: "24px", type: "spacing", scope: "global", usage: "Default component spacing" },
  { token: "--hm-space-lg", value: "32px", type: "spacing", scope: "global", usage: "Large block spacing" },
  { token: "--hm-space-xl", value: "48px", type: "spacing", scope: "global", usage: "Large section spacing" },
  { token: "--hm-space-2xl", value: "64px", type: "spacing", scope: "global", usage: "Major section gap" },
  { token: "--hm-space-3xl", value: "80px", type: "spacing", scope: "global", usage: "Large layout breathing room" },
  { token: "--hm-radius-sm", value: "8px", type: "radius", scope: "global", usage: "Small control radius" },
  { token: "--hm-radius-md", value: "12px", type: "radius", scope: "global", usage: "Default card and input radius" },
  { token: "--hm-radius-lg", value: "16px", type: "radius", scope: "global", usage: "Large panel radius" },
  { token: "--hm-radius-pill", value: "999px", type: "radius", scope: "global", usage: "Badge and pill radius" },
  { token: "--hm-radius-button", value: "200px", type: "radius", scope: "global", usage: "Button pill radius" },
  { token: "--shadow-sm", value: "0 2px 8px rgba(0, 0, 0, 0.06)", type: "shadow", scope: "global", usage: "Light card lift" },
  { token: "--shadow-md", value: "0 10px 20px rgba(0, 0, 0, 0.12)", type: "shadow", scope: "global", usage: "Medium elevation" },
  { token: "--shadow-lg", value: "0 10px 40px rgba(0, 0, 0, 0.12)", type: "shadow", scope: "global", usage: "Large panel shadow" },
  { token: "--shadow-xl", value: "0 40px 80px rgba(0, 0, 0, 0.25)", type: "shadow", scope: "global", usage: "High elevation" },
  { token: "--shadow-card-hover", value: "0 16px 32px rgba(0, 0, 0, 0.16)", type: "shadow", scope: "global", usage: "Project card hover" },
  { token: "--hm-duration-fast", value: "180ms", type: "motion", scope: "global", usage: "Hover and micro-state" },
  { token: "--hm-duration-base", value: "260ms", type: "motion", scope: "global", usage: "Default transition timing" },
  { token: "--hm-duration-slow", value: "420ms", type: "motion", scope: "global", usage: "Longer interface transitions" },
  { token: "--hm-ease-out", value: "cubic-bezier(0.22, 1, 0.36, 1)", type: "motion", scope: "global", usage: "Calm exit and settle easing" },
  { token: "--hm-container", value: "1440px", type: "layout", scope: "global", usage: "Default content container width" },
  { token: "--hm-container-wide", value: "1920px", type: "layout", scope: "global", usage: "Wide content container width" },
  { token: "--hm-grid-gutter", value: "24px", type: "layout", scope: "global", usage: "Standard grid gutter" },
] satisfies DesignSystemTokenRow[];
