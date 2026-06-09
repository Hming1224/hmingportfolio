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

Ownership checks:

- Project title, href, cover, status, and next-project relationship have one
  source in `data/projects.ts`.
- `Works.tsx` only renders and filters project data.
- Route-specific CSS is imported only by its route.
- About and contact static content live in their matching `data/` files.

## Workspace strategy

- `iterations/` is retained as design-verification history.
- Local agent helpers under `scripts/` and `.codex/` are excluded from website
  lint so `npm run lint` represents website health.
- Refactor changes must not delete or rewrite existing uncommitted iteration
  artifacts.
