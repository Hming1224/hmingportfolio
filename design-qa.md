# Design QA — AI Impact 03 Outcome Carousel

## Visual truth

- Reference: React Bits `Depth Carousel`
- Reference capture: `/private/tmp/reactbits-depth-carousel-source.png`
- Implementation capture: `/private/tmp/ai-impact-outcomes-implementation.png`
- Side-by-side comparison: `/private/tmp/depth-carousel-comparison.png`
- Comparison state: default centered card, desktop viewport, both images normalized to 720 px height

## Match assessment

- Preserved the reference interaction model: one sharp centered card, receding side cards, depth, blur, arrows, dots, keyboard navigation and drag/swipe.
- Kept the reference portrait geometry and expanded the card to 400 × 440 px so project screenshots remain prominent inside the wider portfolio layout.
- Section 03 uses a split layout: title and explanation stay in the left column; the carousel fills the right column with a protected gap between both regions.
- Kept the existing AI Impact visual system: dark surface, yellow accent, white body copy, restrained borders and rounded corners.
- Default state shows outcome type and title only. Hover and keyboard focus reveal the description, workflow-stage badges and Skill badges.
- Touch devices show the active card details without requiring hover.

## Required surfaces

- Typography: title hierarchy remains readable over images; metadata is secondary.
- Spacing: centered card has clear separation from the controls and neighboring cards.
- Color: overlays maintain white-text contrast without turning the whole image yellow.
- Imagery: all four cards use real project imagery with cover cropping and descriptive alt text.
- Copy: each outcome names the artifact, connected workflow stages and reusable Skills.

## Interaction and responsive checks

- Desktop: split layout, hover, focus, previous/next controls, dots and keyboard arrows verified at 1280 × 720.
- Mobile: 300 × 330 px rendered active card, details visible, swipe supported, no horizontal page overflow at 390 × 844.
- Reduced motion: depth transitions are removed while content and controls remain usable.

## Findings

- P0: none.
- P1: none.
- P2: none.
- P3: card width is intentionally wider than the 300 × 380 px reference to use the right content column without colliding with the section introduction.

## Final result

Passed.
