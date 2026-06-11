# Crypto Arsenal 案例頁 — 版型定案（Step 3 產出）

> 定案時間：2026-06-10（Asia/Taipei）
> 對應計劃書：`100_Todo/plans/2026-06-10-crypto-arsenal-case-study.md` Step 3
> 內容骨架：`100_Todo/plans/2026-06-10-crypto-arsenal-content-skeleton.md`
> 下一步：Step 4 `/design-html` 把此方向做成高品質 HTML/CSS

---

## ⚠️ 最新定案（2026-06-10 Step 4 後更新）：**深色 hero ＋ 其餘 Advantech 淺底卡片元件**

最終原型檔：**`variants/crypto-arsenal/prototype.html`**（Step 5 以此為準；v4-hybrid 已過時）

Hming 回饋「圖片/提案/迭代/成果太單薄」，決定**整頁元件風格對齊 Advantech**：
- **深色只留 hero**（CA 識別）；其餘全改 Advantech 淺底白卡，accent 換成 CA 的 navy `#0c2b52` / cyan `#1aa3c4` / teal `#0f7d92`。
- 直接沿用 Advantech 元件語彙（Step 5 應直接重用其 CSS class）：
  - `.cs-sol-tag` 彩色分類標籤膠囊（radius 14）
  - `.cs-sol-board` 白卡 + `.cs-sol-dr`（label 110px + body）設計理由列
  - `.cs-sol-ba` Before/After 對比面板（藍漸層標頭 + 箭頭）→ 用在「迭代」（提案→最終 wireframe）
  - `.cs-sol-fr` 左字右圖交錯 feature row：`.cs-sol-fc`（漸層標頭卡 + `.cs-sol-dpt` chips）+ `.cs-sol-fimg`
  - `.cs-sol-vc` 影片卡（交付影片）
  - `.cs-sol-flow` flow banner（提案開場）
- 字級/間距/側邊距對齊 `styles/tokens.css`（--fs-*、--page-gutter clamp(24px,15.6vw,300px)）。
- 產品圖一律放 `.cs-sol-fimg` 淺底白框（border `--cs-line-soft` + 柔邊陰影），不再用深色 showcase 帶。

> 以下「C+B 混搭」為過時的早期方向，保留作紀錄。

---

### 〔過時〕早期方向：C 淺底為基底 ＋ B 深色區塊穿插（v4 混搭）

最終原型檔：`variants/crypto-arsenal/v4-hybrid.html`（截圖 `v4-hybrid.png`）

### 為什麼這樣選
- **作品集主頁是淺色主題** → 案例頁用淺底為基底，跟整站一致（不違和、不需做全站 dark/light toggle）。
- **產品 UI / hi-fi 截圖本身是深色** → 用「分區配色節奏」(sectional color blocking) 把產品展示區做成深色全寬band，深色截圖擺進深色區塊最融合、最高級。
- 兼得 Crypto Arsenal 自己的加密/金融深色調性（hero + 展示區）＋ 作品集一致的淺底閱讀體驗。
- **不做全站 dark/light 模式切換**：對求職作品集 CP 值低（每頁要維護兩套配色），改用「刻意的分區深淺節奏」達到差異化。

### 探索過的三方向（保留檔案備查）
- `v1-terminal.html`（A 交易終端）— 近黑＋格線＋等寬數據感，最強金融氣場但長文案閱讀成本高。
- `v2-editorial-dark.html`（B 編輯式深色）— navy→藍紫漸層、大漸層標題，高級感、記憶點強。**hero 與深色展示區的調性來源。**
- `v3-process-light.html`（C 過程主導淺底）— 白底＋深藍 hero band，跟 Advantech 一致性最高。**淺底敘事系統的來源。**
- `v4-hybrid.html`（最終）— C 的淺底敘事系統 ＋ B 的深色 hero/展示區。

---

## 逐區 淺/深 配色對照（給 Step 5）

> ⚠️ **段落順序已於 2026-06-10 重排**（Hming 定案）：把原本混在一起的「研究」拆成「問題痛點」與「競品參考」，並把問題理解前置。**以下為最終順序，Step 5 移植以此為準**；最終原型 = `variants/crypto-arsenal/prototype.html`（非 v4-hybrid）。

