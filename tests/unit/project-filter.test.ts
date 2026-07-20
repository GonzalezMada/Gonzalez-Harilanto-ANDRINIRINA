import { describe, expect, it } from 'vitest';
import { filterProjectsByCategory, projectMatchesCategory } from '../../src/lib/projectFilter';

const projects = [
  { title: 'Alpha', category: 'AI' },
  { title: 'Beta', category: 'Web' },
  { title: 'Gamma', category: 'AI' },
];

describe('projectMatchesCategory', () => {
  it('matches everything when the filter value is "all"', () => {
    expect(projectMatchesCategory('AI', 'all')).toBe(true);
    expect(projectMatchesCategory('Web', 'all')).toBe(true);
  });

  it('matches only the exact category otherwise', () => {
    expect(projectMatchesCategory('AI', 'AI')).toBe(true);
    expect(projectMatchesCategory('Web', 'AI')).toBe(false);
  });
});

describe('filterProjectsByCategory', () => {
  it('narrows to only the selected category', () => {
    expect(filterProjectsByCategory(projects, 'AI')).toEqual([
      { title: 'Alpha', category: 'AI' },
      { title: 'Gamma', category: 'AI' },
    ]);
  });

  it('returns the full list when cleared back to "all"', () => {
    expect(filterProjectsByCategory(projects, 'all')).toEqual(projects);
  });

  it('returns an empty list when no project matches the category', () => {
    expect(filterProjectsByCategory(projects, 'Mobile')).toEqual([]);
  });
});
