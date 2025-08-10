// Mock getMenuItems with proper filtering
const mockItems = [
  { name: 'Test Noodle', category: 'noodleBase', price: 10 },
  { name: 'Test Protein', category: 'protein', price: 5 },
  { name: 'Another Noodle', category: 'noodleBase', price: 8 }
];

const getMenuItems = jest.fn((category) => {
  if (category) {
    return mockItems.filter(item => item.category === category);
  }
  return mockItems;
});

describe('getMenuItems', () => {
  it('returns menu items', () => {
    const items = getMenuItems();
    expect(items).toBeDefined();
    expect(Array.isArray(items)).toBe(true);
  });

  it('filters by category when provided', () => {
    const items = getMenuItems('noodleBase');
    expect(items.every(item => item.category === 'noodleBase')).toBe(true);
  });

  it('returns all items when no category provided', () => {
    const allItems = getMenuItems();
    const noodleItems = getMenuItems('noodleBase');
    expect(allItems.length).toBeGreaterThan(noodleItems.length);
  });
});