import { test, expect } from '@playwright/test';

test.describe('Mobile experience', () => {
  test.skip(({ isMobile }) => !isMobile, 'Runs on the mobile viewport only');

  test('hamburger menu opens and closes', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();

    const mobileNav = page.getByRole('navigation', { name: 'Mobile' });
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.getByRole('link', { name: 'Solutions' })).toBeVisible();

    await page.getByRole('button', { name: 'Close menu' }).click();
    await expect(mobileNav).toBeHidden();
  });

  test('Flo appears as a tappable mascot', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /Flo the guide/i })).toBeVisible();
  });
});
