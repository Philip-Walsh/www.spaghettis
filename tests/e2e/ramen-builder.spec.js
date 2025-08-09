// Playwright E2E test
import { test, expect } from '@playwright/test';
import { RamenBuilderPage } from './pages/ramen-builder.page.js';

test.describe('Ramen Builder', () => {
  let ramenBuilderPage;

  test.beforeEach(async ({ page }) => {
    ramenBuilderPage = new RamenBuilderPage(page);
    await ramenBuilderPage.goto();
  });

  test('should build a complete ramen bowl', async () => {
    await ramenBuilderPage.selectNoodleBase('Forbidden Ramen');
    await ramenBuilderPage.selectProtein('Tofu');
    await ramenBuilderPage.selectBroth('Miso');

    const cartItems = await ramenBuilderPage.getCartItems();
    expect(cartItems).toContain('Forbidden Ramen');
    expect(cartItems).toContain('Tofu');
    expect(cartItems).toContain('Miso');

    const totalPrice = await ramenBuilderPage.getTotalPrice();
    expect(totalPrice).not.toBe('$0.00');
  });

  test('should allow multiple protein selections', async () => {
    await ramenBuilderPage.selectNoodleBase('Forbidden Ramen');
    await ramenBuilderPage.selectProtein('Chicken');
    await ramenBuilderPage.selectProtein('Tofu');

    const cartItems = await ramenBuilderPage.getCartItems();
    expect(cartItems.filter(item => item.includes('Chicken') || item.includes('Tofu'))).toHaveLength(2);
  });
});