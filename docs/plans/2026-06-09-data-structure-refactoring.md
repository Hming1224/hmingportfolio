# 0609 網站重構資料結構計劃

> 建立日期：2026-06-09  
> 類型：網站資料結構 / 程式碼擴充性重構  
> 狀態：Phase 0–4 核心已完成（Phase 4 的 inline style 大規模遷移依 §327 克制原則延後，待第二案例）；Phase 5（圖片）、Phase 6（文件/衛生）未做
> 目標專案：`400_Projects/hmingportfolio`（獨立 repo）  
> 目標專案絕對路徑：`/Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio`  
> 本計劃存放位置：母 repo `100_Todo/plans/`  
> 核心原則：先整理資料來源與 ownership，不改視覺、不一次導入 CMS、不為抽象而抽象

---

## 0. 一句話目標

把目前「畫面已穩定、但內容與版面大量寫死在巨型檔案」的作品集，整理成：

1. 專案資料只有一份來源。
2. 新增 case study 時，不需要複製 1000 行頁面或修改多個不相關檔案。
3. 每個頁面、section、CSS、圖片資產都有明確歸屬。
4. 保留目前已驗證的視覺與互動，不在結構重構時順手改版。

---

## 1. 本計劃如何承接既有四份文件

### 1-1 `2026-06-07-聯絡頁面重構`

| 原規劃 | 0609 實際狀態 | 本計劃處理方式 |
|---|---|---|
| Contact 雙欄、floating label、Formspree、loading / success | ✅ 已完成；`Contact.tsx` 已串 Formspree 並管理狀態 | 不重做功能；只把聯絡資料與表單設定從元件內抽成資料 / config |
| Contact CSS 寫入 globals.css | ✅ 已搬到 `styles/contact.css` | 維持 route/domain ownership |
| 809px 斷點 | 已過時；現行設計系統主斷點為 768 / 1023 | 0609 計劃一律以現行斷點為準 |

### 1-2 `2026-06-08-按鈕分斷點與陰影token交接單`

| 原規劃 | 0609 實際狀態 | 本計劃處理方式 |
|---|---|---|
| 按鈕 52 / 48 / 44px | ✅ 已完成，包含 Home、Contact、case-study footer | 不再調視覺數值；新增共用元件時必須沿用 |
| 手機字級決策 | ✅ 已採 `--fs-sm`，不是寫死 15px | 新元件依 design.md token |
| `--shadow-*` token | ✅ 已建立並套用 | 結構重構不得重新寫死主系統陰影 |
| button 規則曾散落 about.css | ✅ 2026-06-09 已各自歸位 | ownership 規則納入本計劃 |

### 1-3 `2026-06-08-設計系統改code執行`

| 原規劃 | 0609 實際狀態 | 本計劃處理方式 |
|---|---|---|
| 刪死碼、hex → token、tone 區域 token、字級 / 圓角 / 間距收斂 | ✅ 主項目已完成 | 不重做全站視覺收斂 |
| 四頁跨斷點驗證 | ✅ 已建立固定驗證習慣 | 每個結構 phase 繼續套用 |
| code ownership | 當時只處理 CSS 內容，未處理資料與 TSX 結構 | 0609 的主要工作 |

### 1-4 `2026-06-08-設計系統審查與重構`

| 原規劃 / 洞察 | 0609 實際狀態 | 本計劃處理方式 |
|---|---|---|
| design.md 與 code 脫節 | ✅ 主要規格已對齊 | 新增「架構 ownership / 新增專案流程」文件 |
| `cs-*` 是單頁專屬層，不屬全域設計系統 | ✅ 已拆成共用 `case-study.css` + route CSS | 再補 section / selector scope，避免下一案例污染 |
| 元件與命名一致性需要治理 | 尚未涵蓋資料來源、巨型 page、資產結構 | 0609 補齊 |

---

## 2. 0609 現況診斷

### 2-1 已經完成、不要重做

