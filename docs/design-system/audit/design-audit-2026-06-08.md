# 設計系統審查報告（hmingportfolio）

> **Status:** historical design audit snapshot.
> Architecture, file sizes, and implementation recommendations may be outdated.
> Do not use this file as current implementation guidance without checking current production code and current design-system docs.

> 產出日期：2026-06-08（第二輪完整掃描補充見文末「附錄」）
> 範圍：審查 `design.md` ↔ `app/globals.css`（7666 行 / 740 條 class）↔ 4 頁路由 + 25 個元件，只列不一致、**不動 code**
> 對應計畫：`100_Todo/plans/2026-06-08-設計系統審查與重構.md`

---

## 摘要

| 項目 | 數字 |
|---|---|
| design.md 行數 | 329 |
| globals.css 行數 | 7666 |
| globals.css 寫死 hex（含重複） | **293 處** |
| components/ 寫死 hex | 16 處（集中在 Hero.tsx、StickyNote.tsx）|
| 找到的不一致 | **19 條**（高 8 / 中 8 / 低 3）|

**一句話總結：** 文件不是「沒寫」，而是「**寫了但跟 code 對不上**」——尤其字級表、輸入框兩段已嚴重過時；token 系統有「建了卻沒用 / 用了卻沒建」兩種破口。整合度問題屬實。

> ⚠️ 重要關聯：輸入框（4.4）過時，正好對應目前 `components/Contact.tsx` 有**未提交改動**——聯絡表單很可能還在改，重寫該段前要先確認 Contact 的最終樣式定下來沒。

---

## 一、高優先（文件與 code 直接打架，會誤導維護者）

### H1. 字級表整張對不上 ★最嚴重
- **文件（3.2）**：H1 桌機 `40px`、Headline `32px`、H3 `24px`…
- **實際 code**：全檔 **0 處 `40px`**。最大的標題就是 `32px`——`.headline`、`.hero-taglines`、`.section-heading h2`、`.about-intro-copy h1` 全是 32px。
- **後果**：文件宣稱的層級整個比實際大一階。照文件做新頁面，標題會比現況大、爆版。
- **建議**：以 code 為準把字級表降一階（H1→32、Headline→28 或維持 32…），或反過來決定「文件才是目標、code 要改成 40」。**需要你定方向**（見下方決策區 Q1）。

### H2. `--fs-*` 字級 token「名存實亡」且文件沒記載
- `:root` 有一整組 `--fs-h1:32px / --fs-h2:28px / --fs-h3:24px / --fs-h4:18px / --fs-body:16px / --fs-sm:14px / --fs-xs:12px`。
- **但**：design.md 第 3 章完全沒提這組 token；使用率極低（`--fs-h1` 全檔只用 **1 次**，標題多半直接寫死 `32px`）。
- **後果**：有 token 等於沒有，改字級還是要全檔找 `32px`。且 `--fs-h2:28px`、`--fs-h4:18px` 是文件沒有的層級。
- **建議**：二選一——① 認真用這組 token（文件補上、元件改用 `var(--fs-*)`）；② 廢掉這組 token。建議①，但屬「改 code」範疇，本次先記錄。

### H3. 輸入框（4.4）整段過時 ★（已解）
| 屬性 | 文件寫 | 實際 code（line 1691~）|
|---|---|---|
| 背景 | `#f2f2f7` | `#F9F9F9` ❌ |
| 圓角 | `8px` | `12px` ❌ |
| 內距 | `15px` | `22px 16px 8px`（浮動標籤版型）❌ |
| Focus | `inset 0 0 0 2px --purple-soft` | `border-color: --purple` + 外環 `0 0 0 3px --purple-soft` ❌ |
- 表單已改成 **floating label** 設計，文件還停在舊版。
- **建議**：等 `Contact.tsx` 未提交改動確認後，整段重寫 4.4。
- **目前狀態（2026-06-08）**：已改成 floating label 文件版本；背景統一使用 `var(--surface)`，且 `--surface` 已定義為較淺的 `#f9f9f9`。

