# Project Memory

## 2026-06-24 設計系統 token 補完與 dark mode 停用邊界

- 新增主系統 token：`--hm-space-3xs` 到 `--hm-space-3xl`、`--hm-radius-sm/md/lg/pill/button`、`--hm-container`、`--hm-container-wide`、`--hm-grid-gutter`、`--hm-grid-gutter-lg`，並提供 `.hm-grid` 輕量 helper。新 code 優先吃 token，不直接散寫 16/24/32/48 或 8/12/16/999/200。
- 設計系統頁與主系統骨架元件的 radius / spacing 應優先使用 `--hm-*`；案例頁 `cs-*` 允許局部例外，但不要把單頁特例反向擴散到全域。
- 設計系統頁標題一律優先使用 `--fs-*`；一般骨架最大字級維持 `32px`，只有首頁 Hero 主標是刻意例外。
- dark theme semantic token 保留，但目前網站預設停用。`app/layout.tsx` 不主動在 `<html>` 掛 `.dark` 或 `data-theme="dark"`；若未來重啟 dark mode，再從 theme 啟用流與 `ThemeToggle` 一起設計，不要讓 localStorage 舊值偷偷改變首屏。

## 2026-06-20 共用 Button component

- 全站 CTA 統一使用 `components/ui/Button.tsx`；支援 `variant="primary|secondary"`、`size="sm|md|lg"`、站內 Link、頁內 anchor 與 native button。
- 尺寸與 disabled 視覺集中在 `styles/tokens.css` 的 `.ds-button-*`：md / lg 維持桌機 52px、平板 48px、手機 44px；disabled 固定 `--disabled` 灰底白字。
- 已遷移 Hero、作品卡、Contact submit、案例頁 next nav。選單、複製、輪播、lightbox 等專用控制按鈕不納入 CTA component。
- 無連結 CTA 必須 render native `<button disabled>`，不可用可點擊 Link 或只靠 class 假裝 disabled。

## 2026-06-10 Advantech Phase 5 i18n 回歸修正

- **遞迴翻譯 JSX 的 key 踩坑**：不可用一般 `Array.map()` 重建 React children，否則原本合法的靜態 JSX 會被 React 視為缺少 key 的動態列表，造成大量 console errors。處理 React children 要用 `React.Children.map()`，一般資料陣列才用 `Array.map()`。
- **翻譯後一定要檢查固定高度元件**：中文可容納的固定高度卡片，換成英文後常會裁字。Advantech 英文 Role 卡片用語言限定的字級／間距調整維持 radial connector；Process timeline 則增加英文卡片高度。用 `scrollHeight > clientHeight` / `scrollWidth > clientWidth` 可快速抓出肉眼容易漏掉的裁切。
- **Role radial RWD 邊界**：Role 卡片在 1024px 已無法可靠維持固定高度，改為 `max-width: 1100px` 切換堆疊版；堆疊時需另外指定順序為 `01 → 02 → 03 → 04`，因桌機 radial 的原始資料順序是 `01 → 03 → 02 → 04`。
- **英文斷行原則**：英文標題與內文不可使用 `overflow-wrap: anywhere`，會把 `Notifications`、`Conversational` 等完整單字硬切開。應使用 `overflow-wrap: normal; word-break: normal; hyphens: manual;`，必要時擴寬容器或讓整個單字換到下一行；案例頁最小英文字級維持 12px。

## 2026-06-09 網站資料結構重構 Phase 3（case study 擴充邊界）

Files: `styles/case-study-advantech.css`、`docs/add-case-study-checklist.md`、`docs/architecture-baseline.md`。

- **案例私有 CSS scope 慣例**：`case-study-advantech.css` 所有 Advantech 私有 `.cs-*` selector 一律以 `.theme-advantech ` 開頭（root 由 `CaseStudyShell` 的 `theme` prop 掛上）。新案例比照 `.theme-<slug>`。完整流程見 `docs/add-case-study-checklist.md`。
- **9 個共用骨架 class 保持裸寫，不要冠 `.theme-advantech`**：`.cs-next-nav` / `.cs-next-btn-filled` / `.cs-next-btn-outline` / `.cs-hero-info` / `.cs-hero-meta` / `.cs-info-card` / `.cs-info-row` / `.cs-info-tasks` / `.cs-title`。它們屬於共用 `case-study.css`，加 scope 是錯誤歸屬。**未來再過這支檔時不要把這 9 個也 prefix 掉。**
- **批次改 CSS selector 要用 postcss、不要用 line-based regex**：本檔有跨行逗號的「值」（gradient / transition / calc），regex 會把值誤判成 selector 改壞。用 postcss 解析 `rule.selectors` 改寫才安全。
- **cascade 安全性**：統一加同層 prefix = 全檔 specificity 均勻 +0,1,0，相對優先序與 source order 不變；唯一跨檔競合的 9 個共用 class 已裸寫，故私有元素 computed style 與改前完全相同（已四斷點 computed-style 驗證）。
- **待 Phase 4**：那 9 個共用骨架的 RWD override 應歸位 `case-study.css`；next-nav / next-btn 的 mobile 規則是共用檔已涵蓋的重複碼，可直接刪。

## 2026-06-09 網站資料結構重構 Phase 0 + Phase 1

Files: `data/projects.ts`、`data/about.ts`、`data/contact.ts`、`lib/config.ts`、`docs/architecture-baseline.md`、`eslint.config.mjs` 與對應頁面 / 元件。

- **專案單一資料來源**：首頁卡片、Advantech metadata、next-project 關係統一由 `data/projects.ts` 管理。查詢必須使用 `getProjectBySlug()` / `getNextProject()`；未知 slug 或缺少 next-project 關係要直接報錯，不能靜默顯示錯資料。
- **About 純資料邊界**：經歷中的粗體內容不可把 JSX 放進 `data/about.ts`；使用文字片段 + `highlight` 標記，由 `app/about-me/page.tsx` 負責渲染。
- **Contact ownership**：公開聯絡資料放 `data/contact.ts`；Formspree ID 清理與環境設定放 `lib/config.ts`；互動狀態與送出流程保留在 `Contact.tsx`。
- **lint 邊界**：本地 agent helpers 的 `scripts/` / `.codex/` 不屬網站 runtime，已從 ESLint 排除。`npm run lint` 現為 0 error，只剩既有 `<img>` warning。
- **iterations 策略**：保留作為設計驗證歷史，不在結構重構時刪除或混改；基準與新增專案 checklist 記在 `docs/architecture-baseline.md`。
- **驗證**：build / diff check 通過；四頁在 1440 / 1024 / 768 / 390 無水平溢出、console 0 error；首頁 tabs、Contact copy、About highlights、Advantech metadata / next-nav 正常。

