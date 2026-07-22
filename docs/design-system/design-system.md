# Hming Portfolio — Design System Docs

This folder is the **stable Design System documentation package** for the Hming Portfolio repo.

It is designed for two audiences:

1. **Human collaborators** — designers, reviewers, and engineers who need to understand the design language and component rules.
2. **AI agents** — Codex / Claude / Gemini sessions that need hard boundaries before modifying code.

## Source of truth hierarchy

1. `styles/tokens.css` is the runtime source of truth for design tokens.
2. Real code is the source of truth for component APIs: `components/ui/**`, `components/case-study/**`, `styles/case-study.css`.
3. `docs/design-system/contracts/case-study-components.md` records the stable Case Study component contract.
4. Markdown token tables / YAML-like indexes are documentation mirrors only. They must not be edited as independent token sources.

## Required reading order for AI agents

For implementation work, start with `02-tokens.md`, `04-case-study-patterns.md`, and the relevant component contract.

## File map

| File | Purpose |
|---|---|
| `00-overview.md` | Brand intent, audience, design principles, site map. |
| `01-foundations.md` | Color, typography, spacing, layout, radius, shadow foundations. |
| `02-tokens.md` | Token hierarchy and source-of-truth rules. |
| `03-components.md` | Core UI component rules. |
| `04-case-study-patterns.md` | Shared Case Study shell and pattern rules. |
| `05-accessibility.md` | Accessibility requirements and checklist. |
| `06-governance.md` | Ownership, contribution, AI governance, validation rules. |
| `07-content-and-motion.md` | Motion, media, image, content and feedback rules. |
| `contracts/case-study-components.md` | Stable Case Study component contract produced by remediation batches and consumed by DS page docs. |
| `changelog.md` | Documentation package changes. |

## Execution principle

> Stable docs define the rules. Real code proves the rules. Contracts bridge code and documentation. AI agents may only change one bounded workflow at a time.

Do not ask an AI agent to “fully align the site to the design system” in one task. Work in a bounded scope, validate the affected routes, and review the result before merging.
