// Shared test fixtures for consistent mock data across tests
export const mockMenuOptions = {
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
};

export const mockCartItems = [
  {
    name: 'Ramen + Chicken + Miso',
    price: 15.99,
    details: {
      base: 'ramen',
      protein: 'chicken',
      vegetables: ['bok-choy', 'mushrooms'],
      broth: 'miso',
      garnish: 'green-onions'
    }
  },
  {
    name: 'Udon + Tofu + Spicy Miso',
    price: 12.75,
    details: {
      base: 'udon',
      protein: 'tofu',
      vegetables: ['bean-sprouts'],
      broth: 'spicy-miso',
      garnish: 'seaweed'
    }
  }
];

export const mockSelections = {
  noodleBase: [{ name: 'Forbidden Ramen', price: 0 }],
  protein: [{ name: 'Tofu', price: 1.75 }],
  sauceBroth: [{ name: 'Miso', price: 0 }]
};

export const mockMenuItems = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with creamy sauce',
    price: 12.99,
    category: 'pasta'
  },
  {
    id: 2,
    name: 'Penne Arrabbiata',
    description: 'Spicy tomato sauce with penne',
    price: 10.99,
    category: 'pasta'
  },
  {
    id: 3,
    name: 'Forbidden Ramen',
    description: 'Traditional ramen with rich broth',
    price: 14.99,
    category: 'ramen'
  }
];

export const mockQuote = {
  quote: "The best ramen is made with love and patience",
  author: "Master Chef Yamamoto"
};

export const mockApiResponse = {
  success: true,
  data: mockMenuItems
};

export const mockErrorResponse = {
  success: false,
  error: "Failed to fetch menu items"
};
