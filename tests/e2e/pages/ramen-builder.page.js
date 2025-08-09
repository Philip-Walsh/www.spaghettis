// Page Object Model for Ramen Builder
export class RamenBuilderPage {
  constructor(page) {
    this.page = page;
    this.noodleBaseSection = page.locator('[data-testid="noodle-base"]');
    this.proteinSection = page.locator('[data-testid="protein"]');
    this.brothSection = page.locator('[data-testid="broth"]');
    this.cart = page.locator('[data-testid="cart"]');
    this.totalPrice = page.locator('[data-testid="total-price"]');
  }

  async goto() {
    await this.page.goto('/ramen');
  }

  async selectNoodleBase(option) {
    await this.noodleBaseSection.locator(`text=${option}`).click();
  }

  async selectProtein(option) {
    await this.proteinSection.locator(`text=${option}`).click();
  }

  async selectBroth(option) {
    await this.brothSection.locator(`text=${option}`).click();
  }

  async getCartItems() {
    return await this.cart.locator('[data-testid="cart-item"]').allTextContents();
  }

  async getTotalPrice() {
    return await this.totalPrice.textContent();
  }
}