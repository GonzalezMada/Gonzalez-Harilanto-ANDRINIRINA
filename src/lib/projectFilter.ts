/** `'all'` matches every project; otherwise an exact category match is required. */
export function projectMatchesCategory(category: string, filterValue: string): boolean {
  return filterValue === 'all' || category === filterValue;
}

export function filterProjectsByCategory<T extends { category: string }>(
  projects: readonly T[],
  filterValue: string,
): T[] {
  return projects.filter((project) => projectMatchesCategory(project.category, filterValue));
}
