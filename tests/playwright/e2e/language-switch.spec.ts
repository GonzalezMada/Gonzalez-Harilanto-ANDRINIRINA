import { test, expect } from '@playwright/test';

test.describe('Language switch (US2)', () => {
  test('switching to English from the French Home page stays on Home', async ({ page }) => {
    await page.goto('fr/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

    await page.getByRole('link', { name: 'EN', exact: true }).click();

    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Gonzalez Harilanto ANDRINIRINA',
    );
  });

  test('switching to French from the English Home page stays on Home', async ({ page }) => {
    await page.goto('en/');

    await page.getByRole('link', { name: 'FR', exact: true }).click();

    await expect(page).toHaveURL(/\/fr\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  });

  test('the language selector marks the active locale', async ({ page }) => {
    await page.goto('fr/');

    await expect(page.getByRole('link', { name: 'FR', exact: true })).toHaveAttribute(
      'aria-current',
      'true',
    );
    await expect(page.getByRole('link', { name: 'EN', exact: true })).not.toHaveAttribute(
      'aria-current',
      'true',
    );
  });
});
