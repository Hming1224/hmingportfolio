import { readFileSync } from "node:fs";
import { relative, resolve } from "node:path";

const root = process.cwd();
const cssPath = resolve(root, "styles/tokens.css");
const dataPath = resolve(root, "lib/design-system-data.ts");
const docsPath = resolve(root, "lib/design-system-docs.ts");

const tokenPrefixes = ["--hm-", "--text-", "--fs-", "--shadow-", "--cs-"];
const ignoredDocTokens = new Set(["--tag-bg", "--tag-text"]);

function read(path) {
  return readFileSync(path, "utf8");
}

function normalize(value) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function parseCssTokens(css) {
  const tokens = new Map();
  const tokenPattern = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match;

  while ((match = tokenPattern.exec(css))) {
    if (!tokens.has(match[1])) {
      tokens.set(match[1], normalize(match[2]));
    }
  }

  return tokens;
}

function extractReferencedTokens(source) {
  const tokenPattern = /--[a-z0-9-]+/gi;
  const tokens = new Set();
  let match;

  while ((match = tokenPattern.exec(source))) {
    const token = match[0];
    if (token.endsWith("-")) continue;
    if (tokenPrefixes.some((prefix) => token.startsWith(prefix))) {
      tokens.add(token);
    }
  }

  return [...tokens].sort();
}

function extractTokenRows(source) {
  const rows = [];
  const rowPattern = /\{\s*token:\s*"([^"]+)"\s*,\s*value:\s*"([^"]+)"/g;
  let match;

  while ((match = rowPattern.exec(source))) {
    rows.push({ token: match[1], value: match[2] });
  }

  return rows;
}

const cssTokens = parseCssTokens(read(cssPath));
const dataSource = read(dataPath);
const docsSource = read(docsPath);

const references = [
  { path: dataPath, tokens: extractReferencedTokens(dataSource) },
  { path: docsPath, tokens: extractReferencedTokens(docsSource) },
];

const missing = [];
for (const group of references) {
  for (const token of group.tokens) {
    if (ignoredDocTokens.has(token)) continue;
    if (!cssTokens.has(token)) {
      missing.push({ path: group.path, token });
    }
  }
}

const mismatched = [];
for (const row of extractTokenRows(dataSource)) {
  if (!cssTokens.has(row.token)) continue;
  if (row.value.includes("/") || row.value === "theme mapped") continue;
  const cssValue = cssTokens.get(row.token);
  if (normalize(row.value) !== cssValue) {
    mismatched.push({ token: row.token, expected: row.value, actual: cssValue });
  }
}

if (!missing.length && !mismatched.length) {
  console.log("Design token check passed.");
  process.exit(0);
}

if (missing.length) {
  console.error("Missing token references:");
  for (const item of missing) {
    console.error(`- ${relative(root, item.path)}: ${item.token}`);
  }
}

if (mismatched.length) {
  console.error("Token value mismatches:");
  for (const item of mismatched) {
    console.error(`- ${item.token}: data=${item.expected} css=${item.actual}`);
  }
}

process.exit(1);
