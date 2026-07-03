# Design System Page ↔ Code Alignment Plan v2

This plan supersedes the older `2026-06-25_design-system-page-code-alignment-plan.md` as the active execution guide.

The original long plan is archived at:

`plans/archive/2026-06-25_design-system-page-code-alignment-plan.md`

## 1. Purpose

Make `/design-system` a true visualization of the real design system, not a separate hand-written design website.

The page must show:

- Real tokens from `styles/tokens.css`.
- Real components from `components/ui/**` and `components/case-study/**`.
- Real props, variants, states, and usage rules.
- Real Case Study exceptions from `docs/design-system/contracts/case-study-components.md`.

## 2. Branch and worktree

Branch:

`codex/ds-page-alignment`

Allowed files:

- `app/design-system/**`
- `lib/design-system-data.ts`
- `lib/design-system-docs.ts`
- `components/ui/Accordion.tsx`
- `components/design-system/**`
- `components/DesignSystemPlayground.tsx`
- `scripts/check-design-tokens.mjs`

Read-only:

- `styles/tokens.css`
- `components/ui/**`
- `components/case-study/**`
- `styles/case-study.css`
- `docs/design-system/contracts/case-study-components.md`

Forbidden files:

- `app/{advantech,crypto-arsenal,laushu}/**`
- `components/case-study/**`
- `styles/case-study*.css`
- Token value changes in `styles/tokens.css`

## 3. Required reading before editing

1. `docs/design-system/08-ai-implementation-rules.md`
2. `docs/design-system/02-tokens.md`
3. `docs/design-system/contracts/case-study-components.md`
4. `plans/00-integrated-execution-order.md`
5. This plan

## 4. Source of truth order

1. Real code: `components/ui/**`, `components/case-study/**`, `styles/tokens.css`, `styles/case-study.css`.
2. Case Study DS Contract: `docs/design-system/contracts/case-study-components.md`.
3. Stable DS docs: `docs/design-system/**`.
4. Live baseline: `https://hmingdesign.com/en`.

Do not document anything that cannot be found in one of the above sources.

## 5. Main rules

- Do not invent components, props, variants, classes, examples, or tokens.
- Do not treat route-local visualization exceptions as reusable core components.
- Do not change token values to make the DS page look nicer.
- `ds-*` classes are page shell styles only; they must not become a parallel design system.
- `/design-system` must consume the same tokens and component facts as the live site.

## 6. Execution phases

### Phase 0 — Data and token verification foundation

- Keep token and component metadata in a single data module.
- Ensure `scripts/check-design-tokens.mjs` validates token existence and prevents ghost tokens.
- Confirm `npm run check:tokens` is part of every green batch.

### Phase 1 — Token tables read real data

- `/design-system` token tables must read from `lib/design-system-data.ts`.
- Values must align with `styles/tokens.css`.
- Markdown / YAML token mirrors may be shown, but not treated as source.

### Phase 2 — Explorer IA and Accordion navigation

- `/design-system` remains a single-page explorer.
- Left sidebar is one integrated navigation tree: page anchors + Component Explorer + categories + components.
- Right panel owns content; do not create a three-column layout that squeezes content.
- Mobile uses the same navigation model, adapted responsively.

### Phase 3 — Non-case UI components alignment

For each component in `components/ui/**`:

- Confirm source file exists.
- Confirm props / variants / states from source.
- Confirm tokens actually used.
- Confirm usage and accessibility notes reflect real behavior.
- Remove ghost components and template filler text.

Priority:

1. Button
2. Input / Form controls
3. Accordion
4. Modal / Toast / Alert
5. Skeleton / EmptyState
6. Navigation / tabs / data display components

### Phase 4 — Case Study component docs from contract only

Only after `docs/design-system/contracts/case-study-components.md` has stable entries:

- Add Case Study components to the explorer.
- Use real props / variants from the contract and source code.
- Document route-local exceptions separately.
- Do not create fake demos for unstable APIs.

### Phase 5 — DS page visual self-alignment

- Replace one-off DS page UI with shared components where appropriate.
- Keep `ds-*` only for documentation layout shell.
- Ensure DS page itself follows spacing, typography, radius, motion, and accessibility rules.

### Phase 6 — Full validation

Required checks:

- `git diff --check`
- `npm run lint`
- `npm run check:tokens`
- `npm run build`
- Browser smoke test for `/design-system` at `1440 / 1024 / 768 / 390`
- Mobile nav / accordion works
- Hash / state switching works
- Horizontal overflow = 0
- Console errors = 0

## 7. Case Study documentation gate

Do not document a Case Study component unless the contract entry includes:

- Component source path
- Public API / props / variants
- Shared classes / tokens
- Allowed usage
- Do-not-use conditions
- Route-local exceptions
- Verification evidence

If the contract is missing or marked draft, show nothing or mark the category as pending. Do not add placeholder copy.

## 8. Completion definition

- `/design-system` displays only real tokens and real components.
- `check:tokens` passes.
- No ghost components.
- No ghost tokens.
- No route-local exception is presented as a reusable core pattern.
- Case Study docs match the remediation branch contract.
- The page itself follows the portfolio design system instead of inventing a parallel `ds-*` system.
