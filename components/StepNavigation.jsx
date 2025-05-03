import React from 'react';
import styles from './styles/StepNavigation.module.css';

export default function StepNavigation({ currentStep, steps, onStepClick, navRef }) {
    return (
        <div className={styles.stepNav} ref={navRef}>
            {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                const stepClass = `${styles.stepNavBtn} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`;

                return (
                    <button
                        key={step.id}
                        className={stepClass}
                        onClick={() => onStepClick(index)}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`step-${step.id}`}
                        aria-label={`${step.title} step ${isActive ? 'current' : isCompleted ? 'completed' : ''}`}
                    >
                        <span className={styles.stepNavBtnIcon}>{step.icon}</span>
                        <span className={styles.stepNavBtnText}>{step.title}</span>
                    </button>
                );
            })}
        </div>
    );
} 