### H4. 專案專屬 tone 沒上 token
- `tone-brown / green / peach / navy` → 用 `var(--brown-soft)` 等 token ✓
- `tone-advantech / laushu` → **直接寫死 hex**（`#d9f1ff`/`#004b85`、`#f5eeff`/`#3b3475`）❌
- **後果**：同一組元件兩套寫法，新人不知道該跟哪套。
- **真相（2026-06-08 釐清）**：前 4 個用 token 是因為**重用了既有的通用 accent 色**（`--brown`/`--blue`）；專案專屬 tone 寫死是因為**「只為那個專案標籤而生」**、別處不用。兩套寫法其實各有邏輯。
- **決策**：專案專屬 tone **做成「區域 token」**——scope 在 `.tone-xxx` 內用 `--tag-bg`/`--tag-text`，不進全域 `:root`。一張卡內多個 tag 會重複用、值得 token，又不污染全域系統。寫法見新版 design.md 2.5。屬「改 code」，待後續 session。

### H5. 293 處寫死 hex，其中多處「已有 token 卻沒用」
直接違反文件自己的「改顏色用 token」原則的重複定義：
| 寫死值 | 次數 | 應該用的 token |
|---|---|---|
| `#5d62d8` | 6 | `var(--purple)` |
| `#343434` | 4 | `var(--ink)` |
| `#1a1a1a` | 5 | `var(--text-heading)` |
| `#5d6674` | 11 | `var(--text-secondary)` |
| `#8e8e9c` | 2 | `var(--muted)` |
| `#dce5ed` | 2 | `var(--blue-soft)` |
- **建議**：列為「改 code」清單，把這些換回 token（低風險，但量大，另開 session 做）。

### H6. 按鈕缺 sm/md/lg 尺寸階層（計畫已決策要補）
- 現況：`.button` = `padding 12px 24px` + `min-height 48px`；導覽列 = `38px`；無階層定義。
- 已決策要分 **sm / md / lg** 三階。本次要在新 design.md 定義各階層的高度、左右 padding、字級（各斷點），並把現有 48px / 38px 歸位。

### H7. 兩套按鈕系統並存、字重不一致
- `.button` 系列（Hero / 案例頁）：`font-weight 600`、`padding 12px 24px`、`min-height 48px`。
- `.project-button`（專案卡）：`font-weight 500`、`padding 12px 0`（靠 width:100%）、**無 min-height**。
- **後果**：同樣是「按鈕」，字重 600 vs 500、高度規則不同；文件 4.1 沒說明兩者關係。
- **建議**：在文件把 `.project-button` 納入按鈕體系（它其實是 lg 全寬變體），統一字重或明說為何不同。

---

### H8. Roboto Condensed 是「幽靈字型」★
- **文件（3.1）**：整段說年份數字（About 時間軸）用 `Roboto Condensed`，CSS variable `--font-roboto-condensed`。
- **實際 code**：`layout.tsx` **沒有 import Roboto Condensed**（只有 Space Grotesk）；`globals.css` **0 處**使用 `--font-roboto-condensed`。
- **後果**：文件描述了一個根本不存在的字型載入；全站其實只有 Space Grotesk 一個字型。
- **建議**：重寫 3.1 刪掉 Roboto Condensed，或（若真的想要壓縮字寬效果）之後在 layout.tsx 補載入。本次先以「只有 Space Grotesk」為準改文件。

---

## 二、中優先（缺口或不一致，但不會立刻誤導）

### M1. `--text-*` 文字色階梯（6 個 token）文件完全沒記載
- `:root` 有 `--text-heading / -body / -secondary / -muted` + 深色反轉組 `--text-on-dark*`，還有 `.theme-advantech` 覆寫機制。
- 這套來自 advantech 案例頁工作，只記在 `Memory.md`，design.md 第 2 章沒收錄。
- **建議**：新 design.md 第 2 章補一節「文字色階梯 + 分層 theming（.theme-xxx 覆寫 --text-heading）」。

### M2. tone selector 前綴與寫法不一致
- `.tone-brown .project-tags span` vs `.project-card.tone-laushu .project-tags span`（有的加 `.project-card` 前綴有的沒有）。
- `background:` vs `background-color:` 混用。
- **建議**：文件訂一個標準寫法，改 code 時統一。

### M3. 8px 間距系統有破口
- 非 8 倍數魔術數字：`18px`(11×)、`14px`(11×)、`10px`(19×)、`6px`(15×)、`7px`(10×)、`22px`、`44px`、`84px`、`26px` 等。
- 文件 5.3 已把 `10–12px` 列為合理的「細節間距」例外，但 `14 / 18 / 22 / 7` 沒被文件承認。
- **建議**：文件補一句「允許的非 8 倍數例外清單」，其餘視為待清理魔術數字。

