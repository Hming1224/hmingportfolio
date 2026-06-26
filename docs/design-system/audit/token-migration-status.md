# Token Migration Status

這份文件追蹤 `--hm-*` Token v2 的遷移規則與狀態。

## 13. Token v2：`--hm-*` 單一前綴

- 新 code 一律使用 `--hm-*`。
- `--paper`、`--ink`、`--purple` 等舊名只保留為 `@deprecated` alias，遷移方向為 `--hm-paper`、`--hm-ink`、`--hm-purple`。
- Primitive 色階為 `--hm-{purple|blue|green|peach|brown}-50` 到 `-900`；元件不可直接消費 primitive，必須透過 semantic token。
- Status semantic：`--hm-success`、`--hm-warning`、`--hm-error`、`--hm-info`，各自搭配 `-soft` 背景。
- Spacing：`--hm-space-3xs` 到 `--hm-space-3xl`，以 8px 基準建立主系統間距尺；新 code 優先使用 token，不直接散寫 16/24/32/48。
- Radius：`--hm-radius-sm/md/lg/pill/button` 對應 8 / 12 / 16 / 999 / 200；主系統元件 radius 一律優先吃 token。
- Layout / Grid：`--hm-container`、`--hm-container-wide`、`--hm-grid-gutter`、`--hm-grid-gutter-lg`，搭配 `.hm-grid` helper 使用。
- Z-index：base `0`、sticky `10`、navbar `100`、overlay `200`、modal `300`、toast `400`。
- Breakpoint 文件值：mobile `768px`、tablet `1024px`、desktop `1440px`；JS 單一來源為 `lib/breakpoints.ts`。CSS custom property 無法直接用於 `@media`，不可假裝能動態取代斷點。

---

## 待確認事項

- [ ] `design-system/02-tokens.md` 的 YAML 是否與 `styles/tokens.css` 完全一致。
- [ ] 舊 token alias 是否都有 `@deprecated` 註記。
- [ ] 新 code 是否已避免直接使用 primitive token。
- [ ] 元件是否優先使用 semantic / component token。
- [ ] 是否需要建立 script 或 CI 檢查 Markdown token mirror 與 CSS source of truth 的一致性。
