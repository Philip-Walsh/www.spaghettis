import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PriceDisplay from '../../components/PriceDisplay';

describe('PriceDisplay', () => {
    it('displays the total price correctly', () => {
        render(<PriceDisplay totalPrice={12.5} />);

        expect(screen.getByRole('status')).toHaveTextContent('$12.50');
        expect(screen.getByText('Total Price:')).toBeInTheDocument();
    });

    it('updates when price changes', () => {
        const { rerender } = render(<PriceDisplay totalPrice={12.5} />);
        expect(screen.getByRole('status')).toHaveTextContent('$12.50');

        rerender(<PriceDisplay totalPrice={15.75} />);
        expect(screen.getByRole('status')).toHaveTextContent('$15.75');
    });
}); 