export interface DatedEntry {
  date: Date;
}

/** Newest first (Blog list ordering, spec FR-013). */
export function sortByDateDesc<T extends DatedEntry>(entries: readonly T[]): T[] {
  return [...entries].sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function isEmpty<T>(entries: readonly T[]): boolean {
  return entries.length === 0;
}
