export function calculateTotalPrice(selectedOptions) {
    let total = 0;

    // Iterate through each step's selected options
    for (const [stepKey, selected] of Object.entries(selectedOptions)) {
        // Handle both single and multi-select cases
        const items = Array.isArray(selected) ? selected : [selected];

        // Add up the prices for all selected items in this step
        items.forEach((item) => {
            if (item && typeof item === 'object' && 'price' in item) {
                total += item.price;
            }
        });
    }

    return total;
}
