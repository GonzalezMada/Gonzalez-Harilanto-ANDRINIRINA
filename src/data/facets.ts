import type { SectionRoute } from '../lib/routing';
import type { DictionaryKey } from '../lib/i18n';

export interface ProfileFacet {
  id: 'stem-educator' | 'ai-engineer' | 'cv-researcher';
  labelKey: DictionaryKey;
  summaryKey: DictionaryKey;
  /** Section this facet links to (spec FR-006). */
  linkSection: SectionRoute;
}

/**
 * Fixed 3-entry set (spec FR-005). Not a Content Collection — adding a 4th
 * facet is a deliberate structural change (data-model.md), unlike
 * Projects/Blog/Leadership which must stay code-free to extend.
 */
export const FACETS: readonly ProfileFacet[] = [
  {
    id: 'stem-educator',
    labelKey: 'home.facets.stemEducator.label',
    summaryKey: 'home.facets.stemEducator.summary',
    linkSection: 'leadership',
  },
  {
    id: 'ai-engineer',
    labelKey: 'home.facets.aiEngineer.label',
    summaryKey: 'home.facets.aiEngineer.summary',
    linkSection: 'projects',
  },
  {
    id: 'cv-researcher',
    labelKey: 'home.facets.cvResearcher.label',
    summaryKey: 'home.facets.cvResearcher.summary',
    linkSection: 'blog',
  },
] as const;