## 2026-06-08 About Genie dock icon + hidden-card flow

Files: `app/about-me/GenieReveal.tsx`、`app/globals.css`。
- **視覺決策**：為了解決 hero 首屏 canvas 快照期間的空白感，`.about-window` 進場前先顯示底部中央的頭貼 dock icon；快照完成後 icon 模仿被點擊，往上彈兩下，再進入 canvas Genie 展開與真卡片落定。
- **後續修正**：dock icon 改為黑底；最後真卡片的 `opacity/scale` 彈跳落定已移除，因為它會和 canvas 淡出疊加造成額外閃爍。現在真卡片直接接上 canvas 最後一幀，只讓 canvas 短淡出。
- **疊影修正**：canvas Genie 播放期間，真卡片 wrapper 必須維持 `visibility:hidden`，只在最後換場前改回 visible。不能只打開外層可見，否則背景會看到原本方案 A 的黑色視窗，和 Genie effect 疊在一起。
- **觸發踩坑**：about hero 是首屏內容，不能只靠 `requestIdleCallback` + `ScrollTrigger onEnter`；dev / Fast Refresh 情境可能停在 dock icon 不播放。現在快照用短 `setTimeout` 延後，並補首屏可見檢查後直接 `play()`。
- **驗證**：`npm run build` 過；production `localhost:4001/about-me` 最新預覽確認 dock icon 黑底、真卡片 visible、canvas hidden、dock icon opacity 0、card opacity 1 / transform none、0 console error、無水平溢出。`localhost:4000` 是前一版舊 server，不代表最新畫面。

## 2026-06-08 按鈕 52/48/44 階梯 + 陰影 token 化

Files: `app/globals.css`、`design.md`、`Memory.md`。
- **決策更新**：前一筆「所有斷點 48px / 16px」已被 Hming 新拍板取代。現在 md / lg 按鈕採 **桌機 52px、平板 48px、手機 44px**。
- **字級規則**：桌機與平板按鈕用 `var(--fs-body)`；手機按鈕不可硬寫 15px，必須套既有 token `var(--fs-sm)`。這次 Hming 明確糾正：「不要用 15px，需要照字級 token 套上去」。
- **套用範圍**：`.button` / `.button-primary` / `.button-secondary` / `.hero-actions .button` / `.project-button` / `.submit-btn`。手機 `max-width:768px` 有重複 Hero 覆寫，兩邊都要維持 44px / `--fs-sm`。
- **陰影 token**：`:root` 新增 `--shadow-sm/md/lg/xl` 與特例 `--shadow-card-hover`、`--shadow-photo`、`--shadow-soft`；主系統黑陰影改吃 token。案例頁 `cs-*` 有色陰影與 Hero 裝飾微陰影保留，不納入主系統 token。
- **驗證**：`npm run build` 過；Browser 驗證 `/`、`/about-me`、`/advantech`、`/contact` 在 1440×900 與 390×844 都無水平溢出、0 console error。computed：桌機 Hero / project / submit 按鈕 52px / 16px；手機 Hero 44px / 14px、project / submit `min-height:44px`（rect 約 45px 來自 line-height / padding 渲染）。

## 2026-06-08 案例頁骨架元件用法（CA 專案直接照抄）

Files: `components/case-study/*`、`app/advantech/page.tsx`、`app/globals.css`。

- **目的**：新案例頁（尤其 CA 專案）不要再手刻 Navbar / ScrollProgress / TOC / next nav / Footer。直接用 `components/case-study` 的骨架元件，讓案例頁結構一致、之後要改全站 case study 外框也只改一處。
- **固定 import**：
  ```tsx
  import {
    CaseStudyShell,
    CaseSection,
    CaseHeading,
    type TocSection,
  } from "../../components/case-study";
  ```
- **基本頁面骨架**：
  ```tsx
  const tocSections: TocSection[] = [
    { id: "cs-sec-overview", label: "專案背景" },
    { id: "cs-sec-research", label: "研究洞察" },
    { id: "cs-sec-solution", label: "設計方案" },
  ];

  export default function CasePage() {
    const hero = (
      <section>
        {/* 每個專案自己的 hero cover + hero info */}
      </section>
    );

    return (
      <CaseStudyShell
        theme="theme-ca"
        tocSections={tocSections}
        nextNav={{ nextHref: "/next-project", nextLabel: "下一個專案：..." }}
        hero={hero}
      >
        <CaseSection id="cs-sec-overview" title="專案背景">
          {/* section content */}
        </CaseSection>

        <CaseSection id="cs-sec-research" surface title="研究洞察">
          {/* section content */}
        </CaseSection>

        <section id="cs-sec-process" className="cs-process-bg">
          <CaseHeading title="設計流程" tone="white" style={{ marginBottom: 8 }} />
          {/* 自帶背景 / 特殊 layout 的客製 section */}
        </section>
      </CaseStudyShell>
    );
  }
  ```
- **元件分工**：
  - `CaseStudyShell`：統一 `<main className="cs-page theme-xxx">`、`ScrollProgress`、`Navbar`、hero、TOC layout、next project nav、`Footer`。
    - **底部 next-nav 兩顆鈕（`.cs-next-btn-outline` / `.cs-next-btn-filled`，定義在 `styles/case-study.css`）必須對齊 design.md 的 `.button` 規格**。2026-06-09 修正：outline（「返回首頁」）原本誤用 `--ink` 字 + `--muted` 邊 + hover 轉 `--surface`/`--ink`，不符 secondary 規格；已改為 secondary 標準＝白底、`--muted` 字、`inset 0 0 0 2px var(--line-strong)` 邊，hover 字與邊轉 `--purple`（對齊 `.button-secondary`，見 home.css）。
    - **因為這兩顆鈕在共用 shell + `case-study.css`，所有走 `CaseStudyShell` 的新專案頁會自動套到正確樣式**；新增專案頁只要用 shell、不要在頁內另起手刻 secondary/primary 鈕。若真的要新做按鈕，一律比照 design.md §「按鈕」的 `.button-primary` / `.button-secondary` token，不要硬寫色值。
  - `CaseSection`：一般白底 / surface section；自動輸出 `.cs-heading` + `.cs-divider`。`surface` 會用 `.cs-section-surface`，`className` 可加局部 section class（例如 `cs-solution-section`）。
  - `CaseHeading`：只處理「section 標題 + divider」。深色背景 section 用 `tone="white"`；process / result / next 這類特殊 layout 不包 `CaseSection`，但可以直接用 `CaseHeading` 保持標題一致。
