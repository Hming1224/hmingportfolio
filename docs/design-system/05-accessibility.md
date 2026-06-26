# 05 — Accessibility

這份文件把原本的可及性規範整理成可以驗收的 checklist。新增元件或頁面時，至少要通過本頁的基本檢查。

## 18. Accessibility

- 一般文字對比至少 WCAG AA `4.5:1`；大型文字至少 `3:1`。
- 所有互動元件支援 `Tab`；Button 用 `Enter/Space`；Select / Modal 用 `Escape` 關閉。
- 不移除 focus outline；統一使用 `:focus-visible` ring。
- 純裝飾圖片與 Hero decoration 使用空 `alt` 或 `aria-hidden="true"`。
- Loading / success / error 回饋使用 `aria-busy`、`role="status"` 或 `role="alert"`，不能只靠顏色。

---

## 實作檢核清單

- [ ] 一般文字對比至少 WCAG AA `4.5:1`；大型文字至少 `3:1`。
- [ ] 所有互動元件可用 `Tab` 抵達，且順序符合視覺流程。
- [ ] Button 支援 `Enter` / `Space`。
- [ ] `:focus-visible` 不被移除，focus ring 在淺色與深色背景都清楚可見。
- [ ] Icon-only button 具備可讀 `aria-label`。
- [ ] Modal 有 ESC 關閉、focus trap、關閉後焦點回到觸發元素。
- [ ] Loading / success / error 不只靠顏色表達，必要時使用 `aria-busy`、`role="status"` 或 `role="alert"`。
- [ ] 動畫與 skeleton 支援 `prefers-reduced-motion: reduce`。
- [ ] 純裝飾圖片與 Hero decoration 使用空 `alt` 或 `aria-hidden="true"`。
