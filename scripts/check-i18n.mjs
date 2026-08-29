#!/usr/bin/env node
/* i18n 對照健檢。
   中文原文字串同時是 i18n key，改中文卻忘了改 key，英文頁就會靜默掉回中文。
   這支腳本把三種漏洞抓出來：
     1. 全站 dictionary（zh-TW / en）key 結構不一致，或 en 還留著中文
     2. route dict 缺 key：source 有 t("中文") 但英文對照不存在  → /en 直接顯示中文
     3. route dict 死 key：英文對照還在，但中文原文已經從 source 消失（僅警告）
   用法：node scripts/check-i18n.mjs [--strict]   （--strict 讓死 key 也算失敗） */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const STRICT = process.argv.includes("--strict");
const CJK = /[一-鿿]/;

const errors = [];
const warnings = [];

/* ── 共用：把 TS 檔裡的物件字面值取出來求值（這些檔案只有純字串物件，沒有 runtime import） ── */
function evalObjectLiteral(source, startMarker, file) {
  const start = source.indexOf(startMarker);
  if (start === -1) throw new Error(`${file}：找不到 ${startMarker}`);
  const open = source.indexOf("{", start);
  let depth = 0;
  let inString = null;
  let end = -1;
  for (let i = open; i < source.length; i += 1) {
    const ch = source[i];
    if (inString) {
      if (ch === "\\") i += 1;
      else if (ch === inString) inString = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") inString = ch;
    else if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end === -1) throw new Error(`${file}：物件字面值沒有正常收尾`);
  const literal = source.slice(open, end + 1);
  return Function(`"use strict"; return (${literal});`)();
}

function flatten(obj, prefix = "", out = new Map()) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) flatten(value, path, out);
    else out.set(path, value);
  }
  return out;
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.tsx?$/.test(entry)) files.push(full);
  }
  return files;
}

/* ── 1. 全站 dictionary ── */
function checkGlobalDictionaries() {
  const zhPath = "i18n/dictionaries/zh-TW.ts";
  const enPath = "i18n/dictionaries/en.ts";
  const zh = flatten(evalObjectLiteral(readFileSync(join(ROOT, zhPath), "utf8"), "const messages", zhPath));
  const en = flatten(evalObjectLiteral(readFileSync(join(ROOT, enPath), "utf8"), "const messages", enPath));

  for (const key of zh.keys()) if (!en.has(key)) errors.push(`${enPath} 缺少 key：${key}`);
  for (const key of en.keys()) if (!zh.has(key)) errors.push(`${zhPath} 缺少 key：${key}`);
  for (const [key, value] of en) {
    if (typeof value === "string" && CJK.test(value)) errors.push(`${enPath} 的 ${key} 還是中文：「${value.slice(0, 30)}」`);
  }
  console.log(`  全站 dictionary：${zh.size} 筆 zh-TW / ${en.size} 筆 en`);
}

/* ── 2 & 3. 各 case study route dict ── */
function checkRouteDictionaries() {
  const appDir = join(ROOT, "app");
  const routes = readdirSync(appDir).filter((name) => {
    try { return statSync(join(appDir, name, "i18n.ts")).isFile(); } catch { return false; }
  });

  // source 全文只讀一次：字串可能寫在 section、data 或共用元件裡，不限於 route 資料夾
  const sourceFiles = ["app", "components", "data", "lib"]
    .flatMap((dir) => { try { return walk(join(ROOT, dir)); } catch { return []; } })
    .filter((file) => !file.endsWith("i18n.ts"));
  // 正規化空白：JSX 裡的長句常被換行縮排切開，直接比對會誤判成死 key
  const haystack = sourceFiles.map((file) => readFileSync(file, "utf8")).join("\n").replace(/\s+/g, " ");

  for (const route of routes) {
    const dictPath = `app/${route}/i18n.ts`;
    const dict = evalObjectLiteral(readFileSync(join(ROOT, dictPath), "utf8"), "const en", dictPath);
    const keys = Object.keys(dict);

    // 缺 key：t("中文") 找不到對照
    const routeFiles = sourceFiles.filter((file) => relative(ROOT, file).startsWith(`app/${route}/`));
    const missing = new Set();
    for (const file of routeFiles) {
      const text = readFileSync(file, "utf8");
      for (const match of text.matchAll(/\bt\(\s*"((?:[^"\\]|\\.)*)"\s*\)/g)) {
        const key = JSON.parse(`"${match[1]}"`);
        if (CJK.test(key) && !(key in dict)) missing.add(key);
      }
    }
    for (const key of missing) errors.push(`${dictPath} 缺少英文對照：「${key.slice(0, 40)}」→ /en 會顯示中文`);

    // 死 key：中文原文已從 source 消失
    const orphans = keys.filter((key) => CJK.test(key) && !haystack.includes(key.replace(/\s+/g, " ")));
    for (const key of orphans) {
      (STRICT ? errors : warnings).push(`${dictPath} 死 key（原文已不存在）：「${key.slice(0, 40)}」`);
    }

    console.log(`  ${route}：${keys.length} 筆對照，缺 ${missing.size}，死 key ${orphans.length}`);
  }
}

console.log("i18n 對照健檢");
checkGlobalDictionaries();
checkRouteDictionaries();

if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} 筆死 key（不影響畫面，建議清掉；加 --strict 可視為失敗）`);
  for (const line of warnings.slice(0, 10)) console.log(`   ${line}`);
  if (warnings.length > 10) console.log(`   …另外 ${warnings.length - 10} 筆`);
}

if (errors.length) {
  console.error(`\n❌ ${errors.length} 筆必須修正：`);
  for (const line of errors) console.error(`   ${line}`);
  process.exit(1);
}

console.log("\n✅ i18n 對照通過");