- **TOC 規則**：`tocSections` 的 `id` 必須和 section `id` 完全一致，案例頁內容 section id 維持 `cs-sec-*`，才能吃到 scroll-margin 與 scrollspy。
- **theme 規則 / 踩坑**：
  - 新專案主色只加 `.theme-ca { --text-heading: <主色>; }`，只讓大標 / section heading 用專案主色。
  - 不要讓整個 `.cs-page` 繼承 `--text-heading`，否則 Navbar 與未指定顏色的 hero 文字會一起變專案主色。
  - Navbar 是全站元件，顏色必須維持中性（目前 `.site-nav { color: var(--ink); }`）。
  - hero meta 裡的時間、角色、團隊、負責項目屬資訊文字，應該用中性黑（目前 `.cs-info-value` / `.cs-info-tasks span` 用 `var(--ink)`），不要跟專案主色。
- **移植 CA 時的做法**：先複製 Advantech 頁面的 `tocSections + hero + CaseStudyShell` 架構，再替換內容；一般 section 優先改成 `CaseSection`，只有自帶背景圖、特殊連線、特殊互動的區塊才保留原生 `<section>` + `CaseHeading`。

## 2026-06-08 About skill card 區域 token 清理

Files: `app/about-me/page.tsx`、`app/globals.css`、`design.md`。
- **問題**：About「專業技能」四張卡的主色 / hover tint / border tint 原本散在 `skillCategories` 資料陣列裡，用 inline CSS variables + icon inline color 寫入 TSX。雖然視覺可用，但資料層混入設計 token，後續新增技能分類容易複製 hex / rgba。
- **做法**：`skillCategories` 改成只掛 `toneClass`；色彩搬到 `.skill-category-card.is-*` variant，覆寫 `--accent-color`、`--bg-color-tint`、`--border-color-tint`。`.skill-card-icon` 改吃 `var(--accent-color)`，不再 inline color。
- **原則**：同款卡片不同主色 = CSS variant + 區域 token；TSX 資料陣列只保留內容與 class 名，不直接放 hex / rgba。

## 2026-06-08 按鈕跨斷點字級/高度收斂（48px / 16px 統一）

Files: `app/globals.css`、`design.md`（5.1）、`Memory.md`。
- **問題**：按鈕的字級和高度在斷點之間是臨時硬寫、互相打架，從沒有跨斷點規格。手機把字級跳到 **20px**、高度漂移成 **52 / 56 / 43px**（generic `.button` 52、`.button-secondary` 56、`.project-button` 43、Hero `.hero-actions .button` 全斷點 52 且字級 16↔20 亂跳）。
- **決策（Hming 拍板）**：md 按鈕（`.button` / `-primary` / `-secondary` / `.hero-actions .button`）與 lg（`.project-button`）**所有斷點統一 `48px` 高 + `16px`（`var(--fs-body)`）字，手機不放大**。
- **做法**：base `.button` 與 `.project-button` 明寫 `font-size: var(--fs-body)`（不靠瀏覽器預設繼承）；`.project-button` 補 `min-height: 48px` + `align-items: center`。各斷點覆寫用**行號精準替換**把 `52/56/43→48`、`font-size:20px→var(--fs-body)`（共 12 處 media 覆寫 + 2 處 base 插入）。
- **踩坑**：`min-height:52px;`/`font-size:20px;` 在 generic `.button`（≤768）和 Hero `.button`（≤768）**字串完全相同**，不能用 Edit 唯一匹配，必須用行號改。
- **驗證注意**：用 `getBoundingClientRect().height` 量 `.project-button` 會得 **46**（不是 48）——因為母層 `.project-card.card-hidden` 有進場動畫 `transform: scale(0.96)`，48×0.96≈46；看 `getComputedStyle().minHeight` 才是真值 48px。
- 驗證：build 過；Hero 桌機/平板(900)/手機(390) 兩顆按鈕等高一致；computed primary/secondary/project-button 均 48px / 16px。

## 2026-06-08 設計系統改 code 第二批

Files: `app/globals.css`、`design.md`、`design-audit-2026-06-08.md`、`Memory.md`。
- **刪除死 CSS / 未使用定義**：已移除 `.traits-panel` / `.traits-list` / `.traits-photo`、`.role-badge` / `.badge-*`、`.headline`、`.button-dark`、`.resume-link`、`.cs-section-dark`、`--text-on-dark-body` / `--text-on-dark-muted`。`--text-on-dark` 單數保留，因 `.cs-heading-white` 在 `/advantech` 仍有兩處使用。
- **token 對齊**：專案專屬 tone（advantech / laushu）已改為 `.tone-xxx { --tag-bg; --tag-text }` 區域 token，selector 統一不帶 `.project-card` 前綴；骨架文字與明確對應的紫色 / blue-soft / text-secondary 已換回 token。`cs-*` 單頁專屬色依 design.md 2.7 保留。
- **字級與按鈕**：section / About / Contact / 年份 rail 等一般骨架標題改用 `var(--fs-*)`；`.project-button` 字重改為 600。**Hero `.hero h1` 是首頁第一屏專屬例外，不套 `--fs-h1`**：桌機 48px、768–1024px 36px、<768px / 矮手機 28px，這是刻意設計。若 768–1024px 沒顯示 36px，要檢查檔案後段 `@media (min-width: 768px) and (max-width: 1024px)` 是否覆蓋前面的 `@media (max-width: 1023px)`。
- **圓角 / surface**：全站主要卡片收斂到 8 / 12 / 16；`--surface` 統一為較淺的 `#f9f9f9`，聯絡表單 input / textarea 背景使用 `var(--surface)`。`cs-*` 圖表局部小面板與 About 一次性卡片色保留例外。
- **M3 間距收斂（2026-06-08 已做）**：容器排版間距（padding / margin / gap）的 `14 / 18 / 6 / 7 / 9 / 26 / 44 / 84px` 約 50 處往 8px 系統值靠（多數 →16、`6/7/9→8`、`26→24`、`44→48`、`84→80`），含 `cs-*` 案例頁層（design.md 0.3 允許局部值，但收斂相容）。**刻意保留不動**：Hero/About 裝飾元件內部間距與絕對定位（`.cursor-tag` / `.session-*` / `.annotation-pin` / `.ai-widget` / `.window-bar` / `.growth-*` / `.wal-pencil` / `.menu-button` 漢堡幾何）、`::before` 自訂項目符號光學對齊 `margin-top:7px`、`clamp()` 響應式值——這些是視覺/幾何微調，非 8px 系統間距。**做法**：用 Python 依行號精準替換（不用 `replace_all`，避免誤傷字級 14px / 圓角 6px）。驗證：build 過、四頁桌機+手機 0 error。

