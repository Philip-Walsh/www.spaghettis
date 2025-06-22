// Function to fetch menu options from the database
export async function getMenuOptions() {
  try {
    const response = await fetch('/api/menu', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const menuOptions = await response.json();

    // Validate that the response has the expected structure
    if (!menuOptions || typeof menuOptions !== 'object') {
      throw new Error('Invalid response structure');
    }

    // Check if it has at least one category with choices
    const hasValidStructure = Object.values(menuOptions).some(category =>
      category &&
      typeof category === 'object' &&
      Array.isArray(category.choices) &&
      category.choices.length > 0
    );

    if (!hasValidStructure) {
      throw new Error('Response missing valid menu structure');
    }

    return menuOptions;
  } catch (error) {
    console.error('Error fetching menu options:', error);
    // Fallback to static data if database is unavailable
    const { menuOptions } = await import('../data/menuOptions');
    return menuOptions;
  }
}

// Function to get a specific step's options
export async function getStepOptions(stepKey) {
  try {
    const menuOptions = await getMenuOptions();
    const step = menuOptions[stepKey];

    if (!step) {
      throw new Error(`Step ${stepKey} not found in menu options`);
    }

    return step;
  } catch (error) {
    console.error(`Error getting step options for ${stepKey}:`, error);
    throw error;
  }
}
