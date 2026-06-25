import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import DesignSystemPlayground from "../../components/DesignSystemPlayground";
import { Link } from "../../i18n/navigation";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import { designPrinciples } from "../../lib/design-system-data";
import enMessages from "../../i18n/dictionaries/en";
import zhMessages from "../../i18n/dictionaries/zh-TW";

type Messages = typeof enMessages;

type TokenReferenceRow = {
  token: string;
  value: string;
  type: string;
  scope: string;
  usage: string;
  filter: string;
};

type ColorSwatch = {
  token: string;
  value: string;
  usage: string;
  swatchClass?: string;
};

type TokenGroup = {
  id: string;
  title: string;
  description: string;
  columns: string[];
  rows: string[][];
};

const messageMap: Record<Locale, Messages> = {
  en: enMessages,
  "zh-TW": zhMessages,
};

function getMessages(locale: Locale) {
  return messageMap[locale].designSystem;
}

const colorGroups: Record<Locale, Array<{ id: string; title: string; items: ColorSwatch[] }>> = {
  en: [
    {
      id: "purple",
      title: "Purple",
      items: [
        { token: "--hm-purple", value: "#5d62d8", usage: "Primary CTA and active signal", swatchClass: "is-purple" },
        { token: "--hm-purple-hover", value: "#4f54c9", usage: "Hover state for primary CTA", swatchClass: "is-purple-hover" },
        { token: "--hm-purple-soft", value: "#dbdcff", usage: "Focus ring and soft highlight", swatchClass: "is-purple-soft" },
        { token: "--hm-purple-light", value: "#f0f1ff", usage: "Light hover surfaces and subtle fills", swatchClass: "is-purple-light" },
      ],
    },
    {
      id: "neutral",
      title: "Neutrals",
      items: [
        { token: "--hm-paper", value: "#ffffff", usage: "Page and card background", swatchClass: "is-paper" },
        { token: "--hm-surface", value: "#f9f9f9", usage: "Input, tab, and soft surface background", swatchClass: "is-surface" },
        { token: "--hm-ink", value: "#343434", usage: "Primary text and strong UI copy", swatchClass: "is-ink" },
        { token: "--hm-muted", value: "#8e8e9c", usage: "Secondary button text and placeholder", swatchClass: "is-muted" },
        { token: "--hm-line", value: "rgba(0, 0, 0, 0.08)", usage: "Light border and divider", swatchClass: "is-line" },
        { token: "--hm-line-strong", value: "rgba(0, 0, 0, 0.16)", usage: "Outline border for secondary surfaces", swatchClass: "is-line-strong" },
      ],
    },
    {
      id: "text",
      title: "Semantic text",
      items: [
        { token: "--text-heading", value: "#1a1a1a", usage: "Headings and section titles", swatchClass: "is-text-heading" },
        { token: "--text-body", value: "#1f2933", usage: "Body copy", swatchClass: "is-text-body" },
        { token: "--text-secondary", value: "#5d6674", usage: "Descriptions and supportive labels", swatchClass: "is-text-secondary" },
        { token: "--text-muted", value: "#8e8e9c", usage: "Lowest-emphasis text", swatchClass: "is-text-muted" },
      ],
    },
    {
      id: "accent",
      title: "Accent",
      items: [
        { token: "--hm-blue", value: "#416484", usage: "Calmer secondary emphasis", swatchClass: "is-blue" },
        { token: "--hm-green", value: "#477a6b", usage: "Positive and semantic success tone", swatchClass: "is-green" },
        { token: "--hm-peach", value: "#a83b1e", usage: "Warm highlight for selected project tone", swatchClass: "is-peach" },
        { token: "--hm-brown", value: "#705650", usage: "Muted earthy project tone", swatchClass: "is-brown" },
      ],
    },
    {
      id: "project-tone",
      title: "Project tone",
      items: [
        { token: ".tone-advantech --tag-text", value: "#004b85", usage: "Advantech project tag text", swatchClass: "is-advantech-text" },
        { token: ".tone-advantech --tag-bg", value: "#d9f1ff", usage: "Advantech project tag fill", swatchClass: "is-advantech-bg" },
        { token: ".tone-laushu --tag-text", value: "#6b3b14", usage: "Laushu project tag text", swatchClass: "is-laushu-text" },
        { token: ".tone-laushu --tag-bg", value: "#f6e5d8", usage: "Laushu project tag fill", swatchClass: "is-laushu-bg" },
      ],
    },
  ],
  "zh-TW": [
    {
      id: "purple",
      title: "Purple",
      items: [
        { token: "--hm-purple", value: "#5d62d8", usage: "主要 CTA 與 active 訊號", swatchClass: "is-purple" },
        { token: "--hm-purple-hover", value: "#4f54c9", usage: "主要 CTA hover", swatchClass: "is-purple-hover" },
        { token: "--hm-purple-soft", value: "#dbdcff", usage: "focus ring 與柔和 highlight", swatchClass: "is-purple-soft" },
        { token: "--hm-purple-light", value: "#f0f1ff", usage: "極淺 hover 面與淡色底", swatchClass: "is-purple-light" },
      ],
    },
    {
      id: "neutral",
      title: "中性色",
      items: [
        { token: "--hm-paper", value: "#ffffff", usage: "頁面與卡片底色", swatchClass: "is-paper" },
        { token: "--hm-surface", value: "#f9f9f9", usage: "輸入框、tab 與柔和 surface 底色", swatchClass: "is-surface" },
        { token: "--hm-ink", value: "#343434", usage: "主要文字與強層級 UI 文字", swatchClass: "is-ink" },
        { token: "--hm-muted", value: "#8e8e9c", usage: "次要按鈕字色與 placeholder", swatchClass: "is-muted" },
        { token: "--hm-line", value: "rgba(0, 0, 0, 0.08)", usage: "輕邊框與分隔線", swatchClass: "is-line" },
        { token: "--hm-line-strong", value: "rgba(0, 0, 0, 0.16)", usage: "次要描邊與較強分隔", swatchClass: "is-line-strong" },
      ],
    },
    {
      id: "text",
      title: "語意文字",
      items: [
        { token: "--text-heading", value: "#1a1a1a", usage: "頁面大標與區塊標題", swatchClass: "is-text-heading" },
        { token: "--text-body", value: "#1f2933", usage: "內文", swatchClass: "is-text-body" },
        { token: "--text-secondary", value: "#5d6674", usage: "說明文字與輔助 label", swatchClass: "is-text-secondary" },
        { token: "--text-muted", value: "#8e8e9c", usage: "最弱層級文字", swatchClass: "is-text-muted" },
      ],
    },
    {
      id: "accent",
      title: "Accent",
      items: [
        { token: "--hm-blue", value: "#416484", usage: "較沉穩的次重點色", swatchClass: "is-blue" },
        { token: "--hm-green", value: "#477a6b", usage: "正向與 success 語意色", swatchClass: "is-green" },
        { token: "--hm-peach", value: "#a83b1e", usage: "暖色高亮與專案主調", swatchClass: "is-peach" },
        { token: "--hm-brown", value: "#705650", usage: "偏土色的專案 tone", swatchClass: "is-brown" },
      ],
    },
    {
      id: "project-tone",
      title: "Project tone",
      items: [
        { token: ".tone-advantech --tag-text", value: "#004b85", usage: "Advantech 標籤文字", swatchClass: "is-advantech-text" },
        { token: ".tone-advantech --tag-bg", value: "#d9f1ff", usage: "Advantech 標籤底色", swatchClass: "is-advantech-bg" },
        { token: ".tone-laushu --tag-text", value: "#6b3b14", usage: "Laushu 標籤文字", swatchClass: "is-laushu-text" },
        { token: ".tone-laushu --tag-bg", value: "#f6e5d8", usage: "Laushu 標籤底色", swatchClass: "is-laushu-bg" },
      ],
    },
  ],
};

