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
    const veggieToggle = await screen.findByRole('checkbox', { name: 'Vegetarian Only' });
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

  test('renders all step buttons with correct icons', () => {
    const stepButtons = screen.getAllByRole('button', { name: /step/i });
    expect(stepButtons).toHaveLength(5);
    expect(stepButtons[0]).toHaveTextContent('🍜');
    expect(stepButtons[1]).toHaveTextContent('🍗');
    expect(stepButtons[2]).toHaveTextContent('🥬');
    expect(stepButtons[3]).toHaveTextContent('🍲');
    expect(stepButtons[4]).toHaveTextContent('🌿');
  });

  test('allows selecting noodle base', () => {
    const noodleOptions = menuOptions.noodleBase;
    const noodleButton = screen.getByRole('button', { name: noodleOptions[0].name });
    fireEvent.click(noodleButton);
    expect(screen.getByText(noodleOptions[0].name)).toHaveClass('selected');
  });

  test('allows selecting protein', () => {
    // First select noodle base to proceed
    const noodleButton = screen.getByRole('button', { name: menuOptions.noodleBase[0].name });
    fireEvent.click(noodleButton);

    // Move to protein step
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    const proteinOptions = menuOptions.protein;
    const proteinButton = screen.getByRole('button', { name: proteinOptions[0].name });
    fireEvent.click(proteinButton);
    expect(screen.getByText(proteinOptions[0].name)).toHaveClass('selected');
  });

  test('allows selecting multiple vegetables', () => {
    // First select noodle base to proceed
    const noodleButton = screen.getByRole('button', { name: menuOptions.noodleBase[0].name });
    fireEvent.click(noodleButton);

    // Move to vegetables step
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    const vegOptions = menuOptions.gardenPicks;
    const vegButton1 = screen.getByRole('button', { name: vegOptions[0].name });
    const vegButton2 = screen.getByRole('button', { name: vegOptions[1].name });

    fireEvent.click(vegButton1);
    fireEvent.click(vegButton2);

    expect(screen.getByText(vegOptions[0].name)).toHaveClass('selected');
    expect(screen.getByText(vegOptions[1].name)).toHaveClass('selected');
  });

  test('allows selecting broth', () => {
    // First select noodle base to proceed
    const noodleButton = screen.getByRole('button', { name: menuOptions.noodleBase[0].name });
    fireEvent.click(noodleButton);

    // Move to broth step
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    const brothOptions = menuOptions.sauceBroth;
    const brothButton = screen.getByRole('button', { name: brothOptions[0].name });
    fireEvent.click(brothButton);
    expect(screen.getByText(brothOptions[0].name)).toHaveClass('selected');
  });

  test('allows selecting garnish', () => {
    // First select noodle base to proceed
    const noodleButton = screen.getByRole('button', { name: menuOptions.noodleBase[0].name });
    fireEvent.click(noodleButton);

    // Move to garnish step
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    const garnishOptions = menuOptions.garnish;
    const garnishButton = screen.getByRole('button', { name: garnishOptions[0].name });
    fireEvent.click(garnishButton);
    expect(screen.getByText(garnishOptions[0].name)).toHaveClass('selected');
  });

  test('calculates correct price for complete order', () => {
    // Select noodle base
    const noodleButton = screen.getByRole('button', { name: menuOptions.noodleBase[0].name });
    fireEvent.click(noodleButton);

    // Move to broth step
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    // Select broth
    const brothButton = screen.getByRole('button', { name: menuOptions.sauceBroth[0].name });
    fireEvent.click(brothButton);

    // Check if Add to Cart button is enabled
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).not.toBeDisabled();
  });

  test('adds order to cart with correct details', () => {
    // Select noodle base
    const noodleButton = screen.getByRole('button', { name: menuOptions.noodleBase[0].name });
    fireEvent.click(noodleButton);

    // Move to broth step
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    // Select broth
    const brothButton = screen.getByRole('button', { name: menuOptions.sauceBroth[0].name });
    fireEvent.click(brothButton);

    // Add to cart
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    // Check if cart shows the order
    expect(screen.getByText(menuOptions.noodleBase[0].name)).toBeInTheDocument();
    expect(screen.getByText(menuOptions.sauceBroth[0].name)).toBeInTheDocument();
  });

  test('resets form after adding to cart', () => {
    // Select noodle base
    const noodleButton = screen.getByRole('button', { name: menuOptions.noodleBase[0].name });
    fireEvent.click(noodleButton);

    // Move to broth step
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    // Select broth
    const brothButton = screen.getByRole('button', { name: menuOptions.sauceBroth[0].name });
    fireEvent.click(brothButton);

    // Add to cart
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    // Check if form is reset
    expect(screen.getByText(menuOptions.noodleBase[0].name)).not.toHaveClass('selected');
    expect(screen.getByText(menuOptions.sauceBroth[0].name)).not.toHaveClass('selected');
  });

  test('allows removing items from cart', () => {
    // Add an item to cart first
    const noodleButton = screen.getByRole('button', { name: menuOptions.noodleBase[0].name });
    fireEvent.click(noodleButton);

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    const brothButton = screen.getByRole('button', { name: menuOptions.sauceBroth[0].name });
    fireEvent.click(brothButton);

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    // Remove item from cart
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    // Check if cart is empty
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('calculates correct price for minimum required selections', async () => {
    render(<RamenBuilder />);

    // Select Rice Noodles (base price 2.50 + 1.50)
    const riceNoodlesOption = await screen.findByRole('radio', { name: 'Rice Noodles' });
    await act(async () => {
      await user.click(riceNoodlesOption);
    });

    // Select Miso Broth (price 0)
    const nextButton = await screen.findByRole('button', { name: 'Next' });
    await act(async () => {
      await user.click(nextButton);
      await user.click(nextButton);
      await user.click(nextButton);
    });

    const misoOption = await screen.findByRole('radio', { name: 'Miso' });
    await act(async () => {
      await user.click(misoOption);
    });

    // Total should be base price (2.50) + Rice Noodles (1.50) + Miso (0) = 10.49
    await waitFor(() => {
      const priceElement = screen.getByRole('status');
      expect(priceElement).toHaveTextContent('$10.49');
    });

    // Add to cart button should be enabled
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).not.toBeDisabled();
  });

  it('calculates correct price for full selection', async () => {
    render(<RamenBuilder />);

    // Select Rice Noodles (base price 2.50 + 1.50)
    const riceNoodlesOption = await screen.findByRole('radio', { name: 'Rice Noodles' });
    await act(async () => {
      await user.click(riceNoodlesOption);
    });

    // Navigate to protein and select Tofu (1.75)
    const nextButton = await screen.findByRole('button', { name: 'Next' });
    await act(async () => {
      await user.click(nextButton);
    });

    const tofuOption = await screen.findByRole('checkbox', { name: 'Tofu' });
    await act(async () => {
      await user.click(tofuOption);
    });

    // Navigate to vegetables and select Mushrooms (1.00) and Bean Sprouts (0.50)
    await act(async () => {
      await user.click(nextButton);
    });

    const mushroomsOption = await screen.findByRole('checkbox', { name: 'Mushrooms' });
    const beanSproutsOption = await screen.findByRole('checkbox', { name: 'Bean Sprouts' });
    await act(async () => {
      await user.click(mushroomsOption);
      await user.click(beanSproutsOption);
    });

    // Navigate to broth and select Spicy Miso (0.50)
    await act(async () => {
      await user.click(nextButton);
    });

    const spicyMisoOption = await screen.findByRole('radio', { name: 'Spicy Miso' });
    await act(async () => {
      await user.click(spicyMisoOption);
    });

    // Navigate to garnish and select Seaweed (0.50)
    await act(async () => {
      await user.click(nextButton);
    });

    const seaweedOption = await screen.findByRole('checkbox', { name: 'Seaweed' });
    await act(async () => {
      await user.click(seaweedOption);
    });

    // Total should be:
    // Base (2.50) + Rice Noodles (1.50) + Tofu (1.75) + Mushrooms (1.00) + 
    // Bean Sprouts (0.50) + Spicy Miso (0.50) + Seaweed (0.50) = 14.74
    await waitFor(() => {
      const priceElement = screen.getByRole('status');
      expect(priceElement).toHaveTextContent('$14.74');
    });
  });

  it('prevents adding to cart without required selections', async () => {
    render(<RamenBuilder />);

    // Initially Add to Cart should be disabled
    let addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).toBeDisabled();

    // Select only noodles
    const riceNoodlesOption = await screen.findByRole('radio', { name: 'Rice Noodles' });
    await act(async () => {
      await user.click(riceNoodlesOption);
    });

    // Add to Cart should still be disabled
    expect(addToCartButton).toBeDisabled();

    // Navigate to broth and select Miso
    const nextButton = await screen.findByRole('button', { name: 'Next' });
    await act(async () => {
      await user.click(nextButton);
      await user.click(nextButton);
      await user.click(nextButton);
    });

    const misoOption = await screen.findByRole('radio', { name: 'Miso' });
    await act(async () => {
      await user.click(misoOption);
    });

    // Now Add to Cart should be enabled
    expect(addToCartButton).not.toBeDisabled();
  });
});
