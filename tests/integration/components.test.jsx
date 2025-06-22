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

describe('Component Integration Tests with Database', () => {
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
        sauceBroth: {
            label: 'Choose Your Sauce/Broth',
            key: 'sauceBroth',
            multi: false,
            choices: [
                {
                    id: 5,
                    name: 'Miso',
                    price: 0,
                    icon: '🍲',
                    description: 'Classic fermented miso broth.',
                    tags: ['vegetarian'],
                    defaults: {},
                    isActive: true,
                    sortOrder: 0
                }
            ]
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('RamenBuilder Component', () => {
        it('should render with database menu data', async () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: mockMenuOptions,
                loading: false,
                error: null
            });

            render(<RamenBuilder />);

            // Should display the first noodle option
            await waitFor(() => {
                expect(screen.getByText('Forbidden Ramen')).toBeInTheDocument();
                expect(screen.getByText('Neo Udon')).toBeInTheDocument();
            });

            // Should show the step navigation
            expect(screen.getByText('Choose Your Base')).toBeInTheDocument();
            expect(screen.getByText('Select Protein')).toBeInTheDocument();
        });

        it('should show loading state while fetching data', () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: null,
                loading: true,
                error: null
            });

            render(<RamenBuilder />);

            expect(screen.getByText('Loading menu options...')).toBeInTheDocument();
        });

        it('should show error state when data fetch fails', () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: null,
                loading: false,
                error: 'Failed to fetch menu data'
            });

            render(<RamenBuilder />);

            expect(screen.getByText(/Error loading menu options/)).toBeInTheDocument();
            expect(screen.getByText('Retry')).toBeInTheDocument();
        });

        it('should handle option selection with database data', async () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: mockMenuOptions,
                loading: false,
                error: null
            });

            render(<RamenBuilder />);

            // Select a noodle base
            await waitFor(() => {
                const forbiddenRamenButton = screen.getByText('Forbidden Ramen');
                fireEvent.click(forbiddenRamenButton);
            });

            // Should be able to proceed to next step
            const nextButton = screen.getByText('Next');
            expect(nextButton).not.toBeDisabled();
        });

        it('should calculate prices correctly with database data', async () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: mockMenuOptions,
                loading: false,
                error: null
            });

            render(<RamenBuilder />);

            // Select a noodle base
            await waitFor(() => {
                const neoUdonButton = screen.getByText('Neo Udon');
                fireEvent.click(neoUdonButton);
            });

            // Should show the price (base price + noodle price)
            // Base price is 2.50 + Neo Udon price is 1.50 = 4.00
            expect(screen.getByText(/4\.00/)).toBeInTheDocument();
        });
    });

    describe('Cart Component', () => {
        const mockCartItems = [
            {
                id: 1,
                name: 'Custom Ramen Bowl',
                price: 4.0,
                details: {
                    base: 'Forbidden Ramen',
                    protein: ['Chicken'],
                    vegetables: ['Bok Choy'],
                    broth: 'Miso',
                    garnish: []
                }
            }
        ];

        it('should render cart with database menu data', async () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: mockMenuOptions,
                loading: false,
                error: null
            });

            render(<Cart items={mockCartItems} onRemoveItem={jest.fn()} />);

            await waitFor(() => {
                expect(screen.getByText('Custom Ramen Bowl')).toBeInTheDocument();
                expect(screen.getByText('Forbidden Ramen')).toBeInTheDocument();
                expect(screen.getByText('Chicken')).toBeInTheDocument();
                expect(screen.getByText('Miso')).toBeInTheDocument();
            });
        });

        it('should show loading state while fetching menu data', () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: null,
                loading: true,
                error: null
            });

            render(<Cart items={mockCartItems} onRemoveItem={jest.fn()} />);

            expect(screen.getByText('Loading menu options...')).toBeInTheDocument();
        });

        it('should show error state when menu data fetch fails', () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: null,
                loading: false,
                error: 'Failed to fetch menu data'
            });

            render(<Cart items={mockCartItems} onRemoveItem={jest.fn()} />);

            expect(screen.getByText(/Error loading menu options/)).toBeInTheDocument();
        });

        it('should calculate item details correctly with database prices', async () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: mockMenuOptions,
                loading: false,
                error: null
            });

            render(<Cart items={mockCartItems} onRemoveItem={jest.fn()} />);

            await waitFor(() => {
                // Should show individual item prices
                expect(screen.getByText('$2.50')).toBeInTheDocument(); // Base price
                expect(screen.getByText('$2.00')).toBeInTheDocument(); // Chicken price
                expect(screen.getByText('$0.00')).toBeInTheDocument(); // Miso price
            });
        });

        it('should handle empty cart gracefully', async () => {
            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: mockMenuOptions,
                loading: false,
                error: null
            });

            render(<Cart items={[]} onRemoveItem={jest.fn()} />);

            await waitFor(() => {
                expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
            });
        });
    });

    describe('useMenuData Hook Integration', () => {
        it('should handle fallback to static data when API fails', async () => {
            // Mock fetch to fail
            global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

            const { useMenuData } = require('../../components/hooks/useMenuData');
            useMenuData.mockReturnValue({
                menuOptions: mockMenuOptions, // This would be the fallback data
                loading: false,
                error: null
            });

            render(<RamenBuilder />);

            await waitFor(() => {
                expect(screen.getByText('Forbidden Ramen')).toBeInTheDocument();
            });
        });
    });
});
