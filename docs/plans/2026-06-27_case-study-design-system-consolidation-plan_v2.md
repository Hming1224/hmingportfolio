# Case Study Design System Consolidation Plan v2

This plan supersedes the older `2026-06-25_case-study-design-system-consolidation-plan.md` as the active execution guide.

The original long plan is archived at:

`plans/archive/2026-06-25_case-study-design-system-consolidation-plan.md`

## 1. Purpose

Clean the technical debt left by vibe coding in the three Case Study pages:

- Advantech
- Crypto Arsenal
- Laushu

The goal is not to reduce CSS lines at all costs. The goal is to make repeated Case Study UI reusable while preserving Hming-approved visual rhythm and project-specific narrative layouts.

## 2. Branch and worktree

Branch:

`codex/design-system-remediation`

Allowed files:

- `app/{advantech,crypto-arsenal,laushu}/**`
- `components/case-study/**`
- `styles/case-study*.css`
- `styles/tokens.css` only for justified `--cs-*` token work
- `docs/design-system/contracts/case-study-components.md`

Forbidden files:

- `app/design-system/**`
- `lib/design-system-data.ts`
- `lib/design-system-docs.ts`
- `components/design-system/**`
- `components/DesignSystemPlayground.tsx`

## 3. Required reading before editing

1. `docs/design-system/08-ai-implementation-rules.md`
2. `docs/design-system/02-tokens.md`
3. `docs/design-system/04-case-study-patterns.md`
4. `docs/design-system/contracts/case-study-components.md`
5. `plans/00-integrated-execution-order.md`
6. This plan

## 4. Source of truth

- `styles/tokens.css` is the runtime token source of truth.
- Real component source is the source of truth for props and behavior.
- Markdown / YAML token indexes are documentation mirrors only.
- `/design-system` docs are a consumer, not an implementation source.

## 5. Design decision rule

> Core rules are tokenized. Repeated components are componentized. One-off narrative sections keep flexibility.

### Token layer choice

Use the lowest valid level:

```text
foundation token (--hm-* / --fs-* / --text-*)
  -> case semantic token (--cs-*)
    -> project theme token (.theme-<slug>)
      -> route-local token (--laushu-* / --ca-* for visualization)
        -> one-off local value
```

Do not create global or case-level tokens for a one-off project visual.

## 6. Batch workflow

Each batch must be one bounded operation:

- One primitive family, such as quote, data table, media frame, feature row, card text, status card, video lightbox.
- Or one Case Study shared component migration.
- Or one section group in one route.

Before editing:

1. Capture or reference live baseline from `https://hmingdesign.com/en` for touched routes.
2. Create mapping table: old selector → new shared primitive / token / route-local exception.
3. Identify preserved visual traits: spacing, ratio, rhythm, mobile stacking, connector positions.

After editing:

1. Run validation.
2. Update the Case Study DS Contract if anything reusable changed.
3. Commit and push the feature branch.

## 7. Special visual decision gate

Stop and ask Hming before changing:

- Connector / timeline / radial / flow / matrix / survey / donut / bar chart / task flow SVG.
- Precise coordinate layouts, arrows, foreignObject, connector engines, video masks, before-after layouts.
- Any live-baseline section that has a clear project personality or Hming has expressed liking.
- Any change that alters reading order, image ratio, card density, mobile stacking, or section rhythm.

Decision options:

1. Use existing shared pattern.
2. Add new shared primitive.
3. Keep project-specific exception and document it.

## 8. Current execution phases

### Phase 0 — Baseline and inventory

- Confirm live baseline for touched routes.
- Inventory old selectors.
- Classify selectors as shared pattern, visualization geometry, route-local exception, dead CSS, or duplicate.

### Phase 1 — Token and theme ownership

- `.cs-page` defines shared case semantic defaults.
- `.theme-<slug>` only maps project colors and brand semantics.
- Theme selectors must not contain layout, spacing, typography, radius, shadow geometry, or breakpoints.

### Phase 2 — Shell, Hero, Section

- Shared components own Hero, section wrappers, headings, divider, lead, and case info grid.
- Route files provide content only.

### Phase 3 — Card, Grid, Media

- Shared primitives own standard card, grid, metric, media, caption, zoomable image, and scroll frames.
- Route CSS keeps visualization geometry only.

### Phase 4 — Interaction and proposal patterns

- Shared components own proposal tabs, before-after, feature rows, flow frames, lightbox/zoom shell, and keyboard/focus behavior.

### Phase 5 — Visualization geometry isolation

- SVG paths, node coordinates, connector endpoints, survey charts, matrix/table geometry remain route-local when project-specific.
- Their outer frame uses shared `CaseMedia` / `CaseFlowFrame` where possible.

### Phase 6 — CSS cleanup and naming unification

- Delete migrated route-private selectors only after validation.
- Keep documented project-specific exceptions.
- Update contract entries.

### Phase 7 — Full verification

Required checks:

- `git diff --check`
- `npm run lint`
- `npm run check:tokens`
- `npm run build`
- `npm run audit:architecture`
- Browser smoke test: `/en`, `/zh-TW`, and touched case routes at `1440 / 1024 / 768 / 390`
- Horizontal overflow = 0
- Console errors = 0
- Tabs, zoom/lightbox, video, flow scroll, TOC, language routes still work

## 9. Contract update requirement

After every green batch that stabilizes a shared component, primitive, token, or exception, update:

`docs/design-system/contracts/case-study-components.md`

Required fields:

- Component / primitive name
- Source path
- Props / variants
- Shared classes / tokens
- Route examples
- Do-not-use conditions
- Route-local exceptions
- Validation evidence
- Commit / batch reference

The DS page alignment branch may only document entries that exist in this contract.

## 10. Completion definition

- Repeated Case Study UI lives in shared components and shared CSS.
- Project themes only map color / brand semantic values.
- Route CSS contains content visualization geometry or documented exceptions only.
- New Case Study pages can be built by composing shared patterns instead of copying old route CSS.
- `/design-system` can document the real Case Study system via the contract.
