# Case Study Design System 共用化重構計劃

目標專案：`400_Projects/hmingportfolio`
本機路徑：`/Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio`
建立日期：2026-06-25
狀態：🔄 執行中（partial）— 於 2026-06-25 re-baseline；下方「○、進度校準」為當前真實基準，請從斷點接續，勿從頭重跑。

## ⛓ 並行執行協定（worktree 分工，2026-06-26）

DS 頁與案例頁兩份計劃**同時進行**。為避免同一資料夾被兩個 session 互相蓋檔，已切成兩個 git worktree（同 repo、不同資料夾、不同分支）：

| 工作流 | 資料夾 | 分支 |
|---|---|---|
| **案例頁（本計劃）** | `400_Projects/hmingportfolio`（原資料夾）| `codex/design-system-remediation` |
| DS 頁 | `/Users/hmingdesigner/Documents/hmingportfolio-dspage` | `codex/ds-page-alignment` |

**本（案例頁）session 只准改這些檔：**
- `app/{advantech,crypto-arsenal,laushu}/**`
- `components/case-study/**`
- `styles/case-study*.css`
- `styles/tokens.css` 的 `--cs-*`（可加，別動其他值）

**禁止碰（屬 DS 頁 session）：** `lib/design-system-docs.ts`、`lib/design-system-data.ts`、`app/design-system/**`、`components/ui/Accordion.tsx`、`components/design-system/**`、`components/DesignSystemPlayground.tsx`。

**重疊區（交給 DS 頁、最後才做）：** 原 §八的「更新 Design System 文件站的 case 元件頁面」**不在本 session 做**——由 DS 頁 session 在本計劃推進到 Phase 4+ 後統一處理，避免兩邊同時改 `lib/design-system-docs.ts`。

**合併：** 兩條分支各自 commit；期間都不自行推 `main`，最後由 Hming 指示再把兩條合進 `main`。

## 🛡 2026-06-27 安全執行補強（優先級高於下方舊 phase 紀錄）

這份計劃前期曾為了加速做過 200+ 行級的大批抽換，造成 Hming 原本喜歡且已調好的介面被改壞。後續執行本計劃時，**CSS 行數下降不是第一目標；不破壞目前正式站視覺才是第一目標**。

### 1. 正確介面來源：正式站 live baseline

- 目前 Hming 認定的正確介面以正式站為準：`https://hmingdesign.com/en`。
- 每個批次開工前，先用正式站建立 touched routes 的 live baseline：
  - 全站共用 UI：`/en`。
  - 若本批動案例頁：同時抓 `/en/advantech`、`/en/crypto-arsenal`、`/en/laushu` 中被影響的頁面。
  - 中文版也要抽查對應 `/zh-TW/...`，避免英文正常、中文壞掉，或反過來。
- baseline 至少包含 `1440 / 1024 / 768 / 390px` 截圖與水平溢出量測；若時間壓力大，最低限度是本批 touched route 的 `1440 + 390` 視覺截圖，再補 `1024 / 768` RWD 量測。
- local 改完後只能和 live baseline 比，不可以用「重構後上一版 local」自我證明沒壞。若 live 站與本機內容已有刻意差異，需在 commit 訊息或批次紀錄寫明「差異是內容版本差，不是 layout regression」。

### 2. 批次大小與驗證節奏

後續禁止再做「看起來同類就一次全域大替換」的改法。每個批次只能符合以下其中一種大小：

- **單一 pattern 橫跨多頁**：例如只處理 quote / data table / media frame / feature row 其中一種 primitive。
- **單一頁的 1-2 個 section**：只清該 section 內已確認可替換的 selector family。
- **CSS selector family 上限**：一次最多清 8-12 組舊 selector family，且必須先列 mapping 表。
- **程式碼 diff 上限**：正常批次目標約 150-250 行淨變更；超過 300 行前要停下來拆批，除非只是機械刪除已驗證 dead CSS。

每個批次都要跑完「小綠燈」才可以進下一批：

1. `git diff --check`
2. `npm run lint`
3. `npm run check:tokens`
4. `npm run audit:architecture`（若本批動 `styles/case-study*.css` 或 `styles/tokens.css`）
5. touched routes 的 browser smoke test：`1440 / 1024 / 768 / 390px`、horizontal overflow = 0、console 0 error。
6. touched interactions：Proposal Tabs、ZoomableImage、video/lightbox、flow horizontal scroll、TOC active、language route。
7. 至少人工看過桌機與手機截圖，確認 live baseline 中 Hming 喜歡的版面節奏沒有被共用化抹平。

**每個小綠燈批次通過後，必須立刻 commit + push 到當前 feature branch `codex/design-system-remediation`。** 這裡的 push 只限 feature branch，絕不可推 `main`。commit 前必須 `git status`，只 stage 本批自己改的檔案與本批驗證腳本；不得 `git add .` 夾帶其他 agent 或 Hming 的改動。

若任何檢查失敗：

- 先修本批，不可疊下一批。
- 若 30-45 分鐘內無法修回 live baseline，先停止並回報 Hming：壞在哪、可能原因、要保留特殊版型還是繼續 token 化。
- 不可為了讓檢查過關而降低驗證條件、刪掉測試、或把特殊視覺硬改成一般卡片。

### 3. 特殊 / 困難 / Hming 喜歡的元件決策門檻

以下類型在改之前必須先停下來跟 Hming 討論，不可直接套 token 或硬抽共用：

- connector / timeline / radial / flow / matrix / survey / donut / bar chart / task flow SVG。
- 有精確座標、箭頭、連線、foreignObject、lightbox、video mask、before-after 對照的區塊。
- live baseline 明顯有專案性格，且 Hming 曾手調過或表達喜歡的版型。
- 套共用 component 後會改變閱讀順序、圖文比例、卡片密度、背景節奏、標題層級或 mobile 堆疊順序。
- 需要新增 `--cs-*` token、改既有 token 值、或把 route-local token 提升到共用層。

討論時請提供三個選項，讓 Hming 決定：

1. **套既有 shared pattern**：只在視覺幾乎同資訊層級、同互動行為時使用。
2. **新增 shared primitive**：至少兩個案例會重複，且能用共用 API 表達，不會吃掉專案個性。
3. **保留專案專屬版型**：如果該版型不會重複但 Hming 喜歡，就保留在 route visualization component / route scoped CSS，最多補 route-local token（例如 `--laushu-survey-*`），並在 `docs/design-system.md` / `Memory.md` 註明「這是刻意例外，不是未完成共用化」。

判準：**Design System 只收斂重複且同資訊層級的東西；單一專案裡好看的獨特版型可以被文件化為例外，不必犧牲成 generic component。**

Token / component / narrative 的總原則：

> **核心規則 token 化，重複元件 component 化，單次敘事區塊保留彈性。**

- **核心規則 token 化**：跨頁會影響一致性的顏色、文字階層、spacing、radius、shadow、motion、breakpoint、focus / hover / disabled 狀態，才提升成 `--hm-*` 或 `--cs-*` token。
- **重複元件 component 化**：同一資訊層級、同一互動模式、同一版型在 2 個以上案例或多個 section 反覆出現時，才抽成 `components/case-study/*` pattern。
- **單次敘事區塊保留彈性**：只服務單一故事段落、單一研究視覺、單一專案情緒或 Hming 明確喜歡的獨特排版，保留 route-local CSS / visualization component / route-local token；不用為了「看起來更系統化」硬塞進共用元件。

避免過度 token 化：

- 不要把每個 `px`、每個顏色、每個一次性漸層都升成 token；token 的價值來自「會重複、會一起改、會影響一致性」。
- 若某個值只在單一敘事區塊出現一次，且不是核心規則，直接留在該 section / visualization CSS 可以接受。
- 若某個值在單一專案內重複，但不該影響其他案例，用 route-local token，例如 `--laushu-survey-*`、`--ca-matrix-*`。
- 若某個值跨案例重複，且語意一致，再提升為 `--cs-*`。
- 若某個值跨整站重複，且不只 case study 會用，再提升為 `--hm-*` / foundation token。

Token 繼承關係必須清楚：

```text
foundation token（--hm-* / --fs-* / --text-*）
  -> case semantic token（--cs-*，定義 case study 的語意，如 accent / surface / line）
    -> project theme token（.theme-<slug> 只覆寫色彩與少量品牌語意）
      -> route-local token（只服務該案例特殊敘事或 visualization）
        -> one-off value（只出現一次、沒有共用價值時可直接寫）
```

新增 token 時要先選最低可行層級；不要一開始就升到 `--hm-*` 或 `--cs-*`。只有當下一批或第二個案例真的需要同一語意時，才往上提升。

### 4. 與 DS page alignment 的交接契約

本計劃每完成一個可 push 的 green batch，若有新增或穩定化 case-study component / token / primitive，必須同步留下「Case Study DS Contract」資訊，供 `codex/ds-page-alignment` 使用：

- component 名稱、source path、公開 props / variants。
- 對應 class / token：哪些是共用 `--cs-*`，哪些是 route-local exception。
- 可用範例：至少列一個實際 route + section。
- 禁止用法：哪些情境不可套這個 component。
- 視覺驗證證據：baseline route、斷點、互動、commit hash。
- 例外清單：保留專屬版型的原因與 Hming 決策。

DS page alignment 只能文件化這份 contract 與真實 code；不能在 `/design-system` 自己發明 token、props、variant 或把 route-local exception 包裝成正式共用元件。

## ○、進度校準（2026-06-25 re-baseline）

> 掃描 `codex/design-system-remediation` 分支現況得出。共用 pattern 元件已建好並接進部分 section，但**多數舊 CSS 尚未刪、Crypto / Laushu 大量 section 未遷移**。⚠️ 這批工作目前**全部未 commit**（untracked + modified），接手前建議先做一個 checkpoint commit。

### 已建好的共用 pattern（`components/case-study/`）
`CaseStudyShell`、`CaseTOC`、`CaseHero`、`CaseSection`、`CaseSectionHeader`、`CaseHeading`、`CaseInfoGrid`（+`CaseInfoItem`）、`CaseGrid`、`CaseCard`、`CaseMedia`、`CaseMetricGrid`、`ZoomableImage`、`FlowScrollHint`。

