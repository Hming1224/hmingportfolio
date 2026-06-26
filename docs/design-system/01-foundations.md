# 01 — Foundations

這份文件收斂網站的基礎設計語言：色彩、字體、排版、深度與圓角。若是會跨頁影響一致性的視覺規則，優先放在這裡。

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

---

## 4. 排版原則

### 4.1 頁面橫向邊距（`--page-gutter`）
```css
--hm-container: 1440px;
--hm-container-wide: 1920px;
--page-gutter: max(clamp(48px, 8vw, 120px), calc((100vw - var(--hm-container-wide)) / 2)); /* 一般內容 */
--page-gutter: max(240px, calc((100vw - var(--hm-container-wide)) / 2));                    /* 案例頁 ≥1301px，保留 TOC 空間 */
--page-gutter: clamp(20px, 6vw, 48px);                                                        /* ≤768px，避免內容被壓太窄 */
```
一般內容 section 都用 `var(--page-gutter)`，核心內容容器以 `--hm-container` 為主，超寬畫面則由 `--hm-container-wide` 與 `--page-gutter` 一起限制。navbar / footer 不算內容，navbar 維持自己的貼邊公式 `clamp(48px, 8vw, 120px)`。案例頁在 TOC 會顯示的桌機寬度，內容左右至少保留 240px 給 TOC。未來新增頁面不要另外寫 1200px / 1440px 內容上限，除非是文字段落、表單欄位、TOC 這種局部可讀性限制。

### 4.2 Breakpoints（真實斷點，已對齊 code）
> ⚠️ 舊文件寫「≤809 手機 / 810–1023 平板」是錯的——code 沒有 809/810。

| 名稱 | 範圍 | 主要變化 |
|---|---|---|
| **Desktop** | `≥1024px` | 多欄並排、完整 hover、TOC 浮卡顯示 |
| ↳ 桌機微調 | `1025–1439` / `≤1439` / `≤1100` / `≤900` | connector、欄寬等細節調整 |
| **Tablet** | `769–1023px` | 縮小欄寬和圖片 |
| **Mobile（主斷點）** | `≤768px` | 全部單欄、漢堡選單、卡片 hover 改靜態；`--fs-*` 與 `--page-gutter` 在此切換 |
| ↳ 小手機微調 | `≤640` / `≤440` / `≤360` | 字級再降（≤360 整組 `--fs` 再縮）、布局微調 |
| 矮螢幕特例 | `max-width:768 and max-height:799` | 隱藏 Hero 底部裝飾，避免擠壓（如 iPhone SE）|

### 4.3 間距系統（以 8px 為基準，已 token 化）
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
| `22px 16px 8px` | 輸入框浮動 label 專用內距（見 7.4）|
| `28px 24px` | skill-category-card padding |

> 🔧 案例頁目前仍有大量寫死 spacing，尚未完成收斂。案例頁 section、card、grid、tabs、media、caption、feature row 必須改用 `--hm-space-*`；只有流程圖座標、connector 端點與圖像幾何可保留數值。

### 4.4 Grid / Layout

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

### 4.5 Section 頂部 padding 特例
| Section | 桌機頂部 | 手機頂部 | 原因 |
|---|---|---|---|
| Hero | `112px` | `140–180px` | 蓋過固定導覽列（80px）並留視覺呼吸 |
| About | `48px`（含 80px 補償）| `48px` | 標準 section |
| Contact | — | — | 無頂部 padding，由 Hero image 佔滿 |

### 4.6 最大寬度
- 一般頁面內容線：`--page-gutter` 控制，最大內容寬 1920px。
- 局部可讀性限制：Hero copy `max-width: 820px`；Intro 段落 `780–860px`；表單欄位可依互動可讀性限制寬度。

### 4.7 案例頁 TOC 標題與分隔線規範
- **核心規則**：所有透過 Table of Contents (TOC) 導覽點擊進入的案例頁大標題（即對應於 TOC `id` 錨點的區塊主標題，例如 `.cs-heading`、`.ca-h2` 等），其下方**必須緊鄰一條水平分隔線**（`.cs-divider` 或其專案/主題變體）。
- **實作方式**：
  - **標準區塊**：使用 `CaseSection` 元件，其內部會自動渲染 `CaseHeading`（內含 `h2` 與 `.cs-divider` / `.cs-divider-white`）。
  - **自訂/客製化區塊（如 Process, Result, Next Step, 以及 Crypto Arsenal 所有區塊）**：若不使用 `CaseSection` 元件，必須在區塊的大標題（`h2`）下方手動置入分隔線（例如 `<div className="cs-divider" />` 或使用 `CaseHeading` 元件）。
  - **分隔線位置**：分隔線必須置於區塊的「大標題」正下方（大標題與其描述/段落之間），不可被放到描述段落的下方。

---

---

## 5. 深度與陰影

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

---

## 6. 圓角系統（border-radius）

圓角分兩種用途——**pill（膠囊）** 與 **卡片角**。

### 6.1 Token 對應（已 token 化）
| Token | 值 | 用途 |
|---|---|---|
| `--hm-radius-sm` | `8px` | 小元件、標籤、小 badge |
| `--hm-radius-md` | `12px` | 預設卡片、輸入框、多數一般卡片 |
| `--hm-radius-lg` | `16px` | 較大卡片 / 面板 / 大板塊 |
| `--hm-radius-pill` | `999px` | 全圓 pill、badge、tag |
| `--hm-radius-button` | `200px` | CTA 按鈕專用 pill |

### 6.2 Pill（完全圓的兩端）
| 用途 | Token / 值 | 對應 |
|---|---|---|
| **按鈕** | `--hm-radius-button` / `200px` | `Button` / `.ds-button` |
| **小 pill / 標籤 / badge** | `--hm-radius-pill` / `999px` | `.cursor-tag-label`、`.project-tabs`、`.educator-badge`、各 `cs-*` pill/badge |

原則：**按鈕一律用 `--hm-radius-button`，標籤 / badge 一律用 `--hm-radius-pill`**；純裝飾元件可按視覺比例保留局部例外。

### 6.3 卡片角
| Token / 值 | 用途 |
|---|---|
| `--hm-radius-md` / `12px` | **預設卡片圓角**：專案卡、輸入框、多數卡片 |
| `--hm-radius-lg` / `16px` | 較大卡片 / 面板：Contact card、skills panel、education card、educator card、案例頁大板塊 |
| `--hm-radius-sm` / `8px` | 小元件、標籤 |

卡片角已收斂成「小 8 / 預設 12 / 大 16」三階；主系統元件優先使用 `--hm-radius-*`，`cs-*` 圖表中的局部小面板可依單頁版面保留例外。

---
