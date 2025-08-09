// Pricing utility functions
function calculateTotal(selections) {
  return Object.values(selections)
    .flat()
    .filter(item => item && typeof item === 'object')
    .reduce((total, item) => total + (item.price || 0), 0);
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

module.exports = { calculateTotal, formatPrice };