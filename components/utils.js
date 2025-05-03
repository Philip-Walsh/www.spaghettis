import { menuOptions } from '../data/menuOptions';

export function calculateTotalPrice(selectedItems) {
  let total = 0;

  // Iterate through each step's selected items
  for (const [stepKey, selected] of Object.entries(selectedItems)) {
    if (!selected) continue;

    // Get the step's choices
    const step = menuOptions[stepKey];
    if (!step || !step.choices) continue;

    // Handle both single and multi-select cases
    const items = Array.isArray(selected) ? selected : [selected];
    
    // Add up the prices for all selected items in this step
    items.forEach(itemName => {
      const item = step.choices.find(choice => choice.name === itemName);
      if (item && typeof item.price === 'number') {
        total += item.price;
      }
    });
  }

  return total;
}
