// Playwright E2E test
import { test, expect } from '@playwright/test';
import { RamenBuilderPage } from './pages/ramen-builder.page.js';
import { RAMEN_COMPONENTS } from './constants.js';

test.describe('Ramen Builder', () => {
  let ramenBuilderPage;

  test.beforeEach(async ({ page }) => {
    ramenBuilderPage = new RamenBuilderPage(page);
    await ramenBuilderPage.goto();
  });

  test('should build a complete ramen bowl', async () => {
    await ramenBuilderPage.selectNoodleBase(RAMEN_COMPONENTS.NOODLE_BASE);
    await ramenBuilderPage.selectProtein(RAMEN_COMPONENTS.PROTEIN.TOFU);
    await ramenBuilderPage.selectBroth(RAMEN_COMPONENTS.BROTH);

    const cartItems = await ramenBuilderPage.getCartItems();
    expect(cartItems).toContain(RAMEN_COMPONENTS.NOODLE_BASE);
    expect(cartItems).toContain(RAMEN_COMPONENTS.PROTEIN.TOFU);
    expect(cartItems).toContain(RAMEN_COMPONENTS.BROTH);

    const totalPrice = await ramenBuilderPage.getTotalPrice();
    expect(totalPrice).not.toBe('$0.00');
  });

  test('should allow multiple protein selections', async () => {
    await ramenBuilderPage.selectNoodleBase(RAMEN_COMPONENTS.NOODLE_BASE);
    await ramenBuilderPage.selectProtein(RAMEN_COMPONENTS.PROTEIN.CHICKEN);
    await ramenBuilderPage.selectProtein(RAMEN_COMPONENTS.PROTEIN.TOFU);

    const cartItems = await ramenBuilderPage.getCartItems();
    const proteinItems = cartItems.filter(item => 
      item.includes(RAMEN_COMPONENTS.PROTEIN.CHICKEN) || 
      item.includes(RAMEN_COMPONENTS.PROTEIN.TOFU)
    );
    expect(proteinItems).toHaveLength(2);
  });
});