## 2026-06-08 按鈕系統改 code（審查後第一批實作）

Files: `components/Navbar.tsx`、`components/Hero.tsx`、`app/globals.css`、`design.md`、`design-audit`。Hming 拍板的三項：
1. **導覽列「下載履歷」改純文字連結**：拿掉 `.resume-link` class（保留 PDF href + target/rel + onClick 關選單），變成跟設計案例/關於我/聯絡資訊同款 tab。→ `.resume-link` CSS 變未使用。
2. **Hero「查看作品」改紫色 primary**：`button-dark` → `button-primary`。`.button-primary`（原本全站沒用）終於 live；`.button-dark` 改成沒人用。「我的歷程」維持 secondary。
3. **`.button-secondary` 改成複製鈕（`.copy-btn`）的 outline 風**：白底 + `--muted` 灰字 + 細灰邊，hover 邊框與文字轉紫。用 inset box-shadow（非 border）維持「與 primary 外尺寸一致」。
   - **★現況（2026-06-09 對齊 design.md）**：邊框是 `inset 0 0 0 2px var(--line-strong)`（**不是早期的 `1px var(--line)`**——後來刻意把邊改成比文字 `--muted` 淡一階的 `--line-strong`、寬度 2px），hover 轉 `inset 0 0 0 2px var(--purple)`。以 `styles/home.css` 的 `.button-secondary` 與 design.md §按鈕為準。
   - 踩坑提醒：`.button-secondary` 有多處斷點覆寫（手機 3px、各 min-height），改樣式要一起掃過、別只改 base。
- **驗證**：dev server localhost:3000 已在跑；Playwright 截 `/`（Hero 兩鈕 + 導覽列）與 `/contact`（複製鈕 vs 新 secondary 外觀一致）皆正確、0 console error。screenshot 存在母資料夾 `verify-home-hero.png` / `verify-contact.png`。
- design.md 5.1/5.3 與 audit L3 已同步成新現況。

## 2026-06-08 設計系統審查 + design.md 對齊 code

- 產出 `design-audit-2026-06-08.md`：比對 design.md ↔ globals.css(7666 行, 293 處寫死 hex) ↔ 元件，找到 19 條不一致（高 8 / 中 8 / 低 3）。
- **重寫了 `design.md`**（依 Hming 決策）：
  - 字級以 code 為準——**全站最大字級就是 32px，沒有 40px**；舊文件宣稱 H1 40px 是錯的。
  - **Roboto Condensed 是幽靈字型**：layout.tsx 從未 import、globals.css 0 處使用。全站只有 Space Grotesk。已從文件刪除。
  - 按鈕補上 **sm(38px,導覽列) / md(48px,預設) / lg(全寬卡片CTA)** 三階層 + 語意三層正交。
  - 輸入框(4.4)整段重寫為 floating label 實況（bg #F9F9F9 / radius 12px / 外環 focus），舊文件 #f2f2f7/8px/inset 已過時。
  - 補 `--text-*` 文字色階梯 + `.theme-xxx` 分層 theming 進文件第 2 章。
  - 新增 **2.0 token 化原則**：token 價值＝重複次數 × 會不會改；**token ≠ 全域**。三層規則：跨頁共用→全域 :root token；單頁內用 ≥2 次→**區域 token**（scope 在 .theme-xxx / .tone-xxx）；只用一次→直接寫 hex。
  - tone 色決策修正：前 4 個重用既有 accent 全域 token；專案專屬 tone（advantech/laushu）只為單一專案而生→**做成「區域 token」**（`.tone-xxx { --tag-bg; --tag-text }`），不進全域。About 兩張卡片色只用一次→**保留 hex**（不做 token）。編號重梳（修掉重複的兩個 2.4）。
