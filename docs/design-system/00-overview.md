# 00 — Overview

# Hming Portfolio — Design System

> 這份文件是我的設計語言。記錄的不只是「目前長什麼樣」，更是「為什麼這樣選」。
> 任何人（AI 或真人）要幫我維護或新增內容，讀完這份文件才能動手。
>
> **使用慣例**：每個元件 / token 都標了對應的 React 元件或 CSS class（如 `Button variant="secondary"`），方便對照實作。標名稱而非行號——行號會隨改動失效。
>
> **機器可讀索引**：文件最前面新增了對齊 Google `design.md` 的 `TOKENS` 區塊（YAML），給 AI / linter 解析；值鏡像 `--hm-*`，真實來源仍是 `styles/tokens.css`。
>
> **校準基準**：2026-06-25 重新掃描三個 Case Study、共用案例元件與 4 支案例 CSS 後更新。
> 標記：✅＝code 已實作且一致；🔧＝規格已定、code 待對齊（清單見 `design-audit-2026-06-08.md`）。

---

---

### 章節順序（已對齊 Google 標準）

本文件 **§1–§8 已實體照 Google `design.md` 的固定章節順序排列**；§0 為導覽前言，§9 起是 Google 沒有、但本專案需要的延伸章節（附錄）。

| Google 標準章節 | 本文件章節 |
|---|---|
| Overview（Brand & Style） | §1 設計靈魂 |
| Colors | §2 色彩系統 |
| Typography | §3 字體規則 |
| Layout & Spacing | §4 排版原則 |
| Elevation & Depth | §5 深度與陰影 |
| Shapes | §6 圓角系統 |
| Components | §7 元件樣式（＋上方 `components:` 機器可讀區）|
| Do's and Don'ts | §8 Do's and Don'ts |
| 前言 / 附錄（延伸，Google 無）| §0 專案地圖；§9 Token 總清單、§10 架構 Ownership、§11 媒體、§12 自動化稽核、§13 Token v2、§14 Icon、§15 Motion、§16 Theme/Status、§17 Form、§18 Accessibility |

---

---

## 0. 專案地圖（先看這個，才知道東西在哪）

### 0.1 路由頁面

| 路由 | 進入點 | 性質 | 主要組成 |
|---|---|---|---|
| `/` | `app/page.tsx` | 首頁 | Navbar → Hero（含大量裝飾元件）→ Works（專案卡）→ Footer |
| `/about-me` | `app/about-me/page.tsx`（627 行）| 自我介紹 | About window → 成長故事 → 特質 → 經歷時間軸 → 技能 → 設計價值 → 教學經歷 |
| `/advantech` | `app/advantech/page.tsx` | 案例頁 | 共用 Case Study 架構 + Advantech 內容 |
| `/crypto-arsenal` | `app/crypto-arsenal/page.tsx` | 案例頁 | 共用 Case Study 架構 + Crypto Arsenal 內容 |
| `/laushu` | `app/laushu/page.tsx` | 案例頁 | 共用 Case Study 架構 + Laushu 內容 |
| `/contact` | `app/contact/page.tsx` | 聯絡 | Contact 元件（表單 + 聯絡方式）|

### 0.2 元件清單（`components/`）

