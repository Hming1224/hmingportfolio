# 全專案 Code × Design System 一致性健檢報告

> 日期：2026-07-05
> 範圍：`styles/*.css`、`app/**`、`components/**`、`scripts/`、`docs/design-system/**`
> 方法：靜態掃描（grep 統計）＋ 專案內建檢查（`check:tokens`、`audit:architecture`、`eslint`）＋ 本機 dev server 實測驗證
> 結論先講：**整體架構是健康的**——token 三層（primitive → semantic → component）、`.theme-xxx` 換色、route CSS 隔離這些骨架都在，而且 ESLint / check:tokens / arch-audit 全數通過。真正的問題不是「各寫各的」，而是**幾個規範沒有被完整執行到底的縫隙**，其中一個（dark mode）已經是正式站上看得到的 bug。

---

## 總覽：嚴重度排序

| # | 問題 | 嚴重度 | 影響 |
|---|------|--------|------|
| 1 | Dark mode 在案例頁完全壞掉（深字配深底，內容看不見） | 🔴 高（線上 bug） | 使用者體驗 |
| 2 | `.theme-advantech` / `.theme-crypto-arsenal` 在兩個檔案重複定義 | 🟠 中 | 維護漂移風險 |
| 3 | 斷點邊界值不一致（768/769、1023/1024/1025 混用） | 🟠 中 | RWD 邊界行為 |
| 4 | 內建檢查工具的盲區（新案例頁沒被 audit 腳本納管） | 🟠 中 | 治理失效 |
| 5 | Spacing token 幾乎沒人用＋一套完全沒用到的重複尺 | 🟡 低 | Token 系統空轉 |
| 6 | 舊 token 名（`--purple` 等）遷移只做一半 | 🟡 低 | 過渡期債務 |
| 7 | Shadow token 別名方向倒置 | 🟡 低 | 文件與 code 矛盾 |

---

## 1. 🔴 Dark mode 在案例頁完全壞掉（已實測證實）

**現象**：dark mode 下打開 `/laushu`，頁面中段整個視窗全黑，文字完全看不見（已用本機 dev server 截圖證實）。

**原因鏈**：

1. `styles/tokens.css` 的 dark mode 只覆寫**中性 token**（`--hm-paper`、`--text-body` 等）。
2. `.cs-page` 背景吃 `var(--cs-surface)` → 預設 `--hm-paper` → dark mode 變 `#18181b`（深底）。
3. 但每個案例的 `.theme-xxx` 把文字色**硬綁淺色模式的值**，例如 `case-study-laushu.css:13` 的 `--cs-text-body: #1f2933`（近黑）——這條覆寫掉了 dark mode 的淺色文字。
4. 案例頁多數 section 自己畫白底（`#ffffff` / `#f8f7fa` 硬寫），所以有白底的區塊「看起來正常」；但透明背景的區塊（如 `.cs-article`）直接坐在深色 main 上 → **深字 × 深底 = 隱形**。
5. 即使有白底的區塊，也會出現「navbar/footer 深色、內容白色」的拼貼感。

**受影響範圍**：`/laushu`（實測確認）、`/advantech`、`/crypto-arsenal`、`/design-system-case-study`（同結構，`--cs-text-*` 同樣硬綁淺色值）。

**建議修法（二選一，推薦 A）**：

- **方案 A（小改、快）**：案例頁強制淺色。在 `.cs-page` 上把所有會被 dark mode 影響的中性 token 重設回淺色值（或在案例 route 加 `data-theme="light"` scope）。理由：案例頁的品牌色票（研華深藍、Laushu 紫）本來就是按白底設計的，做一套 dark 版色票成本高、收益低。
- **方案 B（完整、慢）**：為每個 `.theme-xxx` 補 dark mode 色票（`:root.dark .theme-xxx { ... }`）。工程量大，需要逐案例重新調色。

**驗證方式**：四個案例頁 × dark mode × 1440/768px，整頁捲動檢查無「隱形文字」區段，navbar 與內容色調一致。

---

## 2. 🟠 Theme 定義重複：同一個 `.theme-xxx` 存在兩份

**現象**：

