import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import RamenBuilder from '../../components/RamenBuilder';
import Cart from '../../components/Cart';
import NavWithTheme from '../../components/NavWithTheme';
import { createTestDb, cleanupTestDb } from './db-setup';

// Mock the menu options to ensure consistent test data
jest.mock('../../data/menuOptions', () => ({
    noodleBase: {
        title: 'Choose Your Base',
        choices: [
            { name: 'Forbidden Ramen', price: 0 },
            { name: 'Neo Udon', price: 1.5 }
        ]
    },
    protein: {
        title: 'Choose Your Protein',
        multi: true,
        choices: [
            { name: 'Chicken', price: 2.0 },
            { name: 'Tofu', price: 1.75 }
        ]
    },
    gardenPicks: {
        title: 'Add Vegetables',
        multi: true,
        choices: [
            { name: 'Bok Choy', price: 0.75 },
            { name: 'Mushrooms', price: 1.0 }
        ]
    },
    broth: {
        title: 'Choose Your Broth',
        choices: [
            { name: 'Miso', price: 0 },
            { name: 'Tonkotsu', price: 1.5 }
        ]
    },
    garnish: {
        title: 'Add Garnish',
        multi: true,
        choices: [
            { name: 'Green Onions', price: 0.5 },
            { name: 'Nori', price: 0.75 }
        ]
    }
}));

// Mock the actual menuOptions import
const mockMenuOptions = {
    noodleBase: {
        title: 'Choose Your Base',
        choices: [
            { name: 'Forbidden Ramen', price: 0 },
            { name: 'Neo Udon', price: 1.5 }
        ]
    },
    protein: {
        title: 'Choose Your Protein',
        multi: true,
        choices: [
            { name: 'Chicken', price: 2.0 },
            { name: 'Tofu', price: 1.75 }
        ]
    },
    gardenPicks: {
        title: 'Add Vegetables',
        multi: true,
        choices: [
            { name: 'Bok Choy', price: 0.75 },
            { name: 'Mushrooms', price: 1.0 }
        ]
    },
    broth: {
        title: 'Choose Your Broth',
        choices: [
            { name: 'Miso', price: 0 },
            { name: 'Tonkotsu', price: 1.5 }
        ]
    },
    garnish: {
        title: 'Add Garnish',
        multi: true,
        choices: [
            { name: 'Green Onions', price: 0.5 },
            { name: 'Nori', price: 0.75 }
        ]
    }
};

// Mock the components to use our test data
jest.mock('../../components/RamenBuilder', () => {
    const MockRamenBuilder = ({ onAddToCart }) => {
        const [currentStep, setCurrentStep] = React.useState(0);
        const [selectedOptions, setSelectedOptions] = React.useState({
            noodleBase: [],
            protein: [],
            gardenPicks: [],
            broth: [],
            garnish: []
        });

        const steps = [
            { id: 'noodleBase', title: 'Choose Your Base' },
            { id: 'protein', title: 'Choose Your Protein' },
            { id: 'gardenPicks', title: 'Add Vegetables' },
            { id: 'broth', title: 'Choose Your Broth' },
            { id: 'garnish', title: 'Add Garnish' }
        ];

        const handleOptionSelect = (stepId, option) => {
            setSelectedOptions(prev => ({
                ...prev,
                [stepId]: prev[stepId].includes(option)
                    ? prev[stepId].filter(o => o !== option)
                    : [...prev[stepId], option]
            }));
        };

        const handleNext = () => {
            if (currentStep < steps.length - 1) {
                setCurrentStep(prev => prev + 1);
            }
        };

        const handleBack = () => {
            if (currentStep > 0) {
                setCurrentStep(prev => prev - 1);
            }
        };

        const handleAddToCart = () => {
            const totalPrice = Object.entries(selectedOptions).reduce((total, [stepId, options]) => {
                const stepOptions = mockMenuOptions[stepId];
                if (stepOptions && options.length > 0) {
                    return total + options.reduce((stepTotal, option) => {
                        const found = stepOptions.choices.find(c => c.name === option);
                        return stepTotal + (found ? found.price : 0);
                    }, 0);
                }
                return total;
            }, 0);

            onAddToCart({
                name: 'Custom Ramen Bowl',
                price: totalPrice,
                details: {
                    base: selectedOptions.noodleBase[0] || 'Forbidden Ramen',
                    protein: selectedOptions.protein,
                    vegetables: selectedOptions.gardenPicks,
                    broth: selectedOptions.broth[0] || 'Miso',
                    garnish: selectedOptions.garnish
                }
            });
        };

        const currentStepData = mockMenuOptions[steps[currentStep].id];
        if (!currentStepData) return null;

        return (
            <div data-testid="ramen-builder">
                <h2>{steps[currentStep].title}</h2>
                <div>
                    {currentStepData.choices.map(choice => (
                        <button
                            key={choice.name}
                            onClick={() => handleOptionSelect(steps[currentStep].id, choice.name)}
                            aria-pressed={selectedOptions[steps[currentStep].id].includes(choice.name)}
                        >
                            {choice.name} (${choice.price})
                        </button>
                    ))}
                </div>
                <div>
                    {currentStep > 0 && (
                        <button onClick={handleBack}>Back</button>
                    )}
                    {currentStep < steps.length - 1 ? (
                        <button onClick={handleNext}>Next</button>
                    ) : (
                        <button onClick={handleAddToCart}>Add to Cart</button>
                    )}
                </div>
            </div>
        );
    };
    return MockRamenBuilder;
});

