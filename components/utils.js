/**
 * Utility functions for the ramen builder application
 */

// Import menuOptions for price lookups
import { menuOptions } from '../data/menuOptions';

/**
 * Calculate the total price from user selections
 * @param {Object} selections - Object containing user selections by category (strings or arrays of strings)
 * @returns {number} Total price
 */
export function calculateTotalPrice(selections = {}) {
  if (!selections || typeof selections !== 'object') {
    return 0;
  }

  let total = 0;

  // Process each selection category
  Object.entries(selections).forEach(([category, selected]) => {
    if (!selected || !menuOptions[category]) return;

    const categoryOptions = menuOptions[category];

    if (Array.isArray(selected)) {
      // Multi-select category (protein, gardenPicks, garnish)
      selected.forEach(itemName => {
        const item = categoryOptions.choices.find(choice => choice.name === itemName);
        if (item && typeof item.price === 'number') {
          total += item.price;
        }
      });
    } else if (typeof selected === 'string') {
      // Single-select category (noodleBase, sauceBroth)
      const item = categoryOptions.choices.find(choice => choice.name === selected);
      if (item && typeof item.price === 'number') {
        total += item.price;
      }
    }
  });

  return Math.max(0, total); // Ensure non-negative
}

/**
 * Format a price for display
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 */
export function formatPrice(price = 0) {
  const numericPrice = typeof price === 'number' ? price : 0;
  return `$${Math.max(0, numericPrice).toFixed(2)}`;
}

/**
 * Validate a selection item structure
 * @param {Object} item - Item to validate
 * @returns {boolean} Whether the item is valid
 */
export function validateSelectionItem(item) {
  return item && 
         typeof item === 'object' && 
         typeof item.name === 'string' && 
         typeof item.price === 'number' && 
         item.price >= 0;
}

/**
 * Get total item count from selections
 * @param {Object} selections - User selections
 * @returns {number} Total number of items selected
 */
export function getTotalItemCount(selections = {}) {
  let count = 0;
  
  Object.values(selections).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      count += categoryItems.length;
    } else if (categoryItems) {
      count += 1; // Single selection
    }
  });
  
  return count;
}
