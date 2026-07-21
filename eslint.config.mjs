import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local agent helpers and private workspaces are not part of the website runtime.
    "scripts/**",
    ".codex/**",
    ".agents/**",
    ".claude/**",
    ".design-sync/**",
    ".ds-sync/**",
    ".playwright-mcp/**",
    ".vercel/**",
    ".worktrees/**",
    "ds-bundle/**",
    "presentation/**",
    "variants/**",
    "docs/brand-film/**",
    "docs/plans/**",
    "docs/reviews/**",
    "docs/design-system/audit/**",
    "reports/**",
    "tmp/**",
    // Playwright artifacts are generated verification output.
    "playwright-report/**",
    "test-results/**",
    "blob-report/**",
  ]),
]);

export default eslintConfig;
