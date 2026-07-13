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

### Preview Deployment Protection Bypass

Vercel preview URLs sit behind Vercel Authentication, so CI would only ever see the Vercel login wall (every route then fails on the navbar assertion). The workflow passes `VERCEL_AUTOMATION_BYPASS_SECRET` (GitHub Actions secret) and Playwright sends it as the `x-vercel-protection-bypass` header. The secret is generated in Vercel: Project Settings → Deployment Protection → Protection Bypass for Automation. If post-deploy smoke suddenly fails on every route with a missing navbar, first suspect an expired/rotated bypass secret.

## Agent Development Loop

1. Scope audit: identify touched area and matching smoke script.
2. Implement a small change.
3. Run targeted verification.
4. If failing, report failing test, route, viewport, error, and artifact path.
5. Fix the smallest relevant scope.
6. Commit only after targeted checks pass.
7. Let CI run full regression on push or PR.

## CI / Smoke Failure Handling Policy (Hard Guardrails For Agents)

Binding policy for every agent working in this repo. It exists because a 2026-07-05 incident burned an hour on six force-push CI retries.

1. **CI is a detector, not an auto-repair loop.** A red run means "classify the failure" (test bug? environment difference? real regression?), never "keep changing things until green".
2. **Pure testing/infra tasks must not touch production UI.** If verification reveals a low-risk RWD issue inside an already-authorized maintenance task, reclassify it as the bounded RWD repair exception below instead of mixing test and production changes in one attempt.
3. **High-impact or ambiguous production bugs → stop and report first.** Changes to shared primitives, content, design direction, interaction contracts, or test expectations require separate approval. Low-risk RWD repairs follow the exception below. A documented pre-existing issue may use a narrow known-issue budget in the affected spec, with a comment and follow-up task.
4. **One repair attempt per evidence-backed hypothesis.** If it fails, return to audit. Do not keep changing numbers under the same hypothesis; another attempt requires new measurements that identify a different root cause.
5. **Stop when evidence runs out or scope expands.** Output a triage report when no new root-cause evidence is available, the repair would cross the low-risk boundary, or the same hypothesis already failed. No amend + force-push retry loops.
6. **Debug with targeted tests only** (`npx playwright test <spec> --grep "<name>"`). Never rerun the full suite while iterating, and never push just to "see if CI passes now".
7. **Never skip a failing test** (`test.skip` / `test.fixme` / deleting it). The documented budget in rule 3 is the only sanctioned interim measure.
8. **Never loosen an assertion to silence a failure.** Tolerances/budgets are only for documented pre-existing issues, never for changes made in the current task.
9. **Never change tests and production code in the same attempt**, unless the task explicitly allows it — otherwise you cannot tell which change did what.
10. **Full regression runs only as a gate**: CI on push/PR/main and manual dispatch. It is not a local debug tool.

### Autonomous Low-Risk RWD Repair Exception

Agents may complete `audit → smallest fix → targeted verification → commit` without asking Hming first when all of the following are true:

- The issue is a reversible RWD/layout defect on an existing route or component, such as minor overflow, alignment, wrapping, spacing, or breakpoint behavior.
- The repair stays route-local or component-local and does not change shared primitives, content, design direction, interaction behavior, dependencies, or test expectations.
- The root cause is supported by direct evidence such as DOM metrics, computed styles, screenshots, traces, or a reproducible targeted test.
- The current task already authorizes maintenance of the affected area.

Required workflow:

1. Audit first and record the failing route, viewport, element, measurement, and relevant clipping/layout chain.
2. Apply the smallest production fix. Do not modify tests in the same attempt.
3. Run only the matching targeted verification while iterating.
4. If the fix fails, return to audit. A new repair is allowed only after fresh evidence identifies a different root cause; blind pixel nudges are not allowed.
5. After targeted checks pass, stage only the related files and create a focused commit for the completed audit-and-fix unit. Audit-only work with no file changes does not need an empty commit.
6. Push, merge, and deploy only when the current task or repository rules already authorize those actions.

Stop and ask Hming when the repair would alter a liked interface, shared contract, content, accessibility behavior, test tolerance, or any area outside the authorized scope.

## Known Environment Caveat

CI runs Chromium on Linux with different font metrics than macOS/iOS. Zero-tolerance pixel checks on `white-space: nowrap` / `max-content` text can differ by a few px between local and CI. Current documented case: `/en/advantech` `.cs-alarm-tip` (see budget in `tests/smoke/regression.spec.ts`).
