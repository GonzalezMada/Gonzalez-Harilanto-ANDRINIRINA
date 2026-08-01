import type { Locale } from '../i18n/schema';

/**
 * Site-wide author + social identity, consumed by the document head
 * (Open Graph, JSON-LD Person) and the footer. Kept out of the i18n
 * dictionary because these are stable, locale-independent identifiers.
 *
 * TODO(owner): fill in the real `linkedin` and `email` values. Empty strings
 * are intentional — the footer and JSON-LD omit any link left blank rather
 * than shipping a fabricated or broken URL.
 */
export const SITE = {
  author: 'Gonzalez Harilanto ANDRINIRINA',
  /** Short job title used in the JSON-LD Person schema. */
  jobTitle: {
    fr: 'Ingénieur IA et étudiant-chercheur en vision par ordinateur',
    en: 'AI engineer and computer vision research student',
  } satisfies Record<Locale, string>,
  github: 'https://github.com/GonzalezMada',
  linkedin: '', // TODO(owner): e.g. https://www.linkedin.com/in/…
  email: '', // TODO(owner): e.g. contact@example.com
  /** Relative to the site root; made absolute + base-aware where referenced. */
  ogImage: '/images/profile.jpg',
} as const;

/** Non-empty external profiles, in display order, for the footer. */
export function socialLinks(): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [];
  if (SITE.github) links.push({ label: 'GitHub', href: SITE.github });
  if (SITE.linkedin) links.push({ label: 'LinkedIn', href: SITE.linkedin });
  return links;
}
