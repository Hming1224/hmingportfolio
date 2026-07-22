# Case Study DS Contract

> **Current status — legacy handoff / audit template**
>
> This document is historical coordination material from the Case Study remediation flow.
> The current source of truth for stable case-study component contracts is
> [`docs/design-system/03-components.md`](../03-components.md).
>
> Do not use this file as implementation instruction without checking current production
> code first. Any stale branch names, checklist state, remediation wording, or contract
> gaps below should be treated as historical context unless a current task explicitly
> revalidates them.

This file is the handoff contract from the Case Study remediation branch to the `/design-system` documentation branch.

The remediation branch writes this file. The DS page alignment branch reads it.

## Status

- Contract state: `active-template`
- Source branch: `codex/design-system-remediation`
- Consumer branch: `codex/ds-page-alignment`
- Historical rule: do not document a Case Study component on `/design-system` unless it has a contract entry here.
- Current rule: use `docs/design-system/03-components.md` plus current production code as the source of truth before implementation.

## Contract entry template

```md
## ComponentName

**Status**
- Draft / Stable / Deprecated / Project-specific exception

**Source**
- Component: `components/case-study/ComponentName.tsx`
- Styles: `styles/case-study.css`
- Route examples: `/en/...`, `/zh-TW/...`

**Purpose**
Short explanation of the information hierarchy and interaction pattern this component owns.

**Public API**
- Props:
  - `variant`: `...`
  - `tone`: `...`
  - `children`: `...`

**Shared classes / tokens**
- Classes: `.cs-*`
- Tokens: `--cs-*`, `--hm-*`

**Allowed usage**
- When to use it.
- Which repeated patterns it replaces.

**Do not use**
- Cases where this would flatten project-specific narrative design.
- Route-local visualizations that should remain local.

**Route-local exceptions**
- Any `--laushu-*`, `--ca-*`, SVG geometry, connector, table, chart, or one-off narrative values intentionally kept local.

**Verification evidence**
- Routes tested:
- Breakpoints tested: `1440 / 1024 / 768 / 390`
- Horizontal overflow: 0
- Console errors: 0
- Interactions checked:
- Commit / batch reference:
```

---

## Current shared Case Study patterns to contract

Use this checklist as batches stabilize:

- [ ] `CaseHero`
- [ ] `CaseInfoGrid`
- [ ] `CaseSection`
- [ ] `CaseSectionHeader` / `CaseHeading`
- [ ] `CaseGrid`
- [ ] `CaseCard`
- [ ] `CaseMedia`
- [ ] `CaseMetricGrid`
- [ ] `CaseProposalTabs`
- [ ] `CaseFeatureRow`
- [ ] `CaseFlowFrame`
- [ ] `ZoomableImage`
- [ ] `FlowScrollHint`
- [ ] Visualization exceptions: survey, matrix, flow, timeline, connector, chart, SVG geometry

## Example entry — CaseFlowFrame

**Status**
- Draft until the current remediation branch confirms final API and routes.

**Source**
- Component: `components/case-study/CaseFlowFrame.tsx`
- Styles: `styles/case-study.css`

**Purpose**
Owns the outer UI shell for flow diagrams: header, framed scroll area, overflow hint, caption rhythm, and responsive behavior.

**Shared classes / tokens**
- `.cs-flow-frame-*`
- `--cs-accent`
- `--cs-line`
- `--cs-surface`

**Route-local exceptions**
- SVG path data.
- Node coordinates.
- Connector endpoints.
- Matrix/table/chart geometry.

**Do not document as stable until**
- Green batch verification has passed.
- Real variants and props have been confirmed from source code.
```
