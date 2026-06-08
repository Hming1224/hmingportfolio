# Hming Portfolio — Design System

> 這份文件是我的設計語言。記錄的不只是「目前長什麼樣」，更是「為什麼這樣選」。
> 任何人（AI 或真人）要幫我維護或新增內容，讀完這份文件才能動手。
>
> **使用慣例**：每個元件 / token 都標了對應的 CSS class 名（如 `.button-secondary`），方便對照 `app/globals.css`。標 class 名而非行號——行號會隨改動失效，class 名穩定。
>
> **校準基準**：2026-06-08 完整掃描整個專案（4 頁路由、25 個元件、globals.css 7666 行 / 740 條 class / 全部 token）後重寫。
> 標記：✅＝code 已實作且一致；🔧＝規格已定、code 待對齊（清單見 `design-audit-2026-06-08.md`）。

---

## 0. 專案地圖（先看這個，才知道東西在哪）

### 0.1 路由頁面（4 頁）

| 路由 | 進入點 | 性質 | 主要組成 |
|---|---|---|---|
| `/` | `app/page.tsx` | 首頁 | Navbar → Hero（含大量裝飾元件）→ Works（專案卡）→ Footer |
| `/about-me` | `app/about-me/page.tsx`（627 行）| 自我介紹 | About window → 成長故事 → 特質 → 經歷時間軸 → 技能 → 設計價值 → 教學經歷 |
| `/advantech` | `app/advantech/page.tsx`（1399 行）| **案例頁（case study）** | 大量 `cs-*` 單頁專屬 layout（見 0.3）|
| `/contact` | `app/contact/page.tsx` | 聯絡 | Contact 元件（表單 + 聯絡方式）|

### 0.2 元件清單（`components/`）

- **共用骨架**：`Navbar`、`Footer`、`ScrollProgress`
- **首頁**：`Hero`、`Works`、`AvatarProfile`
- **Hero 裝飾**（`components/hero-decorations/`）：`StickyNote`、`CursorTag`、`WireframeFrame`、`AiWidgetFrame`、`ToggleDecoration`、`WalPencilDecoration`、`AnnotationPin`、`HeroBottomGroupCenter`、`HeroEntranceController`
- **About 頁**：`About`、`YearRail`、`app/about-me/` 下的 `AnimatedContent`、`EducatorMasonry`、`GrowthReveal`
- **案例頁**：`CaseTOC`，`app/advantech/` 下的 `ProposalTabs`、`AlarmLevelDemo`、`FlowConnectors`、`FeatureConnectors`、`VimeoPlayer`
- **Contact**：`Contact`
- **底層 UI**（`components/ui`、`components/animate-ui`）：`dot-pattern`、`SplitText`、`TrueFocus`、`highlight`、`tabs`

### 0.3 兩層結構：可複用系統 vs 案例頁專屬 ★重要

globals.css 的 740 條 class 大致分兩層：

1. **可複用設計系統**（本文件主要規範的對象）：色彩 token、字級、按鈕、專案卡、表單、導覽、Footer、About 各區塊等——這些會跨內容重複使用、要嚴格遵守規則。
2. **案例頁專屬 layout**（`cs-*` 前綴，**佔了 307 條 ≈ 全部的 41%**）：advantech 案例頁的流程圖、connector、persona、feature 表格等高度客製的版面。**這層不屬於可複用系統**——它們是為單一案例量身做的，新案例可以參考但不必硬套。
   > 規則：`cs-*` 的色 / 間距 / 陰影**可以有自己的局部值**（見 2.0 區域 token），但**字體、按鈕、文字色階梯仍要遵守全站系統**。

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

**分層 theming（區域 token 的最佳範例）：**
- 全域 `:root` 只放「綁定規則 + 中性預設」。
- 每個案例頁在 `<main class="cs-page theme-xxx">` 掛 theme，**只覆寫 `--text-heading` 一個值**。例：`.theme-advantech { --text-heading: #093060 }`。
- 對應骨架 class（只套這 6 個）：`.cs-title`、`.cs-heading`、`.cs-heading-white`、`.cs-body`、`.cs-sol-blk-title`、`.cs-sol-blk-desc`。
- **深色 section**：目前不保留深色 section class。`.cs-heading-white` 仍用於圖片 / overlay 上的白標題，所以只保留 `--text-on-dark` 單一 token。

### 2.5 每個專案的 Tone 色

