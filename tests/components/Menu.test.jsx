import React from 'react';
import { render, screen } from '@testing-library/react';
import Menu from '../../components/Menu';

// Mock data for testing
const mockMenuItems = [
    {
        id: 1,
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with creamy sauce'
    },
    {
        id: 2,
        name: 'Penne Arrabbiata',
        description: 'Spicy tomato sauce with penne'
    }
];

describe('Menu', () => {
    it('renders menu title when items are present', () => {
        render(<Menu items={mockMenuItems} />);
        expect(screen.getByText('Menu')).toBeInTheDocument();
    });

    it('displays all menu items with their details', () => {
        render(<Menu items={mockMenuItems} />);

        // Check both menu items are displayed
        expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
        expect(screen.getByText('Classic Italian pasta with creamy sauce')).toBeInTheDocument();
        expect(screen.getByText('Penne Arrabbiata')).toBeInTheDocument();
        expect(screen.getByText('Spicy tomato sauce with penne')).toBeInTheDocument();
    });

    it('shows no items message when menu is empty', () => {
        render(<Menu items={[]} />);
        expect(screen.getByText(/No menu items available\./));
    });

    it('renders menu items with proper styling', () => {
        render(<Menu items={mockMenuItems} />);

        // Check menu items have proper styling classes
        const menuItems = screen.getAllByRole('listitem');
        expect(menuItems[0]).toHaveClass('p-4', 'border', 'rounded', 'shadow-sm');
        expect(menuItems[1]).toHaveClass('p-4', 'border', 'rounded', 'shadow-sm');
    });
});
