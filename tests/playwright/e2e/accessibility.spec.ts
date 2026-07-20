import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

const PAGES = [
  'fr/',
  'en/',
  'fr/projects/',
  'en/projects/',
  'fr/blog/',
  'en/blog/',
  'fr/blog/demarrer-en-vision-par-ordinateur/',
  'en/blog/getting-started-in-computer-vision/',
  'fr/leadership/',
  'en/leadership/',
];

test.describe('Accessibility (WCAG AA, constitution Principle IV)', () => {
  for (const url of PAGES) {
    test(`${url} has no critical or serious violations`, async ({ page }) => {
      await page.goto(url);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const seriousOrWorse = results.violations.filter((violation) =>
        ['critical', 'serious'].includes(violation.impact ?? ''),
      );

      expect(seriousOrWorse, JSON.stringify(seriousOrWorse, null, 2)).toEqual([]);
    });
  }
});
