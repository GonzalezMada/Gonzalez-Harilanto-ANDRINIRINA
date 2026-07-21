import { test, expect } from '@playwright/test';

test.describe('Blog visual regression (US6)', () => {
  test('French Blog list matches baseline', async ({ page }) => {
    await page.goto('fr/blog/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot('blog-list-fr.png', { fullPage: true });
  });

  test('English Blog list matches baseline', async ({ page }) => {
    await page.goto('en/blog/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot('blog-list-en.png', { fullPage: true });
  });

  test('French Blog article matches baseline', async ({ page }) => {
    await page.goto('fr/blog/demarrer-en-vision-par-ordinateur/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot('blog-article-fr.png', { fullPage: true });
  });

  test('English Blog article matches baseline', async ({ page }) => {
    await page.goto('en/blog/getting-started-in-computer-vision/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot('blog-article-en.png', { fullPage: true });
  });
});
