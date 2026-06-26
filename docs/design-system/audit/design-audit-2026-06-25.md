# Design Audit — 2026-06-25

這份文件只放目前狀態、掃描結果、缺口與遷移方向。不要把這些暫時性資訊混回 stable design system spec。

## 校準基準

原始文件註記：2026-06-25 重新掃描三個 Case Study、共用案例元件與 4 支案例 CSS 後更新。

標記：✅＝code 已實作且一致；🔧＝規格已定、code 待對齊。

---

## 目前缺口

### 0.4 目前缺口（2026-06-25 掃描）

- `styles/case-study.css`：579 行，共用 shell 只覆蓋 40 個 `cs-*` class。
- 三個案例專屬 CSS：合計 7,035 行；Advantech 250、Crypto Arsenal 163、Laushu 161 個 unique class。
- 三支專屬 CSS 合計約 3,730 條 declaration，其中至少 911 條是寫死的 layout / spacing 尺寸。
- 同類 pattern 使用不同前綴重做：Advantech 多為 `cs-*`、Crypto Arsenal 為 `ca-*`、Laushu 為 `laushu-*`，所以只統計 `cs-*` 會低估未共用比例。
- 已確認可優先共用的重複 pattern：Section Header / Lead、Card / Grid、Media Figure、Info / Metric Card、Proposal / Feature Row、Before / After、Flow Scroll Container。

舊版「案例頁專屬 layout 不屬於可複用系統」的描述正式廢止。🔧 目前 code 尚未完全對齊本規格。

---

---

## 建議修正順序

1. 優先把三個案例頁重複 pattern 收斂到 `components/case-study/` 與 `styles/case-study.css`。
2. 專案 route 僅保留內容資料、圖片、流程圖座標與 SVG path，不再重做 section / card / typography / spacing / RWD。
3. 將 `.theme-xxx` 限制在 `--cs-*` 顏色 token，不允許 layout / spacing / geometry override。
4. 清點寫死 spacing、layout 尺寸與專案私有 selector，逐步替換成共用 pattern 或 token。
