# Project Memory

## 2026-06-03 Home hero RWD progress

- Page: `/` home hero. Main file touched: `app/globals.css`.
- RWD rule: when SVG/illustration decoration components need to shrink across breakpoints, prefer `transform: scale(...)` on the visual element/wrapper instead of changing its intrinsic width/height. This preserves internal spacing and avoids collapsed gaps.
- Figma references:
  - 1440px–768px: Portfolio Site node `2471:21860` (`800×889` hero section reference under fixed nav).
  - `<768px`: Portfolio Site node `2471:43392` (`460×889` hero section reference under fixed nav).
- Current implementation direction:
  - `max-width: 1023px` hero now keeps decorations visible instead of hiding all `.hero-decoration`.
  - Hero gets `margin-top: 80px` on narrow layouts so the section starts below the fixed nav, matching Figma frame y=80 and preventing top decorations from sitting under the navbar.
  - Mid layout (`768px–1024px`) now treats the hero as a viewport section: `min-height: calc(100svh - 80px)` under the fixed nav, responsive top/bottom padding via `clamp(...)`, `hero-copy` width `550px`, horizontal 136×52 buttons, and Figma-aligned decoration positions. Decoration `top` values in this range also use viewport-aware `clamp(...)` so short 768px-high screens do not keep the 889px Figma y positions unchanged.
  - Mobile `<768px` uses `hero-copy` width `408px`, vertical full-width CTA buttons (`查看作品` on top, `我的歷程` below via column-reverse), compact cursor tags, clustered sticky notes, and bottom decorations repositioned around y=713–765.
  - Follow-up RWD rule applied: cursor tags, Session frame, Fun demo frame, toggle button set, sticky notes, and Walpencil keep their intrinsic component sizing and shrink via inner `transform: scale(...)` variables so internal spacing does not collapse.
  - `<768px` hero also uses viewport height (`calc(100svh - 80px)`) with scaled top/bottom padding. The post-up sticky notes are arranged as a fan from lower-left to upper-right, and cursor tags sit above sticky notes with higher z-index.
  - Sticky note wrappers now include semantic classes by content/color (`hero-sticky-idea`, `hero-sticky-user-centric`, `hero-sticky-data-storage`, `hero-sticky-co-work`, `hero-sticky-product-spec`, `hero-sticky-how-might`) so mobile fan positioning and z-index are not tied only to numeric class names.
  - Mobile sticky note positions should follow Figma node `2471:43392` as ratios of the `460×889` hero frame: data-storage `x=53 y=116.5`, co-work `x=82 y=75.5`, idea `x=138 y=24`, user-centric `x=191 y=25`, product-spec `x=258.7 y=40.4`, how-might `x=296.3 y=77.5`.
  - Follow-up mobile height rule: for `<768px`, y-axis placement should use the hero's visible height (`--hero-mobile-h`) as a proportional basis, without fixed Figma-height max caps. This prevents 16:10/taller screens from making all hero objects look stuck near the top.
  - Mobile center copy group was nudged down from roughly `29.4%` of hero height to about `31.5%` of hero height.
  - Because base `.focus-container` styles live near the bottom of `globals.css`, hero-specific focus gap overrides also need to live after that block or be repeated later in the file.
  - H1 font was reduced for RWD safety: `36px` around tablet/mid layouts and `24px` below 768px, because actual web font width is wider than the Figma visual and can visually clip on 460px.
- Verification completed:
  - `npm run build` passed.
  - In-app browser checked `800×969` and `460×969`: no horizontal overflow and no console errors.
  - Follow-up viewport-padding fix also passed `npm run build`; Browser re-measurement was blocked by Browser URL policy, so visual re-check should be done from the already-open `localhost:3000` tab if needed.
  - Follow-up scale/fan layout fix also passed `npm run build`.
  - Follow-up mobile proportional-height fix also passed `npm run build`.
  - Follow-up semantic sticky-note fan/z-index fix also passed `npm run build`.
  - Follow-up exact Figma-ratio sticky position fix also passed `npm run build`.
- Session note:
  - User requested `localhost:3000` stay running until the session ends. Do not stop the dev server during final cleanup unless the user explicitly asks.
  - Follow-up fix: the center copy group in the `768px–1024px` viewport range was too low because `padding-top: 426px` had been applied as a fixed value. It was changed to responsive viewport padding so the copy group moves up on shorter screens while the hero still owns the full first viewport.

