# 04 — Case Study Patterns

Case Study 頁面也屬於 Design System。專案可以換顏色與內容，但 shell、section、card、grid、media、tabs、before/after、spacing、RWD 與互動規則必須共用。

## Case Study 分層架構

Design System 必須覆蓋整個作品集，案例頁不能因為內容不同就自行建立 layout、spacing、card、tabs 或 RWD 規則。目標架構分四層：

1. **Foundation**：全站 color、type、spacing、radius、shadow、motion、breakpoint token。
2. **Case Study Shell**：Navbar、Footer、ScrollProgress、TOC、Hero 外框、內容寬度、Section、Next Project Nav。
3. **Case Study Patterns**：可組合的 Hero、Info Grid、Section Header、Media Figure、Card / Grid、Proposal Tabs、Before / After、Metric Grid、Feature Row、Flow Container。相同資訊層級必須使用同一 pattern。
4. **Project Theme / Content**：每個案例只提供顏色 token、文字、圖片、影片與流程圖內容；不可重新定義 layout、spacing、typography、radius、shadow geometry、motion 或 breakpoint。

> **唯一例外：內容視覺的幾何資料。** 流程圖節點座標、SVG path、connector 端點、圖片比例等屬專案內容，可以由案例資料或專屬 visualization component 管理；但包住它的 section、標題、卡片、捲動容器、提示、留白與 RWD 行為仍必須使用共用 pattern。

---

## TOC 標題與分隔線規範

- **核心規則**：所有透過 Table of Contents (TOC) 導覽點擊進入的案例頁大標題（即對應於 TOC `id` 錨點的區塊主標題，例如 `.cs-heading`、`.ca-h2` 等），其下方**必須緊鄰一條水平分隔線**（`.cs-divider` 或其專案/主題變體）。
- **實作方式**：
  - **標準區塊**：使用 `CaseSection` 元件，其內部會自動渲染 `CaseHeading`（內含 `h2` 與 `.cs-divider` / `.cs-divider-white`）。
  - **自訂/客製化區塊（如 Process, Result, Next Step, 以及 Crypto Arsenal 所有區塊）**：若不使用 `CaseSection` 元件，必須在區塊的大標題（`h2`）下方手動置入分隔線（例如 `<div className="cs-divider" />` 或使用 `CaseHeading` 元件）。
  - **分隔線位置**：分隔線必須置於區塊的「大標題」正下方（大標題與其描述/段落之間），不可被放到描述段落的下方。

---

---

## Case Study Patterns

- 一般卡片 / 網格 / 媒體：使用 `CaseCard`、`CaseGrid`、`CaseMedia`，結構 class 為 `cs-card-*`、`cs-grid-*`、`cs-media-*`。
- 段落 lead：使用 `cs-section-lead`；文字色透過 `--cs-section-lead-*` token 調整，不再新增 `ca-lead` / `ca-narrow`。
- 方案展示：使用 `CaseProposalTabs variant="solution" | "wireframe"`；DOM 與樣式只使用 `cs-proposal-*`，theme 差異透過 variant modifier 與 custom properties 控制，不再新增 `cs-sol-tab-*` 或 `ca-wf-*`。提案 banner 使用 `cs-proposal-banner-*`，route 只提供顏色 token。
- 前後比較：使用 `CaseBeforeAfter` 與 `cs-before-after-*`；桌機橫排、`≤768px` 直排，箭頭方向由共用 RWD 控制。
- 流程外框：使用 `CaseFlowFrame variant="default" | "plain" | "split"` 與 `cs-flow-frame-*`；default 為有框說明圖、plain 為無框矩陣容器、split 為 header / scroll panel 分離。route 只提供內容圖形、最小寬與必要 caption / header theme。
- 功能步驟：使用 `CaseFeatureRow`；原型展示用 `cs-feature-row--prototype`，媒體與說明框不得再掛 `cs-sol-fr` / `cs-sol-fimg` / `cs-sol-fnote`。

---

---

- `styles/case-study.css`：Case Study shell 與共用 pattern 的單一樣式來源。
- `components/case-study/`：共用 React component 與 pattern API。
- `.theme-<slug>`：只宣告 `--cs-*` 顏色 token。
- 專案 route：只組合共用 component、提供內容與資料。
- 專案 visualization component：可管理流程圖節點、SVG path、connector 與圖像比例；不得重做 section / card / typography / spacing / RWD shell。
- 若同一 pattern 在第二個案例出現，不是「考慮」共用，而是必須先抽成 `components/case-study/` 再使用。

---