### 計劃要、但**尚未建立**的 pattern
目前 Phase 4 預定 pattern 均已建立；後續待擴充跨案例覆蓋與 CSS 命名收斂。

### 已建立、仍待跨案例擴充的 pattern
`CaseBeforeAfter` 已建立並接入 Crypto Arsenal `IterationSection`；Laushu iteration comparison 尚保留現況，待後續評估是否改用同 pattern。
`CaseFlowFrame` 已建立並接入 Crypto Arsenal `BackgroundSection` 兩個流程圖外框；Research matrix、Laushu task flow 仍待後續幾何隔離。
`CaseFeatureRow` 已建立並接入 Laushu `ProtoStep` note + image row；connector 仍保留原本幾何。

### 已移入共用層、但 API 仍待 Phase 4 收斂的 pattern
`CaseProposalTabs` 已移至 `components/case-study/CaseProposalTabs.tsx`；`classes` adapter 已改為 `variant="solution" | "wireframe"`，後續仍需把樣式命名從 route-specific class 收斂為共用 `cs-proposal-*`。

### 各案例遷移進度
| 案例 | section 結構 | 已接共用 pattern | 未遷移 |
|---|---|---|---|
| **Advantech** | 11 個 section | **11/11 全部**（Hero/Section/Heading/Card/Grid/Media）| 主要剩刪舊 `cs-*` CSS |
| **Crypto Arsenal** | 14 個 section | **10/14**（Hero、Problem、Reflect、Current、Decision、Impact、Final、Research、Iteration、Role；11/14 已接 CaseSectionHeader；Impact quote cards 已接 CaseCard、impact table 已接 CaseMedia；Background 流程圖外框已接 CaseFlowFrame；Iteration 已接 CaseBeforeAfter）| Research 矩陣、FinalVideo、Wireframe；Research 矩陣仍主要是流程圖幾何，Wireframe ProposalTabs CSS 命名待 Phase 6 收斂 |
| **Laushu** | JSX 集中 `page.tsx`（未拆 section）| 局部（CaseHero×2、CaseCard×16+iteration comparison panels、CaseGrid×11；Overview / Problem / Understand / Converge / Iterate / Demo / Prototype media 已接 CaseMedia；Prototype row 已接 CaseFeatureRow）| 未拆 section、未清 `laushu-*`；Prototype connector 幾何仍待 Phase 5 |

### 殘留舊 CSS（Phase 6 幾乎未動）
| 檔案 | 行數 | unique 私有 selector |
|---|---:|---|
| `case-study.css`（共用）| 681 | `cs-*` 共 288（含共用 + 私有混用）|
| `case-study-advantech.css` | 2,785 | — |
| `case-study-crypto-arsenal.css` | 1,941 | `ca-*` 155 |
| `case-study-laushu.css` | 2,259 | `laushu-*` 140 |

### Phase 狀態速覽
| Phase | 狀態 | 說明 |
|---|---|---|
| 0 視覺基準 / class inventory | 🔄 部分 | 元件已存在；但**無正式 class inventory 與舊→新 mapping 表** |
| 1 token + CSS ownership | 🔄 部分 | `.cs-page` 已有 `--cs-*` 中性預設；但 `.theme-crypto-arsenal` 等仍把 `.ca-h2 / .ca-tag / .ca-section-alt` **元件樣式掛在 theme selector 下**（違反「theme 只設色」），需收斂 |
| 2 Shell / Hero / Section | 🔄 大部分 | `CaseSectionHeader` 已建；Crypto 11 個 section header 已接、Laushu `LaushuHead` 已接；仍需清舊 `ca-*` / `laushu-*` header CSS |
| 3 Card / Grid / Media | 🔄 部分 | 元件已建；Advantech 接入、Crypto 已補 Current / Final / Impact table `CaseMedia`、Decision / Impact / Research / Iteration / Role / Impact quotes `CaseCard`，Impact 另接 `CaseMetricGrid`，Research 截圖接 `CaseMedia`；Laushu 已補 Overview / Problem / Understand / Converge / Iterate / Demo / Prototype `CaseMedia`、Demo / Interview guide / Persona / Iteration board `CaseCard`、Iteration comparison `CaseCard` |
| 4 互動 / 方案展示 | 🔄 大部分 | `CaseProposalTabs` 已搬至 `components/case-study/`，Advantech / Crypto 使用端已改用 `variant`，且樣式已統一為 `cs-proposal-*`；`CaseBeforeAfter` 已建立並接入 Crypto Iteration；`CaseFlowFrame` 已建立並接入 Crypto Background；`CaseFeatureRow` 已建立並接入 Laushu Prototype；仍待其他 pattern 的跨案例擴充 |
| 5 視覺幾何隔離 | ✅ 完成 | Crypto Research matrix 已抽成專屬 `FlowMatrixBoard`；Laushu task flow SVG 維持專屬 component、外框已接 `CaseFlowFrame`；Advantech / Laushu connector engine 已移至共用 case-study 層，route 僅保留 SVG 資產與排列 hook |
| 6 刪舊 CSS + 命名統一 | 🔄 進行中 | Proposal Tabs 的共用 CSS 已移至 `styles/case-study.css`，component 與 route CSS 的舊 `cs-sol-*` / `ca-wf-*` 相容層已刪除；下一批繼續清理已遷移 pattern 的舊 selector |
| 7 全面驗證 | ⬜ 未開始 | — |

### 建議接續順序（從斷點）
1. **先 commit 現有 in-flight checkpoint**（6 個新元件 + 9 個改動檔），避免遺失。
2. 補齊 **Phase 2/3**：Crypto Arsenal 11 個未遷移 section + Laushu 拆 section / 接 pattern；同步補建 `CaseSectionHeader`。
3. 收斂 **Phase 1**：把 `.theme-xxx .ca-*` / 私有元件樣式抽離 theme selector，theme 只留色 token。
4. **Phase 4**：建互動 pattern、把 ProposalTabs 搬進 `components/case-study/`。
5. **Phase 5**：隔離流程圖 / connector / timeline 幾何。
6. **Phase 6**（重頭戲）：逐頁刪 `ca-*` / `laushu-*` / 私有 `cs-*`，CSS 大幅縮減。
7. **Phase 7**：lint / build / RWD / 互動 / 中英文驗證。
8. 與 `2026-06-25_design-system-page-code-alignment-plan.md` 的關係：那份要文件化 `CaseHero` / `CaseSection` 等；建議本計劃至少做到 Phase 4（pattern API 穩定）後，再執行 DS 頁文件對齊，避免文件追著變動的 API 跑。

---

## 一、目標

將 Advantech、Crypto Arsenal、Laushu 三個案例頁從「共用 shell、各自重做內部 UI」改成真正共用的 Case Study Design System。

完成後：

- 每個案例只能用 `theme-<slug>` 指定專案顏色。
- Layout、spacing、typography、radius、shadow geometry、motion、RWD 與互動元件全部由共用層管理。
- 專案 route 只提供內容、圖片、影片、資料與流程圖幾何。
- 新案例不再複製整支 CSS，只需組合既有 Case Study patterns。

## 二、掃描結論

### 現況規模

| 檔案 | 行數 | Unique class | Declaration | 寫死 layout / spacing |
|---|---:|---:|---:|---:|
| `styles/case-study.css` | 579 | 45 | — | — |
| `styles/case-study-advantech.css` | 2,820 | 250 | 1,544 | 365 |
| `styles/case-study-crypto-arsenal.css` | 1,944 | 163 | 1,045 | 250 |
| `styles/case-study-laushu.css` | 2,271 | 161 | 1,141 | 296 |
| 三個專屬檔合計 | 7,035 | — | 3,730 | 911 |

舊文件只統計 `cs-*`，但 Crypto Arsenal 大量使用 `ca-*`，Laushu 大量使用 `laushu-*`，因此「41% 未套用 Design System」其實低估了問題。

### 已共用

- `CaseStudyShell`
- `CaseSection`
- `CaseHeading`
- `CaseTOC`
- `ZoomableImage`
- `FlowScrollHint`
- `Button`
- 部分 Proposal Tabs 邏輯

### 仍重複製作

- Hero 與專案資訊列
- Section Header、kicker、lead、divider
- Card、Info Card、Metric Card、Grid
- Media Figure、caption、image frame
- Proposal Tabs 的完整視覺與 class mapping
- Feature Row、說明卡、圖片列、connector
- Before / After、Decision、Result、Reflection 版型
- Flow / Timeline 外框、scroll container 與 RWD
- 大量 spacing、radius、type、shadow、breakpoint 規則

## 三、目標架構

```text
Foundation tokens
  └─ Case Study semantic tokens
      ├─ Case Study Shell
      ├─ Case Study Patterns
      └─ Project Theme + Content
```

### 1. Foundation

沿用：

- `--hm-space-*`
- `--hm-radius-*`
- `--hm-shadow-*`
- `--hm-fs-*` / `--fs-*`
- `--hm-duration-*`
- `lib/breakpoints.ts`

### 2. Case Study semantic tokens

在共用層提供中性預設：

```css
.cs-page {
  --cs-accent: var(--hm-purple);
  --cs-accent-strong: var(--hm-purple-700);
  --cs-accent-soft: var(--hm-purple-50);
  --cs-surface: var(--hm-surface);
  --cs-line: var(--hm-line);
  --cs-text-heading: var(--hm-text-heading);
  --cs-shadow-color: rgba(0, 0, 0, 0.12);
}
```

專案 theme 只覆寫值：

```css
.theme-advantech {
  --cs-accent: #005796;
  --cs-accent-strong: #093060;
  --cs-accent-soft: #e5effa;
  --cs-line: #cbdef4;
}
```

禁止 `.theme-xxx .component { display / gap / padding / width ... }`。

### 3. Case Study Patterns

建議共用 API：