## 2026-06-02 Local dev server / visual check preference

- 檢查網站或做視覺驗證時，優先共用既有的 `localhost:3000` / port 3000 dev server。
- 只有在確認 port 3000 沒有開、或該服務不是目前專案時，才另外啟動新的 dev server 或改用其他 port。
- 這點很重要：不要因為要檢查頁面就直接另開 3001、3002，避免多個 dev server 混在一起造成驗證對錯頁。

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
- **內容區寬公式（已於 2026-06-02 更新，見下方「頁面留白變數化」）**：原本 padding `clamp(24px, 12.5vw, 240px)` → 內容寬 = 0.75 × 視窗寬。**現已改成 `--page-gutter: clamp(24px, 15.6vw, 300px)`**，1920px 時 padding 達 300、內容寬約 0.69 × 視窗（1320px）；手機 ≤768 另用較小 gutter。算斷點門檻請以新值為準。
- ≤1100px 改用緊湊等寬三欄（`grid-template-columns: 1fr 1fr 1fr; column-gap: 28px`），>1100px 才用 Figma 不等寬百分比版面。

### Before / After 圖片等比例縮放

- 要「卡片左右等寬、但圖片各自維持原始比例一起縮」：把較小的圖包一層 `div`，寬度設 `calc(min(607px, 100%) * 360 / 607)`，鎖成大圖顯示寬度的 360/607 倍，兩張用同一縮放係數。

### Hero 裝飾 label 靠左（重複踩坑，務必記住）

- **`.wireframe-label`（Session / Fun demo 的標題）必須 `display: block`**，否則靠左失效、被推到置中。
- 錯誤做法：只在 `.wireframe-label`（`<span>`）上加 `text-align: left`。span 是 inline，`text-align` 只管它「內部文字」，它在容器中的位置由父層決定，而 `.wireframe-frame-visual` 繼承了 `.hero { text-align: center }` → label 被置中於卡片。
- 正解：label 設 `display: block`（撐滿容器寬），自身的 `text-align: left` 才會生效、貼齊卡片左緣（對齊 Figma）。
- 驗證法：比對 label 與卡片的左緣 / center，相等於 center 就是被置中了。

### Hero 底部裝飾在矮螢幕隱藏

- `@media (max-width: 768px) and (max-height: 799px)`：把 `.hero-frame-large / .hero-ai-widget / .hero-wal-pencil / .hero-toggle` 設 `display: none`。矮手機（如 iPhone SE）放不下這四個底部物件，直接隱藏避免擠壓 / 溢出。限定 mobile 寬度，不影響 768px 高的桌機。

### wal-pencil scale 失效踩坑

- `.wal-pencil` 不可自宣告 `--wal-pencil-scale: 1`，否則 CSS 變數就近原則會蓋掉父層 `.hero-wal-pencil` media query 設的 override，導致縮放永遠 = 1。正解：消費端用 `var(--wal-pencil-scale, 1)` 給 fallback，讓父層的值能繼承下來（對比 wireframe / ai-widget 的消費元素本來就沒重宣告，所以正常）。

### Inline style vs media query 踩坑

- **inline style 會贏過 stylesheet**，媒體查詢要覆寫 inline 的屬性必須加 `!important`（例：alarm hover demo 的 `align-items`）。
- hero 資訊卡的「負責項目」原本 inline `flex: 2`、其他 `flex: 0 1 254px`，在 1024–1440 內容不夠寬時前 3 張吃光空間、把它壓成單字直排。**正解是把 base 改成四欄等分 `flex: 1 1 0` 並移除 inline flex:2**，不要只在某一段斷點修。

### 其他 RWD 上下排調整（皆在 `@media (max-width: 768px)`，persona 在 440px）

- persona 卡 `.cs-iv-persona` ≤440px：`flex-direction: column; align-items: center; text-align: center`（圖上文下並置中）。
- 提案分頁 `.cs-sol-tab-bd` ≤768px：直向，`.cs-sol-mock` 整寬（mock 圖在上、文字在下）。
- 迭代說明框 `.cs-sol-dr` ≤768px：直向，`.cs-sol-drlabel { width: auto }`（標題在上）。
- 「報警等級」hover demo ≤768px：容器 `cs-alarm-demo` 直向置中、箭頭 `cs-alarm-arrow { transform: rotate(90deg) }`（→ 變 ↓）、hover 後狀態 `cs-alarm-after { margin-top: 84px }` 讓往上的 tooltip 不蓋住箭頭與第一項。