| Theme | tokens.css | route CSS | 狀態 |
|---|---|---|---|
| `.theme-advantech` | `tokens.css:422`（9 個 token） | `case-study-advantech.css:13`（25+ 個 token） | **重複定義** |
| `.theme-crypto-arsenal` | `tokens.css:435`（8 個 token） | `case-study-crypto-arsenal.css:11`（100+ 個 token） | **重複定義** |
| `.theme-laushu` | ❌ 沒有 | `case-study-laushu.css:5` | 只在 route |
| `.theme-design-system-case-study` | ❌ 沒有 | `case-study-design-system-case-study.css:5` | 只在 route |

`tokens.css:418` 的註解還寫著「**新增專案＝在這裡加一行 .theme-xxx**」，但後來的兩個案例（laushu、DS case study）都沒照做——規範和實況已經分家。

**風險**：兩份 `.theme-advantech` 目前重疊的 key 值恰好相同，但只要有人改其中一份忘了另一份，誰生效取決於 CSS 載入順序（route CSS 在 page.tsx import，後載入者贏），會出現「改了沒反應」或「兩頁不同色」的詭異 bug。另外 tokens.css 版有 `--cs-line-strong: #d5dfec`，route 版卻定義成 `--cs-line-soft`——同一個值、兩個名字，已經開始漂移。

**建議修法**：選定單一位置（建議：**route CSS 為唯一定義處**，因為 theme 本來就跟著 route 載入），刪掉 tokens.css 裡的兩個 `.theme-*` block，並更新 tokens.css 註解與 `docs/design-system/02-tokens.md` 的 theming 說明，讓四個案例做法一致。

---

## 3. 🟠 斷點邊界值不一致

規範（`02-tokens.md` §13 與 `lib/breakpoints.ts`）：mobile `768` / tablet `1024` / desktop `1440`。實際 CSS 裡：

```
max-width: 768px（19 次）＋ min-width: 769px（8 次）＋ min-width: 768px（6 次）
max-width: 1023px（14 次）＋ max-width: 1024px（4 次）＋ min-width: 1024px（7 次）＋ min-width: 1025px（5 次）
max-width: 1439px（7 次）＋ min-width: 1440px（2 次）＋ min-width: 1441px（2 次）
```

**問題點**：

- `home.css` 和 `case-study-advantech.css` **同一檔內**同時有 `min-width: 768px` 和 `min-width: 769px`——在剛好 768px 寬時，一部分「桌面規則」會和「手機規則」同時生效。
- `about.css`、`contact.css`、`case-study-laushu.css`、`case-study-design-system-case-study.css` 用 `max-width: 1024px`，其他檔用 `max-width: 1023px`——1024px 整點的行為每頁不同。
- 另有一批 ad-hoc 斷點（1100 / 1200 / 1199 / 1300 / 1301 / 1280 / 1139 / 900 / 640 / 480 / 440），多屬敘事視覺微調，可接受，但**核心三斷點的邊界寫法應該統一**。

**建議修法**：定一條規約寫進 `08-ai-implementation-rules.md`（例如統一用 `max-width: 768px` / `min-width: 769px`、`max-width: 1023px` / `min-width: 1024px`），然後分檔逐批修正（一批一檔，跑 08 文件的 green-batch 驗證）。不要一次全改。

---

## 4. 🟠 內建檢查工具的盲區（過了 ≠ 合規）

三個檢查都綠燈，但各有明確盲區：

1. **`scripts/arch-audit.py` 沒納管新案例**：Route CSS 隔離清單（`arch-audit.py:52`）只有 advantech / crypto-arsenal / laushu / contact / about / home，**`case-study-design-system-case-study.css` 完全不在清單裡**——最新的案例頁繞過了治理。另外 `contact.css`、`about.css`、`home.css` 顯示 `imported in: []` 卻判 OK，是因為腳本只掃 TSX import，看不到 `globals.css` 的 `@import`——這三個「route CSS」其實是**全站載入**的，隔離檢查對它們是空轉。
2. **`scripts/check-design-tokens.mjs` 只檢查 DS 案例頁**：它只驗證 `lib/design-system-data.ts` / `design-system-docs.ts` 引用的 token 存在且值一致，**完全不掃其他 CSS/TSX 的硬寫值或 deprecated 用法**。「Design token check passed」不代表全站 token 合規。

**建議修法**：
- `arch-audit.py` 加入 `case-study-design-system-case-study.css` 的隔離規則（一行的事）。
- `docs/add-case-study-checklist.md` 加一條「新案例上線前，把 route CSS 登記進 arch-audit.py」。
- （可選）check-design-tokens 加一個「deprecated token 用量統計」模式，讓遷移進度可量化。

---

