import React from 'react';

export default function StepControls({ onBack, onNext, canProceed, isLastStep }) {
    return (
        <div className="controls">
            <button
                className="button"
                onClick={onBack}
                disabled={!onBack}
            >
                Back
            </button>
            <button
                className={`button ${isLastStep ? 'finishButton' : 'nextButton'}`}
                onClick={onNext}
                disabled={!canProceed}
            >
                {isLastStep ? 'Finish' : 'Next'}
            </button>
        </div>
    );
} 