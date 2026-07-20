import { test, expect } from '@playwright/test';

test.describe('CV download (US3)', () => {
  test('offers the French CV PDF when the site is in French', async ({ page }) => {
    await page.goto('fr/');
    const link = page.getByRole('link', { name: 'Télécharger le CV' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /\/cv\/cv-fr\.pdf$/);
    await expect(link).toHaveAttribute('download', '');
  });

  test('offers the English CV PDF when the site is in English', async ({ page }) => {
    await page.goto('en/');
    const link = page.getByRole('link', { name: 'Download CV' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /\/cv\/cv-en\.pdf$/);
    await expect(link).toHaveAttribute('download', '');
  });

  test('the CV download control is reachable from the persistent navigation', async ({ page }) => {
    await page.goto('fr/');
    // Header (persistent nav) exposes the CV control without leaving the page.
    await expect(page.locator('header').getByRole('link', { name: 'Télécharger le CV' })).toBeVisible();
  });
});