const spacingVisuals = [4, 8, 12, 16, 24, 32, 40, 48, 64, 80] as const;

const tokenReferenceRows: TokenReferenceRow[] = [
  { token: "--hm-purple-50", value: "#f0f1ff", type: "color", scope: "global", usage: "Light purple surface", filter: "color" },
  { token: "--hm-purple-100", value: "#dbdcff", type: "color", scope: "global", usage: "Soft purple background", filter: "color" },
  { token: "--hm-purple-200", value: "#c1c3ff", type: "color", scope: "global", usage: "Purple scale step", filter: "color" },
  { token: "--hm-purple-300", value: "#a1a5f5", type: "color", scope: "global", usage: "Purple scale step", filter: "color" },
  { token: "--hm-purple-400", value: "#8085e8", type: "color", scope: "global", usage: "Purple scale step", filter: "color" },
  { token: "--hm-purple-500", value: "#696edf", type: "color", scope: "global", usage: "Purple scale step", filter: "color" },
  { token: "--hm-purple-600", value: "#5d62d8", type: "color", scope: "global", usage: "Brand purple base", filter: "color" },
  { token: "--hm-purple-700", value: "#4f54c9", type: "color", scope: "global", usage: "Purple hover tone", filter: "color" },
  { token: "--hm-purple-800", value: "#4145a6", type: "color", scope: "global", usage: "Purple dark step", filter: "color" },
  { token: "--hm-purple-900", value: "#363986", type: "color", scope: "global", usage: "Purple darkest step", filter: "color" },
  { token: "--hm-blue-50", value: "#f2f6f9", type: "color", scope: "global", usage: "Blue scale lightest", filter: "color" },
  { token: "--hm-blue-100", value: "#dce5ed", type: "color", scope: "global", usage: "Blue soft background", filter: "color" },
  { token: "--hm-blue-200", value: "#bfd0de", type: "color", scope: "global", usage: "Blue scale step", filter: "color" },
  { token: "--hm-blue-300", value: "#96b2c8", type: "color", scope: "global", usage: "Blue scale step", filter: "color" },
  { token: "--hm-blue-400", value: "#6d91ae", type: "color", scope: "global", usage: "Blue scale step", filter: "color" },
  { token: "--hm-blue-500", value: "#527692", type: "color", scope: "global", usage: "Blue scale step", filter: "color" },
  { token: "--hm-blue-600", value: "#416484", type: "color", scope: "global", usage: "Blue accent base", filter: "color" },
  { token: "--hm-blue-700", value: "#36516b", type: "color", scope: "global", usage: "Blue dark step", filter: "color" },
  { token: "--hm-blue-800", value: "#304657", type: "color", scope: "global", usage: "Blue dark step", filter: "color" },
  { token: "--hm-blue-900", value: "#2b3b49", type: "color", scope: "global", usage: "Blue darkest step", filter: "color" },
  { token: "--hm-green-50", value: "#f1f8f5", type: "color", scope: "global", usage: "Green scale lightest", filter: "color" },
  { token: "--hm-green-100", value: "#d6ebe3", type: "color", scope: "global", usage: "Green soft background", filter: "color" },
  { token: "--hm-green-200", value: "#b0d7c8", type: "color", scope: "global", usage: "Green scale step", filter: "color" },
  { token: "--hm-green-300", value: "#83bba7", type: "color", scope: "global", usage: "Green scale step", filter: "color" },
  { token: "--hm-green-400", value: "#5f9a86", type: "color", scope: "global", usage: "Green scale step", filter: "color" },
  { token: "--hm-green-500", value: "#477a6b", type: "color", scope: "global", usage: "Green accent base", filter: "color" },
  { token: "--hm-green-600", value: "#396458", type: "color", scope: "global", usage: "Green dark step", filter: "color" },
  { token: "--hm-green-700", value: "#315047", type: "color", scope: "global", usage: "Green dark step", filter: "color" },
  { token: "--hm-green-800", value: "#2a413a", type: "color", scope: "global", usage: "Green dark step", filter: "color" },
  { token: "--hm-green-900", value: "#243631", type: "color", scope: "global", usage: "Green darkest step", filter: "color" },
  { token: "--hm-peach-50", value: "#fff6f3", type: "color", scope: "global", usage: "Peach scale lightest", filter: "color" },
  { token: "--hm-peach-100", value: "#fce8e2", type: "color", scope: "global", usage: "Peach soft background", filter: "color" },
  { token: "--hm-peach-200", value: "#f8cfc4", type: "color", scope: "global", usage: "Peach scale step", filter: "color" },
  { token: "--hm-peach-300", value: "#efa995", type: "color", scope: "global", usage: "Peach scale step", filter: "color" },
  { token: "--hm-peach-400", value: "#df795c", type: "color", scope: "global", usage: "Peach scale step", filter: "color" },
  { token: "--hm-peach-500", value: "#c75637", type: "color", scope: "global", usage: "Peach scale step", filter: "color" },
  { token: "--hm-peach-600", value: "#a83b1e", type: "color", scope: "global", usage: "Peach accent base", filter: "color" },
  { token: "--hm-peach-700", value: "#8c301a", type: "color", scope: "global", usage: "Peach dark step", filter: "color" },
  { token: "--hm-peach-800", value: "#742a1b", type: "color", scope: "global", usage: "Peach dark step", filter: "color" },
  { token: "--hm-peach-900", value: "#622719", type: "color", scope: "global", usage: "Peach darkest step", filter: "color" },
  { token: "--hm-brown-50", value: "#f8f6f5", type: "color", scope: "global", usage: "Brown scale lightest", filter: "color" },
  { token: "--hm-brown-100", value: "#e8e2e0", type: "color", scope: "global", usage: "Brown soft background", filter: "color" },
  { token: "--hm-brown-200", value: "#d5c9c5", type: "color", scope: "global", usage: "Brown scale step", filter: "color" },
  { token: "--hm-brown-300", value: "#bba9a3", type: "color", scope: "global", usage: "Brown scale step", filter: "color" },
  { token: "--hm-brown-400", value: "#9c847c", type: "color", scope: "global", usage: "Brown scale step", filter: "color" },
  { token: "--hm-brown-500", value: "#826960", type: "color", scope: "global", usage: "Brown scale step", filter: "color" },
  { token: "--hm-brown-600", value: "#705650", type: "color", scope: "global", usage: "Brown accent base", filter: "color" },
  { token: "--hm-brown-700", value: "#5d4743", type: "color", scope: "global", usage: "Brown dark step", filter: "color" },
  { token: "--hm-brown-800", value: "#4d3c39", type: "color", scope: "global", usage: "Brown dark step", filter: "color" },
  { token: "--hm-brown-900", value: "#413432", type: "color", scope: "global", usage: "Brown darkest step", filter: "color" },
  { token: "--hm-paper", value: "#ffffff", type: "color", scope: "global", usage: "Page background", filter: "color" },
  { token: "--hm-surface", value: "#f9f9f9", type: "color", scope: "global", usage: "Surface background", filter: "color" },
  { token: "--hm-ink", value: "#343434", type: "color", scope: "global", usage: "Primary text", filter: "color" },
  { token: "--hm-ink-hover", value: "#555555", type: "color", scope: "global", usage: "Strong hover text", filter: "color" },
  { token: "--hm-muted", value: "#8e8e9c", type: "color", scope: "global", usage: "Muted text", filter: "color" },
  { token: "--hm-line", value: "rgba(0, 0, 0, 0.08)", type: "color", scope: "global", usage: "Default line", filter: "color" },
  { token: "--hm-line-strong", value: "rgba(0, 0, 0, 0.16)", type: "color", scope: "global", usage: "Strong line", filter: "color" },
  { token: "--hm-disabled", value: "#dedee4", type: "color", scope: "global", usage: "Disabled fill", filter: "color" },
  { token: "--hm-purple", value: "var(--hm-purple-600)", type: "color", scope: "global", usage: "Brand CTA alias", filter: "color" },
  { token: "--hm-purple-hover", value: "var(--hm-purple-700)", type: "color", scope: "global", usage: "Brand CTA hover alias", filter: "color" },
  { token: "--hm-purple-soft", value: "var(--hm-purple-100)", type: "color", scope: "global", usage: "Brand soft alias", filter: "color" },
  { token: "--hm-purple-light", value: "var(--hm-purple-50)", type: "color", scope: "global", usage: "Brand light alias", filter: "color" },
  { token: "--hm-blue", value: "var(--hm-blue-600)", type: "color", scope: "global", usage: "Blue accent alias", filter: "color" },
  { token: "--hm-blue-soft", value: "var(--hm-blue-100)", type: "color", scope: "global", usage: "Blue soft alias", filter: "color" },
  { token: "--hm-brown", value: "var(--hm-brown-600)", type: "color", scope: "global", usage: "Brown accent alias", filter: "color" },
  { token: "--hm-brown-soft", value: "var(--hm-brown-100)", type: "color", scope: "global", usage: "Brown soft alias", filter: "color" },
  { token: "--hm-green", value: "var(--hm-green-500)", type: "color", scope: "global", usage: "Green accent alias", filter: "color" },
  { token: "--hm-green-soft", value: "var(--hm-green-100)", type: "color", scope: "global", usage: "Green soft alias", filter: "color" },
  { token: "--hm-peach", value: "var(--hm-peach-600)", type: "color", scope: "global", usage: "Peach accent alias", filter: "color" },
  { token: "--hm-peach-soft", value: "var(--hm-peach-100)", type: "color", scope: "global", usage: "Peach soft alias", filter: "color" },
  { token: "--hm-success", value: "#477a6b", type: "color", scope: "global", usage: "Success state", filter: "color" },
  { token: "--hm-success-soft", value: "#d6ebe3", type: "color", scope: "global", usage: "Success soft background", filter: "color" },
  { token: "--hm-warning", value: "#9b6b00", type: "color", scope: "global", usage: "Warning state", filter: "color" },
  { token: "--hm-warning-soft", value: "#fef3c7", type: "color", scope: "global", usage: "Warning soft background", filter: "color" },
  { token: "--hm-error", value: "#b91c1c", type: "color", scope: "global", usage: "Error state", filter: "color" },
  { token: "--hm-error-hover", value: "#991b1b", type: "color", scope: "global", usage: "Error hover state", filter: "color" },
  { token: "--hm-error-soft", value: "#fee2e2", type: "color", scope: "global", usage: "Error soft background", filter: "color" },
  { token: "--hm-info", value: "#1d4ed8", type: "color", scope: "global", usage: "Info state", filter: "color" },
  { token: "--hm-info-soft", value: "#dbeafe", type: "color", scope: "global", usage: "Info soft background", filter: "color" },
  { token: "--cs-accent", value: "theme mapped", type: "color", scope: "case-study", usage: "Case study primary accent", filter: "color" },
  { token: "--cs-accent-soft", value: "theme mapped", type: "color", scope: "case-study", usage: "Case study soft accent surface", filter: "color" },
  { token: "--cs-surface / --cs-surface-soft", value: "theme mapped", type: "color", scope: "case-study", usage: "Case study page and soft surfaces", filter: "color" },
  { token: "--cs-line / --cs-line-strong", value: "theme mapped", type: "color", scope: "case-study", usage: "Case study borders and dividers", filter: "color" },
  { token: "--cs-text-heading / body / muted", value: "theme mapped", type: "color", scope: "case-study", usage: "Case study semantic text", filter: "color" },
  { token: "--hm-duration-fast", value: "180ms", type: "motion", scope: "global", usage: "Fast hover and micro-state", filter: "motion" },
  { token: "--hm-duration-base", value: "260ms", type: "motion", scope: "global", usage: "Default transition timing", filter: "motion" },
  { token: "--hm-duration-slow", value: "420ms", type: "motion", scope: "global", usage: "Longer interface transitions", filter: "motion" },
  { token: "--hm-duration-enter", value: "600ms", type: "motion", scope: "global", usage: "Entry animation timing", filter: "motion" },
  { token: "--hm-duration-reveal", value: "950ms", type: "motion", scope: "global", usage: "Reveal motion timing", filter: "motion" },
  { token: "--hm-ease-standard", value: "ease", type: "motion", scope: "global", usage: "Basic transition easing", filter: "motion" },
  { token: "--hm-ease-out", value: "cubic-bezier(0.22, 1, 0.36, 1)", type: "motion", scope: "global", usage: "Calm exit and settle easing", filter: "motion" },
  { token: "--hm-ease-emphasized", value: "cubic-bezier(0.215, 0.61, 0.355, 1)", type: "motion", scope: "global", usage: "Emphasized entrance easing", filter: "motion" },
  { token: "--hm-space-3xs", value: "4px", type: "spacing", scope: "global", usage: "Micro gap and compact UI spacing", filter: "spacing" },
  { token: "--hm-space-2xs", value: "8px", type: "spacing", scope: "global", usage: "Tight gap and small list spacing", filter: "spacing" },
  { token: "--hm-space-xs", value: "12px", type: "spacing", scope: "global", usage: "Compact component padding", filter: "spacing" },
  { token: "--hm-space-sm", value: "16px", type: "spacing", scope: "global", usage: "Default small spacing", filter: "spacing" },
  { token: "--hm-space-md", value: "24px", type: "spacing", scope: "global", usage: "Default section-internal spacing", filter: "spacing" },
  { token: "--hm-space-lg", value: "32px", type: "spacing", scope: "global", usage: "Card and section spacing", filter: "spacing" },
  { token: "--hm-space-xl", value: "48px", type: "spacing", scope: "global", usage: "Large section spacing", filter: "spacing" },
  { token: "--hm-space-2xl", value: "64px", type: "spacing", scope: "global", usage: "Major section gap", filter: "spacing" },
  { token: "--hm-space-3xl", value: "80px", type: "spacing", scope: "global", usage: "Large layout breathing room", filter: "spacing" },
  { token: "--hm-radius-sm", value: "8px", type: "radius", scope: "global", usage: "Small control radius", filter: "radius" },
  { token: "--hm-radius-md", value: "12px", type: "radius", scope: "global", usage: "Default card and input radius", filter: "radius" },
  { token: "--hm-radius-lg", value: "16px", type: "radius", scope: "global", usage: "Large panel radius", filter: "radius" },
  { token: "--hm-radius-pill", value: "999px", type: "radius", scope: "global", usage: "Badge and pill radius", filter: "radius" },
  { token: "--hm-radius-button", value: "200px", type: "radius", scope: "global", usage: "Button-specific pill radius", filter: "radius" },
  { token: "--hm-container", value: "1440px", type: "layout", scope: "global", usage: "Default content container width", filter: "layout" },
  { token: "--hm-container-wide", value: "1920px", type: "layout", scope: "global", usage: "Wide content container width", filter: "layout" },
  { token: "--hm-grid-gutter", value: "24px", type: "layout", scope: "global", usage: "Standard grid gutter", filter: "layout" },
  { token: "--hm-grid-gutter-lg", value: "32px", type: "layout", scope: "global", usage: "Large grid gutter", filter: "layout" },
  { token: "--hm-z-base", value: "0", type: "layout", scope: "global", usage: "Base stacking layer", filter: "layout" },
  { token: "--hm-z-sticky", value: "10", type: "layout", scope: "global", usage: "Sticky elements", filter: "layout" },
  { token: "--hm-z-navbar", value: "100", type: "layout", scope: "global", usage: "Navbar layer", filter: "layout" },
  { token: "--hm-z-overlay", value: "200", type: "layout", scope: "global", usage: "Overlay layer", filter: "layout" },
  { token: "--hm-z-modal", value: "300", type: "layout", scope: "global", usage: "Modal layer", filter: "layout" },
  { token: "--hm-z-toast", value: "400", type: "layout", scope: "global", usage: "Toast layer", filter: "layout" },
  { token: "--hm-bp-mobile", value: "768px", type: "layout", scope: "docs-only", usage: "Mobile breakpoint reference", filter: "layout" },
  { token: "--hm-bp-tablet", value: "1024px", type: "layout", scope: "docs-only", usage: "Tablet breakpoint reference", filter: "layout" },
  { token: "--hm-bp-desktop", value: "1440px", type: "layout", scope: "docs-only", usage: "Desktop breakpoint reference", filter: "layout" },
  { token: "--hm-chart-1", value: "#416484", type: "color", scope: "global", usage: "Chart palette 1", filter: "color" },
  { token: "--hm-chart-2", value: "#477a6b", type: "color", scope: "global", usage: "Chart palette 2", filter: "color" },
  { token: "--hm-chart-3", value: "#a83b1e", type: "color", scope: "global", usage: "Chart palette 3", filter: "color" },
  { token: "--hm-chart-4", value: "#705650", type: "color", scope: "global", usage: "Chart palette 4", filter: "color" },
  { token: "--hm-chart-5", value: "#7c3aed", type: "color", scope: "global", usage: "Chart palette 5", filter: "color" },
  { token: "--hm-chart-6", value: "#0f766e", type: "color", scope: "global", usage: "Chart palette 6", filter: "color" },
  { token: "--fs-h1", value: "32px / 24px / 22px", type: "type", scope: "global", usage: "Page main heading", filter: "type" },
  { token: "--fs-h2", value: "28px / 22px / 20px", type: "type", scope: "global", usage: "Section heading", filter: "type" },
  { token: "--fs-h3", value: "24px / 18px / 16px", type: "type", scope: "global", usage: "Card heading", filter: "type" },
  { token: "--fs-h4", value: "18px / 16px / 14px", type: "type", scope: "global", usage: "Subheading", filter: "type" },
  { token: "--fs-body", value: "16px", type: "type", scope: "global", usage: "Body text", filter: "type" },
  { token: "--fs-sm", value: "14px", type: "type", scope: "global", usage: "Small labels", filter: "type" },
  { token: "--fs-xs", value: "12px", type: "type", scope: "global", usage: "Tiny helper copy", filter: "type" },
  { token: "--shadow-sm", value: "0 2px 8px rgba(0, 0, 0, 0.06)", type: "shadow", scope: "global", usage: "Light card lift", filter: "shadow" },
  { token: "--shadow-md", value: "0 10px 20px rgba(0, 0, 0, 0.12)", type: "shadow", scope: "global", usage: "Medium elevation", filter: "shadow" },
  { token: "--shadow-lg", value: "0 10px 40px rgba(0, 0, 0, 0.12)", type: "shadow", scope: "global", usage: "Large panel shadow", filter: "shadow" },
  { token: "--shadow-xl", value: "0 40px 80px rgba(0, 0, 0, 0.25)", type: "shadow", scope: "global", usage: "Very high elevation", filter: "shadow" },
  { token: "--shadow-card-hover", value: "0 16px 32px rgba(0, 0, 0, 0.16)", type: "shadow", scope: "global", usage: "Project card hover", filter: "shadow" },
];

