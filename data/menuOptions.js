export const menuOptions = {
  noodleBase: {
    label: "Choose Your Noodle Base",
    key: "noodleBase",
    multi: false,
    choices: [
      {
        name: "Forbidden Ramen",
        price: 0,
        icon: "🥷🍜",
        tags: ["vegetarian"],
        description: "Firm wheat noodles with a springy texture, developed for a bold, modern palate.",
        defaults: { gardenPicks: [] }
      },
      {
        name: "Neo Udon",
        price: 1.5,
        icon: "🤖🍜",
        tags: ["vegetarian"],
        description: "Thick-cut udon with a smooth surface and substantial bite, optimized for heavier pairings.",
        defaults: { gardenPicks: ['Bok Choy'] }
      },
      {
        name: "Quantum Soba",
        price: 1.75,
        icon: "🌀🥢",
        tags: ["vegetarian"],
        description: "Buckwheat noodles with a subtle nutty finish, high in fiber and precision-cooked for balance.",
        defaults: { gardenPicks: ['Mushrooms', 'Bean Sprouts'] }
      },
      {
        name: "Rice Noodles",
        price: 1.5,
        icon: "🌾🚫",
        tags: ["vegetarian", "glutenfree"],
        description: "Light, gluten-free noodles made from polished rice flour—clean, neutral, and versatile.",
        defaults: { gardenPicks: [] }
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
        tags: ["meat"],
        description: "Tender, marinated chicken, high in protein and cooked to preserve flavor integrity."
      },
      {
        name: "Tofu",
        price: 1.75,
        icon: "🌱",
        tags: ["vegetarian", "vegan"],
        description: "Firm, plant-based tofu, delicately seasoned and lightly seared for structure and depth."
      },
      {
        name: "Shrimp",
        price: 2.5,
        icon: "🦐",
        tags: ["seafood"],
        description: "Sustainably sourced shrimp, lightly poached to retain natural sweetness and texture."
      },
      {
        name: "Beef",
        price: 3.0,
        icon: "🥩",
        tags: ["meat"],
        description: "Thin-sliced beef, slow-cooked for richness and a clean finish."
      },
      {
        name: "Egg",
        price: 1.0,
        icon: "🍳",
        tags: ["vegetarian"],
        description: "Soft-boiled with a golden center—an essential, well-balanced addition."
      },
      {
        name: "Edamame",
        price: 1.0,
        icon: "🌾🚫",
        tags: ["vegetarian", "vegan", "glutenfree"],
        description: "Steamed young soybeans, nutrient-dense and naturally gluten free."
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
        tags: ["vegetarian", "vegan"],
        description: "Fresh-cut bok choy, lightly blanched for a crisp, hydrating crunch."
      },
      {
        name: "Mushrooms",
        price: 1.0,
        icon: "🍄",
        tags: ["vegetarian", "vegan"],
        description: "Assorted mushrooms sautéed for depth and layered umami."
      },
      {
        name: "Bean Sprouts",
        price: 0.5,
        icon: "🌱",
        tags: ["vegetarian", "vegan"],
        description: "Clean, crisp sprouts offering texture and subtle earthiness."
      },
      {
        name: "Carrots",
        price: 0.5,
        icon: "🥕",
        tags: ["vegetarian", "vegan"],
        description: "Thin-sliced carrots, gently sweet and vibrant in color."
      },
      {
        name: "Snow Peas",
        price: 0.75,
        icon: "🌱",
        tags: ["vegetarian", "vegan"],
        description: "Delicate and fresh, snap-cooked to preserve natural texture."
      },
      {
        name: "Avocado",
        price: 1.25,
        icon: "🥑",
        tags: ["vegetarian", "vegan", "glutenfree"],
        description: "Creamy avocado slices, rich in healthy fats and naturally gluten free."
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
        tags: ["vegetarian"],
        description: "Classic fermented miso broth with a warm, rounded flavor."
      },
      {
        name: "Spicy Miso",
        price: 0.5,
        icon: "🌶️",
        tags: ["vegetarian"],
        description: "A balanced miso base elevated with calibrated heat and aromatic depth."
      },
      {
        name: "Clear Dashi",
        price: 0.5,
        icon: "🌾🚫",
        tags: ["vegetarian", "glutenfree"],
        description: "Light, transparent broth crafted from kombu and shiitake. Gluten free."
      },
      {
        name: "Tonkotsu",
        price: 1.0,
        icon: "🍲",
        tags: ["meat"],
        description: "Deeply savory pork broth, slow-simmered for richness and clarity."
      },
      {
        name: "Shoyu",
        price: 0,
        icon: "🍲",
        tags: ["vegetarian"],
        description: "A soy-based broth with refined salinity and traditional depth."
      },
      {
        name: "Curry",
        price: 1.0,
        icon: "🍛",
        tags: ["vegetarian"],
        description: "Japanese-style curry broth with warm spice and a silky finish."
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
        tags: ["vegetarian", "vegan"],
        description: "Crisp and mineral-rich, a subtle oceanic accent."
      },
      {
        name: "Green Onions",
        price: 0.5,
        icon: "🧅",
        tags: ["vegetarian", "vegan"],
        description: "Fresh-cut for brightness and a clean aromatic finish."
      },
      {
        name: "Egg",
        price: 0.75,
        icon: "🍳",
        tags: ["vegetarian"],
        description: "Soft-boiled, seasoned—an understated yet essential addition."
      },
      {
        name: "Nori",
        price: 0.5,
        icon: "🌿",
        tags: ["vegetarian", "vegan"],
        description: "Thin sheets of dried seaweed for savory depth and visual contrast."
      },
      {
        name: "Sesame Seeds",
        price: 0.25,
        icon: "🌱",
        tags: ["vegetarian", "vegan"],
        description: "Lightly toasted, providing texture and a gentle nuttiness."
      }
    ]
  }
};