### 影片託管（2026-06-03 已遷移到 Vimeo，原 mp4 做法作廢）

- **不再把 mp4 放進 repo**。兩支 UI 影片改用 **Vimeo 串流託管**（大檔不進 git，呼應 MEMORY 的大檔託管原則）。
- 元件：`app/advantech/VimeoPlayer.tsx`（'use client'）＝**點擊播放 facade**：平常只顯示客製 poster（`video-sc1.png` / `video-sc2.png`，內含播放鍵），點下去才把 `<iframe>` 換上去並 `autoplay=1`。好處：① 保留客製封面 ② 不點不載入 Vimeo 播放器 JS、頁面更快 ③ 解掉原本 `controls`+`poster` 兩顆播放鍵重疊問題。
- 容器 `.cs-sol-vplayer` 用 `aspect-ratio: 16/9`（poster 為 4096×2304 精準 16:9，零位移）；hover 微放大、`:focus-visible` 紫框。
- **Vimeo 影片 ID（重要，重抓對這些）**：超約預警操作流程＝`1197912187`（原 video-sc1）；模式識別操作流程＝`1197912188`（原 video-sc2）。
- poster PNG（共約 5.4MB）仍留在 repo 當封面，遠小於 50MB 上限、不影響瘦身。

### 新增

- hero 新增「團隊成員」資訊卡（2 位設計師、2 位後端工程師、1 位 PM），hero 變 4 欄並排。

## 2026-06-02 全站按鈕系統統一（design guideline 大調整）

Files: `app/globals.css`、`components/Hero.tsx`、`components/Works.tsx`、`design.md`（設計聖經全面同步）。對齊 Apple HIG 按鈕層級。

### 顏色：CTA = 紫色，其餘黑白

- **專案卡 CTA 全站統一 `--purple`**，不再跟 tone 走（原本 peach/navy/advantech/icecream/laushu/thesis 各用各色）。專案個性只保留在標籤文字色＋標籤底色。
- **specificity 踩坑**：紫色群組用 `.project-card.tone-xxx .project-button`（0,3,0）會蓋過 `.project-button.is-disabled`（0,2,0），導致 disabled 卡片誤顯紫色。**解法＝紫色規則全部加 `:not(.is-disabled)`**，讓未上線卡片一定落回 `--disabled` 灰階。
- `--purple` 只給「希望訪客轉換」的 CTA（下載履歷、聯絡送出、看專案）。

### Disabled：無連結專案 = 資料準備中 + 灰階

- 9 個專案中**只有研華（`/advantech`）有真實連結**，其餘 8 個 `href:"#"`（點了原地不動）全部改 `disabled: true` + cta「資料準備中」（`components/Works.tsx` 資料層）。
- disabled 樣式：`.project-button.is-disabled { background: var(--disabled) }`（#dedee4 灰底白字）。

### Secondary：灰色描邊，且描邊「在內」

