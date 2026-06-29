# Design System 介紹頁 ↔ Code 對齊重構計劃

目標專案：`400_Projects/hmingportfolio`
本機路徑：`/Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio`
執行工作樹：`/Users/hmingdesigner/Documents/hmingportfolio-dspage`（分支 `codex/ds-page-alignment`）
建立日期：2026-06-25
狀態：🟡 部分執行中（已完成 Phase 0, 1, 2, 3, 4；Phase 5/6 待執行）

> 2026-06-25 執行更新：本輪只依 Hming 指示執行 Phase 0 與 Phase 2。已新增 `lib/design-system-data.ts`、`scripts/check-design-tokens.mjs`、`components/ui/Accordion.tsx`，並用 Accordion 替換多路由文件 sidebar / mobile docs menu。驗證：`npm run lint` 通過、`npx tsc --noEmit` 通過、`npm run build` 通過；`npm run check:tokens` 已能跑出目前剩餘漂移，現階段剩 `lib/design-system-docs.ts: --hm-text-heading`，留給 Phase 1 / Phase 3 修正。
> 2026-06-26 執行更新：已完成 Phase 1，將 `app/design-system/page.tsx` 的 inline colorGroups / token rows 改為讀取 `lib/design-system-data.ts`，刪除重複代碼與手寫值，統一由單一資料模組供應，並修正相關元件型別。驗證：`check:tokens` 及 `build` 均無錯誤通過。
> 2026-06-26 執行更新：已完成 Phase 3，將 `lib/design-system-docs.ts` 內的 25 個非案例元件的 states、tokens、usage 與真實元件對齊，並刪除幽靈元件 CopyButton。驗證：`check:tokens` 及 `build` 均無錯誤通過。
> 2026-06-26 執行更新：已完成 Phase 4，徹底移除多路由，改為單頁 Explorer，並將左側 TOC 與 Accordion 合併為單一 Nav 樹，修復了 Accordion 內部的 Hypertext 行為。驗證：`npm run build` 通過。
> 2026-06-26 修復更新：針對 code quality 檢查補了一個修復小回合；`DesignSystemExplorer` 改為真正的「On this page → Component Explorer → category → component」單棵導覽樹，補上 mobile 單欄 RWD，移除 `overflowX: clip` 遮掩問題，修正 token table cell key warning。驗證：`npm run lint`、`npm run check:tokens`、`npm run build` 通過；瀏覽器 390px 檢查主內容寬 358px、水平溢出 0。

> 這份計劃只處理「`/design-system` 介紹頁與實際 code 對齊 + IA 整合 + Accordion 化」。
> 案例頁 CSS 共用化是另一份計劃（`2026-06-25_case-study-design-system-consolidation-plan.md`），兩者不重疊。

---

## ⛓ 並行執行協定（worktree 分工，2026-06-26）

DS 頁與案例頁兩份計劃**同時進行**。為避免同一資料夾被兩個 session 互相蓋檔，已切成兩個 git worktree（同 repo、不同資料夾、不同分支）：

| 工作流 | 資料夾 | 分支 |
|---|---|---|
| **DS 頁（本計劃）** | `/Users/hmingdesigner/Documents/hmingportfolio-dspage` | `codex/ds-page-alignment` |
| 案例頁 | `400_Projects/hmingportfolio`（原資料夾）| `codex/design-system-remediation` |

> ⚠️ 本計劃**一定要在 `hmingportfolio-dspage` 那個資料夾**開 session 執行，不要在原資料夾，否則會跟案例頁 session 互相蓋檔。

**本（DS 頁）session 只准改這些檔：**
- `app/design-system/**`
- `lib/design-system-data.ts`、`lib/design-system-docs.ts`
- `components/ui/Accordion.tsx`、`components/design-system/**`、`components/DesignSystemPlayground.tsx`
- `scripts/check-design-tokens.mjs`
- `styles/tokens.css`：**只讀不寫**（值的真實來源歸案例頁 / foundation）

**禁止碰（屬案例頁 session）：** `app/{advantech,crypto-arsenal,laushu}/**`、`components/case-study/**`、`styles/case-study*.css`。

