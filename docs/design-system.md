# Hming Portfolio — Design System

> 這份文件是我的設計語言。記錄的不只是「目前長什麼樣」，更是「為什麼這樣選」。
> 任何人（AI 或真人）要幫我維護或新增內容，讀完這份文件才能動手。
>
> **使用慣例**：每個元件 / token 都標了對應的 React 元件或 CSS class（如 `Button variant="secondary"`），方便對照實作。標名稱而非行號——行號會隨改動失效。
>
> **校準基準**：2026-06-25 重新掃描三個 Case Study、共用案例元件與 4 支案例 CSS 後更新。
> 標記：✅＝code 已實作且一致；🔧＝規格已定、code 待對齊（清單見 `design-audit-2026-06-08.md`）。

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
- **案例頁共用**（`components/case-study/`）：`CaseStudyShell`、`CaseSection`、`CaseHeading`、`ZoomableImage`、`FlowScrollHint`
- **案例頁待共用化**：Hero、Info Grid、Section Header、Media Figure、Card / Grid、Proposal Tabs、Before / After、Metric Grid、Feature Row
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

### 0.4 目前缺口（2026-06-25 掃描）

- `styles/case-study.css`：579 行，共用 shell 只覆蓋 40 個 `cs-*` class。
- 三個案例專屬 CSS：合計 7,035 行；Advantech 250、Crypto Arsenal 163、Laushu 161 個 unique class。
- 三支專屬 CSS 合計約 3,730 條 declaration，其中至少 911 條是寫死的 layout / spacing 尺寸。
- 同類 pattern 使用不同前綴重做：Advantech 多為 `cs-*`、Crypto Arsenal 為 `ca-*`、Laushu 為 `laushu-*`，所以只統計 `cs-*` 會低估未共用比例。
- 已確認可優先共用的重複 pattern：Section Header / Lead、Card / Grid、Media Figure、Info / Metric Card、Proposal / Feature Row、Before / After、Flow Scroll Container。

舊版「案例頁專屬 layout 不屬於可複用系統」的描述正式廢止。🔧 目前 code 尚未完全對齊本規格。

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
（**例外：CTA 按鈕不跟 tone 走，全站統一紫色**，見 2.5 與 5.1。）

---

## 2. 色彩系統

跨頁共用的色都定義成 token；改顏色永遠改 token，不要把 hex 散寫在元件裡。

### 2.0 token 化原則（要不要做 token，照這個判斷）

token 的價值＝**重複次數 × 會不會改**，不是看顏色「重不重要」。而且 **token ≠ 全域**——可以做成只在某個區域有效的「區域 token」。

| 情況 | 怎麼做 | 例子 |
|---|---|---|
| 跨多個頁面共用 / 屬品牌系統 | **全域 token**（`:root`）| `--purple`、`--ink`、`--text-secondary`、`--fs-*` |
| 只在一個頁面 / 元件內、但用 ≥2 次 | **區域 token**（scope 在 `.theme-xxx`、`.tone-xxx`、或元件自己）| 專案 tone 標籤色、`.skill-category-card` 的 `--accent-color` |
| 只用一次、又不太會改 | **直接寫 hex（加註解）** | 某張卡片的一次性背景色 |

> **現成範例**：`.skill-category-card` 自帶 `--accent-color: var(--purple)`、`--bg-color-tint`、`--border-color-tint` 三個區域 token——這就是「元件內部重複用、scope 在自己身上」的正確示範。
> **反例（待修）**：`:root` 不該塞單一專案才用的色。

### 2.1 基礎色票（全域）

| Token | Hex | 用途 |
|---|---|---|
| `--paper` | `#ffffff` | 頁面底色、卡片底色 |
| `--ink` | `#343434` | 主要文字。不用純黑，深灰讓字更柔 |
| `--ink-hover` | `#555555` | 黑色 primary 按鈕 hover（比 ink 淺一階）|
| `--muted` | `#8e8e9c` | 次要文字、placeholder、secondary 按鈕**文字** |
| `--line` | `rgba(0,0,0,0.08)` | 分隔線，透明度做的，不死硬 |
| `--line-strong` | `rgba(0,0,0,0.16)` | 比 `--line` 明顯、又比 `--muted` 文字淡的描邊：secondary 按鈕邊框 |
| `--surface` | `#f9f9f9` | tab 背景、表單欄位底色、卡片 placeholder 背景、secondary 按鈕 hover 底 |
| `--disabled` | `#dedee4` | 停用狀態（未上線專案）|

### 2.2 品牌主色：Purple

| Token | Hex | 用途 |
|---|---|---|
| `--purple` | `#5d62d8` | CTA 按鈕底色、active 狀態、年份 rail 當前項目 |
| `--purple-soft` | `#dbdcff` | 表單 focus ring、highlight 背景色 |
| `--purple-hover` | `#4f54c9` | 按鈕 hover（比 purple 深一階）|
| `--purple-light` | `#f0f1ff` | hover/active 極淺紫底色：語系選單 hover、secondary 按鈕 hover |

這個紫色是我自己選的，不改。地位＝**所有「我希望你點這裡」的地方**。

### 2.3 其他 Accent 色票（全域，可跨區塊重用）

