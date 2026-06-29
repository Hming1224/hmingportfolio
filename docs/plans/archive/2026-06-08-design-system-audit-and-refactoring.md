# 設計系統審查與重構計畫（hmingportfolio）

> 建立日期：2026-06-08
> 狀態：📋 待執行（規劃完成，待開新 session 執行）
> 規劃 session：2026-06-07 深夜 → 2026-06-08

---

## 一、目標

把 hmingportfolio 現有的設計系統從「大致有、但整合度差、規則有缺口」**升級成一套嚴謹、可依循的設計系統 + 使用說明書**。

核心痛點（Hming 原話）：
- 大致有設計規範和使用內容，但**整合度很差**
- 很多**使用規則沒定義清楚**（連 button 大小都還沒規範清楚）
- 文件（`design.md`）與實際 code（`globals.css` / 元件）**脫節**

---

## 二、範圍（重要：本次只審查 + 重寫文件，不動 code）

✅ **要做**：
1. 審查既有 `design.md`、`app/globals.css`、`components/`，找出顏色 / 間距 / 元件 / 命名使用邏輯不一致的地方
2. 產出「不一致清單」報告
3. 重寫 / 升級 `design.md`，補齊缺口、變成嚴謹的設計系統 + 使用說明書

❌ **不做**（本次）：
- 不改 `globals.css`、不改任何元件 code
- 報告會列出「建議怎麼修 code」，但實際修 code 留到 Hming 看完報告後另開 session 決定

> 理由：Hming 非工程師背景，先看清楚「哪裡亂、為什麼亂」再決定要不要動 code，零風險。code 重構是高風險、需逐項驗證的大工程，分階段做。

---

## 三、使用的 Skill

| Skill | 用途 |
|---|---|
| `design:design-system`（design plugin） | 主力：審查設計系統、揪出命名不一致 / 寫死的數值、為元件變體 / 狀態 / 無障礙寫文件 |
| `rwd-audit`（Hming 自己的） | 補按鈕及其他元件「各斷點尺寸 / 字級」缺口 |
| `frontend-craft`（Hming 自己的） | 品質基準參照，確保產出符合 Hming 的前端工藝標準 |

> 註：**不用 SuperDesign**。SuperDesign 是「生成 / 探索新設計」的雲端工具，本任務是「審查既有 code + 寫文件」，要讀真實檔案，SuperDesign 不適用。

---

## 四、關鍵檔案（執行 session 要讀的）

| 檔案 | 說明 |
|---|---|
| `400_Projects/hmingportfolio/design.md` | 現有設計系統文件（329 行，要重寫的對象）|
| `400_Projects/hmingportfolio/app/globals.css` | 真實樣式來源（**7666 行、396 處 CSS 變數**，不一致大本營）|
| `400_Projects/hmingportfolio/components/` | About / AvatarProfile / CaseTOC / Contact / Footer / Hero / Navbar / ScrollProgress / Works / YearRail + `ui` / `animate-ui` / `hero-decorations` 子資料夾 |
| `400_Projects/hmingportfolio/app/layout.tsx` | 字型載入定義 |
| `400_Projects/hmingportfolio/Memory.md` | 專案踩坑 / 決策 log |

---

## 五、規劃階段已當場抓到的破口（執行時優先驗證）

1. **編號 bug**：design.md 第 2 章有**兩個「2.4」**（「2.4 頁面特定色」與「2.4 每個專案的 Tone 色」），整份文件編號需重新梳理。
2. **按鈕 RWD 尺寸沒規範**：4.1 只有 `min-height: 48px`（導覽列 `38px`），缺：
   - 各斷點（desktop / tablet / mobile）的字級、左右 padding
   - ✅ **已決策：按鈕要分尺寸階層 sm / md / lg**（2026-06-08 Hming 確認）。執行時要為每個階層定義：高度、左右 padding、字級（各斷點）、現有的 48px 與導覽列 38px 對應到哪個階層、各階層用在什麼情境
   - icon 按鈕、icon + 文字按鈕的間距規則
