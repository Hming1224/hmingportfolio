# 05 — Accessibility

這份文件把原本的可及性規範整理成可以驗收的 checklist。新增元件或頁面時，至少要通過本頁的基本檢查。

## 18. Accessibility

- 一般文字對比至少 WCAG AA `4.5:1`；大型文字至少 `3:1`。
- 所有互動元件支援 `Tab`；native Button 用 `Enter` / `Space`；Select / modal dialog 用 `Escape` 關閉。
- 不移除 focus outline；統一使用 `:focus-visible` ring。
- 純裝飾圖片與 Hero decoration 使用空 `alt` 或 `aria-hidden="true"`。
- Loading / success / error 回饋使用 `aria-busy`、`role="status"` 或 `role="alert"`，不能只靠顏色。

Component accessibility contracts live in [03-components.md](./03-components.md). Governance boundaries live in [06-governance.md](./06-governance.md). Production code remains the source of truth when docs and code disagree.

---

## 實作檢核清單

- [ ] 一般文字對比至少 WCAG AA `4.5:1`；大型文字至少 `3:1`。
- [ ] 所有互動元件可用 `Tab` 抵達，且順序符合視覺流程。
- [ ] Native Button 支援 `Enter` / `Space`；LinkButton / anchor 保留 navigation semantics。
- [ ] `:focus-visible` 不被移除，focus ring 在淺色與深色背景都清楚可見。
- [ ] Icon-only controls 具備 accessible name。
- [ ] Modal dialog / lightbox 的 current behavior 與 future improvement 必須分開記錄；不要宣稱未實作的 focus management。
- [ ] Loading / success / error 不只靠顏色表達，必要時使用 `aria-busy`、`role="status"` 或 `role="alert"`。
- [ ] 動畫與 skeleton 支援 `prefers-reduced-motion: reduce`。
- [ ] 純裝飾圖片與 Hero decoration 使用空 `alt` 或 `aria-hidden="true"`。

### Button / LinkButton semantics

- [implemented] Native Button without `href` renders `<button>`, supports native button semantics, and can use command / action states.
- [implemented] Button with `href` renders anchor / routing link and should be treated as navigation semantics.
- [implemented] Disabled project placeholders should remain non-clickable real disabled buttons.
- [partial] `loading` exists on shared Button props, but loading is recommended only for real Button actions, not LinkButton navigation.
- [future improvement] If LinkButton needs pending state, document route / navigation pending behavior instead of treating it as disabled button.

### Icon-only controls

- [implemented] Icon-only controls need accessible names.
- [implemented] Navbar mobile menu button has `aria-label` and `aria-expanded`.
- [implemented] Language switcher trigger has `aria-label`, `aria-expanded`, and `aria-haspopup="menu"`; menu items use menu semantics.
- [implemented] Zoom trigger and lightbox close controls have accessible names.
- [implemented] Contact copy buttons have `aria-label`.
- [partial] Video lightbox trigger has `role="button"`, `tabIndex=0`, `aria-label`, and `Enter` / `Space` support; future contract should decide whether native `<button>` is required.

### Image lightbox

- [implemented] `ZoomableImage` trigger uses `aria-label`.
- [implemented] Lightbox uses `role="dialog"` and `aria-modal="true"`.
- [implemented] Escape close, backdrop close, localized close label, and body scroll lock are implemented.
- [future improvement] Focus trap and return-focus behavior are not currently implemented. Do not document them as current behavior until code supports them.

### Video media

- [implemented] Crypto `FinalVideo` is a local video lightbox with dialog semantics, Escape / backdrop close, body scroll lock, and localized close label.
- [partial] Trigger is `div role="button"` with keyboard support, not native `<button>`.
- [partial] Video playback relies on video element behavior; lightbox videos do not expose native controls in current code.
- [future improvement] Video media needs a separate accessibility contract. Do not merge video lightbox with image lightbox.

### Responsive tables / scroll containers

- [implemented] Crypto impact table uses native `<table>` with row / column header relationships where implemented.
- [partial] Laushu research matrix uses native table and row headers, but column headers do not currently declare `scope="col"`.
- [implemented] `.cs-data-table-frame`, `CaseMedia variant="scroll"`, and `CaseFlowFrame` keep horizontal scrolling inside scroll containers.
- [implemented] Horizontal scrolling can be acceptable for content requiring two-dimensional relationships, such as data tables, matrices, or diagrams.
- [implemented] Page-level horizontal overflow must remain `0`.
- [future improvement] If table semantics or header relationships are expanded later, update code and checklist together.

### FlowScrollHint

- [implemented] `FlowScrollHint` is `aria-hidden="true"` and currently decorative.
- [implemented] It is a scroll affordance, not an interactive control, CTA, navigation, or media control.
- [needs decision] Whether it should remain decorative or become accessible instructional text is a designer / accessibility decision.

### Non-native matrix / data grid

- [partial] Crypto `FlowMatrixBoard` is a div-based comparison matrix, not native table and not ARIA grid.
- [future improvement] If promoted to a semantic data grid, document ARIA table / grid semantics and keyboard expectations before implementation.
- [needs decision] Decide whether each non-native matrix is a visual storytelling diagram or a data grid.

### Focus-visible / keyboard baseline

- [implemented] Global `:focus-visible` ring exists in `styles/tokens.css`.
- [implemented] `ZoomableImage` / `FinalVideo` / proposal controls have focus-visible styling in case-study CSS.
- [partial] Keyboard behavior should be documented by control type: native button, LinkButton / anchor, menu, dialog, tabs / carousel controls.
- [implemented] Language loading overlay uses `role="status"` and reduced-motion handling.
