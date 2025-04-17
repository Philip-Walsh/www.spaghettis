export const menuOptions = {
  noodleBase: {
    label: "Choose Your Noodle Base",
    key: "noodleBase",
    multi: false,
    choices: [
      {
        name: "Ramen",
        price: 0,
        icon: "🍜",
        tag: "base"
      },
      {
        name: "Harusame",
        price: 1.5,
        icon: "🍜",
        tag: "base"
      },
      {
        name: "Udon",
        price: 1.75,
        icon: "🍜",
        tag: "base"
      },
      {
        name: "Shirataki",
        price: 1.25,
        icon: "🌱",
        tag: "vegan"
      }
    ]
  },
  protein: {
    label: "Choose Your Protein",
    key: "protein",
    multi: true,
    choices: [
      {
        name: "Chicken",
        price: 2.0,
        icon: "🍗",
        tag: "meat"
      },
      {
        name: "Tofu",
        price: 1.75,
        icon: "🌱",
        tag: "vegan"
      },
      {
        name: "Shrimp",
        price: 2.5,
        icon: "🦐",
        tag: "seafood"
      },
      {
        name: "Beef",
        price: 3.0,
        icon: "🥩",
        tag: "meat"
      },
      {
        name: "Egg",
        price: 1.0,
        icon: "🍳",
        tag: "vegetarian"
      }
    ]
  },
  gardenPicks: {
    label: "Choose Your Garden Picks",
    key: "gardenPicks",
    multi: true,
    choices: [
      {
        name: "Bok Choy",
        price: 0.75,
        icon: "🥬",
        tag: "vegetarian"
      },
      {
        name: "Mushrooms",
        price: 1.0,
        icon: "🍄",
        tag: "vegetarian"
      },
      {
        name: "Bean Sprouts",
        price: 0.5,
        icon: "🌱",
        tag: "vegetarian"
      },
      {
        name: "Carrots",
        price: 0.5,
        icon: "🥕",
        tag: "vegetarian"
      },
      {
        name: "Snow Peas",
        price: 0.75,
        icon: "🌱",
        tag: "vegetarian"
      }
    ]
  },
  sauceBroth: {
    label: "Choose Your Sauce/Broth",
    key: "sauceBroth",
    multi: false,
    choices: [
      {
        name: "Miso",
        price: 0,
        icon: "🍲",
        tag: "vegetarian"
      },
      {
        name: "Spicy Miso",
        price: 0.5,
        icon: "🌶️",
        tag: "vegetarian"
      },
      {
        name: "Tonkotsu",
        price: 1.0,
        icon: "🍲",
        tag: "meat"
      },
      {
        name: "Shoyu",
        price: 0,
        icon: "🍲",
        tag: "vegetarian"
      },
      {
        name: "Curry",
        price: 1.0,
        icon: "🍛",
        tag: "vegetarian"
      }
    ]
  },
  garnish: {
    label: "Choose Your Garnish",
    key: "garnish",
    multi: true,
    choices: [
      {
        name: "Seaweed",
        price: 0.5,
        icon: "🌿",
        tag: "vegetarian"
      },
      {
        name: "Green Onions",
        price: 0.5,
        icon: "🧅",
        tag: "vegetarian"
      },
      {
        name: "Egg",
        price: 0.75,
        icon: "🍳",
        tag: "vegetarian"
      },
      {
        name: "Nori",
        price: 0.5,
        icon: "🌿",
        tag: "vegetarian"
      },
      {
        name: "Sesame Seeds",
        price: 0.25,
        icon: "🌱",
        tag: "vegetarian"
      }
    ]
  }
};
