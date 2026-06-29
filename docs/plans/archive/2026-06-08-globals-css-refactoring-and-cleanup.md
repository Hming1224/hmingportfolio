# globals.css 重構與專案瘦身 — 執行計劃書

> 建立日期：2026-06-08（Mon）
> 規劃者：Claude（Opus 4.8）
> 狀態：**計劃完成，待開新 session 執行**
> 目標專案：`400_Projects/hmingportfolio`（獨立 repo）
> 目標專案絕對路徑：`/Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio`
> 本計劃存放位置：母 repo `100_Todo/plans/`
> 對應需求：Hming 指出 globals.css 7000+ 行、專案結構需瘦身、提升維護性與擴充性
> 決策（已與 Hming 確認）：① CSS 用「實體拆檔」② 範圍三項全包（拆檔 + repo 雜物 + CSS 內容優化）③ 先出計劃再開新 session 執行

---

## 0. 目標與核心原則

**目標**：把全站唯一一支 7675 行的 `app/globals.css` 拆成「按頁面/領域分檔」的多支 CSS，並順手清掉 repo 雜物、收斂重複樣式。讓未來「找樣式、改某頁、加新 case study」都不會再被巨檔拖累。

**核心原則（execution session 必守）**：

1. **畫面零變化優先**：Phase 1 拆檔只是物理搬移，不改任何 class 名、不改選擇器、**嚴格保持原本的 CSS 載入順序**（global 選擇器靠順序決定 cascade，順序錯了畫面就會跑掉）。拆完每一支都要視覺驗證。
2. **一次一刀、可回退**：每拆一個領域就 commit 一次，並用 localhost 驗證該頁沒跑版，再拆下一個。不要一次搬完 7675 行才驗證。
3. **不碰 .tsx 的 className**（Phase 1）：這是「實體拆檔」相對「CSS Modules」最大的安全優勢——零 className 改動。
4. **localhost 全程開著**，用熱重載/重新整理驗證，不關 server。

---

## 1. 現況診斷

### 1-1 CSS 集中問題
- `app/globals.css` = **7675 行**，全站**唯一一支** CSS，只在 `app/layout.tsx:3`（`import "./globals.css"`）被載入一次。
- 內部已用註解分區，但全在同一檔，難找、改 A 怕動到 B、加新 case study 只會繼續膨脹。
- 各領域約略佔比：

| 區塊 | 約略行數 | 佔比 |
|------|---------|------|
| Tokens / 動畫 / 主題色盤 / 共用 nav | ~480 | 6% |
| 首頁（hero 裝飾 + 作品卡 + 按鈕） | ~1000 | 13% |
| About-me（進場動畫 / 履歷 / Design values / Educator / RWD） | ~2400 | 31% |
| 聯絡頁（表單 / floating label） | ~600 | 8% |
| Case study（Advantech） | ~3300 | 43% |

### 1-2 globals.css 內部區段地圖（依現有註解，execution 時以實際內容為準精準切）

> ⚠️ 下面行號是規劃當下的快照，execution session **必須重新讀檔、依「區段註解」為界切割**，不可硬套行號（中途若有人改過檔行號會位移）。