| Token | 深色 | 淺色 soft | 角色 |
|---|---|---|---|
| Blue | `--blue` `#416484` | `--blue-soft` `#dce5ed` | 次要強調，比 purple 沉穩 |
| Brown | `--brown` `#705650` | `--brown-soft` `#e8e2e0` | tone-brown 專案標籤色（一個未上線專案用）。⚠️ 原「個人特質區塊」用途已隨 `.traits-panel` 移除而失效（死 CSS）|
| Green | `--green` `#477a6b` | `--green-soft` `#d6ebe3` | 備用，特定標籤 |
| Peach | `--peach` `#a83b1e` | `--peach-soft` `#fce8e2` | 特定專案主色調 |

### 2.4 文字色階梯（語意化，全域）

骨架文字用這組語意 token，不直接寫 hex。**只套「純大標 / 內文 / 副標題」這類骨架文字**；label、Tab、卡片內字級不套。

| Token | Hex | 用途 |
|---|---|---|
| `--text-heading` | `#1a1a1a`（中性預設）| 大標題。**每個案例頁可覆寫成主色**（見下）|
| `--text-body` | `#1f2933` | 內文 |
| `--text-secondary` | `#5d6674` | 副標 / 內文說明 |
| `--text-muted` | `#8e8e9c` | 最弱（同 `--muted`）|
| `--text-on-dark` | `#ffffff` | 深色背景上的大標（由 `.cs-heading-white` 消費，用於圖片/overlay 上的白標題）|

**分層 theming（案例頁唯一允許的專屬 UI 差異）：**
- 全域 `:root` 只放「綁定規則 + 中性預設」。
- 每個案例頁在 `<main class="cs-page theme-xxx">` 掛 theme，只能指定共用 semantic case tokens，例如 `--cs-accent`、`--cs-accent-strong`、`--cs-accent-soft`、`--cs-surface`、`--cs-line`、`--cs-text-heading`。
- 共用元件只能消費 `--cs-*` semantic token，不得直接讀 `--ca-*`、`--laushu-*`、`--advantech-*`。
- `.theme-xxx` 不得包含 `display`、`grid-template-*`、`gap`、`padding`、`margin`、`width`、`height`、`font-size`、`border-radius` 或 breakpoint override。
- **深色 section**：目前不保留深色 section class。`.cs-heading-white` 仍用於圖片 / overlay 上的白標題，所以只保留 `--text-on-dark` 單一 token。

### 2.5 每個專案的 Tone 色

每個專案卡片有自己的 `tone-xxx` class，定義**標籤背景色、標籤文字色**。
**加新專案＝在 `globals.css` 新增一個 `.tone-新專案名` 段落，不要改到其他 tone。**

> **CTA 按鈕色不跟 tone 走。** 上線專案 CTA 一律 `var(--purple)`，專案個性只保留在標籤色。未上線維持 `--disabled` 灰。用 `:not(.is-disabled)` 確保未上線卡片不被染紫。

**寫法分兩類（照 2.0 原則）：**
- 前 4 個 tone 重用既有通用 accent 色（`--brown`/`--blue` 等）→ 引用全域 token。
- 其餘專案專屬 tone 的色「只為那專案標籤而生」→ 做成 **scope 在 `.tone-xxx` 的區域 token**（一張卡內多個 tag 會重複用）。

| Class | 標籤文字色 | 標籤底色 | CTA | 狀態 | 寫法 |
|---|---|---|---|---|---|
| `tone-brown` | `--brown` | `--brown-soft` | `--disabled` | 未上線 | ✅ 全域 token |
| `tone-green` | `--green` | `--green-soft` | `--disabled` | 未上線 | ✅ 全域 token |
| `tone-peach` | `--peach` | `--peach-soft` | `--purple` | 上線 | ✅ 全域 token |
| `tone-navy` | `--blue` | `--blue-soft` | `--purple` | 上線 | ✅ 全域 token |
| `tone-advantech` | `--tag-text` | `--tag-bg` | `--purple` | 上線 | ✅ 區域 token |
| `tone-laushu` | `--tag-text` | `--tag-bg` | `--purple` | 上線 | ✅ 區域 token |

**專案專屬 tone 目標寫法（區域 token）：**
```css
.tone-advantech { --tag-bg: #d9f1ff; --tag-text: #004b85; }
.tone-advantech .project-tags span { background: var(--tag-bg); color: var(--tag-text); }
```
專案專屬 tone 已統一 selector，不帶 `.project-card` 前綴。

### 2.6 頁面特定色（不可跨區塊使用）

| 色 | Hex | 限定用途 | 寫法 |
|---|---|---|---|
| `--about-accent` | `#ffd467` | About 深色 window 內標題文字 | ✅ 全域 token（沿用）|
| （About 藍卡背景）| `#d4e2f1` | About 成長故事藍卡背景，**只用一次** | 直接寫 hex + 註解 |
| （About 橘卡背景）| `#fff3e0` | About 成長故事橘卡背景，**只用一次** | 直接寫 hex + 註解 |

> 照 2.0：只用一次的色做 token 是多此一舉，保留 hex + 註解即可。

### 2.7 案例頁 Theme Token（界線規則）

案例頁（`cs-*`）內部有大量視覺色（插圖、流程圖、資訊卡藍色系）。

