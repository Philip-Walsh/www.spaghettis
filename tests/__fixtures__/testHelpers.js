// Test helper utilities for improved testing
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// Accessibility testing helper
export const renderWithA11y = (component, options = {}) => {
  const result = render(component, options);
  
  // Helper to check basic accessibility requirements
  const checkA11y = async () => {
    const { container } = result;
    
    // Check for proper headings hierarchy
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.slice(1));
      if (level > lastLevel + 1) {
        console.warn(`Heading hierarchy issue: Found h${level} after h${lastLevel}`);
      }
      lastLevel = level;
    });
    
    // Check for images without alt text
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      if (!img.alt && !img.getAttribute('aria-label')) {
        console.warn('Image found without alt text or aria-label');
      }
    });
    
    // Check for buttons without accessible names
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      const hasAccessibleName = 
        button.textContent.trim() ||
        button.getAttribute('aria-label') ||
        button.getAttribute('aria-labelledby') ||
        button.querySelector('img')?.alt;
      
      if (!hasAccessibleName) {
        console.warn('Button found without accessible name');
      }
    });
    
    return true;
  };
  
  return {
    ...result,
    checkA11y
  };
};

// Helper for testing async components
export const renderWithAsync = async (component, options = {}) => {
  let result;
  await act(async () => {
    result = render(component, options);
  });
  return result;
};

// Helper to wait for loading states
export const waitForLoadingToFinish = async (getByTestId) => {
  await act(async () => {
    // Wait for loading indicators to disappear
    const loadingElements = document.querySelectorAll('[data-testid*="loading"], .loading');
    for (const element of loadingElements) {
      if (element) {
        await new Promise(resolve => {
          const observer = new MutationObserver(() => {
            if (!document.contains(element) || element.style.display === 'none') {
              observer.disconnect();
              resolve();
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
          
          // Fallback timeout
          setTimeout(() => {
            observer.disconnect();
            resolve();
          }, 5000);
        });
      }
    }
  });
};

// Helper for keyboard navigation testing
export const testKeyboardNavigation = async (user, container) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  let currentIndex = 0;
  
  const tabForward = async () => {
    if (currentIndex < focusableElements.length - 1) {
      await user.tab();
      currentIndex++;
      return focusableElements[currentIndex];
    }
    return null;
  };
  
  const tabBackward = async () => {
    if (currentIndex > 0) {
      await user.tab({ shift: true });
      currentIndex--;
      return focusableElements[currentIndex];
    }
    return null;
  };
  
  return {
    tabForward,
    tabBackward,
    focusableElements,
    getCurrentElement: () => focusableElements[currentIndex]
  };
};

// Mock API responses helper
export const createMockApiResponse = (data, options = {}) => {
  const {
    status = 200,
    delay = 0,
    shouldFail = false
  } = options;
  
  return jest.fn(() => 
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error('API Error'));
        } else {
          resolve({
            ok: status >= 200 && status < 300,
            status,
            json: () => Promise.resolve(data),
            text: () => Promise.resolve(JSON.stringify(data))
          });
        }
      }, delay);
    })
  );
};

// Form testing helpers
export const fillForm = async (user, formData) => {
  for (const [field, value] of Object.entries(formData)) {
    const input = document.querySelector(`[name="${field}"], [data-testid="${field}"]`);
    if (input) {
      if (input.type === 'checkbox') {
        if (value) await user.click(input);
      } else if (input.type === 'radio') {
        if (value) await user.click(input);
      } else {
        await user.clear(input);
        await user.type(input, value);
      }
    }
  }
};

// Error boundary testing helper
export const TestErrorBoundary = ({ children, onError }) => {
  try {
    return children;
  } catch (error) {
    onError?.(error);
    return <div data-testid="error-boundary">Something went wrong</div>;
  }
};

// Custom matcher for better assertions
export const customMatchers = {
  toBeAccessible: (received) => {
    const hasRole = received.getAttribute('role');
    const hasAriaLabel = received.getAttribute('aria-label');
    const hasAriaLabelledby = received.getAttribute('aria-labelledby');
    const hasAriaDescribedby = received.getAttribute('aria-describedby');
    const hasTextContent = received.textContent.trim();
    
    const isAccessible = hasRole || hasAriaLabel || hasAriaLabelledby || hasTextContent;
    
    return {
      message: () => `expected element to be accessible`,
      pass: isAccessible
    };
  },
  
  toHaveValidFormStructure: (received) => {
    const labels = received.querySelectorAll('label');
    const inputs = received.querySelectorAll('input, select, textarea');
    
    let hasValidStructure = true;
    let issues = [];
    
    inputs.forEach(input => {
      const id = input.id;
      const name = input.name;
      const hasLabel = Array.from(labels).some(label => 
        label.getAttribute('for') === id || label.contains(input)
      );
      
      if (!hasLabel && !input.getAttribute('aria-label')) {
        hasValidStructure = false;
        issues.push(`Input ${name || id || 'without name/id'} lacks proper label`);
      }
    });
    
    return {
      message: () => `Form structure issues: ${issues.join(', ')}`,
      pass: hasValidStructure
    };
  }
};
