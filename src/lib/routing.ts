import type { Locale } from '../i18n/schema';

export type SectionRoute = 'home' | 'projects' | 'blog' | 'leadership';

const SECTION_SEGMENT: Record<SectionRoute, string> = {
  home: '',
  projects: 'projects',
  blog: 'blog',
  leadership: 'leadership',
};

/**
 * Prefixes a root-relative path with the site's configured base
 * (astro.config.mjs `base`), so links work under the GitHub Pages project
 * path. Astro does not rewrite plain `href`/`src` attributes automatically.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/';
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

/**
 * Builds the site-relative (base-aware) path for a section in a given
 * locale, optionally for a specific detail-page slug.
 */
export function localePath(locale: Locale, section: SectionRoute = 'home', slug?: string): string {
  const segment = SECTION_SEGMENT[section];
  const parts = [locale, segment, slug].filter((part): part is string => Boolean(part));
  return withBase(`/${parts.join('/')}/`);
}

/**
 * List-page counterpart resolution (spec FR-003): the language selector on
 * a list page (Home, Projects, Blog, Leadership) always swaps to the same
 * section in the target locale — list pages exist in both locales by
 * construction, so this never needs a fallback.
 */
export function counterpartListPath(targetLocale: Locale, section: SectionRoute): string {
  return localePath(targetLocale, section);
}

export interface TranslatableEntry {
  translationKey: string;
  /** The slug segment for this entry's own detail page (e.g. content id minus `{lang}/`). */
  slug: string;
}

/**
 * Detail-page counterpart resolution (spec FR-003 + Edge Cases): looks up
 * the entry in `targetLocaleEntries` sharing `currentTranslationKey`. If
 * found, links straight to that entry's own page; if no translation exists
 * yet, falls back to the section's list page in the target locale
 * (contracts/routing.md) instead of a broken or empty page.
 */
export function resolveDetailCounterpartPath(
  targetLocale: Locale,
  section: SectionRoute,
  currentTranslationKey: string,
  targetLocaleEntries: readonly TranslatableEntry[],
): string {
  const match = targetLocaleEntries.find(
    (entry) => entry.translationKey === currentTranslationKey,
  );

  if (match) {
    return localePath(targetLocale, section, match.slug);
  }

  return localePath(targetLocale, section);
}