| 行號（約） | 區段 | 歸屬目標檔 |
|-----------|------|-----------|
| 1 | `@import "tailwindcss"` | **保留在 globals.css 最頂** |
| 3–37 | Shimmer / Scroll progress 動畫 | `tokens.css`（共用） |
| 38–111 | `:root` tokens | `tokens.css` |
| 112–128 | 專案主題換色盤 | `tokens.css` |
| 129–488 | navbar offset + `.site-nav` / `.menu-button` / `.section-heading` 等共用 | `tokens.css`（共用 base）※需逐段確認哪些真共用 |
| 489–1068 | Hero 裝飾（entrance / cursor tags / wireframe / annotation pins / sticky notes / toggle / AI widget） | `home.css` |
| 1070–1182 | Secondary 按鈕（沿用 `.copy-btn` 外觀） | `home.css`（或 `buttons` 共用，見 §5 決策） |
| 1183–1500 | scroll reveal + 作品卡（project cards / works）+ 上線專案 CTA | `home.css` |
| 1501–1698 | 聯絡頁左右欄 + form card | `contact.css` |
| 1699–2061 | Floating label 表單 + submit 按鈕 | `contact.css` |
| 2062–2495 | about-me 進場動畫 | `about.css` |
| 2496–2740 | 履歷 metrics + RWD | `about.css` |
| 2741–2928 | Design Values 動畫卡 | `about.css` |
| 2929–3530 | Educator bento grid + 多斷點 | `about.css` |
| 3534–4320 | about-me mobile RWD（max-768 / max-440） | `about.css` |
| 4322–6992 | Case study：**共用骨架**（`.cs-toc` / `.cs-hero` / `.cs-section` / `.cs-heading` / `.cs-text` / `.cs-sub`，來自 `components/case-study/` shell） | `case-study.css`（共用，進 manifest） |
| 4322–6992 | Case study：**Advantech 專屬**（`.cs-sol`101 / `.cs-alarm`63 / `.cs-comp`26 / `.cs-iv`25 / `.cs-ds`24 / `.cs-role`20 / `.cs-fm`15 / `.cs-synthesis` / `.cs-product` / `.cs-result` / `.cs-feature` 等獨有 section） | `case-study-advantech.css`（route-scoped，在 `app/advantech/page.tsx` import） |
| 6993–7208 | Case study mobile `@media (max-768)`（含 `:root` 覆寫） | 共用骨架的歸 `case-study.css`，Advantech 專屬的歸 `case-study-advantech.css` |
| 7209–end | `@media (768–1024)` | 依內容分回各自檔（多半 Advantech 專屬） |

> **拆兩層的依據**：case study CSS 是「共用骨架（每個案例都用）」+「該案例專屬版面」兩種混在一起。骨架來自 `CaseStudyShell`/`CaseSection`/`CaseHeading`，Advantech 專屬的 `.cs-alarm`/`.cs-iv`/`.cs-fm`… 才是 3000 多行的大宗。已知 `.tone-laushu`/`.tone-advantech` 兩組專案主題色，這層分法能支援後續新增 case study。

### 1-3 repo 雜物
- `iterations/` = **3.8MB**、72 個被 git 追蹤的 before/after 截圖（iteration-capture 工具產物，會持續長大）。
- `.playwright-mcp/` 有 2 個 log 檔被 git 追蹤（誤加，應 ignore）。
- 根目錄文件：`Memory.md`(42KB)、`design.md`(29KB)、`design-audit-2026-06-08.md`(18KB) 與程式碼混在 repo 根目錄。
- 被追蹤檔總數：272。

---

## 2. 目標結構

```
app/
  layout.tsx                     ← 維持 import "./globals.css"（不動）
  globals.css                    ← 瘦身成「manifest」：@import tailwindcss + @import 全域分檔
  advantech/page.tsx             ← 新增 import "../../styles/case-study-advantech.css"
styles/                          ← 新建
  tokens.css                     ← :root tokens / 動畫 / 主題色盤 / 共用 nav・base
  home.css                       ← 首頁
  about.css                      ← about-me
  contact.css                    ← 聯絡頁
  case-study.css                 ← case study「共用骨架」（TOC / hero / section / heading），所有案例共用
  case-study-advantech.css       ← Advantech 專屬版面（route-scoped，只在 /advantech 載入）
```

**全域 manifest（globals.css）載入**：tokens + home + about + contact + case-study（共用骨架）。
**route-scoped 載入**：每個 case study 的專屬 CSS（`case-study-<專案>.css`）在「該 route 的 `page.tsx`」裡 import，**不進全域 manifest**。

未來新增 case study → 開 `styles/case-study-<專案>.css` + 在那頁 `page.tsx` import，**不動任何既有檔**。好處：① globals.css 不再膨脹 ② 逛首頁不會白載別頁 4000 行 case study CSS ③ 各案例 `.cs-*` 命名天然隔離、不互相覆蓋。

> ⚠️ 拆檔不會讓單一案例行數變魔法少——connector / alarm demo 等獨特互動版面本來就需要客製 CSS。拆檔解決的是「不互相污染、好找好刪好擴充」；要再減量是 Phase 3 把共用 pattern 逐步抽進骨架的事。

---

## 3. Phase 1：globals.css 實體拆檔（主菜，零風險優先）

