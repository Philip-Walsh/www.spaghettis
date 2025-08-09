import '@testing-library/jest-dom';

// Mock the fetch API globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock window.matchMedia (needed for ThemeToggle tests)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: query === '(prefers-color-scheme: dark)', // Default to preferring dark mode
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock Element.prototype.scrollTo (needed for RamenBuilder)
Element.prototype.scrollTo = jest.fn();

// Mock Element.prototype.scrollIntoView (needed for RamenBuilder)
Element.prototype.scrollIntoView = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

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

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  localStorageMock.getItem.mockReturnValue(null);
  window.matchMedia.mockReturnValue({
    matches: false,
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });
});
