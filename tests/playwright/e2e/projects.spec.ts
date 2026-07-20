import { test, expect } from '@playwright/test';

test.describe('Projects page (US4)', () => {
  test('renders each project as a card with title, technologies, and an external link', async ({
    page,
  }) => {
    await page.goto('fr/projects/');

    const cards = page.locator('article');
    await expect(cards).toHaveCount(3);

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

    await expect(page.locator('article')).toHaveCount(3);

    await page.getByRole('button', { name: 'Ingénierie IA' }).click();
    await expect(page.locator('article:visible')).toHaveCount(2);

    await page.getByRole('button', { name: 'Vision par ordinateur' }).click();
    await expect(page.locator('article:visible')).toHaveCount(1);

    await page.getByRole('button', { name: 'Tous', exact: true }).click();
    await expect(page.locator('article:visible')).toHaveCount(3);
  });

  test('the language switch keeps the visitor on the Projects list', async ({ page }) => {
    await page.goto('fr/projects/');
    await page.getByRole('link', { name: 'EN', exact: true }).click();
    await expect(page).toHaveURL(/\/en\/projects\/$/);
  });
});
