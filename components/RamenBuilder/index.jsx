import React, { useState } from 'react';
import { menuOptions } from '../../data/menuOptions';
import { calculateTotal } from './utils';
import styles from './styles.module.css';

const RamenBuilder = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState({
        noodle: '',
        protein: [],
        garden: [],
        broth: '',
        garnish: []
    });

    const handleOptionSelect = (category, option) => {
        if (menuOptions[category].multi) {
            setSelections((prev) => ({
                ...prev,
                [category]: prev[category].includes(option)
                    ? prev[category].filter((item) => item !== option)
                    : [...prev[category], option]
            }));
        } else {
            setSelections((prev) => ({
                ...prev,
                [category]: option
            }));
        }
    };

    const currentCategory = Object.keys(menuOptions)[currentStep];
    const options = menuOptions[currentCategory];

    return (
        <div className={styles.container} data-testid="ramen-builder">
            <h1>Build Your Perfect Ramen</h1>

            <div className={styles.step}>
                <h2>{options.label}</h2>
                <div className={styles.options}>
                    {options.choices.map((choice) => (
                        <label
                            key={choice.name}
                            className={styles.option}
                            data-testid={`option-${choice.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                            <input
                                type={options.multi ? 'checkbox' : 'radio'}
                                name={currentCategory}
                                value={choice.name}
                                checked={
                                    options.multi
                                        ? selections[currentCategory].includes(choice.name)
                                        : selections[currentCategory] === choice.name
                                }
                                onChange={() => handleOptionSelect(currentCategory, choice.name)}
                                aria-label={`Select ${choice.name} as ${currentCategory}`}
                            />
                            <span>
                                {choice.icon} {choice.name}
                            </span>
                            {choice.price > 0 && <span className={styles.price}>+${choice.price.toFixed(2)}</span>}
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.navigation}>
                {currentStep > 0 && (
                    <button
                        onClick={() => setCurrentStep((prev) => prev - 1)}
                        aria-label="Previous step"
                        data-testid="previous-button"
                    >
                        Previous
                    </button>
                )}
                {currentStep < Object.keys(menuOptions).length - 1 && (
                    <button
                        onClick={() => setCurrentStep((prev) => prev + 1)}
                        aria-label="Next step"
                        data-testid="next-button"
                    >
                        Next
                    </button>
                )}
            </div>

            <div className={styles.total}>
                <h3>Total</h3>
                <p data-testid="total-price">${calculateTotal(selections).toFixed(2)}</p>
            </div>
        </div>
    );
};

export default RamenBuilder;
