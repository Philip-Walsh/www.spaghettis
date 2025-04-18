export const PRICES = {
    NOODLES: {
        FORBIDDEN_RAMEN: 0,
        QUANTUM_SOBA: 1.75,
        NEO_UDON: 1.5
    },
    PROTEINS: {
        TOFU: 1.75,
        CHICKEN: 2.0,
        SHRIMP: 2.5
    },
    GARDEN_PICKS: {
        BOK_CHOY: 0.75,
        MUSHROOMS: 1.0,
        BEAN_SPROUTS: 0.5,
        CARROTS: 0.5
    },
    BROTHS: {
        MISO: 0,
        CURRY: 1.0
    },
    GARNISHES: {
        SEAWEED: 0.5,
        EGG: 0.75
    }
};

export const calculateTotal = (selections) => {
    let total = 0;

    // Add noodle price
    if (selections.noodle) {
        const noodle = Object.entries(PRICES.NOODLES).find(
            ([key]) => key.toLowerCase() === selections.noodle.toLowerCase()
        );
        if (noodle) total += noodle[1];
    }

    // Add protein prices
    selections.protein.forEach((protein) => {
        const proteinPrice = Object.entries(PRICES.PROTEINS).find(
            ([key]) => key.toLowerCase() === protein.toLowerCase()
        );
        if (proteinPrice) total += proteinPrice[1];
    });

    // Add garden pick prices
    selections.garden.forEach((pick) => {
        const pickPrice = Object.entries(PRICES.GARDEN_PICKS).find(([key]) => key.toLowerCase() === pick.toLowerCase());
        if (pickPrice) total += pickPrice[1];
    });

    // Add broth price
    if (selections.broth) {
        const broth = Object.entries(PRICES.BROTHS).find(
            ([key]) => key.toLowerCase() === selections.broth.toLowerCase()
        );
        if (broth) total += broth[1];
    }

    // Add garnish prices
    selections.garnish.forEach((garnish) => {
        const garnishPrice = Object.entries(PRICES.GARNISHES).find(
            ([key]) => key.toLowerCase() === garnish.toLowerCase()
        );
        if (garnishPrice) total += garnishPrice[1];
    });

    return total;
};
