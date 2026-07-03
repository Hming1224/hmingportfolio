# 06 — Governance

這份文件放設計系統的使用規範、ownership、媒體資產規格與自動化稽核工具。穩定規格與待修 audit 應分開維護。

## 8. Do's and Don'ts

### ✅ 要這樣做
- **顏色換，框架不換**：新增專案只建新 `tone-xxx`，卡片排版不動
- **案例頁同樣套系統**：Section、Card、Grid、Tabs、Media、Spacing、RWD 使用共用 Case Study patterns
- **改顏色用 token**：跨頁共用 → 全域 token；單區域重複用 → 區域 token；只用一次 → hex + 註解（見 2.0）
- **字級用 token**：新元件用 `var(--fs-*)`，不要寫死 px；一般骨架最大不超過 32px（`--fs-h1`），首頁 Hero 主標為已定義例外
- **陰影分層**：主系統一律黑陰影，重要元素重陰影、次要輕陰影
- **留白要夠**：文字最少 `24px` 內距
- **每個互動狀態都要有**：hover、active、focus、disabled
- **動畫有邊界**：首頁和 About 可有入場動畫，案例頁收手

### ❌ 不要這樣做
- **不要在案例頁加主動動畫效果**：面試官看的是設計，不是特效
- **不要每個新專案重新設計版型**：顏色換就好，卡片格式一致
- **不要用純黑**：文字最深 `--ink (#343434)`
- **不要讓 accent 大面積出現**：`--purple` 只用於 CTA 和 active
- **不要把單一專案才用的色塞進全域 `:root`**：用區域 token（見 2.0）
- **不要把 `.theme-xxx` 的 target state 當成 production reality**：target state 是優先放 semantic color / surface / text tokens；current production code 仍可能保留 route-specific 或 colocated component variables，清理前必須先確認 component contract 與 visual baseline。
- **不要用 `ca-*` / `laushu-*` / 專案私有 `cs-*` 重做既有 UI pattern**
- **不要把案例頁的有色陰影尺寸擴散成另一套 elevation**
- **不要在手機版保留 hover-only 互動**：改成靜態或點擊觸發
- **不要讓未上線案子看起來可點**：用 `--disabled` 底色
- **不要隨意用超過 32px 的字號**：一般骨架最大就是 32px；只有首頁 Hero 主標可用 48px

---

---

## 10. 架構 Ownership 與新增專案流程

為了維護專案架構的一致性並方便後續擴充，專案的 Ownership 權責劃分與新增 Case Study 流程已收錄於以下獨立文件中。在進行架構修改或新增案例時，請務必遵循其規範：

- **架構 Ownership 與驗收基準**：請參閱 [architecture-baseline.md](../architecture-baseline.md)
- **新增 Case Study 檢核清單**：請參閱 [add-case-study-checklist.md](../add-case-study-checklist.md)

### 10.1 Case Study CSS Ownership

- `styles/case-study.css`：Case Study shell 與共用 pattern 的單一樣式來源。
- `components/case-study/`：共用 React component 與 pattern API；stable component contracts 以 [03-components.md](./03-components.md) 為準。
- `.theme-<slug>`：target state 是優先宣告 `--cs-*` semantic color / surface / text tokens。Current production code 仍可能有 transitional route-specific 或 colocated component custom properties；這些不是立即重構 route CSS 的指令。
- 專案 route：組合共用 component、提供內容與資料；必要時可保留 local / colocated visualization component。
- 專案 visualization component：可管理流程圖節點、SVG path、connector、min-width、grid columns、timeline / matrix geometry 與圖像比例；不得重做已穩定的 shared shell anatomy。
- 若同一 pattern 在第二個案例出現，先 audit stable component anatomy、responsive behavior 與 visual regression risk；可以只共用 design tokens 或 shell，不一定直接抽 shared component。

### 10.2 Matrix / Diagram Governance

- Comparison matrix geometry should remain local / colocated unless its anatomy and responsive behavior are stable across cases.
- Flow diagram geometry should remain local / colocated.
- Timeline geometry should remain local / colocated.
- Wide SVG diagram coordinates, connectors, min-width values, and grid columns are local implementation details.
- Design token aliases may apply only to visual surface values when the refactor is visual-preserving.
- Data table, comparison matrix, flow diagram, timeline, and wide SVG diagram must not be merged into one shared component.
- ProjectCard hover overlay and CaseTOC floating navigation are protected interaction patterns; do not change them unless explicitly approved.
- For DataTable, ScrollContainer, FlowScrollHint, CaseFlowFrame, and media/lightbox component contracts, see [03-components.md](./03-components.md).

---

## Standardization Decisions（2026-07-02 拍板）