**重疊區（最後才做）：** case 元件的文件條目（`case-hero`、`case-section`、`zoomable-image`、`proposal-tabs`、`case-info-card`）**留到最後**——等案例頁推進到 Phase 4+（pattern API 定稿）再寫，避免追著變動的 API 改。本 session 先做的順序：**Phase 1（落地頁讀資料模組）→ Phase 3 的非案例元件 → Phase 4 單頁 explorer IA（左 accordion + 右同頁內容，移除多路由）**。

**`i18n/*`：** 兩條分支可能都加字串；盡量加在不同區塊，合併時若衝突再手動對。

**合併：** 兩條分支各自 commit；期間都不自行推 `main`，最後由 Hming 指示再把兩條合進 `main`。

## 🔗 2026-06-27 與 Case Study consolidation 的對齊補強（優先級高於下方舊 phase）

這份計劃的核心不是「把 DS 頁做漂亮」，而是讓 `/design-system` **完全照真實 code、真實 token、真實 component contract 呈現**。尤其 Case Study 元件必須等 `codex/design-system-remediation` 的共用化結果穩定後再文件化，不能自己發明一套。

### 1. Source of truth 順序

DS page alignment 只能依下列來源更新，優先順序如下：

1. 真實 code：`components/ui/**`、`components/case-study/**`、`styles/tokens.css`、`styles/case-study.css`。
2. Case Study consolidation 產出的 **Case Study DS Contract**：component source path、props / variants、共用 token、route-local exception、驗證 commit。
3. `docs/design-system.md` 與 `Memory.md` 中已確認的設計決策。
4. 正式站 live baseline：`https://hmingdesign.com/en`，用來確認全站共用 UI、spacing、按鈕、導覽、卡片節奏沒有被 DS 頁自己改歪。

禁止事項：

- 不在 `lib/design-system-docs.ts` 裡發明不存在的 props、variants、tokens 或元件。
- 不把 route-local exception 包裝成全站共用元件。
- 不為了讓 DS 頁好看而改 `styles/tokens.css` 的值。
- 不用 `/design-system` 自己的 `ds-*` 樣式反向定義設計系統；`ds-*` 只能是頁面排版殼，不能成為新 token 系統。

文件化判斷總原則：

> **核心規則 token 化，重複元件 component 化，單次敘事區塊保留彈性。**

- **核心規則 token 化**：DS 頁只把跨頁會影響一致性的顏色、文字階層、spacing、radius、shadow、motion、breakpoint、focus / hover / disabled 狀態列為正式 token。
- **重複元件 component 化**：只有同一資訊層級、同一互動模式、同一版型在 code 中被重複使用，才列為 reusable component。
- **單次敘事區塊保留彈性**：只服務單一案例故事、單一研究視覺或 Hming 喜歡的專案特殊排版，要標為 project-specific exception / visualization pattern，不寫成 core reusable component。

### 2. Case Study component 文件的啟動門檻

Case Study 類文件（例如 `CaseHero`、`CaseSection`、`CaseCard`、`CaseMedia`、`CaseProposalTabs`、`CaseFlowFrame`、`CaseFeatureRow`、`CaseBeforeAfter`）只能在下列條件成立後更新：

- consolidation 分支已有對應 green batch commit + push。
- 該 commit 的驗證包含 touched routes 的 `1440 / 1024 / 768 / 390px`、horizontal overflow = 0、console 0 error。
- 有明確 API / class / token contract：哪些是共用、哪些是專案例外。
- 特殊元件若 Hming 決定保留原版型，DS 頁要標為「project-specific exception / visualization pattern」，不能列成可任意複用的 core component。

如果 contract 尚未穩定，DS 頁只保留「待 consolidation 穩定後補文件」狀態，不寫 placeholder 文案，不做假範例。

### 3. Alignment 的批次與驗證節奏

每個 DS page 批次只處理一個清楚範圍：

- 一個 component category 的 docs 校正；或
- 一個 DS page UI primitive 收斂；或
- 一批 Case Study component contract 導入。

