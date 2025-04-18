import React from 'react';
import { render, screen } from '@testing-library/react';
import StepIcon from '../../components/StepIcon';

describe('StepIcon', () => {
    it('renders with the provided icon', () => {
        render(<StepIcon icon="🍜" selected={false} />);
        const icon = screen.getByRole('img', { name: 'step icon' });
        expect(icon).toBeInTheDocument();
        expect(icon.textContent).toBe('🍜');
    });

    it('applies default styling when not selected', () => {
        render(<StepIcon icon="🍜" selected={false} />);
        const icon = screen.getByRole('img', { name: 'step icon' });
        expect(icon).toHaveClass('stepIcon');
        expect(icon).not.toHaveClass('selected');
    });

    it('applies selected styling when selected is true', () => {
        render(<StepIcon icon="🍜" selected={true} />);
        const icon = screen.getByRole('img', { name: 'step icon' });
        expect(icon).toHaveClass('stepIcon');
        expect(icon).toHaveClass('selected');
    });

    it('applies proper font family for emoji rendering', () => {
        render(<StepIcon icon="🍜" selected={false} />);
        const icon = screen.getByRole('img', { name: 'step icon' });
        expect(icon).toHaveStyle({
            fontFamily: 'Noto Emoji, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, EmojiOne Color, sans-serif'
        });
    });

    it('applies flex display for alignment', () => {
        render(<StepIcon icon="🍜" selected={false} />);
        const icon = screen.getByRole('img', { name: 'step icon' });
        expect(icon).toHaveStyle({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
    });
});
