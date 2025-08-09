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