每批完成後必跑：

1. `git diff --check`
2. `npm run lint`
3. `npm run check:tokens`
4. `npm run build`
5. `/design-system` browser smoke test：`1440 / 1024 / 768 / 390px`、mobile nav / accordion、hash/state 切換、horizontal overflow = 0、console 0 error。

每個 green batch 通過後，必須 commit + push 到 `codex/ds-page-alignment`。commit 前只 stage 本批自己改的 DS page / docs 檔案，不可夾帶 consolidation 分支或其他 agent 的案例頁改動。

### 4. 完美落地時的對齊目標

當 consolidation plan 完整落地後，alignment plan 的最終狀態必須符合：

- `/design-system` 的 Case Study 區塊列出的元件、props、variants、token 全部能在 code 中找到。
- 每個 `--hm-*` / `--cs-*` token 都能被 `check:tokens` 或等價掃描確認存在。
- 每個範例都指向真實 component source，不出現幽靈元件、幽靈 class、幽靈 token。
- 特殊但 Hming 喜歡的專案版型被清楚標成 exception，說明它為什麼不抽成 generic component。
- DS 頁的 UI 本身遵守既有 `components/ui` 與 `--hm-*` token，不另刻一套視覺語言。

---

## 一、為什麼要做（掃描結論）

`/design-system` 目前有**兩套各自手寫、互不同步的內容來源**，導致頁面說明與 code 對不上：

1. **落地頁** `app/design-system/page.tsx`（858 行）：`colorGroups`、token rows、hex 值**全部 inline 寫死**（如 `--hm-purple #5d62d8`、`--text-heading #1a1a1a`）。
2. **多路由文件** `lib/design-system-docs.ts`（257 行）→ `[...slug]/page.tsx` → `DesignSystemDocsPage.tsx`：foundations / components / reference 的 seed data，內容多為樣板自動填字串。

### 已確認的具體漂移 / 虛構
- **Token 名稱對不上 code**：docs 寫 `--hm-text-heading / body / secondary`，但 `tokens.css` 這三個 `--hm-text-*` **定義 0 次**；真實是 `--text-*`（無 hm 前綴，定義 5 次）。
- **值重複手抄**：顏色 / 字級 / 間距在落地頁與 docs 各寫一份，已開始與 `tokens.css` 漂移。
- **元件 doc 內容是樣板**：`usage` / `tokens` / `accessibility` 大量是 `Reusable X pattern used by the live portfolio.` + 預設 token 清單，不是從各元件真實 props / states / token 抽出來。
- **幽靈元件**：`CopyButton` 有文件、無 `components/ui/CopyButton.tsx`。
- **左側 TOC 不是 accordion**：`DesignSystemDocsPage` 的 `ds-docs-sidebar` 是攤平 `<nav>`，手機版用 `<details>`；專案內**沒有 Accordion 元件**。

### 好消息
大部分元件**真的存在**：Button / Select / Checkbox / Radio / Toast / Alert / Modal / Skeleton / EmptyState 都在 `components/ui/`，多路由 source 路徑大多正確。所以是「內容對齊」問題，不是「全部重做」。

---

## 二、目標（完成後狀態）

1. **單一資料來源**：token 與元件清單收斂成一份 TS 資料模組，落地頁與多路由頁都 import 同一份；另有驗證腳本比對 `tokens.css`，漂移即失敗。
2. **單頁 explorer IA（不跳路由）**：`/design-system` 是**單一頁面**；左側巢狀 `Accordion`（分類 → 元件），點元件在右側**同頁**切換內容，不換路由。多路由 `/design-system/{kind}/{slug}` 移除。預設收合、漸進展開，不一次 show 全部。
3. **左側 TOC accordion 化**：新建 `Accordion` 元件 → 納入 DS 文件 → 用它重做 sidebar 導覽。
4. **頁面本身套用 DS**：`/design-system` 自己的 UI（卡片、按鈕、輸入框、tab）一律用站上既有共用元件與 `--hm-*` token，不再有 `ds-*` 平行硬刻樣式自成一套。
5. **以 code 為準**：每個元件文件的 states / tokens / usage 都對照真實元件 code，移除虛構與樣板。

