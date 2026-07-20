import { test, expect } from '@playwright/test';

test.describe('Projects page visual regression (US4)', () => {
  test('French Projects page matches baseline', async ({ page }) => {
    await page.goto('fr/projects/');
    await expect(page).toHaveScreenshot('projects-fr.png', { fullPage: true });
  });

  test('English Projects page matches baseline', async ({ page }) => {
    await page.goto('en/projects/');
    await expect(page).toHaveScreenshot('projects-en.png', { fullPage: true });
  });
});