### 3-1 拆檔技術方案
`globals.css` 改成純 manifest，**用 CSS `@import` 按原順序串接**（順序 = 原本 cascade 順序，確保畫面位元組級不變）：

```css
@import "tailwindcss";
@import "../styles/tokens.css";
@import "../styles/home.css";
@import "../styles/about.css";
@import "../styles/contact.css";
@import "../styles/case-study.css";   /* 只放共用骨架；專屬 CSS 不在這 */
```

Advantech 專屬 CSS 則在 route 裡 import（`app/advantech/page.tsx` 頂部）：
```ts
import "../../styles/case-study-advantech.css";
```

- `@import "tailwindcss"` **必須維持在最頂**（Tailwind v4 規定）。
- CSS 規範：所有 `@import` 必須排在任何規則之前，所以 globals.css 拆完應該**只剩 @import、不留其他規則**（原本散落的規則全搬進對應分檔）。
- **載入順序注意**：route-scoped 的 `case-study-advantech.css` 會排在全域 manifest 之後載入（因為 route 比 layout 晚），這對 Advantech 專屬選擇器有利（能覆蓋共用骨架），符合原本 cascade。execution 時驗證 `/advantech` 確認無誤。
- **備援方案**（若 PostCSS/Tailwind v4 對巢狀 `@import` 本地檔處理有問題）：全域分檔改成在 `app/layout.tsx` 依固定順序逐支 import（tokens→home→about→contact→case-study）；route-scoped 那支不變仍放 page.tsx。execution 時先試 manifest 方案，build/畫面有異常再切備援。

### 3-2 執行順序（一刀一驗一commit）
1. **建 `styles/` 資料夾 + 空的 6 支檔**（tokens / home / about / contact / case-study / case-study-advantech）。
2. **先搬 `tokens.css`**（tokens/動畫/主題/共用 nav）→ 改 globals.css manifest 引入 → `npm run dev` 起 server → 首頁驗證 nav、字體、顏色正常 → commit。
3. **搬 case study（最大塊、CP 值最高，分兩刀）**：
   - 3a. 先把 **Advantech 專屬**（`.cs-alarm`/`.cs-iv`/`.cs-fm`/`.cs-sol`/`.cs-comp`… 及其 mobile/平板 media）搬到 `case-study-advantech.css`，在 `app/advantech/page.tsx` import → 重整 `/advantech` 驗證 → commit。
   - 3b. 再把 **共用骨架**（`.cs-toc`/`.cs-hero`/`.cs-section`/`.cs-heading`/`.cs-text`/`.cs-sub`）搬到 `case-study.css`，進 globals.css manifest → 再次驗證 `/advantech` 整頁無跑版（timeline、feature rows、connectors、lightbox、mobile）→ commit。
   > 順序先專屬後骨架：專屬的好認（命名集中），先搬走後，剩在 case study 區的就是共用骨架，第二刀更乾淨。
4. **搬 `about.css`** → 驗證 `/about-me`（Genie 進場、Educator bento、Design values、履歷、RWD 360/440/768）→ commit。
5. **搬 `contact.css`** → 驗證 `/contact`（floating label、左右欄、submit）→ commit。
6. **搬 `home.css`** → 驗證 `/`（hero 7 裝飾進場、作品卡、按鈕）→ commit。
7. 最後 globals.css 應只剩 manifest，全檔重掃一次四個頁面 + 三斷點。

> 每一步「搬出去的行」要從 globals.css **剪下**（不是複製），確保沒有重複定義。共用區（tokens/nav）若某條被多頁用到，留在 tokens.css，不要複製到各分檔。

### 3-3 灰色地帶決策（execution 時逐一確認，別猜）
- **129–488 哪些真的是「共用」**：`.site-nav`/`.menu-button`/`.section-heading` 多半共用 → tokens.css；但若某段其實只有首頁用，歸 home.css。逐段看使用範圍。
- **`@media (768–1024)`（7209+）**：按裡面選擇器所屬頁面，分回各自分檔，不要全丟一支。
- **按鈕（1070–1182 secondary / submit / CTA）**：若多頁共用，可獨立成 `buttons` 區塊放 tokens.css；若只首頁用就歸 home.css。

---

## 4. Phase 2：repo 雜物清理

