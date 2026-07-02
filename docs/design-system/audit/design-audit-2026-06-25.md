# Design Audit — 2026-06-25

> **Status:** historical audit snapshot.
> Some recommendations may be superseded by current production contracts and governance docs.
> Check `docs/design-system/03-components.md`, `docs/design-system/06-governance.md`, and current production code before using this file as implementation guidance.

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

歷史 target-state：重複案例頁 pattern 可逐步收斂到 shared component / token；但 current production code remains source of truth，route-specific storytelling geometry and colocated visualization CSS may remain local when they preserve storytelling or prevent visual regression。

---

---

## 建議修正順序

1. 優先把三個案例頁重複 pattern 收斂到 `components/case-study/` 與 `styles/case-study.css`。
2. Target state：專案 route 優先保留內容資料、圖片、流程圖座標與 SVG path；是否遷移 section / card / typography / spacing / RWD，需先確認 component contract 與 visual baseline。
3. Target state：`.theme-xxx` 優先保留 semantic color / surface / text token mappings；production 中既有 transitional route-specific / colocated variables 不應被視為立即重構指令。
4. 清點寫死 spacing、layout 尺寸與專案私有 selector，逐步替換成共用 pattern 或 token。
