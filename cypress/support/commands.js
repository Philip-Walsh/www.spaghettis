// Custom Cypress Commands for Spaghetti's Ramen App

// Navigation Commands
Cypress.Commands.add('navigateToRamenBuilder', () => {
    cy.visit('/ramen');
    cy.get('body').should('be.visible');
    cy.url().should('include', '/ramen');
});

Cypress.Commands.add('navigateToStep', (stepName) => {
    const stepSelectors = {
        'noodleBase': '[aria-label*="Choose Your Base"], button:has-text("Choose Your Base")',
        'protein': '[aria-label*="Select Protein"], button:has-text("Select Protein")',
        'gardenPicks': '[aria-label*="Add Vegetables"], button:has-text("Add Vegetables")',
        'sauceBroth': '[aria-label*="Pick Your Broth"], button:has-text("Pick Your Broth")',
        'garnish': '[aria-label*="Final Touches"], button:has-text("Final Touches")'
    };

    const selector = stepSelectors[stepName];
    if (selector) {
        cy.get(selector).first().click();
        cy.wait(200); // Small delay for navigation
    }
});

// Selection Commands - Updated to match actual app structure
Cypress.Commands.add('selectNoodleBase', (option) => {
    // Look for the option button by text content in the options grid
    cy.get('.optionsGrid')
        .find(`button:contains("${option}")`)
        .first()
        .click();
});

Cypress.Commands.add('selectProtein', (option) => {
    // Look for the option button by text content in the options grid
    cy.get('.optionsGrid')
        .find(`button:contains("${option}")`)
        .first()
        .click();
});

Cypress.Commands.add('selectBroth', (option) => {
    // Look for the option button by text content in the options grid
    cy.get('.optionsGrid')
        .find(`button:contains("${option}")`)
        .first()
        .click();
});

Cypress.Commands.add('selectVegetable', (option) => {
    // Look for the option button by text content in the options grid
    cy.get('.optionsGrid')
        .find(`button:contains("${option}")`)
        .first()
        .click();
});

// Verification Commands - Updated to match actual app structure
Cypress.Commands.add('verifyStepActive', (stepName) => {
    // Check if the step title or step navigation shows the current step
    cy.get('.stepTitle, h2')
        .should('contain.text', stepName);
});

Cypress.Commands.add('verifyOptionSelected', (option) => {
    // Check if the option button has the 'selected' class
    cy.get(`button:contains("${option}")`)
        .should('have.class', 'selected');
});

Cypress.Commands.add('verifyTotalPriceUpdated', () => {
    // Look for price display elements
    cy.get('.priceDisplay, .price, [class*="price"]')
        .should('not.contain', '$0.00')
        .and('be.visible');
});

Cypress.Commands.add('verifyCartHasItems', () => {
    // Look for cart items in the cart component
    cy.get('.cart, [class*="cart"]')
        .find('.cartItem, [class*="item"], li')
        .should('have.length.greaterThan', 0);
});

// Navigation Testing Commands
Cypress.Commands.add('verifyNavigationConsistency', () => {
    // Check that navigation elements are present
    cy.get('nav').should('be.visible');
    cy.get('a[href="/ramen"]').should('contain.text', 'Ramen');
    cy.get('a[href="/about"]').should('contain.text', 'About');
});

Cypress.Commands.add('testThemeToggle', () => {
    // Find and click theme toggle
    cy.get('[data-testid="theme-toggle"], button[aria-label*="theme"], .theme-toggle')
        .first()
        .click();

    // Verify theme changed (this is a basic check)
    cy.get('html, body').should(($el) => {
        const styles = window.getComputedStyle($el[0]);
        expect(styles.backgroundColor).to.not.equal('rgb(255, 255, 255)');
    });
});

Cypress.Commands.add('testMobileNavigation', () => {
    // Set mobile viewport
    cy.viewport(375, 667);

    // Click mobile menu toggle
    cy.get('button[aria-label*="Toggle Menu"], .nav-toggle, .hamburger')
        .first()
        .click();

    // Verify mobile menu is open
    cy.get('.nav-links.open, .mobile-menu.open, [aria-expanded="true"]')
        .should('be.visible');
});

// Performance Testing Commands
Cypress.Commands.add('measureNavigationTime', (fromStep, toStep) => {
    const startTime = Date.now();

    cy.navigateToStep(toStep).then(() => {
        const endTime = Date.now();
        const navigationTime = endTime - startTime;

        cy.task('log', `Navigation from ${fromStep} to ${toStep}: ${navigationTime}ms`);
        expect(navigationTime).to.be.lessThan(1000); // Should be under 1 second
    });
});

// Wait for deploy command
Cypress.Commands.add('waitForApplication', (timeout = 30000) => {
    cy.visit('/', { timeout });
    cy.get('body').should('be.visible');

    // Wait for any loading states to complete
    cy.get('[data-testid="loading"], .loading').should('not.exist');

    // Verify main navigation is present
    cy.get('nav').should('be.visible');
});

// Accessibility Commands
Cypress.Commands.add('checkAccessibility', () => {
    // Basic accessibility checks
    cy.get('[role="button"], button').each(($btn) => {
        cy.wrap($btn).should('have.attr', 'aria-label')
            .or('have.attr', 'aria-labelledby')
            .or('contain.text');
    });

    // Check for proper heading structure
    cy.get('h1').should('have.length.at.least', 1);

    // Check for alt text on images
    cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt');
    });
});

// Custom contains command that's more flexible
Cypress.Commands.add('containsText', { prevSubject: 'element' }, (subject, text) => {
    return cy.wrap(subject).should('contain.text', text);
});

// Debug command for troubleshooting
Cypress.Commands.add('debugTest', (message) => {
    cy.task('log', `🐛 DEBUG: ${message}`);
    cy.pause();
});
