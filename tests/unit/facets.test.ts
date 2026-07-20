import { describe, expect, it } from 'vitest';
import { FACETS } from '../../src/data/facets';
import { getTranslator } from '../../src/lib/i18n';

describe('Profile Facets data', () => {
  it('defines exactly three facets (spec FR-005)', () => {
    expect(FACETS).toHaveLength(3);
  });

  it('each facet has a unique id, a link section, and resolvable label/summary keys', () => {
    const ids = FACETS.map((facet) => facet.id);
    expect(new Set(ids).size).toBe(3);

    const t = getTranslator('en');
    for (const facet of FACETS) {
      expect(['home', 'projects', 'blog', 'leadership']).toContain(facet.linkSection);
      expect(t(facet.labelKey).length).toBeGreaterThan(0);
      expect(t(facet.summaryKey).length).toBeGreaterThan(0);
    }
  });

  it('maps each facet to a distinct, non-home section (spec FR-006)', () => {
    const sections = FACETS.map((facet) => facet.linkSection);
    expect(new Set(sections).size).toBe(3);
    expect(sections).not.toContain('home');
  });
});
