import { describe, expect, it } from 'vitest';
import { isEmpty, sortByDateDesc } from '../../src/lib/blogList';

describe('sortByDateDesc', () => {
  it('orders entries from newest to oldest', () => {
    const entries = [
      { title: 'Oldest', date: new Date('2023-01-01') },
      { title: 'Newest', date: new Date('2024-06-01') },
      { title: 'Middle', date: new Date('2023-12-01') },
    ];

    expect(sortByDateDesc(entries).map((entry) => entry.title)).toEqual([
      'Newest',
      'Middle',
      'Oldest',
    ]);
  });

  it('does not mutate the original array', () => {
    const entries = [{ date: new Date('2023-01-01') }, { date: new Date('2024-01-01') }];
    const original = [...entries];
    sortByDateDesc(entries);
    expect(entries).toEqual(original);
  });
});

describe('isEmpty', () => {
  it('is true for an empty list', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('is false when at least one entry is present', () => {
    expect(isEmpty([{ date: new Date() }])).toBe(false);
  });
});