每個專案卡片有自己的 `tone-xxx` class，定義**標籤背景色、標籤文字色**。
**加新專案＝在 `globals.css` 新增一個 `.tone-新專案名` 段落，不要改到其他 tone。**

> **CTA 按鈕色不跟 tone 走。** 上線專案 CTA 一律 `var(--purple)`，專案個性只保留在標籤色。未上線維持 `--disabled` 灰。用 `:not(.is-disabled)` 確保未上線卡片不被染紫。

**寫法分兩類（照 2.0 原則）：**
- 前 4 個 tone 重用既有通用 accent 色（`--brown`/`--blue` 等）→ 引用全域 token。
- 後 4 個 tone 的色「只為那專案標籤而生」→ 做成 **scope 在 `.tone-xxx` 的區域 token**（一張卡內多個 tag 會重複用）。

| Class | 標籤文字色 | 標籤底色 | CTA | 狀態 | 寫法 |
|---|---|---|---|---|---|
| `tone-brown` | `--brown` | `--brown-soft` | `--disabled` | 未上線 | ✅ 全域 token |
| `tone-green` | `--green` | `--green-soft` | `--disabled` | 未上線 | ✅ 全域 token |
| `tone-peach` | `--peach` | `--peach-soft` | `--purple` | 上線 | ✅ 全域 token |
| `tone-navy` | `--blue` | `--blue-soft` | `--purple` | 上線 | ✅ 全域 token |
| `tone-advantech` | `--tag-text` | `--tag-bg` | `--purple` | 上線 | ✅ 區域 token |
| `tone-icecream` | `--tag-text` | `--tag-bg` | `--purple` | 上線 | ✅ 區域 token |
| `tone-laushu` | `--tag-text` | `--tag-bg` | `--purple` | 上線 | ✅ 區域 token |
| `tone-thesis` | `--tag-text` | `--tag-bg` | `--purple` | 上線 | ✅ 區域 token |

**後 4 個目標寫法（區域 token）：**
```css
.tone-advantech { --tag-bg: #d9f1ff; --tag-text: #004b85; }
.tone-advantech .project-tags span { background: var(--tag-bg); color: var(--tag-text); }
```
後 4 個 tone 已統一 selector，不帶 `.project-card` 前綴。

### 2.6 頁面特定色（不可跨區塊使用）

| 色 | Hex | 限定用途 | 寫法 |
|---|---|---|---|
| `--about-accent` | `#ffd467` | About 深色 window 內標題文字 | ✅ 全域 token（沿用）|
| （About 藍卡背景）| `#d4e2f1` | About 成長故事藍卡背景，**只用一次** | 直接寫 hex + 註解 |
| （About 橘卡背景）| `#fff3e0` | About 成長故事橘卡背景，**只用一次** | 直接寫 hex + 註解 |

> 照 2.0：只用一次的色做 token 是多此一舉，保留 hex + 註解即可。

### 2.7 案例頁局部色（界線規則）

案例頁（`cs-*`）內部有大量視覺色（插圖、流程圖、資訊卡藍色系）。

> **規則：案例頁內部視覺色「不進」全域 `:root`，但同一頁內要自己收斂。**
> - 該頁內**重複用 ≥2 次**的色（如 advantech 那組藍 `#cbdef4`/`#093060`/`#425466`）→ 做成 scope 在 `.theme-advantech` 或該頁容器的**區域 token**。
> - **只用一次**的 → 直接寫 hex。
> - 一頁內不要冒出 5 種藍，色也要成套。

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
主標題、section 標題、About / Contact 骨架標題已改用 `var(--fs-*)`；案例頁內部高度客製的小型 label / 圖表文字仍可依局部版面保留自己的尺寸。

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

### 4.1 Pill（完全圓的兩端）
| 用途 | 值 | 對應 |
|---|---|---|
| **按鈕** | `200px` | `.button`、`.project-button`、`.submit-btn`、`.cs-next-btn-*` |
| **小 pill / 標籤 / badge** | `999px`（全圓）| `.cursor-tag-label`、`.project-tabs`、`.educator-badge`、各 `cs-*` pill/badge |

原則：**按鈕一律 200px，標籤 / badge 一律 999px**；純裝飾元件可按視覺比例保留局部值。

### 4.2 卡片角
| 值 | 用途 |
|---|---|
| `12px` | **預設卡片圓角**：專案卡、輸入框、多數卡片 |
| `16px` | 較大卡片 / 面板：Contact card、skills panel、education card、educator card、案例頁大板塊 |
| `8px` | 小元件、標籤 |

