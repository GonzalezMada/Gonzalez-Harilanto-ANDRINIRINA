import { test, expect } from '@playwright/test';

test.describe('Home page visual regression (US1)', () => {
  test('French Home page matches baseline', async ({ page }) => {
    await page.goto('fr/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot('home-fr.png', { fullPage: true });
  });

  test('English Home page matches baseline', async ({ page }) => {
    await page.goto('en/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot('home-en.png', { fullPage: true });
  });
});
