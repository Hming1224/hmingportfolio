import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3100";
const useRemoteBaseURL = Boolean(process.env.SMOKE_BASE_URL);
// Vercel Protection Bypass for Automation: preview deployments sit behind
// Vercel Authentication; this header lets CI through without disabling
// protection. Secret lives in Vercel project settings + GitHub Actions secrets.
const vercelBypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    // Header-only bypass: intentionally no x-vercel-set-bypass-cookie — it
    // triggers a self-redirect that can stack with next-intl locale redirects
    // and stall first navigations.
    extraHTTPHeaders: vercelBypassSecret
      ? { "x-vercel-protection-bypass": vercelBypassSecret }
      : undefined,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: useRemoteBaseURL
    ? undefined
    : {
        command: "npm run start:test",
        url: baseURL,
        reuseExistingServer: false,
        timeout: 120_000,
      },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