---

## 三、單一資料來源機制（決策：建置資料模組 + 驗證腳本）

### 3.1 資料模組
- 新增 `lib/design-system-data.ts`（或擴充現有 `lib/design-system-docs.ts`）作為**唯一**的 token + 元件 metadata 來源。
- 顏色 / 字級 / 間距 / radius / shadow / motion 的「值」**不再手抄 hex**——以 `--hm-*` 變數名為主，值只在一處列出，落地頁與 docs 都讀它。
- 落地頁 `page.tsx` 的 inline `colorGroups` / token rows 改成 import 此模組，刪除重複定義。

### 3.2 驗證腳本（防漂移）
- 新增 `scripts/check-design-tokens.{py|mjs}`：解析 `styles/tokens.css` 的 `--hm-*`（與必要的 `--text-*`、`--fs-*`、`--shadow-*`）→ 比對資料模組裡引用的每個 token 是否存在、值是否一致。
- 任何「文件引用了不存在的 token」（如目前的 `--hm-text-heading`）或「值與 CSS 不一致」→ 腳本非 0 退出。
- 接到 `package.json` script（如 `npm run check:tokens`），並在 `npm run build` 前或 CI 跑。

> 注意：CSS custom property 的 `var()` 繼承鏈要能解析到底（seed → map → component）。腳本先做「名稱存在性 + 直接值比對」即可，不必完整解析 `var()` 遞迴；遞迴解析列為後續加強。

---

## 四、IA 整合（單頁 explorer，2026-06-26 改版）

> 原「Ant Design 多路由」方向**作廢**——點元件跳新路由的閱讀動線太繁瑣。改為**單頁、不跳路由**。
>
> ⚠️ **2026-06-26 修正（避免三欄擠壓）**：第一版實作把「On this page」TOC 卡片放左欄、把分類 Accordion 另開一欄放中間、內容被擠到最右側狹窄區（見 Hming 截圖）。**這是錯的**。正解：**整個頁面只有兩欄**——左欄是**一條整合導覽**（頁面區段錨點 + 元件分類 Accordion 合在同一條 sidebar），右欄是**寬版內容區**。不要讓 TOC 與 Accordion 各佔一欄、把內容壓窄。

### 4.1 `/design-system`（單一頁面，兩欄）
- 改成 client 單頁，整頁版面是**固定兩欄**：左 = 一條整合 sidebar 導覽，右 = 寬版主內容區。
- 頂部**簡短門面**（介紹 + 設計原則 `designPrinciples` + token 總覽）放在**右欄主內容區的最上方**，不另佔欄位；不要為門面再開一張「On this page」卡片擠掉內容寬度。

### 4.2 左欄：單一整合導覽（TOC 與 Accordion 必須是「同一棵樹」，不是兩個拼裝 widget）

> ⚠️ **2026-06-26 第二次修正**：第二版雖收成兩欄，但左欄裡「On this page」TOC 與分類 Accordion 仍是**兩個各自獨立、視覺語言不一致的區塊**（中間一大塊空白、字級 / 間距 / hover 各做各的），像拼裝車。**這版要的是把兩者合成同一套導覽**——同一個元件、同一套間距節奏、同一套互動樣式。

**結構（建議：把分類 Accordion 收進「Component Explorer」底下，讓 TOC 與 Accordion 變成同一棵樹）**

```
On this page                ← sidebar 標題（一個，不是兩個區塊各一個）
├─ Getting Started          ← 錨點（無子項，捲到門面對應段）
├─ Foundations & Tokens     ← 錨點（無子項，捲到 token 總覽段）
├─ Component Explorer  ▾    ← 可展開；展開後就是分類 Accordion
│   ├─ General        ▾
│   │   ├─ Button
│   │   └─ …
│   ├─ Shell          ▾
│   ├─ Navigation     ▾
│   ├─ Data Entry     ▾
│   ├─ Data Display   ▾
│   ├─ Case Study     ▾
│   ├─ Feedback       ▾
│   └─ Reference      ▾
└─ Where to go next         ← 錨點
```

