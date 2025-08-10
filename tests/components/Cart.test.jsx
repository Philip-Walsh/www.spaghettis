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
                base: 'Forbidden Ramen',
                protein: 'Chicken',
                vegetables: ['Bok Choy', 'Mushrooms'],
                broth: 'Miso',
                garnish: 'Green Onions'
            }
        }
    ];

    const mockOnRemoveItem = jest.fn();

    beforeEach(() => {
        render(<Cart items={mockItems} onRemoveItem={mockOnRemoveItem} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('displays item name and price', () => {
        expect(screen.getByText('Ramen + Chicken + Miso')).toBeInTheDocument();
        // Use getAllByText to get all price elements and check the first one
        const priceElements = screen.getAllByText('$15.99');
        expect(priceElements.length).toBeGreaterThan(0);
    });

    test('shows detailed price breakdown', () => {
        // Check for Forbidden Ramen (the actual noodle base name)
        expect(screen.getByText('Forbidden Ramen')).toBeInTheDocument();
        expect(screen.getByText('$2.50')).toBeInTheDocument();

        // Protein
        expect(screen.getByText('Chicken')).toBeInTheDocument();
        expect(screen.getByText('$2.00')).toBeInTheDocument();

        // Vegetables
        expect(screen.getByText('Bok Choy')).toBeInTheDocument();
        expect(screen.getByText('Mushrooms')).toBeInTheDocument();
        expect(screen.getByText('$0.75')).toBeInTheDocument();
        expect(screen.getByText('$1.00')).toBeInTheDocument();

        // Broth
        expect(screen.getByText('Miso')).toBeInTheDocument();
        expect(screen.getByText('$0.00')).toBeInTheDocument();

        // Garnish
        expect(screen.getByText('Green Onions')).toBeInTheDocument();
        expect(screen.getByText('$0.50')).toBeInTheDocument();
    });

    test('displays delivery options', () => {
        expect(screen.getByText('Delivery Option')).toBeInTheDocument();
        expect(screen.getByText('Takeout')).toBeInTheDocument();
        expect(screen.getByText('Delivery (+$3.99)')).toBeInTheDocument();
    });

    test('displays special instructions section', () => {
        expect(screen.getByText('Special Instructions')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Add any special instructions here...')).toBeInTheDocument();
    });

    test('displays total price', () => {
        // Check for total section
        expect(screen.getByText('Total:')).toBeInTheDocument();
        const totalElements = screen.getAllByText('$15.99');
        expect(totalElements.length).toBeGreaterThan(0);
    });

    test('calls onRemoveItem when remove button is clicked', () => {
        const removeButton = screen.getByText('Remove');
        fireEvent.click(removeButton);

        expect(mockOnRemoveItem).toHaveBeenCalledWith(0);
    });

    test('disables checkout button when cart is empty', () => {
        // Re-render with empty cart
        render(<Cart items={[]} onRemoveItem={mockOnRemoveItem} />);
        
        // Get all checkout buttons and check the last one (which should be from the empty cart)
        const checkoutButtons = screen.getAllByRole('button', { name: /proceed to checkout/i });
        const lastCheckoutButton = checkoutButtons[checkoutButtons.length - 1];
        expect(lastCheckoutButton).toBeDisabled();
    });

    test('enables checkout button when cart has items', () => {
        const checkoutButton = screen.getByRole('button', { name: /proceed to checkout/i });
        expect(checkoutButton).not.toBeDisabled();
    });
}); 