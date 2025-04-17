import '@testing-library/jest-dom';

// Mock the fetch API globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock the menuOptions module (named export)
jest.mock('./data/menuOptions.js', () => ({
  menuOptions: {
    noodleBase: {
      label: 'Choose Your Noodle Base',
      key: 'noodleBase',
      multi: false,
      choices: [
        { name: 'Ramen', price: 0, icon: '🍜', tag: 'base' },
        { name: 'Udon', price: 1.5, icon: '🍜', tag: 'base' }
      ]
    },
    protein: {
      label: 'Choose Your Protein',
      key: 'protein',
      multi: true,
      choices: [
        { name: 'Chicken', price: 2.0, icon: '🐔', tag: 'meat' },
        { name: 'Tofu', price: 1.75, icon: '🌱', tag: 'vegan' }
      ]
    }
  }
}));
