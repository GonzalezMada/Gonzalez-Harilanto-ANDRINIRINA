export type Locale = 'fr' | 'en';

export const LOCALES: readonly Locale[] = ['fr', 'en'];

export const DEFAULT_LOCALE: Locale = 'fr';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Shape every locale dictionary MUST satisfy (contracts/i18n-dictionary.md).
 * A key present in one locale JSON file and missing in the other is a
 * compile-time error via the `satisfies` check in src/lib/i18n.ts.
 */
export interface Dictionary {
  site: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    projects: string;
    blog: string;
    leadership: string;
    downloadCv: string;
    skipToContent: string;
    toggleTheme: string;
  };
  languageSwitcher: {
    label: string;
    fr: string;
    en: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    heroValueProp: string;
    heroCta: string;
    heroCtaSecondary: string;
    heroImages: {
      educatorLabel: string;
      educatorAlt: string;
      profileLabel: string;
      profileAlt: string;
      leadershipLabel: string;
      leadershipAlt: string;
    };
    featuredHeading: string;
    featuredViewAll: string;
    aboutHeading: string;
    aboutBody: string;
    facetsHeading: string;
    facets: {
      stemEducator: { label: string; summary: string };
      aiEngineer: { label: string; summary: string };
      cvResearcher: { label: string; summary: string };
    };
    timelineHeading: string;
    timeline: {
      milestone1: { year: string; label: string };
      milestone2: { year: string; label: string };
      milestone3: { year: string; label: string };
    };
  };
  projects: {
    heading: string;
    intro: string;
    filterAllLabel: string;
    filterGroupLabel: string;
    emptyState: string;
    technologiesLabel: string;
    viewProjectLabel: string;
  };
  blog: {
    heading: string;
    intro: string;
    emptyState: string;
    readMoreLabel: string;
    backToListLabel: string;
  };
  leadership: {
    heading: string;
    intro: string;
  };
  footer: {
    contactHeading: string;
    contactPrompt: string;
    emailLabel: string;
    backToTop: string;
  };
  cv: {
    downloadLabel: string;
    unavailable: string;
  };
  common: {
    externalLinkNewTab: string;
  };
}