- `app/globals.css` 已是 6 行 manifest。
- CSS 已按 `tokens / home / about / contact / case-study / case-study-advantech` 拆檔。
- `about.css` 已不含其他頁面的 `.hero`、`.contact-*`、`.cs-*` leak。
- 按鈕、陰影、字級、tone、圓角與主要間距規格已收斂。
- Contact 功能與 Formspree 狀態流程已完成。
- `CaseStudyShell`、`CaseSection`、`CaseHeading` 已建立共用案例骨架。

### 2-2 現在真正的高優先問題

#### P0：專案資料沒有單一來源

同一個專案的名稱、日期、圖片、分類與連結分散在：

- `components/Works.tsx`
- `app/about-me/page.tsx`
- `app/advantech/page.tsx`
- `CaseStudyShell` 的 `nextNav`
- 各處手寫 metadata / 圖片路徑

後果：新增或改名一個專案，需要人工同步多處，容易出現內容不一致。

#### P0：Advantech 頁面與 CSS 過大

- `app/advantech/page.tsx`：約 1370 行
- `styles/case-study-advantech.css`：約 2675 行
- `app/advantech/page.tsx` 約有 90 處 inline style、26 處 `unoptimized`

後果：內容、版面、資料、SVG、互動彼此耦合；改一段需要閱讀整頁，下一個案例也無法直接借用成熟模式。

#### P1：Case study 只有 shell 共用，section pattern 尚未成形

目前共用層只負責 Navbar、TOC、Footer、section heading。研究卡、人物卡、流程、Before / After、媒體展示等仍全部手刻。

後果：下一個案例容易複製大量 JSX / CSS，但現在只有一個完整案例，也不能過早把每個 Advantech 特例抽成「假共用元件」。

#### P1：Advantech selector 尚未全部被 theme scope 保護

`case-study-advantech.css` 雖然是 route-scoped，但許多 selector 仍是裸 `.cs-sol-*` / `.cs-iv-*`。

後果：未來若 route import 或共用方式改變，專屬規則可能污染其他案例；命名上也難辨識哪些是共用骨架、哪些是 Advantech 私有。

#### P1：圖片資產結構與重量會隨案例失控

- `public/projects` 約 70MB
- Advantech 約 42MB / 96 個檔案
- 首頁仍有數 MB 至近 10MB 的封面圖

後果：新增案例會持續增加部署與手機載入成本；圖片用途、尺寸與版本也不易追蹤。

#### P2：工具 / 驗證檔會干擾正式品質檢查

`npm run lint` 目前會掃到本地 `scripts/codex-journal-autolog.js`，導致與網站無關的 lint error。工作區還有 iterations 與測試截圖未整理。

後果：CI / lint 不能可靠代表網站 code 是否健康。

---

## 3. 架構決策

### 3-1 本輪採用：Typed data + section components

先使用 TypeScript 資料檔與 React section 元件，不導入 CMS / MDX。

理由：

- 目前只有 Advantech 一個完整案例，還沒有足夠重複模式支撐 CMS schema。
- Typed data 能立即解決首頁、metadata、next-nav 多處同步問題。
- Section components 能降低巨型頁面閱讀成本，同時保留特殊互動自由度。
- 未來累積 2–3 個案例後，再判斷哪些 section 值得轉成 MDX / CMS blocks。

### 3-2 ownership 規則

| 類型 | 唯一權威位置 |
|---|---|
| 全站專案索引、首頁卡片資料、next project 關係 | `data/projects.ts` |
| About 經歷 / skill / tool 資料 | `data/about.ts` |
| Contact 公開聯絡方式與社群連結 | `data/contact.ts` |
| Contact Formspree 等環境設定 | `.env.local` + `lib/config.ts` |
| Case study 共用骨架 | `components/case-study/` + `styles/case-study.css` |
| Advantech 內容資料 | `app/advantech/data.ts` |
| Advantech section 元件 | `app/advantech/sections/` |
| Advantech 專屬互動 | `app/advantech/components/` |
| Advantech 專屬 CSS | `app/advantech/advantech.css` 或保留 `styles/case-study-advantech.css`，二選一後固定 |
| 專案圖片 | `public/projects/<slug>/` |

---

## 4. 目標資料夾結構

