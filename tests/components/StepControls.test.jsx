import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepControls from '../../components/StepControls';

describe('StepControls', () => {
    it('renders back and next buttons', () => {
        const handleBack = jest.fn();
        const handleNext = jest.fn();

        render(
            <StepControls
                onBack={handleBack}
                onNext={handleNext}
                canProceed={true}
                isLastStep={false}
                currentStepKey="noodleBase"
            />
        );

        expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    });

    it('disables back button on first step', () => {
        render(
            <StepControls
                onBack={() => { }}
                onNext={() => { }}
                canProceed={true}
                isLastStep={false}
                currentStep={0}
                currentStepKey="noodleBase"
            />
        );

        expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
    });

    it('disables next button when cannot proceed', () => {
        render(
            <StepControls
                onBack={() => { }}
                onNext={() => { }}
                canProceed={false}
                isLastStep={false}
                currentStepKey="protein"
            />
        );

        expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    it('shows finish button on last step', () => {
        render(
            <StepControls
                onBack={() => { }}
                onNext={() => { }}
                canProceed={true}
                isLastStep={true}
                currentStepKey="sauceBroth"
            />
        );

        expect(screen.getByRole('button', { name: 'Finish' })).toBeInTheDocument();
    });

    it('calls handlers when buttons are clicked', () => {
        const handleBack = jest.fn();
        const handleNext = jest.fn();

        render(
            <StepControls
                onBack={handleBack}
                onNext={handleNext}
                canProceed={true}
                isLastStep={false}
                currentStep={1}
                currentStepKey="protein"
            />
        );

        fireEvent.click(screen.getByRole('button', { name: 'Back' }));
        expect(handleBack).toHaveBeenCalled();

        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(handleNext).toHaveBeenCalled();
    });
}); 