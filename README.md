# Hming Portfolio

Personal portfolio and UX/UI case-study site by Hming Huang. The site presents selected work across product design, interaction design, design systems, and front-end implementation.

Live site: [hmingdesign.com](https://hmingdesign.com)

## What is in this repository

- A multilingual Next.js portfolio (`/zh-TW` and `/en`)
- UX/UI case studies for Advantech, Crypto Arsenal, Laushu, and the design-system project
- A production-backed design-system documentation route
- Responsive layouts, interaction demos, motion, image/video media, and accessibility-minded UI states

The repository is primarily a record of the shipped portfolio experience and its implementation. Some case-study work is presented for portfolio purposes rather than as a reusable product template.

The public snapshot intentionally excludes the private `presentation/` and `docs/brand-film/` workspaces, along with local agent instructions, memory, hooks, and editor configuration.

## Tech stack

- Next.js 16 and React 19
- TypeScript
- CSS modules and project-scoped CSS
- `next-intl` for localization
- GSAP and Lottie for selected motion
- Playwright for smoke tests
- Vercel for deployment

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The public site can run without analytics configuration. The `cp` step creates a local-only `.env.local`; edit it only if you want to configure the optional integrations below.

Environment variables:

- `NEXT_PUBLIC_FORMSPREE_ID` — optional contact-form endpoint ID. The example includes the public portfolio endpoint; replace it if you use your own Formspree form.
- `NEXT_PUBLIC_GA_ID` — optional Google Analytics 4 Measurement ID.
- `NEXT_PUBLIC_CLARITY_ID` — optional Microsoft Clarity Project ID.

Open [http://localhost:3000](http://localhost:3000). Useful verification commands:

```bash
npm run verify:quick   # diff check, lint, design-token check
npm run verify:build   # quick checks plus production build
npm run verify:full    # build plus the full smoke suite
```

See [`docs/testing.md`](docs/testing.md) for the verification policy and targeted smoke commands.

## How Codex and GPT-5.6 were used

This portfolio was developed with Hming as the designer and decision-maker, working alongside Codex and GPT-5.6. AI support was part of the design-to-code workflow, not a replacement for authorship or review.

### Codex

Codex was used inside the repository to:

- turn approved design and content decisions into focused Next.js, React, TypeScript, and CSS changes;
- refactor route structure and reusable case-study / design-system components;
- maintain localization, responsive behavior, motion states, and accessibility details;
- run lint, token checks, builds, targeted Playwright smoke tests, and browser-based layout checks;
- keep implementation notes, validation evidence, and handoff documentation close to the code.

### GPT-5.6

GPT-5.6 was used as a reasoning and review partner for:

- clarifying the narrative of case studies and the information hierarchy of the portfolio;
- comparing implementation options before a change was made;
- reviewing responsive and design-system decisions against the intended visual baseline;
- identifying regression risks, missing validation, and work that should remain route-local instead of being prematurely abstracted.

Hming made the final calls on visual direction, content, evidence, scope, and release decisions. AI-generated changes were reviewed locally and validated with the project checks before being treated as finished.

## License and media

See [`LICENSE`](LICENSE) for the portfolio viewing and evaluation terms. Do not assume that the case-study content, client-related materials, screenshots, fonts, music, or video assets are available for reuse; third-party rights remain with their respective owners.
