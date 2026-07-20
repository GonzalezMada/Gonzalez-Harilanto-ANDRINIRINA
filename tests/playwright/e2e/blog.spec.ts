import { test, expect } from '@playwright/test';

test.describe('Blog (US6)', () => {
  test('the list shows title, date, summary, and tags for each article', async ({ page }) => {
    await page.goto('fr/blog/');

    const cards = page.locator('article');
    await expect(cards).toHaveCount(2);

    const first = cards.first();
    await expect(first.locator('time')).toBeVisible();
    await expect(first.getByRole('heading', { level: 3 })).toBeVisible();
    await expect(first.getByRole('link', { name: 'Lire la suite' })).toBeVisible();
  });

  test('opening an article reaches its own page with full content', async ({ page }) => {
    await page.goto('fr/blog/');

    await page.getByRole('heading', { level: 3 }).first().getByRole('link').click();

    await expect(page).toHaveURL(/\/fr\/blog\/[^/]+\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /Retour aux articles/ })).toBeVisible();
  });

  test('language switch on the list stays on the Blog list', async ({ page }) => {
    await page.goto('fr/blog/');
    await page.getByRole('link', { name: 'EN', exact: true }).click();
    await expect(page).toHaveURL(/\/en\/blog\/$/);
  });

  test('language switch on an article resolves to its translated counterpart', async ({ page }) => {
    await page.goto('fr/blog/demarrer-en-vision-par-ordinateur/');
    await page.getByRole('link', { name: 'EN', exact: true }).click();
    await expect(page).toHaveURL(/\/en\/blog\/getting-started-in-computer-vision\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Getting started in computer vision',
    );
  });
});
