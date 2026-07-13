# 04 — Case Study Patterns

Case Study 頁面也屬於 Design System。專案可以換顏色與內容，但 shell、section、card、grid、media、tabs、before/after、spacing、RWD 與互動規則必須共用。

`docs/design-system/03-components.md` is the source of truth for component contracts. This file owns pattern-level guidance, storytelling structure, and reuse assessment principles; do not use it as direct component implementation instruction without checking current production code.

## Case Study 分層架構

Design System 必須覆蓋整個作品集，案例頁不能因為內容不同就自行建立 layout、spacing、card、tabs 或 RWD 規則。目標架構分四層：

1. **Foundation**：全站 color、type、spacing、radius、shadow、motion、breakpoint token。
2. **Case Study Shell**：Navbar、Footer、ScrollProgress、TOC、Hero 外框、內容寬度、Section、Next Project Nav。
3. **Case Study Patterns**：可組合的 Hero、Info Grid、Section Header、Media Figure、Card / Grid、Proposal Tabs、Before / After、Metric Grid、Feature Row、Flow Container。相同資訊層級必須使用同一 pattern。
4. **Project Theme / Content**：每個案例主要提供 semantic color / surface / text tokens、文字、圖片、影片與流程圖內容。Route-specific visualization geometry 與 storytelling section composition 可留在 local / colocated component / CSS when needed to preserve the story or avoid visual regression。

> **Local / colocated visualization exception.** Comparison matrix、flow diagram、timeline、wide SVG diagram 的 geometry 若服務於敘事，可以由案例資料或專屬 visualization component 管理。這包含流程圖節點座標、SVG path、connector 端點、min-width、grid columns、圖片比例等。共用化應先評估 stable anatomy；不要把 storytelling geometry 硬抽成 shared component。

---

## TOC 標題與分隔線規範

- **核心規則**：所有透過 Table of Contents (TOC) 導覽點擊進入的案例頁大標題（即對應於 TOC `id` 錨點的區塊主標題，例如 `.cs-heading`、`.ca-h2` 等），其下方**必須緊鄰一條水平分隔線**（`.cs-divider` 或其專案/主題變體）。
- **實作方式**：
  - **標準區塊**：使用 `CaseSection` 元件，其內部會自動渲染 `CaseHeading`（內含 `h2` 與 `.cs-divider` / `.cs-divider-white`）。
  - **自訂/客製化區塊（如 Process, Result, Next Step, 以及 Crypto Arsenal 所有區塊）**：若不使用 `CaseSection` 元件，必須在區塊的大標題（`h2`）下方手動置入分隔線（例如 `<div className="cs-divider" />` 或使用 `CaseHeading` 元件）。
  - **分隔線位置**：分隔線必須置於區塊的「大標題」正下方（大標題與其描述/段落之間），不可被放到描述段落的下方。

---

---

## Case Study Patterns

- For component contracts, see `03-components.md`, especially `CaseCard` / `CaseGrid` / `CaseMedia`, `ZoomableImage`, `DataTable` / scroll container, `FlowScrollHint`, and `CaseFlowFrame`.
- This file only describes reuse direction: stable shell anatomy should be shared; route-specific storytelling geometry can stay local / colocated.
- Design token aliases may be introduced for visual surface values only when the change is visual-preserving.
- Comparison matrix, flow diagram, timeline, and wide SVG diagram should remain local / colocated unless their component anatomy and responsive behavior are proven stable across cases.
- 2026-07-02 reuse assessment is complete; outcomes and reopen conditions are recorded in `06-governance.md` under Reuse Assessment.

### Overview and Outcome Walkthrough Patterns

> **Status:** Implemented shared patterns with live adoption in Advantech, Crypto Arsenal, and Laushu `OverviewSection`.

`CaseOverview` and `OutcomeWalkthrough` form the opening narrative sequence used by all three case-study routes:

1. `CaseOverview` summarizes the problem, design goal, and impact one step at a time.
2. Its optional `showcase` slot composes route-owned follow-up content.
3. `OutcomeWalkthrough` uses that slot to present final flows as step-based image or video sequences.

#### `CaseOverview` boundary

- The component owns the `CaseSection` wrapper, roving-tabindex step navigation, active tabpanel, detail-card anatomy, evidence slot, and previous / next controls.
- Routes own localized titles, detail copy, media, metrics, project-specific visuals, and the optional `showcase` composition.
- Step labels are translated through `components/case-study/CaseOverview.i18n.ts`; route content is localized before it reaches the component.
- Evidence resolves in `visual > media > stat` order. An item with `kind: "impact"` and evidence renders evidence before qualitative detail.
- `.cs-overview-*` selectors and shared sizing / motion values belong to `styles/case-study.css` and `styles/tokens.css`. Route CSS may only remap theme values or preserve project-specific visuals.

#### `OutcomeWalkthrough` boundary

- The component owns flow switching, the focusable stage, active media state, captions, previous / next controls, and dots.
- Routes own flow labels, localized control labels, captions, media sources, optional video poster / mask, and frame aspect ratio.
- Flow switching reuses the animate-ui Tabs primitives and `.project-tabs-*` contract. Keep the primitive behavior documented under Tabs instead of duplicating it here.
- A walkthrough step may use an image or video. Design-system demos use existing production images only, avoiding autoplay cost while preserving the production data shape.
- `.cs-outcome-walkthrough` and `.cs-walkthrough-*` belong to `styles/case-study.css`; route themes may remap semantic values without changing the shared DOM.