| Pattern | 用途 |
|---|---|
| `CaseHero` | cover、meta、title、info items |
| `CaseInfoGrid` | 時間、團隊、角色、工具 |
| `CaseSection` | section surface、anchor、header、lead |
| `CaseSectionHeader` | kicker、heading、divider、description |
| `CaseGrid` | 2 / 3 / 4 欄 responsive grid |
| `CaseCard` | 一般資訊卡、icon card、metric card |
| `CaseMedia` | 圖片、caption、zoom、比例與 max width |
| `CaseProposalTabs` | tabs、slides、navigation、reason |
| `CaseFeatureRow` | feature title、note、image、connector |
| `CaseBeforeAfter` | 前後比較與標記 |
| `CaseMetricGrid` | result / impact 數據 |
| `CaseFlowFrame` | 流程圖外框、scroll、hint、RWD |

### 4. Project Theme / Content

允許保留：

- 專案顏色 token。
- 圖片、影片、文案與資料。
- SVG path、流程圖節點座標、connector 端點。
- 特定圖片比例與內容裁切焦點。

禁止保留：

- 專案版 section padding。
- 專案版 card padding / radius / shadow 尺寸。
- 專案版 grid breakpoint。
- 專案版 typography。
- 專案版 tabs、buttons、media frame。
- 同一資訊層級的第二套 layout。

## 四、執行階段

### Phase 0 — 建立視覺基準與 class inventory　【🔄 部分：元件已建，無 inventory / mapping 表】

1. 以正式站 `https://hmingdesign.com/en` 作為視覺真相來源，產生三個案例與 `/en` 首頁在 `1440 / 1024 / 768 / 390px` 的 live baseline 截圖；中文 `/zh-TW/...` 至少做 touched route 抽查。
2. 建立 selector inventory，為每個 class 標記：
   - `theme-color`
   - `shared-shell`
   - `shared-pattern`
   - `visualization-geometry`
   - `dead / duplicate`
3. 建立舊 class → 新 component / class mapping 表。
4. 先確認中英文頁面、主要互動狀態、horizontal overflow、console error。
5. 為本批預計異動寫出「保留視覺不變清單」：哪些 spacing、圖文比例、背景節奏、mobile 堆疊、connector 位置不能被改掉。

完成條件：每個 route-private class 都有明確去向，不能用「暫時保留」跳過分類。

### Phase 1 — 統一 Case Study token 與 CSS ownership　【🔄 部分：cs-page 預設已做，theme block 仍含元件樣式】

修改：

- `styles/tokens.css`
- `styles/case-study.css`
- `docs/design-system.md`
- `docs/architecture-baseline.md`
- `docs/add-case-study-checklist.md`

工作：

1. 新增共用 `--cs-*` semantic color tokens。
2. 統一 section / content width / spacing / radius / shadow / type token。
3. 將 `.theme-advantech`、`.theme-crypto-arsenal`、`.theme-laushu` 收斂成純顏色變數。
4. 更新架構稽核：theme block 出現 layout property 時直接失敗。

完成條件：theme root 以外不再用 project token 控制 UI geometry。

### Phase 2 — 共用 Shell、Hero、Section　【🔄 大部分：Advantech 全接、Crypto 僅 Hero、Laushu 局部；缺 CaseSectionHeader】

新增或擴充：

- `components/case-study/CaseHero.tsx`
- `components/case-study/CaseInfoGrid.tsx`
- `components/case-study/CaseSection.tsx`
- `components/case-study/CaseSectionHeader.tsx`

遷移：

- 三個 `HeroSection.tsx`
- Crypto Arsenal 的 `ca-h2 / ca-tag / ca-lead`
- Laushu 的 `laushu-section-tag / laushu-head-*`
- Advantech 的 `cs-heading / cs-sub-section-*`

規則：

- Hero 結構相同；差異由 props、圖片與 theme color 決定。
- Section 使用 `tone="paper | surface | media"` 等共用 variant。
- 不再接受 route className 用來改 layout；只允許內容定位或 visualization hook。

完成條件：三頁 Hero、Info Grid、Section Header 的 DOM 與 spacing 規則來自同一套 component。

### Phase 3 — 共用 Card、Grid、Media　【🔄 部分：元件已建，Crypto / Laushu 多數 section 未接】

> 2026-06-25 20:37 更新：Crypto Arsenal 已將 `CurrentSection` 圖片框接 `CaseMedia`，`ImpactSection` 指標卡接 `CaseMetricGrid` + `CaseCard variant="metric"`；`npm run lint` 通過。
> 2026-06-25 20:40 更新：Crypto Arsenal `FinalSection` 影片展示外框已接 `CaseMedia`，保留原本 `FinalVideo` lightbox 邏輯；`npm run lint` 通過。
> 2026-06-25 20:42 更新：Crypto Arsenal `DecisionSection` 兩張決策卡已接 `CaseCard`，以 CSS 變數保留原本彩色 header / body padding；`npm run lint` 通過。
> 2026-06-25 20:48 更新：Crypto Arsenal `ResearchSection` 的左側資訊卡與交易所截圖卡已接 `CaseCard`，截圖 frame 接 `CaseMedia`；流程矩陣仍保留給 Phase 5 幾何隔離；`npm run lint` 通過。
> 2026-06-25 20:52 更新：Crypto Arsenal `IterationSection` 外層 board 與 Before / After panel 已接 `CaseCard`，完整 `CaseBeforeAfter` pattern 留待 Phase 4/5；`npm run lint` 通過。
> 2026-06-25 20:54 更新：Crypto Arsenal `RoleSection` 的流程節點已接 `CaseCard as="div"`，箭頭與流程排列幾何保留原 CSS；`npm run lint` 通過。
> 2026-06-25 21:02 更新：修正 `components/ui/Accordion.tsx` context nullable type check，解除 `npm run build` blocker；Laushu `OverviewSection` 主圖、`ProblemSection` 勞報單範例與 `DemoSection` 影片容器已接 `CaseMedia`，Demo 卡接 `CaseCard`；`npm run lint` / `npm run build` 通過。
> 2026-06-25 21:05 更新：`CaseCard` 支援 `style` prop；Laushu `IterationComparisonCard` 已改用 `CaseCard as="figure"` 保留原本 flex 比例與 `ZoomableImage` 行為；`npm run lint` / `npm run build` 通過。
> 2026-06-25 21:07 更新：Laushu `ConvergeSection` journey map 與 `IterateSection` test result 已接 `CaseMedia`，保留 `ZoomableImage` 放大行為；`npm run lint` / `npm run build` 通過。
> 2026-06-25 21:22 更新：Laushu `interviewGuide` 三張訪談大綱卡已接 `CaseCard`，`PrototypeSection` 的 Hi-fi overview 與 prototype step image frame 已接 `CaseMedia`，connector / feature row 幾何保留給 Phase 4/5；`npm run lint` 通過。
> 2026-06-25 21:28 更新：Laushu 三張 persona card 與四張 `iterationBoards` 外框已接 `CaseCard`，保留原本 `ZoomableImage`、Before/After panel 與箭頭幾何；`npm run lint` 通過。
> 2026-06-25 21:32 更新：Laushu `ResearchTable` 外層已接 `CaseMedia variant="scroll"`，保留原本 table 欄寬與 cell 樣式；`npm run lint` 通過。
> 2026-06-25 21:36 更新：Crypto Arsenal `ImpactSection` 的 quote cards 已接 `CaseCard`，保留原 `ca-impact-quote` 視覺 class；`npm run lint` 通過。
> 2026-06-25 21:40 更新：Crypto Arsenal `ImpactSection` 的操作時間對比表外層已接 `CaseMedia variant="scroll"`，保留原 caption 與 table CSS；`npm run lint` 通過。

新增：

- `CaseGrid`
- `CaseCard`
- `CaseMedia`
- `CaseMetricGrid`

優先遷移：

- Advantech：product、competitor、persona、synthesis、next-step、result cards。
- Crypto Arsenal：diagram、role、problem、research、impact、reflection cards。
- Laushu：summary、problem、stakeholder、use-case、learning、result cards。

建議 variants：

- Grid：`two | three | four | auto`
- Card：`default | accent | metric | media`
- Media：`contained | full | zoomable | scroll`

完成條件：route CSS 不再定義一般 card / grid / media frame。

### Phase 4 — 共用互動與方案展示　【🔄 大部分：CaseProposalTabs 已移至共用層並改用 variant；CaseBeforeAfter / CaseFlowFrame / CaseFeatureRow 已建立】

工作：

1. ✅ 2026-06-25 21:49：將 `app/components/CaseProposalTabs.tsx` 移至 `components/case-study/CaseProposalTabs.tsx`，並更新 Advantech / Crypto imports 與 `components/case-study/index.ts` export；`npm run lint` 通過。
2. ✅ 2026-06-25 21:55：移除目前由各 route 傳入整包 class map 的 API；`CaseProposalTabs` 改由 `variant="solution" | "wireframe"` 選擇內建 class map，Advantech / Crypto 使用端只傳 variant；`npm run lint` 通過。
3. 🔄 視覺已由共用 component + variant 管理；CSS class 命名仍待 Phase 6 收斂。
4. 🔄 建立 `CaseFeatureRow`、`CaseBeforeAfter`、`CaseFlowFrame`。
   - ✅ 2026-06-25 22:02：新增 `components/case-study/CaseBeforeAfter.tsx` 與共用 `.cs-before-after-*` CSS，Crypto Arsenal `IterationSection` 已改用此 pattern，保留 `StepLightbox` 行為；`npm run lint` 通過。
   - ✅ 2026-06-25 22:09：新增 `components/case-study/CaseFlowFrame.tsx` 與共用 `.cs-flow-frame-*` CSS，Crypto Arsenal `BackgroundSection` 兩個流程圖外框已接入；流程圖 SVG 幾何維持原元件；`npm run lint` 通過。
   - ✅ 2026-06-25 22:15：新增 `components/case-study/CaseFeatureRow.tsx` 與基礎 `.cs-feature-row-*` CSS，Laushu `ProtoStep` note + image row 已接入；connector 幾何與原 `cs-sol-*` hook 保留；`npm run lint` 通過。
   - ✅ 2026-06-25 22:18：Phase 4 目前變更已通過 `npm run check:tokens` / `npm run build`。
5. 保留 tabs、lightbox、swipe、keyboard、focus 與 reduced-motion 行為。

完成條件：Advantech、Crypto Arsenal、Laushu 的 proposal / feature pattern 不再各自維護 CSS。