- **關鍵觀念（Hming 提出、已釐清）**：design system 規則只對「會重複用 + 同資訊層級」的東西才套；單一專案專屬的色不必塞全域 token，但若那頁內重複用，做「區域 token」最方便。
- **第二輪完整掃描重寫（同日，Hming 要求徹底掃整個專案）**：抽樣掃描有漏，改成完整掃 4 頁路由 + 25 元件 + 740 條 class + 全部 token。補抓到的脫節：① 斷點全錯（文件 ≤809/810，實際主斷點 768 + 640/440/360 + 桌機 1439/1100/900）② `--fs-*` 是響應式 token（768/360 重定義），文件當靜態 ③ 字重缺 700（全站用最多，65 處）④ 圓角混亂（pill 用 999/200/100/60/1000 五種；卡片 8/10/12/16/20）⑤ 一堆 token 用了沒記（hero 裝飾 scale 全套、--cs-tl-*、--mobile-nav-*、skill-card 的 --accent-color 區域 token、--year-rail-sticky-top）⑥ section 6「只用黑陰影」與 code 矛盾（案例頁有研華藍/紫有色陰影）⑦ **cs-* 佔 41%（307/740 條）是 advantech 單頁專屬 layout、不屬可複用系統**。
- **重寫後 design.md 結構**：新增「0. 專案地圖（4 頁+元件+兩層結構）」「4. 圓角系統」「8. Token 總清單」；修正字級(響應式)/字重(補700)/斷點/陰影。詳見 design-audit 附錄。
- **踩坑（重寫文件時）→ 錯誤做法：沿用舊 design.md 的「角色/用途」描述、假設它還成立。正確做法：每個 class 的「用在哪」描述都要 grep tsx 確認該 class 還被 render。原因：抓到兩組已被移除卻仍寫在文件的死 CSS**：① `.traits-panel`/`.traits-list`/`.traits-photo`（舊「個人特質區塊」，brown 色）已無人 render；② `.role-badge`/`.badge-designer/coordinator/engineer`（舊文字版角色徽章）被 AvatarProfile.tsx 圖片版 WobbleBadge 取代。連帶：brown 真實用途已從「個人特質區塊」變成「tone-brown 專案標籤色」；角色徽章從首頁 Hero 搬到 About 頁。design.md 已修正。
- **「描述正確性驗證」pass（逐一 grep tsx 確認每個 class 還被 render）再抓到**：① **Hero 兩顆按鈕映射寫反**——實際「查看作品＝button-dark（黑填色）」「我的歷程＝button-secondary（灰描邊）」② `.button-primary`（紫填色）全站沒用，實際紫 CTA 來自 resume-link/project-button/submit-btn 直接用 --purple ③ `.cs-section-dark`(#131b24) 未 render、目前無深色 section ④ `--text-on-dark-body/-muted` 兩 token 無人消費 ⑤ `.headline` 死 CSS。全部已修進 design.md + 報告 L3。驗證為正確的：8 個 tone（動態 className）、project-card 系列、導覽/表單/skill-card、cs 骨架、theme-advantech、about-window、submit-btn=紫、Hero 裝飾全在。
- **本次只改文件、沒動 code**。design.md 內標 🔧 的項目＝規格已定、code 待對齊，集中在 audit 報告的「改 code 清單」：① 293 處 hex→token（已有全域 token 卻寫死的）② --fs-* 字級 token 落實（現 fs-h1 全檔只用 1 次）③ 後 4 個 tone 改區域 token + selector 統一 ④ project-button 字重 500→600 ⑤ resume-link 圓角 100px→200px。**Q4 待 Hming 決定要不要另開 session 真的改 code。**
- ⚠️ 輸入框那段對應 `components/Contact.tsx` 的未提交改動，表單若再調要同步 design.md 4.4。

## 2026-06-06 About-Me refactoring & SEO progress

- Page: `/about-me`
- Main files touched:
  - `app/about-me/page.tsx`, `app/about-me/AnimatedContent.tsx` (new), `app/about-me/EducatorMasonry.tsx` (new)
  - `app/globals.css`, `app/layout.tsx`, `components/YearRail.tsx`, `components/AvatarProfile.tsx`
  - `AGENTS.md`, `Memory.md`
- Key refactoring and optimizations:
  - **Component Extraction**: Split client-side animations and the educator Bento grid from `about-me/page.tsx` into `AnimatedContent.tsx` and `EducatorMasonry.tsx`.
  - **Content & Experience Correction**: Updated Advantech intern experience details (dates to 2024.06 - 2024.08, points to stakeholder approvals/chatbot proposal), and NCCU educator course names.
  - **Scroll active rail optimization**: Refactored `YearRail.tsx` to use `IntersectionObserver` for fade-in animations. Shifted scroll spy detection to center-of-viewport alignment for accurate active year toggling.
  - **SEO & Icons**: Added standard SEO metadata, OpenGraph, Twitter cards, and brand logos/favicons in `app/layout.tsx`.
  - **Code Cleanup**: Deleted the unused component `DecryptedText.tsx` and removed completed visual layout TODO comments in `AvatarProfile.tsx`.
  - **Standardized Communication**: Added a dialog response format guideline in `AGENTS.md` to ensure progress reporting consistency across sessions.
- Verification:
  - `npm run build` passed successfully.
  - Local dev server running via `npm run dev` at localhost:3000.

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

### 「最終 3 種 feature」流程連接線（`.cs-sol-fconn`）間距踩坑（2026-06-19）

- **垂直間距 ≈ S 曲線（connector SVG）高度，而高度 = 兩張圖中心的水平跨距 ×(211/482)**（`AlarmLevelDemo.tsx` 的 `connectorOneSvg`）。所以「圖之間的上下間距」其實是被「兩張圖左右錯開多少」決定的，**不是 margin**。
- **踩坑**：把 Feature 標題卡改全寬（row0 `flex-direction: column`）後，img01 變全寬置中（中心 50%），與側邊的 img02 水平跨距變小 → 第一條 S 曲線變矮 → 第一條間距被壓小（≥1440 才會發生；1512≈77、1920≈103，其他線 153/207）。
- **走過的彎路（都別再試）**：① 給第一條線加固定 `margin-top` → 差距隨內容寬縮放（1512 差 76、1920 差 104），固定值會跑掉。② 只在 ≥1440 把 img01 靠右 `width: calc(70%-40px); align-self:flex-end` → 能讓間距統一，但 img01 左邊留一片空白、視覺不完整，Hming 否決。
- **最終正解（結構性，2026-06-19 採用）**：把 Feature 標題卡（`.cs-sol-fc`）**移出第一列**，當 `.cs-sol-fgroup` 的直接子元素 → 全寬區塊排在最上方（`.cs-sol-fgroup` 是 `display:contents`，卡片等於 `.cs-sol-block` flex column 的子項，自動全寬，與第一列間距用 block 的 `gap:28px`）。第一張圖則改成**正常的 mid row**：`.cs-sol-fr.cs-sol-fr-mid` 內放「說明卡 `.cs-sol-fnote`（左，30%）＋ 圖 `.cs-sol-fimg`（右，flex:1≈70%）」。如此**所有列都是 mid row、同構**，img01 在右側、跨距與其他線一致 → 間距自動統一且隨寬度正確縮放（1280=159 / 1512=153 / 1920=207）。
- **DOM 重構連帶要改的事**：① `:nth-child` 連接線定位選擇器會位移（卡片變第 1 個子元素 → 第一列變 `nth-child(2)`、第一條線變 `nth-child(3)`）：`@media(1025–1139)` 與 `@media(1025–1439)` 兩處原本 `.cs-sol-fr:first-child + .cs-sol-fconn` / `:nth-child(2)` 都要改成 `:nth-child(3)`。② 新 note 文案要進 `i18n.ts` 的 `en` 對照表（漏了英文頁會顯示中文）。③ JS（`AlarmLevelDemo.tsx`）以 `querySelectorAll('.cs-sol-fr')` / `.cs-sol-fconn'`) 取列與線、不靠 nth-child，故不受影響。
- **編輯踩坑**：移除第一列 `<div class="cs-sol-fr">` wrapper 時，記得**同時刪掉它的收尾 `</div>`**，否則 div 不平衡 → SWC `Expression expected` build error。

### overflow / 捲動踩坑

- **`overflow-x: auto` 會讓 `overflow-y` 被計算成 `auto`**（CSS 規範），導致上下方向也裁切。最高那欄的底部卡片下邊框、以及捲動到底時最右卡片右邊框都會被裁。解法：`.cs-ds-flow-cols { padding: 4px }`（四邊留空隙）。
- **SVG 要跟卡片一起捲**：把 svg + cols 包進 `.cs-ds-flow-inner`（width:100%，小螢幕給 min-width），svg 用 `100%`＝inner 全寬；JS 量測基準改成 inner 而非外層捲動容器，否則捲動時線對不上。

