const { calculateTotal, formatPrice } = require('../../utils/pricing');

describe('Pricing Utils - Enhanced', () => {
  describe('calculateTotal', () => {
    it('handles empty selections', () => {
      expect(calculateTotal({})).toBe(0);
    });

    it('handles null/undefined items', () => {
      const selections = { 
        noodleBase: [null, undefined, { price: 10 }] 
      };
      expect(calculateTotal(selections)).toBe(10);
    });

    it('handles missing price property', () => {
      const selections = { 
        noodleBase: [{ name: 'Test' }, { price: 5 }] 
      };
      expect(calculateTotal(selections)).toBe(5);
    });

    it('handles negative prices', () => {
      const selections = { 
        noodleBase: [{ price: -5 }, { price: 10 }] 
      };
      expect(calculateTotal(selections)).toBe(5);
    });
  });

  describe('formatPrice', () => {
    it('handles zero', () => {
      expect(formatPrice(0)).toBe('$0.00');
    });

    it('handles large numbers', () => {
      expect(formatPrice(999999.99)).toBe('$999999.99');
    });

    it('handles negative numbers', () => {
      expect(formatPrice(-10.5)).toBe('$-10.50');
    });

    it('handles floating point precision', () => {
      expect(formatPrice(0.1 + 0.2)).toBe('$0.30');
    });
  });
});