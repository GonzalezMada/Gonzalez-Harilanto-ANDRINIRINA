import { test, expect } from '@playwright/test';
import { countByCategory, countEntries } from '../helpers/content';

test.describe('Projects page (US4)', () => {
  test('renders each project as a card with title, technologies, and an external link', async ({
    page,
  }) => {
    await page.goto('fr/projects/');

    const cards = page.locator('article');
    // Every published project is listed: the collection is meant to grow
    // without touching the tests (FR-012).
    await expect(cards).toHaveCount(countEntries('fr', 'projects'));

    const first = cards.first();
    await expect(first.getByRole('heading', { level: 3 })).toBeVisible();
    await expect(first.getByRole('link', { name: /Voir le projet/ })).toHaveAttribute(
      'target',
      '_blank',
    );
  });

  test('filtering by category narrows results, and clearing restores the full list', async ({
    page,
  }) => {
    await page.goto('fr/projects/');

    const total = countEntries('fr', 'projects');
    await expect(page.locator('article')).toHaveCount(total);

    await page.getByRole('button', { name: 'Ingénierie IA' }).click();
    await expect(page.locator('article:visible')).toHaveCount(
      countByCategory('fr', 'Ingénierie IA'),
    );
    // Only the cards of the selected category stay visible.
    await expect(page.locator('[data-category="Ingénierie IA"]:visible')).toHaveCount(
      countByCategory('fr', 'Ingénierie IA'),
    );

    await page.getByRole('button', { name: 'Vision par ordinateur' }).click();
    await expect(page.locator('article:visible')).toHaveCount(
      countByCategory('fr', 'Vision par ordinateur'),
    );

    await page.getByRole('button', { name: 'Tous', exact: true }).click();
    await expect(page.locator('article:visible')).toHaveCount(total);
  });

  test('the language switch keeps the visitor on the Projects list', async ({ page }) => {
    await page.goto('fr/projects/');
    await page.getByRole('link', { name: 'EN', exact: true }).click();
    await expect(page).toHaveURL(/\/en\/projects\/$/);
  });
});