### 水平捲動斷點

- 流程圖 **≤809px 改水平捲動**（像「設計流程」），不收單欄。`.cs-ds-flow-inner { min-width: 607px }` ＝ 809px 視窗時的內容區寬。
- **內容區寬公式（2026-06-19 更新，見下方「頁面留白變數化」）**：一般內容使用 `--page-gutter: max(clamp(48px, 8vw, 120px), calc((100vw - 1920px) / 2))`，最大內容寬 1920px；navbar / footer 不算內容，navbar 維持自己的貼邊公式 `clamp(48px, 8vw, 120px)`。案例頁 TOC 顯示時會局部覆寫成至少 240px gutter。手機 ≤768 另用較小 gutter。算斷點門檻請以新值為準。
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

- **專案卡 CTA 全站統一 `--purple`**，不再跟 tone 走。專案個性只保留在標籤文字色＋標籤底色。
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

- 2026-06-19 更新：一般內容 section 統一使用 **`--page-gutter: max(clamp(48px, 8vw, 120px), calc((100vw - 1920px) / 2))`**，所以所有顯示內容（不含 navbar / footer）最大寬 1920px。
- Navbar 不吃 `--page-gutter`，維持自己的原本公式 `clamp(48px, 8vw, 120px)`，避免首頁和 nav 為了專案頁 TOC 變窄。
- 案例頁在 TOC 會顯示的桌機寬度（≥1301px）局部覆寫 **`--page-gutter: max(240px, calc((100vw - 1920px) / 2))`**，左右至少保留 240px 給 TOC；1300px 以下 TOC 隱藏，沿用一般內容 gutter。
- 首頁專案區、Contact 內容區、一般頁面 section 都要吃一般 `var(--page-gutter)`，不要再另外寫 1200px / 1440px 內容上限。未來新增任何頁面也套這條規則，除非是文字段落、表單欄位、TOC 這種局部可讀性限制。
- **手機保護**:`@media (max-width: 768px)` 內把 `--page-gutter` 覆寫成 `clamp(20px, 6vw, 48px)`；首頁專案列表 mobile 仍可用自己的 24px 邊距維持卡片舒適度。
- 內部元素盡量用 flex/grid/百分比，padding 一改就自動縮，**不用逐一手動調**。

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

## 2026-06-09 AvatarProfile ripple 點擊/hover 消失（Framer Motion variant 踩坑）

- **症狀**：`components/AvatarProfile.tsx` 的擴散 ripple 在點擊（觸控 press interaction）或 hover 時會消失。
- **錯誤做法**：以為是顏色或 opacity 問題。**正確根因**：兩個 ripple 環的 `ring1Variants` / `ring2Variants` 只定義了 `animate` 狀態、沒有 `hover`。Framer Motion 的 variant label 是從父層往下傳遞——根容器切到 `"hover"` 時，子層找不到對應 variant，那個 `repeat: Infinity` 的無限動畫就被中斷 → ripple 消失。
- **正確做法**：把無限迴圈抽成共用物件（`ring1Loop` / `ring2Loop`），同時指給 `animate` 與 `hover`，讓父層切 hover 時動畫不中斷；顏色切換（白→黃）本來就由另一個有 `hover` 的 `rippleVariants` 負責。
- **通用教訓**：用 variant label 驅動的子層無限動畫，**每個會被父層切到的 label（animate / hover / tap…）都要定義**，否則沒定義的 label 會把動畫停掉。

## 2026-06-09 首頁 hero sticky ≤768 不對稱（about.css 漏規則蓋過 home.css）

- **症狀**：首頁 6 張 hero sticky 在 ≤768px 變成「左低右高」的單調階梯，而非對稱扇形（綠↔橘、藍↔粉、黃↔紫 應各自等高）。
- **根因（refactor 漏網）**：globals.css 以 `@import` 依序載入 `home.css` 然後 `about.css`（about 在後）。`4639a83`「Refactor global CSS into scoped style files」把舊版 globals 的整段 hero RWD 規則**誤留在 about.css**，裡面有舊的散開式 `.hero-sticky-1..6`（`%` + `clamp(svh)`）。因 about.css 後載入、選擇器同特異度，就**蓋掉 home.css 新版對稱扇形**（`.hero-sticky-idea/data-storage/...` 具名類）。`/about-me` 根本沒用這些 class，純屬 leak。
- **抓法**：用 `getComputedStyle().top/left` 量到的值是分數（如 idea top=55.008px = `clamp(44px,-5.76+0.072*100svh,64px)`），不是具名規則的 0/21/42px；`rotate` 卻對（具名類有、數字類沒有）→ 代表 top/left 被另一條同名數字類規則蓋掉。再用 `document.styleSheets` 走訪列出哪個檔／media 設了 top/left，定位到 `about.css`（Next.js bundle 名 `layout.css`）。
- **修法**：刪掉 about.css 兩個會在 ≤768 命中的 block（`@media (max-width:1023px)` 與 `@media (max-width:768px)`）裡的 `.hero-sticky-1..6` 覆寫，讓 home.css 的對稱扇形勝出。游標/底部裝飾的 leak 暫留（沒被抱怨、且現況靠 about.css 版本在 render，動了反而有風險）。
- **通用教訓**：① 多個全域 CSS 用 `@import` 串接時，**後載入的檔案會用同特異度蓋前面的**——scoped 檔之間別出現重複選擇器。② 首頁 hero 的 RWD 真正權威應只在 `home.css`；about.css 只該留 `/about-me` 自己的 class。③ debug「值被神秘覆寫」先用 `styleSheets` 走訪列出所有命中規則的來源檔＋media，不要只看單一檔案。
- **待辦（未做，低優先）**：about.css 其實還殘留整套 home hero 的 leak（`.hero`/`.hero-copy`/`.hero-cursor-*`/`.hero-toggle`/`.hero-frame-large`/`.hero-ai-widget`/`.hero-wal-pencil` 等，跨 min-1024 / max-1023 / max-768 三個 block）。徹底乾淨應把這些全搬回 home.css 或刪除，讓 about.css 真正只管 /about-me。需逐斷點驗證首頁不回歸，適合另開 session。

## 2026-06-09 根治 about.css 整套 home-hero leak（接續上一條的待辦）

