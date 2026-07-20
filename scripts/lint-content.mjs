#!/usr/bin/env node
// Cross-entry content parity checks that a per-entry Zod schema cannot
// express (data-model.md "Cross-entity integrity rules"; contracts/
// content-collections.md; contracts/i18n-dictionary.md).
//
// 1. translationKey FR<->EN coverage for projects/blog/leadership.
// 2. category-value consistency between locales for projects.
// 3. i18n dictionary key parity is already enforced at compile time via the
//    `satisfies` check in src/lib/i18n.ts (see tests/unit/i18n.test.ts) —
//    re-verified here as a fast, build-independent guard.
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CONTENT_DIR = path.join(rootDir, 'src', 'content');
const COLLECTIONS = ['projects', 'blog', 'leadership'];
const LOCALES = ['fr', 'en'];

let hasErrors = false;

function fail(message) {
  console.error(`✗ ${message}`);
  hasErrors = true;
}

function readFrontmatter(filePath) {
  const raw = readFileSync(filePath, 'utf-8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return {};
  }
  return parseYaml(match[1]) ?? {};
}

function collectEntries(collection, locale) {
  const dir = path.join(CONTENT_DIR, locale, collection);
  let files;
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }
  return files.map((file) => ({
    file: path.relative(rootDir, path.join(dir, file)),
    data: readFrontmatter(path.join(dir, file)),
  }));
}

// 1. translationKey FR<->EN coverage
for (const collection of COLLECTIONS) {
  const entriesByLocale = Object.fromEntries(
    LOCALES.map((locale) => [locale, collectEntries(collection, locale)]),
  );

  const keysByLocale = Object.fromEntries(
    LOCALES.map((locale) => [
      locale,
      new Set(entriesByLocale[locale].map((entry) => entry.data.translationKey)),
    ]),
  );

  for (const locale of LOCALES) {
    const otherLocale = LOCALES.find((l) => l !== locale);
    for (const key of keysByLocale[locale]) {
      if (!keysByLocale[otherLocale].has(key)) {
        fail(
          `${collection}: translationKey "${key}" exists in "${locale}" but has no "${otherLocale}" counterpart (bilingual parity, spec FR-018).`,
        );
      }
    }
  }

  // 2. category-value consistency (projects only)
  if (collection === 'projects') {
    const categoriesByLocale = Object.fromEntries(
      LOCALES.map((locale) => [
        locale,
        new Set(entriesByLocale[locale].map((entry) => entry.data.category)),
      ]),
    );
    for (const locale of LOCALES) {
      const otherLocale = LOCALES.find((l) => l !== locale);
      const diff = categoriesByLocale[locale].size - categoriesByLocale[otherLocale].size;
      if (Math.abs(diff) > 0 && categoriesByLocale[locale].size > 0) {
        console.warn(
          `⚠ projects: category count differs between "${locale}" (${categoriesByLocale[locale].size}) and "${otherLocale}" (${categoriesByLocale[otherLocale].size}) — verify each category has a translated equivalent.`,
        );
      }
    }
  }
}

// 3. i18n dictionary key parity (fast re-check; source of truth is the
// `satisfies` compile-time check in src/lib/i18n.ts)
const frDict = JSON.parse(readFileSync(path.join(rootDir, 'src/i18n/fr.json'), 'utf-8'));
const enDict = JSON.parse(readFileSync(path.join(rootDir, 'src/i18n/en.json'), 'utf-8'));

function flattenKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([key, value]) => {
    const keyPath = prefix ? `${prefix}.${key}` : key;
    return typeof value === 'object' && value !== null
      ? flattenKeys(value, keyPath)
      : [keyPath];
  });
}

const frKeys = new Set(flattenKeys(frDict));
const enKeys = new Set(flattenKeys(enDict));

for (const key of frKeys) {
  if (!enKeys.has(key)) fail(`i18n: key "${key}" exists in fr.json but not en.json.`);
}
for (const key of enKeys) {
  if (!frKeys.has(key)) fail(`i18n: key "${key}" exists in en.json but not fr.json.`);
}

if (hasErrors) {
  console.error('\nContent lint failed.');
  process.exit(1);
}

console.log('Content lint passed: translationKey parity and i18n dictionary parity verified.');