### M4. About 成長卡片 `#d4e2f1` / `#fff3e0` 無 token（計畫已點名）
- line 2052 / 2059 直接寫死，文件 2.4 也只記 hex、無 token 名。
- **建議**：補 token（如 `--about-card-blue` / `--about-card-peach`）或文件明訂為「About 限定寫死色」。

### M5. design.md 第 2 章有兩個「2.4」（計畫已點名）
- 「2.4 頁面特定色」與「2.4 每個專案的 Tone 色」編號重複，整份文件編號需重梳。

### M6. 手機 secondary 按鈕描邊 3px —— 文件有寫、code 有做，✓ 但散落
- 確認 `inset 0 0 0 3px`（line 3248/3253）存在且正確；只是這類「斷點覆寫」散在 globals.css 各處，文件沒集中索引。
- **建議**：文件每個元件附「斷點覆寫在 globals.css 哪幾行」對照（呼應決策區 Q3）。

### M7. 行高規則（3.3）需逐項抽查落實度
- 本次未逐行驗證所有行高；文件宣稱大標 1.4、桌機收到 1.2–1.28。
- **建議**：重寫時順手抽查 3–4 個代表性標題確認。

---

### M8. 按鈕圓角不一致
- `.button` / `.project-button` = `border-radius: 200px`；導覽列 `.resume-link` = `100px`。
- 兩者都是 pill（夠大就視覺一樣圓），但數值不統一。
- **建議**：文件統一規定 pill = `200px`，resume-link 改 code 對齊（併入 Q4）。

---

## 三、低優先（局部、可接受，但要在文件畫界線）

### L1. 案例頁專屬色大量未 token 化（可接受）
- advantech 藍色系：`#cbdef4`(19×)、`#d5dfec`(14×)、`#425466`(13×)、`#093060`(9×)、`#005796`(7×)、`#0072bd`(6×)…
- 這些是**單一案例頁局部色**，不一定要進全域 token。
- **建議**：文件明訂界線——「案例頁內部視覺色不進全域 token，但同一頁內要自己收斂、避免一頁內又有 5 種藍」。

### L2. components/ 寫死 hex（16 處，集中 Hero.tsx / StickyNote.tsx）
- 多為 hero 裝飾元件的便利貼/插圖色，屬視覺裝飾。
- **建議**：低優先；若要乾淨可抽成 `--hero-sticky-*` token，但非必要。

### L3. 死 code / 已棄用 / 定義了沒用的 class（2026-06-08「描述正確性驗證」逐一 grep tsx 後確認）

**完全死 CSS（class 存在、無人 render）：**
- `.traits-panel` / `.traits-list` / `.traits-photo`（舊「個人特質區塊」，用 `--brown-soft`）→ 區塊已移除。
- `.role-badge` / `.badge-designer` / `.badge-coordinator` / `.badge-engineer`（舊文字版角色徽章）→ 被 `AvatarProfile.tsx` 圖片版 WobbleBadge 取代。
- `.headline`（曾被當主標題範例）→ 無人 render，實際主標題是 `.hero h1` / `.section-heading h2` / `.hero-taglines` / `.about-intro-copy h1`。

**定義保留、目前未使用（不一定要刪，但文件不該當主範例）：**
- `.button-dark`（黑色填色按鈕）→ 自 2026-06-08 把 Hero「查看作品」改成 `.button-primary` 紫色後，`.button-dark` 變成沒人用（定義保留供未來「強但非轉換」情境）。
- `.resume-link`（導覽列履歷按鈕樣式）→ 2026-06-08 導覽列「下載履歷」改成純文字連結後，此 class 不再被當按鈕用（CSS 殘留）。
- `.cs-section-dark`（深色區塊 `#131b24`）→ 未 render，目前無深色 section。
- `--text-on-dark-body` / `--text-on-dark-muted`（2 個 token）→ 無人消費（`--text-on-dark` 本身有，由 `.cs-heading-white` 用）。

> 註：`.button-primary`（紫色）原本未使用，**2026-06-08 已套用到 Hero「查看作品」**，現在是 live 的主 CTA。