- **整條 sidebar 是一個 `Accordion` / nav 元件、一份資料**，不是「TOC 卡片 + 另一個 Accordion」兩塊拼起來。分類（General…Reference）是「Component Explorer」這一項的子層，不再獨立成另一個 widget。
- 階層：第 1 層 = 頁面區段（含 Component Explorer）；第 2 層 = 元件分類；第 3 層 = 元件。只有 Component Explorer 與各分類可展開，其餘錨點無子項。
- 展開行為：分類維持 **single-open**（展一個收其他）；點元件 = 設 active，右欄同頁切換。預設只露第 1 層，**不一次 show 全部**。
- **絕對不可**再出現「On this page」與分類清單上下並列成兩個視覺分離的區塊。

### 4.2.1 視覺與間距規範（套 DS、消除「拼裝感」）
所有層級共用同一套 token 與節奏，不可每塊各自硬刻：
- **垂直節奏統一**：列與列的間距用同一個 `--hm-space-*` 階；層級之間（第 1 層群組 → 第 2 層）的留白也走同一套 spacing scale，不要出現現在那種無理由的大塊空白。
- **縮排表達階層**：每深一層用固定的縮排階（如 `--hm-space-4`）表示父子關係，而不是靠「換一個獨立區塊」來區隔。
- **字級 / 顏色一致**：同一層級用同一個 `--fs-*` 與文字 token；用字重 / 大小寫 / 顏色（如 active 用 `--hm-purple`）表達層級與狀態，而不是兩塊用不同字級各自為政。
- **互動樣式一致**：hover / active / focus、chevron 圖示與對齊、展開動畫，全層級共用一套；chevron 垂直對齊統一。
- **active 與自動展開**：進入某元件時，其所屬分類與 Component Explorer 自動展開並高亮當前項，捲動到可視範圍。
- 桌機 sticky 左欄；手機 ≤768px 用同一套導覽收進可收合面板，不另做 `<details>`。

### 4.3 右欄：寬版內容（同頁切換，不換路由）
- 佔據左欄以外的**全部剩餘寬度**（門面 + active 元件內容都在這欄），不可被導覽壓成窄條。
- 顯示 active 元件 / foundation 的內容，沿用 `DesignSystemDocsPage` 既有區塊（範例 / 何時用 / 狀態 / token / a11y / 參考）。
- 切換靠 **client state**；可選用 `#slug` hash 同步網址，供分享 / 重新整理保留位置（非真正路由切換）。

### 4.4 移除多路由
- 刪除 `app/design-system/[...slug]/`（含 `generateStaticParams` / `generateMetadata`）。
- `DesignSystemDocsPage` 改成吃 prop、在單頁內渲染的元件，不再是 route page。
- `getDesignSystemHref` 不再導向路由；若保留只用來產生 `#hash`。確認全站沒有殘留連到舊 route 的連結。

---

## 五、Accordion 元件

1. 新建 `components/ui/Accordion.tsx`：
   - 支援單開 / 多開（`type="single" | "multiple"`）、受控 / 非受控、`defaultOpen`。
   - 鍵盤：`Enter`/`Space` 切換、`Tab` 聚焦、方向鍵在 header 間移動（可選）。
   - a11y：`button` + `aria-expanded` + `aria-controls`，內容區 `role="region"` + `aria-labelledby`。
   - 動畫遵守 `prefers-reduced-motion`，用 `--hm-duration-*` / `--hm-ease-*`。
2. 用 `Accordion` 做 `/design-system` **單頁的左欄巢狀導覽**（分類 = accordion section、single-open；展開後列出該分類元件，點元件設 active、右欄同頁顯示內容）。手機版用同一套 accordion，不另做 `<details>`。
3. 納入 DS 文件：在資料模組 `componentSeeds`（或 Navigation/Data Display 分類）新增 `accordion` 條目，source 指向 `components/ui/Accordion.tsx`，states / tokens / usage 以實作為準。
4. 落地頁既有的 `ds-token-toggle`（token group 展開）評估是否改用同一個 `Accordion`，避免兩套展開邏輯。

