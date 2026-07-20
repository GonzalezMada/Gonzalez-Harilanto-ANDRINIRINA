import { test, expect } from '@playwright/test';

test.describe('Leadership page (US5)', () => {
  test('shows all four named entries with non-empty impact text', async ({ page }) => {
    await page.goto('fr/leadership/');

    const expectedOrganizations = [
      'YALI RLC SA',
      'Fablab EnR-out',
      'Technovation Girls',
      'STEM for Good',
    ];

    for (const organization of expectedOrganizations) {
      const card = page.locator('article', { hasText: organization });
      await expect(card).toBeVisible();
      const impactText = await card.locator('p').last().innerText();
      expect(impactText.length).toBeGreaterThan(40);
    }

    await expect(page.locator('article')).toHaveCount(4);
  });

  test('the language switch keeps the visitor on the Leadership list', async ({ page }) => {
    await page.goto('fr/leadership/');
    await page.getByRole('link', { name: 'EN', exact: true }).click();
    await expect(page).toHaveURL(/\/en\/leadership\/$/);
    await expect(page.locator('article')).toHaveCount(4);
  });
});
