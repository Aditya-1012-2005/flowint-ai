import { test, expect } from '@playwright/test';

test.describe('SEO & metadata', () => {
  test('home exposes description, canonical and structured data', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /AI automation/i,
    );

    expect(await page.locator('link[rel="canonical"]').count()).toBeGreaterThan(0);

    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(
      ' ',
    );
    expect(ld).toContain('ProfessionalService');
    expect(ld).toContain('FAQPage');
  });

  test('robots.txt and sitemap.xml are served', async ({ request }) => {
    const robots = await request.get('/robots.txt');
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toMatch(/sitemap/i);

    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain('<urlset');
  });
});