---

## 六、以 code 為準的內容校正

對 `lib/design-system-docs.ts` 每個 `componentSeed` 逐一核對真實元件：
- `source` 路徑必須存在（移除或實作 `CopyButton`）。
- `states` 對照元件實際 variant / prop（如 `Button` 的 `variant`、`size`、`loading`）。
- `tokens` 只列該元件**真的消費**的 `--hm-*`（用 `rg` 在元件 / CSS 內搜尋確認），刪除預設樣板 token。
- `usage` / `accessibility` 改寫成該元件實際行為，不留 `Reusable X pattern…` 樣板。
- 修正 `--hm-text-*` → 對齊 `tokens.css` 真實名稱（`--text-*` 或補上 `--hm-text-*` alias，二擇一，先確認 code 現況）。

> 範圍提醒：約 30 個元件，逐一核對是主要工時。建議先做 Foundations + 高曝光元件（Button / Input / ProjectCard / Navbar / Tabs / CaseHero），再補其餘。

---

## 七、執行階段

- **Phase 0**：✅ 已完成（2026-06-25）建立資料模組骨架 + 驗證腳本；`check:tokens` 已接到 `package.json`，目前可列出既有漂移 `--hm-text-heading`。
- **Phase 1**：✅ 已完成（2026-06-26）落地頁 `page.tsx` 改讀資料模組，刪 inline 重複；統一由 `designSystemTokenRows` 供應，解決重複與漂移問題。
- **Phase 2**：✅ 已完成（2026-06-25）建 `Accordion` 元件 + 文件，替換 desktop sidebar 與 mobile docs menu。
- **Phase 3**：✅ 已完成（2026-06-26）逐元件以 code 為準校正 docs 內容（保留案例元件不更動）。
- **Phase 4（重新定義 2026-06-26：單頁 explorer）**：✅ 已完成（2026-06-26）
  1. **移除多路由** `app/design-system/[...slug]/`（見 §4.4）。✅ 已做
  2. `/design-system` 改 client 單頁，**固定兩欄**：左 = 一條整合 sidebar、右 = 寬版主內容區。✅ 已做
  3. **左欄把 TOC 與分類 Accordion 合成「同一棵樹」**（見 §4.2 結構圖）：分類收進「Component Explorer」底下，整條 sidebar 是一個 nav 元件 / 一份資料，不是兩塊拼起來。✅ 已做
  4. **套 §4.2.1 視覺與間距規範**：垂直節奏、縮排、字級、hover/active 全層級共用一套 token，消除現在的「拼裝感」與無理由空白。✅ 已做
  5. 門面（介紹 + 設計原則 + token 總覽）放在右欄主內容區頂部；右欄 state 切換、不換路由（可選 `#hash`），佔滿剩餘寬度。✅ 已做
  6. 預設只露第 1 層、分類 single-open，不一次 show 全部。
  > ⚠️ 第二版（截圖）「On this page」與分類清單在左欄上下並列成兩個視覺分離區塊——**這是要修掉的點**，依 §4.2 合成同一套導覽。
- **Phase 5**：頁面本身套 DS（用真元件 / `--hm-*`，收斂 `ds-*` 一次性樣式；不得用 DS page 自己的樣式反向定義設計系統）。
- **Phase 5.5**：導入 Case Study DS Contract（等 consolidation green batch 穩定後，文件化真實 case-study components / tokens / exceptions）。
- **Phase 6**：全面驗證（lint / build / `check:tokens` / RWD / a11y / 中英文 / console 0 error；`/design-system` 必測 1440 / 1024 / 768 / 390px）。

---

## 八、Public Interfaces（預計新增 / 調整）

```ts
// lib/design-system-data.ts（單一來源）
export const tokens = { colors: {...}, typography: {...}, ... };
export const designSystemSections = [...];
export const designSystemDocs = [...];
```
```tsx
// components/ui/Accordion.tsx
<Accordion type="single" defaultValue="data-display">
  <Accordion.Item value="...">
    <Accordion.Header>...</Accordion.Header>
    <Accordion.Panel>...</Accordion.Panel>
  </Accordion.Item>
</Accordion>
```
```jsonc
// package.json
"scripts": { "check:tokens": "node scripts/check-design-tokens.mjs" }
```

