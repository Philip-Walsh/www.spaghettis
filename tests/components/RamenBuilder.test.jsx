'use client';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RamenBuilder from '../../components/RamenBuilder';

const mockMenuOptions = {
  noodleBase: {
    label: 'Choose Your Noodle Base',
    key: 'noodleBase',
    multi: false,
    choices: [
      { name: 'Ramen', price: 0, icon: '🍜', tag: 'base' },
      { name: 'Udon', price: 1.5, icon: '🍜', tag: 'base' }
    ]
  },
  protein: {
    label: 'Choose Your Protein',
    key: 'protein',
    multi: true,
    choices: [
      { name: 'Chicken', price: 2.0, icon: '🐔', tag: 'meat' },
      { name: 'Tofu', price: 1.75, icon: '🌱', tag: 'vegan' }
    ]
  }
};

jest.mock('../../data/menuOptions', () => ({
  ...mockMenuOptions
}));

jest.mock('../../components/utils', () => ({
  calculateTotalPrice: jest.fn()
}));

describe('RamenBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders initial state correctly', () => {
    render(<RamenBuilder />);

    expect(screen.getByText('Build Your Perfect Ramen')).toBeInTheDocument();
    expect(screen.getByText('Total Price')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  test('updates price when selecting noodle base', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    const udonButton = screen.getByText('Udon');
    await user.click(udonButton);

    expect(screen.getByText('$1.50')).toBeInTheDocument();
  });

  test('updates price when selecting multiple proteins', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    // Navigate to protein step
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);

    // Select both proteins
    const chickenButton = screen.getByText('Chicken');
    const tofuButton = screen.getByText('Tofu');

    await user.click(chickenButton);
    await user.click(tofuButton);

    // Price should be base + chicken + tofu
    expect(screen.getByText('$3.75')).toBeInTheDocument();
  });

  test('navigates between steps correctly', async () => {
    const user = userEvent.setup();
    render(<RamenBuilder />);

    const nextButton = screen.getByText('Next');
    const backButton = screen.getByText('Back');

    await user.click(nextButton);
    expect(screen.getByText('Choose Your Protein')).toBeInTheDocument();

    await user.click(backButton);
    expect(screen.getByText('Choose Your Noodle Base')).toBeInTheDocument();
  });
});
