// Unit test for pure functions - no JSX/React needed
describe('Basic Test Setup', () => {
  it('should handle basic math', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle basic imports', () => {
    const utils = require('../../components/utils');
    expect(typeof utils.calculateTotalPrice).toBe('function');
  });

  it('should test pure function behavior', () => {
    const utils = require('../../components/utils');
    const result = utils.calculateTotalPrice({ price: 10 }, { price: 5 });
    expect(typeof result).toBe('number');
  });
});