> **規則：案例頁只允許顏色因專案而異，其他 UI 規則一律共用。**
> - 該頁內**重複用 ≥2 次**的色 → 在 `.theme-xxx` 映射到統一的 `--cs-*` semantic token。
> - **只用一次**的 → 直接寫 hex。
> - 一頁內不要冒出 5 種藍，色也要成套。
> - 專案色可影響文字、背景、邊框、圖表與 shadow color；shadow 的 offset / blur / spread 必須使用共用規格。
> - 禁止用 theme selector 改變 component geometry 或 RWD。

---

## 3. 字體規則

### 3.1 字型選擇
```css
/* 全站唯一字型 */
font-family: var(--font-space-grotesk), sans-serif;
```
**Space Grotesk（唯一字型）**：幾何感但有個性，適合 IoT / Web3 / 金融科技——夠專業，不像 IBM Plex Sans 那麼「公司感」。透過 `next/font/google` 載入（`app/layout.tsx`），variable＝`--font-space-grotesk`。

**中文 fallback**：Space Grotesk 不支援中文，自動 fallback 到系統 `sans-serif`（macOS PingFang / Windows JhengHei / Android Noto Sans CJK）。

> ⚠️ 舊文件曾寫「年份用 Roboto Condensed」——**code 從未載入該字型**，全站只有 Space Grotesk。已刪除該說法。

### 3.2 字級 token（響應式，單一真實來源）

字級用 `:root` 的 `--fs-*` token。**這組 token 是響應式的——在斷點會整組重新定義**，新元件一律用 `var(--fs-*)`，不要寫死 px。

| Token | 桌機（預設）| ≤768px | ≤360px | 語意 |
|---|---|---|---|---|
| `--fs-h1` | `32px` | `24px` | `22px` | 頁面主標 / Section 標題（一般骨架最大）|
| `--fs-h2` | `28px` | `22px` | `20px` | 次級大標 |
| `--fs-h3` | `24px` | `18px` | `16px` | 卡片標題、段落標題 |
| `--fs-h4` | `18px` | `16px` | `14px` | 卡內子標 |
| `--fs-body` | `16px` | `16px` | `16px` | 正文、表單 |
| `--fs-sm` | `14px` | `14px` | `14px` | 小標籤、導覽連結、輔助說明 |
| `--fs-xs` | `12px` | `12px` | `12px` | 最小（Footer 版權等）|

> **一般骨架最大字級是 32px，沒有 40px。**
主標題、section 標題、About / Contact 與案例頁 UI 文字一律使用 `var(--fs-*)`。只有 SVG / canvas 內由圖表座標系控制的內容標籤可保留視覺化專用尺寸。

**首頁 Hero 例外**：`.hero h1` 是第一屏品牌主標，刻意不套 `--fs-h1`。目前規則為桌機 `48px`、`768–1024px` 為 `36px`、`<768px` 與矮手機特例為 `28px`。

### 3.3 字重（font-weight）

| 字重 | 用在哪 |
|---|---|
| `700` | 案例頁大標、強調標題（**全站用最多的字重**，65 處）|
| `600` | 主標題、Section 標題、按鈕、強調文字 |
| `500` | 專案名稱、label、標籤、表單 |
| `400` | 正文、說明文字 |

### 3.4 行高

| 用途 | 行高 |
|---|---|
| 大標題（`.section-heading h2`、`.hero-taglines`、`.about-intro-copy h1`）| `1.4`（桌機 media query 收到 1.2–1.28）|
| Hero 主標（`.hero h1`）| `1.2–1.3`，字級獨立於 `--fs-*` |
| 卡片標題（h3）| `1.4` |
| Hero intro / body large | `1.4–1.45` |
| 內文 | `1.4` |
| 按鈕、標籤、導覽 | `1`（單行）|

---

## 4. 圓角系統（border-radius）

圓角分兩種用途——**pill（膠囊）** 與 **卡片角**。

### 4.1 Token 對應（已 token 化）
| Token | 值 | 用途 |
|---|---|---|
| `--hm-radius-sm` | `8px` | 小元件、標籤、小 badge |
| `--hm-radius-md` | `12px` | 預設卡片、輸入框、多數一般卡片 |
| `--hm-radius-lg` | `16px` | 較大卡片 / 面板 / 大板塊 |
| `--hm-radius-pill` | `999px` | 全圓 pill、badge、tag |
| `--hm-radius-button` | `200px` | CTA 按鈕專用 pill |

### 4.2 Pill（完全圓的兩端）
| 用途 | Token / 值 | 對應 |
|---|---|---|
| **按鈕** | `--hm-radius-button` / `200px` | `Button` / `.ds-button` |
| **小 pill / 標籤 / badge** | `--hm-radius-pill` / `999px` | `.cursor-tag-label`、`.project-tabs`、`.educator-badge`、各 `cs-*` pill/badge |

原則：**按鈕一律用 `--hm-radius-button`，標籤 / badge 一律用 `--hm-radius-pill`**；純裝飾元件可按視覺比例保留局部例外。

### 4.3 卡片角
| Token / 值 | 用途 |
|---|---|
| `--hm-radius-md` / `12px` | **預設卡片圓角**：專案卡、輸入框、多數卡片 |
| `--hm-radius-lg` / `16px` | 較大卡片 / 面板：Contact card、skills panel、education card、educator card、案例頁大板塊 |
| `--hm-radius-sm` / `8px` | 小元件、標籤 |

