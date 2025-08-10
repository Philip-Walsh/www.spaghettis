import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepNavigation from '../../components/StepNavigation';

const mockSteps = [
    { id: 'noodleBase', title: 'Choose Your Noodle Base' },
    { id: 'protein', title: 'Choose Your Protein' },
    { id: 'sauceBroth', title: 'Choose Your Sauce/Broth' }
];

describe('StepNavigation', () => {
    it('renders all steps correctly', () => {
        const handleStepClick = jest.fn();
        render(
            <StepNavigation
                steps={mockSteps}
                currentStep={0}
                onStepClick={handleStepClick}
            />
        );

        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getAllByRole('tab')).toHaveLength(3);
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
            />
        );

        const tabs = screen.getAllByRole('tab');
        expect(tabs[1]).toHaveAttribute('aria-current', 'step');
        expect(tabs[0]).not.toHaveAttribute('aria-current');
        expect(tabs[2]).not.toHaveAttribute('aria-current');
    });

    it('calls onStepClick when a step is clicked', () => {
        const handleStepClick = jest.fn();
        render(
            <StepNavigation
                steps={mockSteps}
                currentStep={0}
                onStepClick={handleStepClick}
            />
        );

        const secondStep = screen.getByLabelText('Step 2: Choose Your Protein');
        fireEvent.click(secondStep);

        expect(handleStepClick).toHaveBeenCalledWith(1);
    });

    it('applies completed class to previous steps', () => {
        const handleStepClick = jest.fn();
        render(
            <StepNavigation
                steps={mockSteps}
                currentStep={2}
                onStepClick={handleStepClick}
            />
        );

        const tabs = screen.getAllByRole('tab');
        expect(tabs[0]).toHaveClass('completed');
        expect(tabs[1]).toHaveClass('completed');
        expect(tabs[2]).not.toHaveClass('completed');
    });
}); 