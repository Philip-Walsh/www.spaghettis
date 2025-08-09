import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../../components/Cart';
import { menuOptions } from '../../data/menuOptions';

describe('Cart', () => {
    const mockItems = [
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
        }
    ];

    const mockOnRemoveItem = jest.fn();

    beforeEach(() => {
        render(<Cart items={mockItems} onRemoveItem={mockOnRemoveItem} />);
    });

    test('renders empty cart message when no items', () => {
        render(<Cart items={[]} onRemoveItem={mockOnRemoveItem} />);
        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });

    test('displays item name and price', () => {
        expect(screen.getByText('Ramen + Chicken + Miso')).toBeInTheDocument();
        expect(screen.getByText('$15.99')).toBeInTheDocument();
    });

    test('shows detailed price breakdown', () => {
        // Base noodles
        expect(screen.getByText('Base Noodles')).toBeInTheDocument();
        expect(screen.getByText('$2.50')).toBeInTheDocument();

        // Protein
        const protein = menuOptions.protein.find(p => p.id === 'chicken');
        expect(screen.getByText(protein.name)).toBeInTheDocument();
        expect(screen.getByText(`$${protein.price.toFixed(2)}`)).toBeInTheDocument();

        // Vegetables
        const veg1 = menuOptions.gardenPicks.find(v => v.id === 'bok-choy');
        const veg2 = menuOptions.gardenPicks.find(v => v.id === 'mushrooms');
        expect(screen.getByText(veg1.name)).toBeInTheDocument();
        expect(screen.getByText(veg2.name)).toBeInTheDocument();

        // Broth
        const broth = menuOptions.sauceBroth.find(b => b.id === 'miso');
        expect(screen.getByText(broth.name)).toBeInTheDocument();
        expect(screen.getByText(`$${broth.price.toFixed(2)}`)).toBeInTheDocument();

        // Garnish
        const garnish = menuOptions.garnish.find(g => g.id === 'green-onions');
        expect(screen.getByText(garnish.name)).toBeInTheDocument();
        expect(screen.getByText(`$${garnish.price.toFixed(2)}`)).toBeInTheDocument();
    });

    test('allows selecting delivery option', () => {
        const takeoutRadio = screen.getByRole('radio', { name: /takeout/i });
        const deliveryRadio = screen.getByRole('radio', { name: /delivery/i });

        expect(takeoutRadio).toBeChecked();
        expect(deliveryRadio).not.toBeChecked();

        fireEvent.click(deliveryRadio);
        expect(deliveryRadio).toBeChecked();
        expect(takeoutRadio).not.toBeChecked();
    });

    test('calculates total with delivery fee', () => {
        const deliveryRadio = screen.getByRole('radio', { name: /delivery/i });
        fireEvent.click(deliveryRadio);

        const total = 15.99 + 3.99; // Item price + delivery fee
        expect(screen.getByText(`$${total.toFixed(2)}`)).toBeInTheDocument();
    });

    test('allows entering special instructions', () => {
        const instructionsInput = screen.getByPlaceholderText(/special instructions/i);
        const testInstructions = 'Extra spicy, no onions';

        fireEvent.change(instructionsInput, { target: { value: testInstructions } });
        expect(instructionsInput).toHaveValue(testInstructions);
    });

    test('calls onRemoveItem when remove button is clicked', () => {
        const removeButton = screen.getByRole('button', { name: /remove/i });
        fireEvent.click(removeButton);
        expect(mockOnRemoveItem).toHaveBeenCalledWith(0);
    });

    test('disables checkout button when cart is empty', () => {
        render(<Cart items={[]} onRemoveItem={mockOnRemoveItem} />);
        const checkoutButtons = screen.getAllByRole('button', { name: /proceed to checkout/i });
        const checkoutButton = checkoutButtons[0]; // Get the first one
        expect(checkoutButton).toBeDisabled();
    });

    test('enables checkout button when cart has items', () => {
        const checkoutButtons = screen.getAllByRole('button', { name: /proceed to checkout/i });
        const checkoutButton = checkoutButtons[0]; // Get the first one
        expect(checkoutButton).not.toBeDisabled();
    });
}); 