卡片角已收斂成「小 8 / 預設 12 / 大 16」三階；主系統元件優先使用 `--hm-radius-*`，`cs-*` 圖表中的局部小面板可依單頁版面保留例外。

---

## 5. 元件樣式

### 5.1 按鈕（`components/ui/Button.tsx`）

**形狀**：Pill `border-radius: 200px`（見 4.1）。

#### 尺寸階層（sm / md / lg）
| 階層 | 桌機 ≥1024 | 平板 769–1023 | 手機 ≤768 | 左右 padding | 字級 | 用在哪 | 對應 class |
|---|---|---|---|---|---|---|---|
| **sm** | `38px` | `38px` | `38px` | `24px` | `14px`（`--fs-sm`）| 緊湊 / 常駐入口 | `<Button size="sm">` |
| **md（預設）** | `52px` | `48px` | `44px` | 桌機 `28px`、平板/手機 `24px` | 桌機/平板 `--fs-body`、手機 `--fs-sm` | 絕大多數 CTA：Hero、案例頁 | `<Button>` |
| **lg（全寬）** | `52px`，`width:100%` | `48px`，`width:100%` | `44px`，`width:100%` | 桌機 `14px 0`、平板/手機 `12px 0` | 桌機/平板 `--fs-body`、手機 `--fs-sm` | 卡片 CTA、聯絡送出 | `<Button size="lg">` |

- md 以 52 / 48 / 44 依斷點收斂；sm 38px 為緊湊情境（目前無按鈕在用）；lg 不是更高，是「撐滿容器寬」的變體。
- 字重統一 `600`，由共用 `Button` 管理。

> **跨斷點規格（2026-06-20 共用元件化）★**：`Button` 的 md / lg 採 **桌機 52px / 平板 48px / 手機 44px**。桌機與平板字級用 `--fs-body`，手機字級用 `--fs-sm`，全程使用既有 type token。
> - 歷史踩坑：手機曾把字級跳到 `20px`、高度漂移成 `52 / 56 / 43px`（primary 52、secondary 56、project-button 43），各斷點不一致。2026-06-08 後改為刻意的 52 / 48 / 44 分階，而不是漂移。
> - 高度用 `min-height`（`box-sizing: border-box`，含 padding 不爆高）；尺寸與字級由 `Button` 的 `.ds-button-*` 集中管理。
> - Hero 按鈕在平板保留 `min-width: 136px`、`padding: 12px 28px`（控制 Hero 視覺比例）。
> - 手機（≤768）md / lg 轉 `width: 100%` 全寬、高度 44px。多按鈕並排堆疊時（如 Hero、案例頁底部），**Primary 應優先顯示在上方**，Secondary 排在下方。

#### 語意三層（顏色變體，與尺寸正交組合）
| 變體 | 底色 | 文字色 | 描邊 | 語意 | class | 實際用在哪 |
|---|---|---|---|---|---|---|
| Primary（紫）| `--purple` | `#fff` | — | 轉換型 CTA（最希望點）| `variant="primary"`（預設）| Hero「查看作品」、專案卡 CTA、聯絡送出 |
| Secondary | 白 → hover `--purple-light` | `--muted` → hover `--purple` | 灰邊 `inset 0 0 0 2px var(--line-strong)`，hover 轉 `--purple` | 次要（outline 風）| `variant="secondary"` | Hero「我的歷程」、案例頁「返回首頁」 |
| Disabled | `--disabled` | `#fff` | — | 無連結 / 不可操作 | `disabled` | 未上線專案與未上線 next-project CTA |

> **Secondary 樣式**：outline 風——白底、灰字（`--muted`），描邊用 `box-shadow: inset 0 0 0 2px var(--line-strong)`（非 `border`，不撐大外尺寸），hover 時邊框與文字轉紫，底色變為極淺紫 `--purple-light`（2026-06-10 更新一致化設計）。**邊框刻意比文字（`--muted`）淡一階**：原本沿用 copy-btn 的 `2px var(--muted)`（邊＝字同色）覺得太重，改用新 token `--line-strong`（比 `--line` 明顯、比 `--muted` 淡）。
> **紫色語意**：紫色＝「希望訪客轉換」的 CTA（看作品、聯絡送出、看專案）。同屏盡量一顆紫色主按鈕。

#### Hover（全站統一，不位移只變色，`180ms ease`）
| 變體 | Hover |
|---|---|
| Primary（紫）| 底色加深 → `--purple-hover` |
| Primary（黑）| 底色變淺 → `--ink-hover` `#555`（黑已最深，只能往淺）|
| Secondary | 邊框、文字轉紫 → `--purple`，底色變淺紫 → `--purple-light`（對齊語系與複製按鈕）|

#### 用法
- 全站只有 CTA 用紫色，一屏盡量一顆紫色主按鈕。
- **導覽列履歷已改成純文字連結**（不再是紫色按鈕），與其他 tab 同款，見 5.3。
- **用詞**：動詞/名詞短語、簡短。避免同詞指不同目的地（Hero 用「我的歷程」進關於我頁；專案卡 hover 用「了解更多」進案例頁）。

