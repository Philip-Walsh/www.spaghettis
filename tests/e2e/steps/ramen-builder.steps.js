// Cucumber step definitions
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { RamenBuilderPage } from '../pages/ramen-builder.page.js';

let ramenBuilderPage;

Given('I am on the ramen builder page', async function () {
  ramenBuilderPage = new RamenBuilderPage(this.page);
  await ramenBuilderPage.goto();
});

When('I select {string} as noodle base', async function (option) {
  await ramenBuilderPage.selectNoodleBase(option);
});

When('I select {string} as protein', async function (option) {
  await ramenBuilderPage.selectProtein(option);
});

When('I select {string} as broth', async function (option) {
  await ramenBuilderPage.selectBroth(option);
});

Then('I should see the total price updated', async function () {
  const totalPrice = await ramenBuilderPage.getTotalPrice();
  expect(totalPrice).not.toBe('$0.00');
});

Then('I should see my selections in the cart', async function () {
  const cartItems = await ramenBuilderPage.getCartItems();
  expect(cartItems.length).toBeGreaterThan(0);
});

Then('I should see both proteins in my cart', async function () {
  const cartItems = await ramenBuilderPage.getCartItems();
  expect(cartItems.filter(item => item.includes('Chicken') || item.includes('Tofu'))).toHaveLength(2);
});

Then('the total should reflect both protein prices', async function () {
  const totalPrice = await ramenBuilderPage.getTotalPrice();
  const numericPrice = parseFloat(totalPrice.replace('$', ''));
  expect(numericPrice).toBeGreaterThan(3); // Assuming both proteins cost more than $3 total
});

// Enhanced navigation step definitions
When('I navigate to the protein step', async function () {
  await ramenBuilderPage.navigateToStep('protein');
});

When('I navigate to the broth step', async function () {
  await ramenBuilderPage.navigateToStep('sauceBroth');
});

When('I navigate back to the noodle base step', async function () {
  await ramenBuilderPage.navigateToStep('noodleBase');
});

When('I navigate to the vegetables step', async function () {
  await ramenBuilderPage.navigateToStep('gardenPicks');
});

When('I select {string} as broth', async function (option) {
  await ramenBuilderPage.selectBroth(option);
});

When('I select {string} as vegetable', async function (option) {
  await ramenBuilderPage.selectVegetable(option);
});

Then('all my selections should be preserved', async function () {
  // Check that selections are still visible/selected
  const hasSelections = await ramenBuilderPage.hasActiveSelections();
  expect(hasSelections).toBe(true);
});

Then('I should be able to complete my order', async function () {
  const canComplete = await ramenBuilderPage.canCompleteOrder();
  expect(canComplete).toBe(true);
});

Then('the noodle base step should be marked as completed', async function () {
  const isCompleted = await ramenBuilderPage.isStepCompleted('noodleBase');
  expect(isCompleted).toBe(true);
});

Then('the protein step should be marked as active', async function () {
  const isActive = await ramenBuilderPage.isStepActive('protein');
  expect(isActive).toBe(true);
});

Then('the noodle base step should remain completed', async function () {
  const isCompleted = await ramenBuilderPage.isStepCompleted('noodleBase');
  expect(isCompleted).toBe(true);
});

Then('{string} should still be selected', async function (option) {
  const isSelected = await ramenBuilderPage.isOptionSelected(option);
  expect(isSelected).toBe(true);
});