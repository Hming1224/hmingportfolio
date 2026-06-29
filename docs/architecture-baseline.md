# Architecture Baseline

## Phase 0 routes and regression checklist

| Route | Core checks |
|---|---|
| `/` | Hero buttons, project category tabs, project order, card CTA |
| `/about-me` | Genie reveal, year rail, educator cards, experience / skill / tool content |
| `/contact` | Copy email / phone, floating labels, Formspree loading / success / error |
| `/advantech` | TOC / scrollspy, timeline, workflow, connectors, tabs, lightbox, Vimeo, next project nav |

Repeat at `1440`, `1024`, `768`, and `390` px. Every route should have no
horizontal overflow and no console errors.

## Architecture checklist

When adding a project:

1. Add its summary and navigation relationship in `data/projects.ts`.
2. Add a route only when the project is published.
3. Use the shared case-study shell and keep route CSS isolated.

> Full step-by-step: see [`add-case-study-checklist.md`](./add-case-study-checklist.md),
> including the `.theme-<slug>` selector-scope convention for route-private CSS.

Ownership checks:

- Project title, href, cover, status, and next-project relationship have one
  source in `data/projects.ts`.
- `Works.tsx` only renders and filters project data.
- Route-specific CSS is imported only by its route.
- About and contact static content live in their matching `data/` files.

## Case study consolidation guard

Run `npm run audit:architecture` after changing case study CSS or case study
components. The audit now includes:

- route CSS isolation for Advantech, Crypto Arsenal, and Laushu;
- case-study CSS class / declaration inventory;
- theme root guard: `.theme-advantech`, `.theme-crypto-arsenal`, and
  `.theme-laushu` may define tokens, but must not define layout / spacing /
  typography geometry directly.

Current Phase 1 / 2 baseline:

- shared case-study CSS consumes `--cs-*` semantic tokens;
- each project theme maps its project colors into `--cs-*`;
- Hero / info-grid DOM for the three published case studies is routed through
  shared `CaseHero` and `CaseInfoGrid`, while preserving existing class names
  and visual CSS ownership.

Current Phase 3 baseline:

- shared case-study card / grid / media primitives live in
  `components/case-study/` as `CaseGrid`, `CaseCard`, `CaseMedia`, and
  `CaseMetricGrid`;
- `styles/case-study.css` owns the generic `.cs-grid`, `.cs-card`, and
  `.cs-media` frame rules;
- route CSS should use `--cs-grid-*`, `--cs-card-*`, and `--cs-media-*`
  variables for project-specific appearance instead of redefining the generic
  frame.

## Workspace strategy

- **Iterations Retention Strategy**: The `iterations/` directory stores design-verification history (screenshots and matching `iteration.md` logs). To prevent repository size bloat:
  1. **Landmark Only**: Only key design milestone/landmark iterations should be checked into Git.
  2. **Ignore Temporary Files**: Temporary scratch files, caches, and logs within `iterations/` are excluded from Git via `.gitignore`.
  3. **Periodic Cleanup**: Local trial-and-error verification folders (untracked folders) should be periodically cleaned up. Iteration records older than 30 days that are not critical milestones can be removed.
- Local agent helpers under `scripts/` and `.codex/` are excluded from website lint so `npm run lint` represents website health.
- Refactor changes must not delete or rewrite existing uncommitted iteration artifacts.
