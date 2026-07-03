# Integrated Workflow: DS Docs × Case Study Remediation × DS Page Alignment

> **Status:** historical workflow snapshot.
> This historical coordination document describes an earlier three-branch workflow that has ended. Current component contracts live in `docs/design-system/03-components.md`; current governance boundaries live in `docs/design-system/06-governance.md`; current execution should follow scoped task prompts and production code as source of truth.
> Mentions of remediation branches, DS page branches, or legacy contract files are historical context unless a current task explicitly revalidates them.

This repo has three coordinated layers of work.

## Layer 1 — Stable Design System docs

Folder: `docs/design-system/`

Purpose:

- Define stable design principles, token hierarchy, component rules, accessibility, and AI execution rules.
- Prevent AI agents from converting design-system cleanup into another round of vibe-coded technical debt.

## Layer 2 — Case Study remediation

Plan: `plans/2026-06-27_case-study-design-system-consolidation-plan_v2.md`

Purpose:

- Clean technical debt in Advantech, Crypto Arsenal, and Laushu case pages.
- Move repeated UI from route CSS into shared `components/case-study/**` and `styles/case-study.css`.
- Preserve project-specific visualization geometry as documented exceptions.
- Historical workflow: produce the Case Study DS Contract after every green batch. Current component contracts live in `docs/design-system/03-components.md`.

## Layer 3 — Design System page alignment

Plan: `plans/2026-06-27_design-system-page-code-alignment-plan_v2.md`

Purpose:

- Make `/design-system` display real tokens and real component contracts.
- Historical workflow: consume `docs/design-system/contracts/case-study-components.md`. Current implementation should use `docs/design-system/03-components.md` as the component contract source of truth.
- Never invent props, variants, classes, or tokens for documentation convenience.

## Integration order

1. Establish AI rules and token source-of-truth rules.
2. Run Case Study remediation batches.
3. Historical workflow: after each green remediation batch, write or update the Case Study DS Contract. Current workflow updates the scoped source-of-truth docs requested by the task.
4. DS page alignment consumes the contract and updates `/design-system` docs.
5. Run token, build, architecture, and browser verification.
6. Merge feature branches only after Hming review.

## Historical handoff rule

The DS page branch may not document a Case Study component until the remediation branch has produced:

- Real component source path.
- Props / variants.
- Shared tokens / classes.
- Route-local exceptions.
- Verified routes and breakpoints.
- Commit hash or green-batch reference.

## Decision rule

> Core rules are tokenized. Repeated components are componentized. One-off narrative sections keep flexibility and are documented as exceptions.