### 5.2 專案卡（`.project-card`，最重要元件）
```
border-radius: 12px
aspect-ratio: 16/9，min-height: 500px（桌機）
背景預設：var(--surface) #f9f9f9
```
**桌機 Hover — 三層聯動同時觸發：**
1. 圖片 `scale(1.03)`，`420ms ease`（`.project-image`）
2. 黑色蒙層 `opacity: 0.18`，`260ms ease`（`.project-scrim`）
3. Info panel 從右滑入 `translate(0,-50%)`，`360ms ease`（`.project-info`，寬 `348px`）

Info panel 內容順序：品牌 logo → 專案名稱 → 副標 → 描述 → 標籤 → CTA，不要亂。
**手機版**：Info panel 靜態在圖片下方，logo/描述/標籤隱藏，只留 CTA（lg 全寬）。

### 5.3 導覽列（`.site-nav` / `.nav-links`）
```
height: 80px
background: rgba(255,255,255,0.94) + backdrop-filter: blur(16px)
position: fixed，z-index 高
```
向下滾動加 `.is-hidden` → 消失，停止滾動恢復。手機用漢堡選單（`.menu-button`），展開高度由 `--mobile-nav-open-height: 336px` 控制。
**連結**：設計案例 / 關於我 / 聯絡資訊 / 下載履歷——四個都是同款純文字連結（`.nav-links a`）。下載履歷連到 PDF（`/黃宣銘_中文履歷.pdf`），**2026-06-08 從紫色按鈕改成純文字連結**，與其他 tab 一致。
> **導覽列補償**：因固定高 80px，所有 Section 頂部 padding 需多 80px 避免被蓋。

### 5.4 輸入框（聯絡表單，`.form-field input/textarea`）
> ⚠️ 2026-06-08 依實際 code 重寫。`components/Contact.tsx` 近期有改動，表單若再調要同步此段。

採 **floating label** 設計。
```css
background: var(--surface);
border: 1px solid var(--line);
border-radius: 12px;
padding: 22px 16px 8px;        /* 上方多留空間給浮動 label */
font-size: 16px; color: var(--ink);
/* textarea 額外：min-height 180px、垂直可拉伸 */
```
**Label 浮動**：focus / 有值 → `translateY(-12px) scale(0.75)`、轉 `--purple`、字重 600。
**Focus**：`background:#fff; border-color: --purple; box-shadow: 0 0 0 3px --purple-soft`（外環，非 inset）。

### 5.5 標籤（Tags）
| 類型 | 圓角 | 內距 | 用途 | 對應 |
|---|---|---|---|---|
| 專案標籤 | `4px` | `4px 8px` | 卡片技能標籤，色跟 tone 走 | `.project-tags span` |
| 技能標籤 | `8px` | `12px 24px` | About 技能列表，底色 `--surface` | About skills |

### 5.6 區域 token 元件範例（`.skill-category-card`）
About 頁技能卡是「元件自帶區域 token」的範本：
```css
.skill-category-card {
  --accent-color: var(--purple);     /* 預設紫，可被覆寫換色 */
  --bg-color-tint: rgba(0,0,0,0.04);
  --border-color-tint: rgba(0,0,0,0.12);
  border-radius: 16px; padding: 28px 24px;
}

.skill-category-card.is-user-research {
  --accent-color: #4a90e2;
  --bg-color-tint: rgba(74,144,226,0.04);
  --border-color-tint: rgba(74,144,226,0.12);
}
```
> 新做「同款但不同主色」的卡片時，在 CSS 新增 `.skill-category-card.is-*` variant 覆寫這 3 個區域 token；TSX 只掛 class，不把 hex / rgba 寫進資料陣列。

---

## 6. 排版原則

### 6.1 頁面橫向邊距（`--page-gutter`）
```css
--hm-container: 1440px;
--hm-container-wide: 1920px;
--page-gutter: max(clamp(48px, 8vw, 120px), calc((100vw - var(--hm-container-wide)) / 2)); /* 一般內容 */
--page-gutter: max(240px, calc((100vw - var(--hm-container-wide)) / 2));                    /* 案例頁 ≥1301px，保留 TOC 空間 */
--page-gutter: clamp(20px, 6vw, 48px);                                                        /* ≤768px，避免內容被壓太窄 */
```
一般內容 section 都用 `var(--page-gutter)`，核心內容容器以 `--hm-container` 為主，超寬畫面則由 `--hm-container-wide` 與 `--page-gutter` 一起限制。navbar / footer 不算內容，navbar 維持自己的貼邊公式 `clamp(48px, 8vw, 120px)`。案例頁在 TOC 會顯示的桌機寬度，內容左右至少保留 240px 給 TOC。未來新增頁面不要另外寫 1200px / 1440px 內容上限，除非是文字段落、表單欄位、TOC 這種局部可讀性限制。

### 6.2 Breakpoints（真實斷點，已對齊 code）
> ⚠️ 舊文件寫「≤809 手機 / 810–1023 平板」是錯的——code 沒有 809/810。

| 名稱 | 範圍 | 主要變化 |
|---|---|---|
| **Desktop** | `≥1024px` | 多欄並排、完整 hover、TOC 浮卡顯示 |
| ↳ 桌機微調 | `1025–1439` / `≤1439` / `≤1100` / `≤900` | connector、欄寬等細節調整 |
| **Tablet** | `769–1023px` | 縮小欄寬和圖片 |
| **Mobile（主斷點）** | `≤768px` | 全部單欄、漢堡選單、卡片 hover 改靜態；`--fs-*` 與 `--page-gutter` 在此切換 |
| ↳ 小手機微調 | `≤640` / `≤440` / `≤360` | 字級再降（≤360 整組 `--fs` 再縮）、布局微調 |
| 矮螢幕特例 | `max-width:768 and max-height:799` | 隱藏 Hero 底部裝飾，避免擠壓（如 iPhone SE）|

