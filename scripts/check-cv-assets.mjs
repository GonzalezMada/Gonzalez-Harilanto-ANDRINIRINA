#!/usr/bin/env node
// Fails the build if either locale's CV PDF is missing, so a recruiter never
// hits a 404 CV download in production (spec Edge Cases; data-model.md CV
// Document validation rule).
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const REQUIRED_CV_FILES = ['public/cv/cv-fr.pdf', 'public/cv/cv-en.pdf'];

const missing = REQUIRED_CV_FILES.filter((relativePath) => {
  const fullPath = path.join(rootDir, relativePath);
  return !existsSync(fullPath) || statSync(fullPath).size === 0;
});

if (missing.length > 0) {
  console.error('CV asset check failed. Missing or empty file(s):');
  for (const file of missing) {
    console.error(`  - ${file}`);
  }
  console.error('\nBoth the French and English CV PDFs must exist under public/cv/ before building.');
  process.exit(1);
}

console.log('CV asset check passed: both public/cv/cv-fr.pdf and public/cv/cv-en.pdf are present.');
