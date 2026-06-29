# Hming Portfolio — Design System Docs

This folder is the **stable Design System documentation package** for the Hming Portfolio repo.

It is designed for two audiences:

1. **Human collaborators** — designers, reviewers, and engineers who need to understand the design language and component rules.
2. **AI agents** — Codex / Claude / Gemini sessions that need hard boundaries before modifying code.

## Source of truth hierarchy

1. `styles/tokens.css` is the runtime source of truth for design tokens.
2. Real code is the source of truth for component APIs: `components/ui/**`, `components/case-study/**`, `styles/case-study.css`.
3. `docs/design-system/contracts/case-study-components.md` is the handoff contract from the Case Study remediation branch to the `/design-system` documentation branch.
4. Markdown token tables / YAML-like indexes are documentation mirrors only. They must not be edited as independent token sources.

## Required reading order for AI agents

Before any code edit, read:

1. `docs/design-system/08-ai-implementation-rules.md`
2. `docs/design-system/02-tokens.md`
3. `docs/design-system/04-case-study-patterns.md`
4. The relevant plan in `plans/`
5. For Case Study docs work, also read `docs/design-system/contracts/case-study-components.md`

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
| `08-ai-implementation-rules.md` | Non-negotiable rules for AI agents editing this repo. |
| `09-integrated-workflow.md` | How the DS docs, Case Study remediation, and DS page alignment plans work together. |
| `contracts/case-study-components.md` | Stable Case Study component contract produced by remediation batches and consumed by DS page docs. |
| `audit/` | Audit templates, migration status, and implementation order. |
| `changelog.md` | Documentation package changes. |

## Execution principle

> Stable docs define the rules. Real code proves the rules. Contracts bridge code and documentation. AI agents may only change one bounded workflow at a time.

Do not ask an AI agent to “fully align the site to the design system” in one task. Always follow the phased execution order in `plans/00-integrated-execution-order.md`.
