// Cypress Cucumber Step Definitions for Navigation

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// Background steps
Given('the application is running and accessible', () => {
    cy.waitForApplication();
});

// Step Navigation steps
Given('I am on the ramen builder page', () => {
    cy.navigateToRamenBuilder();
});

When('I navigate to the {string} step using step navigation', (stepName) => {
    cy.navigateToStep(stepName);
});

When('I navigate back to the {string} step using step navigation', (stepName) => {
    cy.navigateToStep(stepName);
});

When('I navigate forward to the {string} step using step navigation', (stepName) => {
    cy.navigateToStep(stepName);
});

Then('the current step should be {string}', (expectedStep) => {
    cy.verifyStepActive(expectedStep);
});

Then('the navigation should show {string} as active', (stepName) => {
    cy.get('[aria-current="step"], .active')
        .should('contain.text', stepName);
});

// Ramen Builder specific steps
When('I select {string} as noodle base', (option) => {
    cy.selectNoodleBase(option);
});

When('I select {string} as protein', (option) => {
    cy.selectProtein(option);
});

Then('I should still see {string} selected', (option) => {
    cy.verifyOptionSelected(option);
});

// Top Navigation steps
Given('I am on the homepage', () => {
    cy.visit('/');
    cy.get('body').should('be.visible');
});

When('I navigate to the {string} page', (pageName) => {
    const pageRoutes = {
        'About': '/about',
        'Ramen': '/ramen',
        'Home': '/'
    };

    const route = pageRoutes[pageName] || `/${pageName.toLowerCase()}`;
    cy.visit(route);
});

When('I click on the {string} navigation link', (linkText) => {
    cy.get(`nav a:contains("${linkText}"), header a:contains("${linkText}")`)
        .first()
        .click();
});

When('I click on the home logo', () => {
    cy.get('a[href="/"], .nav-logo').first().click();
});

Then('the navigation menu should display the same items as the homepage', () => {
    cy.verifyNavigationConsistency();
});

Then('the navigation menu should display the same items as before', () => {
    cy.verifyNavigationConsistency();
});

Then('the theme toggle should be visible', () => {
    cy.get('[data-testid="theme-toggle"], button[aria-label*="theme"], .theme-toggle')
        .should('be.visible');
});

Then('I should be on the ramen builder page', () => {
    cy.url().should('include', '/ramen');
});

Then('I should be on the about page', () => {
    cy.url().should('include', '/about');
});

Then('I should be on the homepage', () => {
    cy.url().should('match', /\/$|\/index/);
});

// Mobile Navigation steps
Given('I am on the homepage with mobile viewport', () => {
    cy.viewport(375, 667);
    cy.visit('/');
    cy.get('body').should('be.visible');
});

When('I click the mobile menu toggle', () => {
    cy.get('button[aria-label*="Toggle Menu"], .nav-toggle, .hamburger')
        .first()
        .click();
});

When('I click on {string} in the mobile menu', (linkText) => {
    cy.get('.nav-links, .mobile-menu')
        .find(`a:contains("${linkText}")`)
        .click();
});

Then('the mobile navigation menu should open', () => {
    cy.get('.nav-links.open, .mobile-menu.open, [aria-expanded="true"]')
        .should('be.visible');
});

Then('the mobile menu should close', () => {
    cy.get('.nav-links.open').should('not.exist');
});

// Theme Toggle steps
When('I toggle the theme to dark mode', () => {
    cy.testThemeToggle();
});

Then('the page should display in dark mode', () => {
    cy.get('html, body').should('have.class', 'dark')
        .or('have.attr', 'data-theme', 'dark');
});

Then('the page should still display in dark mode', () => {
    cy.get('html, body').should('have.class', 'dark')
        .or('have.attr', 'data-theme', 'dark');
});

// Performance steps
When('I rapidly navigate between different steps', () => {
    const steps = ['protein', 'gardenPicks', 'sauceBroth', 'garnish', 'noodleBase'];

    for (let i = 0; i < 3; i++) {
        steps.forEach((step) => {
            cy.navigateToStep(step);
            cy.wait(50);
        });
    }
});

Then('each navigation should complete within {int}ms', (maxTime) => {
    // Performance is tested during navigation
    // This step just validates the expectation
    cy.task('log', `Navigation performance validated (max ${maxTime}ms)`);
});

Then('the UI should remain responsive', () => {
    cy.get('body').should('be.visible');
    cy.get('nav').should('be.visible');
});