Adoption:

- `app/advantech/sections/OverviewSection.tsx`
- `app/crypto-arsenal/sections/OverviewSection.tsx`
- `app/laushu/sections/OverviewSection.tsx`

### Before / After Narrative Pattern

> **Status:** Implemented shared pattern with partial route adoption.

`CaseBeforeAfter` is the existing simple shared component for simple two-panel media comparisons. `BeforeAfterNarrativeFrame` is the implemented shared slot-based layout frame for the broader narrative anatomy. Crypto IterationSection and Laushu iteration board have adopted it; Advantech Board 1 has adopted it as a pilot. Advantech Board 2 / Board 3 remain deferred / route-local.

Adoption status:
- Crypto IterationSection: adopted
- Laushu iteration board: adopted
- Advantech Board 1: pilot adopted
- Advantech Board 2 / Board 3: deferred / route-local

#### Layered anatomy

Layer 1: Narrative pattern
- before state
- design change rationale
- after state

Layer 2: `BeforeAfterNarrativeFrame` shared layout frame
- badge / context label
- title
- optional intro
- label / copy points
- before slot
- connector slot
- after slot
- desktop horizontal comparison
- mobile stacked comparison

Layer 3: Local / colocated content
- media wrappers
- screenshot content
- redline / measurement annotation
- proportional image sizing
- dark screenshot readability
- route-specific visual geometry

#### Implemented component contract

Current production contract:

```ts
import type { ReactNode } from "react";

export type BeforeAfterNarrativePoint = {
  label: ReactNode;
  content: ReactNode;
};

export type BeforeAfterNarrativeFrameProps = {
  badge: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  points?: BeforeAfterNarrativePoint[];
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: ReactNode;
  afterLabel?: ReactNode;
  connector?: ReactNode;
  tone?: "blue" | "cyan" | "purple" | "neutral";
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  comparisonClassName?: string;
  beforeClassName?: string;
  afterClassName?: string;
};
```

#### Explicit exclusions

Do not add props for:
- redline
- 360px / 640px annotations
- image `flexGrow`
- screenshot crop
- media wrapper type
- route-specific board geometry
- project-specific copy

These stay in slot content or local / colocated components.

Shared-frame boundaries:
- media wrappers stay local
- annotations stay local
- image sizing stays local
- route geometry stays local
- `figure` / `figcaption` semantics are not guaranteed by the shared frame

Laushu migration intentionally did not preserve the previous `figure` / `figcaption` panel semantics. Do not overclaim accessibility semantics from the shared frame.

#### Panel-level subcomponent: BeforeAfterPanel

`BeforeAfterPanel` is the implemented visual shell for a single before / after state panel. It is now used inside `BeforeAfterNarrativeFrame` for labeled panels.

Production routes still adopt `BeforeAfterNarrativeFrame`, not `BeforeAfterPanel` directly:
- Crypto IterationSection: adopted `BeforeAfterNarrativeFrame`
- Laushu iteration board: adopted `BeforeAfterNarrativeFrame`
- Advantech Board 1: pilot adopted `BeforeAfterNarrativeFrame`
- Advantech Board 2 / Board 3: deferred / route-local

The C1 compatibility bridge completed this internal use while preserving legacy narrative panel class hooks for route CSS compatibility. Existing route-scoped CSS continues to apply through `.cs-before-after-narrative-panel*` classes.

`CaseBeforeAfter` remains a separate simple two-panel comparison component. `BeforeAfterPanel` is not a replacement for `BeforeAfterNarrativeFrame` or `CaseBeforeAfter`.

`BeforeAfterPanel` owns only the state panel visual shell. Media, annotations, redline labels, image sizing, and route-specific geometry remain slot content or route-local.

#### Governance

Do not expand `CaseBeforeAfter` to cover the broader narrative pattern. Use `BeforeAfterNarrativeFrame` for single-comparison narrative frames when the Layer 2 anatomy is stable. Keep multi-comparison scenario boards local until a separate multi-comparison contract is designed. Adopt one route at a time with visual-preserving migration and smoke testing.

---

---

- `styles/case-study.css`：Case Study shell 與共用 pattern 的主要樣式來源。
- `components/case-study/`：共用 React component 與 pattern API；stable component contracts 以 `03-components.md` 為準。
- `.theme-<slug>`：target state 是優先宣告 `--cs-*` semantic color / surface / text tokens。Current production code may still include transitional route-specific or colocated component variables; do not treat that as an immediate CSS refactor instruction.
- 專案 route：組合共用 component、提供內容與資料；必要時可保留 local / colocated visualization component。
- 專案 visualization component：可管理流程圖節點、SVG path、connector、min-width、grid columns、timeline / matrix geometry 與圖像比例；不得重做已穩定的 shared shell anatomy。
- 若同一 pattern 在第二個案例出現，先 audit stable anatomy、responsive behavior 與 visual regression risk；可以只共用 design tokens 或 shell，不一定直接抽 shared component。

---