**連帶已修正的 design.md 描述（2026-06-08 驗證）：**
- brown 角色：個人特質區塊 → tone-brown 專案標籤色
- 角色徽章位置：Hero → About 頁頭像
- **Hero 兩顆按鈕映射曾寫反**：先更正為「查看作品＝button-dark / 我的歷程＝button-secondary」，後依 Hming 決策把查看作品再改成 `button-primary`（紫）
- button-primary / cs-section-dark / text-on-dark-body·muted → 標注「目前未使用」
- .headline → 換成實際 live 的標題 class

**驗證為「描述正確」的（無需改）：** 8 個 tone（動態 className 全在用）、project-card 系列、site-nav/nav-links/menu-button、form-field、skill-category-card、cs-title/heading/body 等骨架、theme-advantech、about-window/about-accent、submit-btn=紫、resume-link=紫、Hero 裝飾元件全在。

- **建議**：刪除上述死 CSS；`.button-primary`/`.cs-section-dark` 可留作未來用但加註解。完整掃描仍建議用 PurgeCSS 類工具，不靠肉眼。

---

## 四、決策狀態（更新至 2026-06-08）

### ✅ 已決策且已執行
- **Q1 字級**：以 code 為準（32px），design.md 已改。
- **Q2 tone 色**：後 4 個做「區域 token」（scope 在 `.tone-xxx`），不進全域。方向已定。
- **Q3 對照標註**：標 class 名（不標行號），design.md 已套。
- **按鈕系統第一批改 code**（Hming 拍板）：① 下載履歷→純文字連結 ② Hero 查看作品→紫色 `.button-primary` ③ `.button-secondary`→copy-btn outline 風。已做 + localhost 驗證。

### ✅ Q4「改 code 清單」已執行（2026-06-08）
1. 已把明確對應全域 token 的骨架色換回 token（H5）；案例頁 `cs-*` 局部色依 design.md 2.7 保留。
2. section 標題 / About / Contact / 年份 rail 等骨架字級已改用 `var(--fs-*)`（H2）；首頁 `.hero h1` 維持第一屏專屬規則 48 / 36 / 28px，不套一般 h1 token。
3. 後 4 個 tone 已改成 `.tone-xxx { --tag-bg; --tag-text }` 區域 token，selector 統一不帶 `.project-card` 前綴（H4 / M2）。
4. `.project-button` 字重已改 500→600（H7）。
5. 卡片圓角已收斂成 8 / 12 / 16 三階；`cs-*` 圖表局部元件保留必要例外（D3）。
6. 已刪確定死 CSS：`.traits-panel`/`.traits-list`/`.traits-photo`、`.role-badge`/`.badge-*`、`.headline`，以及 `.button-dark`、`.resume-link`、`.cs-section-dark`、`--text-on-dark-body/-muted`（L3 / D1 / D2）。
7. `.form-field input/textarea` 背景已改為 `var(--surface)`（D4），且 `--surface` 統一為較淺的 `#f9f9f9`。

### ✅ M3 8px 間距魔術數字收斂已執行（2026-06-08）
- 把容器排版間距（padding/margin/gap）的 `14/18/6/7/9/26/44/84px` 共約 50 處往系統值收斂（多數 →16、`6/7/9→8`、`26→24`、`44→48`、`84→80`），含 `cs-*` 案例頁層。
- **刻意保留**：Hero/About 裝飾元件內部間距與絕對定位、`::before` 項目符號光學對齊 `7px`、`clamp()` 響應式值（非 8px 系統間距）。
- 驗證：`npm run build` 過；`/`、`/about-me`、`/advantech`、`/contact` 四頁桌機+手機 0 console error、無爆版。

### ⏳ 待後續低優先清理
- About 卡片色 `#d4e2f1` / `#fff3e0` 依 design.md 2.6 暫保留為一次性頁面色。

### ✅ D1–D5 已拍板（2026-06-08 Hming 決策）
- **D1 → 已刪**：`.button-dark`、`.resume-link`、`.cs-section-dark`、`--text-on-dark-body/-muted` 這些「定義了但沒用」的全部刪除。
- **D2 → 已刪**：深色 section（`.cs-section-dark` + text-on-dark 那組）一併刪除，不做深色區塊。
  - ⚠️ 注意：`--text-on-dark`（單數，由 `.cs-heading-white` 消費）**要留**；刪的是 `-body`/`-muted` 兩個沒人用的。執行時先確認 `.cs-heading-white` 是否仍需要（grep 確認後再決定 `.cs-heading-white` 去留）。