```text
app/
  advantech/
    page.tsx
    data.ts
    sections/
      HeroSection.tsx
      OverviewSection.tsx
      RoleSection.tsx
      ProcessSection.tsx
      ResearchSection.tsx
      InterviewSection.tsx
      ScenarioSection.tsx
      SolutionSection.tsx
      NextStepSection.tsx
      ResultSection.tsx
    components/
      AlarmLevelDemo.tsx
      FeatureConnectors.tsx
      FeatureImageLightbox.tsx
      FlowConnectors.tsx
      ProposalTabs.tsx
      VimeoPlayer.tsx

components/
  case-study/
    CaseStudyShell.tsx
    CaseSection.tsx
    CaseHeading.tsx
    CaseHero.tsx                 # 確認第二案例也需要後再抽
    MediaFigure.tsx              # 確認重複模式後再抽
    index.ts

data/
  projects.ts
  about.ts
  contact.ts

lib/
  config.ts
  utils.ts

public/
  projects/
    advantech/
      cover/
      research/
      solution/
      result/
    crypto-arsenal/
    laushu/

styles/
  tokens.css
  home.css
  about.css
  contact.css
  case-study.css
  case-study-advantech.css
```

> 第一輪只整理程式結構；圖片搬移會改動大量路徑，放到獨立 phase，避免與 TSX 拆分混在同一個 diff。

---

## 5. 分階段執行

### Phase 0：建立重構基準與防回歸

**目標**：在移動資料前，先確保每一刀都有可比對基準。

1. 記錄四頁 route 與核心互動驗收清單。
2. 建立最小 architecture checklist：
   - 新增專案要修改哪些檔案？
   - 專案 title / href / cover 是否只有一份來源？
   - route 專屬 CSS 是否只在該 route 載入？
3. 修正 lint 邊界：讓網站 lint 不被本地 agent script 干擾。
4. 決定 iterations 策略並整理工作區，避免重構 diff 混入截圖。

**驗收**：
- `npm run build` 通過。
- `npm run lint` 能可靠檢查網站 code，或明確只剩既有網站 warning。
- 四頁桌機 / 平板 / 手機基準可重複驗證。

### Phase 1：建立單一專案資料來源

**目標**：先解決新增專案要同步多處的問題，不碰頁面 layout。

1. 新增 `data/projects.ts` 與明確型別：

```ts
type ProjectCategory = "enterprise" | "school";
type ProjectStatus = "published" | "coming-soon";

interface ProjectSummary {
  slug: string;
  title: string;
  date: string;
  description: string;
  cover: string;
  logo: string;
  tags: string[];
  tone: string;
  category: ProjectCategory;
  status: ProjectStatus;
  href?: string;
  nextProjectSlug?: string;
}
```

2. `Works.tsx` 改讀 `projects.ts`，元件只負責呈現與分類。
3. Advantech metadata、首頁卡片、next-nav 改讀同一份資料。
4. 新增 helper，例如 `getProjectBySlug()` / `getNextProject()`；找不到 slug 時直接報錯，避免靜默顯示錯資料。
5. `data/about.ts` 與 `data/contact.ts` 僅抽純資料，不抽 JSX / 動畫邏輯。

**驗收**：
- 改 Advantech title，只需修改一處就同步首頁與 case-study 導航。
- `Works.tsx` 不再包含整份專案內容陣列。
- 畫面與排序不變。

### Phase 2：拆解 Advantech 巨型頁面

**目標**：降低單檔認知成本，不急著做跨案例抽象。

1. 依 TOC 一對一拆成 `sections/*Section.tsx`。
2. 把各 section 用到的純資料移至 `app/advantech/data.ts`。
3. 保留需要 DOM query / state / effect 的互動元件為 client components；section 預設維持 server component。
4. `page.tsx` 最終只負責：
   - metadata
   - 專案資料
   - `CaseStudyShell`
   - sections 的排列
5. 禁止拆分時順手改文案、className 或視覺。