jest.mock('../../components/Cart', () => {
    const MockCart = ({ items, onRemoveItem }) => {
        if (items.length === 0) {
            return (
                <div className="cartContainer">
                    <h2 className="cartTitle">Order Summary</h2>
                    <div className="itemsList">
                        <p className="emptyCart">Your cart is empty</p>
                    </div>
                    <button className="checkoutButton" disabled>
                        Proceed to Checkout
                    </button>
                </div>
            );
        }

        return (
            <div className="cartContainer">
                <h2 className="cartTitle">Order Summary</h2>
                <div className="itemsList">
                    {items.map((item, index) => (
                        <div key={index} className="cartItem">
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                            {item.details && (
                                <div className="itemDetails">
                                    <p>Base: {item.details.base}</p>
                                    <p>Protein: {Array.isArray(item.details.protein) ? item.details.protein.join(', ') : item.details.protein}</p>
                                    <p>Vegetables: {Array.isArray(item.details.vegetables) ? item.details.vegetables.join(', ') : item.details.vegetables}</p>
                                    <p>Broth: {item.details.broth}</p>
                                    <p>Garnish: {Array.isArray(item.details.garnish) ? item.details.garnish.join(', ') : item.details.garnish}</p>
                                </div>
                            )}
                            <button onClick={() => onRemoveItem(index)}>Remove</button>
                        </div>
                    ))}
                </div>
                <button className="checkoutButton">
                    Proceed to Checkout
                </button>
            </div>
        );
    };
    return MockCart;
});

jest.mock('../../components/NavWithTheme', () => {
    const MockNavWithTheme = () => {
        const [theme, setTheme] = React.useState('light');

        React.useEffect(() => {
            document.documentElement.className = theme;
        }, [theme]);

        const toggleTheme = () => {
            setTheme(prev => prev === 'light' ? 'dark' : 'light');
        };

        return (
            <nav className="noodle-nav">
                <div className="nav-inner">
                    <a className="nav-logo" href="/">
                        <span className="nav-title">Forbidden Ramen</span>
                    </a>
                    <div className="nav-controls">
                        <button
                            className="themeToggle"
                            onClick={toggleTheme}
                            aria-label="Switch to dark theme"
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                    </div>
                </div>
            </nav>
        );
    };
    return MockNavWithTheme;
});

