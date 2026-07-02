# AI Implementation Rules

These rules are mandatory for any AI agent modifying the Hming Portfolio repo.

## 1. Source of truth

- `styles/tokens.css` is the only runtime source of truth for design tokens.
- Markdown / YAML token indexes are documentation mirrors only.
- Real component code is the source of truth for props, variants, states, and behavior.
- Current production code is the source of truth for visual behavior. If a design-system rule conflicts with current production UI, stop and re-audit before changing code.
- `/design-system` may document real components; it must not invent components, props, variants, tokens, or examples.

## 2. Branch and worktree boundaries

Historical branch context — this section describes the 2026-06 remediation branch era scope. Current maintenance work follows `AGENTS.md`, scoped user tasks, production code as source of truth, and focused commits on `main` when explicitly approved.

Focused docs-only commits on `main` are allowed only when explicitly approved and scoped. Do not use this historical branch guidance to block an approved docs-only checkpoint, and do not use it to widen a task beyond the requested files.

### Case Study remediation branch

Branch: `codex/design-system-remediation`

Allowed scope:

- `app/{advantech,crypto-arsenal,laushu}/**`
- `components/case-study/**`
- `styles/case-study*.css`
- `styles/tokens.css` only for `--cs-*` additions or corrections when justified
- `docs/design-system/contracts/case-study-components.md`

Forbidden scope:

- `/design-system` page files
- `lib/design-system-data.ts`
- `lib/design-system-docs.ts`
- `components/design-system/**`

### Design System page alignment branch

Branch: `codex/ds-page-alignment`

Allowed scope:

- `app/design-system/**`
- `lib/design-system-data.ts`
- `lib/design-system-docs.ts`
- `components/design-system/**`
- `components/DesignSystemPlayground.tsx`
- `components/ui/Accordion.tsx`
- `scripts/check-design-tokens.mjs`

Forbidden scope:

- Case Study route files
- `components/case-study/**`
- `styles/case-study*.css`
- Changing values in `styles/tokens.css`

## 3. Token rules

Use the lowest valid token layer.

```text
foundation token (--hm-* / --fs-* / --text-*)
  -> case semantic token (--cs-*)
    -> project theme token (.theme-<slug> color mappings)
      -> route-local token (--laushu-* / --ca-* only for project-specific visualization)
        -> one-off local value
```

Rules:

- Do not create `--hm-*` tokens for one page or one visual.
- Do not create `--cs-*` tokens unless the same semantic value is shared by Case Study patterns.
- Do not make components consume primitive color scale tokens directly unless explicitly documented.
- Target state: `.theme-<slug>` should primarily define semantic color, surface, text, and brand mappings.
- Current production CSS may still contain transitional route-specific or colocated component custom properties for spacing, radius, layout, min-width, matrix, flow, timeline, and diagram geometry. These transitional variables must not trigger an immediate route CSS refactor.
- Design token aliases are allowed only when they are visual-preserving and the component contract or visual baseline is clear.
- Visualization geometry, matrix columns, timeline geometry, SVG connector coordinates, and route-specific min-width should remain local or colocated unless a component abstraction assessment proves reuse is safe.
- One-off narrative visuals may keep local CSS values if they preserve storytelling or prevent visual regression.

## 4. Component and pattern rules

- Shared components live in `components/ui/**` or `components/case-study/**`.
- Reusable Case Study UI belongs in `components/case-study/**` and `styles/case-study.css`.
- Route-private CSS must be limited to content visualization geometry, project-specific data visuals, or documented exceptions.
- Do not convert a Hming-approved one-off narrative layout into a generic component unless it repeats with the same information hierarchy and behavior.

## 5. Batch size rules

Never perform broad unbounded replacement.

A valid batch is one of:

- One primitive family across touched pages.
- One Case Study component migration.
- One route section group.
- One DS page documentation category.

Normal diff target: 150–250 net changed lines. Stop and split before 300 lines unless the change is verified dead-code deletion.

## 6. Required green-batch validation

Every batch must run:

1. `git diff --check`
2. `npm run lint`
3. `npm run check:tokens`
4. `npm run build`
5. If touching case-study CSS or tokens: `npm run audit:architecture`
6. Browser smoke test for touched routes at `1440 / 1024 / 768 / 390px`
7. Horizontal overflow = 0
8. Console errors = 0
9. Touched interactions still work: tabs, zoom/lightbox, video, TOC, flow scroll, language route

For historical feature-branch remediation work, commit and push only the current feature branch. The earlier "Do not push main" rule belongs to that historical branch flow. For current scoped maintenance work, follow the explicit task instructions; focused docs-only commits on `main` are allowed only when explicitly approved and scoped.

## 7. Contract rule

Current component contract source of truth:

`docs/design-system/03-components.md`

`docs/design-system/contracts/case-study-components.md` is a historical / legacy handoff reference. Do not use it as current implementation instruction without checking current production code and `03-components.md`.

If a scoped batch creates, stabilizes, or changes a shared Case Study component, token, primitive, or exception, update the current component contract source of truth and any specifically requested governance docs. Keep the diff focused; do not update legacy handoff files unless the task explicitly asks for it.

## 8. Forbidden prompts

Do not follow prompts like:

- “Align the whole site to the design system.”
- “Tokenize all CSS values.”
- “Delete all route CSS.”
- “Make every case study use the same layout.”

Replace them with bounded audit-first tasks from `plans/00-integrated-execution-order.md`.