**目標結果**：
- `app/advantech/page.tsx` 控制在約 150–250 行。
- 單一 section 檔案原則上不超過約 300 行；超過時再按「資料 / 呈現 / 互動」拆分。
- 重複的 workflow / feature rows 優先改成 data map，但保留確實不同的特殊結構。

**驗收**：
- TOC id 與順序完全不變。
- Connector、lightbox、tabs、Vimeo、alarm demo 全部正常。
- 四個主要斷點無視覺差異與水平溢出。

### Phase 3：整理 Case Study 擴充邊界

**目標**：讓下一個 case study 有明確起點，但避免抽出只服務 Advantech 的假共用元件。

1. 將元件分成兩類：
   - **共用骨架**：CaseStudyShell、CaseSection、CaseHeading、TOC、next-nav。
   - **Advantech 私有**：Alarm、ProposalTabs、FeatureConnectors、特定 research / solution layout。
2. 為 `case-study-advantech.css` 的專屬 selector 補 `.theme-advantech` scope；小步處理並逐斷點驗證。
3. 建立「新增案例 checklist」：
   - 在 `data/projects.ts` 新增資料。
   - 建 route 與 route CSS。
   - 使用共用 shell。
   - 只在確認第二次重複時抽共用 section primitive。
4. 等第二案例開始實作時，再評估 `CaseHero`、`MediaFigure`、`BeforeAfter`、`ResearchCardGrid` 是否值得共用。

**驗收**：
- `/about-me`、`/contact`、首頁不載入 Advantech route CSS。
- Advantech 私有 selector 有明確 scope。
- 新建空白案例 route 時，不需要修改既有案例 CSS / page。

### Phase 4：CSS 與 inline style 局部整理

**目標**：配合 section 拆分降低 CSS 尋找成本，不做大規模視覺重寫。

1. 在 `case-study-advantech.css` 內按 section 排序，建立清楚目錄註解。
2. 只把「會被 responsive 覆蓋、重複使用、或影響 ownership」的 inline style 搬回 CSS。
3. 保留真正資料驅動的 inline style，例如動態 title color；必要時改用 CSS custom property。
4. 不急著把 2675 行拆成十支 CSS；先觀察 section 拆 TSX 後是否真的降低維護成本。
5. 若仍難維護，再採：

```text
app/advantech/styles/
  overview.css
  research.css
  solution.css
  result.css
  responsive.css
```

**驗收**：
- inline style 數量下降，但無為了數字好看而製造大量一次性 class。
- media query 與 base rule ownership 清楚。

### Phase 5：圖片資產與效能整理

**目標**：避免每新增一個案例，public 體積與圖片路徑持續失控。

1. 建立 `public/projects/<slug>/` 命名規格。
2. 圖片依用途分 `cover / research / solution / result`。
3. 先處理首頁大圖與 Advantech 超過 1MB 的圖片：
   - 比較 WebP / AVIF 品質。
   - 保留真正需要放大的高解析圖。
   - 確認哪些 `unoptimized` 可以移除。
4. 圖片搬移與壓縮獨立 commit，避免與頁面拆分混在一起。
5. 影片繼續使用 Vimeo，不把大型影片放進 repo。

**驗收**：
- 首頁封面不再有接近 10MB 的單圖。
- Advantech 頁首屏與主要 section 的載入量下降。
- Lightbox 放大後仍保有可接受清晰度。

### Phase 6：文件與 repo 衛生

1. 在 `design.md` 新增「架構 ownership / 新增專案流程」索引，不塞入實作細節。
2. 專案技術決策與踩坑繼續記 `Memory.md`。
3. 評估將 audit / plans 收到 `docs/`，但不要移動 `Memory.md`。
4. 決定 iterations 保留策略，避免設計驗證檔持續污染 repo。
5. 建立 architecture audit 的固定檢查：
   - 巨型檔案排行
   - route CSS 是否隔離
   - 新增專案修改點數量
   - public 大檔排行

---

## 6. 明確不做

- 不在本輪導入 CMS、Contentlayer、Notion API 或 MDX。
- 不把每個 Advantech 特例抽成共用元件。
- 不在結構重構時改視覺、文案或重新設計 Contact。
- 不全面改成 CSS Modules / Tailwind class。
- 不一次搬完所有圖片與 TSX；每個 phase 獨立驗證與 commit。
- 不移動 `Memory.md`。

