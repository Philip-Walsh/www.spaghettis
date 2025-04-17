'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Tag from './Tag';
import styles from './StepSelector.module.css';

const icons = {
  base: '🍜',
  meat: '🥩',
  seafood: '🐟',
  vegetarian: '🥬',
  vegan: '🌱'
};

const optionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const getBackgroundColor = (isSelected, isMulti) => {
  if (isSelected) {
    return isMulti ? 'bg-blue-50' : 'bg-blue-100';
  }
  return 'bg-white';
};

export default function StepSelector({ step, value, onSelection }) {
  const handleSelect = (item) => {
    if (step.multi) {
      const selectedValues = Array.isArray(value) ? [...value] : [];
      const isSelected = selectedValues.includes(item);
      
      onSelection(
        step.multi 
          ? isSelected 
            ? selectedValues.filter(i => i !== item)
            : [...selectedValues, item]
          : item
      );
    } else {
      onSelection(item);
    }
  };

  if (!step || !Array.isArray(step.choices)) {
    return <div>Loading...</div>;
  }

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{step.label}</legend>
      <div className={styles.optionsGrid}>
        {step.choices.map((item) => {
          const isSelected = step.multi 
            ? Array.isArray(value) && value.includes(item)
            : value === item;

          return (
            <motion.button
              key={item.name}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={optionVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(item)}
              className={
                `${styles.optionBtn} ${isSelected ? styles.selected : ''}`
              }
            >
              <div className={styles.optionContent}>
                <div className={styles.iconWrap}>
                  <motion.span
                    whileHover={{ scale: 1.2 }}
                    className={styles.icon}
                  >
                    {icons[item.tag] || icons.base}
                  </motion.span>
                </div>
                <div className={styles.optionTextWrap}>
                  <h3 className={styles.optionTitle}>{item.name}</h3>
                  <div className={styles.optionDetails}>
                    {item.tag && <Tag label={item.tag} type={item.tag} />}
                    {item.price > 0 && (
                      <span className={styles.priceTag}>+${item.price}</span>
                    )}
                  </div>
                </div>
                <input
                  type={step.multi ? 'checkbox' : 'radio'}
                  checked={isSelected}
                  onChange={(e) => {
                    e.preventDefault();
                    handleSelect(item);
                  }}
                  className={styles.input}
                />
              </div>
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
}