const tokenFilters = {
  en: [
    { value: "all", label: "All" },
    { value: "color", label: "Color" },
    { value: "type", label: "Type" },
    { value: "spacing", label: "Spacing" },
    { value: "radius", label: "Radius" },
    { value: "shadow", label: "Shadow" },
    { value: "motion", label: "Motion" },
    { value: "layout", label: "Layout" },
  ],
  "zh-TW": [
    { value: "all", label: "全部" },
    { value: "color", label: "Color" },
    { value: "type", label: "Type" },
    { value: "spacing", label: "Spacing" },
    { value: "radius", label: "Radius" },
    { value: "shadow", label: "Shadow" },
    { value: "motion", label: "Motion" },
    { value: "layout", label: "Layout" },
  ],
} satisfies Record<Locale, Array<{ value: string; label: string }>>;

const foundationGroups: Record<Locale, TokenGroup[]> = {
  en: [
    {
      id: "color",
      title: "Color tokens",
      description: "Real portfolio color tokens and semantic aliases from tokens.css.",
      columns: ["Token", "Value", "Usage"],
      rows: [
        ["--hm-purple", "var(--hm-purple-600)", "Primary CTA"],
        ["--hm-paper / --hm-surface", "#fff / #f9f9f9", "Page and soft surface"],
        ["--text-heading / body / secondary", "semantic text", "Type hierarchy"],
        ["--hm-success / warning / error / info", "semantic states", "System feedback"],
      ],
    },
    {
      id: "spacing",
      title: "Spacing and rhythm",
      description: "T-shirt spacing tokens plus the exceptions documented in design-system.md.",
      columns: ["Token", "Value", "Usage"],
      rows: [
        ["--hm-space-sm", "16px", "Compact section spacing"],
        ["--hm-space-md", "24px", "Default card spacing"],
        ["--hm-space-lg", "32px", "Large block spacing"],
        ["--hm-space-3xl", "80px", "Major breathing room"],
      ],
    },
    {
      id: "motion",
      title: "Motion and elevation",
      description: "Motion, radius, and shadow tokens that shape the tactile feeling of the interface.",
      columns: ["Category", "Token", "Usage"],
      rows: [
        ["Radius", "--hm-radius-button", "Primary button pill"],
        ["Shadow", "--shadow-card-hover", "Project card hover"],
        ["Duration", "--hm-duration-base", "Default transition"],
        ["Easing", "--hm-ease-out", "Settle and hover easing"],
      ],
    },
  ],
  "zh-TW": [
    {
      id: "color",
      title: "色彩 tokens",
      description: "來自 tokens.css 的真實作品集色票與語意別名。",
      columns: ["Token", "值", "用途"],
      rows: [
        ["--hm-purple", "var(--hm-purple-600)", "主要 CTA"],
        ["--hm-paper / --hm-surface", "#fff / #f9f9f9", "頁面與柔和 surface"],
        ["--text-heading / body / secondary", "語意文字", "閱讀層級"],
        ["--hm-success / warning / error / info", "狀態色", "系統回饋"],
      ],
    },
    {
      id: "spacing",
      title: "間距與節奏",
      description: "以 T-shirt 間距 token 為主，搭配文件裡定義的少數例外。",
      columns: ["Token", "值", "用途"],
      rows: [
        ["--hm-space-sm", "16px", "緊湊區塊間距"],
        ["--hm-space-md", "24px", "預設卡片內距"],
        ["--hm-space-lg", "32px", "大型 block 間距"],
        ["--hm-space-3xl", "80px", "大段留白"],
      ],
    },
    {
      id: "motion",
      title: "動效與立體感",
      description: "塑造介面手感的 motion、radius 與 shadow token。",
      columns: ["類別", "Token", "用途"],
      rows: [
        ["Radius", "--hm-radius-button", "主要按鈕膠囊圓角"],
        ["Shadow", "--shadow-card-hover", "專案卡 hover"],
        ["Duration", "--hm-duration-base", "預設 transition"],
        ["Easing", "--hm-ease-out", "hover 與 settle easing"],
      ],
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;

  return createLocalizedMetadata(locale, "/design-system", {
    en: {
      title: "Design System",
      description:
        "Explore the design system behind Brian Huang's portfolio, from principles and foundations to live components and the full token reference.",
    },
    "zh-TW": {
      title: "設計系統",
      description:
        "探索黃宣銘 Brian Huang 作品集背後的設計系統，從設計原則、foundation 到 live 元件與完整 token reference。",
    },
  });
}

export default async function DesignSystemPage() {
  const locale = (await getLocale()) as Locale;
  const copy = getMessages(locale);
  const colorSections = colorGroups[locale];
  const tokenGroupRows = foundationGroups[locale];
  const tokenFilterOptions = tokenFilters[locale];

  return (
    <main className="ds-page">
      <Navbar />

      <section className="ds-hero" aria-labelledby="ds-title">
        <div className="ds-shell ds-hero-inner">
          <div className="ds-hero-copy">
            <p className="ds-eyebrow">{copy.hero.eyebrow}</p>
            <h1 id="ds-title">{copy.hero.title}</h1>
            <p className="ds-hero-description">{copy.hero.description}</p>
            <div className="ds-hero-actions">
              <a className="ds-anchor-link" href="#getting-started">
                {copy.hero.primaryAction}
              </a>
              <a className="ds-anchor-link is-secondary" href="#tokens">
                {copy.hero.secondaryAction}
              </a>
            </div>
          </div>
          <div className="ds-stats-grid" aria-label={copy.hero.statsAriaLabel}>
            {copy.hero.stats.map((stat) => (
              <article key={stat.label} className="ds-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="ds-shell ds-layout">
        <aside className="ds-toc" aria-label={copy.toc.ariaLabel}>
          <p>{copy.toc.title}</p>
          <nav>
            {copy.toc.items.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="ds-content">
          <section className="ds-section" id="getting-started">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.introduction.heading}</h2>
              <span />
            </div>
            <div className="ds-intro-grid">
              <article className="ds-soul-card">
                <h3>{copy.introduction.soulTitle}</h3>
                <p>{copy.introduction.soulBody}</p>
                <div className="ds-keyword-row" aria-label={copy.introduction.keywordsAriaLabel}>
                  {copy.introduction.keywords.map((keyword) => (
                    <span key={keyword}>{keyword}</span>
                  ))}
                </div>
              </article>
              <article className="ds-architecture-card">
                <h3>{copy.introduction.architectureTitle}</h3>
                <p>{copy.introduction.architectureBody}</p>
                <div className="ds-architecture-split">
                  {copy.introduction.architectureCards.map((card) => (
                    <section key={card.title} className="ds-architecture-pane">
                      <p className="ds-pane-kicker">{card.kicker}</p>
                      <h4>{card.title}</h4>
                      <p>{card.body}</p>
                    </section>
                  ))}
                </div>
              </article>
            </div>
            <div className="ds-principles-grid">
              {designPrinciples.map((principle, index) => {
                const [english, chinese] = principle.split(" / ");
                return (
                  <article key={principle} className="ds-principle-card">
                    <p className="ds-principle-index">0{index + 1}</p>
                    <h3>{english}</h3>
                    <p>{chinese}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="ds-section" id="colors">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.colors.heading}</h2>
              <span />
            </div>
            <div className="ds-color-groups">
              {colorSections.map((group) => (
                <section key={group.id} className="ds-color-group-card">
                  <div className="ds-color-group-head">
                    <h3>{group.title}</h3>
                  </div>
                  <div className="ds-color-grid">
                    {group.items.map((item) => (
                      <article key={item.token} className="ds-color-card">
                        <div className={`ds-color-swatch ${item.swatchClass ?? ""}`} aria-hidden="true" />
                        <div className="ds-color-meta">
                          <strong>{item.token}</strong>
                          <span>{item.value}</span>
                          <p>{item.usage}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <div className="ds-rules-grid">
              {copy.colors.rules.map((rule) => (
                <article key={rule.title} className={`ds-rule-card ${rule.tone === "do" ? "is-do" : "is-dont"}`}>
                  <p className="ds-rule-badge">{rule.badge}</p>
                  <h3>{rule.title}</h3>
                  <p>{rule.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="ds-section" id="typography">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.typography.heading}</h2>
              <span />
            </div>
            <div className="ds-type-stack">
              {copy.typography.scale.map((item) => (
                <article key={item.token} className="ds-type-row">
                  <div>
                    <p className={`ds-type-sample ${item.className}`}>{item.sample}</p>
                    <div className="ds-type-meta">
                      <strong>{item.token}</strong>
                      <span>{item.desktop}</span>
                      <span>{item.mobile}</span>
                    </div>
                  </div>
                  <p className="ds-type-note">{item.usage}</p>
                </article>
              ))}
            </div>
            <div className="ds-spec-grid">
              <article className="ds-spec-card">
                <h3>{copy.typography.weightTitle}</h3>
                <div className="ds-weight-list">
                  {copy.typography.weights.map((item) => (
                    <div key={item.label} className="ds-weight-row">
                      <strong style={{ fontWeight: item.weight }}>{item.label}</strong>
                      <span>{item.usage}</span>
                    </div>
                  ))}
                </div>
              </article>
              <article className="ds-spec-card">
                <h3>{copy.typography.lineHeightTitle}</h3>
                <div className="ds-weight-list">
                  {copy.typography.lineHeights.map((item) => (
                    <div key={item.label} className="ds-weight-row">
                      <strong>{item.label}</strong>
                      <span>{item.usage}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section className="ds-section" id="spacing">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.spacing.heading}</h2>
              <span />
            </div>
            <div className="ds-spec-grid">
              <article className="ds-spec-card">
                <h3>{copy.spacing.tokenTitle}</h3>
                <div className="ds-spacing-token-list">
                  {copy.spacing.tokens.map((item) => (
                    <div key={item.token} className="ds-spacing-token-row">
                      <strong>{item.token}</strong>
                      <span>{item.value}</span>
                      <p>{item.usage}</p>
                    </div>
                  ))}
                </div>
              </article>
              <article className="ds-spec-card">
                <h3>{copy.spacing.visualTitle}</h3>
                <div className="ds-spacing-visuals">
                  {spacingVisuals.map((value) => (
                    <div key={value} className="ds-spacing-bar-row">
                      <span>{value}px</span>
                      <div className="ds-spacing-bar-track">
                        <div className="ds-spacing-bar-fill" style={{ width: `${Math.max(value, 4)}px` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
            <div className="ds-context-table-wrap">
              <table className="ds-context-table">
                <thead>
                  <tr>
                    {copy.spacing.contextColumns.map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.spacing.contextRows.map((row) => (
                    <tr key={row.context}>
                      <td>{row.context}</td>
                      <td>{row.token}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <article className="ds-note-card">
              <h3>{copy.spacing.exceptionTitle}</h3>
              <p>{copy.spacing.exceptionBody}</p>
            </article>
          </section>

          <section className="ds-section" id="radius">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.radius.heading}</h2>
              <span />
            </div>
            <div className="ds-radius-grid">
              {copy.radius.items.map((item) => (
                <article key={item.token} className="ds-radius-card">
                  <div className={`ds-radius-demo ${item.className}`} aria-hidden="true" />
                  <strong>{item.token}</strong>
                  <span>{item.value}</span>
                  <p>{item.usage}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="ds-section" id="shadows">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.shadows.heading}</h2>
              <span />
            </div>
            <div className="ds-shadow-grid">
              {copy.shadows.items.map((item) => (
                <article key={item.token} className="ds-shadow-card">
                  <div className={`ds-shadow-demo ${item.className}`} aria-hidden="true" />
                  <strong>{item.token}</strong>
                  <span>{item.value}</span>
                  <p>{item.usage}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="ds-section" id="motion">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.motion.heading}</h2>
              <span />
            </div>
            <div className="ds-spec-grid">
              <article className="ds-spec-card">
                <h3>{copy.motion.durationTitle}</h3>
                <div className="ds-weight-list">
                  {copy.motion.durations.map((item) => (
                    <div key={item.token} className="ds-weight-row">
                      <strong>{item.token}</strong>
                      <span>{item.usage}</span>
                    </div>
                  ))}
                </div>
              </article>
              <article className="ds-spec-card">
                <h3>{copy.motion.easingTitle}</h3>
                <div className="ds-weight-list">
                  {copy.motion.easings.map((item) => (
                    <div key={item.token} className="ds-weight-row">
                      <strong>{item.token}</strong>
                      <span>{item.usage}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
            <div className="ds-motion-demo-grid">
              <article className="ds-motion-card">
                <h3>{copy.motion.demoPrimaryTitle}</h3>
                <button type="button" className="ds-motion-chip">
                  {copy.motion.demoPrimaryLabel}
                </button>
              </article>
              <article className="ds-motion-card">
                <h3>{copy.motion.demoPanelTitle}</h3>
                <div className="ds-motion-panel">
                  <div className="ds-motion-panel-surface">{copy.motion.demoPanelLabel}</div>
                </div>
              </article>
            </div>
          </section>

          <section className="ds-section" id="components">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.components.heading}</h2>
              <span />
            </div>
            <DesignSystemPlayground
              part="components"
              dictionary={copy.playground}
              tokenGroups={tokenGroupRows}
            />
            <div className="ds-inline-actions ds-section-actions">
              <Link className="ds-anchor-link is-secondary" href="/design-system/components/button">
                {locale === "en" ? "Browse component documentation" : "瀏覽完整元件文件"}
              </Link>
            </div>
            <div className="ds-context-table-wrap">
              <table className="ds-context-table">
                <thead>
                  <tr>
                    {copy.components.matrixColumns.map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.components.matrixRows.map((row) => (
                    <tr key={row.component}>
                      <td>{row.component}</td>
                      <td>{row.default}</td>
                      <td>{row.hover}</td>
                      <td>{row.focus}</td>
                      <td>{row.active}</td>
                      <td>{row.disabled}</td>
                      <td>{row.loading}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="ds-section" id="button-tokens">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.buttonTokens.heading}</h2>
              <span />
            </div>
            <div className="ds-button-token-card">
              <div className="ds-button-token-stage">
                <button type="button" className="ds-button-token-demo">
                  {copy.buttonTokens.buttonLabel}
                </button>
              </div>
              <div className="ds-button-token-list">
                {copy.buttonTokens.items.map((item) => (
                  <article key={item.label} className="ds-button-token-row">
                    <strong>{item.label}</strong>
                    <span>{item.token}</span>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="ds-section" id="tokens">
            <div className="ds-section-heading">
              <span />
              <h2>{copy.tokens.heading}</h2>
              <span />
            </div>
            <DesignSystemPlayground
              part="tokens"
              dictionary={copy.playground}
              tokenGroups={tokenGroupRows}
              tokenReferenceRows={tokenReferenceRows}
              tokenReferenceFilters={tokenFilterOptions}
              tokenReferenceTitle={copy.tokens.tableTitle}
              tokenReferenceDescription={copy.tokens.tableDescription}
              tokenReferenceColumns={copy.tokens.columns}
            />
          </section>

          <section className="ds-section ds-cta" id="cta">
            <div>
              <p className="ds-eyebrow">{copy.cta.eyebrow}</p>
              <h2>{copy.cta.title}</h2>
              <p>{copy.cta.body}</p>
            </div>
            <div className="ds-cta-actions">
              <Link className="ds-anchor-link" href="/#projects">
                {copy.cta.primaryAction}
              </Link>
              <Link className="ds-anchor-link is-secondary" href="/contact">
                {copy.cta.secondaryAction}
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
