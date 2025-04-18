import mockMenuOptions from '../__mocks__/menuOptions.js';

'use client';

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RamenBuilder from '../../components/RamenBuilder';

jest.mock('../../data/menuOptions', () => ({
  menuOptions: mockMenuOptions
}));

describe('RamenBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Utility for robust option selection
  const selectOption = async (role, name) => {
    // Use getByRole for button with aria-label
    const el = await screen.findByRole('button', { name });
    await userEvent.click(el);
  };

  test('renders initial state correctly', async () => {
    render(<RamenBuilder />);
    expect(await screen.findByText('Build Your Perfect Ramen')).toBeInTheDocument();
    expect(await screen.findByText('Total')).toBeInTheDocument();
    expect(await screen.findByText('$0.00')).toBeInTheDocument();
  });

  test('updates price when selecting noodle base', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    await selectOption('button', /Neo Udon/i);

    expect(await screen.findByText('$1.50')).toBeInTheDocument();
  });

  test('updates price when selecting multiple proteins', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    // Select a base to enable Next
    await selectOption('button', /Forbidden Ramen/i);
    
    // Navigate to protein step
    const nextButton = await screen.findByRole('button', { name: /next/i });
    await userEvent.click(nextButton);

    // DEBUG: Output DOM before protein selection
    screen.debug();
    try {
      // Use findByText for async/fuzzy match
      await selectOption('button', /Chicken/i);
      await selectOption('button', /Tofu/i);
      // Price should be base + chicken + tofu
      expect(await screen.findByText('$3.75')).toBeInTheDocument();
    } catch (e) {
      // Output DOM and error for diagnosis
      screen.debug();
      console.error('Protein step failure:', e);
      throw e;
    }
  });

  test('navigates between steps correctly', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    // Select a base to enable navigation
    await selectOption('button', /Forbidden Ramen/i);
    
    const nextButton = await screen.findByRole('button', { name: /next/i });
    const backButton = await screen.findByRole('button', { name: /back/i });

    await userEvent.click(nextButton);
    expect(await screen.findByText('Choose Your Protein')).toBeInTheDocument();

    await userEvent.click(backButton);
    expect(await screen.findByText('Choose Your Noodle Base')).toBeInTheDocument();
  });

  test('can order multiple different bases and proteins', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    // Select multiple bases (simulate real menuOptions)
    await selectOption('button', /Forbidden Ramen/i);
    await selectOption('button', /Neo Udon/i);

    // Go to next step (protein)
    const nextButton = await screen.findByRole('button', { name: /next/i });
    await userEvent.click(nextButton);

    // Select multiple proteins
    await selectOption('button', /Chicken/i);
    await selectOption('button', /Tofu/i);

    // Check price reflects all selected
    // (Assuming Forbidden Ramen $0, Neo Udon $1.5, Chicken $2.0, Tofu $1.75)
    expect(await screen.findByText('$5.25')).toBeInTheDocument();
  });

  test('can order a gluten free base and protein', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    // Select Rice Noodles (GF)
    await selectOption('button', /Rice Noodles \(GF\)/i);

    // Go to next step
    const nextButton = await screen.findByRole('button', { name: /next/i });
    await userEvent.click(nextButton);

    // Select Edamame (GF)
    await selectOption('button', /Edamame \(GF\)/i);

    // Check price reflects both
    // (Rice Noodles $1.5, Edamame $1.0)
    expect(await screen.findByText('$2.50')).toBeInTheDocument();
  });

  test('full end-to-end ramen order flow', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    // Step 1: Select two bases
    await selectOption('button', /Forbidden Ramen/i);
    await selectOption('button', /Neo Udon/i);
    // Next
    const nextButton = await screen.findByRole('button', { name: /next/i });
    await userEvent.click(nextButton);

    // Step 2: Select two proteins
    await selectOption('button', /Chicken/i);
    await selectOption('button', /Tofu/i);
    // Next
    await userEvent.click(nextButton);

    // Step 3: Select two garden picks
    await selectOption('button', /Bok Choy/i);
    await selectOption('button', /Mushrooms/i);
    // Next
    await userEvent.click(nextButton);

    // Step 4: Select a broth
    await selectOption('button', /Miso/i);
    // Next (Finish)
    await userEvent.click(nextButton);

    // Final price: Forbidden Ramen $0 + Neo Udon $1.5 + Chicken $2.0 + Tofu $1.75 + Bok Choy $0.75 + Mushrooms $1.0 + Miso $0
    // Total = $7.00
    expect(await screen.findByText('$7.00')).toBeInTheDocument();

    // Check that all selected items are present in the summary (if summary step shows them)
    expect(await screen.findByText('Forbidden Ramen')).toBeInTheDocument();
    expect(await screen.findByText('Neo Udon')).toBeInTheDocument();
    expect(await screen.findByText('Chicken')).toBeInTheDocument();
    expect(await screen.findByText('Tofu')).toBeInTheDocument();
    expect(await screen.findByText('Bok Choy')).toBeInTheDocument();
    expect(await screen.findByText('Mushrooms')).toBeInTheDocument();
    expect(await screen.findByText('Miso')).toBeInTheDocument();
  });

  test('pre-ticks default garden picks when selecting a noodle base with defaults', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    // Select Quantum Soba and default picks
    await selectOption('button', /Quantum Soba/i);
    // Next to proteins
    const nextButton = await screen.findByRole('button', { name: /next/i });
    await userEvent.click(nextButton); // To Protein
    // Select a protein so we can proceed
    await selectOption('button', /Tofu/i);
    // Next to garden picks
    await userEvent.click(nextButton);

    // Default garden picks: Mushrooms, Bean Sprouts should be checked
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Mushrooms/i })).toBeChecked();
      expect(screen.getByRole('button', { name: /Bean Sprouts/i })).toBeChecked();
    });
  });

  test('does not throw if selectedItem is array of strings or objects', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    // Select a noodle base
    await selectOption('button', /Quantum Soba/i);

    // Next to Protein
    const nextButton = await screen.findByRole('button', { name: /next/i });
    await userEvent.click(nextButton);

    // Select a protein (simulate object)
    await selectOption('button', /Tofu/i);
    // Deselect (simulate array of names)
    await selectOption('button', /Tofu/i);

    // No error should be thrown, and UI should update
    expect(screen.getByRole('button', { name: /Tofu/i })).not.toBeChecked();
  });

  test('card uses responsive clamp max-width', () => {
    render(<RamenBuilder />);
    const card = screen.getByTestId('card');
    expect(card).toHaveStyle('max-width: clamp(360px, 90%, 1200px)');
  });

  test('shows summary on finish and allows ordering more', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    // Complete flow: select one from each step
    await selectOption('button', /Forbidden Ramen/i);
    await userEvent.click(await screen.findByRole('button', { name: /Next/i }));
    await selectOption('button', /Chicken/i);
    await userEvent.click(await screen.findByRole('button', { name: /Next/i }));
    await selectOption('button', /Bok Choy/i);
    await userEvent.click(await screen.findByRole('button', { name: /Next/i }));
    await selectOption('button', /Miso/i);
    // Finish button
    const finishBtn = await screen.findByRole('button', { name: /Finish/i });
    await userEvent.click(finishBtn);

    // Summary should appear
    expect(await screen.findByText('Selection Complete!')).toBeInTheDocument();
    expect(screen.getByText('Your Order')).toBeInTheDocument();
    // Check items listed
    expect(screen.getByText(/Forbidden Ramen/i)).toBeInTheDocument();
    expect(screen.getByText(/Chicken/i)).toBeInTheDocument();
    expect(screen.getByText(/Bok Choy/i)).toBeInTheDocument();
    expect(screen.getByText(/Miso/i)).toBeInTheDocument();
    // Check total
    expect(screen.getByText(/Total: \$/i)).toBeInTheDocument();

    // Order more resets flow
    const orderMoreBtn = screen.getByRole('button', { name: /Order More/i });
    await userEvent.click(orderMoreBtn);
    // Should return to first step
    expect(await screen.findByText('Choose Your Noodle Base')).toBeInTheDocument();
  });

  test('stepper and summary happy path', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);
    // Nice order: select one per step
    await selectOption('button', /Forbidden Ramen/i);
    await userEvent.click(await screen.findByRole('button', { name: /Next/i }));
    await selectOption('button', /Chicken/i);
    await userEvent.click(await screen.findByRole('button', { name: /Next/i }));
    await selectOption('button', /Bok Choy/i);
    await userEvent.click(await screen.findByRole('button', { name: /Next/i }));
    await selectOption('button', /Miso/i);
    // Finish
    await userEvent.click(await screen.findByRole('button', { name: /Finish/i }));
    expect(await screen.findByText('Selection Complete!')).toBeInTheDocument();
    expect(screen.getByText('Your Order')).toBeInTheDocument();
    expect(screen.getByText(/Forbidden Ramen/)).toBeInTheDocument();
    expect(screen.getByText(/Chicken/)).toBeInTheDocument();
    expect(screen.getByText(/Bok Choy/)).toBeInTheDocument();
    expect(screen.getByText(/Miso/)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$/)).toBeInTheDocument();
    // Order more resets
    await userEvent.click(screen.getByRole('button', { name: /Order More/i }));
    expect(await screen.findByText('Choose Your Noodle Base')).toBeInTheDocument();
  });

  test('multiselect and summary with complex order', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);
    // Complicated: select multiple proteins, garden, garnish
    await selectOption('button', /Neo Udon/i);
    await userEvent.click(await screen.findByRole('button', { name: /Next/i }));
    await selectOption('button', /Chicken/i);
    await selectOption('button', /Tofu/i);
    await userEvent.click(await screen.findByRole('button', { name: /Next/i }));
    await selectOption('button', /Mushrooms/i);
    await selectOption('button', /Bok Choy/i);
    await userEvent.click(await screen.findByRole('button', { name: /Next/i }));
    await selectOption('button', /Spicy Miso/i);
    await userEvent.click(await screen.findByRole('button', { name: /Finish/i }));
    expect(await screen.findByText('Selection Complete!')).toBeInTheDocument();
    expect(screen.getByText(/Neo Udon/)).toBeInTheDocument();
    expect(screen.getByText(/Chicken/)).toBeInTheDocument();
    expect(screen.getByText(/Tofu/)).toBeInTheDocument();
    expect(screen.getByText(/Mushrooms/)).toBeInTheDocument();
    expect(screen.getByText(/Bok Choy/)).toBeInTheDocument();
    expect(screen.getByText(/Spicy Miso/)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /Order More/i }));
    expect(await screen.findByText('Choose Your Noodle Base')).toBeInTheDocument();
  });

  test('robustness: random order, deselect, reselect', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);
    // Select and deselect in various steps
    await selectOption('button', /Quantum Soba/i);
    await userEvent.click(await screen.findByRole('button', { name: /Next/i }));
    await selectOption('button', /Tofu/i);
    await selectOption('button', /Chicken/i);
    await selectOption('button', /Tofu/i); // Deselect
    await selectOption('button', /Tofu/i); // Reselect
    await userEvent.click(await screen.findByRole('button', { name: /Next/i }));
    await selectOption('button', /Carrots/i);
    await selectOption('button', /Carrots/i); // Deselect
    await userEvent.click(await screen.findByRole('button', { name: /Next/i }));
    await selectOption('button', /Tonkotsu/i);
    await userEvent.click(await screen.findByRole('button', { name: /Finish/i }));
    expect(await screen.findByText('Selection Complete!')).toBeInTheDocument();
    expect(screen.getByText(/Quantum Soba/)).toBeInTheDocument();
    expect(screen.getByText(/Tofu/)).toBeInTheDocument();
    expect(screen.getByText(/Chicken/)).toBeInTheDocument();
    expect(screen.getByText(/Tonkotsu/)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$/)).toBeInTheDocument();
  });
});
