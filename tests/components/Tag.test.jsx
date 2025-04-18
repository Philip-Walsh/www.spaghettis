import React from 'react';
import { render, screen } from '@testing-library/react';
import Tag from '../../components/Tag';

describe('Tag', () => {
    it('renders tag with label text', () => {
        render(<Tag label="Spicy" type="default" />);
        expect(screen.getByText('Spicy')).toBeInTheDocument();
    });

    it('applies vegan style when type is vegan', () => {
        const { container } = render(<Tag label="Vegan" type="vegan" />);
        const tagElement = screen.getByText('Vegan');
        expect(tagElement).toHaveClass('bg-green-100');
        expect(tagElement).toHaveClass('text-green-800');
    });

    it('applies meat style when type is meat', () => {
        const { container } = render(<Tag label="Meat" type="meat" />);
        const tagElement = screen.getByText('Meat');
        expect(tagElement).toHaveClass('bg-red-100');
        expect(tagElement).toHaveClass('text-red-800');
    });

    it('applies seafood style when type is seafood', () => {
        const { container } = render(<Tag label="Seafood" type="seafood" />);
        const tagElement = screen.getByText('Seafood');
        expect(tagElement).toHaveClass('bg-blue-100');
        expect(tagElement).toHaveClass('text-blue-800');
    });

    it('applies vegetarian style when type is vegetarian', () => {
        const { container } = render(<Tag label="Vegetarian" type="vegetarian" />);
        const tagElement = screen.getByText('Vegetarian');
        expect(tagElement).toHaveClass('bg-yellow-100');
        expect(tagElement).toHaveClass('text-yellow-800');
    });

    it('applies default style when type is unknown', () => {
        const { container } = render(<Tag label="Custom" type="unknown" />);
        const tagElement = screen.getByText('Custom');
        expect(tagElement).toHaveClass('bg-gray-100');
        expect(tagElement).toHaveClass('text-gray-800');
    });

    it('renders nothing when label is not provided', () => {
        const { container } = render(<Tag type="vegan" />);
        expect(container.firstChild).toBeNull();
    });
});