### 6.3 間距系統（以 8px 為基準，已 token 化）
| Token | 值 | 用途 |
|---|---|---|
| `--hm-space-3xs` | `4px` | 細節間距、細小 badge 內距 |
| `--hm-space-2xs` | `8px` | 小間距、標籤 / icon 與文字間距 |
| `--hm-space-xs` | `12px` | Hero badge、表頭下緣、小群組 gap |
| `--hm-space-sm` | `16px` | 標題子元素間距、project info 內欄間距 |
| `--hm-space-md` | `24px` | 卡片欄間距、表單欄位間距、行動版卡片間距 |
| `--hm-space-lg` | `32px` | Section heading 與周邊 gap |
| `--hm-space-xl` | `48px` | 大型 Section 內距、卡片 padding（桌機）、`cs-section` 上下 padding |
| `--hm-space-2xl` | `64px` | About window body 欄距 |
| `--hm-space-3xl` | `80px` | Hero 圖文橫向 gap（行動版）、導覽列高度補償 |

`40px`（如 experience 卡片列表 gap）目前視為已知局部例外，可保留於特定版面，不強迫塞入主 token 尺。

**允許的非 8 倍數例外（刻意的，不算魔術數字）：**
| 值 | 合理用途 |
|---|---|
| `10px` | 細節微調 |
| `22px 16px 8px` | 輸入框浮動 label 專用內距（見 5.4）|
| `28px 24px` | skill-category-card padding |

> 🔧 案例頁目前仍有大量寫死 spacing，尚未完成收斂。案例頁 section、card、grid、tabs、media、caption、feature row 必須改用 `--hm-space-*`；只有流程圖座標、connector 端點與圖像幾何可保留數值。

### 6.4 Grid / Layout

```css
--hm-grid-gutter: 24px;
--hm-grid-gutter-lg: 32px;

.hm-grid {
  display: grid;
  gap: var(--hm-grid-gutter);
  grid-template-columns: repeat(auto-fit, minmax(var(--hm-grid-min, 240px), 1fr));
}
```

- `--hm-container` / `--hm-container-wide` 定義內容最大寬與 full-bleed 上限。
- `--hm-grid-gutter` 是預設欄間距；需要更寬鬆的展示區可改用 `--hm-grid-gutter-lg`。
- `.hm-grid` 是輕量共用 helper，適合 token 卡、能力卡、摘要卡等 auto-fit 版面，不強制導入 24 欄系統。
- 案例頁一般內容使用共用 Case Study pattern；若現有 `.hm-grid` 不足，應新增可重用的 Case Grid variant，而不是在 `.theme-xxx` 內另寫 grid。

### 6.5 Section 頂部 padding 特例
| Section | 桌機頂部 | 手機頂部 | 原因 |
|---|---|---|---|
| Hero | `112px` | `140–180px` | 蓋過固定導覽列（80px）並留視覺呼吸 |
| About | `48px`（含 80px 補償）| `48px` | 標準 section |
| Contact | — | — | 無頂部 padding，由 Hero image 佔滿 |

### 6.6 最大寬度
- 一般頁面內容線：`--page-gutter` 控制，最大內容寬 1920px。
- 局部可讀性限制：Hero copy `max-width: 820px`；Intro 段落 `780–860px`；表單欄位可依互動可讀性限制寬度。

### 6.7 案例頁 TOC 標題與分隔線規範
- **核心規則**：所有透過 Table of Contents (TOC) 導覽點擊進入的案例頁大標題（即對應於 TOC `id` 錨點的區塊主標題，例如 `.cs-heading`、`.ca-h2` 等），其下方**必須緊鄰一條水平分隔線**（`.cs-divider` 或其專案/主題變體）。
- **實作方式**：
  - **標準區塊**：使用 `CaseSection` 元件，其內部會自動渲染 `CaseHeading`（內含 `h2` 與 `.cs-divider` / `.cs-divider-white`）。
  - **自訂/客製化區塊（如 Process, Result, Next Step, 以及 Crypto Arsenal 所有區塊）**：若不使用 `CaseSection` 元件，必須在區塊的大標題（`h2`）下方手動置入分隔線（例如 `<div className="cs-divider" />` 或使用 `CaseHeading` 元件）。
  - **分隔線位置**：分隔線必須置於區塊的「大標題」正下方（大標題與其描述/段落之間），不可被放到描述段落的下方。

---

## 7. 深度與陰影

主系統陰影只用 `rgba(0,0,0,x)`，保持乾淨。

