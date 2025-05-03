'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Tag from './Tag';
import './styles/main.css';

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

export default function StepSelector({ options, selectedOptions, onOptionSelect, veggieOnly, glutenFreeOnly }) {
  if (!options) {
    return <div className="loading">Loading...</div>;
  }

  const filteredOptions = options.choices.filter(choice => {
    const isVeggie = !veggieOnly || choice.tags?.includes('vegetarian') || choice.tags?.includes('vegan');
    const isGlutenFree = !glutenFreeOnly || choice.tags?.includes('glutenfree');
    return isVeggie && isGlutenFree;
  });

  const isMultiSelect = options.multi || false;

  const handleOptionClick = (optionName) => {
    if (isMultiSelect) {
      const currentSelections = Array.isArray(selectedOptions) ? selectedOptions : [];
      const newSelections = currentSelections.includes(optionName)
        ? currentSelections.filter(name => name !== optionName)
        : [...currentSelections, optionName];
      onOptionSelect(newSelections);
    } else {
      onOptionSelect(optionName);
    }
  };

  const isSelected = (optionName) => {
    if (isMultiSelect) {
      return Array.isArray(selectedOptions) && selectedOptions.includes(optionName);
    }
    return selectedOptions === optionName;
  };

  return (
    <div className="stepSelector">
      <h2 className="stepTitle">{options.label}</h2>
      <div className="optionsGrid">
        {filteredOptions.map((option) => {
          const selected = isSelected(option.name);
          return (
            <motion.button
              key={option.name}
              className={`optionButton ${selected ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={optionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="optionHeader">
                <span className="optionEmoji">{option.emoji || option.icon}</span>
                <div className="optionTags">
                  {option.tags?.includes('vegetarian') && <span className="tag vegetarian">🥬</span>}
                  {option.tags?.includes('glutenfree') && <span className="tag glutenfree">🌾</span>}
                </div>
              </div>
              <span className="optionName">{option.name}</span>
              {option.description && (
                <span className="optionDescription">{option.description}</span>
              )}
              <div className="optionPrice">
                {option.price > 0 ? `+$${option.price}` : 'Included'}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
