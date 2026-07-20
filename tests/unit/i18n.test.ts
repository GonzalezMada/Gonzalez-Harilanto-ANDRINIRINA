import { describe, expect, it } from 'vitest';
import { getTranslator, getDictionary, LOCALES } from '../../src/lib/i18n';

describe('i18n t() accessor', () => {
  it('resolves an existing nested key for each locale', () => {
    for (const locale of LOCALES) {
      const t = getTranslator(locale);
      expect(t('nav.home')).toBeTypeOf('string');
      expect(t('nav.home').length).toBeGreaterThan(0);
    }
  });

  it('resolves the same key path to a (different) string in each locale', () => {
    const tFr = getTranslator('fr');
    const tEn = getTranslator('en');
    expect(tFr('nav.projects')).toBe('Projets');
    expect(tEn('nav.projects')).toBe('Projects');
  });

  it('throws for a key that does not resolve to a string', () => {
    const t = getTranslator('fr');
    // @ts-expect-error - intentionally invalid key to exercise the runtime guard
    expect(() => t('nav.doesNotExist')).toThrow(/Missing or non-string i18n key/);
    // @ts-expect-error - "home" resolves to an object, not a string
    expect(() => t('home')).toThrow(/Missing or non-string i18n key/);
  });

  it('every locale dictionary exposes the same set of keys', () => {
    const flatten = (obj: unknown, prefix = ''): string[] =>
      Object.entries(obj as Record<string, unknown>).flatMap(([key, value]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        return typeof value === 'object' && value !== null ? flatten(value, path) : [path];
      });

    const frKeys = flatten(getDictionary('fr')).sort();
    const enKeys = flatten(getDictionary('en')).sort();
    expect(frKeys).toEqual(enKeys);
  });
});
