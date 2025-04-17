'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuOptions } from '../data/menuOptions';
import StepSelector from './StepSelector';
import ProgressBar from './ProgressBar';
import { calculateTotalPrice } from './utils';
import styles from './styles/RamenBuilder.module.css';

const stepVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

export default function RamenBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    // Initialize steps after client-side hydration
    if (steps.length === 0) {
      setSteps(Object.values(menuOptions));
    }
  }, [steps]);

  const handleSelection = (stepKey, selectedItem) => {
    setSelectedItems(prev => ({
      ...prev,
      [stepKey]: selectedItem
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const currentKey = currentStepData?.key;
  const currentSelection = selectedItems[currentKey];

  const canProceed = currentStepData?.multi 
    ? Array.isArray(currentSelection) && currentSelection.length > 0 
    : currentSelection !== undefined;

  const totalPrice = calculateTotalPrice(selectedItems);

  if (!steps.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['ramen-container']}>
      <div className={styles['page-content']}>
        <div className={styles['card']}>
          <h1 className={styles['title']}>Build Your Perfect Ramen</h1>
          <div>
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
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
                  step={currentStepData}
                  selectedItems={currentSelection || []}
                  onSelection={handleSelection}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', alignItems: 'center', justifyContent: 'center' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              disabled={currentStep === 0}
              className={styles['button']}
            >
              <span style={{ marginRight: 8 }}>←</span>Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!canProceed}
              className={styles['buttonPrimary']}
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
              <span style={{ marginLeft: 8 }}>→</span>
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={styles['price-summary']}
          >
            <div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className={styles['price-title']}>Total Price</h3>
                <div className={styles['price-value']}>${totalPrice.toFixed(2)}</div>
              </div>
              <div className={styles['price-desc']}>
                {totalPrice === 0 ? 'Base price included' : 'Additional items selected'}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
