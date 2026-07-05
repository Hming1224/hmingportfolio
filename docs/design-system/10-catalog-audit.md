# Design System Catalog Audit

Batch 7A audit only. This file records remaining catalog candidates and recommended migration decisions. It does not change the visible catalog, runtime docs, production UI, or component behavior.

## Scope Notes

- Checked source areas: `lib/design-system-data.ts`, `lib/design-system-docs.ts`, `components/design-system/ComponentDemo.tsx`, `components/design-system/DesignSystemDocsPage.tsx`, `components/design-system/DesignSystemExplorer.tsx`, `docs/design-system/03-components.md`, `components/`, `app/`, and `styles/`.
- Requested files `docs/design-system/04-component-boundaries.md` and `docs/design-system/09-roadmap.md` do not exist in the current tree. Related current files are `04-case-study-patterns.md`, `06-governance.md`, and `09-integrated-workflow.md`.
- Original Batch 7A decision terms were recommendations only; no catalog item was moved or removed during that audit.
- Batch 7B-2 update: `ScrollProgress`, `CaseNextNav`, and `CaseInfoCard` were reclassified from the general-purpose component catalog to Component Boundaries / Shared case-study pattern documentation. This preserves their documentation value while placing them in the correct pattern context.

## Migration Matrix

| Item | Current catalog status | Source file | Production route usage | Current example type | Risk | Recommended decision | Why | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Tabs | Visible: Navigation | `components/animate-ui/primitives/base/tabs.tsx` | `components/Works.tsx` homepage Selected Works tabs | Semi-real docs-local tablist using project data, not the actual `Tabs` composition | Medium | Keep visible / standardize later | Real production component and homepage adoption exist, but docs example does not render the actual source component. | Later render the real `Tabs` stack or clearly show production anatomy with source reference. |
| YearRail | Visible: Navigation | `components/YearRail.tsx` | `app/about-me/page.tsx` experience timeline | Semi-real visual approximation using About data, not the actual component | Medium | Keep visible / standardize later | Real source component and route adoption exist. Its scrollspy behavior is route-context dependent. | Later add code guidance and document route dependency on `.experience-card[data-year]`. |
| ScrollProgress | Reclassified to Component Boundaries / Shared case-study pattern | `components/ScrollProgress.tsx` | `components/case-study/CaseStudyShell.tsx` across case routes | Pattern documentation in Component Boundaries | Medium | Move to Component Boundaries | It is a shell-level reading affordance tied to `CaseStudyShell`, not a standalone component users directly compose. | Document as case-study shell behavior, not as a general-purpose progress component. |
| CaseNextNav | Reclassified to Component Boundaries / Shared case-study pattern | `components/case-study/CaseStudyShell.tsx` | `app/advantech/page.tsx`, `app/crypto-arsenal/page.tsx`, `app/laushu/page.tsx` via `nextNav` prop | Pattern documentation in Component Boundaries | Medium | Move to Component Boundaries | No standalone component exists; it is a `CaseStudyShell` slot/behavior using shared `Button`. | Document as case-study reading-flow navigation, not as generic pagination or global navigation. |
| FloatingInput | Visible: Data Entry | `components/Contact.tsx` + `styles/contact.css` | Contact page form fields | Semi-real markup using Contact-like CSS, not exported component | Medium | Keep visible / standardize later | Live production usage exists, but it is a Contact form pattern rather than a shared component. | Later decide whether to extract a source component or document as Contact form pattern. |
| FloatingTextarea | Visible: Data Entry | `components/Contact.tsx` + `styles/contact.css` | Contact page message field | Semi-real markup using Contact-like CSS, not exported component | Medium | Keep visible / standardize later | Live production usage exists, but it is tied to Contact route structure. | Later align with FloatingInput decision; do not duplicate as a separate shared component unless extracted. |
| CaseHero | Visible: Case Study | `components/case-study/CaseHero.tsx` | Advantech, Crypto Arsenal, Laushu hero sections | Semi-real reference-style anatomy with real Crypto image/content | Low | Keep visible / standardize later | Real shared source and multi-route adoption exist. | Later standardize section order and render closer to production `CaseHero` props if layout remains stable. |
| ProposalTabs | Visible: Case Study | `components/case-study/CaseProposalTabs.tsx`, `app/advantech/components/ProposalTabs.tsx`, `app/crypto-arsenal/components/WireframeProposalBoard.tsx` | Advantech SolutionSection; Crypto Arsenal WireframeSection | Semi-real docs-local tablist, not actual `CaseProposalTabs` | High | Keep visible / standardize later | Real shared component and multi-route adoption exist, but current example under-represents carousel/image/reference behavior. | Later render actual `CaseProposalTabs` with trimmed real data or document as production preview with limited interaction. |
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

- `ProposalTabs`: docs-local tablist; actual source is `CaseProposalTabs` with carousel/images/reference images.
- `YearRail`: visual approximation; actual scrollspy component depends on About page DOM.
- `Tabs`: docs-local tablist; production uses the animate-ui Tabs composition in `Works`.
- Contract-only cards for `Select`, `Checkbox`, `Radio`, and `Alert` are appropriate as non-production signals if they stay out of the visible live catalog.

## Suggested Grouping Summary

### Keep visible / standardize later

- Tabs
- YearRail
- FloatingInput
- FloatingTextarea
- CaseHero
- ProposalTabs
- Accordion
- ProjectTag

### Move to Component Boundaries

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
