# Integrated Execution Order — Hming Portfolio Design System Remediation

This is the top-level plan that coordinates:

1. `docs/design-system/` stable Design System docs.
2. Case Study remediation branch: `codex/design-system-remediation`.
3. DS page alignment branch: `codex/ds-page-alignment`.

## 0. Required setup

Before any implementation session:

1. Confirm current worktree and branch.
2. Read `docs/design-system/08-ai-implementation-rules.md`.
3. Read `docs/design-system/02-tokens.md`.
4. Read the relevant implementation plan.
5. Run `git status`; do not stage unrelated files.

## 1. Establish token and AI governance

Goal: make sure every AI agent works from the same rules.

Required files:

- `docs/design-system/design-system.md`
- `docs/design-system/02-tokens.md`
- `docs/design-system/08-ai-implementation-rules.md`
- `docs/design-system/09-integrated-workflow.md`
- `docs/design-system/contracts/case-study-components.md`

Exit criteria:

- Every plan references these files in its “before editing” section.
- `styles/tokens.css` is explicitly documented as runtime source of truth.
- Markdown / YAML tokens are documented as mirrors only.

## 2. Continue Case Study remediation in green batches

Use:

`plans/2026-06-27_case-study-design-system-consolidation-plan_v2.md`

Work only in branch:

`codex/design-system-remediation`

Batch sequence:

1. Confirm live baseline for touched routes.
2. Select one primitive family or component migration.
3. Create old selector → new primitive / token / exception mapping.
4. Implement minimal changes.
5. Run all validations.
6. Update `docs/design-system/contracts/case-study-components.md`.
7. Commit + push feature branch.

Exit criteria for each batch:

- `git diff --check`
- `npm run lint`
- `npm run check:tokens`
- `npm run build`
- `npm run audit:architecture` when touching case-study CSS or tokens
- Browser smoke at `1440 / 1024 / 768 / 390`
- Horizontal overflow = 0
- Console errors = 0
- Contract updated if a reusable component, token, primitive, or exception changed

## 3. Align DS page only after contracts exist

Use:

`plans/2026-06-27_design-system-page-code-alignment-plan_v2.md`

Work only in branch:

`codex/ds-page-alignment`

Batch sequence:

1. Read the latest `contracts/case-study-components.md`.
2. Select one component category or one batch of stable contracts.
3. Update `lib/design-system-data.ts` / `lib/design-system-docs.ts`.
4. Do not modify case-study implementation files.
5. Run all validations.
6. Commit + push feature branch.

Exit criteria:

- `/design-system` lists only real components, real props, real variants, and real tokens.
- No ghost components.
- No ghost tokens.
- No route-local exception documented as a core reusable component.

## 4. Final integration before merge

After both feature branches are green:

1. Review contract completeness.
2. Compare `/design-system` against real code.
3. Run full validations in merged preview.
4. Hming reviews visual baseline and exceptions.
5. Merge only after explicit approval.

## Forbidden shortcut

Do not merge the DS page alignment branch to main before the case-study contracts it documents have been verified.
