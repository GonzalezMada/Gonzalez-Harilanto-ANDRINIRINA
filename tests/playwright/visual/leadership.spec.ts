import { test, expect } from '@playwright/test';

test.describe('Leadership page visual regression (US5)', () => {
  test('French Leadership page matches baseline', async ({ page }) => {
    await page.goto('fr/leadership/');
    await expect(page).toHaveScreenshot('leadership-fr.png', { fullPage: true });
  });

  test('English Leadership page matches baseline', async ({ page }) => {
    await page.goto('en/leadership/');
    await expect(page).toHaveScreenshot('leadership-en.png', { fullPage: true });
  });
});
