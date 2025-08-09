import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepNavigation from '../../components/StepNavigation';

const mockSteps = [
    { key: 'noodleBase', label: 'Choose Your Noodle Base' },
    { key: 'protein', label: 'Choose Your Protein' },
    { key: 'sauceBroth', label: 'Choose Your Sauce/Broth' }
];

describe('StepNavigation', () => {
    it('renders all steps correctly', () => {
        const handleStepClick = jest.fn();
        render(
            <StepNavigation
                steps={mockSteps}
                currentStep={0}
                onStepClick={handleStepClick}
                navRef={{ current: null }}
            />
        );

        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(3);
        expect(screen.getByLabelText('Step 1: Choose Your Noodle Base')).toBeInTheDocument();
        expect(screen.getByLabelText('Step 2: Choose Your Protein')).toBeInTheDocument();
        expect(screen.getByLabelText('Step 3: Choose Your Sauce/Broth')).toBeInTheDocument();
    });

    it('marks current step correctly', () => {
        const handleStepClick = jest.fn();
        render(
            <StepNavigation
                steps={mockSteps}
                currentStep={1}
                onStepClick={handleStepClick}
                navRef={{ current: null }}
            />
        );

        const buttons = screen.getAllByRole('button');
        expect(buttons[1]).toHaveAttribute('aria-current', 'step');
        expect(buttons[0]).not.toHaveAttribute('aria-current');
        expect(buttons[2]).not.toHaveAttribute('aria-current');
    });

    it('calls onStepClick when a step is clicked', () => {
        const handleStepClick = jest.fn();
        render(
            <StepNavigation
                steps={mockSteps}
                currentStep={0}
                onStepClick={handleStepClick}
                navRef={{ current: null }}
            />
        );

        fireEvent.click(screen.getByLabelText('Step 2: Choose Your Protein'));
        expect(handleStepClick).toHaveBeenCalledWith(1);
    });
}); 