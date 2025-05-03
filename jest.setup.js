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
        { name: 'Forbidden Ramen', price: 0, icon: '🥷🍜', tags: ['vegetarian'] },
        { name: 'Neo Udon', price: 1.5, icon: '🤖🍜', tags: ['vegetarian'] },
        { name: 'Quantum Soba', price: 1.75, icon: '🌀🥢', tags: ['vegetarian'] },
        { name: 'Rice Noodles', price: 1.5, icon: '🌾🚫', tags: ['vegetarian', 'glutenfree'] }
      ]
    },
    protein: {
      label: 'Choose Your Protein',
      key: 'protein',
      multi: true,
      choices: [
        { name: 'Chicken', price: 2.0, icon: '🍗', tags: ['meat'] },
        { name: 'Tofu', price: 1.75, icon: '🌱', tags: ['vegetarian', 'vegan'] },
        { name: 'Edamame', price: 1.0, icon: '🌾🚫', tags: ['vegetarian', 'vegan', 'glutenfree'] }
      ]
    },
    gardenPicks: {
      label: 'Choose Your Garden Picks',
      key: 'gardenPicks',
      multi: true,
      choices: [
        { name: 'Bok Choy', price: 0.75, icon: '🥬', tags: ['vegetarian', 'vegan'] },
        { name: 'Mushrooms', price: 1.0, icon: '🍄', tags: ['vegetarian', 'vegan'] },
        { name: 'Bean Sprouts', price: 0.5, icon: '🌱', tags: ['vegetarian', 'vegan'] }
      ]
    },
    sauceBroth: {
      label: 'Choose Your Sauce/Broth',
      key: 'sauceBroth',
      multi: false,
      choices: [
        { name: 'Miso', price: 0, icon: '🍲', tags: ['vegetarian'] },
        { name: 'Spicy Miso', price: 0.5, icon: '🌶️', tags: ['vegetarian'] },
        { name: 'Clear Dashi', price: 0.5, icon: '🌾🚫', tags: ['vegetarian', 'glutenfree'] }
      ]
    },
    garnish: {
      label: 'Choose Your Garnish',
      key: 'garnish',
      multi: true,
      choices: [
        { name: 'Seaweed', price: 0.5, icon: '🌿', tags: ['vegetarian', 'vegan'] },
        { name: 'Green Onions', price: 0.5, icon: '🧅', tags: ['vegetarian', 'vegan'] },
        { name: 'Sesame Seeds', price: 0.25, icon: '🌱', tags: ['vegetarian', 'vegan'] }
      ]
    }
  }
}));
