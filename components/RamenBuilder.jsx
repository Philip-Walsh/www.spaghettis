'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuOptions } from '../data/menuOptions';
import StepSelector from './StepSelector';
import ProgressBar from './ProgressBar';
import StepIcon from './StepIcon';
import { calculateTotalPrice } from './utils';
import styles from './styles/RamenBuilder.module.css';

const stepVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

const veggieTags = ['vegetarian', 'vegan', 'glutenfree'];

const stepIcons = {
  noodleBase: '🍜',
  protein: '🍗',
  gardenPicks: '🥬',
  sauceBroth: '🍲',
  garnish: '🌿'
};

export default function RamenBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const [steps, setSteps] = useState([]);
  const [veggieOnly, setVeggieOnly] = useState(false);

  useEffect(() => {
    if (steps.length === 0) {
      setSteps(Object.values(menuOptions));
    }
  }, [steps]);

  const filteredMenuOptions = veggieOnly
    ? Object.fromEntries(
        Object.entries(menuOptions).map(([key, step]) => [
          key,
          {
            ...step,
            choices: step.choices.filter(
              (c) => veggieTags.includes(c.tag)
            )
          }
        ])
      )
    : menuOptions;

  const filteredSteps = veggieOnly ? Object.values(filteredMenuOptions) : steps;

  const handleSelection = (stepKey, selectedItem) => {
    setSelectedItems(prev => {
      let updated;
      if (Array.isArray(selectedItem)) {
        updated = { ...prev, [stepKey]: selectedItem.map(i => (typeof i === 'object' && i !== null && 'name' in i ? i.name : i)) };
      } else if (selectedItem && selectedItem.name) {
        updated = { ...prev, [stepKey]: selectedItem.name };
      } else {
        updated = { ...prev, [stepKey]: selectedItem };
      }
      if (stepKey === 'noodleBase' && selectedItem.defaults) {
        Object.entries(selectedItem.defaults).forEach(([key, names]) => {
          if (
            Array.isArray(names) &&
            menuOptions[key]
          ) {
            updated[key] = names;
          }
        });
      }
      return updated;
    });
  };

  const handleTabClick = (idx) => setCurrentStep(idx);

  const handleNext = () => {
    if (currentStep < filteredSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentStepData = filteredSteps[currentStep];
  const currentKey = currentStepData?.key;
  const currentSelection = selectedItems[currentKey];
  const canProceed = currentStepData?.multi
    ? Array.isArray(currentSelection) && currentSelection.length > 0
    : currentSelection !== undefined;

  const totalPrice = calculateTotalPrice(selectedItems);

  if (!filteredSteps.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['ramen-container']}>
      <div className={styles['page-content']}>
        <div className={styles['card']}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <motion.div
              key={totalPrice}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={styles['price-summary']}
            >
              <div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className={styles['price-title']}>Total Price</h3>
                  <motion.div
                    key={totalPrice}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={styles['price-value']}
                  >
                    ${totalPrice.toFixed(2)}
                  </motion.div>
                </div>
                <div className={styles['price-desc']}>
                  {totalPrice === 0 ? 'Base price included' : 'Additional items selected'}
                </div>
              </div>
            </motion.div>
            <label style={{ marginLeft: '1.5rem', display: 'flex', alignItems: 'center', fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={veggieOnly}
                onChange={() => setVeggieOnly(v => !v)}
                style={{ marginRight: 8 }}
                aria-label="Veggie Only"
              />
              <span role="img" aria-label="plant">🥦</span> Veggie Only
            </label>
          </div>
          <h1 className={styles['title']}>Build Your Perfect Ramen</h1>
          <div className={styles['step-nav']}>
            {filteredSteps.map((step, idx) => (
              <button
                key={step.key}
                onClick={() => handleTabClick(idx)}
                className={styles['step-nav-btn']}
                aria-current={idx === currentStep ? 'step' : undefined}
                tabIndex={0}
              >
                <StepIcon icon={stepIcons[step.key]} label={step.label} />
                {step.label}
              </button>
            ))}
          </div>
          <div>
            <ProgressBar currentStep={currentStep} totalSteps={filteredSteps.length} />
          </div>
          <div className={styles['step-container']}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.5 }}
              >
                <StepSelector
                  step={{ ...currentStepData, icon: stepIcons[currentStepData?.key] }}
                  value={currentSelection}
                  onSelection={selected => handleSelection(currentKey, selected)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={styles['button-row']}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              disabled={currentStep === 0}
              className={styles['button']}
              aria-label="Back"
            >
              <span aria-hidden="true">←</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!canProceed}
              className={styles['buttonPrimary']}
              aria-label={currentStep === filteredSteps.length - 1 ? 'Finish' : 'Next'}
            >
              <span aria-hidden="true">→</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
