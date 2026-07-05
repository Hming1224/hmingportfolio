# Testing And Verification

This project uses layered checks so agents and humans can run the smallest useful verification first, then let CI handle the broad regression pass.

## Local Commands

```bash
npm run verify:quick
npm run verify:build
npm run smoke:ds
npm run smoke:contact
npm run smoke:regression
npm run verify:ds
npm run verify:full
```

`smoke:*` commands expect a fresh production build. Run `npm run build` once before repeated local smoke runs. `verify:ds` and `verify:full` include the build step.

To run one Playwright case:

```bash
npx playwright test tests/smoke/design-system.spec.ts --grep "ProjectCard"
```

## When To Run What

- General code change: `npm run verify:quick` (seconds to under 1 minute).
- `/design-system` change: `npm run verify:ds` (includes build, usually a few minutes; agents should run it in the background).
- Contact change: `npm run build`, then `npm run smoke:contact` (smoke is usually 1-2 minutes).
- Navbar or shared layout change: `npm run verify:full` locally, or push and let CI run the full smoke set.
- Before merging to `main`: use `npm run verify:full` or wait for green CI.
- Repeatedly debugging one smoke: build once, then rerun the matching `smoke:*` command without rebuilding every time.

Local Playwright uses `http://127.0.0.1:3100` and starts `npm run start:test`. It intentionally does not use port `3000`, which is reserved for Hming's usual long-running dev server.

## Git Hooks

- `pre-commit`: runs `npm run verify:quick`.
- `pre-push`: runs `npm run verify:build`.

Skip the pre-push hook only when needed:

```bash
SKIP_VERIFY=1 git push
```

Husky can also be disabled with `HUSKY=0` for exceptional cases.

## CI And Post-Deploy Smoke

`.github/workflows/design-system-ci.yml` runs on pushes to `codex/ds-page-alignment` and `main`, plus pull requests into `main`. It installs dependencies, installs Chromium, runs lint, checks tokens, builds once, then runs design-system, contact, and regression smoke tests.

`.github/workflows/post-deploy-smoke.yml` runs from GitHub `deployment_status` events when Vercel reports a successful deployment. It sets `SMOKE_BASE_URL` to the deployed URL, so Playwright hits the actual Preview or Production site and does not start a local server. Preview runs regression, design-system, and contact smoke. Production runs regression, design-system, and contact page smoke with `@form` tests excluded. The workflow also has `workflow_dispatch` as a fallback for manually smoking any URL.

Production smoke is an alarm, not a deployment gate. If it fails, the site may already be live; check the Playwright artifact and consider Vercel Instant Rollback.

## Agent Development Loop

1. Scope audit: identify touched area and matching smoke script.
2. Implement a small change.
3. Run targeted verification.
4. If failing, report failing test, route, viewport, error, and artifact path.
5. Fix the smallest relevant scope.
6. Commit only after targeted checks pass.
7. Let CI run full regression on push or PR.
