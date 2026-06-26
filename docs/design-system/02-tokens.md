# 02 — Tokens

> **2026-06-27 source-of-truth rule**: `styles/tokens.css` is the only runtime source of truth. Any YAML / Markdown token index in this documentation is a mirror for humans, AI, and lint tooling. AI agents must not edit documentation tokens as an independent source.


這份文件保存原始 `design-system.md` 的機器可讀 token 索引、token 總清單，以及 `--hm-*` Token v2 遷移規則。

## Token Source of Truth

`styles/tokens.css` 是 runtime design tokens 的唯一真實來源。

本文件中的 YAML 是給 AI / linter 讀取的 documentation mirror / machine-readable index；若與 CSS 不一致，以 CSS 為準，並修正本文件。

修改 token 時必須遵守：

1. 先修改 `styles/tokens.css`。
2. 再同步更新本文件的 YAML mirror 或相關說明。
3. 執行 design system audit。
4. 回報是否有 token / CSS / 文件不一致。

禁止只修改本文件中的 YAML token，卻不修改 CSS token。

> 現階段採用「CSS first」策略。未來若要升級成更完整的 token pipeline，可以改為 `tokens.json` / `tokens.yaml` 作為 source of truth，再自動產生 CSS 與文件。

## TOKENS（機器可讀索引｜對齊 Google `design.md`）

