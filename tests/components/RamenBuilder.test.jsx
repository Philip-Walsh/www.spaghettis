import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RamenBuilder from '../../components/RamenBuilder';
import { menuOptions } from '../../data/menuOptions';

// Mock the framer-motion
jest.mock('framer-motion', () => {
  const AnimatePresence = ({ children }) => children;
  const motion = {
    div: ({ children, whileHover, whileTap, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, whileHover, whileTap, ...props }) => <button {...props}>{children}</button>
  };
  return { AnimatePresence, motion };
});

// Mock the window.matchMedia function used by framer-motion
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('RamenBuilder', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Mock Element.scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('renders the initial state correctly', async () => {
    render(<RamenBuilder />);

    // The title should be present
    expect(await screen.findByRole('heading', { name: /Build Your Perfect Ramen/i })).toBeInTheDocument();

    // The first step (noodle base) should be shown
    expect(await screen.findByRole('radiogroup', { name: 'Choose Your Noodle Base' })).toBeInTheDocument();

    // Initial price should be $0.00
    expect(await screen.findByRole('status')).toHaveTextContent('$0.00');
  });

  it('updates price when selecting options', async () => {
    render(<RamenBuilder />);

    // Select Quantum Soba
    const quantumSobaOption = await screen.findByRole('radio', { name: 'Quantum Soba' });
    await act(async () => {
      await user.click(quantumSobaOption);
    });

    // Wait for price update
    await waitFor(() => {
      const priceElement = screen.getByRole('status');
      expect(priceElement).toHaveTextContent('$1.75');
    }, { timeout: 2000 });

    // Navigate to protein step
    const nextButton = await screen.findByRole('button', { name: 'Next' });
    await act(async () => {
      await user.click(nextButton);
    });

    // Select Tofu
    const tofuOption = await screen.findByRole('checkbox', { name: 'Tofu' });
    await act(async () => {
      await user.click(tofuOption);
    });

    // Wait for price update
    await waitFor(() => {
      const priceElement = screen.getByRole('status');
      expect(priceElement).toHaveTextContent('$3.50');
    }, { timeout: 2000 });
  });

  it('prevents navigation without selection', async () => {
    render(<RamenBuilder />);

    // Try to navigate to next step without selection
    const nextButton = await screen.findByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();

    // Select an option
    const quantumSobaOption = await screen.findByRole('radio', { name: 'Quantum Soba' });
    await act(async () => {
      await user.click(quantumSobaOption);
    });

    // Next button should be enabled
    await waitFor(() => {
      expect(nextButton).not.toBeDisabled();
    });
  });

  it('handles veggie toggle correctly', async () => {
    render(<RamenBuilder />);

    // Toggle veggie mode
    const veggieToggle = await screen.findByRole('checkbox', { name: 'Veggie Only' });
    await act(async () => {
      await user.click(veggieToggle);
    });

    // Select Rice Noodles
    const riceNoodlesOption = await screen.findByRole('radio', { name: 'Rice Noodles' });
    await act(async () => {
      await user.click(riceNoodlesOption);
    });

    const nextButton = await screen.findByRole('button', { name: 'Next' });
    await act(async () => {
      await user.click(nextButton);
    });

    // In veggie mode, only Tofu should be available
    expect(await screen.findByRole('checkbox', { name: 'Tofu' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'Chicken' })).not.toBeInTheDocument();
  });

  it('shows summary view when completing all steps', async () => {
    render(<RamenBuilder />);

    // Complete the noodle step
    const riceNoodlesOption = await screen.findByRole('radio', { name: 'Rice Noodles' });
    await act(async () => {
      await user.click(riceNoodlesOption);
    });

    // Navigate through all steps
    const nextButton = await screen.findByRole('button', { name: 'Next' });
    await act(async () => {
      await user.click(nextButton); // To protein
    });

    // Select Tofu
    const tofuOption = await screen.findByRole('checkbox', { name: 'Tofu' });
    await act(async () => {
      await user.click(tofuOption);
    });

    await act(async () => {
      await user.click(nextButton); // To sauce/broth
    });

    // Wait for sauce/broth step to load and select Miso
    const misoOption = await screen.findByRole('radio', { name: 'Miso' });
    await act(async () => {
      await user.click(misoOption);
    });

    await act(async () => {
      await user.click(nextButton); // To summary
    });

    // Should show summary view
    await waitFor(async () => {
      expect(await screen.findByRole('heading', { name: 'Selection Complete!', level: 1 })).toBeInTheDocument();
      expect(await screen.findByRole('heading', { name: 'Your Order', level: 3 })).toBeInTheDocument();
      expect(await screen.findByRole('button', { name: 'Order More' })).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('handles vegetarian and gluten-free filters correctly', async () => {
    render(<RamenBuilder />);

    // Check initial state - all options should be visible
    expect(await screen.findByRole('radio', { name: 'Quantum Soba' })).toBeInTheDocument();
    expect(await screen.findByRole('radio', { name: 'Rice Noodles' })).toBeInTheDocument();

    // Enable vegetarian filter
    const veggieToggle = await screen.findByRole('checkbox', { name: 'Vegetarian Only' });
    await act(async () => {
      await user.click(veggieToggle);
    });

    // All noodles should still be visible (all noodles are vegetarian)
    expect(await screen.findByRole('radio', { name: 'Quantum Soba' })).toBeInTheDocument();
    expect(await screen.findByRole('radio', { name: 'Rice Noodles' })).toBeInTheDocument();

    // Navigate to protein step
    const nextButton = await screen.findByRole('button', { name: 'Next' });
    await act(async () => {
      await user.click(nextButton);
    });

    // Only vegetarian proteins should be visible
    expect(await screen.findByRole('checkbox', { name: 'Tofu' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'Chicken' })).not.toBeInTheDocument();

    // Enable gluten-free filter
    const glutenFreeToggle = await screen.findByRole('checkbox', { name: 'Gluten Free Only' });
    await act(async () => {
      await user.click(glutenFreeToggle);
    });

    // Navigate back to noodle step
    const backButton = await screen.findByRole('button', { name: 'Back' });
    await act(async () => {
      await user.click(backButton);
    });

    // Only gluten-free noodles should be visible
    expect(screen.queryByRole('radio', { name: 'Quantum Soba' })).not.toBeInTheDocument();
    expect(await screen.findByRole('radio', { name: 'Rice Noodles' })).toBeInTheDocument();
  });

  it('maintains filter state when navigating between steps', async () => {
    render(<RamenBuilder />);

    // Enable both filters
    const veggieToggle = await screen.findByRole('checkbox', { name: 'Vegetarian Only' });
    const glutenFreeToggle = await screen.findByRole('checkbox', { name: 'Gluten Free Only' });

    await act(async () => {
      await user.click(veggieToggle);
      await user.click(glutenFreeToggle);
    });

    // Navigate through all steps
    const nextButton = await screen.findByRole('button', { name: 'Next' });
    await act(async () => {
      await user.click(nextButton); // To protein
      await user.click(nextButton); // To sauce/broth
      await user.click(nextButton); // To garnish
    });

    // Navigate back to first step
    const backButton = await screen.findByRole('button', { name: 'Back' });
    await act(async () => {
      await user.click(backButton);
      await user.click(backButton);
      await user.click(backButton);
    });

    // Filters should still be enabled
    expect(veggieToggle).toBeChecked();
    expect(glutenFreeToggle).toBeChecked();
  });

  it('shows all noodles when vegetarian filter is enabled', async () => {
    render(<RamenBuilder />);

    // Enable vegetarian filter
    const veggieToggle = await screen.findByRole('checkbox', { name: 'Vegetarian Only' });
    await act(async () => {
      await user.click(veggieToggle);
    });

    // All noodles should be visible
    expect(await screen.findByRole('radio', { name: 'Forbidden Ramen' })).toBeInTheDocument();
    expect(await screen.findByRole('radio', { name: 'Neo Udon' })).toBeInTheDocument();
    expect(await screen.findByRole('radio', { name: 'Quantum Soba' })).toBeInTheDocument();
    expect(await screen.findByRole('radio', { name: 'Rice Noodles' })).toBeInTheDocument();

    // Navigate to protein step
    const nextButton = await screen.findByRole('button', { name: 'Next' });
    await act(async () => {
      await user.click(nextButton);
    });

    // Only vegetarian proteins should be visible
    expect(await screen.findByRole('checkbox', { name: 'Tofu' })).toBeInTheDocument();
    expect(await screen.findByRole('checkbox', { name: 'Egg' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'Chicken' })).not.toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'Beef' })).not.toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'Shrimp' })).not.toBeInTheDocument();
  });

  it('shows only gluten-free options when gluten-free filter is enabled', async () => {
    render(<RamenBuilder />);

    // Enable gluten-free filter
    const glutenFreeToggle = await screen.findByRole('checkbox', { name: 'Gluten Free Only' });
    await act(async () => {
      await user.click(glutenFreeToggle);
    });

    // Only gluten-free noodles should be visible
    expect(screen.queryByRole('radio', { name: 'Forbidden Ramen' })).not.toBeInTheDocument();
    expect(screen.queryByRole('radio', { name: 'Neo Udon' })).not.toBeInTheDocument();
    expect(screen.queryByRole('radio', { name: 'Quantum Soba' })).not.toBeInTheDocument();
    expect(await screen.findByRole('radio', { name: 'Rice Noodles' })).toBeInTheDocument();

    // Navigate to protein step
    const nextButton = await screen.findByRole('button', { name: 'Next' });
    await act(async () => {
      await user.click(nextButton);
    });

    // Only gluten-free proteins should be visible
    expect(await screen.findByRole('checkbox', { name: 'Edamame' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'Chicken' })).not.toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'Tofu' })).not.toBeInTheDocument();
  });

  it('shows only vegetarian and gluten-free options when both filters are enabled', async () => {
    render(<RamenBuilder />);

    // Enable both filters
    const veggieToggle = await screen.findByRole('checkbox', { name: 'Vegetarian Only' });
    const glutenFreeToggle = await screen.findByRole('checkbox', { name: 'Gluten Free Only' });
    await act(async () => {
      await user.click(veggieToggle);
      await user.click(glutenFreeToggle);
    });

    // Only gluten-free noodles should be visible (all are vegetarian)
    expect(screen.queryByRole('radio', { name: 'Forbidden Ramen' })).not.toBeInTheDocument();
    expect(screen.queryByRole('radio', { name: 'Neo Udon' })).not.toBeInTheDocument();
    expect(screen.queryByRole('radio', { name: 'Quantum Soba' })).not.toBeInTheDocument();
    expect(await screen.findByRole('radio', { name: 'Rice Noodles' })).toBeInTheDocument();

    // Navigate to protein step
    const nextButton = await screen.findByRole('button', { name: 'Next' });
    await act(async () => {
      await user.click(nextButton);
    });

    // Only vegetarian and gluten-free proteins should be visible
    expect(await screen.findByRole('checkbox', { name: 'Edamame' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'Chicken' })).not.toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'Tofu' })).not.toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'Egg' })).not.toBeInTheDocument();
  });
});