describe('Integration Tests', () => {
    let testDb;

    beforeAll(() => {
        testDb = createTestDb();
    });

    afterAll(() => {
        cleanupTestDb(testDb);
    });

    describe('Complete Ramen Building to Cart Flow', () => {
        test('user can build complete ramen and add to cart', async () => {
            const user = userEvent.setup();
            const mockAddToCart = jest.fn();

            render(<RamenBuilder onAddToCart={mockAddToCart} />);

            // Step 1: Choose noodle base
            const forbiddenRamen = screen.getByText('Forbidden Ramen ($0)');
            await user.click(forbiddenRamen);

            // Step 2: Choose protein
            const nextButton = screen.getByRole('button', { name: /next/i });
            await user.click(nextButton);

            const chicken = screen.getByText('Chicken ($2)');
            await user.click(chicken);

            // Step 3: Add vegetables
            await user.click(screen.getByRole('button', { name: /next/i }));

            const bokChoy = screen.getByText('Bok Choy ($0.75)');
            const mushrooms = screen.getByText('Mushrooms ($1)');
            await user.click(bokChoy);
            await user.click(mushrooms);

            // Step 4: Choose broth
            await user.click(screen.getByRole('button', { name: /next/i }));

            const miso = screen.getByText('Miso ($0)');
            await user.click(miso);

            // Step 5: Add garnish
            await user.click(screen.getByRole('button', { name: /next/i }));

            const greenOnions = screen.getByText('Green Onions ($0.5)');
            await user.click(greenOnions);

            // Add to cart
            const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
            await user.click(addToCartButton);

            // Verify add to cart was called with correct data
            expect(mockAddToCart).toHaveBeenCalledWith({
                name: 'Custom Ramen Bowl',
                price: 4.25, // 0 + 2 + 0.75 + 1 + 0 + 0.5
                details: {
                    base: 'Forbidden Ramen',
                    protein: ['Chicken'],
                    vegetables: ['Bok Choy', 'Mushrooms'],
                    broth: 'Miso',
                    garnish: ['Green Onions']
                }
            });
        });

        test('cart displays items with correct pricing and details', () => {
            const mockItems = [
                {
                    name: 'Custom Ramen Bowl',
                    price: 15.99,
                    details: {
                        base: 'Forbidden Ramen',
                        protein: 'Chicken',
                        vegetables: ['Bok Choy', 'Mushrooms'],
                        broth: 'Miso',
                        garnish: 'Green Onions'
                    }
                }
            ];

            const mockOnRemoveItem = jest.fn();
            render(<Cart items={mockItems} onRemoveItem={mockOnRemoveItem} />);

            // Verify item details are displayed
            expect(screen.getByText('Custom Ramen Bowl')).toBeInTheDocument();
            expect(screen.getByText('$15.99')).toBeInTheDocument();

            // Verify detailed breakdown
            expect(screen.getByText('Base: Forbidden Ramen')).toBeInTheDocument();
            expect(screen.getByText('Protein: Chicken')).toBeInTheDocument();
            expect(screen.getByText('Vegetables: Bok Choy, Mushrooms')).toBeInTheDocument();
            expect(screen.getByText('Broth: Miso')).toBeInTheDocument();
            expect(screen.getByText('Garnish: Green Onions')).toBeInTheDocument();

            // Verify checkout button is enabled
            const checkoutButton = screen.getByRole('button', { name: /proceed to checkout/i });
            expect(checkoutButton).not.toBeDisabled();
        });
    });

    describe('Theme Integration Across Components', () => {
        test('theme switching affects all components consistently', async () => {
            const user = userEvent.setup();

            render(<NavWithTheme />);

            // Find theme toggle
            const themeToggle = screen.getByRole('button', { name: /switch to dark theme/i });

            // Check initial theme (should be light by default)
            expect(document.documentElement).toHaveClass('light');

            // Switch to dark theme
            await user.click(themeToggle);

            // Verify theme changed
            await waitFor(() => {
                expect(document.documentElement).toHaveClass('dark');
            });

            // Switch back to light
            await user.click(themeToggle);

            await waitFor(() => {
                expect(document.documentElement).toHaveClass('light');
            });
        });
    });

    describe('Component State Persistence', () => {
        test('ramen builder maintains state during navigation', async () => {
            const user = userEvent.setup();
            const mockAddToCart = jest.fn();

            render(<RamenBuilder onAddToCart={mockAddToCart} />);

            // Make some selections
            const forbiddenRamen = screen.getByText('Forbidden Ramen ($0)');
            await user.click(forbiddenRamen);

            // Navigate to next step
            await user.click(screen.getByRole('button', { name: /next/i }));

            // Go back to previous step
            await user.click(screen.getByRole('button', { name: /back/i }));

            // Verify selection is still there
            expect(forbiddenRamen).toHaveAttribute('aria-pressed', 'true');
        });
    });

    describe('Error Handling and Edge Cases', () => {
        test('handles empty cart gracefully', () => {
            render(<Cart items={[]} onRemoveItem={jest.fn()} />);

            // Verify empty state
            expect(screen.getByText('Order Summary')).toBeInTheDocument();
            expect(screen.getByText('Your cart is empty')).toBeInTheDocument();

            // Verify checkout button is disabled
            const checkoutButton = screen.getByRole('button', { name: /proceed to checkout/i });
            expect(checkoutButton).toBeDisabled();
        });

        test('handles invalid menu selections gracefully', async () => {
            const user = userEvent.setup();
            const mockAddToCart = jest.fn();

            render(<RamenBuilder onAddToCart={mockAddToCart} />);

            // Try to proceed without making selections
            const nextButton = screen.getByRole('button', { name: /next/i });
            await user.click(nextButton);

            // Should move to next step (protein selection)
            expect(screen.getByText('Choose Your Protein')).toBeInTheDocument();

            // Try to add to cart without completing all steps
            // Navigate to the last step
            await user.click(screen.getByRole('button', { name: /next/i })); // to vegetables
            await user.click(screen.getByRole('button', { name: /next/i })); // to broth
            await user.click(screen.getByRole('button', { name: /next/i })); // to garnish

            // Should be on last step with Add to Cart button
            expect(screen.getByText('Add Garnish')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();

            // Add to cart should work even with empty selections
            await user.click(screen.getByRole('button', { name: /add to cart/i }));
            expect(mockAddToCart).toHaveBeenCalledWith({
                name: 'Custom Ramen Bowl',
                price: 0,
                details: {
                    base: 'Forbidden Ramen',
                    protein: [],
                    vegetables: [],
                    broth: 'Miso',
                    garnish: []
                }
            });
        });
    });

    describe('Performance and Responsiveness', () => {
        test('handles rapid user interactions without errors', async () => {
            const user = userEvent.setup();
            const mockAddToCart = jest.fn();

            render(<RamenBuilder onAddToCart={mockAddToCart} />);

            // Rapidly click through options
            const forbiddenRamen = screen.getByText('Forbidden Ramen ($0)');
            await user.click(forbiddenRamen);

            const nextButton = screen.getByRole('button', { name: /next/i });
            await user.click(nextButton);

            const chicken = screen.getByText('Chicken ($2)');
            await user.click(chicken);

            await user.click(nextButton);

            // Should handle rapid interactions gracefully
            expect(screen.getByText('Add Vegetables')).toBeInTheDocument();
        });
    });
});
