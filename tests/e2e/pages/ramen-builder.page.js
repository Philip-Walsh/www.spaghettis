// Page Object Model for Ramen Builder
import { SELECTORS } from '../constants.js';

export class RamenBuilderPage {
  constructor(page) {
    this.page = page;
    this.noodleBaseSection = page.locator(SELECTORS.NOODLE_BASE);
    this.proteinSection = page.locator(SELECTORS.PROTEIN);
    this.brothSection = page.locator(SELECTORS.BROTH);
    this.cart = page.locator(SELECTORS.CART);
    this.totalPrice = page.locator(SELECTORS.TOTAL_PRICE);
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
    return await this.cart.locator(SELECTORS.CART_ITEM).allTextContents();
  }

  async getTotalPrice() {
    return await this.totalPrice.textContent();
  }

  // Enhanced navigation methods
  async navigateToStep(stepName) {
    const stepSelectors = {
      'noodleBase': '[aria-label*="Choose Your Base"], button:has-text("Choose Your Base")',
      'protein': '[aria-label*="Select Protein"], button:has-text("Select Protein")',
      'gardenPicks': '[aria-label*="Add Vegetables"], button:has-text("Add Vegetables")',
      'sauceBroth': '[aria-label*="Pick Your Broth"], button:has-text("Pick Your Broth")',
      'garnish': '[aria-label*="Final Touches"], button:has-text("Final Touches")'
    };

    const selector = stepSelectors[stepName];
    if (selector) {
      const selectors = selector.split(', ');
      for (const singleSelector of selectors) {
        try {
          const element = await this.page.locator(singleSelector).first();
          if (await element.isVisible()) {
            await element.click();
            await this.page.waitForTimeout(100);
            return;
          }
        } catch (e) {
          continue;
        }
      }
    }
  }

  async selectVegetable(option) {
    await this.page.locator(`[data-testid="gardenPicks"] button:has-text("${option}")`).click();
  }

  async hasActiveSelections() {
    try {
      const selections = await this.page.locator('[aria-pressed="true"], .selected, .active').count();
      return selections > 0;
    } catch (e) {
      return false;
    }
  }

  async canCompleteOrder() {
    try {
      const addToCartButton = this.page.locator('button:has-text("Add to Cart"), button:has-text("Finish")');
      return await addToCartButton.isEnabled();
    } catch (e) {
      return false;
    }
  }

  async isStepCompleted(stepName) {
    try {
      const stepButton = await this.page.locator(`button[aria-label*="${stepName}"], [data-testid="step-${stepName}"]`);
      const ariaPressed = await stepButton.getAttribute('aria-pressed');
      const hasCompletedClass = await stepButton.evaluate(el => el.classList.contains('completed'));
      return ariaPressed === 'true' || hasCompletedClass;
    } catch (e) {
      return false;
    }
  }

  async isStepActive(stepName) {
    try {
      const stepButton = await this.page.locator(`button[aria-label*="${stepName}"], [data-testid="step-${stepName}"]`);
      const ariaCurrent = await stepButton.getAttribute('aria-current');
      const hasActiveClass = await stepButton.evaluate(el => el.classList.contains('active'));
      return ariaCurrent === 'step' || hasActiveClass;
    } catch (e) {
      return false;
    }
  }

  async isOptionSelected(option) {
    try {
      const optionElement = await this.page.locator(`button:has-text("${option}"), input[value="${option}"]`);
      const ariaPressed = await optionElement.getAttribute('aria-pressed');
      const isChecked = await optionElement.getAttribute('checked');
      const hasSelectedClass = await optionElement.evaluate(el => el.classList.contains('selected'));
      return ariaPressed === 'true' || isChecked !== null || hasSelectedClass;
    } catch (e) {
      return false;
    }
  }
}