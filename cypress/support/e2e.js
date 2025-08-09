// Cypress E2E Support Configuration

// Import commands
import './commands';

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing on Next.js hydration errors
    if (err.message.includes('Hydration failed')) {
        return false;
    }
    // Prevent Cypress from failing on network errors that don't affect functionality
    if (err.message.includes('Network Error') || err.message.includes('Failed to fetch')) {
        return false;
    }
    // Let other errors fail the test
    return true;
});

// Log environment info
before(() => {
    cy.task('log', `🍜 Testing Spaghetti's Ramen App`);
    cy.task('log', `🌐 Base URL: ${Cypress.config('baseUrl')}`);
    cy.task('log', `📱 Viewport: ${Cypress.config('viewportWidth')}x${Cypress.config('viewportHeight')}`);
});

// Screenshot on test failure
afterEach(() => {
    cy.screenshot({ capture: 'viewport', onlyOnFailure: true });
});

// Global setup for each test
beforeEach(() => {
    // Clear local storage and cookies
    cy.clearLocalStorage();
    cy.clearCookies();

    // Set up viewport
    cy.viewport(1280, 720);

    // Wait for application to be ready
    cy.visit('/', { timeout: 30000 });
    cy.get('body').should('be.visible');
});