| # | 段落 | 底色 | 來源系統 | 備註 |
| :-- | :--- | :--- | :--- | :--- |
| 1 | Hero | **深色**（navy→藍紫漸層） | B | 大漸層標題、cyan kicker、meta 列 |
| 2 | 專案背景（CA 是什麼） | 淺底 | C | 純文案，窄欄好讀 |
| 3 | 我的角色與工作模式 | 淺底（alt soft） | C | 文案 + 流程 pills |
| 4 | **問題 — 使用者痛點** | 淺底 | C | **4 張角色情境卡**（策略使用者=橘 / 主動型交易者=藍 笑臉頭像）；上方加誠實註記「整理自產品討論、非一手訪談」 |
| 5 | 現況畫面 | **深色全寬band** | B | hi-fi 截圖 `.crop` 只露頂部 |
| 6 | 關鍵決策 — 為什麼站內 | 淺底（alt soft） | C | 紅/綠 top-border 對比卡；案例敘事核心（=問題框定層，非技術細節）|
| 7 | 範圍取捨 | 淺底 | C | in/out scope 兩卡；強調不做 trading terminal |
| 8 | 競品參考 — 二手桌面分析 | 淺底（alt soft） | C | ui-reference 嵌深色框；倉位欄位 + 平倉流程對標 |
| 9 | 設計流程 — Wireframe 提案 → Iteration | **深色全寬band** | B | 雙圖並排：proposal(Solution 1/2) + final；技術可行性/機器人版本討論放這 |
| 10 | UI 最終成果 | 淺底 | C | 平倉 modal prototype 嵌深色框；交付落地（影片→Jira）|
| 11 | 學習反思 | 淺底（alt soft） | C | 三卡 |

> 節奏原則：深色帶錨在 **hero / 現況 / 設計流程** 三處，痛點卡與敘事/決策一律淺底好讀。
> 敘事弧線：**痛點（真問題）→ 現況（產品缺口）→ 關鍵決策（為什麼站內）→ 範圍（做到哪）→ 競品（怎麼呈現）→ wireframe 提案 → iteration → 最終成果 → 反思**。
> ⚠️ **不做 gallery**。痛點卡身分採「角色情境卡」（角色類型標籤，非虛構人名），呼應背景檔「不編造使用者訪談」原則。

---

## 色票 — CA 品牌色票（定案，來源 Figma Portfolio-Site node 2574-83）

> 來源：https://www.figma.com/design/SoG9G77Zc1hrTH0VySVhlr/Portfolio-Site?node-id=2574-83
> Figma 截圖存於 `variants/crypto-arsenal/ca-tokens-figma.png`。**Step 5 以此為 CA 專案 token**。

5 條色階（100→700）＋ base：
- **primary（深 navy）**：100 `#dee0ed` · 200 `#b3b7d6` · 300 `#8990bf` · 400 `#606aa6` · 500 `#414976` · **base `#252a47`** · 700 `#0d101f`
- **secondary（indigo）**：100 `#e8eafa` · 200 `#b9c0f1` · 300 `#8997e8` · 400 `#556fdc` · 500 `#334dab` · **base `#334dab`** · 700 `#0a1336`
- **tertiary（bright blue · 主 accent）**：100 `#dde2fb` · 200 `#aab9f5` · 300 `#7490ef` · 400 `#376adc` · **base `#376adc`** · 500 `#24499c` · 700 `#040f2b`
- **quaternary（cool slate）**：100 `#d2daeb` · 500 `#374761` · 700 `#0b111b`
- **grey**：100 `#e0e1e3` · 400 `#6c6e77` · 600 `#2b2c30` · 700 `#101113`

角色對映（prototype.html 已採用）：
- 標題 `--navy:#252a47`（primary base）／近黑內文 `#1d2737`
- 主 accent `--blue:#376adc`（tertiary）／次 accent `--indigo:#334dab`（secondary）
- tag/badge 底 `--tint:#e8eafa`（secondary 100）／chip 底 `#eef2fd`／section alt 底 `#f4f6fc`
- 內文 `#2b2c30`／次要 `#4a4c52`／muted `#6c6e77`（grey 階）／line-soft `#d8deec`
- **小標沿用 Advantech**：部分 label（如 `.dr-l`、`.sc.in h3`）用 teal `#135e78`（Hming 同意）

> ⚠️ Step 5 移植時，色票 scope 在 `.theme-crypto-arsenal`（比照 `.theme-advantech` 慣例，見 `docs/design-system.md`），不污染全域。間距/字級沿用既有 `tokens.css`（--fs-*、--page-gutter）。

---

## Step 4 注意事項
- 手機（≤768px）多按鈕堆疊時 Primary 在上、Secondary 在下（CORE_RULES）。
- 圖目前用 `_staging/` 低倍率 render；Step 4/5 定版後再從 Figma 正式匯出高解析、並處理交付影片裁切（見 content-skeleton 影片清單）。
- 仍待補：學習反思段、【補】類重建素材（工作流程圖、斷點示意、兩種平倉路徑對比圖）。
- ~~gallery 放哪 2–4 個 feature~~ → **已砍（2026-06-10）**，不做 gallery。
