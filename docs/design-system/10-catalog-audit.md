# Design System Catalog Audit

Batch 7A audit only. This file records remaining catalog candidates and recommended migration decisions. It does not change the visible catalog, runtime docs, production UI, or component behavior.

## Scope Notes

- Checked source areas: `lib/design-system-data.ts`, `lib/design-system-docs.ts`, `components/design-system/ComponentDemo.tsx`, `components/design-system/DesignSystemDocsPage.tsx`, `components/design-system/DesignSystemExplorer.tsx`, `docs/design-system/03-components.md`, `components/`, `app/`, and `styles/`.
- Requested files `docs/design-system/04-component-boundaries.md` and `docs/design-system/09-roadmap.md` do not exist in the current tree. Related current files are `04-case-study-patterns.md`, `06-governance.md`, and `09-integrated-workflow.md`.
- Original Batch 7A decision terms were recommendations only; no catalog item was moved or removed during that audit.
- Batch 7B-2 update: `ScrollProgress`, `CaseNextNav`, and `CaseInfoCard` were reclassified from the general-purpose component catalog to Component Boundaries / Shared case-study pattern documentation. This preserves their documentation value while placing them in the correct pattern context.
- Batch 7C-1 update: `Tabs` stays visible and now renders the real source-level Tabs primitive used by homepage Selected Works. `YearRail` was reclassified from visible Navigation to Component Boundaries / Route-local pattern because it depends on the About timeline DOM and scroll-reading model.
- Tabs parity hotfix: the previous primitive-only docs example was replaced with the same `WorkCategoryTabs` wrapper used by homepage Selected Work, keeping the production `project-tabs*` structure and visual treatment shared between the route and documentation.
- Tabs context simplification: the documented control remains production-backed through `WorkCategoryTabs`, while the supporting panel content is simplified wireframe context so it does not compete with the tabs themselves.
- Batch 7C-2 update: `ProposalTabs` stays visible because the documented subject is the shared `CaseProposalTabs` component used by Advantech and Crypto Arsenal. The docs example now renders the Advantech production wrapper with real Scenario 1 proposal data instead of a docs-local tablist.
- Batch 7C-3 update: `FloatingInput` and `FloatingTextarea` stay visible as production-backed Contact form field patterns. They are not exported shared components today; docs examples render the same `.form-field` / `.input--error` structure and `styles/contact.css` styling used by the Contact route.

## Migration Matrix