1. **`.playwright-mcp/` log**：從版控移除（`git rm --cached`）+ 加進 `.gitignore`（`.playwright-mcp/`）。這是工具暫存，不該進 git。
2. **`iterations/` 3.8MB**：與 Hming 確認策略——
   - 選項 A：保留現有截圖當設計紀錄，但**未來新產生的不進 git**（.gitignore 加規則，現有的留著）。
   - 選項 B：整個 `iterations/` 改為本地不追蹤（`git rm -r --cached iterations/` + ignore），歷史截圖移到 repo 外備份。
   - **建議 A**（保留已有紀錄、止血未來膨脹），但這要 Hming 拍板，execution 開頭先問。
3. **根目錄文件**（`Memory.md`/`design.md`/`design-audit`）：屬專案文件，可考慮收進 `docs/` 子資料夾讓根目錄乾淨；但 `Memory.md` 是專案記憶常被讀取，移動要同步更新所有引用路徑——**列為低優先，先不動**，避免破壞既有流程。

---

## 5. Phase 3：CSS 內容優化（拆檔後才做）

> 在已分檔的基礎上做才安全（範圍小、好驗證）。對照根目錄 `design.md` 的 token 計劃。

1. **掃死碼**：用工具/grep 找出 `.tsx` 完全沒用到的 class（注意動態 className 與 JS 加的 class 要排除誤刪）。
2. **hex → token**：把散落的硬寫色碼換成 `:root` 既有 token（呼應 design.md token 計劃）。
3. **合併重複規則**：相同宣告抽共用 class／token（謹慎，避免改動視覺）。
4. **圓角/字級/間距**統一到 token（design.md 已有規格）。

每項都小步 + 視覺驗證 + commit。**Phase 3 不求一次到位**，拆檔（Phase 1）才是這次主目標。

---

## 6. 風險與回退

| 風險 | 對策 |
|------|------|
| 載入順序變了導致 cascade 跑掉 | manifest 嚴格照原順序；每搬一支就驗證該頁 |
| Tailwind v4 巢狀 @import 不吃 | 備援：改在 layout.tsx 依序 import |
| 剪貼漏行/重複定義 | 一刀一 commit，`git diff` 對照；最後比對 globals.css 已清空成 manifest |
| 誤刪動態 class（Phase 3） | 死碼掃描排除 JS 動態加的 class，逐一人工確認 |
| 改壞畫面 | 每階段獨立 commit，可 `git revert` 單步回退 |

**回退**：任何一步驗證發現跑版，`git checkout` 該檔回到上一個 commit 即可。

---

## 7. 驗證清單（每階段 + 最終）

- [ ] `npm run dev` 起得來、無 build error、無 console error
- [ ] `/`：hero 7 裝飾進場、作品卡、按鈕 hover、CTA 紫色
- [ ] `/about-me`：Genie 進場、Educator bento hover、Design values 動畫、履歷 metrics、RWD 360/440/768
- [ ] `/advantech`：timeline、feature rows、connectors（JS 動態定位）、lightbox、影片 facade、mobile :root 覆寫
- [ ] `/contact`：floating label、左右欄、submit 按鈕、640 斷點
- [ ] 三斷點全掃：桌機 / 平板(768–1024) / 手機(≤768, 440, 360)
- [ ] 最終 `app/globals.css` 只剩 `@import` 清單（且不含 Advantech 專屬 CSS）
- [ ] `app/advantech/page.tsx` 有 import `case-study-advantech.css`，且**首頁/about/contact 的 bundle 不含** Advantech 專屬樣式（route-scoped 生效）
- [ ] `git status` 乾淨、雜物已 ignore

---

## 8. Execution session 開場 checklist

1. 讀本計劃書 §3 執行順序。
2. 先跑 `wc -l app/globals.css` 確認仍是 ~7675（沒被別的 session 改過）。
3. 起 `npm run dev`（localhost 全程開著）。
4. Phase 2 開頭先問 Hming：`iterations/` 要選項 A 還 B。
5. 按 §3-2 一刀一驗一 commit 推進，**不要一次搬完才驗證**。

---

## 附：未列入此次範圍（避免 scope creep）
- 不改任何 .tsx 的 className（那是 CSS Modules 路線，已排除）。
- 不動 `Memory.md` / `design.md` 位置（低優先）。
- 不重寫元件邏輯、不升級依賴。
