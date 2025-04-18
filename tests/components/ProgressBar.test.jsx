import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../../components/ProgressBar';

describe('ProgressBar', () => {
    it('renders correctly with the current step and total steps', () => {
        render(<ProgressBar currentStep={0} totalSteps={4} />);

        // Check if step text is displayed correctly
        expect(screen.getByText('1 of 4 steps')).toBeInTheDocument();
    });

    it('calculates progress percentage correctly', () => {
        const { container } = render(<ProgressBar currentStep={1} totalSteps={4} />);

        // Find the progress bar element
        const progressBar = container.querySelector('.bg-gradient-to-r');

        // Check the width style is set correctly (50% for step 2 of 4)
        expect(progressBar).toHaveStyle('width: 50%');
    });

    it('handles last step correctly', () => {
        const { container } = render(<ProgressBar currentStep={3} totalSteps={4} />);

        // Check step text for last step
        expect(screen.getByText('4 of 4 steps')).toBeInTheDocument();

        // Find the progress bar element
        const progressBar = container.querySelector('.bg-gradient-to-r');

        // Check the width style is set to 100% for the last step
        expect(progressBar).toHaveStyle('width: 100%');
    });
});
