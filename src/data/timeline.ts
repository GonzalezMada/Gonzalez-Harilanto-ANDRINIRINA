import type { DictionaryKey } from '../lib/i18n';

export interface TimelineMilestone {
  id: 'milestone1' | 'milestone2' | 'milestone3';
  yearKey: DictionaryKey;
  labelKey: DictionaryKey;
}

/** Fixed education/career milestones shown on Home (see home.timeline in the i18n dictionary). */
export const TIMELINE: readonly TimelineMilestone[] = [
  { id: 'milestone1', yearKey: 'home.timeline.milestone1.year', labelKey: 'home.timeline.milestone1.label' },
  { id: 'milestone2', yearKey: 'home.timeline.milestone2.year', labelKey: 'home.timeline.milestone2.label' },
  { id: 'milestone3', yearKey: 'home.timeline.milestone3.year', labelKey: 'home.timeline.milestone3.label' },
] as const;