- **D3 → 已收斂**：主要卡片圓角收斂成「小 `8` / 預設 `12` / 大 `16`」三階。
- **D4 → 已併入**：輸入框底色改用 `var(--surface)`，並將 `--surface` 統一為 `#f9f9f9`。
- **D5 → 已執行**：本 session 依交接單完成主要 code 對齊。

> 完整執行交接單見 `100_Todo/plans/2026-06-08-設計系統改code執行.md`。

---

## 五、交付狀態

| 動作 | 狀態 |
|---|---|
| 不一致清單報告（本檔） | ✅ 已產出（含第二輪完整掃描附錄）|
| 重寫 design.md（編號、按鈕階層、text token/theming、輸入框、間距例外、token 界線、區域地圖、圓角系統、token 總清單）| ✅ 已完成並對齊 code |
| 改 code | ✅ 全部完成（含 M3 間距魔術數字收斂，2026-06-08）|

---

## 附錄：第二輪完整掃描補充發現（2026-06-08）

> 第一輪用抽樣掃描，漏了區域描述與部分 token。第二輪完整掃描 4 頁路由 + 740 條 class + 全部 token 後，補上以下脫節（已全數寫進重寫後的 design.md）。

### A1.（高）斷點全錯
- 舊 design.md：「≤809 手機 / 810–1023 平板」。
- 實際 code：**沒有 809/810**。主斷點是 **`≤768`（手機，`--fs`/`--page-gutter` 在此切換）**，平板 `769–1023`，再加 `≤640/440/360` 小手機微調、`≤1439/1100/900` 與 `1025–1439` 桌機微調、`max-height:799` 矮螢幕特例。

### A2.（高）`--fs-*` 是響應式 token，文件當成靜態
- token 在斷點整組重定義：桌機 h1 32 → ≤768 為 24 → ≤360 為 22（h2/h3/h4 同步降）。已補成 3 欄響應式表。

### A3.（中）字重缺 700
- `font-weight: 700` 是**全站用最多的字重（65 處）**，舊文件字級表只提 600/500/400，沒有 700。已補。

### A4.（中）圓角系統混亂
- 「pill」用了 5 種值：`999px`(17×,小pill/badge)、`200px`(5×,按鈕)、`100px`(6×,散落)、`60px`、`1000px`。
- 卡片角 5 種：`12px`(22×,預設)、`10/16/20/8px`。
- 已在 design.md 新增「第 4 章 圓角系統」：按鈕 200 / 標籤 badge 999 / 卡片小 8 預設 12 大 16。

### A5.（中）大量 token「用了沒記」
- 文件完全沒提的 token：Hero 裝飾 scale 全套（`--cursor-tag-scale` 等 6 個）、`--year-rail-sticky-top`、`--mobile-nav-*`、`--cs-tl-*`、`--accent-color`/`--bg-color-tint`（skill-card 區域 token）、`--shimmer-angle`。已在 design.md 第 8 章「Token 總清單」收錄。

### A6.（中）section 6「只用黑陰影」與 code 矛盾
- 案例頁 `cs-*` 用了有色陰影（研華藍 `rgba(9,48,96)`、紫 `rgba(93,98,216)`）。已改寫：主系統一律黑陰影，案例頁品牌情境例外、不可擴散。

### A7.（結構洞察）`cs-*` = 41% 的 CSS、屬單頁專屬層
- 案例頁 `cs-*` 有 307 條 class（佔 740 條的 41%），是 advantech 單頁客製 layout，**不屬可複用系統**。已在 design.md 新增「0.3 兩層結構」明確區分，避免把案例頁特例誤當通用規則。

### 重寫後 design.md 的主要結構變化
- 新增 **0. 專案地圖**（4 頁路由 + 元件清單 + 兩層結構）
- 新增 **4. 圓角系統**
- 新增 **8. Token 總清單**
- 修正 3.2 字級（響應式）、3.3 字重（補 700）、6.2 斷點（對齊真實值）、7 陰影（有色陰影例外）
