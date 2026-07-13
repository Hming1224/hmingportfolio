# Token Migration Status

> **Status:** historical migration record.
> `--hm-*` migration is complete as of the current production token layer. Future token work should use current `styles/tokens.css` and `docs/design-system/02-tokens.md` as references.
> Do not treat the checklist below as current implementation backlog unless a current audit revalidates it.

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

> 以下 checklist 是 Token v2 建置期的歷史稽核項目，不是目前 backlog。若要重新開啟任一項，必須先以最新 code 做新的 audit。

- [ ] `design-system/02-tokens.md` 的 YAML 是否與 `styles/tokens.css` 完全一致。
- [ ] 舊 token alias 是否都有 `@deprecated` 註記。
- [ ] 新 code 是否已避免直接使用 primitive token。
- [ ] 元件是否優先使用 semantic / component token。
- [ ] 是否需要建立 script 或 CI 檢查 Markdown token mirror 與 CSS source of truth 的一致性。

---

## Spacing A migration — 2026-07-14

這次遷移只處理與既有 spacing token 精確等值、可保持 computed value 不變的 A 類宣告。尺外 spacing 在本次先保留；是否維持、改值或新增 token，必須另做設計審視，不會未經設計決策就 snap 到最近 token。

### Audit baseline

- Base SHA：`34533fc2d4e7105107855f54f42b20a6a1034406`。
- 掃描範圍：Git tracked CSS 共 11 檔；baseline source hashes 與完整逐筆結果位於執行期本機暫存 `/private/tmp/hming-spacing-token/34533fc2d4e7105107855f54f42b20a6a1034406/scanner/manifest.json`、`summary.json` 與 `audit-report.json`。
- Scanned spacing declarations（allowlisted properties）：1,224。
- 分類規則：A = 所有 spacing 值皆可精確映射；B = 同一宣告混合可映射與尺外值；C = 全部為尺外值；`EXISTING_TOKEN` = 已使用 token；expression、negative、non-px 與 no-px 值分別 fail closed 跳過，不做部分改寫。

> 本節所有 `/private/tmp` 路徑都是執行期本機暫存，可能被系統或後續清理；它們不是 repository 內的永久 artifact。

| Class | Baseline | After migration |
|---|---:|---:|
| A | 258 | 0 |
| B | 44 | 44 |
| C | 150 | 150 |
| Existing token | 521 | 779 |
| Skip: expression | 8 | 8 |
| Skip: negative | 4 | 4 |
| Skip: non-px | 2 | 2 |
| Skip: no-px | 237 | 237 |
| Unknown | 0 | 0 |

共遷移 258 筆 A 類宣告；B、C 與所有 skip 類別均保持不變。

### Checkpoint commits

| Batch | Commit | Scope |
|---|---|---|
| 1 | `e0c3eb1` | About、Contact |
| 2 | `e331d8f` | Home、shared tokens |
| 3 | `ff0a27e` | Shared case study |
| 4 | `07eabe2` | Advantech |
| 5 | `507ed61` | Laushu、Crypto Arsenal |
| 6 | `aec5a73` | Design System case study 與 explorer |

### Visual verification

- 固定的 64-case baseline（2 locales × 8 routes × 4 viewports）manifest 位於執行期本機暫存：`/private/tmp/hming-spacing-token/34533fc2d4e7105107855f54f42b20a6a1034406/149.0.7827.55-default-ds-v8/manifest.json`。
- Baseline manifest SHA-256：`08ead68311c9ad34b081cabe50cb6158f14f8e21f3e06a1daecf539dd1702a23`。
- 下列 Batch 1–4 的 `149.0...` evidence 路徑皆位於同一執行期暫存根目錄：`/private/tmp/hming-spacing-token/34533fc2d4e7105107855f54f42b20a6a1034406/`。
- Batch 1：About、Contact、Design System，2 locales × 3 routes × 4 viewports = 24 cases；`149.0.7827.55-default-ds-v8-after-batch1/baseline-comparison.json`，24/24 self-diff 與 baseline raster diff 均為 zero-pixel。
- Batch 2：全站 2 locales × 8 routes × 4 viewports = 64 cases；`149.0.7827.55-default-ds-v8-after-batch2/baseline-comparison.json`，64/64 self-diff 與 baseline raster diff 均為 zero-pixel。
- Batch 3：四個 case-study routes 與 Design System，2 locales × 5 routes × 4 viewports = 40 cases；`149.0.7827.55-default-ds-v8-after-batch3/baseline-comparison.json`，40/40 self-diff 與 baseline raster diff 均為 zero-pixel。
- Batch 4：Advantech，2 locales × 1 route × 4 viewports = 8 cases；`149.0.7827.55-default-ds-v8-after-batch4/baseline-comparison.json`，8/8 self-diff 與 baseline raster diff 均為 zero-pixel。
- Batch 5：Laushu、Crypto Arsenal，2 locales × 2 routes × 4 viewports = 16 cases；執行期本機暫存 `/private/tmp/hming-spacing-after-b5/baseline-comparison.json`，16/16 self-diff 與 baseline raster diff 均為 zero-pixel。
- Batch 6：Design System case study、Design System，2 locales × 2 routes × 4 viewports = 16 cases；執行期本機暫存 `/private/tmp/hming-spacing-after-b6/baseline-comparison.json`，16/16 self-diff 與 baseline raster diff 均為 zero-pixel。
- Final 全量驗證：**passed**。64/64 after self-diff 為 0、64/64 baseline raw RGBA diff 為 0；visible text、class/tag、dimensions、computed spacing、media與mask geometry精確一致，runtime clean。comparison記錄258筆touched declarations；可渲染的visible DOM paths之computed-spacing arrays精確一致。重掃 A 類為 0；`verify:build` 全綠。`smoke:all` 首次因 sandbox MachPort 環境限制失敗（非產品 failure），唯一一次核准重跑為 58/58 PASS。Final after manifest SHA-256：`d4c3d9beeb1e9c7ca18a6d456802a0c07d7a41b87070b9c35853eceb58c0037c`；comparison 位於執行期本機暫存 `/private/tmp/hming-spacing-final/baseline-comparison.json`，`passed: true`。
