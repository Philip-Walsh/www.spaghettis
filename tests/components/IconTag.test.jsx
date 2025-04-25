import React from 'react';
import { render, screen } from '@testing-library/react';
import IconTag from '../../components/IconTag';

describe('IconTag', () => {
    it('renders vegan tag with correct icon', () => {
        render(<IconTag tag="vegan" />);
        const tagElement = screen.getByText('vegan');
        expect(tagElement).toBeInTheDocument();

        // Check if the vegan icon is present
        const tagContainer = tagElement.parentElement;
        expect(tagContainer.textContent).toContain('🌱');
    });

    it('renders meat tag with correct icon', () => {
        render(<IconTag tag="meat" />);
        const tagElement = screen.getByText('meat');
        expect(tagElement).toBeInTheDocument();

        // Check if the meat icon is present
        const tagContainer = tagElement.parentElement;
        expect(tagContainer.textContent).toContain('🥩');
    });

    it('renders seafood tag with correct icon', () => {
        render(<IconTag tag="seafood" />);
        const tagElement = screen.getByText('seafood');
        expect(tagElement).toBeInTheDocument();

        // Check if the seafood icon is present
        const tagContainer = tagElement.parentElement;
        expect(tagContainer.textContent).toContain('🐟');
    });

    it('renders vegetarian tag with correct icon', () => {
        render(<IconTag tag="vegetarian" />);
        const tagElement = screen.getByText('vegetarian');
        expect(tagElement).toBeInTheDocument();

        // Check if the vegetarian icon is present
        const tagContainer = tagElement.parentElement;
        expect(tagContainer.textContent).toContain('🥬');
    });

    it('renders base tag with correct icon', () => {
        render(<IconTag tag="base" />);
        const tagElement = screen.getByText('base');
        expect(tagElement).toBeInTheDocument();

        // Check if the base icon is present
        const tagContainer = tagElement.parentElement;
        expect(tagContainer.textContent).toContain('🍜');
    });

    it('applies correct styling to tag container', () => {
        render(<IconTag tag="vegan" />);
        const tagElement = screen.getByText('vegan');
        const tagContainer = tagElement.parentElement;

        expect(tagContainer).toHaveClass('inline-flex');
        expect(tagContainer).toHaveClass('items-center');
        expect(tagContainer).toHaveClass('px-2');
        expect(tagContainer).toHaveClass('py-1');
        expect(tagContainer).toHaveClass('rounded-full');
        expect(tagContainer).toHaveClass('bg-gray-100');
        expect(tagContainer).toHaveClass('text-gray-700');
    });

    it('adds margin to tag text', () => {
        render(<IconTag tag="vegan" />);
        const tagElement = screen.getByText('vegan');

        expect(tagElement).toHaveClass('ml-1');
    });
});