卡片角已收斂成「小 8 / 預設 12 / 大 16」三階；`cs-*` 圖表中的局部小面板可依單頁版面保留例外。

---

## 5. 元件樣式

### 5.1 按鈕（`.button` 系列 + `.project-button`）

**形狀**：Pill `border-radius: 200px`（見 4.1）。

#### 尺寸階層（sm / md / lg）
| 階層 | 高度 | 左右 padding | 字級 | 用在哪 | 對應 class |
|---|---|---|---|---|---|
| **sm** | `38px` | `24px` | `14px`（`--fs-sm`）| 緊湊 / 常駐入口 | 目前無按鈕在用 |
| **md（預設）** | `48px` | `24px` | `16px`（`--fs-body`）| 絕大多數 CTA：Hero、案例頁、聯絡送出 | `.button`（+ `-primary`/`-secondary`）|
| **lg（全寬）** | `48px`，`width:100%` | padding `12px 0` | `16px` | 卡片 CTA、手機全寬 CTA | `.project-button` |

- md 48px 是標準；sm 38px 為緊湊情境（目前無按鈕在用）；lg 不是更高，是「撐滿容器寬」的變體。
- 字重統一 `600`，包含 `.project-button`。

> **跨斷點規格（2026-06-08 對齊 code）★**：md 按鈕（`.button` / `-primary` / `-secondary`、Hero 的 `.hero-actions .button`）與 lg（`.project-button`）**在所有斷點都維持 `48px` 高 + `16px`（`var(--fs-body)`）字級——手機不放大**。
> - 修正前的踩坑：手機曾把字級跳到 `20px`、高度漂移成 `52 / 56 / 43px`（primary 52、secondary 56、project-button 43），各斷點不一致。已全部收斂回 48 / 16。
> - 高度用 `min-height: 48px`（`box-sizing: border-box`，含 padding 不爆高）；`.button` 與 `.project-button` 都明寫 `font-size: var(--fs-body)`，不靠瀏覽器預設繼承。
> - Hero 按鈕在 ≤1023 斷點保留 `min-width: 136px`、`padding: 12px 28px`（控制 Hero 視覺比例），但高度/字級同樣是 48 / 16。
> - 手機（≤768）primary 與 project-button 轉 `width: 100%` 全寬堆疊，高度仍 48。

#### 語意三層（顏色變體，與尺寸正交組合）
| 變體 | 底色 | 文字色 | 描邊 | 語意 | class | 實際用在哪 |
|---|---|---|---|---|---|---|
| Primary（紫）| `--purple` | `#fff` | — | 轉換型 CTA（最希望點）| `.button-primary` | **Hero「查看作品」**（→ `#projects`）。另外專案卡 CTA（`.project-button`）、聯絡送出（`.submit-btn`）也直接用 `--purple` |
| Secondary | 白 | `--muted` → hover `--purple` | 灰邊 `inset 0 0 0 2px var(--line-strong)`，hover 轉 `--purple` | 次要（outline 風）| `.button-secondary` | **Hero「我的歷程」**（→ `/about-me`）|
| Disabled | `--disabled` | `#fff` | — | 未上線專案 | `.is-disabled` | 8 個未上線專案卡 CTA |

> **Secondary 樣式（2026-06-08 更新）**：outline 風——白底、灰字（`--muted`），描邊用 `box-shadow: inset 0 0 0 2px var(--line-strong)`（非 `border`，不撐大外尺寸），hover 時邊框與文字轉紫。**邊框刻意比文字（`--muted`）淡一階**：原本沿用 copy-btn 的 `2px var(--muted)`（邊＝字同色）覺得太重，改用新 token `--line-strong`（比 `--line` 明顯、比 `--muted` 淡）。
> **紫色語意**：紫色＝「希望訪客轉換」的 CTA（看作品、聯絡送出、看專案）。同屏盡量一顆紫色主按鈕。

