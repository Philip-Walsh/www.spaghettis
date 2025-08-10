// Navigation step definitions
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { NavigationPage } from '../pages/navigation.page.js';

let navigationPage;

// Background steps
Given('the application is running at the deployed URL', async function () {
    // This step can be used to verify the app is accessible
    navigationPage = new NavigationPage(this.page);

    // Get the base URL from world parameters or environment
    const baseURL = this.parameters?.baseURL || process.env.BASE_URL || 'http://localhost:3000';
    console.log(`🌐 Testing against: ${baseURL}`);

    // Verify the app is accessible
    try {
        await navigationPage.page.goto(baseURL);
        await navigationPage.page.waitForLoadState('networkidle');
        console.log('✅ Application is accessible');
    } catch (error) {
        console.log(`❌ Application not accessible: ${error.message}`);
        throw error;
    }
});

// Step Navigation steps
Given('I am on the ramen builder page', async function () {
    navigationPage = new NavigationPage(this.page);
    await navigationPage.gotoRamenBuilder();
});

When('I navigate to step {string} using step navigation', async function (stepName) {
    await navigationPage.clickStepNavigation(stepName);
});

When('I navigate back to step {string} using step navigation', async function (stepName) {
    await navigationPage.clickStepNavigation(stepName);
});

When('I navigate forward to step {string} using step navigation', async function (stepName) {
    await navigationPage.clickStepNavigation(stepName);
});

When('I try to navigate to step {string} without completing required steps', async function (stepName) {
    await navigationPage.clickStepNavigation(stepName);
});

Then('the current step should be {string}', async function (expectedStep) {
    const currentStep = await navigationPage.getCurrentStep();
    expect(currentStep).toBe(expectedStep);
});

Then('the navigation should show {string} as active', async function (stepName) {
    const isActive = await navigationPage.isStepActive(stepName);
    expect(isActive).toBe(true);
});

Then('the URL should reflect the current step', async function () {
    // This could check for URL fragments or query parameters if implemented
    const url = await navigationPage.getCurrentURL();
    expect(url).toContain('/ramen');
});

Then('I should be prevented from navigating to that step', async function () {
    // Check if the step is disabled or navigation was blocked
    const currentStep = await navigationPage.getCurrentStep();
    expect(currentStep).not.toBe('garnish');
});

Then('I should see a validation message about required steps', async function () {
    const validationMessage = await navigationPage.getValidationMessage();
    expect(validationMessage).toBeTruthy();
});

// Ramen Builder specific steps
When('I select {string} as noodle base', async function (option) {
    await navigationPage.selectNoodleBase(option);
});

When('I select {string} as protein', async function (option) {
    await navigationPage.selectProtein(option);
});

Then('I should still see {string} selected', async function (option) {
    const isSelected = await navigationPage.isOptionSelected(option);
    expect(isSelected).toBe(true);
});

// Top Navigation steps
Given('I am on the homepage', async function () {
    navigationPage = new NavigationPage(this.page);
    await navigationPage.gotoHomepage();
});

When('I navigate to the {string} page', async function (pageName) {
    await navigationPage.navigateToPage(pageName);
});

When('I click on the {string} navigation link', async function (linkText) {
    await navigationPage.clickNavigationLink(linkText);
});

When('I click on the home logo', async function () {
    await navigationPage.clickHomeLogo();
});

Then('the navigation menu should display the same items as the homepage', async function () {
    const menuItems = await navigationPage.getNavigationMenuItems();
    expect(menuItems).toContain('Ramen');
    expect(menuItems).toContain('About');
});

Then('the navigation menu should display the same items as before', async function () {
    const menuItems = await navigationPage.getNavigationMenuItems();
    expect(menuItems).toContain('Ramen');
    expect(menuItems).toContain('About');
});

Then('the theme toggle should be visible', async function () {
    const isVisible = await navigationPage.isThemeToggleVisible();
    expect(isVisible).toBe(true);
});

Then('I should be on the ramen builder page', async function () {
    const url = await navigationPage.getCurrentURL();
    expect(url).toContain('/ramen');
});

Then('I should be on the about page', async function () {
    const url = await navigationPage.getCurrentURL();
    expect(url).toContain('/about');
});

Then('I should be on the homepage', async function () {
    const url = await navigationPage.getCurrentURL();
    expect(url).toMatch(/\/$|\/index/);
});

// Mobile Navigation steps
Given('I am on the homepage with mobile viewport', async function () {
    navigationPage = new NavigationPage(this.page);
    await navigationPage.setMobileViewport();
    await navigationPage.gotoHomepage();
});

When('I click the mobile menu toggle', async function () {
    await navigationPage.clickMobileMenuToggle();
});

When('I click on {string} in the mobile menu', async function (linkText) {
    await navigationPage.clickMobileMenuLink(linkText);
});

Then('the mobile navigation menu should open', async function () {
    const isOpen = await navigationPage.isMobileMenuOpen();
    expect(isOpen).toBe(true);
});

Then('the mobile menu should close', async function () {
    const isOpen = await navigationPage.isMobileMenuOpen();
    expect(isOpen).toBe(false);
});

// Theme Toggle steps
When('I toggle the theme to dark mode', async function () {
    await navigationPage.toggleTheme();
});

Then('the page should display in dark mode', async function () {
    const isDarkMode = await navigationPage.isDarkMode();
    expect(isDarkMode).toBe(true);
});

Then('the page should still display in dark mode', async function () {
    const isDarkMode = await navigationPage.isDarkMode();
    expect(isDarkMode).toBe(true);
});

// Edge Case steps
When('I directly navigate to step {string} via step navigation', async function (stepName) {
    await navigationPage.clickStepNavigation(stepName);
});

Then('the application should handle this gracefully', async function () {
    // Check that the app doesn't crash or show errors
    const hasError = await navigationPage.hasErrorMessage();
    expect(hasError).toBe(false);
});

Then('should show appropriate guidance or redirect to first step', async function () {
    const currentStep = await navigationPage.getCurrentStep();
    // Should either show guidance or redirect to first step
    expect(currentStep === 'noodleBase' || await navigationPage.hasGuidanceMessage()).toBe(true);
});

// Accessibility steps
When('I use keyboard navigation to move through steps', async function () {
    await navigationPage.useKeyboardNavigationThroughSteps();
});

Then('each step should be focusable', async function () {
    const allStepsFocusable = await navigationPage.areAllStepsFocusable();
    expect(allStepsFocusable).toBe(true);
});

Then('should have appropriate aria labels', async function () {
    const hasAriaLabels = await navigationPage.hasAppropriateAriaLabels();
    expect(hasAriaLabels).toBe(true);
});

Then('screen reader announcements should be clear', async function () {
    // This would require specialized accessibility testing tools
    // For now, we'll check for aria-live regions or similar
    const hasAriaLive = await navigationPage.hasAriaLiveRegions();
    expect(hasAriaLive).toBe(true);
});

// Performance steps
When('I rapidly navigate between different steps', async function () {
    await navigationPage.rapidlyNavigateBetweenSteps();
});

Then('each navigation should complete within {int}ms', async function (maxTime) {
    const navigationTimes = await navigationPage.getNavigationTimes();
    for (const time of navigationTimes) {
        expect(time).toBeLessThan(maxTime);
    }
});

Then('there should be no visual glitches or delays', async function () {
    const hasVisualGlitches = await navigationPage.hasVisualGlitches();
    expect(hasVisualGlitches).toBe(false);
});

Then('the UI should remain responsive', async function () {
    const isResponsive = await navigationPage.isUIResponsive();
    expect(isResponsive).toBe(true);
});
