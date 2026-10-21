import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export type Locale = 'fr' | 'en';
export type Collection = 'blog' | 'projects' | 'leadership';

export interface ContentEntry {
  /** File name inside the collection folder, e.g. `article-1.md`. */
  file: string;
  /** Frontmatter fields, flattened to strings. */
  data: Record<string, string>;
}

const CONTENT_ROOT = fileURLToPath(new URL('../../../src/content', import.meta.url));

/**
 * Minimal frontmatter reader: the content files only use simple
 * `key: value` pairs, so a full YAML parser is not needed here.
 */
function parseFrontmatter(raw: string): Record<string, string> {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!match) return {};

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const entry = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line.trim());
    if (!entry) continue;
    data[entry[1]] = entry[2].trim().replace(/^["']|["']$/g, '');
  }
  return data;
}

/** Reads every entry of a localized content collection from the source files. */
export function readCollection(locale: Locale, collection: Collection): ContentEntry[] {
  const directory = join(CONTENT_ROOT, locale, collection);

  return readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => ({
      file,
      data: parseFrontmatter(readFileSync(join(directory, file), 'utf8')),
    }));
}

/** Number of published entries in a localized collection. */
export function countEntries(locale: Locale, collection: Collection): number {
  return readCollection(locale, collection).length;
}

/** Number of projects belonging to a given category. */
export function countByCategory(locale: Locale, category: string): number {
  return readCollection(locale, 'projects').filter((entry) => entry.data.category === category).length;
}