---

## 7. 風險與防護

| 風險 | 防護方式 |
|---|---|
| 拆 section 時漏掉 id，TOC 失效 | TOC id 一對一清單 + scrollspy 驗證 |
| data 抽離後內容順序改變 | 先抽資料、不改排序；逐段截圖比對 |
| server / client component 邊界錯誤 | 有 state / effect / DOM query 才使用 `"use client"` |
| 抽象過頭，特殊案例反而難做 | 第二次重複才抽共用 primitive |
| CSS scope 改動造成 cascade 改變 | selector scope 一組一驗；桌機 / 平板 / 手機 computed style 比對 |
| 圖片搬移造成大量 404 | 圖片 phase 獨立做，使用 `rg` 檢查舊路徑零引用 |
| 重構 diff 混入 iterations / agent scripts | execution 開始先整理工作區，只 stage 本 phase 檔案 |

---

## 8. 執行順序與 commit 建議

1. `chore(repo): isolate website lint and iteration artifacts`
2. `refactor(data): centralize portfolio project metadata`
3. `refactor(about): extract static content data`
4. `refactor(advantech): split case study into sections`
5. `refactor(case-study): scope advantech-specific styles`
6. `perf(images): organize and optimize portfolio assets`
7. `docs(architecture): document project ownership and extension workflow`

> 每個 commit 都必須能 build、能獨立回退；不要把 Phase 1–5 壓成單一大 commit。

---

## 9. 每階段固定驗證

- `npm run build`
- `npm run lint`（Phase 0 修好邊界後）
- `/`：專案排序、分類 tabs、卡片 CTA、Hero 按鈕
- `/about-me`：Genie、YearRail、Educator、經歷資料
- `/contact`：Formspree 設定、floating label、loading / success / error
- `/advantech`：TOC、timeline、workflow、connectors、tabs、lightbox、Vimeo、next-nav
- 斷點：1440、1024、768、390；必要時補 440 / 360
- 所有頁面無水平溢出、console 0 error
- `git diff --check`

---

## 10. 完成定義

完成本計劃後，應達成：

- 新增一個首頁專案卡，只需修改 `data/projects.ts`。
- 新增一個 case study，不需要修改 Advantech 的 page 或 CSS。
- Advantech `page.tsx` 不再是 1000+ 行巨型檔案。
- 專案 title / href / cover / next project 不會分散多份手動同步。
- Contact、About、Home、Case Study 的資料與樣式 ownership 清楚。
- lint / build 能代表網站本身健康狀態。
- 圖片資產有 slug 與用途分層，public 體積開始可控。

---

## 11. 建議下一個 execution session

Phase 0 + Phase 1 已於 2026-06-09 完成。下一個 execution session 從
**Phase 2：拆解 Advantech 巨型頁面**開始。

開場指令：

> 進入 `/Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio`，執行母 repo `100_Todo/plans/2026-06-09-網站重構資料結構計劃.md` 的 Phase 2。依 TOC 一對一拆解 Advantech sections，不改文案、className、視覺或 CSS。

---

## 12. 2026-06-09 Phase 0 + Phase 1 執行紀錄

### 已完成

- 新增 `docs/architecture-baseline.md`，記錄四頁驗收、架構 checklist 與 iterations 保留策略。
- `eslint.config.mjs` 排除本地 `scripts/` / `.codex/`，網站 lint 不再被 agent script error 干擾。
- 新增 `data/projects.ts`，集中首頁卡片、Advantech metadata 與 next-project 關係。
- 新增 `getProjectBySlug()` / `getNextProject()`，未知 slug 或缺少 next project 時直接報錯。
- 新增 `data/about.ts`，將經歷、設計信念、推廣、技能與工具改為純資料；粗體段落由頁面負責渲染。
- 新增 `data/contact.ts` 與 `lib/config.ts`，集中公開聯絡資料與 Formspree 設定。
- 不刪除、不修改既有 iterations / 截圖成果；不改視覺、不搬圖片、不拆 Advantech sections。