- **做了什麼**：把上一條待辦的「整套 home hero leak」徹底清掉。約刪 about.css 238 行（1889→1651），home.css +54 行。原則：home.css 成為首頁 hero 唯一權威，about.css 只留 `.about-hero` 與 `.hero-badge`/`.hero-badge-shimmer-wrap`（/about-me 自己有用到的 class）。
- **關鍵判斷：刪 vs 搬**。逐斷點用 `getComputedStyle` 對比兩檔後決定：
  - **桌機 ≥1024**：about 的 `@media (min-width:1024px)` 才是真正在 render 的 hero 文字版面（`max-width:1500px`、`padding:clamp(280px,48vh,500px)…`、`justify-content:flex-start`），home.css base `.hero` 只有 `center`/`120px`（不足）→ **必須把整塊搬進 home.css**（不能只刪），否則桌機 hero 退回置中、爆掉。
  - **平板 768–1023**：about 的 `max-1023` 各值與 home.css `768-1024` block **完全相同** → 直接刪 about 的，home.css 接手，零變化。
  - **手機 ≤768**：home.css 是新版 `.hero-bottom-group` 框架設計（4 個底部裝飾當框架子元素），但被 about 的 `max-768` 舊版逐元素絕對定位（`top:clamp(504~652px)`）**蓋掉而失效**——量到 4 個裝飾 rectTop≈1231–1328，整個掉到 hero 外、溢進 projects 區。刪掉 about 的就讓框架設計生效，裝飾回到 hero 內（rectTop≈662–824）。
- **踩坑：刪完手機 hero 少了 `margin-top:80px`**。`margin-top:80px`（把 hero 推到 fixed nav 下方）原本**只**存在於 about 的 `max-1023`（涵蓋 ≤768），home.css 的 `max-768` block 沒有。刪掉後手機 hero `rectTop` 從 80→0，頂部 cursor tags（engineers/pm）被 80px 高的 fixed nav 蓋住（rectTop 16/35）。**修法：補 `margin-top:80px` 進 home.css 的 `@media (max-width:768px) .hero`**。教訓：刪除「後載入檔的覆寫」前，先確認被覆寫的選擇器在權威檔裡**每個屬性都有對應**，漏一個（這裡是 margin-top）就會在刪除後露餡。
- **驗證**：dev server localhost:3000，playwright 量三斷點 computed top/left + rect。桌機/平板 hero 與裝飾數值**前後完全一致**；手機裝飾從溢出修正回 hero 內、cursor tags 清開 nav。home（桌機/手機截圖）與 /about-me（桌機/手機）皆正常，0 console error。
- **結果**：about.css 現在 grep 不到任何 `.hero`/`.cursor-tag`/`.focus-container` 規則（只剩 `.about-hero` 與 `.hero-badge*`）。首頁 hero RWD 三斷點權威全部收斂到 home.css。

## 2026-06-09 根治 about.css「首頁 projects」leak（第二輪同類清理）

- **做了什麼**：把首頁專案區（`.projects-section`/`.section-heading*`/`.project-tabs*`/`.projects-list`/`.project-card*`/`.project-media`/`.project-image`/`.project-info`/`.project-meta`/`.project-logo-wrap*`/`.project-title*`/`.project-description`/`.project-tags*`/`.project-scrim`/`.project-button`）的**全部響應式規則**從 about.css 搬回 home.css。涵蓋 `max-1023`（`.project-card{min-height:500px}`）、`max-768`（整段流式卡片佈局）、`max-440`（資訊卡改置中直列）三個斷點。
- **為何是「搬」不是「刪」**：grep 證實 home.css 只有 projects 的 **base + `prefers-reduced-motion`** 規則，**所有手機/平板響應式規則只存在於 about.css**——刪掉首頁專案區的 RWD 會全毀。和上一輪桌機 hero 同理：about.css 是唯一來源時必須搬。搬移時**原樣保留 about.css 用的斷點（1023/768/440）與先後順序**（1023→768→440，讓 ≤768 的 `min-height:0` 蓋過 ≤1023 的 500px、≤440 的置中蓋過 ≤768 的 grid），不轉成 home.css 的斷點方案，確保零變化。
- **驗證**：localhost:3000，量 computed + 截圖。<440 置中直列（logo/標題置中、按鈕滿寬）✓；440–768 grid（`.project-meta` `grid-template-columns:134px …`，logo 左、標題/tags 右）✓。/about-me 不受影響、0 console error。about.css 1889→1470 行。
- **本輪範圍**：只做首頁 projects（Hming 選的）。**about.css 仍殘留其他同類 leak（未做）**：① 共用 `.site-nav`/`.nav-*`/`.menu-button`（行動版 nav，全站共用，目前只存在 about.css→該搬 globals.css 或新建 nav.css）② 共用 `.button`/`.submit-btn`/`.project-button` 的尺寸規則 ③ contact 頁 `.contact-*` ④ `.site-footer`/`.social-links` ⑤ 案例頁 `.cs-*`（27 條，該搬回 case-study.css）。要徹底乾淨可再開一輪逐類處理。

## 2026-06-09 第三輪同類清理：nav / footer / contact leak 各自歸位

- **關鍵發現：共用 base 規則住在 `tokens.css`**，不是 globals.css（globals.css 只有 `@import`，沒自己的規則）。`tokens.css` 除了 design token，也放了全站共用的 base：`.site-nav`(:163)、`.nav-links`(:210)、`.site-footer`(:280)。所以上一輪「nav 落點待決定」其實有現成答案＝tokens.css，不必新建檔。
- **做了什麼（3 類各歸其位，皆「搬移」非刪除）**：
  - **共用 nav + footer**（`.site-nav*`/`.nav-top`/`.menu-button`/`.nav-links*`/`.site-footer*`/`.social-links`）的 `max-768` 行動版規則 → 併進 `tokens.css` 既有的 `@media (max-width:768px)` block（base 就在同檔上方，cascade 不變）。
  - **contact 頁**（`.contact-panel-band`/`.contact-info-header*`/`.contact-method-item`/`.method-value`/`.contact-card`）`max-768` → append 進 `contact.css`（base 在該檔）。
  - 從 about.css 的 `@media (max-width:768px)` 移除以上三群（保留 `.hero-badge*`、共用 `.button/.submit-btn` 尺寸、`.about-*`）。