- `.theme-*` keeps the target-state direction: prioritize semantic color / surface / text tokens. Do not proactively clean transitional route variables; only consolidate them when a scoped task already touches that section and the change is visual-preserving.
- `FlowScrollHint` remains an `aria-hidden` decorative scroll affordance. Do not upgrade it to accessible instructional text unless a future accessibility task explicitly reopens the decision.
- Comparison matrix, including Crypto `FlowMatrixBoard`, is a visual storytelling diagram. Do not add ARIA grid semantics. A visually-hidden text summary remains an optional future improvement.
- StatusBadge / severity taxonomy is deferred until a real production usage scenario exists.
- External `LinkButton` external affordance remains optional, not mandatory.
- CTA primary density remains a guideline: prefer one primary CTA per viewport / decision moment. Do not enforce it as a hard rule.
- Project tag radius remains `4px`.
- Card radius / shadow values should not be forcibly converged. Keep each component's current production values unless a scoped visual-preserving task explicitly changes them.
- Video media accessibility contract is deferred until a second video scenario appears and shared component anatomy / accessibility behavior can be assessed.

### Reuse Assessment（2026-07-02）

- Reflection cards: keep local. Anatomy is similar, but Laushu's gradient surface and number pill are storytelling identity. Keep the shared layer at `CaseCard` + `CaseGrid` + design tokens.
- Feature / insight cards: keep local, share tokens only. The three case studies use materially different anatomy and storytelling roles.
- Before-after variants: do not expand `CaseBeforeAfter`. Advantech iteration variants remain local.
- Metadata chips: share tokens only. Do not add a generic Tag / Pill primitive.
- Simple research cards: the existing shared shell (`CaseCard` + `CaseMedia`) is sufficient.
- Data table wrapper: deferred. The behavior is already defined in `03-components.md`; do not extract a shared wrapper component yet.
- Scroll affordance: `FlowScrollHint` is already a shared component. Do not expand its contract.
- Reopen condition: use the rule of three. If any pattern appears in a third case study with stable anatomy, rerun component abstraction assessment. Adding a new case study such as `nccuspace` should trigger this review.

### Before / After Narrative Frame Assessment

Decision:
`BeforeAfterNarrativeFrame` is the implemented shared slot-based layout frame for single-comparison before / after narrative frames.
- Keep `CaseBeforeAfter` as the simple two-panel shared component.
- Do not expand `CaseBeforeAfter` with storytelling-specific props.
- Use `BeforeAfterNarrativeFrame` for single-comparison narrative frames when Layer 2 anatomy is stable.
- Keep multi-comparison scenario boards local until a separate multi-comparison contract is designed.
- Keep media wrappers, annotations, redlines, proportional media sizing, and route-specific storytelling geometry local / colocated.

Current production status:
- Crypto IterationSection: adopted.
- Laushu iteration board: adopted.
- Advantech Board 1: pilot adopted.
- Advantech Board 2 / Board 3: deferred / route-local.

Reason:
The repeated structure across Advantech, Laushu, and Crypto Arsenal is the Layer 2 narrative frame, not the Layer 3 media internals. The slot-based frame shares layout and responsive behavior while preserving local media and annotation needs.

Known tradeoffs:
- Laushu `figure` / `figcaption` panel semantics were not preserved in the current migration.
- `/en/advantech` at 390px showed a transient 2px overflow once; follow-up could not reproduce it, no confirmed offender was identified, and no fix was applied.
- Advantech full migration remains deferred.

Production code remains source of truth. Target-state wording must not be treated as production reality. Local / colocated storytelling geometry remains allowed.

### BeforeAfterPanel Governance Note

Current decision:
- `BeforeAfterPanel` is implemented as a shared visual shell component.
- It is not route-adopted yet.
- It must not be treated as a production replacement for existing route panels until a separate adoption plan is approved.
- `BeforeAfterNarrativeFrame` and `CaseBeforeAfter` remain unchanged.

Allowed future path:
- Option C planning may evaluate whether `BeforeAfterNarrativeFrame` should use `BeforeAfterPanel` internally.
- Any such refactor would affect Crypto, Laushu, and Advantech Board 1, and must include route / viewport smoke.
- `CaseBeforeAfter` should not be refactored to use `BeforeAfterPanel` without a separate compatibility audit.

Boundaries:
- `BeforeAfterPanel` is a visual shell, not a semantic figure component.
- It does not guarantee `figure` / `figcaption` semantics.
- Media wrappers, annotations, image sizing, and route-specific storytelling geometry stay local.

---

---

## 11. 圖片與媒體資產規範

為維持頁面載入效能並優化儲存庫體積，專案對圖片資產制訂了嚴格的規範：

### 11.1 格式與壓縮
- **統一格式**：除了純向量圖使用 `.svg` 外，所有圖片資產（如專案 cover、流程圖、設計稿等）必須轉換為 `.webp` 格式。
- **壓縮品質**：WebP 轉換品質設定為 `85`（此值在 Pillow 中能提供 80%–90% 的檔案大小削減，且視覺無損）。

