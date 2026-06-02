# Project Memory

## 2026-05-31 Advantech role connector details

- Page: `/advantech`
- Figma reference: Portfolio Site, node `2240:1942`
- Main files touched:
  - `app/advantech/page.tsx`
  - `app/globals.css`

### Connector implementation

- The "我在這個專案做了什麼..." role section uses an SVG overlay named `.cs-role-connectors` instead of card pseudo-elements.
- SVG viewBox is `0 0 1440 620` with `preserveAspectRatio="none"` so line endpoints can be controlled in the same coordinate system as the desktop layout.
- Current line endpoints:
  - Left top card right-bottom corner to center image: `x1=450 y1=161`, `x2=611 y2=235`
  - Right top card left-bottom corner to center image: `x1=829 y1=235`, `x2=990 y2=161`
  - Left bottom card right-top corner to center image: `x1=450 y1=410`, `x2=611 y2=336`
  - Right bottom card left-top corner to center image: `x1=829 y1=336`, `x2=990 y2=410`
- Connector visual style:
  - `stroke: #2b4b66`
  - `stroke-width: 2`
  - `stroke-linecap: square`

### Desktop card height fix

- Desktop role cards are intentionally fixed to `height: 161px`.
- This keeps all four connector endpoints aligned to the card corners even when the viewport width is below 1920px and text wrapping changes.
- Font sizes and spacing inside `.cs-role-card` use `clamp(...)` so the copy still fits inside the fixed-height cards at narrower desktop widths.
- `.cs-role-card` uses `overflow: hidden` on desktop to prevent wrapped text from changing the card height.
- Mobile layout resets role cards to natural height:
  - `height: auto`
  - `min-height: 0`
  - `overflow: visible`
  - `.cs-role-connectors` is hidden on mobile.

### Verification

- `npm run lint` passed after the change.
- Browser checks confirmed all four role cards stayed `161px` high at both 1440px and 1180px viewport widths.
- `curl -I http://localhost:3000/advantech` returned `200`, confirming the local page was reachable.

## 2026-06-02 Advantech AI-flow connectors, scaling & RWD pitfalls

Page: `/advantech`. Files: `app/advantech/page.tsx`, `app/advantech/FlowConnectors.tsx` (new), `app/globals.css`.

### AI 情境流程圖 connector（情境 1 / 情境 2）

- **不要用固定座標 SVG 畫連接線。** 改用 JS 量測卡片實際位置：`FlowConnectors.tsx`（'use client'）讀 `data-flow="ai1|ai2|fn1|fn2|ui1|ui2|ui3"` 錨點，依實際 `getBoundingClientRect()` 畫 SVG path。固定座標只要卡片高度一變就跑掉。
- **連線邏輯**：ai1→fn1、ai2→fn2；fn1 扇出到 ui1/ui2/ui3（共用一條垂直 spine）；fn2→ui3。
- **皺摺（jog）踩坑**：標題（pill）折成兩行 → 該卡變高 → 垂直中心下移；同列另一張沒折行時兩端中心 Y 不一致，連線中間就被迫補一段垂直線 = 皺摺。最終解法＝**讓同列卡片等高**（給足 min-height headroom，文字折行也不撐高），再用「正中央」連線就一定水平。曾試過「重疊區中心」但視覺較差，被否決。
- **等高對齊數學（改高度時務必保持）**：AI/Func 卡 `min-height` = UI 卡 + 20；`.cs-ds-ai-gap` = UI 卡高 + 22；`.cs-ds-ui-gap` = 21；欄內 `margin-top` 27（AI/Func）/ 37（UI）。目前值：Func/AI 190、UI 170、ai-gap 192、ui-gap 21。破壞比例 → 中心錯位 → 皺摺回來。
- **線條樣式**：對齊「最終 3 種 feature 的介面細節」那區的 `connector-*.svg` ＝ `stroke:#B3B3B3; stroke-width:2; stroke-linecap:square; stroke-linejoin:bevel`。兩端都是「由我負責」的線加粗到 3px（其餘 2px）。

### overflow / 捲動踩坑

- **`overflow-x: auto` 會讓 `overflow-y` 被計算成 `auto`**（CSS 規範），導致上下方向也裁切。最高那欄的底部卡片下邊框、以及捲動到底時最右卡片右邊框都會被裁。解法：`.cs-ds-flow-cols { padding: 4px }`（四邊留空隙）。
- **SVG 要跟卡片一起捲**：把 svg + cols 包進 `.cs-ds-flow-inner`（width:100%，小螢幕給 min-width），svg 用 `100%`＝inner 全寬；JS 量測基準改成 inner 而非外層捲動容器，否則捲動時線對不上。

### 水平捲動斷點

- 流程圖 **≤809px 改水平捲動**（像「設計流程」），不收單欄。`.cs-ds-flow-inner { min-width: 607px }` ＝ 809px 視窗時的內容區寬。
- **內容區寬公式**：`.cs-section` padding 是 `clamp(24px, 12.5vw, 240px)`，所以在 192–1920px 之間 **內容寬 = 0.75 × 視窗寬**。算捲動/斷點門檻都靠這條。
- ≤1100px 改用緊湊等寬三欄（`grid-template-columns: 1fr 1fr 1fr; column-gap: 28px`），>1100px 才用 Figma 不等寬百分比版面。

### Before / After 圖片等比例縮放

- 要「卡片左右等寬、但圖片各自維持原始比例一起縮」：把較小的圖包一層 `div`，寬度設 `calc(min(607px, 100%) * 360 / 607)`，鎖成大圖顯示寬度的 360/607 倍，兩張用同一縮放係數。

### Inline style vs media query 踩坑

- **inline style 會贏過 stylesheet**，媒體查詢要覆寫 inline 的屬性必須加 `!important`（例：alarm hover demo 的 `align-items`）。
- hero 資訊卡的「負責項目」原本 inline `flex: 2`、其他 `flex: 0 1 254px`，在 1024–1440 內容不夠寬時前 3 張吃光空間、把它壓成單字直排。**正解是把 base 改成四欄等分 `flex: 1 1 0` 並移除 inline flex:2**，不要只在某一段斷點修。

### 其他 RWD 上下排調整（皆在 `@media (max-width: 768px)`，persona 在 440px）

- persona 卡 `.cs-iv-persona` ≤440px：`flex-direction: column; align-items: center; text-align: center`（圖上文下並置中）。
- 提案分頁 `.cs-sol-tab-bd` ≤768px：直向，`.cs-sol-mock` 整寬（mock 圖在上、文字在下）。
- 迭代說明框 `.cs-sol-dr` ≤768px：直向，`.cs-sol-drlabel { width: auto }`（標題在上）。
- 「報警等級」hover demo ≤768px：容器 `cs-alarm-demo` 直向置中、箭頭 `cs-alarm-arrow { transform: rotate(90deg) }`（→ 變 ↓）、hover 後狀態 `cs-alarm-after { margin-top: 84px }` 讓往上的 tooltip 不蓋住箭頭與第一項。

### 影片封面

- UI 影片用 `<video poster="…/video-sc1.png">`（資料夾已有現成封面 `video-sc1.png` / `video-sc2.png`）。`controls` + `poster` 在播放前可能與封面內畫好的播放鍵重疊出現兩顆原生播放鍵，目前可接受。

### 新增

- hero 新增「團隊成員」資訊卡（2 位設計師、2 位後端工程師、1 位 PM），hero 變 4 欄並排。