### Phase 5 — 隔離內容視覺幾何　【✅ 完成】

> 2026-06-25 21:43 更新：Crypto Arsenal Research matrix 的欄寬計算、步驟編號解析、exchange row 與 cell stack 已從 `ResearchSection.tsx` 抽至 `app/crypto-arsenal/components/FlowMatrixBoard.tsx`；外框接 `CaseFlowFrame`，matrix 自身視覺維持專屬 geometry；`npm run lint` 通過。
> 2026-06-25 21:48 更新：Laushu `TaskFlowChart` 已改用 `CaseFlowFrame` 管理 header、scroll frame 與 overflow hint，三張 SVG 的 path / node 座標仍留在 `TaskFlowDiagrams.tsx`；同時修正 `CaseFlowFrame` 為單一 wrapper，避免 flex list 把 hint 與 figure 算成兩個項目；`npm run lint` 通過。
> 2026-06-25 21:54 更新：將 `app/advantech/components/FeatureConnectors.tsx` 移至 `components/case-study/FeatureConnectors.tsx`，Advantech / Laushu 均改用共用 connector engine，不再跨案例 import；route 仍保留 connector SVG 資產與排列 class hook；`npm run lint` 通過。
> 2026-06-25 22:00 驗證：Browser 實測 Crypto / Laushu 1440px 與 390px；全頁 horizontal overflow 均為 0。Crypto background flow scrollWidth 519、Research matrix scrollWidth 720 / 560；Laushu task flow scrollWidth 1074 / 1006 / 1956，overflow hint 均顯示；Laushu desktop connector image 已產生實際 width / margin-left。舊 dev HMR move-file error 以薄 re-export adapter 解決，無需重啟 localhost。
> 2026-06-25 最終驗證：`npm run lint`、`npm run check:tokens`、`npm run build` 全數通過，158 個靜態頁面生成成功。Phase 5 完成，專屬幾何已與共用 UI 外框分離。
> 2026-06-26 評估補充：Laushu 剩餘 `table / survey / flow` 不建議在本輪 Phase 6 硬清。`ResearchTable` 已用 `CaseMedia variant="scroll"` 承接外框與水平捲動，表格欄寬 / cell padding / header 色屬內容表格樣式，可暫留 route CSS；三張 `TaskFlowChart` 已用 `CaseFlowFrame variant="split"` 承接 header、scroll frame 與 overflow hint，SVG 固定寬、path、foreignObject 字級屬任務流程圖幾何，可暫留 `TaskFlowDiagrams.tsx` / `laushu-task-*`。`SurveyFlow` / `SurveyStats` / `SurveyInsight` 則仍包含 flow node、donut、bar、quote insight、stat cards 等一整組研究資料視覺，約 60+ 個 `laushu-survey-* / laushu-stat-* / laushu-donut-* / laushu-bar-* / laushu-insight-*` selector，且混有 card / grid / radius / padding 幾何；建議另拆專批做「ResearchVisualization」或「SurveyResults」pattern，不放進本輪純清舊 CSS。2026-06-26 `npm run audit:architecture` 通過 route isolation 與 theme root guard；Laushu 仍有 128 classes / 723 declarations / 371 layout geometry declarations，後續以專批逐步降。

將真正專案專屬的幾何移到：

- 專案資料檔。
- 專案 visualization component。
- 必要時使用 CSS Modules，例如 `FlowDiagram.module.css`。

適用：

- SVG path / connector。
- timeline 節點座標。
- 特定流程圖欄寬計算。
- 產品截圖 overlay 標記。

限制：

- visualization 只能控制自己的內部座標。
- 外框、section、scroll、caption、spacing、RWD 由 `CaseFlowFrame` / `CaseMedia` 管理。

完成條件：專案專屬 CSS 不再同時承擔 UI system 與內容圖形。

### Phase 6 — 刪除舊 CSS 與命名統一　【🔄 進行中：Proposal Tabs / Before-After / FlowFrame / Laushu Feature Row 已清理】