### 11.2 尺寸限制（單一來源最大寬度）
- **專案封面 (Cover)**：最大寬度 `1600px`。
- **背景/Hero Banner (Background)**：最大寬度 `1920px`。
- **Lightbox 放大展示稿 (Lightbox)**：最大寬度 `2560px`（以確保在全螢幕放大時字體及 UI 細節依然清晰）。
- **其他螢幕截圖 / 流程圖 (Screenshot/Flow)**：最大寬度 `1600px`（小於此寬度則維持原尺寸）。

### 11.3 可放大圖片互動與對齊
- **Image lightbox / zoomable image 使用共用 `ZoomableImage` contract**，並保留 hover / focus 的放大提示；不要為圖片在各專案頁另外手刻 image lightbox。
- **Video lightbox / Crypto `FinalVideo` 目前仍是 local component**，直到獨立 video media contract 通過前，不併入 `ZoomableImage`。
- **Native video controls 與 route-specific video showcase 不屬於 `ZoomableImage` contract**；media / lightbox controls 也不屬於 Button / LinkButton / CTA primitive。
- **不要合併 image lightbox 與 video lightbox**，除非 anatomy、behavior、accessibility requirements 已證明一致並通過新的 component contract。
- **縮圖與 lightbox 圖片都必須水平置中顯示**：縮圖容器、觸發按鈕與圖片本體都要用 `margin-inline: auto` 或等效的 `place-items: center`，避免圖片在卡片或 Final UI 區塊中偏左 / 偏右。
- **放大後必須使用 `object-fit: contain`**，不可裁切 UI 畫面；需要全螢幕檢視的 before / after 或細節稿可使用 fullscreen lightbox，但仍要完整保留圖片比例。
- **圖片清晰度不足時優先重新輸出高解析來源**，不要用 CSS 銳化或放大濾鏡硬補；Lightbox 用圖建議至少 `2560px` 寬，細節多的流程圖或 UI 截圖可提高到 `3200px+`。
- **Focus trap / return-focus behavior 屬於 accessibility backlog**：除非 production code 已實作並驗證，不要在治理文件中宣稱 `ZoomableImage` 已具備這些行為。

### 11.4 目錄結構與分類
專案圖片放置於 `/public/projects/<slug>/`，並統一依階段劃分子目錄，避免檔案混亂：
- `cover/`：存放專案封面圖（`cover.webp`）與 Logo（`logo.webp`）。
- `research/`：存放使用者研究、競爭對手分析、persona 等相關圖表。
- `solution/`：存放功能方案、系統架構流程、介面細節及 Lightbox 展示圖。
- `result/`：存放專案成果、數據圖表等。

> 💡 自動化處理腳本可參考 [optimize-images.py](../../scripts/optimize-images.py)。

---

---

## 12. 自動化衛生與架構稽核

專案附帶了多個 Python 稽核工具以維護 repo 的衛生與一致性：

### 12.1 圖片連結完整性稽核
- **工具路徑**：[check-links.py](../../scripts/check-links.py)
- **主要功能**：掃描所有 `app/`、`components/`、`data/` 與 `styles/` 底下的原始碼，抓取所有 `/projects/` 的圖片路徑並比對硬碟檔案是否確實存在，防範死連結。

### 12.2 架構架構稽核
- **工具路徑**：[arch-audit.py](../../scripts/arch-audit.py)
- **主要功能**：
  - 統計並列出 `public/` 與專案內體積最大的前 10 個大檔案，監管儲存庫肥大。
  - 稽核 CSS 隔離性（如 case study 是否有確實被 `.theme-<slug>` 包裹限制）。
  - 追蹤專案擴充點。

---


## AI / Agent Governance

所有 AI / Agent 修改 code 前，必須先閱讀：

```txt
docs/design-system/design-system.md
docs/design-system/02-tokens.md
docs/design-system/03-components.md
docs/design-system/04-case-study-patterns.md
docs/design-system/05-accessibility.md
docs/design-system/08-ai-implementation-rules.md
```

Design System 落地禁止一次大改，必須依照 `audit/implementation-task-order.md` 分成 audit、low-risk token fix、shared components、case study pages、visual QA 五階段處理。

任何 AI 任務完成後，必須回報：

```txt
修改範圍
對應 DS 規格
新增 / 修改 / 移除 token
新增 / 修改 / 移除 component 或 CSS class
保留例外與原因
需要人工視覺確認的頁面
未完成事項
```


## Cross-branch integration governance

Historical context:

1. Earlier Case Study remediation work wrote `contracts/case-study-components.md`.
2. Earlier DS page alignment work consumed that contract and updated `/design-system`.

Current implementation instruction:

- Do not use stale branch names, remediation checklists, or historical handoff docs as current implementation instruction without checking production code.
- `03-components.md` is the current source of truth for stable component contracts.
- Production code is the source of truth when docs and code disagree.
- AI / Agent changes must still follow `08-ai-implementation-rules.md`.
