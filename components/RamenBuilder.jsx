'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuOptions } from '../data/menuOptions';
import StepSelector from './StepSelector';
import ProgressBar from './ProgressBar';
import StepNavigation from './StepNavigation';
import StepControls from './StepControls';
import PriceDisplay from './PriceDisplay';
import SummaryView from './SummaryView';
import { calculateTotalPrice } from './utils';
import styles from './styles/RamenBuilder.module.css';
import ThemeToggle from './ThemeToggle';
import './styles/main.css';

// Hook to track window width
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

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
  const [selectedOptions, setSelectedOptions] = useState({});
  const [veggieOnly, setVeggieOnly] = useState(false);
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);

  const navRef = useRef();
  const width = useWindowWidth();

  useEffect(() => {
    const nav = navRef.current;
    const activeBtn = nav?.querySelector('[aria-current="step"]');
    if (activeBtn && nav) {
      activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentStep]);

  const steps = [
    { key: 'noodleBase', label: 'Noodle Base' },
    { key: 'protein', label: 'Protein' },
    { key: 'gardenPicks', label: 'Garden Picks' },
    { key: 'sauceBroth', label: 'Sauce & Broth' },
    { key: 'garnish', label: 'Garnish' }
  ];

  const handleStepClick = (index) => {
    setCurrentStep(index);
  };

  const handleOptionSelect = (option) => {
    setSelectedOptions(prev => {
      const currentStepKey = steps[currentStep].key;
      const currentOptions = menuOptions[currentStepKey];

      if (currentOptions.multi) {
        // For multi-select, option will be an array
        return {
          ...prev,
          [currentStepKey]: option
        };
      } else {
        // For single select, option will be a string
        return {
          ...prev,
          [currentStepKey]: option
        };
      }
    });
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const canProceed = () => {
    const currentStepKey = steps[currentStep].key;
    const currentOptions = menuOptions[currentStepKey];
    const currentSelection = selectedOptions[currentStepKey];

    if (currentOptions.multi) {
      return Array.isArray(currentSelection) && currentSelection.length > 0;
    } else {
      return currentSelection !== undefined;
    }
  };

  const currentStepData = steps[currentStep];
  const currentKey = currentStepData?.key;
  const currentSelection = selectedOptions[currentKey];
  const isSummaryStep = currentKey === 'summary';
  const isLastStep = currentStep === steps.length - 2;

  const totalPrice = calculateTotalPrice(selectedOptions);

  if (!steps.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ramenBuilder">
      <ThemeToggle />
      <h1 className={styles['title']}>{isSummaryStep ? 'Selection Complete!' : 'Build Your Perfect Ramen'}</h1>
      {isSummaryStep ? (
        <SummaryView
          selectedItems={selectedOptions}
          totalPrice={totalPrice}
        />
      ) : (
        <div className={styles['card']} role="region" aria-label="Ramen builder">
          <div className={styles['card-header-row']}>
            <PriceDisplay totalPrice={totalPrice} />
            <div className={styles['filter-controls']}>
              <label className={styles['filter-toggle']}>
                <input
                  type="checkbox"
                  checked={veggieOnly}
                  onChange={() => setVeggieOnly(v => !v)}
                  aria-label="Vegetarian Only"
                />
                <span role="img" aria-label="vegetarian">🥬</span>
                <span>Vegetarian</span>
              </label>
              <label className={styles['filter-toggle']}>
                <input
                  type="checkbox"
                  checked={glutenFreeOnly}
                  onChange={() => setGlutenFreeOnly(g => !g)}
                  aria-label="Gluten Free Only"
                />
                <span role="img" aria-label="gluten free">🌾</span>
                <span>Gluten Free</span>
              </label>
            </div>
          </div>
          <StepNavigation
            currentStep={currentStep}
            steps={steps}
            onStepClick={handleStepClick}
            navRef={navRef}
          />
          <div>
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
          </div>
          <div className={styles['step-container']}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{
                  opacity: 0,
                  clipPath: currentStep > 0
                    ? 'ellipse(80% 0% at 50% 100%)'
                    : 'ellipse(80% 0% at 50% 0%)'
                }}
                animate={{
                  opacity: 1,
                  clipPath: 'ellipse(100% 100% at 50% 50%)'
                }}
                exit={{
                  opacity: 0,
                  clipPath: currentStep > 0
                    ? 'ellipse(80% 0% at 50% 0%)'
                    : 'ellipse(80% 0% at 50% 100%)'
                }}
                transition={{ duration: 0.44, ease: [0.4, 0, 0.2, 1] }}
                className={styles['step-content-drip']}
                id={`step-${currentKey}`}
                role="tabpanel"
                aria-labelledby={`step-${currentKey}-label`}
              >
                <StepSelector
                  width={width}
                  step={currentStep}
                  options={menuOptions[steps[currentStep].key]}
                  selectedOptions={selectedOptions[steps[currentStep].key]}
                  onOptionSelect={handleOptionSelect}
                  veggieOnly={veggieOnly}
                  glutenFreeOnly={glutenFreeOnly}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <StepControls
            currentStep={currentStep}
            totalSteps={steps.length}
            canProceed={canProceed}
            onBack={handleBack}
            onNext={handleNext}
            isLastStep={isLastStep}
            currentStepKey={currentKey}
          />
        </div>
      )}
    </div>
  );
}
