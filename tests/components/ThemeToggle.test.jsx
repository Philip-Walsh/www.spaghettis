import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeToggle from '../../components/ThemeToggle';

describe('ThemeToggle', () => {
    beforeEach(() => {
        // Clear localStorage and reset theme
        localStorage.clear();
        document.documentElement.removeAttribute('data-theme');
    });

    it('renders with dark theme by default', () => {
        render(<ThemeToggle />);
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('🌞');
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('toggles between light and dark themes', () => {
        render(<ThemeToggle />);
        const button = screen.getByRole('button');

        // First click: dark -> light
        fireEvent.click(button);
        expect(button).toHaveTextContent('🌙');
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        expect(localStorage.getItem('theme')).toBe('light');

        // Second click: light -> dark
        fireEvent.click(button);
        expect(button).toHaveTextContent('🌞');
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('loads saved theme preference from localStorage', () => {
        localStorage.setItem('theme', 'light');
        render(<ThemeToggle />);
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('🌙');
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
}); 