> 這一段是給 AI / linter 解析用的**單一 token 索引**，靈感來自 [google-labs-code/design.md](https://github.com/google-labs-code/design.md) 的 YAML front-matter token 格式。
> **它不是另一套來源**——值 1:1 鏡像 `styles/tokens.css` 的 `--hm-*` 變數（key `purple-600` ↔ `--hm-purple-600`）。真實來源永遠是 CSS；這裡若與 CSS 不一致，以 CSS 為準並回頭修這份索引。
> **繼承寫法**：`{a.b}` 大括號代表「引用另一個 token」，對應 CSS 的 `var(--hm-...)`。繼承鏈跟 code 一樣分三層：**primitive（色階）→ seed/map（語意中介）→ component（元件）**；元件永遠不直接吃 primitive。

```yaml
# ── primitives：色階。元件禁止直接消費，必須透過 semantic / map ──
colors:
  purple-50: "#f0f1ff"
  purple-100: "#dbdcff"
  purple-200: "#c1c3ff"
  purple-300: "#a1a5f5"
  purple-400: "#8085e8"
  purple-500: "#696edf"
  purple-600: "#5d62d8"
  purple-700: "#4f54c9"
  purple-800: "#4145a6"
  purple-900: "#363986"
  peach-50: "#fff6f3"
  peach-100: "#fce8e2"
  peach-200: "#f8cfc4"
  peach-300: "#efa995"
  peach-400: "#df795c"
  peach-500: "#c75637"
  peach-600: "#a83b1e"
  peach-700: "#8c301a"
  peach-800: "#742a1b"
  peach-900: "#622719"
  # semantic 別名（品牌色，可跨頁重用）
  purple: "{colors.purple-600}"        # --hm-purple，CTA / active 唯一強調色
  purple-hover: "{colors.purple-700}"
  purple-soft: "{colors.purple-100}"
  purple-light: "{colors.purple-50}"
  peach: "{colors.peach-600}"
  peach-soft: "{colors.peach-100}"
  # 中性 / 介面
  paper: "#ffffff"                     # 頁面 / 卡片底
  surface: "#f9f9f9"                   # tab、表單欄位、secondary hover 底
  ink: "#343434"                       # 主文字（不用純黑）
  ink-hover: "#555555"
  muted: "#8e8e9c"                     # 次要文字、secondary 按鈕文字
  line: "rgba(0,0,0,0.08)"
  line-strong: "rgba(0,0,0,0.16)"
  disabled: "#dedee4"
  # status（各搭 -soft 背景）
  success: "#477a6b"
  success-soft: "#d6ebe3"
  warning: "#9b6b00"
  warning-soft: "#fef3c7"
  error: "#b91c1c"
  error-hover: "#991b1b"
  error-soft: "#fee2e2"
  info: "#1d4ed8"
  info-soft: "#dbeafe"

typography:
  font-family: "Space Grotesk, system-ui, sans-serif"
  # 字級為響應式 → desktop / tablet(≤1024) / mobile(≤768)
  fs-h1: "32px"   # tablet 24 · mobile 22 ；一般骨架上限，首頁 Hero 主標例外可 48
  fs-h2: "28px"   # 22 · 20
  fs-h3: "24px"   # 18 · 16
  fs-h4: "18px"   # 16 · 14
  fs-body: "16px"
  fs-sm: "14px"
  fs-xs: "12px"
  fw-regular: 400
  fw-medium: 500
  fw-semibold: 600
  fw-bold: 700

space:    # 8px 基準
  3xs: "4px"
  2xs: "8px"
  xs: "12px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "64px"
  3xl: "80px"

radius:
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "999px"
  button: "200px"   # 按鈕專用 pill

shadow:   # 主系統一律黑陰影
  sm: "0 2px 8px rgba(0,0,0,0.06)"
  md: "0 10px 20px rgba(0,0,0,0.12)"
  lg: "0 10px 40px rgba(0,0,0,0.12)"
  xl: "0 40px 80px rgba(0,0,0,0.25)"
  card-hover: "0 16px 32px rgba(0,0,0,0.16)"

layout:
  container: "1440px"        # 核心內容最大寬
  container-wide: "1920px"
  grid-gutter: "24px"
  grid-gutter-lg: "32px"

breakpoint:   # 文件值；JS 單一來源在 lib/breakpoints.ts。CSS var 不能用於 @media
  mobile: "768px"
  tablet: "1024px"
  desktop: "1440px"

motion:
  duration-instant: "100ms"
  duration-fast: "180ms"     # hover / focus / 顏色
  duration-base: "260ms"     # navbar / toast
  duration-card: "360ms"
  duration-image: "420ms"
  duration-slow: "420ms"
  duration-enter: "600ms"
  duration-stagger: "80ms"
  duration-reveal: "950ms"   # 首頁專案卡 reveal
  ease-out: "cubic-bezier(0.22, 1, 0.36, 1)"
  ease-in-out: "cubic-bezier(0.4, 0, 0.2, 1)"
  ease-spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"
  ease-emphasized: "cubic-bezier(0.215, 0.61, 0.355, 1)"

z:
  base: 0
  sticky: 10
  navbar: 100
  overlay: 200
  modal: 300
  toast: 400

# ── seed / map：語意中介層（Google 沒有這層，但這是你 code 真實的繼承橋；保留才對得上 CSS）──
seed:
  color-brand: "{colors.purple-600}"
  radius-base: "{radius.md}"
  font-size-md: "{typography.fs-body}"
  font-weight-semibold: "{typography.fw-semibold}"
  duration-fast: "{motion.duration-fast}"
map:
  color-primary: "{seed.color-brand}"
  color-primary-hover: "{colors.purple-700}"
  color-primary-active: "{colors.purple-800}"
  color-primary-disabled: "{colors.disabled}"
  color-on-primary: "{colors.paper}"
  radius-pill: "{radius.button}"
  height-control-md: "52px"
  height-control-sm: "38px"
  padding-inline-md: "28px"
  padding-inline-sm: "24px"

# ── components：Google 的元件 = 屬性 map，狀態各自一條 entry（-hover / -active / -disabled）──
# 僅收「原子可複用元件」；複合 pattern（Hero 裝飾、Case Study patterns）見散文章節，不適合這個扁平 schema。
# 屬性沿用 Google 詞彙：backgroundColor / textColor / typography / rounded / height / paddingInline；
# border 是本專案擴充（Google 原 schema 沒有）。
components:
  button-primary:           # Button variant="primary"
    backgroundColor: "{map.color-primary}"
    textColor: "{map.color-on-primary}"
    rounded: "{map.radius-pill}"
    height: "{map.height-control-md}"      # tablet 48 · mobile 44
    paddingInline: "{map.padding-inline-md}"
    typography: "{seed.font-size-md} / {seed.font-weight-semibold}"
  button-primary-hover:
    backgroundColor: "{map.color-primary-hover}"
  button-primary-active:
    backgroundColor: "{map.color-primary-active}"
  button-primary-disabled:
    backgroundColor: "{map.color-primary-disabled}"
    textColor: "{map.color-on-primary}"
  button-secondary:         # Button variant="secondary"
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    border: "1px solid {colors.line-strong}"
    rounded: "{map.radius-pill}"
    height: "{map.height-control-md}"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
  input:                    # .form-field input/textarea
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.line}"
    rounded: "{radius.md}"
  input-focus:
    border: "1px solid {colors.purple}"
  input-error:
    border: "1px solid {colors.error}"
  tag:                      # .tone-xxx scoped；bg/text 由各專案 tone token 提供
    rounded: "{radius.pill}"
  project-card:             # .project-card
    backgroundColor: "{colors.paper}"
    rounded: "{radius.lg}"
    shadow: "{shadow.sm}"
  project-card-hover:
    shadow: "{shadow.card-hover}"
```

---

## 9. Token 總清單（按需查閱）

> 全域 token（`:root`）以外，還有這些**區域 / 功能 token**，散在各元件，記在這裡免得再「用了沒記」。

| Token | 範圍 | 用途 |
|---|---|---|
| `--fs-h1`~`--fs-xs` | 全域（響應式）| 字級，見 3.2 |
| 色彩 token | 全域 | 見 2.1–2.4 |
| `--shadow-*` | 全域 | 主系統陰影，見 5 |
| `--page-gutter` | 全域（手機覆寫）| 頁面左右留白 |
| `--text-heading` 覆寫 | `.theme-xxx` | 案例頁主色 theming |
| `--cs-accent` / `--cs-accent-strong` / `--cs-accent-soft` | `.theme-xxx` | 案例主色、強調色與淡色背景 |
| `--cs-surface` / `--cs-line` / `--cs-text-heading` / `--cs-shadow-color` | `.theme-xxx` | 案例 surface、邊線、標題與陰影色 |
| `--tag-bg` / `--tag-text` | `.tone-xxx`（目標）| 專案標籤色 |
| `--accent-color` / `--bg-color-tint` / `--border-color-tint` | `.skill-category-card` | 技能卡可換色 |
| `--cursor-tag-scale` / `--wireframe-scale` / `--sticky-note-scale` / `--toggle-scale` / `--ai-widget-scale` / `--wal-pencil-scale` | Hero 裝飾 | RWD 縮放：各裝飾用 `transform: scale(var(--xxx-scale))` 在斷點縮小，**保留內部間距不塌陷**（見 Memory.md）|
| `--hero-mobile-h` / `--sticky-inner-rotate` | Hero 手機 | 手機 Hero 視覺高度基準、便利貼旋轉 |
| `--year-rail-sticky-top` | About 年份 rail | sticky 定位 top（隨斷點變）|
| `--mobile-nav-closed-height` / `--mobile-nav-open-height` | Navbar 手機 | 漢堡選單收合/展開高度 |
| `--cs-tl-card-height` / `--cs-tl-step-count` / `--cs-tl-step-width` | 案例頁 timeline | 時間軸卡片尺寸計算 |
| `--shimmer-angle` / `--shine-angle` | 動畫 | Hero badge 微光角度 |

---

---

## 13. Token v2：`--hm-*` 單一前綴

- 新 code 一律使用 `--hm-*`。
- `--paper`、`--ink`、`--purple` 等舊名只保留為 `@deprecated` alias，遷移方向為 `--hm-paper`、`--hm-ink`、`--hm-purple`。
- Primitive 色階為 `--hm-{purple|blue|green|peach|brown}-50` 到 `-900`；元件不可直接消費 primitive，必須透過 semantic token。
- Status semantic：`--hm-success`、`--hm-warning`、`--hm-error`、`--hm-info`，各自搭配 `-soft` 背景。
- Spacing：`--hm-space-3xs` 到 `--hm-space-3xl`，以 8px 基準建立主系統間距尺；新 code 優先使用 token，不直接散寫 16/24/32/48。
- Radius：`--hm-radius-sm/md/lg/pill/button` 對應 8 / 12 / 16 / 999 / 200；主系統元件 radius 一律優先吃 token。
- Layout / Grid：`--hm-container`、`--hm-container-wide`、`--hm-grid-gutter`、`--hm-grid-gutter-lg`，搭配 `.hm-grid` helper 使用。
- Z-index：base `0`、sticky `10`、navbar `100`、overlay `200`、modal `300`、toast `400`。
- Breakpoint 文件值：mobile `768px`、tablet `1024px`、desktop `1440px`；JS 單一來源為 `lib/breakpoints.ts`。CSS custom property 無法直接用於 `@media`，不可假裝能動態取代斷點。