| Item | Current catalog status | Source file | Production route usage | Current example type | Risk | Recommended decision | Why | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Tabs | Visible: Navigation | `components/WorkCategoryTabs.tsx`, `components/animate-ui/primitives/base/tabs.tsx` | `components/Works.tsx` homepage Selected Works tabs | Production-backed Selected Work category tabs with simplified wireframe panel context | Low | Keep visible / standardize later | Real production component and homepage adoption exist; docs and homepage now share the same `WorkCategoryTabs` wrapper and `project-tabs*` classes. Supporting panel content is intentionally simplified so the documented control remains the focus. | Keep visible; later only polish keyboard limitations if the primitive changes. |
| YearRail | Reclassified to Component Boundaries / Route-local pattern | `components/YearRail.tsx` | `app/about-me/page.tsx` experience timeline | Pattern documentation in Component Boundaries | Medium | Move to Component Boundaries | Real source exists, but it depends on `.experience-card[data-year]`, About chronology, section anchors, and scroll-reading behavior. | Document as About timeline navigation boundary, not as a general-purpose Navigation component. |
| ScrollProgress | Reclassified to Component Boundaries / Shared case-study pattern | `components/ScrollProgress.tsx` | `components/case-study/CaseStudyShell.tsx` across case routes | Pattern documentation in Component Boundaries | Medium | Move to Component Boundaries | It is a shell-level reading affordance tied to `CaseStudyShell`, not a standalone component users directly compose. | Document as case-study shell behavior, not as a general-purpose progress component. |
| CaseNextNav | Reclassified to Component Boundaries / Shared case-study pattern | `components/case-study/CaseStudyShell.tsx` | `app/advantech/page.tsx`, `app/crypto-arsenal/page.tsx`, `app/laushu/page.tsx` via `nextNav` prop | Pattern documentation in Component Boundaries | Medium | Move to Component Boundaries | No standalone component exists; it is a `CaseStudyShell` slot/behavior using shared `Button`. | Document as case-study reading-flow navigation, not as generic pagination or global navigation. |
| FloatingInput | Visible: Data Entry | `components/Contact.tsx` + `styles/contact.css` | Contact page name, company, email, and phone fields | Production-backed Contact field structure using `.form-field`, native input, label, error copy, and Contact CSS | Low | Keep visible / standardize later | Live production usage exists as a Contact route field pattern. The docs entry is explicit that there is no exported shared input component yet. | Keep visible as a Contact form pattern; revisit extraction only if the same short-field structure repeats outside Contact. |
| FloatingTextarea | Visible: Data Entry | `components/Contact.tsx` + `styles/contact.css` | Contact page message field | Production-backed Contact message field structure using `.form-field.is-textarea`, native textarea, label, error copy, and Contact CSS | Low | Keep visible / standardize later | Live production usage exists as the Contact message pattern. The docs entry is explicit that there is no exported shared textarea component yet. | Keep visible as a Contact form pattern; revisit extraction only if another production surface needs the same multiline field behavior. |
| CaseHero | Visible: Case Study | `components/case-study/CaseHero.tsx` | Advantech, Crypto Arsenal, Laushu hero sections | Semi-real reference-style anatomy with real Crypto image/content | Low | Keep visible / standardize later | Real shared source and multi-route adoption exist. | Later standardize section order and render closer to production `CaseHero` props if layout remains stable. |
| ProposalTabs | Visible: Case Study | `components/case-study/CaseProposalTabs.tsx`, `app/advantech/components/ProposalTabs.tsx`, `app/crypto-arsenal/components/WireframeProposalBoard.tsx` | Advantech SolutionSection; Crypto Arsenal WireframeSection | Production-backed Advantech ProposalTabs wrapper with real Scenario 1 proposal data | Low | Keep visible / standardize later | Real shared component and multi-route adoption exist. The docs example now exercises the actual tablist, carousel, slide caption, adopted marker, and rationale behavior. | Keep visible as a case-study proposal comparison pattern; later polish only if production API changes. |
| CaseInfoCard | Reclassified to Component Boundaries / Shared case-study pattern | `components/case-study/CaseInfoGrid.tsx` via `CaseHero` | Advantech, Crypto Arsenal, Laushu hero metadata grids | Pattern documentation in Component Boundaries | Medium | Move to Component Boundaries | There is no `CaseInfoCard` component; the actual source is `CaseInfoGrid` inside `CaseHero`. | Document as case-study overview metadata anatomy, not as a general-purpose Card contract. |
| Radio | Not visible in current `designSystemSections`; component seed remains | `components/ui/Radio.tsx` | No direct production route usage found | Contract-only card if opened by doc slug | Medium | Future Candidates | Source component exists and styles exist, but no live adoption yet. | Keep as future candidate until a real mutually exclusive choice appears in production. |
| Alert | Not visible as standalone catalog item; used internally by Toast | `components/ui/Alert.tsx` | `components/ui/Toast.tsx` uses `Alert`; no standalone route usage found | Contract-only card if opened by doc slug | Medium | Move to Reference only | It is source-level and indirectly live through Toast, but not a standalone product pattern. | Reference as Toast internal foundation or future inline feedback contract. |
| Select | Not visible in current `designSystemSections`; component seed remains | `components/ui/Select.tsx` | No direct production route usage found | Contract-only card if opened by doc slug | Medium | Future Candidates | Source component exists and styles exist, but no live adoption yet. | Revisit only when a real Contact inquiry type or product surface needs select behavior. |
| Checkbox | Not visible in current `designSystemSections`; component seed remains | `components/ui/Checkbox.tsx` | No component usage found; text/media references to checkbox appear inside Crypto case content only | Contract-only card if opened by doc slug | Medium | Future Candidates | Source component exists, but current Crypto references are case content, not this UI component adoption. | Keep out of visible live catalog until production form/list usage exists. |
| EmptyState | Not visible in current `designSystemSections`; component seed remains | `components/ui/EmptyState.tsx` | No direct production route usage found | Backlog-style doc entry | Low | Backlog | Source exists but no live route needs empty/search/filter state yet. | Keep as backlog until a real empty state appears. |
| BeforeAfterPanel | Reference / internal anatomy through BeforeAfterNarrativeFrame and Component Boundaries | `components/case-study/BeforeAfterPanel.tsx` | Internal usage by `BeforeAfterNarrativeFrame`; no direct route adoption | Anatomy/internal part, not standalone example | Low | Move to Component Boundaries | It is an internal visual shell, not an independent route-level pattern. | Keep documentation under BeforeAfterNarrativeFrame anatomy and Component Boundaries only. |
| Accordion | Visible: Navigation | `components/ui/Accordion.tsx` | Design System sidebar/mobile docs navigation | Docs-real usage context | Low | Keep visible / standardize later | It is a real shared component used by the docs route. | Later add standard code guidance if needed. |
| ContactMethod | Visible: Data Entry | `components/Contact.tsx` | Contact page contact methods | Semi-real route-local card | Medium | Move to Component Boundaries | Not an exported shared component; it is Contact page composition. | Later document with Contact form patterns rather than shared UI catalog. |
| SectionHeading | Visible: Data Display | `app/about-me/page.tsx` / homepage sections | Homepage and About section headings | Sample/reference-style heading | Medium | Move to Component Boundaries | No shared component source; it is a repeated layout convention. | Later define as page-section pattern or keep in reference only. |
| ProjectTag | Visible: Data Display | `components/Works.tsx` / `components/ProjectCard.tsx` | Selected Works project metadata | Sample/reference-style tags | Low | Keep visible / standardize later | Real production visual token/pattern exists in project cards. | Later ground example directly in ProjectCard anatomy. |
| SocialLink | Visible: Data Display | `components/Footer.tsx` | Footer social links | Semi-real footer links | Low | Move to Component Boundaries | It is part of Footer anatomy, not a standalone component. | Later move under Footer anatomy/reference. |
| SkillCategoryCard | Visible: Data Display | `app/about-me/page.tsx` | About skills section | Likely route-local pattern | Medium | Needs Hming decision | Could be useful for About content, but not clearly a shared component. | Decide whether About route-local patterns belong in visible catalog. |
| ExperienceCard | Visible: Data Display | `app/about-me/page.tsx` | About timeline | Likely route-local pattern tied to YearRail scrollspy | Medium | Move to Component Boundaries | It is part of About timeline behavior, not a standalone shared component. | Document with YearRail/About timeline boundary. |
| HeroBadge | Visible: Data Display | Hero / availability badge | Homepage hero | Sample/reference-style badge | Medium | Needs Hming decision | Could be a public brand signal, but may be too small/local for catalog visibility. | Decide whether tiny hero atoms should remain visible or move under Hero anatomy. |

## Remaining Sample-only / Docs-only Examples

- `ProposalTabs` was removed from this list in Batch 7C-2 because the visible example now renders the production-backed Advantech ProposalTabs wrapper.
- Contract-only cards for `Select`, `Checkbox`, `Radio`, and `Alert` are appropriate as non-production signals if they stay out of the visible live catalog.

## Suggested Grouping Summary

### Keep visible / standardize later

- Tabs
- FloatingInput
- FloatingTextarea
- CaseHero
- ProposalTabs
- Accordion
- ProjectTag

### Move to Component Boundaries

- YearRail
- BeforeAfterPanel
- ContactMethod
- SectionHeading
- SocialLink
- ExperienceCard

### Reclassified to Component Boundaries / Shared case-study pattern

- ScrollProgress
- CaseNextNav
- CaseInfoCard

### Move to Reference only

- Alert

### Future Candidates

- Radio
- Select
- Checkbox

### Backlog

- EmptyState

### Needs Hming decision

- SkillCategoryCard
- HeroBadge

## No Runtime Changes

This audit did not change:

- Visible catalog structure
- `ComponentDemo` rendering
- Production components or routes
- `styles/tokens.css`
