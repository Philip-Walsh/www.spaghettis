// Unit test example - pure functions
const { calculateTotal, formatPrice } = require('../../utils/pricing');

describe('Pricing Utils', () => {
  describe('calculateTotal', () => {
    it('calculates total for single item', () => {
      const selections = { noodleBase: [{ price: 10 }] };
      expect(calculateTotal(selections)).toBe(10);
    });

    it('calculates total for multiple items', () => {
      const selections = {
        noodleBase: [{ price: 10 }],
        protein: [{ price: 2 }, { price: 3 }],
      };
      expect(calculateTotal(selections)).toBe(15);
    });
  });

  describe('formatPrice', () => {
    it('formats price with dollar sign', () => {
      expect(formatPrice(10.5)).toBe('$10.50');
    });
  });
});