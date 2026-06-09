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
- 建 `styles/case-study-<slug>.css`，**只在這支 page.tsx `import`**（route-scoped，不要進 `app/globals.css`）。
- 不要把新案例的 CSS 寫進 `case-study.css`（那是共用骨架）或別的案例 CSS。

## 3. 用共用骨架

- 頁面用 `CaseStudyShell`（`components/case-study/`）包起來，傳 `theme` / `hero` / `tocSections` / `nextNav`。
- next-project 用 `getNextProject(slug)`、專案資料用 `getProjectBySlug(slug)`，找不到會直接報錯，不會靜默顯示錯資料。
- 共用骨架類（`.cs-page` / `.cs-section` / `.cs-heading` / `.cs-toc-*` / `.cs-next-*` / `.cs-hero-*` / `.cs-info-*`）已在 `case-study.css`，直接用，不要重寫。

## 4. CSS scope 慣例（重要）

- `CaseStudyShell` 的 `theme` prop 會在頁面根節點掛上 `theme-<slug>`（例：`theme-advantech`）。
- **這支案例 CSS 裡所有「私有」selector 一律以 `.theme-<slug>` 開頭**，例如：
  ```css
  .theme-advantech .cs-role-card { ... }
  .theme-advantech .cs-sol-board { ... }
  ```
  這樣即使未來 import 方式改變，私有規則也不會污染其他案例。
- 區域色票放 `.theme-<slug> { --... }`，不要進全域 `:root`（見 `design-system.md §2.7`）。
- 共用骨架類（上面 §3 那些）**保持裸寫、不要冠 `.theme-<slug>`**——它們屬於 `case-study.css`，加 scope 反而是錯誤歸屬。需要調共用元件的 RWD，改 `case-study.css`，不要在案例 CSS 裡複製覆寫。

## 5. Section 元件

- 先一頁刻完；section 太大再依 TOC 拆 `app/<slug>/sections/`。
- 有 state / effect / DOM query 的互動元件才加 `"use client"`，放 `app/<slug>/components/`；section 預設維持 server component。
- **只在「同一個 pattern 第二次出現」時，才把它抽成 `components/case-study/` 的共用 primitive**（如 `CaseHero` / `MediaFigure` / `BeforeAfter`）。只服務單一案例就先留在該案例內，不要過早抽象。

## 6. 圖片

- 放 `public/projects/<slug>/`，依用途分 `cover / research / solution / result`。
- 大圖先壓 WebP / AVIF，真正需要放大的才保留高解析。

## 7. 驗收

- `npm run build`、`npm run lint`（0 error）。
- `1440 / 1024 / 768 / 390` 四斷點：無水平溢出、console 0 error、TOC scrollspy 正常。
- 改新案例的 CSS / page **不會動到** Advantech 或其他案例。
- 在 `/about-me`、`/contact`、首頁確認沒有載入這支案例的 route CSS。
