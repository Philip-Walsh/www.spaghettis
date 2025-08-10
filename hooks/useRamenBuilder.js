import { useState, useCallback, useMemo } from 'react';
import { calculateTotalPrice } from '../components/utils';

/**
 * Custom hook for managing ramen builder state
 * @returns {Object} Hook state and methods
 */
export function useRamenBuilder() {
  const [selections, setSelections] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  /**
   * Add a selection to a specific category
   * @param {string} category - The selection category (e.g., 'noodleBase', 'protein')
   * @param {Object} item - The selected item
   * @param {boolean} allowMultiple - Whether multiple selections are allowed for this category
   */
  const addSelection = useCallback((category, item, allowMultiple = false) => {
    if (!category || !item) return;

    setSelections(prev => {
      const newSelections = { ...prev };

      if (allowMultiple) {
        // Add to existing array or create new array
        const existing = newSelections[category] || [];
        // Check if item already exists (avoid duplicates)
        const itemExists = existing.some(existingItem =>
          existingItem === item.name
        );

        if (!itemExists) {
          newSelections[category] = [...existing, item.name];
        }
      } else {
        // Replace existing selection
        newSelections[category] = item.name;
      }

      return newSelections;
    });
  }, []);

  /**
   * Remove a selection from a specific category
   * @param {string} category - The selection category
   * @param {string} itemName - The name of the item to remove
   */
  const removeSelection = useCallback((category, itemName) => {
    if (!category || !itemName) return;

    setSelections(prev => {
      const newSelections = { ...prev };

      if (newSelections[category]) {
        if (Array.isArray(newSelections[category])) {
          newSelections[category] = newSelections[category].filter(
            item => item !== itemName
          );
        } else {
          // Single selection - clear if it matches
          if (newSelections[category] === itemName) {
            delete newSelections[category];
          }
        }

        // Remove empty arrays
        if (newSelections[category] && newSelections[category].length === 0) {
          delete newSelections[category];
        }
      }

      return newSelections;
    });
  }, []);

  /**
   * Clear all selections for a category
   * @param {string} category - The category to clear
   */
  const clearCategory = useCallback((category) => {
    if (!category) return;

    setSelections(prev => {
      const newSelections = { ...prev };
      delete newSelections[category];
      return newSelections;
    });
  }, []);

  /**
   * Clear all selections
   */
  const clearAllSelections = useCallback(() => {
    setSelections({});
  }, []);

  /**
   * Check if a specific item is selected in a category
   * @param {string} category - The category to check
   * @param {string} itemName - The item name to check
   * @returns {boolean} Whether the item is selected
   */
  const isItemSelected = useCallback((category, itemName) => {
    if (!category || !itemName || !selections[category]) return false;

    if (Array.isArray(selections[category])) {
      return selections[category].includes(itemName);
    } else {
      return selections[category] === itemName;
    }
  }, [selections]);

  /**
   * Get selections for a specific category
   * @param {string} category - The category to get selections for
   * @returns {Array} Array of selected items for the category
   */
  const getCategorySelections = useCallback((category) => {
    return selections[category] || [];
  }, [selections]);

  /**
   * Navigate to next step
   */
  const nextStep = useCallback(() => {
    setCurrentStep(prev => prev + 1);
  }, []);

  /**
   * Navigate to previous step
   */
  const previousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  }, []);

  /**
   * Go to a specific step
   * @param {number} step - The step index to navigate to
   */
  const goToStep = useCallback((step) => {
    if (typeof step === 'number' && step >= 0) {
      setCurrentStep(step);
    }
  }, []);

  // Calculate total price using the utility function
  const total = useMemo(() => {
    return calculateTotalPrice(selections);
  }, [selections]);

  // Get total number of selected items
  const totalItems = useMemo(() => {
    let count = 0;
    Object.values(selections).forEach(categoryItems => {
      if (Array.isArray(categoryItems)) {
        count += categoryItems.length;
      }
    });
    return count;
  }, [selections]);

  // Check if there are any selections
  const hasSelections = useMemo(() => {
    return Object.keys(selections).length > 0;
  }, [selections]);

  return {
    // State
    selections,
    currentStep,
    total,
    totalItems,
    hasSelections,

    // Selection methods
    addSelection,
    removeSelection,
    clearCategory,
    clearAllSelections,
    isItemSelected,
    getCategorySelections,

    // Navigation methods
    nextStep,
    previousStep,
    goToStep,

    // Utility methods
    setSelections, // Direct setter for advanced use cases
    setCurrentStep // Direct setter for advanced use cases
  };
}