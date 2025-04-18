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
    const el = await screen.findByRole(role, { name });
    await userEvent.click(el);
  };

  test('renders initial state correctly', async () => {
    render(<RamenBuilder />);

    expect(await screen.findByText('Build Your Perfect Ramen')).toBeInTheDocument();
    expect(await screen.findByText('Total Price')).toBeInTheDocument();
    expect(await screen.findByText('$0.00')).toBeInTheDocument();
  });

  test('updates price when selecting noodle base', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    await selectOption('radio', /Neo Udon/i);

    expect(await screen.findByText('$1.50')).toBeInTheDocument();
  });

  test('updates price when selecting multiple proteins', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    // Select a base to enable Next
    await selectOption('radio', /Forbidden Ramen/i);
    
    // Navigate to protein step
    const nextButton = await screen.findByRole('button', { name: /next/i });
    await userEvent.click(nextButton);

    // DEBUG: Output DOM before protein selection
    screen.debug();
    try {
      // Use findByText for async/fuzzy match
      await selectOption('checkbox', /Chicken/i);
      await selectOption('checkbox', /Tofu/i);
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
    await selectOption('radio', /Forbidden Ramen/i);
    
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
    await selectOption('radio', /Forbidden Ramen/i);
    await selectOption('radio', /Neo Udon/i);

    // Go to next step (protein)
    const nextButton = await screen.findByRole('button', { name: /next/i });
    await userEvent.click(nextButton);

    // Select multiple proteins
    await selectOption('checkbox', /Chicken/i);
    await selectOption('checkbox', /Tofu/i);

    // Check price reflects all selected
    // (Assuming Forbidden Ramen $0, Neo Udon $1.5, Chicken $2.0, Tofu $1.75)
    expect(await screen.findByText('$5.25')).toBeInTheDocument();
  });

  test('can order a gluten free base and protein', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    // Select Rice Noodles (GF)
    await selectOption('radio', /Rice Noodles \(GF\)/i);

    // Go to next step
    const nextButton = await screen.findByRole('button', { name: /next/i });
    await userEvent.click(nextButton);

    // Select Edamame (GF)
    await selectOption('checkbox', /Edamame \(GF\)/i);

    // Check price reflects both
    // (Rice Noodles $1.5, Edamame $1.0)
    expect(await screen.findByText('$2.50')).toBeInTheDocument();
  });

  test('full end-to-end ramen order flow', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    // Step 1: Select two bases
    await selectOption('radio', /Forbidden Ramen/i);
    await selectOption('radio', /Neo Udon/i);
    // Next
    const nextButton = await screen.findByRole('button', { name: /next/i });
    await userEvent.click(nextButton);

    // Step 2: Select two proteins
    await selectOption('checkbox', /Chicken/i);
    await selectOption('checkbox', /Tofu/i);
    // Next
    await userEvent.click(nextButton);

    // Step 3: Select two garden picks
    await selectOption('checkbox', /Bok Choy/i);
    await selectOption('checkbox', /Mushrooms/i);
    // Next
    await userEvent.click(nextButton);

    // Step 4: Select a broth
    await selectOption('radio', /Miso/i);
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
    await selectOption('radio', /Quantum Soba/i);
    // Next to proteins
    const nextButton = await screen.findByRole('button', { name: /next/i });
    await userEvent.click(nextButton); // To Protein
    // Select a protein so we can proceed
    await selectOption('checkbox', /Tofu/i);
    // Next to garden picks
    await userEvent.click(nextButton);

    // Default garden picks: Mushrooms, Bean Sprouts should be checked
    await waitFor(() => {
      expect(screen.getByRole('checkbox', { name: /Mushrooms/i })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: /Bean Sprouts/i })).toBeChecked();
    });
  });

  test('does not throw if selectedItem is array of strings or objects', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    // Select a noodle base
    await selectOption('radio', /Quantum Soba/i);

    // Next to Protein
    const nextButton = await screen.findByRole('button', { name: /next/i });
    await userEvent.click(nextButton);

    // Select a protein (simulate object)
    await selectOption('checkbox', /Tofu/i);
    // Deselect (simulate array of names)
    await selectOption('checkbox', /Tofu/i);

    // No error should be thrown, and UI should update
    expect(screen.getByRole('checkbox', { name: /Tofu/i })).not.toBeChecked();
  });
});
