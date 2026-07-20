import { describe, expect, it } from 'vitest';
import {
  counterpartListPath,
  localePath,
  resolveDetailCounterpartPath,
  withBase,
  type TranslatableEntry,
} from '../../src/lib/routing';

// Derived from the active Vite/Astro `base` rather than hardcoded, so these
// tests assert the path-joining behavior of routing.ts itself and stay
// correct regardless of the `base` configured in astro.config.mjs.
const BASE = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

describe('withBase', () => {
  it('prefixes a root-relative path with the configured base', () => {
    expect(withBase('/fr/')).toBe(`${BASE}/fr/`);
  });

  it('normalizes a path without a leading slash', () => {
    expect(withBase('fr/')).toBe(`${BASE}/fr/`);
  });
});

describe('localePath', () => {
  it('builds the home path for a locale', () => {
    expect(localePath('fr', 'home')).toBe(`${BASE}/fr/`);
  });

  it('builds a section list path for a locale', () => {
    expect(localePath('en', 'projects')).toBe(`${BASE}/en/projects/`);
  });

  it('builds a detail-page path when a slug is provided', () => {
    expect(localePath('en', 'blog', 'my-article')).toBe(`${BASE}/en/blog/my-article/`);
  });
});

describe('counterpartListPath (spec FR-003, list pages)', () => {
  it('always resolves to the same section in the target locale', () => {
    expect(counterpartListPath('en', 'projects')).toBe(localePath('en', 'projects'));
    expect(counterpartListPath('fr', 'leadership')).toBe(localePath('fr', 'leadership'));
  });
});

describe('resolveDetailCounterpartPath (spec FR-003 + Edge Cases, detail pages)', () => {
  const enEntries: TranslatableEntry[] = [
    { translationKey: 'article-alpha', slug: 'my-article' },
    { translationKey: 'article-beta', slug: 'another-article' },
  ];

  it('links directly to the translated entry when a translationKey match exists', () => {
    const result = resolveDetailCounterpartPath('en', 'blog', 'article-alpha', enEntries);
    expect(result).toBe(localePath('en', 'blog', 'my-article'));
  });

  it('falls back to the section list page when no translation exists yet', () => {
    const result = resolveDetailCounterpartPath('en', 'blog', 'article-not-translated', enEntries);
    expect(result).toBe(localePath('en', 'blog'));
  });

  it('falls back to the section list page when the target locale has no entries at all', () => {
    const result = resolveDetailCounterpartPath('en', 'blog', 'article-alpha', []);
    expect(result).toBe(localePath('en', 'blog'));
  });
});
