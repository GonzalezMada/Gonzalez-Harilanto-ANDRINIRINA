import AxeBuilder from '@axe-core/playwright';
import { test, expect, type Page } from '@playwright/test';

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

/**
 * The pages reveal their content with an opacity transition (`.load-in`).
 * axe-core blends the text colour with the background using the effective
 * opacity of the element, so auditing the page while the transition is still
 * running reports a lighter colour than the final one (e.g. `#a46710` instead
 * of `#a16207` on `#f8fafc`) and produces a false colour-contrast violation.
 * Waiting for the entrance animations to settle makes the audit deterministic.
 */
async function waitForEntranceAnimations(page: Page): Promise<void> {
  await page.waitForFunction(() =>
    Array.from(document.querySelectorAll<HTMLElement>('.load-in')).every(
      (element) => getComputedStyle(element).opacity === '1',
    ),
  );
}

test.describe('Accessibility (WCAG AA, constitution Principle IV)', () => {
  for (const url of PAGES) {
    test(`${url} has no critical or serious violations`, async ({ page }) => {
      // Reduced motion removes the entrance transitions altogether, so the audit
      // always runs on the final, fully opaque rendering.
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(url);
      await waitForEntranceAnimations(page);

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
