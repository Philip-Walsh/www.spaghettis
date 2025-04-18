const mockMenuOptions = {
    noodleBase: {
        label: 'Choose Your Noodle Base',
        key: 'noodleBase',
        multi: true,
        choices: [
            { name: 'Forbidden Ramen', price: 0, icon: '🍜', tag: 'base' },
            { name: 'Neo Udon', price: 1.5, icon: '🍜', tag: 'base' },
            {
                name: 'Quantum Soba',
                price: 1.75,
                icon: '🍜',
                tag: 'base',
                defaults: { gardenPicks: ['Mushrooms', 'Bean Sprouts'] }
            },
            { name: 'Rice Noodles (GF)', price: 1.5, icon: '🍜', tag: 'base' }
        ]
    },
    protein: {
        label: 'Choose Your Protein',
        key: 'protein',
        multi: true,
        choices: [
            { name: 'Chicken', price: 2.0, icon: '🐔', tag: 'meat' },
            { name: 'Tofu', price: 1.75, icon: '🌱', tag: 'vegan' },
            { name: 'Edamame (GF)', price: 1.0, icon: '🌱', tag: 'vegan' }
        ]
    },
    gardenPicks: {
        label: 'Choose Your Garden Picks',
        key: 'gardenPicks',
        multi: true,
        choices: [
            { name: 'Bok Choy', price: 0.75, icon: '🥬', tag: 'vegan' },
            { name: 'Mushrooms', price: 1.0, icon: '🍄', tag: 'vegan' },
            { name: 'Bean Sprouts', price: 0.5, icon: '🌱', tag: 'vegetarian' }
        ]
    },
    broth: {
        label: 'Choose Your Broth',
        key: 'broth',
        multi: false,
        choices: [{ name: 'Miso', price: 0, icon: '🍜', tag: 'base' }]
    }
};

export default mockMenuOptions;