- Secondary（Hero 查看作品、案例頁返回首頁）改用 **灰色 `--muted` (#8e8e9c)** 描邊。
- **描邊用 `box-shadow: inset 0 0 0 2px`（手機 3px），不用 `border`**。原因：border 會撐大外框、視覺比 primary 大；inset 陰影畫在元件內側，secondary 與 primary 外尺寸完全一致。

### Hover：不位移，只變色/描邊（克制調性）

- **移除所有 `translateY` 上浮**（原 `.button:hover -2px`、contact button `-1px` 都拿掉）。
- Primary 紫色 hover → 底色加深 `--purple-hover`。
- Primary 黑色 hover → 底色**變淺** `--ink-hover (#555)`（黑已最深，只能往淺；方向跟紫色相反）。
- Secondary hover → 底色填淺灰 `--surface` + 描邊由 `--muted` 加深成 `--ink`（不反白、不填深色）。

### 黑色 primary 變體

- 新增 `.button-dark`（`--ink` 底白字），用於 **Hero「我的歷程」**（強行動但非轉換 CTA，連到關於我頁）。`.button-primary`（紫色 CTA）保留給未來用。
- 新增 token `--ink-hover: #555555`。

### 導覽列履歷 = 紫色 CTA（刻意例外）

- 「下載履歷」用紫色 primary。這是「一屏一主 CTA」原則的**刻意例外**——履歷是全站常駐招募入口，與 Hero 同屏出現兩顆紫可接受。

### 形狀：全部 pill 200px

- 補齊兩個漏網的小圓角按鈕：專案卡 button（`8px`→`200px`）、聯絡送出 button（原與 input 共用 `8px`，獨立出 `200px`；input/textarea 維持 8px）。全站填色/描邊按鈕共 5 顆皆 pill。

### 文字

- Hero 主按鈕「了解更多」→「我的歷程」（避免「了解更多」一詞在 Hero 與專案卡 hover 各指不同目的地）。

### 驗證方式

- 無法用 Playwright（瀏覽器 profile 被佔用、pkill 權限被拒），改**讀 dev server 編譯後 CSS**（`/_next/static/css/app/layout.css`）逐條比對 token 與規則；最後使用者手動確認外觀無誤。

## Figma 對應節點（從 Agent 層搬來，屬本專案技術細節）

- **Scenario 1 ProposalTabs**：component set `2346:113`；Tab 1 圖片集 `2365:67055`（5 slides）、Tab 2 `2365:67056`（6 slides）、Tab 3 `2365:67057`（5 slides）。下次需要重抓直接對這些 node ID 操作。

## 2026-06-02 /advantech「最終 3 種 feature」connector 踩坑（1025–1439px）

（此筆原在 `000_Agent/memory/MEMORY.md`，因屬單一頁面技術 debug，移到專案層。）

- **問題範圍只有 1025–1439px**，其他斷點不要跟著亂改。此範圍第一張圖從左右排列變成「文字卡在上、圖片在下」，所以第一張到第二張的 connector 不能沿用 1440px+ 的幾何假設。
- 正確測量基準是「圖片下緣到下一張圖片上緣」的圖距，不是文字卡位置。第一條 connector 必須同時滿足：(1) 圖距與第二條一致、(2) 視覺比例與第二條一致、(3) 上端對第一張圖中心、(4) 底端對第二張圖中心。
- **走錯過的路**：① React/inline script 動態寫 `img style` → hydration mismatch；② `next/script afterInteractive` 或獨立 client component → in-app browser / dev bundle hydration 不穩、effect 沒可靠執行；③ 固定 482×211 → 第一條視覺比第二條大、端點偏右。
- **有效解法**：不依賴 JS hydrate，改用 **CSS 幾何定位 + 專用 `connector-1-mid.svg`**；在 `@media (min-width: 1025px) and (max-width: 1439px)` 內，第一條用 `content: url('/projects/advantech-figma/sol06/connector-1-mid.svg')`、`margin-left: calc(20% - 40px)`、`width: calc(30% + 40px)`，其他 connector 用同寬與 `margin-left: calc(35% - 20px)`。
- **Next dev 踩坑**：用 `127.0.0.1:3000` 會有 HMR cross-origin WebSocket error → 在 `next.config.ts` 加 `allowedDevOrigins: ['127.0.0.1']` 並重啟。
- **驗證**：看 1025 / 1200 / 1439px 三點 → `topDelta=0`、`bottomDelta=0`、第一/第二段 gaps 一致、hydration/HMR console error 為 0。

## 2026-06-02 /advantech 頁內目錄(TOC) + 頁面留白變數化 + 文字色 token

Files: `app/globals.css`、`app/advantech/page.tsx`、`components/CaseTOC.tsx`(新)。

### 頁面左右留白變數化 `--page-gutter`

- 把全站 9 處重複的水平 padding magic value 抽成 **`--page-gutter: clamp(24px, 15.6vw, 300px)`**(原 `clamp(24px, 12.5vw, 240px)`)。`.cs-section` 等全部改 `padding: 48px var(--page-gutter)`，改一個變數整頁生效。
- `15.6vw` 讓 **1920px 時 padding 剛好 300**(內容更收斂、約 0.69×視窗)；1440→225、1280→200。
- **手機保護**:`@media (max-width: 768px)` 內把 `--page-gutter` 覆寫成 `clamp(20px, 6vw, 48px)`，否則 15.6vw 會把手機內容壓太窄(390px 只剩 268)。
- 內部元素全是 flex/grid/百分比，padding 一改就自動縮，**不用逐一手動調**。

### TOC(頁內目錄 / scrollspy)——左側半透明浮卡

- 元件 `CaseTOC.tsx`('use client')，props `sections:{id,title}[]`。`page.tsx` 在各 section 加 `id="cs-sec-*"`、外層包 `.cs-toc-layout`。最後一項標題是「學習反思」(對應「我學到了什麼…」段)。
- **scrollspy**:`IntersectionObserver` 監看各 section 更新 active；點擊 `scrollIntoView({behavior:smooth})` 並暫鎖 observer 1s 防跳。
- **關鍵踩坑:不要用 grid 切一欄給 TOC**。一旦 grid 把 section 推到右欄，full-bleed 背景圖(如「設計流程」工廠圖)左邊會被切出一條白欄、很醜。**正解＝section 全寬不切欄，TOC 用 `position: fixed` 浮在左側、完全不佔版面**。
- TOC 樣式:`left: 20px`、`top: calc(80px + 48px)`(navbar 高 80 + 48)、底色 `rgba(255,255,255,0.94)` + `backdrop-filter: blur(16px)`(與 navbar 同款毛玻璃)、圓角。
- **寬度用 `width: fit-content` + `max-width: calc(var(--page-gutter) - 32px)`**:貼合最長標題(最小寬度，約 116px)，且永遠不超過左留白、不蓋內容(1024px gutter 小時自動更窄)。`.cs-toc-link { white-space: nowrap }` 保證單行。
- **斷點 ≥1024 才顯示**(base `display:none`，`@media (min-width:1024px)` 顯示)。
- **進出內容區才淡入**:第二個 `IntersectionObserver` 監看 `.cs-toc-layout`，`is-visible` class 控 opacity，hero/footer 區淡出。
- **錨點不被 navbar 蓋**:`[id^="cs-sec-"] { scroll-margin-top: 80px }`，點 TOC 跳轉後 section 標題停在 navbar(80px)正下方。

### 介面圖加描邊+陰影

- solution「最終 3 種 feature」14 張 `.cs-sol-fimg` 加 `border: 1px solid #d5dfec`(與右側資訊卡 `.cs-sol-fc` 同色)+ 輕陰影 `box-shadow: 0 2px 16px rgba(0,0,0,0.07)`。

### 文字色 token 階梯(語意化)——★只套骨架、不套元件

- token:`--text-heading`(大標)、`--text-body:#1f2933`(內文)、`--text-secondary:#5d6674`(副標/說明)、`--text-muted:#8e8e9c`;深底反轉組 `--text-on-dark:#fff` / `-body:rgba(255,255,255,.88)` / `-muted:rgba(255,255,255,.6)`。
- **★分層 theming(換色盤)——大標主色跟著各專案走,不是全域寫死**:
  - **全域 `:root` 只放「綁定規則 + 中性預設」**,所有專案共用:`--text-heading: #1a1a1a`(中性)、body/secondary/muted 等。
  - **每個案例頁在 `<main class="cs-page theme-xxx">` 掛 theme,只覆寫 `--text-heading` 一個主色值**。Advantech＝`.theme-advantech { --text-heading: #093060 }`(研華深藍)。新增專案就在 globals.css 加一行 `.theme-xxx { --text-heading: 主色 }`,內文/副標/標籤中性階全專案共用、不必覆寫。
  - 原因:研華主色是深藍,但每個專案主色不同;若把深藍寫死在全域,其他專案標題會誤吃深藍。**綁定規則共用一次、主色每專案覆寫一行** = 不重定義整套、也不犧牲各專案品牌色。
- **★關鍵原則:token 只套「純大標 / 內文 / 副標題」這 6 個骨架 class**:`cs-title`、`cs-heading`、`cs-heading-white`、`cs-body`、`cs-sol-blk-title`、`cs-sol-blk-desc`。**label、Tab、卡片內字級不套**,各自保留原本調好的顏色。
- **踩坑:不要用色值 `replace_all` 全域套 token**——會誤傷卡片內標題/desc/legend/tab(共 41 處)。正解是白名單精準套;若已誤套，用 `git show HEAD:` 取原始檔、腳本比對 selector→原色，把非白名單還原。
- 彩色(`--purple`、`#0072bd` 藍、分類標籤色)屬 accent/分類色,**不納入文字階梯**,刻意保留頁面的彩色層次。