- **驗證**：localhost。手機 nav 點漢堡展開 → height 336px、links 直列、opacity/pointer 正常、X icon ✓；contact 頁 footer `column-reverse`、`.contact-panel-band`/`.contact-card` padding 正確、表單與 social links 正常 ✓。0 console error。about.css 1470→1371 行（三輪共 1889→1371）。
- **cs-\* 這輪故意不做（有 cascade 陷阱）**：`.cs-sol-*`/`.cs-alarm-*`/`.cs-comp-ems-*`/`.cs-iv-*` 的 base 全在 **`case-study-advantech.css`**（不是 case-study.css，後者 0 條），而 advantech 頁是「globals.css 之後**再單獨 import** `case-study-advantech.css`」。所以 about.css 的 cs-* 媒體規則目前**載在 advantech.css base 之前**——同斷點下後載入的 advantech base 可能反而蓋過 about 的 override（about 的 cs-* 可能根本是死碼）。要處理得先確認：搬進 advantech.css 後放 base 之後會不會「啟用」原本失效的 override 而改變畫面。屬於需逐斷點實測的獨立題，適合另開 session 專做。
- **約束未處理**：共用 `.button`/`.button-secondary`/`.submit-btn`/`.project-button` 的響應式尺寸（base 分散在 home.css 與 contact.css），落點仍曖昧，暫留 about.css。

## 2026-06-09 第四輪同類清理：Advantech cs-* / button 尺寸歸位

- **cs-* cascade 解法**：把 `about.css` 殘留的 Advantech responsive 規則搬到 `case-study-advantech.css` 前段、放在 Advantech base 之前，維持原本「先套 responsive、後由 route base / 後段 media 覆蓋」的順序，避免搬到檔尾後意外啟用舊覆寫。`about.css` 現在 grep 不到任何 `.cs-*`。
- **button 尺寸歸位**：首頁 `.button` / `.project-button` responsive 規則歸 `home.css`；`.submit-btn` 歸 `contact.css`；共用 case-study footer `.cs-next-btn-*` 歸 `case-study.css`。全部依 design.md 維持桌機 52px / 平板 48px / 手機 44px，手機字級 `--fs-sm`。
- **驗證**：`npm run build` 通過；Playwright 實測 `/advantech` 1440 / 1024 / 1023 / 900 / 390、`/contact` 900 / 390、`/` 390、`/about-me` 390，皆無水平溢出；Advantech route CSS 不會載入 `/about-me`。

## 2026-06-09 案例頁預抓首頁造成未使用 preload 警告

- **症狀**：正式站 `/advantech` 的 console 出現首頁 Hero 裝飾素材（`badge-icon.png`、`claude-icon.svg`、cursor / toggle / session icons 等）「preloaded but not used」警告；案例頁本身沒有使用這些圖片。
- **根因**：Next.js `<Link>` 預設會自動 prefetch 目標 route。案例頁 Navbar Logo、Navbar「設計案例」與底部「返回首頁」皆指向 `/`，因此背景預抓首頁，連帶 preload 首頁 Hero 素材。
- **正確做法**：對跨頁回首頁的 `<Link>` 加 `prefetch={false}`；保留 About / Contact 等其他 route 的正常 prefetch。使用者真正點回首頁時再載入首頁內容。
- **驗證**：localhost `/advantech` 的 `link[rel="prefetch"]` 為 0，preload 清單不再包含任何首頁裝飾素材；「設計案例」仍可正常前往 `/#projects`，錨點停在 Navbar 下方，首頁 Hero 裝飾正常渲染。

## 2026-06-14 Crypto Arsenal 平倉/TPSL 步驟圖重出（帶紅色 cursor）+ Binance 4 步排版
- **背景**：ResearchSection 的對比矩陣（`closeMatrix`/`tpslMatrix` in `app/crypto-arsenal/data.ts`）每格是 `research/steps/*.webp`，從 Figma FigJam board 匯出（close board node `1232:7619`、tpsl board node `1232:7826`，fileKey `1sIHQbXlN7S5LBU91Pn7IY`）。需求：重出 16 張圖且**畫面要含紅色 cursor**（`#FF2D55` 游標 +「點擊按鈕」紅標）。
- **關鍵踩坑 — cursor 在 Figma 的兩種結構不同，匯出方式也不同**：
  - **close board**：每張截圖 + cursor 同屬一個 Group（`1299:246xx`）。→ 直接 `download_figma_images` 匯出 **group node**（pngScale 2）即內含 cursor，最乾淨。
  - **tpsl board**：截圖是裸 `RECTANGLE`，cursor 是**獨立 sibling 的 `Notes/Hover` frame**（非同 group）。匯出 rectangle 不含 cursor。→ 分別下載 6 張 rectangle + 6 個 cursor frame，再用 **Python PIL `alpha_composite`** 依 Figma 座標差 `(cursorX-rectX, cursorY-rectY)*2` 貼上。對齊誤差僅 ~2px（shadow blur），可接受。
  - 工具：本機無 cwebp/magick，用 **Pillow（PIL 12.x）** crop+轉 webp（quality 88, method 6）；`sharp` 也在。
- **交易所對應（別搞錯）**：close board 三列上→下＝OKX / Bybit / Binance；tpsl board 三列上→下＝**OKX / Binance / Bybit**（Binance 在中間，靠 desc「數量是全倉無法設定」辨識）。data.ts 列序則是 Binance / Bybit / OKX。
- **Binance 平倉 4 步排版（Hming 拍板「維持 3 欄」）**：Binance 比別人多一個「輸入金額/數量」中間畫面。做法：`MatrixCell` 加 `extraImg`/`extraAlt`/`note`，把多出的 `close-binance-1b-amount.webp` 塞進步驟①格內**上下堆疊**（`.ca-matrix-cell-stack`），其他兩家不動，保持同欄可比對。
- **欄號改 ②a/②b 表「二擇一」非先後**（Hming 指定）：限價/市價是 alternative。`ResearchSection.tsx` 解析 regex 改 `^([①-⑨])([a-z]?)\s*(.*)$`，badge 顯示 `2a`/`2b`；`.ca-matrix-step-num` 由固定圓形改 `min-width:18px;padding:0 5px;border-radius:9px`（單字仍近圓、雙字成膠囊）。i18n key 同步改 `②a/②b ...` 並補 note/synthesis EN。
- **驗證**：localhost:3000（既有 server，未重啟）playwright 量 zh-TW/en、桌機 1440 + 手機 390。badge 1/2a/2b、堆疊格+note、sticky 交易所欄、水平捲動皆正常；22 張矩陣圖 0 broken，新 amount 圖 1493×960，0 console error。
