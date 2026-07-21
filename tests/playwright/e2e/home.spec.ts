import { test, expect } from '@playwright/test';

test.describe('Home page (US1)', () => {
  test('renders the professional photo, exactly 3 facets, and a CTA', async ({ page }) => {
    await page.goto('fr/');

    await expect(page.getByRole('img', { name: /Gonzalez Harilanto ANDRINIRINA/i })).toBeVisible();

    const facetHeadings = page.getByRole('heading', { level: 3 });
    await expect(facetHeadings).toHaveCount(3);

    await expect(page.getByRole('link', { name: 'Voir les projets' })).toBeVisible();
  });

  test('each facet link navigates to its corresponding section', async ({ page }) => {
    await page.goto('fr/');

    await page.getByRole('link', { name: /Éducateur STEM/ }).click();
    await expect(page).toHaveURL(/\/fr\/leadership\/$/);

    await page.goto('fr/');
    await page.getByRole('link', { name: /Ingénieur \/ Développeur IA/ }).click();
    await expect(page).toHaveURL(/\/fr\/projects\/$/);

    await page.goto('fr/');
    await page.getByRole('link', { name: /Étudiant-chercheur en vision artificielle/ }).click();
    await expect(page).toHaveURL(/\/fr\/blog\/$/);
  });

  test('visiting the site root redirects to the French home page', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveURL(/\/fr\/$/);
  });
});