### 驗證

- `npm run build`：通過。
- `npm run lint`：0 error；剩 12 個既有 `<img>` warning。
- `git diff --check`：通過。
- `/`、`/about-me`、`/contact`、`/advantech`：1440 / 1024 / 768 / 390 無水平溢出，console 0 error。
- 首頁 enterprise / school tabs、Contact 複製狀態、Advantech metadata / next-nav、About 經歷粗體內容皆通過。

---

## 13. 2026-06-09 Phase 2 執行紀錄

### 已完成

- 將 6 個 Advantech 專屬互動元件移入 `app/advantech/components/`（`git mv`，符合 §3-2 ownership）：`AlarmLevelDemo` / `FeatureConnectors` / `FeatureImageLightbox` / `FlowConnectors` / `ProposalTabs` / `VimeoPlayer`。
- 依 TOC 一對一拆成 `app/advantech/sections/`：`HeroSection` / `OverviewSection` / `ProductBackgroundSection` / `RoleSection` / `ProcessSection` / `AnalysisSection` / `InterviewSection` / `ScenarioSection` / `SolutionSection` / `NextStepSection` / `ResultSection`（含 `index.ts` barrel）。
- 純資料抽到 `app/advantech/data.ts`：`roleCards` / `processSteps` / `compAiTools` / `compEmsItems` / `scenarios` / `proposalScenario1Tabs` / `proposalScenario2Tabs` / `nextStepCards` / `resultCards`。
- `page.tsx` 從 1377 行降到 85 行，只負責 metadata、專案資料、TOC、`CaseStudyShell` 與 sections 排列。
- 互動元件維持 client component；section 維持 server component。
- 全程不改文案、className、視覺或 CSS（feature matrix / workflow 的 inline SVG 原樣保留為 JSX）。

### 待續觀察

- `SolutionSection.tsx` 為 496 行，超過 ~300 行原則；但內容為各自不同的 Before/After board 與 feature group，屬「確實不同的特殊結構」，本輪未強拆。若日後仍難維護，可再按 board / feature 細分。

### 驗證

- `npm run build`：通過。
- `npm run lint`：0 error；剩 12 個既有 `<img>` warning（位置從 page.tsx 移到 SolutionSection.tsx，數量不變）。
- `/advantech`（1440 / 390）：TOC 10 id 與順序完全不變、console 0 error、頁面層無水平溢出。
- 互動驗證：FlowConnectors（16 條線）、FeatureConnectors（11）、ProposalTabs（2 組 / 6 tab）、FeatureImageLightbox（14）、VimeoPlayer（2）、AlarmLevelDemo、role/timeline/comp/ems/scenario/next/result 卡片數量全部對得上原版。

---

## 14. 2026-06-09 Phase 3 執行紀錄

### 已完成

- **私有 selector scope**：用 postcss（非 regex，避免改壞跨行漸層/transition 值）為 `case-study-advantech.css` 的 341 個 Advantech 私有 `.cs-*` selector 統一補 `.theme-advantech ` 前綴；`.theme-advantech {}` token 區塊與 `@media` 行不動。
- **共用骨架類保持裸寫**：9 個同時存在於共用 `case-study.css` 的 class（`.cs-next-nav` / `.cs-next-btn-filled` / `.cs-next-btn-outline` / `.cs-hero-info` / `.cs-hero-meta` / `.cs-info-card` / `.cs-info-row` / `.cs-info-tasks` / `.cs-title`）不加 scope——它們屬於共用骨架，冠 `.theme-advantech` 反而是錯誤歸屬。其中 next-nav / next-btn 的 mobile 規則其實是共用檔已涵蓋的重複碼，標記待第二案例時歸位 `case-study.css`。
- 在 `case-study-advantech.css` 開頭補上 scope 慣例註解，使檔案自我說明。
- **新增案例 checklist**：新建 `docs/add-case-study-checklist.md`（資料來源 → route/CSS → 共用 shell → `.theme-<slug>` scope 慣例 → section 抽象時機 → 圖片 → 驗收），並從 `docs/architecture-baseline.md` 連結。

