import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RamenBuilder from '../../components/RamenBuilder';
import Cart from '../../components/Cart';

// Mock the useMenuData hook
jest.mock('../../components/hooks/useMenuData', () => ({
    useMenuData: jest.fn()
}));

// Mock the utils function
jest.mock('../../components/utils', () => ({
    calculateTotalPrice: jest.fn()
}));

describe('End-to-End Integration Tests', () => {
    const mockMenuOptions = {
        noodleBase: {
            label: 'Choose Your Noodle Base',
            key: 'noodleBase',
            multi: false,
            choices: [
                {
                    id: 1,
                    name: 'Forbidden Ramen',
                    price: 0,
                    icon: '🥷🍜',
                    description: 'Firm wheat noodles with a springy texture.',
                    tags: ['vegetarian'],
                    defaults: {},
                    isActive: true,
                    sortOrder: 0
                },
                {
                    id: 2,
                    name: 'Neo Udon',
                    price: 1.5,
                    icon: '🤖🍜',
                    description: 'Thick-cut udon with a smooth surface.',
                    tags: ['vegetarian'],
                    defaults: { gardenPicks: ['Bok Choy'] },
                    isActive: true,
                    sortOrder: 1
                }
            ]
        },
        protein: {
            label: 'Choose Your Protein',
            key: 'protein',
            multi: true,
            choices: [
                {
                    id: 3,
                    name: 'Chicken',
                    price: 2.0,
                    icon: '🍗',
                    description: 'Tender, marinated chicken.',
                    tags: ['meat'],
                    defaults: {},
                    isActive: true,
                    sortOrder: 0
                },
                {
                    id: 4,
                    name: 'Tofu',
                    price: 1.75,
                    icon: '🌱',
                    description: 'Firm, plant-based tofu.',
                    tags: ['vegetarian', 'vegan'],
                    defaults: {},
                    isActive: true,
                    sortOrder: 1
                }
            ]
        },
        gardenPicks: {
            label: 'Choose Your Garden Picks',
            key: 'gardenPicks',
            multi: true,
            choices: [
                {
                    id: 5,
                    name: 'Bok Choy',
                    price: 0.75,
                    icon: '🥬',
                    description: 'Fresh-cut bok choy.',
                    tags: ['vegetarian', 'vegan'],
                    defaults: {},
                    isActive: true,
                    sortOrder: 0
                },
                {
                    id: 6,
                    name: 'Mushrooms',
                    price: 1.0,
                    icon: '🍄',
                    description: 'Assorted mushrooms.',
                    tags: ['vegetarian', 'vegan'],
                    defaults: {},
                    isActive: true,
                    sortOrder: 1
                }
            ]
        },
        sauceBroth: {
            label: 'Choose Your Sauce/Broth',
            key: 'sauceBroth',
            multi: false,
            choices: [
                {
                    id: 7,
                    name: 'Miso',
                    price: 0,
                    icon: '🍲',
                    description: 'Classic fermented miso broth.',
                    tags: ['vegetarian'],
                    defaults: {},
                    isActive: true,
                    sortOrder: 0
                },
                {
                    id: 8,
                    name: 'Spicy Miso',
                    price: 0.5,
                    icon: '🌶️',
                    description: 'A balanced miso base with heat.',
                    tags: ['vegetarian'],
                    defaults: {},
                    isActive: true,
                    sortOrder: 1
                }
            ]
        },
        garnish: {
            label: 'Choose Your Garnish',
            key: 'garnish',
            multi: true,
            choices: [
                {
                    id: 9,
                    name: 'Green Onions',
                    price: 0,
                    icon: '🧅',
                    description: 'Fresh-cut green onions.',
                    tags: ['vegetarian', 'vegan'],
                    defaults: {},
                    isActive: true,
                    sortOrder: 0
                },
                {
                    id: 10,
                    name: 'Nori',
                    price: 0.25,
                    icon: '🌊',
                    description: 'Crisp seaweed sheets.',
                    tags: ['vegetarian', 'vegan'],
                    defaults: {},
                    isActive: true,
                    sortOrder: 1
                }
            ]
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Complete Ramen Building Flow', () => {
        it('should allow user to build a complete ramen bowl with database data', async () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: mockMenuOptions,
                loading: false,
                error: null
            });

            render(<RamenBuilder />);

            // Step 1: Select noodle base
            await waitFor(() => {
                expect(screen.getByText('Forbidden Ramen')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('Forbidden Ramen'));

            // Should be able to proceed to next step
            const nextButton = screen.getByText('Next');
            expect(nextButton).not.toBeDisabled();

            // Step 2: Select protein
            fireEvent.click(nextButton);
            await waitFor(() => {
                expect(screen.getByText('Chicken')).toBeInTheDocument();
                expect(screen.getByText('Tofu')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('Chicken'));

            // Step 3: Select vegetables
            fireEvent.click(screen.getByText('Next'));
            await waitFor(() => {
                expect(screen.getByText('Bok Choy')).toBeInTheDocument();
                expect(screen.getByText('Mushrooms')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('Bok Choy'));
            fireEvent.click(screen.getByText('Mushrooms'));

            // Step 4: Select broth
            fireEvent.click(screen.getByText('Next'));
            await waitFor(() => {
                expect(screen.getByText('Miso')).toBeInTheDocument();
                expect(screen.getByText('Spicy Miso')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('Spicy Miso'));

            // Step 5: Select garnish
            fireEvent.click(screen.getByText('Next'));
            await waitFor(() => {
                expect(screen.getByText('Green Onions')).toBeInTheDocument();
                expect(screen.getByText('Nori')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('Green Onions'));

            // Should be able to add to cart
            fireEvent.click(screen.getByText('Next'));
            await waitFor(() => {
                expect(screen.getByText('Add to Cart')).toBeInTheDocument();
            });

            const addToCartButton = screen.getByText('Add to Cart');
            expect(addToCartButton).not.toBeDisabled();
        });

        it('should calculate total price correctly with database prices', async () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: mockMenuOptions,
                loading: false,
                error: null
            });

            render(<RamenBuilder />);

            // Select expensive options to test price calculation
            await waitFor(() => {
                expect(screen.getByText('Neo Udon')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('Neo Udon')); // +1.50

            const nextButton = screen.getByText('Next');
            fireEvent.click(nextButton);

            await waitFor(() => {
                expect(screen.getByText('Chicken')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('Chicken')); // +2.00

            fireEvent.click(screen.getByText('Next'));

            await waitFor(() => {
                expect(screen.getByText('Mushrooms')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('Mushrooms')); // +1.00

            fireEvent.click(screen.getByText('Next'));

            await waitFor(() => {
                expect(screen.getByText('Spicy Miso')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('Spicy Miso')); // +0.50

            fireEvent.click(screen.getByText('Next'));

            await waitFor(() => {
                expect(screen.getByText('Nori')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('Nori')); // +0.25

            fireEvent.click(screen.getByText('Next'));

            // Total should be: 2.50 (base) + 1.50 (Neo Udon) + 2.00 (Chicken) + 1.00 (Mushrooms) + 0.50 (Spicy Miso) + 0.25 (Nori) = 7.75
            await waitFor(() => {
                expect(screen.getByText(/7\.75/)).toBeInTheDocument();
            });
        });
    });

    describe('Cart Integration', () => {
        it('should display cart items with correct database prices', async () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: mockMenuOptions,
                loading: false,
                error: null
            });

            const mockCartItems = [
                {
                    id: 1,
                    name: 'Custom Ramen Bowl',
                    price: 6.25,
                    details: {
                        base: 'Neo Udon',
                        protein: ['Chicken'],
                        vegetables: ['Bok Choy'],
                        broth: 'Spicy Miso',
                        garnish: ['Green Onions']
                    }
                }
            ];

            render(<Cart items={mockCartItems} onRemoveItem={jest.fn()} />);

            await waitFor(() => {
                expect(screen.getByText('Custom Ramen Bowl')).toBeInTheDocument();
                expect(screen.getByText('Neo Udon')).toBeInTheDocument();
                expect(screen.getByText('Chicken')).toBeInTheDocument();
                expect(screen.getByText('Bok Choy')).toBeInTheDocument();
                expect(screen.getByText('Spicy Miso')).toBeInTheDocument();
                expect(screen.getByText('Green Onions')).toBeInTheDocument();
            });

            // Should show individual prices
            expect(screen.getByText('$4.00')).toBeInTheDocument(); // Base + Neo Udon
            expect(screen.getByText('$2.00')).toBeInTheDocument(); // Chicken
            expect(screen.getByText('$0.75')).toBeInTheDocument(); // Bok Choy
            expect(screen.getByText('$0.50')).toBeInTheDocument(); // Spicy Miso
            expect(screen.getByText('$0.00')).toBeInTheDocument(); // Green Onions
        });
    });

    describe('Error Recovery', () => {
        it('should handle database connection issues gracefully', async () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');

            // Simulate initial loading
            useMenuData.mockReturnValue({
                menuOptions: null,
                loading: true,
                error: null
            });

            const { rerender } = render(<RamenBuilder />);
            expect(screen.getByText('Loading menu options...')).toBeInTheDocument();

            // Simulate error
            useMenuData.mockReturnValue({
                menuOptions: null,
                loading: false,
                error: 'Database connection failed'
            });

            rerender(<RamenBuilder />);
            expect(screen.getByText(/Error loading menu options/)).toBeInTheDocument();

            // Simulate successful fallback to static data
            useMenuData.mockReturnValue({
                menuOptions: mockMenuOptions,
                loading: false,
                error: null
            });

            rerender(<RamenBuilder />);
            await waitFor(() => {
                expect(screen.getByText('Forbidden Ramen')).toBeInTheDocument();
            });
        });
    });

    describe('Data Consistency', () => {
        it('should maintain data consistency across components', async () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: mockMenuOptions,
                loading: false,
                error: null
            });

            // Test that both components use the same data source
            const { rerender } = render(<RamenBuilder />);

            await waitFor(() => {
                expect(screen.getByText('Forbidden Ramen')).toBeInTheDocument();
            });

            // Switch to Cart component
            const mockCartItems = [
                {
                    id: 1,
                    name: 'Test Bowl',
                    price: 4.00,
                    details: {
                        base: 'Forbidden Ramen',
                        protein: [],
                        vegetables: [],
                        broth: 'Miso',
                        garnish: []
                    }
                }
            ];

            rerender(<Cart items={mockCartItems} onRemoveItem={jest.fn()} />);

            await waitFor(() => {
                expect(screen.getByText('Forbidden Ramen')).toBeInTheDocument();
                expect(screen.getByText('Miso')).toBeInTheDocument();
            });

            // Verify the same item data is used
            const forbiddenRamenElement = screen.getByText('Forbidden Ramen');
            expect(forbiddenRamenElement).toBeInTheDocument();
        });
    });
}); 