# 新增 Case Study Checklist

新增一個案例頁時照這份走。目標：**不需要修改 Advantech 的 page 或 CSS**，每個新案例都從共用骨架長出來。

## 1. 專案資料（唯一來源）

在 `data/projects.ts` 新增一筆 `ProjectSummary`：

- `slug` 是這個案例的唯一識別字（例：`crypto-arsenal`），會同時當 route、CSS scope、圖片資料夾名稱。
- 填好 `title` / `date` / `cover` / `tags` / `category` / `status` 與 `nextProjectSlug`。
- 首頁卡片、metadata、next-project 導航全部讀這份；**不要再在頁面裡手寫一次**。
- 還沒上線就設 `status: "coming-soon"`、先不要建 route。

## 2. Route 與 route CSS

- 建 `app/<slug>/page.tsx`。
- 檔案佈局見下方「標準檔案架構（必遵守）」。
- 建 `styles/case-study-<slug>.css`，**只在這支 page.tsx `import`**（route-scoped，不要進 `app/globals.css`）。
- 不要把新案例的 CSS 寫進 `case-study.css`（那是共用骨架）或別的案例 CSS。
- **把新的 route CSS 登記進 `scripts/arch-audit.py` 的 `route_css_rules`**（加一行：CSS 路徑 → 允許 import 的檔案）。沒登記的話 `npm run audit:architecture` 不會檢查它，隔離規則等於沒生效（2026-07-05 audit 就是漏了 DS case study 才補這條）。

## 標準檔案架構（必遵守）

```text
app/<slug>/
  page.tsx          ← 只做 generateMetadata、tocSections、CaseStudyShell 組裝；不含 section 實作與長常數
  data.ts           ← 跨 section 共用的資料常數才放這；單一 section 專用常數留在該 section（可省略）
  i18n.ts           ← zh-TW → en key map，export translate<Name>(locale, text)
  i18n-server.ts    ← 包裝 getLocale()，回傳 { locale, t }
  sections/
    index.ts        ← barrel export
    HeroSection.tsx
    XxxSection.tsx  ← 一個 section 一檔；預設為 async server component，所有可見文字經 t() 翻譯
  components/       ← 案例專屬視覺或互動元件（diagram、demo、lightbox 等）
styles/case-study-<slug>.css  ← route-scoped theme CSS，只在該 page.tsx import
```

硬規則：

1. section 內文字一律走 `t()`（由 `i18n-server.ts` 提供）；不得使用 `localizeTree` 類的遞迴 JSX 翻譯。
2. zh-TW 原文字串是 i18n key：同一句話在 `.tsx`、`data.ts`、`i18n.ts` 必須一字不差。
3. 通用版型優先使用 `components/case-study/` 共用元件；route CSS 只調 `--cs-*` token 與案例外觀，不重寫共用骨架。
4. `page.tsx` 只負責 metadata、TOC、專案資料與 `CaseStudyShell` 組裝；出現 section JSX 實作或大型常數就必須拆出。

## 3. 用共用骨架

- 頁面用 `CaseStudyShell`（`components/case-study/`）包起來，傳 `theme` / `hero` / `tocSections` / `nextNav`。
- Hero 用 `CaseHero` + `CaseInfoGrid`，route 只提供 cover、meta、title 與 info items；不要重新手刻 `cs-hero-*` / `cs-info-*` DOM。
- 一般卡片、卡片集合與圖片外框優先用 `CaseGrid` / `CaseCard` / `CaseMedia` / `CaseMetricGrid`；route CSS 只用變數調整專案色、邊框、陰影或特殊內容排列。
- next-project 用 `getNextProject(slug)`、專案資料用 `getProjectBySlug(slug)`，找不到會直接報錯，不會靜默顯示錯資料。
- 共用骨架類（`.cs-page` / `.cs-section` / `.cs-heading` / `.cs-toc-*` / `.cs-next-*` / `.cs-hero-*` / `.cs-info-*` / `.cs-grid*` / `.cs-card*` / `.cs-media*`）已在 `case-study.css`，直接用，不要重寫。

## 4. CSS scope 慣例（重要）

- `CaseStudyShell` 的 `theme` prop 會在頁面根節點掛上 `theme-<slug>`（例：`theme-advantech`）。
- **這支案例 CSS 裡所有「私有」selector 一律以 `.theme-<slug>` 開頭**，例如：
  ```css
  .theme-advantech .cs-role-card { ... }
  .theme-advantech .cs-sol-board { ... }
  ```
  這樣即使未來 import 方式改變，私有規則也不會污染其他案例。
- 區域色票放 `.theme-<slug> { --... }`，不要進全域 `:root`，**也不要在 `styles/tokens.css` 裡另建一份 `.theme-<slug>`**（theme 唯一定義處就是這支 route CSS；見 `design-system/08-ai-implementation-rules.md §3`）。
- `@media` 斷點邊界照 `08-ai-implementation-rules.md §3「Breakpoint boundary rules」`：mobile 用 `max-width: 768px` / `min-width: 769px`、tablet 用 `max-width: 1023px` / `min-width: 1024px`，同檔不要混用不同邊界值。
- 共用骨架類（上面 §3 那些）**保持裸寫、不要冠 `.theme-<slug>`**，它們屬於 `case-study.css`，加 scope 反而是錯誤歸屬。需要調共用元件的 RWD，改 `case-study.css`，不要在案例 CSS 裡複製覆寫。

## 5. Section 元件

- 一開始就依 TOC 拆成 `app/<slug>/sections/`，一個 section 一檔；`page.tsx` 只做組裝。
- 有 state / effect / DOM query 的互動元件才加 `"use client"`，放 `app/<slug>/components/`；section 預設維持 server component。
- **只在「同一個 pattern 第二次出現」時，才把它抽成 `components/case-study/` 的共用 primitive**（如 `CaseHero` / `CaseGrid` / `CaseCard` / `CaseMedia` / `BeforeAfter`）。只服務單一案例就先留在該案例內，不要過早抽象。

## 6. 圖片

- 放 `public/projects/<slug>/`，依用途分 `cover / research / solution / result`。
- 大圖先壓 WebP / AVIF，真正需要放大的才保留高解析。

## 7. 設計系統同步

- 如果新增案例時有補新的共用 token、共用元件、button state、表單狀態或其他可複用規則，**完成案例頁後要同步更新 `/design-system` 頁**，包含對應展示區與 Token Reference。
- `/design-system` 是對外文件頁，展示的是已落地的系統內容；不要把案例專屬暫時性樣式誤塞進去。
- Token Reference 以 `styles/tokens.css` 為準。新增 token 時，除了在 code 定義，也要補進設計系統頁的 reference 表。

## 8. 驗收

- `npm run build`、`npm run lint`（0 error）。
- `npm run audit:architecture`：確認 route CSS isolation、case-study CSS inventory、theme root guard。
- `1440 / 1024 / 768 / 390` 四斷點：無水平溢出、console 0 error、TOC scrollspy 正常。
- 改新案例的 CSS / page **不會動到** Advantech 或其他案例。
- 在 `/about-me`、`/contact`、首頁確認沒有載入這支案例的 route CSS。