- **共用骨架**：`Navbar`、`Footer`、`ScrollProgress`
- **首頁**：`Hero`、`Works`、`AvatarProfile`
- **Hero 裝飾**（`components/hero-decorations/`）：`StickyNote`、`CursorTag`、`WireframeFrame`、`AiWidgetFrame`、`ToggleDecoration`、`WalPencilDecoration`、`AnnotationPin`、`HeroBottomGroupCenter`、`HeroEntranceController`
- **About 頁**：`About`、`YearRail`、`app/about-me/` 下的 `AnimatedContent`、`EducatorMasonry`、`GrowthReveal`
- **案例頁共用**（`components/case-study/`）：`CaseStudyShell`、`CaseSection`、`CaseHeading`、`CaseHero`、`CaseInfoGrid`、`CaseSectionHeader`、`CaseCard`、`CaseGrid`、`CaseMedia`、`CaseMetricGrid`、`CaseProposalTabs`、`BeforeAfterNarrativeFrame`、`CaseFlowFrame`、`CaseFeatureRow`、`ZoomableImage`、`FlowScrollHint`、`FeatureConnectors`
- **案例頁仍待收斂**：少數 route 專屬 section 組合、舊 selector 與 visualization 外圍樣式；內容圖形的座標與 SVG path 繼續留在各案例
- **案例內容視覺**：各案例 route 下的流程圖、connector、產品截圖與專案資料；這些是內容資產，不是另一套 UI system
- **Contact**：`Contact`
- **底層 UI**（`components/ui`、`components/animate-ui`）：`dot-pattern`、`SplitText`、`TrueFocus`、`highlight`、`tabs`

### 0.3 四層架構：案例頁也屬於 Design System ★重要

Design System 必須覆蓋整個作品集，案例頁不能因為內容不同就自行建立 layout、spacing、card、tabs 或 RWD 規則。目標架構分四層：

1. **Foundation**：全站 color、type、spacing、radius、shadow、motion、breakpoint token。
2. **Case Study Shell**：Navbar、Footer、ScrollProgress、TOC、Hero 外框、內容寬度、Section、Next Project Nav。
3. **Case Study Patterns**：可組合的 Hero、Info Grid、Section Header、Media Figure、Card / Grid、Proposal Tabs、Before / After、Metric Grid、Feature Row、Flow Container。相同資訊層級必須使用同一 pattern。
4. **Project Theme / Content**：每個案例只提供顏色 token、文字、圖片、影片與流程圖內容；不可重新定義 layout、spacing、typography、radius、shadow geometry、motion 或 breakpoint。

> **唯一例外：內容視覺的幾何資料。** 流程圖節點座標、SVG path、connector 端點、圖片比例等屬專案內容，可以由案例資料或專屬 visualization component 管理；但包住它的 section、標題、卡片、捲動容器、提示、留白與 RWD 行為仍必須使用共用 pattern。

> 目前缺口與掃描數據已移至 `audit/design-audit-2026-06-25.md`，避免穩定規格與稽核紀錄混在一起。

---

## 1. 設計靈魂

### 我在面對誰
這個作品集的主要訪客是 **IoT、Web3、金融科技產業的設計主管或招募人員**。這些產業的產品不花俏，但內行人一眼就能看出設計有沒有深度。我的網站要能通過他們的眼光。

### 我希望給人的第一印象
**「這個人很仔細，有品味，而且做過真東西。」**
不是要讓人說「哇好酷」，而是讓人說「哇，做得很扎實」。成熟的設計師不靠視覺特效說話，靠的是每個細節都有理由。

### 品牌個性的三個關鍵字
| 關鍵字 | 意思 |
|---|---|
| **有滯度** | 不是看過就忘的視覺，有重量感和層次，讓人願意停下來看 |
| **不冰冷** | 有溫潤感，不是冷硬的科技風；像跟一個有經驗的人對話，專業但不距離 |
| **克制有個性** | 像正裝點綴小配件——About 頁頭像周圍的角色徽章（designer / coordinator / engineer）就是這個精神，低調但讓人發現時會心一笑（註：首頁 Hero 已改用 cursor tags + 便利貼營造同樣調性）|

### 動畫哲學
**主頁 + 自我介紹：有動畫。** 入場動畫讓首次造訪的人感受到網站有生命感。
**專案介紹頁：克制，幾乎沒有動畫。** 面試官看作品時，注意力該在案子上，不在特效上。

### 專案視覺的核心規則
> **顏色可以換，框架不變。**
每個專案有自己的主色調，標籤、強調色跟著走——但卡片格式、資訊架構、排版結構保持一致。
（**例外：CTA 按鈕不跟 tone 走，全站統一紫色**，見 2.5 與 7.1。）

---