既有 `DesignSystemPlayground`、`DesignSystemDocsPage`、`getDesignSystemDoc` / `getDesignSystemHref` 的對外 API 盡量相容；route 結構以單頁 hash/state 為準，舊 `/design-system/{kind}/{slug}` 多路由不得復活。

---

## 九、禁止修改與風險

- **不推 `main`**：DS 頁屬於整站維護，但這次改動範圍大、影響 `/design-system` 全頁，先走 `codex/ds-page-alignment` 分支 + Vercel Preview 驗證，待 Hming 確認再上線。
- 不改其他頁面（首頁 / About / Contact / 案例頁）的內容與行為；只動 design-system 相關檔與共用 token。
- 不動 `tokens.css` 的值（除非確認是 bug）；本計劃以「文件對齊 code」為方向，不是反過來改 code 遷就文件。
- Accordion 替換 sidebar 時保留現有 active state、當前分類自動展開、鍵盤與 a11y 行為，不可退化。
- 逐元件校正時，一次一類，改完即在 Preview 驗證對應路由，不要等全部改完才測。
- Case Study 文件未拿到 consolidation 的 green contract 前，不可自行補樣板內容。

---

## 十、執行規格

### 執行前必讀
- `AGENTS.md`、母 repo `AGENTS.md`、母 repo `000_Agent/memory/MEMORY.md`、`Memory.md`
- `docs/design-system.md`（已對齊 Google `design.md` 順序，頂端有機器可讀 TOKENS 區塊）
- `styles/tokens.css`（token 唯一真實來源）
- `app/design-system/page.tsx`、`app/design-system/[...slug]/page.tsx`
- `components/DesignSystemPlayground.tsx`、`components/design-system/DesignSystemDocsPage.tsx`、`components/design-system/ComponentDemo.tsx`
- `lib/design-system-docs.ts`
- `components/ui/*`（核對每個被文件化的元件）

### 每階段工具
- 搜尋 / inventory：`rg`、Node script。
- Token 驗證：`scripts/check-design-tokens.mjs`（本計劃新增）。
- UI 實作：`frontend-craft`；若執行端沒有此 skill，需用 `docs/design-system.md` + live baseline + browser screenshot checklist 補齊。
- 多斷點：`rwd-audit`；若執行端沒有此 skill，需手動跑 `1440 / 1024 / 768 / 390px` browser smoke test。
- React 元件改完：`react-best-practices`。
- 瀏覽器驗證：localhost + preview 工具；部署驗證：feature branch 的 Vercel Preview。

### 完成定義
- 落地頁與多路由頁的 token / 元件清單來自同一份資料模組，無重複手抄。
- `check:tokens` 通過：文件引用的每個 token 都存在於 `tokens.css` 且值一致。
- `/design-system` 是單頁 explorer：**固定兩欄**（左整合 sidebar + 右寬版內容），點元件在同頁切換、不跳路由。
- 左欄是**一棵樹的整合導覽**（TOC 錨點 + 分類 Accordion 同屬一個 nav、一份資料，分類收進 Component Explorer 底下），全層級共用同一套 `--hm-space-*` / 字級 / hover 規範，**無拼裝感、無無理由空白**；右欄內容區佔滿剩餘寬度，不得被壓窄或出現三欄。
- 每個元件文件的 states / tokens / usage 對得上真實 code，無幽靈元件、無樣板字串。
- Case Study 元件文件完全遵守 consolidation 產出的 Case Study DS Contract；特殊 project-specific exception 不被誤列為 core reusable component。
- `/design-system` 自身 UI 套用站上共用元件與 `--hm-*`。
- lint / build / RWD / a11y / 中英文 / console 全部通過。

### Commit 建議
每個 green batch 獨立 commit + push，持續使用分支 `codex/ds-page-alignment`；不得自行合併或推 `main`。
