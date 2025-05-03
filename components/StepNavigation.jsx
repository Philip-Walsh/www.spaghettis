import React from 'react';

const stepIcons = {
    noodleBase: '🍜',
    protein: '🍗',
    gardenPicks: '🥬',
    sauceBroth: '🍲',
    garnish: '🌿'
};

export default function StepNavigation({ currentStep, steps, onStepClick }) {
    return (
        <div className="navigation">
            {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                const stepClass = `step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;

                return (
                    <div
                        key={step.key}
                        className={stepClass}
                        onClick={() => onStepClick(index)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${step.label} step ${isActive ? 'current' : isCompleted ? 'completed' : ''}`}
                    >
                        <div className="stepNumber">
                            {stepIcons[step.key] || index + 1}
                        </div>
                        <div className="stepLabel">{step.label}</div>
                    </div>
                );
            })}
        </div>
    );
} 