3. **有顏色沒上 token**：2.4 的 `#d4e2f1`、`#fff3e0`（About 成長卡片背景）直接寫死、無 token 名 → 違反文件自己「改顏色用 token」的原則。

---

## 六、審查清單（執行 session 逐項比對 design.md ↔ globals.css ↔ 元件）

### A. 顏色
- [ ] globals.css `:root` 實際定義的 token vs design.md 記載的，有無漏記 / 多記 / 對不上
- [ ] 元件裡有沒有「直接寫 hex / rgba」而沒用 token（tone class 例外）
- [ ] 有沒有「同一個顏色用了兩個 token / 兩種寫法」（重複定義）
- [ ] 頁面特定色（about-accent 等）有沒有被誤用到限定範圍外
- [ ] 所有 `--purple` 只用於 CTA / active？有沒有違規當底色

### B. 間距
- [ ] 8px 基準系統落實程度：globals.css 裡有多少非 8 倍數的「魔術數字」（13px、15px、22px…）
- [ ] design.md 記載的間距值 vs 實際用的，對不對得上
- [ ] section padding 特例（Hero 112px 等）有沒有遺漏 / 不一致

### C. 元件
- [ ] 按鈕：實際有幾種按鈕 class（button-primary / button-dark / secondary / disabled…），跟文件 4.1 一致嗎？尺寸、padding、hover 行為一致嗎？
- [ ] 專案卡：實際 hover 三層聯動的數值（scale 1.03 / opacity 0.18 / panel 348px）跟文件對得上嗎？
- [ ] 輸入框、標籤、導覽列：實際數值 vs 文件
- [ ] `ui` / `animate-ui` / `hero-decorations` 裡有沒有「沒進文件」的元件

### D. 字體
- [ ] 字型比例表（3.2）的桌機 / 手機字號 vs 實際 globals.css
- [ ] 行高規則（3.3）落實程度

### E. 命名 / 結構一致性
- [ ] CSS class 命名規則是否一致（tone-xxx、button-xxx、is-xxx…）
- [ ] 有沒有死 code / 已棄用但還留著的 class

---

## 七、產出（Deliverables）

1. **不一致清單報告**（新檔，建議放 `400_Projects/hmingportfolio/` 下，如 `design-audit-2026-06-08.md`）
   - 分類列出（顏色 / 間距 / 元件 / 字體 / 命名）每一條不一致：在哪、現況、建議怎麼統一
   - 標重要度（高 / 中 / 低），讓 Hming 好決策
2. **升級後的 `design.md`**
   - 修好編號
   - 補齊按鈕 RWD 尺寸規範（搭配 rwd-audit）
   - 補齊所有「使用規則」缺口（每個元件的變體 / 狀態 / 何時用 / 何時不用）
   - 沒上 token 的顏色補上 token 建議
   - 變成「真人或 AI 讀完就能正確維護、不會用錯」的使用說明書

---

## 八、執行步驟（給下個 session）

1. 讀本計畫 + `design.md` 全文 + `Memory.md`
2. 啟動 `design:design-system` skill
3. 掃 `globals.css` 抽出所有 token、魔術數字、重複定義
4. 掃 `components/` 各元件實際用的顏色 / 間距 / 尺寸
5. 比對三方（design.md ↔ globals.css ↔ 元件），產出「不一致清單報告」
6. 跟 Hming 過一次報告、確認統一方向（尤其按鈕尺寸階層要不要分 sm/md/lg）
7. 用 `rwd-audit` 補按鈕及其他元件的各斷點尺寸
8. 重寫 `design.md`
9. 視覺驗證不需要（不動 code）；交付兩份文件
10. commit + push（Hming 要求時）、更新 journal

---

## 九、待 Hming 決策的開放問題

- ✅ ~~按鈕要不要分尺寸階層~~ → **已決策（2026-06-08）：要分 sm / md / lg 三階層**。執行 session 直接照此規劃，把現有 48px / 38px 歸位到對應階層。
- 「不一致清單報告」修 code 的部分，看完後要不要另開 session 真的動手改 code？
- design.md 要不要同步把 `globals.css` 的對應行號 / class 名標進去（方便日後對照）？