### 為何安全（cascade 分析）

- 統一加同一層 prefix = 全檔 specificity 均勻 +0,1,0，檔內 selector 的相對優先序與 source order 不變。
- 唯一跨檔競合是上述 9 個共用 class，已保持裸寫；故 Advantech 私有元素的 computed style 與改動前完全相同。

### 驗證

- `npm run build`：通過。`npm run lint`：0 error；12 個既有 `<img>` warning（數量不變）。
- `/advantech` 四斷點 computed-style 驗證（1440 / 1024 / 768 / 390）：
  - prefixed 私有規則仍命中（`.cs-product-card` 圓角、`.cs-overview-body` flex；media 內 `.cs-role-radial`→grid、`.cs-alarm-demo`@1024-1439→min-height 148/flex、`.cs-sol-fr`→column、`.cs-iv-personas`→column、`.cs-product-grid`@390→1fr 等）。
  - 共用裸寫規則仍命中（`.cs-next-nav`@768→column-reverse、`.cs-info-row`→column、`.cs-next-btn-filled`@390→width 100% + white-space normal）。
  - 四斷點皆無水平溢出、console 0 error。
- `/about-me` 確認載入 0 條 advantech 私有規則（route 隔離成立，§315 通過）。

### 待續 / 移交 Phase 4

- 9 個共用骨架 class 的 RWD override 目前仍放在 `case-study-advantech.css`，建議第二案例開始前歸位 `case-study.css`。
- next-nav / next-btn 的 mobile 重複碼可在 Phase 4 直接刪除（共用檔已完整涵蓋）。

---

## 15. 2026-06-09 Phase 4 執行紀錄

### 已完成

- **9 個共用骨架 RWD 歸位**：把 `.cs-title` / `.cs-hero-info` / `.cs-hero-meta` / `.cs-info-row`（含 tablet 769–1023 的 gap:12px）/ `.cs-info-card` / `.cs-info-tasks` 的 mobile + tablet override，從 `case-study-advantech.css` 搬回 base 規則所在的 `styles/case-study.css`。
- **刪除重複 mobile 碼**：移除 advantech CSS 內 `.cs-next-nav` / `.cs-next-btn-outline,.cs-next-btn-filled` 的 768px 區塊——該規則是共用檔（`case-study.css` 已含 column-reverse / 44px / width:100% / fs-sm）的子集，屬純死碼。
- **更新 advantech CSS 開頭 scope 註解**：改為「共用骨架 base 與 RWD 都已歸位 case-study.css，本檔不再覆寫」。
- 行數：`case-study.css` 354→391（+37）、`case-study-advantech.css` 2681→2631（−50）。
- §4 item 1（section 目錄註解）：advantech CSS 早期 phase 已具備完整 section 註解，不需重做。

### 刻意不做（依 §327 / §340 克制原則 + Hming 決定）

- inline style 大規模遷移：94 處 inline 大多是**資料驅動、各自不同的值**（badge/tag 色、各 scenario 背景圖、動態標題色），屬 §4 item 3「該保留」；硬抽會造出 §340 警告的一次性 class。Hming 選擇「先收尾、inline 不動」，待第二案例出現再判斷重複模式。

### 驗證

- `npm run build`：通過。`npm run lint`：0 error，12 個既有 `<img>` warning（數量不變）。
- `/advantech` computed-style（playwright 連既有 :3000）：
  - 390px：title line-height 32.4px、hero-info pt 32px、hero-meta column/flex-start/8px、info-row column/16px、info-card flex:none/100%/pad 0、next-nav column-reverse/stretch/12px、next-btn 44px/100%/normal/fs-sm。
  - 900px：info-row row/gap 12px（tablet 規則命中）、next-btn 48px/12px 24px/16px（1023 規則命中）。
  - 兩斷點皆無水平溢出、0 console error。與重構前完全一致。
- Commit：`refactor(case-study): relocate shared skeleton RWD to shared CSS`（658865b，本地，未 push）。
