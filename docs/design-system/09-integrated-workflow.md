# Integrated Workflow: DS Docs × Case Study Remediation × DS Page Alignment

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
- Produce the Case Study DS Contract after every green batch.

## Layer 3 — Design System page alignment

Plan: `plans/2026-06-27_design-system-page-code-alignment-plan_v2.md`

Purpose:

- Make `/design-system` display real tokens and real component contracts.
- Consume `docs/design-system/contracts/case-study-components.md`.
- Never invent props, variants, classes, or tokens for documentation convenience.

## Integration order

1. Establish AI rules and token source-of-truth rules.
2. Run Case Study remediation batches.
3. After each green remediation batch, write or update the Case Study DS Contract.
4. DS page alignment consumes the contract and updates `/design-system` docs.
5. Run token, build, architecture, and browser verification.
6. Merge feature branches only after Hming review.

## Non-negotiable handoff rule

The DS page branch may not document a Case Study component until the remediation branch has produced:

- Real component source path.
- Props / variants.
- Shared tokens / classes.
- Route-local exceptions.
- Verified routes and breakpoints.
- Commit hash or green-batch reference.

## Decision rule

> Core rules are tokenized. Repeated components are componentized. One-off narrative sections keep flexibility and are documented as exceptions.