#### Hover（全站統一，不位移只變色，`180ms ease`）
| 變體 | Hover |
|---|---|
| Primary（紫）| 底色加深 → `--purple-hover` |
| Primary（黑）| 底色變淺 → `--ink-hover` `#555`（黑已最深，只能往淺）|
| Secondary | 邊框與文字轉紫 → `--purple`（outline 風，對齊複製鈕）|

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
--page-gutter: clamp(24px, 15.6vw, 300px);   /* 桌機：1920px 時達 300px 上限 */
--page-gutter: clamp(20px, 6vw, 48px);        /* ≤768px 覆寫，避免內容被壓太窄 */
```
`.cs-section` 等用 `padding: 48px var(--page-gutter)`。首頁 `.projects-section` 自有較窄 gutter（`clamp(24px, 8vw, 120px)`）。

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

### 6.3 間距系統（以 8px 為基準）
| 值 | 用途 |
|---|---|
| `16px` | 標題子元素間距、project info 內欄間距 |
| `24px` | 卡片欄間距、表單欄位間距、行動版卡片間距 |
| `32px` | Section heading 與周邊 gap |
| `40px` | Experience 卡片列表 gap |
| `48px` | 大型 Section 內距、卡片 padding（桌機）、`cs-section` 上下 padding |
| `64px` | About window body 欄距 |
| `80px` | Hero 圖文橫向 gap（行動版）、導覽列高度補償 |

**允許的非 8 倍數例外（刻意的，不算魔術數字）：**
| 值 | 合理用途 |
|---|---|
| `4px` / `12px` | 細節間距、標籤內距、badge 間距 |
| `10px` | 細節微調 |
| `22px 16px 8px` | 輸入框浮動 label 專用內距（見 5.4）|
| `28px 24px` | skill-category-card padding |

> ✅ 已收斂（2026-06-08）：原散落的 `14/18/6/7/9/26/44/84px` **容器排版間距**（padding/margin/gap）已往系統值靠（多數 →16px、`7/6/9→8`、`26→24`、`44→48`、`84→80`）。**例外保留**：Hero/About 裝飾元件內部間距與絕對定位（如 `.cursor-tag`、`.growth-*`、`.menu-button` 漢堡幾何）、`::before` 自訂項目符號的光學對齊 `margin-top:7px`、以及 `clamp()` 響應式值——這些是視覺/幾何微調，不算 8px 系統間距，刻意不動。

### 6.4 Section 頂部 padding 特例
| Section | 桌機頂部 | 手機頂部 | 原因 |
|---|---|---|---|
| Hero | `112px` | `140–180px` | 蓋過固定導覽列（80px）並留視覺呼吸 |
| About | `48px`（含 80px 補償）| `48px` | 標準 section |
| Contact | — | — | 無頂部 padding，由 Hero image 佔滿 |

### 6.5 最大寬度
- Hero copy `max-width: 820px`；Intro 段落 `780–860px`；Contact card `min(540px, 100%)`。

---

## 7. 深度與陰影

主系統陰影只用 `rgba(0,0,0,x)`，保持乾淨。

| 層級 | CSS 值 | 用途 |
|---|---|---|
| 輕 | `0 10px 20px rgba(0,0,0,0.12)` | Experience / Traits / Skills / Education 卡片（最常用）|
| 中 | `0 10px 40px rgba(0,0,0,0.12)` | 故事卡片、About window |
| 重 | `0 40px 80px rgba(0,0,0,0.25)` | Contact card（整頁焦點）|
| 多層柔和 | `0 0.6px 0.6px…, 0 2.3px 2.3px…, 0 10px 10px rgba(0,0,0,0.12)` | 專案 Info panel |
| 偏移（像照片）| `-5px 10px 20px rgba(0,0,0,0.12)` | About Polaroid 照片 |

> ⚠️ **例外（案例頁）**：`cs-*` 用了一些**有色陰影**（研華藍 `rgba(9,48,96,…)`、紫 `rgba(93,98,216,…)`）做品牌感。這違反「只用黑陰影」的主規則，但**限定在案例頁的品牌情境**可接受；**主系統元件（按鈕、卡片、表單）一律用黑陰影**，不要把有色陰影擴散出去。

---

## 8. Token 總清單（按需查閱）

> 全域 token（`:root`）以外，還有這些**區域 / 功能 token**，散在各元件，記在這裡免得再「用了沒記」。

| Token | 範圍 | 用途 |
|---|---|---|
| `--fs-h1`~`--fs-xs` | 全域（響應式）| 字級，見 3.2 |
| 色彩 token | 全域 | 見 2.1–2.4 |
| `--page-gutter` | 全域（手機覆寫）| 頁面左右留白 |
| `--text-heading` 覆寫 | `.theme-xxx` | 案例頁主色 theming |
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
- **不要把案例頁的有色陰影擴散到主系統元件**
- **不要在手機版保留 hover-only 互動**：改成靜態或點擊觸發
- **不要讓未上線案子看起來可點**：用 `--disabled` 底色
- **不要隨意用超過 32px 的字號**：一般骨架最大就是 32px；只有首頁 Hero 主標可用 48px
