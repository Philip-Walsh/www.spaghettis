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
import Cart from './Cart';

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
  const [cartItems, setCartItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({
    base: null,
    protein: null,
    vegetables: [],
    broth: null,
    garnish: null
  });

  const navRef = useRef();
  const stepContainerRef = useRef();
  const width = useWindowWidth();

  useEffect(() => {
    const nav = navRef.current;
    const activeBtn = nav?.querySelector('[aria-current="step"]');
    if (activeBtn && nav) {
      activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    // Scroll the step container to the top when the step changes
    if (stepContainerRef.current) {
      stepContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const steps = [
    { id: 'noodleBase', title: 'Choose Your Base', icon: '🍜' },
    { id: 'protein', title: 'Select Protein', icon: '🍗' },
    { id: 'gardenPicks', title: 'Add Vegetables', icon: '🥬' },
    { id: 'sauceBroth', title: 'Pick Your Broth', icon: '🍲' },
    { id: 'garnish', title: 'Final Touches', icon: '🌿' }
  ];

  const handleOptionSelect = (option) => {
    const currentStepKey = steps[currentStep].id;
    const currentOptions = menuOptions[currentStepKey];

    setSelectedOptions(prev => {
      if (currentOptions?.multi) {
        // For multi-select steps (protein, gardenPicks, garnish)
        const currentSelection = prev[currentStepKey] || [];
        const newSelection = currentSelection.includes(option)
          ? currentSelection.filter(item => item !== option)
          : [...currentSelection, option];
        return { ...prev, [currentStepKey]: newSelection };
      } else {
        // For single-select steps
        return { ...prev, [currentStepKey]: option };
      }
    });

    // Update currentOrder to match selectedOptions structure
    setCurrentOrder(prev => {
      const newOrder = { ...prev };
      if (currentStepKey === 'gardenPicks') {
        // For garden picks, store in vegetables array
        const currentVeggies = prev.vegetables || [];
        newOrder.vegetables = currentVeggies.includes(option)
          ? currentVeggies.filter(item => item !== option)
          : [...currentVeggies, option];
      } else if (currentStepKey === 'protein' || currentStepKey === 'garnish') {
        // For protein and garnish, ensure they're arrays
        const currentSelection = prev[currentStepKey] || [];
        newOrder[currentStepKey] = currentSelection.includes(option)
          ? currentSelection.filter(item => item !== option)
          : [...currentSelection, option];
      } else {
        // For single-select options (base, broth)
        newOrder[currentStepKey] = option;
      }
      return newOrder;
    });
  };

  const canProceed = () => {
    const currentStepKey = steps[currentStep].id;
    const currentOptions = menuOptions[currentStepKey];
    const currentSelection = selectedOptions[currentStepKey];

    // Allow proceeding if it's an optional step
    if (currentStepKey === 'protein' || currentStepKey === 'gardenPicks' || currentStepKey === 'garnish') {
      return true;
    }

    if (!currentOptions) return false;

    if (currentOptions.multi) {
      return Array.isArray(currentSelection) && currentSelection.length > 0;
    } else {
      return currentSelection !== undefined;
    }
  };

  const canAddToCart = () => {
    // Must have selected noodle base and broth
    if (!selectedOptions.noodleBase || !selectedOptions.sauceBroth) {
      return false;
    }

    // Check if all required steps have selections
    const requiredSteps = ['noodleBase', 'sauceBroth'];
    return requiredSteps.every(step => selectedOptions[step] !== undefined);
  };

  const calculateOrderPrice = (options) => {
    let total = 2.50; // Base price for noodles

    // Add noodle price if selected
    if (options.noodleBase) {
      const noodle = menuOptions.noodleBase.choices.find(n => n.name === options.noodleBase);
      if (noodle) {
        total += noodle.price;
      }
    }

    // Add protein prices (multi-select)
    if (options.protein && Array.isArray(options.protein)) {
      options.protein.forEach(proteinName => {
        const protein = menuOptions.protein.choices.find(p => p.name === proteinName);
        if (protein) {
          total += protein.price;
        }
      });
    }

    // Add vegetable prices
    if (options.gardenPicks && Array.isArray(options.gardenPicks)) {
      options.gardenPicks.forEach(vegName => {
        const vegetable = menuOptions.gardenPicks.choices.find(v => v.name === vegName);
        if (vegetable) {
          total += vegetable.price;
        }
      });
    }

    // Add broth price
    if (options.sauceBroth) {
      const broth = menuOptions.sauceBroth.choices.find(b => b.name === options.sauceBroth);
      if (broth) {
        total += broth.price;
      }
    }

    // Add garnish prices (multi-select)
    if (options.garnish && Array.isArray(options.garnish)) {
      options.garnish.forEach(garnishName => {
        const garnish = menuOptions.garnish.choices.find(g => g.name === garnishName);
        if (garnish) {
          total += garnish.price;
        }
      });
    }

    return total;
  };

  const addToCart = () => {
    if (!canAddToCart()) return;

    // Create a concise order name
    const orderName = [
      selectedOptions.noodleBase,
      Array.isArray(selectedOptions.protein) ? selectedOptions.protein.join(', ') : selectedOptions.protein,
      selectedOptions.sauceBroth
    ].filter(Boolean).join(' + ');

    // If the name is too long, use a generic name
    const finalOrderName = orderName.length > 50 ? 'Custom Ramen' : orderName;

    const orderPrice = calculateOrderPrice(selectedOptions);

    setCartItems([...cartItems, {
      name: finalOrderName,
      price: orderPrice,
      details: {
        base: selectedOptions.noodleBase,
        protein: selectedOptions.protein || [],
        vegetables: selectedOptions.gardenPicks || [],
        broth: selectedOptions.sauceBroth,
        garnish: selectedOptions.garnish || []
      }
    }]);

    // Reset current order
    setCurrentOrder({
      base: null,
      protein: [],
      vegetables: [],
      broth: null,
      garnish: []
    });
    setSelectedOptions({});
    setCurrentStep(0);
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const currentStepData = steps[currentStep];
  const currentKey = currentStepData?.id;
  const currentSelection = selectedOptions[currentKey];
  const isSummaryStep = currentKey === 'summary';
  const isLastStep = currentStep === steps.length - 1;

  const totalPrice = calculateTotalPrice(selectedOptions);

  return (
    <main className={styles.builderContainer}>
      <ThemeToggle />
      <header className={styles.title}>
        <h1>
          {isSummaryStep ? 'Selection Complete!' : 'Build Your Perfect Ramen'}
        </h1>
      </header>

      <section className={styles.contentContainer}>
        <article className={styles.builderContent}>
          <nav className={styles.stepsContainer}>
            <StepNavigation
              currentStep={currentStep}
              steps={steps}
              onStepClick={setCurrentStep}
              navRef={navRef}
            />
          </nav>

          <section className={styles.stepContent}>
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

            <fieldset className={styles.filterControls}>
              <legend>Filter Options</legend>
              <label className={styles.filterToggle}>
                <input
                  type="checkbox"
                  checked={veggieOnly}
                  onChange={() => setVeggieOnly(v => !v)}
                  aria-label="Vegetarian Only"
                />
                <span>🥬 Vegetarian</span>
              </label>
              <label className={styles.filterToggle}>
                <input
                  type="checkbox"
                  checked={glutenFreeOnly}
                  onChange={() => setGlutenFreeOnly(g => !g)}
                  aria-label="Gluten Free Only"
                />
                <span>🌾 Gluten Free</span>
              </label>
            </fieldset>

            <PriceDisplay totalPrice={totalPrice} />

            <section className={styles.stepContainer} ref={stepContainerRef}>
              <AnimatePresence mode="wait">
                <motion.article
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepSelector
                    options={menuOptions[steps[currentStep].id]}
                    selectedOptions={selectedOptions[steps[currentStep].id]}
                    onOptionSelect={handleOptionSelect}
                    veggieOnly={veggieOnly}
                    glutenFreeOnly={glutenFreeOnly}
                  />
                </motion.article>
              </AnimatePresence>
            </section>

            <nav className={styles.stepControls}>
              <StepControls
                currentStep={currentStep}
                totalSteps={steps.length}
                canProceed={canProceed()}
                onBack={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                onNext={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                isLastStep={isLastStep}
                currentStepKey={currentKey}
              />
            </nav>

            <section className={styles.actions}>
              {isLastStep ? (
                <button
                  className={styles.actionButton}
                  onClick={addToCart}
                  disabled={!canAddToCart()}
                >
                  Finish & Add to Cart
                </button>
              ) : (
                <button
                  className={styles.actionButton}
                  onClick={addToCart}
                  disabled={!canAddToCart()}
                >
                  Add to Cart
                </button>
              )}
              <button
                className={styles.actionButton}
                onClick={() => {
                  setCurrentStep(0);
                  setSelectedOptions({});
                  setCurrentOrder({
                    base: null,
                    protein: [],
                    vegetables: [],
                    broth: null,
                    garnish: []
                  });
                }}
              >
                Start New Order
              </button>
            </section>
          </section>
        </article>

        <aside className={styles.cartContainer}>
          <Cart
            items={cartItems}
            onAddItem={addToCart}
            onRemoveItem={removeFromCart}
          />
        </aside>
      </section>
    </main>
  );
}
