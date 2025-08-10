// Unit test for basic functionality
describe('Basic Test Setup', () => {
    it('should handle basic math', () => {
        expect(1 + 1).toBe(2);
    });

    it('should handle JavaScript fundamentals', () => {
        const obj = { price: 10 };
        expect(obj.price).toBe(10);
        expect(typeof obj.price).toBe('number');
    });

    it('should test array operations', () => {
        const items = [{ price: 10 }, { price: 5 }];
        const total = items.reduce((sum, item) => sum + item.price, 0);
        expect(total).toBe(15);
    });
});
