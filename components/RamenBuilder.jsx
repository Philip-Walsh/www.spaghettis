'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuOptions } from '../data/menuOptions';
import StepSelector from './StepSelector';
import ProgressBar from './ProgressBar';
import StepIcon from './StepIcon';
import SummaryView from './SummaryView';
import { calculateTotalPrice } from './utils';
import styles from './styles/RamenBuilder.module.css';

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

  const navRef = useRef();

  const width = useWindowWidth();

  useEffect(() => {
    const nav = navRef.current;
    const activeBtn = nav?.querySelector('[aria-current="step"]');
    if (activeBtn && nav) {
      activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentStep]);

  useEffect(() => {
    if (steps.length === 0) {
      setSteps([
        ...Object.values(menuOptions),
        { key: 'summary', label: 'Summary' }
      ]);
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

  const handleOrderMore = () => {
    setSelectedItems({});
    setCurrentStep(0);
  };

  const currentStepData = filteredSteps[currentStep];
  const currentKey = currentStepData?.key;
  const currentSelection = selectedItems[currentKey];
  const canProceed = currentStepData?.multi
    ? Array.isArray(currentSelection) && currentSelection.length > 0
    : currentSelection !== undefined;

  const totalPrice = calculateTotalPrice(selectedItems);

  const isSummaryStep = filteredSteps[currentStep]?.key === 'summary';

  if (!filteredSteps.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['ramen-container']}>
      <div className={styles['page-content']} style={{ maxWidth: 'clamp(360px, 90%, 1200px)' }}>
        <h1 className={styles['title'] + ' animated-gradient'}>{isSummaryStep ? 'Selection Complete!' : 'Build Your Perfect Ramen'}</h1>
        {isSummaryStep ? (
          <SummaryView
            selectedItems={selectedItems}
            totalPrice={totalPrice}
            onOrderMore={handleOrderMore}
          />
        ) : (
          <div className={styles['card']} data-testid="card">
            <div className={styles['card-header-row']}>
              <div className={styles['price-bento']}>
                <span className={styles['price-bento-label']}>Total</span>
                <span className={styles['price-bento-value']}>${totalPrice.toFixed(2)}</span>
              </div>
              <label className={styles['veggie-toggle']}>
                <input
                  type="checkbox"
                  checked={veggieOnly}
                  onChange={() => setVeggieOnly(v => !v)}
                  aria-label="Veggie Only"
                />
                <span role="img" aria-label="plant">🥦</span>
              </label>
            </div>
            <div className={styles['step-nav']} ref={navRef}>
              {filteredSteps.map((step, idx) => (
                <button
                  key={step.key}
                  onClick={() => setCurrentStep(idx)}
                  className={styles['step-nav-btn']}
                  aria-current={idx === currentStep ? 'step' : undefined}
                  tabIndex={0}
                >
                  <StepIcon icon={stepIcons[step.key]} />
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
                >
                  <StepSelector
                    width={width}
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
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed}
                className={styles['buttonPrimary']}
                aria-label={currentStep === filteredSteps.length - 2 ? 'Finish' : 'Next'}
              >
                <span aria-hidden="true">→</span>
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
