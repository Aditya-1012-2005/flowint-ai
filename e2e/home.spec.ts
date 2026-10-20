import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads with hero, a single h1, and the primary CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Flowint/i);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByRole('button', { name: /book a free demo/i })).toBeVisible();
  });

  test('renders every key section heading', async ({ page }) => {
    await page.goto('/');
    const headings = [
      /Manual work costs your business/i,
      /Business process automation/i,
      /keep India running/i,
      /Simple to start/i,
      /AI automation, answered/i,
      /Ready to automate the paperwork/i,
    ];
    for (const name of headings) {
      await expect(page.getByRole('heading', { name })).toBeVisible();
    }
  });

  test('Flo the guide greets visitors on load', async ({ page }) => {
    // Flo is disabled for reduced-motion users by design; model a typical visitor.
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    // On desktop Flo follows the cursor and waits off-screen until it moves.
    await page.mouse.move(640, 360);
    await expect(page.getByText(/me Flo/i)).toBeVisible();
  });

  test('FAQ answers expand when a question is opened', async ({ page }) => {
    await page.goto('/');
    const first = page.locator('details').first();
    await expect(first).toHaveJSProperty('open', false);
    await first.locator('summary').click();
    await expect(first).toHaveJSProperty('open', true);
  });
});
