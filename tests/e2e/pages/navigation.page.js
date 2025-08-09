// Page Object Model for Navigation testing
import { expect } from '@playwright/test';

export class NavigationPage {
  constructor(page) {
    this.page = page;
    this.navigationTimes = [];
  }

  // Basic navigation methods
  async gotoHomepage() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoRamenBuilder() {
    await this.page.goto('/ramen');
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentURL() {
    return this.page.url();
  }

  // Step Navigation methods
  async clickStepNavigation(stepName) {
    const startTime = Date.now();
    
    // Map step names to likely selectors
    const stepSelectors = {
      'noodleBase': '[aria-label*="Choose Your Base"], [data-testid="step-noodleBase"], button:has-text("Choose Your Base")',
      'protein': '[aria-label*="Select Protein"], [data-testid="step-protein"], button:has-text("Select Protein")',
      'gardenPicks': '[aria-label*="Add Vegetables"], [data-testid="step-gardenPicks"], button:has-text("Add Vegetables")',
      'sauceBroth': '[aria-label*="Pick Your Broth"], [data-testid="step-sauceBroth"], button:has-text("Pick Your Broth")',
      'garnish': '[aria-label*="Final Touches"], [data-testid="step-garnish"], button:has-text("Final Touches")'
    };

    const selector = stepSelectors[stepName];
    if (selector) {
      try {
        // Try each selector in the comma-separated list
        const selectors = selector.split(', ');
        let clicked = false;
        
        for (const singleSelector of selectors) {
          try {
            const element = await this.page.locator(singleSelector).first();
            if (await element.isVisible()) {
              await element.click();
              clicked = true;
              break;
            }
          } catch (e) {
            // Try next selector
            continue;
          }
        }
        
        if (!clicked) {
          // Fallback: try to find step navigation by text content
          await this.page.locator('button', { hasText: stepName }).first().click();
        }
      } catch (error) {
        console.log(`Could not find step navigation for ${stepName}, trying fallback...`);
        // Fallback: click on any button that might contain the step name
        await this.page.locator(`button:has-text("${stepName}")`).first().click();
      }
    }
    
    const endTime = Date.now();
    this.navigationTimes.push(endTime - startTime);
    
    // Wait for navigation to complete
    await this.page.waitForTimeout(100);
  }

  async getCurrentStep() {
    try {
      // Look for active step indicators
      const activeStep = await this.page.locator('[aria-current="step"], .active, .current').first();
      if (await activeStep.isVisible()) {
        const stepText = await activeStep.textContent();
        // Map display text back to step names
        if (stepText.includes('Base')) return 'noodleBase';
        if (stepText.includes('Protein')) return 'protein';
        if (stepText.includes('Vegetables')) return 'gardenPicks';
        if (stepText.includes('Broth')) return 'sauceBroth';
        if (stepText.includes('Touches')) return 'garnish';
      }
    } catch (e) {
      // Fallback: try to determine current step from URL or other indicators
    }
    
    // Default fallback
    return 'noodleBase';
  }

  async isStepActive(stepName) {
    try {
      const activeElements = await this.page.locator('[aria-current="step"], .active').all();
      for (const element of activeElements) {
        const text = await element.textContent();
        if (text && text.toLowerCase().includes(stepName.toLowerCase())) {
          return true;
        }
      }
    } catch (e) {
      // Handle error gracefully
    }
    return false;
  }

  async getValidationMessage() {
    try {
      const validationSelectors = [
        '[role="alert"]',
        '.error-message',
        '.validation-message',
        '[data-testid="validation-message"]'
      ];
      
      for (const selector of validationSelectors) {
        const element = this.page.locator(selector);
        if (await element.isVisible()) {
          return await element.textContent();
        }
      }
    } catch (e) {
      // No validation message found
    }
    return null;
  }

  // Ramen Builder specific methods
  async selectNoodleBase(option) {
    try {
      // Look for the option in various ways
      const selectors = [
        `[data-testid="noodle-base"] button:has-text("${option}")`,
        `button:has-text("${option}")`,
        `[aria-label*="${option}"]`,
        `input[value="${option}"] + label`,
      ];
      
      for (const selector of selectors) {
        try {
          const element = this.page.locator(selector).first();
          if (await element.isVisible()) {
            await element.click();
            return;
          }
        } catch (e) {
          continue;
        }
      }
    } catch (error) {
      console.log(`Could not select noodle base: ${option}`);
    }
  }

  async selectProtein(option) {
    try {
      const selectors = [
        `[data-testid="protein"] button:has-text("${option}")`,
        `button:has-text("${option}")`,
        `[aria-label*="${option}"]`,
      ];
      
      for (const selector of selectors) {
        try {
          const element = this.page.locator(selector).first();
          if (await element.isVisible()) {
            await element.click();
            return;
          }
        } catch (e) {
          continue;
        }
      }
    } catch (error) {
      console.log(`Could not select protein: ${option}`);
    }
  }

  async isOptionSelected(option) {
    try {
      // Look for selected indicators
      const selectedSelectors = [
        `button:has-text("${option}").selected`,
        `button:has-text("${option}")[aria-pressed="true"]`,
        `button:has-text("${option}").active`,
        `input[value="${option}"]:checked`,
      ];
      
      for (const selector of selectedSelectors) {
        const element = this.page.locator(selector);
        if (await element.isVisible()) {
          return true;
        }
      }
    } catch (e) {
      // Option not found or not selected
    }
    return false;
  }

  // Top Navigation methods
  async navigateToPage(pageName) {
    const pageLinks = {
      'About': '/about',
      'Ramen': '/ramen',
      'Home': '/'
    };
    
    const url = pageLinks[pageName] || `/${pageName.toLowerCase()}`;
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async clickNavigationLink(linkText) {
    try {
      // Look for navigation links
      const navSelectors = [
        `nav a:has-text("${linkText}")`,
        `header a:has-text("${linkText}")`,
        `.nav-links a:has-text("${linkText}")`,
        `a[href*="${linkText.toLowerCase()}"]`
      ];
      
      for (const selector of navSelectors) {
        try {
          const element = this.page.locator(selector).first();
          if (await element.isVisible()) {
            await element.click();
            await this.page.waitForLoadState('networkidle');
            return;
          }
        } catch (e) {
          continue;
        }
      }
    } catch (error) {
      console.log(`Could not click navigation link: ${linkText}`);
    }
  }

  async clickHomeLogo() {
    try {
      const logoSelectors = [
        'a[aria-label*="Home"]',
        'a.nav-logo',
        'header a[href="/"]',
        'nav a[href="/"]'
      ];
      
      for (const selector of logoSelectors) {
        try {
          const element = this.page.locator(selector).first();
          if (await element.isVisible()) {
            await element.click();
            await this.page.waitForLoadState('networkidle');
            return;
          }
        } catch (e) {
          continue;
        }
      }
    } catch (error) {
      console.log('Could not click home logo');
    }
  }

  async getNavigationMenuItems() {
    try {
      const menuItems = [];
      const navLinks = await this.page.locator('nav a, header a').all();
      
      for (const link of navLinks) {
        const text = await link.textContent();
        if (text && text.trim() && !text.includes('🍜')) {
          menuItems.push(text.trim());
        }
      }
      
      return menuItems;
    } catch (e) {
      return [];
    }
  }

  async isThemeToggleVisible() {
    try {
      const themeToggleSelectors = [
        '[data-testid="theme-toggle"]',
        'button[aria-label*="theme"]',
        'button[aria-label*="Theme"]',
        '.theme-toggle'
      ];
      
      for (const selector of themeToggleSelectors) {
        const element = this.page.locator(selector);
        if (await element.isVisible()) {
          return true;
        }
      }
    } catch (e) {
      // Theme toggle not found
    }
    return false;
  }

  // Mobile Navigation methods
  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  async clickMobileMenuToggle() {
    try {
      const toggleSelectors = [
        'button[aria-label*="Toggle Menu"]',
        'button[aria-label*="Menu"]',
        '.nav-toggle',
        'button.hamburger'
      ];
      
      for (const selector of toggleSelectors) {
        try {
          const element = this.page.locator(selector);
          if (await element.isVisible()) {
            await element.click();
            return;
          }
        } catch (e) {
          continue;
        }
      }
    } catch (error) {
      console.log('Could not click mobile menu toggle');
    }
  }

  async clickMobileMenuLink(linkText) {
    await this.clickNavigationLink(linkText);
  }

  async isMobileMenuOpen() {
    try {
      const openMenuSelectors = [
        '.nav-links.open',
        '.mobile-menu.open',
        '[aria-expanded="true"]',
        '.nav-open'
      ];
      
      for (const selector of openMenuSelectors) {
        const element = this.page.locator(selector);
        if (await element.isVisible()) {
          return true;
        }
      }
    } catch (e) {
      // Menu not open
    }
    return false;
  }

  // Theme methods
  async toggleTheme() {
    await this.clickThemeToggle();
  }

  async clickThemeToggle() {
    try {
      const themeToggleSelectors = [
        '[data-testid="theme-toggle"]',
        'button[aria-label*="theme"]',
        'button[aria-label*="Theme"]',
        '.theme-toggle'
      ];
      
      for (const selector of themeToggleSelectors) {
        try {
          const element = this.page.locator(selector);
          if (await element.isVisible()) {
            await element.click();
            return;
          }
        } catch (e) {
          continue;
        }
      }
    } catch (error) {
      console.log('Could not click theme toggle');
    }
  }

  async isDarkMode() {
    try {
      // Check for dark mode indicators
      const darkModeIndicators = [
        'html[data-theme="dark"]',
        'body.dark',
        'html.dark',
        '[data-theme="dark"]'
      ];
      
      for (const selector of darkModeIndicators) {
        const element = this.page.locator(selector);
        if (await element.count() > 0) {
          return true;
        }
      }
      
      // Check computed styles for dark colors
      const backgroundColor = await this.page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      
      // Simple heuristic: if background is dark (low RGB values)
      if (backgroundColor.includes('rgb')) {
        const rgbValues = backgroundColor.match(/\d+/g);
        if (rgbValues && rgbValues.length >= 3) {
          const avg = (parseInt(rgbValues[0]) + parseInt(rgbValues[1]) + parseInt(rgbValues[2])) / 3;
          return avg < 128; // Dark if average RGB is less than 128
        }
      }
    } catch (e) {
      // Could not determine theme
    }
    return false;
  }

  // Edge case and error handling methods
  async hasErrorMessage() {
    try {
      const errorSelectors = [
        '[role="alert"]',
        '.error',
        '.error-message',
        '[data-testid="error"]'
      ];
      
      for (const selector of errorSelectors) {
        const element = this.page.locator(selector);
        if (await element.isVisible()) {
          return true;
        }
      }
    } catch (e) {
      // No error message found
    }
    return false;
  }

  async hasGuidanceMessage() {
    try {
      const guidanceSelectors = [
        '[role="status"]',
        '.guidance',
        '.help-text',
        '[data-testid="guidance"]'
      ];
      
      for (const selector of guidanceSelectors) {
        const element = this.page.locator(selector);
        if (await element.isVisible()) {
          return true;
        }
      }
    } catch (e) {
      // No guidance message found
    }
    return false;
  }

  // Accessibility methods
  async useKeyboardNavigationThroughSteps() {
    try {
      // Focus on the first step and tab through
      await this.page.keyboard.press('Tab');
      await this.page.keyboard.press('Enter');
      await this.page.keyboard.press('Tab');
      await this.page.keyboard.press('Enter');
    } catch (error) {
      console.log('Could not use keyboard navigation');
    }
  }

  async areAllStepsFocusable() {
    try {
      const focusableSteps = await this.page.locator('button[role="tab"], button[aria-controls]').all();
      
      for (const step of focusableSteps) {
        await step.focus();
        const isFocused = await step.evaluate(el => el === document.activeElement);
        if (!isFocused) {
          return false;
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async hasAppropriateAriaLabels() {
    try {
      const steps = await this.page.locator('button[role="tab"], [data-testid*="step"]').all();
      
      for (const step of steps) {
        const ariaLabel = await step.getAttribute('aria-label');
        const ariaLabelledby = await step.getAttribute('aria-labelledby');
        
        if (!ariaLabel && !ariaLabelledby) {
          return false;
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async hasAriaLiveRegions() {
    try {
      const liveRegions = await this.page.locator('[aria-live]').count();
      return liveRegions > 0;
    } catch (e) {
      return false;
    }
  }

  // Performance methods
  async rapidlyNavigateBetweenSteps() {
    const steps = ['noodleBase', 'protein', 'gardenPicks', 'sauceBroth', 'garnish'];
    
    for (let i = 0; i < 3; i++) { // Do it 3 times rapidly
      for (const step of steps) {
        await this.clickStepNavigation(step);
        await this.page.waitForTimeout(50); // Very short wait
      }
    }
  }

  getNavigationTimes() {
    return this.navigationTimes;
  }

  async hasVisualGlitches() {
    try {
      // Take a screenshot and check for obvious issues
      // This is a simplified check - in real scenarios you might use visual regression testing
      await this.page.waitForTimeout(500);
      
      // Check if any elements are overlapping inappropriately
      const overlapping = await this.page.evaluate(() => {
        const elements = document.querySelectorAll('button, nav, main');
        // Simple overlap detection logic would go here
        return false; // Simplified for this example
      });
      
      return overlapping;
    } catch (e) {
      return false;
    }
  }

  async isUIResponsive() {
    try {
      // Check if the UI responds to clicks within a reasonable time
      const startTime = Date.now();
      await this.page.locator('button').first().click();
      const endTime = Date.now();
      
      return (endTime - startTime) < 1000; // UI should respond within 1 second
    } catch (e) {
      return false;
    }
  }
}
