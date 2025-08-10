import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeToggle from '../../components/ThemeToggle';

// Mock matchMedia to prefer dark mode by default
const mockMatchMedia = (query) => ({
  matches: query === '(prefers-color-scheme: dark)',
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

describe('ThemeToggle', () => {
    beforeEach(() => {
        // Clear localStorage and reset theme
        localStorage.clear();
        document.documentElement.removeAttribute('data-theme');
        
        // Mock matchMedia to prefer dark mode
        window.matchMedia = jest.fn().mockImplementation(mockMatchMedia);
    });

    it('renders with dark theme by default', () => {
        render(<ThemeToggle />);
        const button = screen.getByRole('button');
        // When theme is dark, button shows sun (🌞) to indicate clicking will go to light
        expect(button).toHaveTextContent('🌞');
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('toggles between light and dark themes', () => {
        render(<ThemeToggle />);
        const button = screen.getByRole('button');

        // First click: dark -> light
        fireEvent.click(button);
        // When theme is light, button shows moon (🌙) to indicate clicking will go to dark
        expect(button).toHaveTextContent('🌙');
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        expect(localStorage.getItem('theme')).toBe('light');

        // Second click: light -> dark
        fireEvent.click(button);
        // When theme is dark, button shows sun (🌞) to indicate clicking will go to light
        expect(button).toHaveTextContent('🌞');
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('loads saved theme preference from localStorage', () => {
        localStorage.setItem('theme', 'light');
        render(<ThemeToggle />);
        const button = screen.getByRole('button');
        // When theme is light, button shows moon (🌙) to indicate clicking will go to dark
        expect(button).toHaveTextContent('🌙');
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
}); 