| Token | CSS 值 | 用途 |
|---|---|---|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.06)` | 小元件：annotation、badge、tab 類 |
| `--shadow-md` | `0 10px 20px rgba(0,0,0,0.12)` | Experience / Skills / Education / Educator 卡片（最常用）|
| `--shadow-lg` | `0 10px 40px rgba(0,0,0,0.12)` | 故事卡片、About window |
| `--shadow-xl` | `0 40px 80px rgba(0,0,0,0.25)` | Contact card（整頁焦點；保留 token 供未來焦點面板使用）|
| `--shadow-card-hover` | `0 16px 32px rgba(0,0,0,0.16)` | 卡片 hover 抬升 |
| `--shadow-photo` | `-5px 10px 20px rgba(0,0,0,0.12)` | About Polaroid 照片 |
| `--shadow-soft` | 多層柔和陰影 | 專案 Info panel |

> 案例頁可透過 `--cs-shadow-color` 使用專案色，但陰影的 offset / blur / spread 必須來自共用 elevation token，不得每頁重做一套陰影尺寸。

---

## 8. Token 總清單（按需查閱）

> 全域 token（`:root`）以外，還有這些**區域 / 功能 token**，散在各元件，記在這裡免得再「用了沒記」。

| Token | 範圍 | 用途 |
|---|---|---|
| `--fs-h1`~`--fs-xs` | 全域（響應式）| 字級，見 3.2 |
| 色彩 token | 全域 | 見 2.1–2.4 |
| `--shadow-*` | 全域 | 主系統陰影，見 7 |
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

## 9. Do's and Don'ts

### ✅ 要這樣做
- **顏色換，框架不換**：新增專案只建新 `tone-xxx`，卡片排版不動
- **案例頁同樣套系統**：Section、Card、Grid、Tabs、Media、Spacing、RWD 使用共用 Case Study patterns
- **改顏色用 token**：跨頁共用 → 全域 token；單區域重複用 → 區域 token；只用一次 → hex + 註解（見 2.0）
- **字級用 token**：新元件用 `var(--fs-*)`，不要寫死 px；一般骨架最大不超過 32px（`--fs-h1`），首頁 Hero 主標為已定義例外
- **陰影分層**：主系統一律黑陰影，重要元素重陰影、次要輕陰影
- **留白要夠**：文字最少 `24px` 內距
- **每個互動狀態都要有**：hover、active、focus、disabled
- **動畫有邊界**：首頁和 About 可有入場動畫，案例頁收手

### ❌ 不要這樣做
- **不要在案例頁加主動動畫效果**：面試官看的是設計，不是特效
- **不要每個新專案重新設計版型**：顏色換就好，卡片格式一致
- **不要用純黑**：文字最深 `--ink (#343434)`
- **不要讓 accent 大面積出現**：`--purple` 只用於 CTA 和 active
- **不要把單一專案才用的色塞進全域 `:root`**：用區域 token（見 2.0）
- **不要在 `.theme-xxx` 寫 layout**：theme 只能設定顏色 token
- **不要用 `ca-*` / `laushu-*` / 專案私有 `cs-*` 重做既有 UI pattern**
- **不要把案例頁的有色陰影尺寸擴散成另一套 elevation**
- **不要在手機版保留 hover-only 互動**：改成靜態或點擊觸發
- **不要讓未上線案子看起來可點**：用 `--disabled` 底色
- **不要隨意用超過 32px 的字號**：一般骨架最大就是 32px；只有首頁 Hero 主標可用 48px

---

## 10. 架構 Ownership 與新增專案流程

為了維護專案架構的一致性並方便後續擴充，專案的 Ownership 權責劃分與新增 Case Study 流程已收錄於以下獨立文件中。在進行架構修改或新增案例時，請務必遵循其規範：

- **架構 Ownership 與驗收基準**：請參閱 [architecture-baseline.md](file:///Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio/docs/architecture-baseline.md)
- **新增 Case Study 檢核清單**：請參閱 [add-case-study-checklist.md](file:///Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio/docs/add-case-study-checklist.md)

### 10.1 Case Study CSS Ownership

- `styles/case-study.css`：Case Study shell 與共用 pattern 的單一樣式來源。
- `components/case-study/`：共用 React component 與 pattern API。
- `.theme-<slug>`：只宣告 `--cs-*` 顏色 token。
- 專案 route：只組合共用 component、提供內容與資料。
- 專案 visualization component：可管理流程圖節點、SVG path、connector 與圖像比例；不得重做 section / card / typography / spacing / RWD shell。
- 若同一 pattern 在第二個案例出現，不是「考慮」共用，而是必須先抽成 `components/case-study/` 再使用。

---

## 11. 圖片與媒體資產規範

為維持頁面載入效能並優化儲存庫體積，專案對圖片資產制訂了嚴格的規範：

### 11.1 格式與壓縮
- **統一格式**：除了純向量圖使用 `.svg` 外，所有圖片資產（如專案 cover、流程圖、設計稿等）必須轉換為 `.webp` 格式。
- **壓縮品質**：WebP 轉換品質設定為 `85`（此值在 Pillow 中能提供 80%–90% 的檔案大小削減，且視覺無損）。

### 11.2 尺寸限制（單一來源最大寬度）
- **專案封面 (Cover)**：最大寬度 `1600px`。
- **背景/Hero Banner (Background)**：最大寬度 `1920px`。
- **Lightbox 放大展示稿 (Lightbox)**：最大寬度 `2560px`（以確保在全螢幕放大時字體及 UI 細節依然清晰）。
- **其他螢幕截圖 / 流程圖 (Screenshot/Flow)**：最大寬度 `1600px`（小於此寬度則維持原尺寸）。

### 11.3 可放大圖片互動與對齊
- **所有可點擊放大的圖片必須使用共用 `ZoomableImage` 互動模式**，並保留 hover / focus 的放大提示，不要在各專案頁另外手刻 lightbox。
- **縮圖與 lightbox 圖片都必須水平置中顯示**：縮圖容器、觸發按鈕與圖片本體都要用 `margin-inline: auto` 或等效的 `place-items: center`，避免圖片在卡片或 Final UI 區塊中偏左 / 偏右。
- **放大後必須使用 `object-fit: contain`**，不可裁切 UI 畫面；需要全螢幕檢視的 before / after 或細節稿可使用 fullscreen lightbox，但仍要完整保留圖片比例。
- **圖片清晰度不足時優先重新輸出高解析來源**，不要用 CSS 銳化或放大濾鏡硬補；Lightbox 用圖建議至少 `2560px` 寬，細節多的流程圖或 UI 截圖可提高到 `3200px+`。

### 11.4 目錄結構與分類
專案圖片放置於 `/public/projects/<slug>/`，並統一依階段劃分子目錄，避免檔案混亂：
- `cover/`：存放專案封面圖（`cover.webp`）與 Logo（`logo.webp`）。
- `research/`：存放使用者研究、競爭對手分析、persona 等相關圖表。
- `solution/`：存放功能方案、系統架構流程、介面細節及 Lightbox 展示圖。
- `result/`：存放專案成果、數據圖表等。

> 💡 自動化處理腳本可參考 [optimize-images.py](file:///Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio/scripts/optimize-images.py)。

---

## 12. 自動化衛生與架構稽核

專案附帶了多個 Python 稽核工具以維護 repo 的衛生與一致性：

### 12.1 圖片連結完整性稽核
- **工具路徑**：[check-links.py](file:///Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio/scripts/check-links.py)
- **主要功能**：掃描所有 `app/`、`components/`、`data/` 與 `styles/` 底下的原始碼，抓取所有 `/projects/` 的圖片路徑並比對硬碟檔案是否確實存在，防範死連結。

### 12.2 架構架構稽核
- **工具路徑**：[arch-audit.py](file:///Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio/scripts/arch-audit.py)
- **主要功能**：
  - 統計並列出 `public/` 與專案內體積最大的前 10 個大檔案，監管儲存庫肥大。
  - 稽核 CSS 隔離性（如 case study 是否有確實被 `.theme-<slug>` 包裹限制）。
  - 追蹤專案擴充點。

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

## 14. Icon System

- 唯一 icon library：`lucide-react`。
- Inline icon 預設 `16px`；standalone icon 預設 `20px`。
- 一般 `strokeWidth={1.5}`；需要更強視覺權重時用 `2`。
- 新元件禁止手寫 inline SVG。既有案例頁的專案專屬 SVG 圖表不在此限，因其屬內容資產，不是 UI icon。
- Icon-only button 必須有可讀的 `aria-label`。

## 15. Motion System

| Token | 值 | 用途 |
|---|---:|---|
| `--hm-duration-fast` | `180ms` | hover、focus、顏色 |
| `--hm-duration-base` | `260ms` | navbar、toast、一般狀態 |
| `--hm-duration-slow` | `420ms` | card image / panel |
| `--hm-duration-enter` | `600ms` | skeleton / 入場 |
| `--hm-duration-reveal` | `950ms` | 首頁專案卡 reveal |

所有動畫需支援 `prefers-reduced-motion: reduce`。案例頁避免新增主動動畫。

## 16. Theme、Status 與資料視覺化

- Dark theme token 保留，但目前站點預設停用，不主動在 `<html>` 掛 `.dark` 或 `data-theme="dark"`。`ThemeToggle` 可保留作未來功能，不影響現況。
- Dark semantic 至少覆蓋 paper、surface、ink、muted、line 與文字階梯；案例頁品牌色可維持局部 scope。
- 圖表依序使用 `--hm-chart-1` 到 `--hm-chart-6`。不可只靠顏色表達狀態；線圖搭配 dash / marker，區域圖搭配 pattern 或直接標籤。

## 17. Form 與 Feedback 元件

- `Button`：`primary | secondary | danger`，支援 `loading`；loading 必須設 `aria-busy`、停用重複提交並保留原按鈕寬度。
- Input：default / focus / error / success；錯誤訊息使用 `--hm-error` + `--fs-xs`，並用 `aria-describedby` 連到欄位。
- `Select`、`Checkbox`、`Radio`：必須包含 default / hover / focus / checked / disabled / error。
- `Alert` / `Toast`：使用 success / warning / error / info 四種 status token。
- `Modal`：ESC 關閉、backdrop 點擊關閉、focus trap、關閉後焦點回到觸發元素。
- `Skeleton` 遵守 reduced-motion；`EmptyState` 結構為 icon + title + description + optional CTA。

## 18. Accessibility

- 一般文字對比至少 WCAG AA `4.5:1`；大型文字至少 `3:1`。
- 所有互動元件支援 `Tab`；Button 用 `Enter/Space`；Select / Modal 用 `Escape` 關閉。
- 不移除 focus outline；統一使用 `:focus-visible` ring。
- 純裝飾圖片與 Hero decoration 使用空 `alt` 或 `aria-hidden="true"`。
- Loading / success / error 回饋使用 `aria-busy`、`role="status"` 或 `role="alert"`，不能只靠顏色。
