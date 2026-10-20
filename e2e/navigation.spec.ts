import { test, expect } from '@playwright/test';

const routes = [
  { label: 'Solutions', path: '/solutions' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Home', path: '/' },
];

test.describe('Desktop navigation', () => {
  test.skip(({ isMobile }) => !!isMobile, 'Top nav is hidden on mobile');

  test('routes to each page and marks the current link', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main' });

    for (const route of routes) {
      await nav.getByRole('link', { name: route.label, exact: true }).click();
      // Wait for the client-side navigation to commit before the next click.
      await page.waitForURL(new RegExp(`${route.path.replace('/', '\\/')}$`));
      await expect(
        nav.getByRole('link', { name: route.label, exact: true }),
      ).toHaveAttribute('aria-current', 'page');
    }
  });
});
