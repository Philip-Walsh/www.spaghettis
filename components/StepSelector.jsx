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
  vegan: '🌱',
  egg: '🍳'
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
      const idx = selectedValues.indexOf(item.name);
      let newSelection;
      if (idx > -1) {
        newSelection = selectedValues.filter(n => n !== item.name);
      } else {
        newSelection = [...selectedValues, item.name];
      }
      onSelection(newSelection);
    } else {
      onSelection(item);
    }
  };

  if (!step || !Array.isArray(step.choices)) {
    return <div>Loading...</div>;
  }

  return (
    <fieldset className={styles.fieldset} aria-labelledby={`legend-${step.key}`}> 
      <legend id={`legend-${step.key}`} className={styles.legend} tabIndex={-1}>
        {step.icon && (
          <span style={{marginRight: 8, verticalAlign: 'middle'}}>
            {step.icon}
          </span>
        )}
        {step.label}
      </legend>
      <div className={styles.optionsGrid} role="group" aria-labelledby={`legend-${step.key}`}> 
        {step.choices.map((item) => {
          const isSelected = step.multi
            ? Array.isArray(value) && value.includes(item.name)
            : value === item.name;

          return (
            <label
              key={item.name}
              className={
                styles.optionBtn + (isSelected ? ` ${styles.selected}` : '')
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                minHeight: 64,
                fontSize: '1.15rem',
                borderRadius: '1rem',
                marginBottom: 8,
                border: isSelected ? '3px solid #2563eb' : '2px solid #e5e7eb',
                background: isSelected ? '#f0f7ff' : '#fff',
                boxShadow: isSelected ? '0 0 0 4px #2563eb22' : 'none',
                padding: '1.5rem',
                transition: 'border 0.2s, background 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}
              tabIndex={0}
              aria-pressed={isSelected}
            >
              <input
                type={step.multi ? 'checkbox' : 'radio'}
                name={step.key}
                aria-label={item.name}
                className={styles.input}
                checked={isSelected}
                onChange={() => handleSelect(item)}
                style={{marginRight: 18, width: 24, height: 24}}
              />
              <div className={styles.optionContent} style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                <div className={styles.iconWrap} style={{fontSize: 32, marginRight: 16}}>
                  <span className={styles.icon}>{icons[item.tag] || icons.base}</span>
                </div>
                <div className={styles.optionTextWrap} style={{flex: 1, minWidth: 0}}>
                  <h3 className={styles.optionTitle} style={{fontWeight: 700, fontSize: '1.15rem'}}>{item.name}</h3>
                  <div className={styles.optionDetails} style={{marginTop: 4, display: 'flex', alignItems: 'center', gap: 8}}>
                    {item.tag && <Tag label={item.tag} type={item.tag} />}
                    {typeof item.price === 'number' && item.price > 0 && (
                      <span className={styles.priceTag}>+${item.price}</span>
                    )}
                  </div>
                  {item.description && (
                    <div style={{fontSize: '0.95rem', color: '#444', marginTop: 4}}>{item.description}</div>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
