import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer', () => {
    it('renders the footer component', () => {
        render(<Footer />);

        // Check if the text is present
        expect(screen.getByText(/Built With Windsurf/i)).toBeInTheDocument();
    });

    it('includes a link to windsurf.com', () => {
        render(<Footer />);

        // Find the link
        const link = screen.getByRole('link', { name: /Built With Windsurf/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://windsurf.com/refer?referral_code=f181515cf7');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('displays the Windsurf logo image', () => {
        render(<Footer />);

        // Find the image
        const image = screen.getByAltText('Windsurf logo');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://windsurf.com/favicon.ico');

        // Check individual style properties instead of the whole object
        expect(image).toHaveStyle('display: inline');
        expect(image).toHaveStyle('vertical-align: middle');
        expect(image).toHaveStyle('width: 16px');
        expect(image).toHaveStyle('height: 16px');
        expect(image).toHaveStyle('margin-left: 4px');
    });
});