> 2026-06-25 更新：`CaseProposalTabs` 全部 DOM 結構已補上共用 `cs-proposal-*` class 與 `solution` / `wireframe` variant modifier；舊 `cs-sol-*` / `ca-wf-*` class 暫留作 CSS 相容層，後續可逐段搬移 selector。`npm run lint` 通過；Browser 實測 Crypto / Advantech 各 6 個 tabs 可切換，Advantech slide 可由 1 前進至 2，兩頁 horizontal overflow 均為 0。
>
> 2026-06-25 22:12 更新：Proposal Tabs 的 base / state / responsive 樣式已完整移至 `styles/case-study.css`，theme 差異改由 `cs-proposal--solution` / `cs-proposal--wireframe` 與少量 CSS custom properties 管理；`CaseProposalTabs` 已移除 class map，不再輸出 `cs-sol-*` / `ca-wf-*` 相容 class；Advantech / Crypto route CSS 對應舊 selector 與重複 media query 已刪除。`npm run lint`、`git diff --check` 通過，selector 掃描無殘留；待下一步完成 Browser 多斷點驗證。
>
> 2026-06-25 22:18 更新：Proposal Tabs 已完成 Browser 1440 / 1024 / 768 / 390 驗證；Advantech / Crypto 的 tab 切換、slide 前進、桌機 dots / 側邊箭頭、手機頁數 / 導航皆正確，兩頁 horizontal overflow 均為 0。另刪除 Crypto 已無 JSX 引用的 `.ca-ba*` Before/After 舊 CSS；共用 `cs-before-after-*` 在 1440 維持橫排、390 改直排且箭頭轉向正確，`npm run lint` 與 selector 掃描通過。
>
> 2026-06-25 22:24 更新：Laushu Prototype 的 `CaseFeatureRow` 已改用 `cs-feature-row--prototype`，不再傳入 `cs-sol-fr` / `cs-sol-fimg` / `cs-sol-fnote`；對應 base、media、note 與 1023px 堆疊規則已移至 `styles/case-study.css`，route CSS 舊 selector 已刪除。共用 connector engine 同時支援既有 Advantech 與新 `cs-feature-row-*` selector；Browser 實測 1440 桌機交錯與連接線正確、390 說明置上與媒體滿寬，horizontal overflow 皆為 0；`npm run lint`、`git diff --check` 通過。
>
> 2026-06-25 22:28 更新：`docs/design-system.md` 已更新 Case Study 共用元件清單，新增 Proposal Tabs / Before-After / Flow Frame / Feature Row 的 class 與 variant 使用規格。此批 Phase 6 驗證完成：`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`git diff --check` 全數通過；Browser console 0 error。Phase 6 尚有其他已遷移 pattern 的 route CSS / 舊命名待清理，因此狀態維持進行中、不歸檔。
>
> 2026-06-25 22:30 更新：`CaseFlowFrame` 新增 `default` / `plain` / `split` variant；Crypto 背景流程圖改用 default、Research 矩陣改用 plain、Laushu 任務流程改用 split。已刪除 route 端 `ca-diagram` / `ca-diagram-scroll` / `ca-diagram-cap` / `ca-matrix-frame` / `ca-matrix-scroll` / `laushu-fc-figure` / `laushu-fc-scroll` 外框與捲動 selector，只保留 SVG geometry 與 Laushu header theme。`npm run lint`、`git diff --check`、舊 selector 掃描通過；Browser 實測 1440 / 390 的 frame padding、caption、橫向捲動與 mobile hint 正常，horizontal overflow 為 0。
>
> 2026-06-25 22:33 更新：刪除已無任何 import 的 compatibility adapter：`app/components/CaseProposalTabs.tsx`、`app/advantech/components/FeatureConnectors.tsx`；三個案例均已直接引用 `components/case-study/`。`npm run lint`、引用掃描與 `git diff --check` 通過。
>
> 2026-06-25 22:36 更新：Laushu split flow header 的 flex / padding / border / radius / mobile 規則已移入 `cs-flow-frame--split`，route 只透過 `--cs-flow-header-bg` 提供漸層；`laushu-fc-cap` 已移除。另刪除未被任何 CSS / 行為使用的 `is-adopted`、`cs-feature-row--flipped` DOM class。Browser 實測 split header 1440 / 390 幾何與背景一致，horizontal overflow 為 0；`npm run lint`、dead class 掃描、`git diff --check` 通過。
>
> 2026-06-25 22:39 更新：本批收尾驗證通過：`npm run check:tokens`、`npm run build`（158 pages）、三個中文案例頁 390px horizontal overflow 皆為 0，Browser console 皆為 0 error。Phase 6 下一批為 Advantech Solution 仍大量使用的 `cs-sol-fr` / `cs-sol-fimg` / `cs-sol-fnote` feature rows；尚未完成，因此計劃書保留在 `plans/`。
>
> 2026-06-25 23:30 更新：確認 Advantech Solution 的 Feature 1.1 5 列已全部透過 `FeatureStep` wrapper 接入 `CaseFeatureRow variant="process"`，不再直接輸出 `cs-sol-fr` / `cs-sol-fimg` / `cs-sol-fnote`。接著已將 Feature 1.2 4 列也遷移至同一個 `FeatureStep` / `CaseFeatureRow` 結構，保留原本圖片、文字、報警等級 chip 與 `AlarmLevelDemo`；`npm run lint`、`git diff --check` 通過。Feature 2 尚未遷移。
>
> 2026-06-25 23:36 更新：Advantech Solution 的 Feature 2 5 列已遷移至 `FeatureStep` / `CaseFeatureRow variant="process"`，保留原本圖片、文字、報警等級 chip 與 `AlarmLevelDemo`。至此 Feature 1.1 / 1.2 / 2 的流程列皆已改走共用 Feature Row；待驗證後可清理對應舊 selector。
>
> 2026-06-25 23:35 更新：已用系統 Chrome / DevTools Protocol 驗證 Advantech Final Feature rows 的 1440 / 1024 / 768 / 390 斷點。結果：Feature 1.1 = 5 rows、Feature 1.2 = 4 rows、Feature 2 = 5 rows；三組 `oldRows` 皆為 0；四個斷點 horizontal overflow 皆為 0。視覺抽查 1440 與 390：桌機維持左右交錯與 connector，手機改為說明卡在上、圖片在下，沒有明顯爆版或重疊。
>
> 2026-06-26 01:41 更新：清理 Advantech Final Feature rows 遷移後殘留的 `cs-sol-fr` / `cs-sol-fimg` / `cs-sol-fnote` runtime 相容查詢與過時註解；目前 runtime code / styles 已無上述舊 selector，只剩文件中的禁用提醒與歷史計劃紀錄。新增可重跑的 `tmp/verify-advantech-feature-rows.mjs` 驗證腳本，Chrome headless / CDP 量測 1440 / 1024 / 768 / 390：rowCount 14、oldRows 0、horizontal overflow 0；桌機 connector positioning 11，手機 connector 隱藏且 row 改上下堆疊。`npm run lint`、`npm run check:tokens`、`npm run build`、`git diff --check` 通過。
>
> 2026-06-26 02:01 更新：繼續 Phase 6，清理 Crypto Arsenal Wireframe / lead 命名。`ca-wf-banner*` 已改為共用 `cs-proposal-banner*`，樣式移至 `styles/case-study.css`，Crypto route CSS 只保留 banner 色票 token；`ca-lead` / `ca-narrow` 已改為共用 `cs-section-lead`，Crypto route CSS 只保留文字色 token，局部 spacing hook（如 `ca-decision-close` / `ca-research-note`）保留。`docs/design-system.md` 已同步新增 `cs-section-lead` 與 `cs-proposal-banner-*` 規格；selector 掃描確認 `ca-wf-banner` / `ca-lead` / `ca-narrow` 無 runtime 殘留。`npm run lint`、`npm run check:tokens`、`npm run build`、`git diff --check` 通過。
>
> 2026-06-26 02:03 更新：Crypto Arsenal `ca-section-alt` 已收斂成既有共用 `cs-section-surface`，並將原背景色映射到 `.theme-crypto-arsenal { --cs-surface: #f4f6fc; }`，避免視覺變色；`ca-section-alt` runtime / CSS 無殘留。新增 smoke check：`/zh-TW/crypto-arsenal` 1440px 中 `cs-section-surface` = 8、oldClasses = 0、horizontal overflow = 0，lead color 與 proposal banner gradient 正常。`npm run audit:architecture`、`npm run lint`、`npm run check:tokens`、`npm run build`、`git diff --check` 通過。
>
> 2026-06-26 02:08 更新：繼續清理 Crypto 已遷移 media / metric frame。`ca-figure` / `ca-current-figure` / `ca-current-figure-img` 已改為共用 `CaseMedia` 組合：Current 截圖使用 `variant="full"` + `cs-media--compact-gap`，Final video media 直接使用預設 `CaseMedia` frame；新增共用 media spacing helper `cs-media--section-gap` / `cs-media--compact-gap`。Impact 指標卡移除 `ca-impact-card` DOM class，frame 樣式改掛在 `.ca-impact .cs-card--metric` 的 `--cs-card-*` 變數，保留內容文字 class。selector 掃描確認 `ca-figure` / `ca-current-figure` / `ca-impact-card` 無 runtime 殘留。Browser smoke check：`/zh-TW/crypto-arsenal` 1440px horizontal overflow = 0、oldClasses = 0，Current media class 與 metric card padding / border / shadow 正常。`npm run audit:architecture`、`npm run lint`、`npm run check:tokens`、`npm run build`、`git diff --check` 通過。
>
> 2026-06-26 02:10 更新：延續 Crypto Impact frame cleanup，`ca-impact-compare` 已改為共用 `CaseMedia variant="scroll"` + `cs-media--small-gap`；`CaseMedia` 負責水平捲動，route CSS 只保留 caption / table 內容樣式。selector 掃描確認 `ca-impact-compare`、`ca-impact-card`、`ca-figure`、`ca-current-figure` 無 runtime 殘留。Browser smoke check：`/zh-TW/crypto-arsenal` 1440px horizontal overflow = 0、oldClasses = 0，Impact table media class 為 `cs-media cs-media--scroll cs-media--small-gap`。`npm run audit:architecture`、`npm run lint`、`npm run check:tokens`、`npm run build`、`git diff --check` 通過。
>
> 2026-06-26 02:17 更新：延續 Crypto card frame cleanup，`ca-pain-card` / `ca-reflect-card` 已從 DOM 與 CSS selector 移除；Problem / Reflect 仍使用 `CaseCard`，外框變數改由 `.ca-pains .cs-card` / `.ca-reflect .cs-card` 掛載，保留痛點 quote / avatar 與反思內容 class。selector 掃描確認兩個舊 class 無 runtime 殘留。Aside Browser smoke check：`/zh-TW/crypto-arsenal` 1440px horizontal overflow = 0、pain cards = 6、reflect cards = 3，padding / border / shadow / gap 正常。`npm run lint`、`npm run check:tokens`、`npm run build`、`npm run audit:architecture`、`git diff --check` 通過。另新增可重跑 `tmp/verify-crypto-card-cleanup.mjs`，但本輪 headless Chrome 升權執行因 Codex usage limit 暫未跑通。
>
> 2026-06-26 02:31 更新：延續 Crypto Decision card frame cleanup，移除純外框 `ca-dcard` DOM class，外框改由 `.ca-decision .cs-card` 的 `--cs-card-*` 變數承接；保留 `ca-dcard-bad` / `ca-dcard-good` 作為紅綠決策語意 modifier。檢查時發現兩個 modifier 的 gradient、步驟圓點與 outcome 色彩曾被先前清理誤刪，本批已恢復。既有 `tmp/verify-crypto-card-cleanup.mjs` 已直接擴充 Decision 檢查，未另建驗證檔。Browser 1440px 實測：decision cards = 2、old `ca-dcard` = 0、horizontal overflow = 0、紅綠樣式與 card frame 正常、console 0 error；390px Browser 驗證切換逾時，留待同一腳本後續重跑。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。
>
> 2026-06-26 02:55 更新：延續 Crypto Research card frame cleanup，移除 `ca-research-info`、`ca-exchange`、`ca-exchange-media`、`ca-exchange-img` 四個純 frame DOM / CSS hook；資訊卡外框改由 `.ca-research-row > .cs-card` 的 `--cs-card-*` 變數承接，交易所卡改由 `.ca-research-shots > .cs-card` 管理透明 card frame，截圖邊框改掛 `.ca-research-shots .cs-media-frame`。內容 class（head / body / chip / logo / name）與 Research row 幾何保留。既有 `tmp/verify-crypto-card-cleanup.mjs` 已擴充 Research 檢查，未新增腳本。RWD 實測另修正兩個既有問題：mobile 共用 card padding 覆蓋零 padding、1199px 以下 shots 容器未滿寬。Browser 1440 / 390 實測：old classes = 0、info cards = 1、exchange cards = 3、horizontal overflow = 0、console 0 error；1440 資訊卡 300px，390 資訊卡與交易所卡 343px 滿寬、media 341px。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。
>
> 2026-06-26 03:01 更新：延續 Crypto Iteration card frame cleanup，移除 `ca-iter-board` DOM / CSS frame hook；4 張 iteration board 改由 `#cs-sec-iteration > .cs-card` 的 `--cs-card-*` 變數承接 gap、padding、背景、邊框、圓角與陰影，`ca-iter-head` / badge / title / row / desc 與 Before-After 內容排列保留。mobile 差異改用 `--cs-card-padding-mobile`、`--cs-card-gap`、`--cs-card-radius`，不再重複宣告 card frame。既有 `tmp/verify-crypto-card-cleanup.mjs` 已擴充 Iteration 檢查，並依實際資料校正 board count = 4。Browser 1440 / 390 實測：old `ca-iter-board` = 0、boards = 4、horizontal overflow = 0、console 0 error；1440 board padding 28px / gap 24px / radius 20px，390 board 343px 滿寬、padding 22px 18px / gap 20px / radius 16px，Before-After 由 row 正確轉 column。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。
>
> 2026-06-26 03:05 更新：延續 Crypto Impact quote card frame cleanup，移除 `ca-impact-quote` DOM / CSS frame hook；4 張質性回饋卡改由 `.ca-impact-quotes > .cs-card` 的 `--cs-card-*` 變數承接 gap、padding、背景、邊框與圓角，保留 `container-type: inline-size`、`justify-content: space-between` 與 quote / who / name / line / role 內容 class，因此既有 280px container query 行為未改。mobile 明確設定 `--cs-card-padding-mobile: 20px 26px`，避免共用 mobile padding 覆蓋原設計。既有 `tmp/verify-crypto-card-cleanup.mjs` 已擴充 Impact quote 檢查，未新增腳本。Browser 1440 / 390 實測：old `ca-impact-quote` = 0、cards = 4、horizontal overflow = 0、console 0 error；1440 卡寬 470px、390 卡寬 343px，兩者皆維持 padding 20px 26px、gap 16px、radius 14px、綠色背景 / 邊框與 inline-size container。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。
>
> 2026-06-26 03:09 更新：依 Hming 指示改為一次清多個 component 再統一驗證。本批同時移除 Crypto `ca-flow-node`、`ca-final-shot`、`ca-impact` 三個 route frame / layout hook：Role 的 8 個流程節點改由 `.ca-flow-item > .cs-card` 承接 card token 與 desktop / mobile 排列；Final 的 3 個 media 改由 `#cs-sec-final .cs-media` 保留 80px 垂直節奏；Impact metric grid 改由 `#cs-sec-impact .cs-metric-grid` 與其 `.cs-card--metric` 管理三欄 / 單欄與卡片 frame。內容 class、箭頭、影片互動、metric 文字與表格均未改。既有 `tmp/verify-crypto-card-cleanup.mjs` 一次擴充三組檢查，並將 Role count 校正為 8；另移除以內部元素越界數判定失敗的舊條件，避免合法的流程圖 / matrix 橫向捲動被誤報，仍以 document horizontal overflow 為準。Browser 1440 / 390 統一實測：三組 old classes = 0、role nodes = 8、final media = 3、metric cards = 3、horizontal overflow = 0、console 0 error；Role 由 desktop column node 正確轉 mobile row node，Final 維持 80px margin，Metric grid 由三欄轉單欄。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。
>
> 2026-06-26 03:13 更新：延續批次 cleanup，本批一次移除 Crypto `ca-pains`、`ca-reflect`、`ca-decision` 三個 grid hook。Problem / Reflect 的 `CaseGrid variant="three"` 不再傳 route class，樣式改由 `#cs-sec-problem > .cs-grid` / `#cs-sec-reflect > .cs-grid` 定位；Decision 原生 grid div 改為 `CaseGrid variant="two"`，紅綠 `ca-dcard-bad/good` 語意 modifier 保留。共用 `CaseGrid` 現在負責 desktop 三欄 / 兩欄與 768px 單欄，不再維護 Decision 私有 1023px grid 規則。統一 Browser 1440 / 390 實測：old grid classes = 0、pain cards = 6、reflect cards = 3、decision cards = 2、horizontal overflow = 0、console 0 error；1440 欄數與 gap 維持原值，390 三組皆 343px 單欄。驗證時另修正兩個 mobile token 問題：Decision card 設 `--cs-card-padding-mobile: 0` 避免 header 外多一圈，Problem 改用正確 `--cs-card-padding-mobile: 24px 22px`；Reflect 維持共用 20px。既有 `tmp/verify-crypto-card-cleanup.mjs` 已同步擴充三組 old class 檢查。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

> 2026-06-26 03:18 更新：延續 Crypto spacing / wrapper cleanup，移除 `ca-research-flow-board`、`ca-subflow-head`、`ca-overview-gap`、`ca-decision-close`、`ca-research-note` 五個純版面 hook。Research matrix 外框改用 `CaseCard`，`FlowMatrixBoard` 內部只保留矩陣幾何與 `ca-subflow-title` 內容標題；Background / Decision / Research 的段落間距改用共用 helper `cs-section-block--large-gap`、`cs-section-lead--large-gap`、`cs-section-lead--medium-gap`。既有 `tmp/verify-crypto-card-cleanup.mjs` 已擴充此批檢查。Browser 1440 / 390 實測：old classes = 0、Research boards = 2、overview spacing = 2、decision / research lead helpers 正常、horizontal overflow = 0、console 0 error；390 內部 matrix 合法水平捲動，card 343px、padding 20px、border 0。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

> 2026-06-26 11:37 更新：延續 Crypto 批次 cleanup，本批移除 Research / Impact 兩組純排版 wrapper：`ca-research-row`、`ca-research-shots`、`ca-impact-quotes`。Research 倉位資訊與交易所截圖改用共用 `CaseGrid` + `cs-grid--aside-main` / `cs-grid--research-shots`；Impact quote list 改用 `CaseGrid variant="two"` + `cs-grid--quote-list`。內容 class（交易所 label / logo / name、quote / who / role）與截圖 / 表格 / 矩陣幾何未改。既有 `tmp/verify-crypto-card-cleanup.mjs` 已擴充 wrapper 歸零與卡片數量檢查，未新增驗證腳本。Browser 1440 / 390 實測：old wrapper classes = 0、research info cards = 1、exchange cards = 3、impact quote cards = 4、horizontal overflow = 0、console 0 error；1440 / 390 卡片 padding、gap、border、radius、綠色 quote frame 皆維持。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

> 2026-06-26 11:45 更新：延續 Crypto 批次 cleanup，本批移除 Final / Impact 的純文字與 banner helper：`ca-final-banner`、`ca-final-banner-kicker`、`ca-final-banner-title`、`ca-impact-compare-cap`、`ca-impact-method`。Final 三段流程 banner 改用既有共用 `cs-proposal-banner*`，並以 `#cs-sec-final .cs-proposal-banner` 的 CSS 變數保留深藍 gradient、18px 28px padding、6px gap、10px radius 與 kicker 色彩；Impact 操作時間 caption 改用共用 `cs-media-label`，驗證註腳改用 `cs-section-note`。內容文字、影片互動、表格與 quote cards 均未改。既有 `tmp/verify-crypto-card-cleanup.mjs` 已擴充本批 old class 歸零、Final banner count = 3、Impact label / method count = 1 的檢查。Browser 1440 / 390 實測：old classes = 0、horizontal overflow = 0、console 0 error；Final banner gradient / padding / gap / radius / kicker size 維持，Impact caption margin 10px、method margin 16px 與 12px 字級維持。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

> 2026-06-26 11:53 更新：延續 Crypto 批次 cleanup，本批收斂 Role 流程 layout：移除 `ca-flow`、`ca-flow-item`、`ca-flow-arrow`、`ca-flow-num`、`ca-flow-title` 五個 route UI class，改用共用 `cs-step-flow`、`cs-step-flow-item`、`cs-step-flow-arrow`、`cs-step-flow-index`、`cs-step-flow-title`。`styles/case-study.css` 新增共用 step flow desktop wrap / mobile vertical 規則；Crypto route CSS 僅透過 theme token 設定 card 背景、邊框、圓角、編號底色、標題色與箭頭色。背景流程圖 SVG 的 `ca-flow-label` / `ca-flow-currency` 屬 geometry / SVG 文字，保留未動。既有 `tmp/verify-crypto-card-cleanup.mjs` 已擴充 Role flow old class 歸零、role nodes = 8、arrows = 7 與 desktop / mobile computed style 檢查。Browser 1440 / 390 實測：old Role flow classes = 0、horizontal overflow = 0、console 0 error；desktop 維持 chip flow，390 維持直向流程、箭頭旋轉、卡片 row 排列。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

> 2026-06-26 12:03 更新：延續 Crypto 批次 cleanup，本批收斂 Impact metric 文字 helper：移除 `ca-impact-value`、`ca-impact-label`、`ca-impact-body` 三個 route text class，改用共用 `cs-metric-value`、`cs-metric-label`、`cs-metric-body`。`styles/case-study.css` 新增 metric text primitive，Crypto 僅以 `--cs-metric-value-color`、`--cs-metric-label-color`、`--cs-metric-body-color` 保留原藍色數字、深色標題與灰色內文。Impact table / quote / before-after cell class 仍屬內容與表格語意，未改。既有 `tmp/verify-crypto-card-cleanup.mjs` 已擴充 old class 歸零、metric value / label / body count = 3 與 computed style 檢查。Browser 1440 / 390 實測：old metric text classes = 0、horizontal overflow = 0、console 0 error；KPI value 顏色維持 `rgb(55, 106, 220)`，desktop 48px、mobile 36px，label / body 色彩與 body 14px 維持。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

> 2026-06-26 12:10 更新：延續 Crypto 批次 cleanup，本批收斂 Reflect number badge 與 Impact quote 文字 / attribution helper：移除 `ca-reflect-num`、`ca-impact-quote-text`、`ca-impact-quote-who`、`ca-impact-quote-name`、`ca-impact-quote-line`、`ca-impact-quote-role` 六個 route text / attribution class，改用共用 `cs-card-kicker`、`cs-quote-text`、`cs-quote-meta`、`cs-quote-name`、`cs-quote-line`、`cs-quote-role`。`styles/case-study.css` 新增 kicker 與 quote attribution primitives，Crypto route CSS 僅透過 token 保留 reflect badge tint / blue 與 Impact quote 綠色文字、灰色姓名、分隔線色。既有 `tmp/verify-crypto-card-cleanup.mjs` 保留並擴充，不重刪重建；已加入 old class 歸零、reflect kicker = 3、quote text / meta / name / line / role counts = 4 與 computed style 檢查。Browser 1440 / 390 實測：本批 old classes = 0、horizontal overflow = 0、console 0 error；quote card padding / gap / border / container query 維持，reflect badge 色彩維持。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

> 2026-06-26 12:36 更新：延續 Crypto 批次 cleanup，本批收斂 Problem pain quote / attribution / avatar helper：移除 `ca-pain-quote`、`ca-pain-who`、`ca-avatar`、`ca-avatar-img`、`ca-pain-name`、`ca-pain-line`、`ca-pain-role` 七個 route class，改用共用 `cs-quote-text`、`cs-quote-meta`、`cs-quote-name`、`cs-quote-line`、`cs-quote-role`、`cs-avatar`、`cs-avatar-img`。`styles/case-study.css` 擴充 quote primitive 的 size / line-height / letter-spacing token，並新增 avatar primitive；Crypto route CSS 僅在 Problem card 上覆寫 quote token，保留原 pain quote 17px / 500 / ink、姓名 ink、角色 muted、avatar 46px / 12px radius 與窄卡 grid attribution 行為。既有 `tmp/verify-crypto-card-cleanup.mjs` 持續保留並擴充，不重刪重建；已加入 pain old class 歸零、pain quote / meta / name / line / role / avatar / avatar img counts = 6 與 computed style 檢查。Browser 1440 / 390 實測：本批 old classes = 0、horizontal overflow = 0、console 0 error；Problem cards padding / gap / shadow 維持，窄卡 attribution grid 與 English override 改接 shared class。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

> 2026-06-26 12:42 更新：延續 Crypto 批次 cleanup，本批收斂 Research info chip 與 exchange brand label helper：移除 `ca-chip`、`ca-chip-label`、`ca-chip-body`、`ca-exchange-label`、`ca-exchange-logo`、`ca-exchange-name` 六個 route class，改用共用 `cs-info-chip`、`cs-info-chip-label`、`cs-info-chip-body`、`cs-brand-label`、`cs-brand-mark`、`cs-brand-name`。`styles/case-study.css` 新增 info chip 與 brand label primitives；Crypto route CSS 僅以 token 保留 chip tint / blue label / dark body、brand name navy、32px 圓形 logo。既有 `tmp/verify-crypto-card-cleanup.mjs` 持續保留並擴充，不重刪重建；已加入 research chip / brand old class 歸零、chip / label / body counts = 2、brand label / mark / name counts = 3 與 computed style 檢查。Browser 1440 / 390 實測：本批 old classes = 0、horizontal overflow = 0、console 0 error；research card padding / media border / screenshot gap 維持，chip padding 14px 16px、gap 6px、brand gap 10px、logo 32px 圓形維持。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

> 2026-06-26 13:12 更新：延續 Crypto 批次 cleanup，本批收斂 Iteration heading / badge / detail text helper：移除 `ca-iter-head`、`ca-iter-badge`、`ca-iter-title`、`ca-iter-row`、`ca-iter-label`、`ca-iter-desc` 六個 route text / layout class，改用共用 `cs-card-heading-row`、`cs-pill-badge`、`cs-card-heading-title`、`cs-detail-row`、`cs-detail-label`、`cs-detail-body`。`styles/case-study.css` 新增 card heading / pill badge / detail row primitives；Crypto route CSS 只在 `#cs-sec-iteration > .cs-card` 設定 token 與必要 RWD selector，保留原 badge 98px / blue、title 24px / indigo、detail label 98px、15px 灰色文字，以及 1023 / 768 斷點堆疊行為。`ca-iteration-zoom` / `ca-iteration-zoom-img` 屬 lightbox / image interaction class，暫不納入本批。既有 `tmp/verify-crypto-card-cleanup.mjs` 持續保留並擴充，不重刪重建；同時將 CDP 驗證改成動態 port / unique profile，避免固定 9224 或 profile lock 影響後續批次。Browser 1440 / 390 實測：iteration old text classes = 0、heading / badge / title / detail counts = 4、horizontal overflow = 0、console 0 error；desktop 維持 row heading/detail，390 維持 column heading/detail、badge normal wrap、title 21px。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

> 2026-06-26 13:18 更新：延續 Crypto 批次 cleanup，本批收斂 Research info panel frame helper：移除 `ca-research-info-head`、`ca-research-info-body` 兩個 route frame class，改用共用 `cs-panel-head`、`cs-panel-body`。`styles/case-study.css` 新增 panel head / body primitives；Crypto route CSS 僅以 token 保留原 header padding 18px 24px、淡紫 gradient、navy title、body padding 20px 24px 24px、gap 14px、說明文字 secondary / 14px / 1.7。既有 `tmp/verify-crypto-card-cleanup.mjs` 持續保留並擴充，不重刪重建；已將 research info old-count 擴充到 `ca-research-info-head/body`，並加入 panel head / body counts = 1 與 computed style 檢查。Browser 1440 / 390 實測：research info old classes = 0、panel head/body counts = 1、horizontal overflow = 0、console 0 error；Research card padding / border / shadow、chip 與 exchange brand label 上批結果維持。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

> 2026-06-26 13:25 更新：延續 Crypto 批次 cleanup，本批收斂 Decision card frame / counter helper：移除 `ca-dcard-head`、`ca-dcard-body`、`ca-steps`、`ca-dcard-out` 四個 route structure class，改用共用 `cs-status-head`、`cs-status-body`、`cs-counter-list`、`cs-status-outcome`。Crypto 只保留 `ca-dcard-bad` / `ca-dcard-good` 作為語意狀態 class，透過 token 設定紅 / 綠 header gradient、step index 顏色與 outcome 顏色；原 body padding、dashed divider、15px step text、mobile body padding 20px 22px 22px 維持。`styles/case-study.css` 新增 status head/body、counter list、status outcome primitives。既有 `tmp/verify-crypto-card-cleanup.mjs` 持續保留並擴充，不重刪重建；已將 decision old-count 擴充到舊 structure class，並加入 decision head/body/steps/outcome counts 與 computed style 檢查。Browser 1440 / 390 實測：decision old classes = 0、head/body/steps/outcome counts 正確、step items = 6、horizontal overflow = 0、console 0 error；bad/good gradient、counter 色、outcome 色與 mobile body padding 維持。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

> 2026-06-26 14:31 更新：依照本輪評估先只清 Crypto `ca-subflow-title`。本批移除 `ca-subflow-title` route heading class，改用共用 `cs-subsection-title`；`styles/case-study.css` 新增 subsection title primitive，Crypto 只以 `--cs-subsection-title-color: var(--ca-navy)` 保留原 navy、`fs-h3`、700、1.3 line-height。既有 `tmp/verify-crypto-card-cleanup.mjs` 持續保留並擴充，不重刪重建；已加入 `ca-subflow-title` old-count、`#cs-sec-research .cs-subsection-title` count = 2 與 computed style 檢查。Browser 1440 / 390 實測：subflow title old class = 0、subsection title count = 2、horizontal overflow = 0、console 0 error；Research flow board padding / gap / border / background 維持。另將 CDP 驗證改為 Chrome 自動分配 debug port 並讀取 `DevToolsActivePort`，避免隨機 port 偶發啟動失敗。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

> 2026-06-26 14:34 更新：依照本輪要求另開一批專門處理 Crypto `ca-impact-times` table primitive。本批移除 `ca-impact-times`、`ca-impact-before`、`ca-impact-after`、`ca-impact-cut` 四個 route table / cell class，改用共用 `cs-data-table`、`cs-data-table-value--muted`、`cs-data-table-value--strong`、`cs-data-table-value--positive`。`styles/case-study.css` 新增 data table primitive，包含 table shell、thead / tbody padding、first / last edge padding、row border、tabular nums、muted / strong / positive value states 與 640px mobile padding / nowrap 規則；Crypto route CSS 僅用 token 保留 line-soft border、card shadow、tint header、navy row heading / strong value、secondary normal cell、muted before、green cut。既有 `tmp/verify-crypto-card-cleanup.mjs` 持續保留並擴充，不重刪重建；已加入 table old-count、table = 1、head cells = 4、rows = 3、muted / strong / positive value counts = 3 與 desktop / mobile computed style 檢查。Browser 1440 / 390 實測：impact table old classes = 0、horizontal overflow = 0、console 0 error；desktop 維持 14px table font、26px edge padding、green cut，390 維持 12px table font、10px 11px cell padding、22px edge padding。`npm run lint`、`npm run check:tokens`、`npm run build`（158 pages）、`npm run audit:architecture`、`git diff --check`、驗證腳本 syntax check 通過。

1. 逐頁刪除已遷移的 `ca-*`、`laushu-*`、專案私有 `cs-*`。
2. 專案 CSS 最終只保留 theme token 與 visualization geometry。
3. 移除 dead selector、重複 media query、被共用 token 取代的 magic number。
4. 更新 Design System 文件站的 Case Study component 頁面。

Phase 6 每批新增硬性規則：

- 先列 `old selector -> new primitive/token/exception` mapping，不可直接搜尋取代。
- 若 selector 屬於特殊視覺幾何或 Hming 喜歡的專案版型，先走「特殊元件決策門檻」，不要硬刪。
- 一批只處理單一 primitive family；不要把 table、quote、media、flow、card padding 混在同一批。
- 每批清完先驗證 live baseline 對應 route，再 commit + push feature branch，才進下一批。

目標：

- route CSS 行數顯著下降。
- 一般 UI selector 只存在於 `styles/case-study.css`。
- 新案例不需建立完整 `case-study-<slug>.css`。

### Phase 7 — 全面驗證與防回歸　【⬜ 未開始】

必跑：

- `npm run lint`
- `npm run check:tokens`
- `npm run audit:architecture`
- `npm run build`
- live baseline 對照：`https://hmingdesign.com/en`、touched case routes、必要的 `/zh-TW/...`
- `1440 / 1024 / 768 / 390px`
- 中文、英文，不可只測其中一種語言
- 無全站水平捲動
- TOC active state
- Proposal Tabs 鍵盤操作
- ZoomableImage focus / ESC
- Flow horizontal scroll / hint
- reduced motion
- console 0 error

視覺比對：

- 重構前後差異必須是「一致化後的刻意差異」，不能是意外跑版。
- 每完成一個 pattern，同時驗證三個案例，不等全部改完才測。
- 若 local 與 live baseline 有差異，必須標記成 `intentional` / `content-version` / `regression`；只有前兩者可以進 commit。

## 五、建議執行順序

1. Foundation + theme token
2. Hero + Info Grid
3. Section Header + Section spacing
4. Card + Grid + Media
5. Proposal / Feature / Before-After
6. Visualization geometry isolation
7. CSS cleanup + docs

先從三頁都明顯重複的 pattern 開始，不以單一案例逐頁重寫。這樣每完成一個階段，Design System 覆蓋率就會立即提升。

## 六、Public Interfaces

預計新增或調整：

```tsx
<CaseHero cover={...} meta={...} title={...} infoItems={...} />
<CaseSection id="..." title="..." kicker="..." description="..." tone="surface">
<CaseGrid columns={3}>
<CaseCard variant="metric">
<CaseMedia zoomable caption="..." ratio="16/9" />
<CaseProposalTabs tabs={...} />
<CaseFeatureRow title="..." note="..." media={...} />
<CaseFlowFrame hint="左右滑動查看更多">
```

既有 `Button`、`CaseStudyShell`、`ZoomableImage` import API 優先保持相容；需要 breaking change 時先提供 migration adapter。

## 七、禁止修改與風險

- 不改案例內容、研究結論、圖片順序與翻譯文案。
- 不把流程圖重製成圖片。
- 不為了減少 CSS 而破壞視覺層級。
- 不一次刪除所有舊 class；每個 pattern 完成三頁驗證後才移除。
- 不再做 200+ 行未分批的大型抽換；大 diff 必須拆成可驗證的小綠燈批次。
- 不把 Hming 喜歡的單頁特殊版型硬改成 generic card / grid / table；可保留為 route-local exception。
- 不新增共用 token 或改 token 值來遷就單一頁；單頁需要的值先用 route-local token，並記錄例外。
- 不推 `main`，直到 Hming 明確確認上線。
- Laushu 目前大量 JSX 集中在 `page.tsx`，遷移時需避免順便做無關的內容重寫。
- Advantech connector 與 timeline 有精確幾何依賴，必須最後處理並保留既有計算邏輯。

## 八、文件同步

執行時同步更新：

- `docs/design-system.md`
- `docs/architecture-baseline.md`
- `docs/add-case-study-checklist.md`
- `/design-system/components/case-*`
- `/design-system/reference/gaps`
- `Memory.md`（只記可重複的架構決策與踩坑）

## 九、完成定義

- 三個案例的專屬 UI 差異只剩顏色。
- 相同資訊層級在三頁使用相同 component 與 spacing。
- `.theme-xxx` 只設定 color token。
- 一般 UI 不再使用 `ca-*` / `laushu-*` / route-private `cs-*`。
- 專屬 CSS 只包含 visualization geometry 或可被資料取代的內容規則。
- Hming 喜歡但不重複的特殊版型已被明確標成 project-specific exception，而不是假裝還沒完成。
- 已輸出 / 更新 Case Study DS Contract，讓 DS page alignment 能照真實 code 呈現 component、token、variant 與例外。
- 新增第四個案例時，不需複製現有案例 CSS。
- lint、build、RWD、互動與中英文驗證全部通過。

## 十、執行規格

### 執行前必讀

- `AGENTS.md`
- 母 repo `AGENTS.md`
- 母 repo `000_Agent/memory/MEMORY.md`
- `Memory.md`
- `docs/design-system.md`
- `docs/architecture-baseline.md`
- `docs/add-case-study-checklist.md`
- 四支 `styles/case-study*.css`
- `components/case-study/*`
- 三個案例 route 與 sections

### 每階段工具

- 搜尋與 inventory：`rg`、Node script。
- UI 實作：`frontend-craft`；若執行端沒有此 skill，需改用 `docs/design-system.md` + live baseline + browser screenshot checklist 補齊。
- 多斷點檢查：`rwd-audit`；若執行端沒有此 skill，需手動跑 `1440 / 1024 / 768 / 390px` browser smoke test。
- React 元件修改後：`react-best-practices`。
- 瀏覽器驗證：localhost + Browser。
- 部署驗證：目前 feature branch 的 Vercel Preview。

### Commit 建議

每個「小綠燈批次」獨立 commit + push，持續使用：

`codex/design-system-remediation`

不得自行合併或推送 `main`。commit 訊息需包含本批 pattern / route、驗證項目與是否產出 DS Contract 更新。


### 2026-06-26 14:51 Phase 6 Crypto diagram / final video primitives

- 清掉 Crypto background diagram 與 final video 的 route-private frame classes：`ca-diagram-graphic`、`ca-flow-label*`、`ca-flow-currency`、`ca-final-video*`。
- 新增共用 primitives：`cs-diagram-*`、`cs-video-lightbox-*`；Crypto 只保留 diagram/video 的尺寸、mask、focus token 覆寫。
- 延伸既有 `tmp/verify-crypto-card-cleanup.mjs`，加入 diagram/video old-count、數量、樣式檢查，並補 CDP timeout 讓後續驗證不會無限卡住。
- 驗證：`npm run lint` 通過；`node tmp/verify-crypto-card-cleanup.mjs` 於 1440x1000、390x900 通過，oldCounts diagram/video = 0，document overflowX = 0，consoleErrors = 0。


### 2026-06-26 15:06 Phase 6 Crypto matrix primitives

- 清掉 Crypto research matrix 的 route-private classes：`ca-matrix*`、`ca-step-zoom`、`ca-matrix-synth*`。
- 新增共用 primitives：`cs-comparison-matrix-*`、`cs-step-zoom`、`cs-insight-callout-*`；Crypto 只保留 matrix/callout/zoom 的視覺 token。
- 修正 `cs-step-zoom` 與 `cs-zoomable-image` 的 cascade，確保矩陣縮圖仍保留原本深色底與 border。
- 延伸既有 `tmp/verify-crypto-card-cleanup.mjs`，加入 matrix old-count、數量、樣式檢查。
- 驗證：`npm run lint`、`npm run build` 通過；`node tmp/verify-crypto-card-cleanup.mjs` 於 1440x1000、390x900 通過，oldCounts matrix/video/diagram = 0，document overflowX = 0，consoleErrors = 0。


### 2026-06-26 15:25 Phase 6 Crypto remaining ca-* cleanup

- 清掉 Crypto app/CSS 最後剩餘的 route-private classes：`ca-iteration-zoom`、`ca-iteration-zoom-img`、`ca-dcard-bad`、`ca-dcard-good`。
- 新增/沿用共用 primitives：`cs-before-after-zoom`、`cs-before-after-zoom-media`、`cs-status-card--bad`、`cs-status-card--good`。
- 延伸既有 `tmp/verify-crypto-card-cleanup.mjs`，加入 iteration zoom 與 status card modifier 的 old-count、數量、樣式檢查。
- 驗證：`npm run lint`、`npm run build` 通過；`node tmp/verify-crypto-card-cleanup.mjs` 於 1440x1000、390x900 通過，Crypto app/CSS 的 `ca-*` 掃描為空，document overflowX = 0，consoleErrors = 0。


### 2026-06-26 15:45 Phase 6 Laushu topic card / article primitives

- 將 Laushu `InfoCard` 與 `ArticleBlock` 從 route-private classes 改為共用 primitives：`cs-topic-card*`、`cs-article*`、`cs-rich-copy`。
- 新增共用 topic card / article / rich copy CSS primitive；Laushu CSS 改為 token 與 section-specific 覆寫，不改內容、圖表或流程圖幾何。
- 新增可重複使用的 `tmp/verify-laushu-primitives.mjs`，後續 Laushu primitive 批次直接擴充；檢查 old selector、數量、樣式、document overflow 與 console errors。
- 驗證：`npm run lint`、`npm run build` 通過；`node tmp/verify-laushu-primitives.mjs` 於 1440x1000、390x900 通過，topic card = 13、article = 10、oldCounts = 0、document overflowX = 0、consoleErrors = 0。


### 2026-06-26 16:05 Phase 6 Laushu guide / persona primitives

- 將 Laushu 訪談大綱與 persona 卡片從 route-private classes 改為共用 primitives：`cs-guide-list-*`、`cs-persona-*`。
- 新增共用 guide list / persona card CSS primitive；Laushu CSS 改為 section-specific token 覆寫，保留原本訪談大綱漸層標題、時間線 marker 與 persona 圖文版型。
- 延伸既有 `tmp/verify-laushu-primitives.mjs`，加入 guide/persona old-count、數量與關鍵樣式檢查，後續 Laushu 批次可直接續用。
- 驗證：`npm run lint`、`npm run build` 通過；`node tmp/verify-laushu-primitives.mjs` 於 1440x1000、390x900 通過，guide card = 3、guide item = 6、persona card = 3、oldCounts guide/persona = 0、document overflowX = 0、consoleErrors = 0。


### 2026-06-26 16:25 Phase 6 Laushu demo / reflection primitives

- 將 Laushu 最終成果影片卡與學習反思卡從 route-private classes 改為共用 primitives：`cs-video-showcase-*`、`cs-reflection-card-*`。
- 新增共用 video showcase / reflection card CSS primitive；Laushu CSS 改為 token 覆寫，保留影片卡雙欄版型、影片 meta overlay、反思卡漸層底與編號 pill。
- 延伸既有 `tmp/verify-laushu-primitives.mjs`，加入 demo/reflection old-count、數量與關鍵樣式檢查，避免後續批次回歸。
- 驗證：`node --check tmp/verify-laushu-primitives.mjs`、`npm run lint`、`npm run build` 通過；`node tmp/verify-laushu-primitives.mjs` 於 1440x1000、390x900 通過，video showcase card = 3、reflection card = 3、oldCounts demo/reflection = 0、document overflowX = 0、consoleErrors = 0。


### 2026-06-26 16:45 Phase 6 Laushu iteration board primitives

- 將 Laushu 設計介面 / 元件迭代 before-after board 從 route-private classes 改為共用 primitives：`cs-iteration-*`。
- 新增共用 iteration list / board / header / body / compare panel / arrow CSS primitive；Laushu CSS 改為 token 與 section-specific 覆寫，保留原本 6 張 board、12 個 before/after panel 與 mobile 疊排箭頭。
- 延伸既有 `tmp/verify-laushu-primitives.mjs`，加入 iteration old-count、數量、桌機 row compare 與 mobile column compare 的關鍵樣式檢查。
- 驗證：`node --check tmp/verify-laushu-primitives.mjs`、`npm run lint`、`npm run build` 通過；`node tmp/verify-laushu-primitives.mjs` 於 1440x1000、390x900 通過，iteration board = 6、panel = 12、oldCounts iteration = 0、document overflowX = 0、consoleErrors = 0。


### 2026-06-26 17:05 Phase 6 Laushu media frame primitives

- 將 Laushu 大圖展示與文件預覽 frame 從 route-private classes 改為共用 primitives：`cs-showcase-media*`、`cs-document-preview`。
- 清掉 JSX/CSS 中的 media frame route-private classes：`laushu-form-card`、`laushu-overview-hero`、`laushu-journey`、`laushu-test-result`、`laushu-proto-overview`；Laushu CSS 改用 section selector 與 primitive token 保留 spacing、caption、framed shadow 與 radius。
- 延伸既有 `tmp/verify-laushu-primitives.mjs`，加入 media frame old-count、`cs-showcase-media` / `cs-document-preview` 數量與關鍵樣式檢查。
- 驗證：`node --check tmp/verify-laushu-primitives.mjs`、`npm run lint`、`npm run build` 通過；`node tmp/verify-laushu-primitives.mjs` 於 1440x1000、390x900 通過，showcase media = 4、document preview = 1、oldCounts mediaFrame = 0、document overflowX = 0、consoleErrors = 0。


### 2026-06-26 17:30 Phase 6 Laushu explainer primitives

- 將 Laushu 問題定義中的勞報單說明區塊從 route-private classes 改為共用 primitives：`cs-explainer-layout`、`cs-explainer-copy`、`cs-explainer-pill`、`cs-explainer-title`。
- 新增共用 explainer layout / copy / pill / title CSS primitive；Laushu CSS 改為 token 覆寫，保留兩欄說明 + 文件預覽、mobile 單欄、pill 與標題視覺。
- 延伸既有 `tmp/verify-laushu-primitives.mjs`，加入 explainer old-count、數量與關鍵樣式檢查。
- 驗證：`node --check tmp/verify-laushu-primitives.mjs`、`npm run lint`、`npm run build` 通過；`node tmp/verify-laushu-primitives.mjs` 於 1440x1000、390x900 通過，explainer layout = 1、oldCounts explainer = 0、document overflowX = 0、consoleErrors = 0。驗證中 localhost:3000 曾卡在 `Page.navigate`，已確認為 Next dev server 無回應，重啟 dev server 後驗證通過。
