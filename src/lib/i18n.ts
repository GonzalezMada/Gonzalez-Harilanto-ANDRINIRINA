import fr from '../i18n/fr.json';
import en from '../i18n/en.json';
import type { Dictionary, Locale } from '../i18n/schema';

export type { Locale } from '../i18n/schema';
export { DEFAULT_LOCALE, LOCALES, isLocale } from '../i18n/schema';

/**
 * `satisfies` enforces, at compile time, that both locale files provide
 * every key declared in Dictionary (contracts/i18n-dictionary.md). A key
 * missing from either fr.json or en.json fails the build.
 */
const dictionaries = { fr, en } as const satisfies Record<Locale, Dictionary>;

type Path<T, Prefix extends string = ''> = T extends string
  ? Prefix extends ''
    ? never
    : Prefix
  : {
      [K in keyof T & string]: Path<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>;
    }[keyof T & string];

export type DictionaryKey = Path<Dictionary>;

function resolve(dictionary: Dictionary, key: string): string {
  const value = key
    .split('.')
    .reduce<unknown>((node, segment) => (node as Record<string, unknown>)?.[segment], dictionary);

  if (typeof value !== 'string') {
    throw new Error(`Missing or non-string i18n key: "${key}"`);
  }

  return value;
}

/**
 * Returns a `t(key)` translator bound to `locale`. Throws for a key that
 * doesn't resolve to a string in either locale's dictionary, so a typo or a
 * genuinely missing key fails loudly instead of rendering blank text.
 */
export function getTranslator(locale: Locale) {
  const dictionary = dictionaries[locale];
  return function t(key: DictionaryKey): string {
    return resolve(dictionary, key);
  };
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
