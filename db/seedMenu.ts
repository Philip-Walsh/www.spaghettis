import { MenuService } from './menuService';

interface MenuChoice {
    name: string;
    price: number;
    icon: string;
    tags: string[];
    description: string;
    defaults?: Record<string, any>;
}

interface MenuCategoryData {
    label: string;
    key: string;
    multi: boolean;
    choices: MenuChoice[];
}

// Import the current menu data
const currentMenuData: Record<string, MenuCategoryData> = {
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
            },
            {
                name: "Glass Noodles",
                price: 1.75,
                icon: "🧊🍜",
                tags: ["vegetarian", "glutenfree"],
                description: "Translucent noodles made from mung bean starch. Springy, slippery, and ideal for lighter broths.",
                defaults: { gardenPicks: ['Snow Peas', 'Carrots'] }
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
            },
            {
                name: "Vegan 'Pork'",
                price: 2.0,
                icon: "🌱🐷",
                tags: ["vegan"],
                description: "Plant-based protein with smoky undertones, engineered for depth and chew."
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
            },
            {
                name: "Daikon Radish",
                price: 0.75,
                icon: "⚪",
                tags: ["vegetarian", "vegan", "glutenfree"],
                description: "Cool, crisp, and mildly peppery. Adds balance and bite."
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
            }
        ]
    },
    garnish: {
        label: "Choose Your Garnish",
        key: "garnish",
        multi: true,
        choices: [
            {
                name: "Green Onions",
                price: 0,
                icon: "🧅",
                tags: ["vegetarian", "vegan"],
                description: "Fresh-cut green onions for brightness and aromatic lift."
            },
            {
                name: "Nori",
                price: 0.25,
                icon: "🌊",
                tags: ["vegetarian", "vegan"],
                description: "Crisp seaweed sheets, rich in minerals and oceanic umami."
            },
            {
                name: "Sesame Seeds",
                price: 0.25,
                icon: "⚫",
                tags: ["vegetarian", "vegan"],
                description: "Toasted sesame seeds for nutty depth and textural contrast."
            },
            {
                name: "Chili Oil",
                price: 0.5,
                icon: "🌶️",
                tags: ["vegetarian", "vegan"],
                description: "House-made chili oil with calibrated heat and aromatic complexity."
            },
            {
                name: "Bamboo Shoots",
                price: 0.5,
                icon: "🎋",
                tags: ["vegetarian", "vegan"],
                description: "Tender bamboo shoots, lightly seasoned and naturally crisp."
            }
        ]
    }
};

async function seedMenu() {
    try {
        console.log('Starting menu seeding...');

        // Create categories first
        const categories = [];
        for (const [key, categoryData] of Object.entries(currentMenuData)) {
            const category = await MenuService.addCategory({
                key: categoryData.key,
                label: categoryData.label,
                multi: categoryData.multi,
                sortOrder: categories.length
            });
            categories.push(category);
            console.log(`Created category: ${category.label}`);
        }

        // Create menu items
        for (const [key, categoryData] of Object.entries(currentMenuData)) {
            const category = categories.find(c => c.key === key);
            if (!category) continue;

            for (let i = 0; i < categoryData.choices.length; i++) {
                const choice = categoryData.choices[i];
                const item = await MenuService.addItem({
                    categoryId: category.id,
                    name: choice.name,
                    price: choice.price,
                    icon: choice.icon,
                    description: choice.description,
                    tags: choice.tags || [],
                    defaults: choice.defaults || {},
                    isActive: true,
                    sortOrder: i
                });
                console.log(`Created menu item: ${item.name} in ${category.label}`);
            }
        }

        console.log('Menu seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding menu:', error);
        throw error;
    }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
    seedMenu()
        .then(() => {
            console.log('Seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Seeding failed:', error);
            process.exit(1);
        });
}

export { seedMenu }; 