## 5. 🟡 Spacing token 系統空轉＋死 token

- `02-tokens.md` §13 說「新 code 優先使用 spacing token，不直接散寫 16/24/32/48」。實況：全站 `padding/margin/gap` 硬寫 px 約 **560 處**，用 `var(--hm-space-*)` 的只有 **32 處**；四個案例 CSS 的 token 用量是 **0**。
- `tokens.css:201-209` 定義了一套數字尺（`--hm-space-1` ~ `--hm-space-20`），和 t-shirt 尺（`--hm-space-3xs` ~ `--hm-space-3xl`）**值完全重複**；數字尺**全站 0 次使用**，也不在 02 文件的 YAML mirror 裡。

**建議修法**：刪掉沒人用的數字尺（`--hm-space-1`~`--hm-space-20`），保留 t-shirt 尺；spacing 遷移不急，照 08 文件「Token-safe Cleanup」的節奏，順手改到的檔案才換，不專門開工。

## 6. 🟡 舊 token 名遷移只做一半

`02-tokens.md` §13 說「新 code 一律 `--hm-*`，舊名只是 @deprecated alias」。實際 deprecated 用量：`about.css` 39 處、`contact.css` 30 處、`home.css` 23 處、`case-study.css` 12 處、`case-study-advantech.css` 12 處、`tokens.css` 自身 28 處、`Hero.tsx` 1 處。這在 08 文件裡屬於已知的 transitional 狀態，**不是緊急問題**，但建議在 `docs/token-migration-status.md` 記錄這份基準數字，之後每批遷移可以對照著減。

## 7. 🟡 Shadow token 別名方向倒置

`tokens.css:307-322`：`--shadow-*`（舊名、標了 @deprecated）是**實值來源**，而新名 `--hm-shadow-*` 反而是指向舊名的 alias（`--hm-shadow-sm: var(--shadow-sm)`）。跟文件「遷移方向為 `--hm-*`」的敘事相反。哪天真把 deprecated 區塊刪掉，`--hm-shadow-*` 會全部斷掉。**修法**：把實值搬到 `--hm-shadow-*`，讓 `--shadow-*` 反過來當 alias（純交換，視覺 no-op）。

---

## 附帶觀察（不算違規，記錄備查）

- **inline style 共 112 處、散在 20 個 TSX**，集中在案例 sections 與 hero 裝飾。多屬 08 文件允許的「敘事視覺 / SVG 座標」範疇，不建議動；但新增案例時留意別把「可以用 class + token」的樣式也寫進 inline。
- **z-index 硬寫數字約 50 處**，但都是元件內部的小層疊（1/2/3），全域層級（navbar/modal/toast）都有吃 `--hm-z-*` token，符合分工，不用改。
- **大型資產**：crypto-arsenal 四支 mp4 共 53MB、`laushu/overview-hero.png` 5.5MB、教學區三張圖 9MB+。與 DS 無關，但是效能上最便宜的優化點（影片壓縮 / 圖轉 WebP）。
- **正向確認**：CSS 層找不到任何「元件直接消費 primitive 色階」的違規；`components/ui/Button.tsx` 與 `.ds-button` contract 對得上；route CSS 的 TSX import 隔離正確；focus-visible 全域樣式有做；`prefers-reduced-motion` 有處理。

---

## 建議執行順序（照 08 文件的階段化模式）

1. **Batch 1（🔴 P0）**：修案例頁 dark mode（方案 A：案例頁強制淺色）。單一問題、route-local、影響最大。
2. **Batch 2（🟠）**：刪 tokens.css 重複的兩個 `.theme-*` block ＋ 更新註解與 02 文件（視覺 no-op，需跑案例頁 smoke）。
3. **Batch 3（🟠）**：`arch-audit.py` 補 DS case study 規則 ＋ checklist 加一條（純工具/文件，零視覺風險）。
4. **Batch 4（🟠）**：斷點邊界規約寫進 08 文件，之後一批一檔統一（先 home.css、case-study-advantech.css 這兩個同檔混用的）。
5. **Batch 5（🟡）**：刪死 token（數字 spacing 尺）＋ shadow alias 方向對調（視覺 no-op）。
6. deprecated token 遷移與 spacing token 採用：**不專門開工**，維持順手遷移。

每一批照 08 文件跑：`git diff --check` → `npm run lint` → `npm run check:tokens` → `npm run build` → 案例頁 smoke（1440/1024/768/390）。
