import { render, screen, fireEvent } from '@testing-library/react';
import RamenBuilder from '../../components/RamenBuilder';

// Test Data Constants
export const PRICES = {
  NOODLES: {
    FORBIDDEN_RAMEN: 0,
    QUANTUM_SOBA: 1.75,
    NEO_UDON: 1.5,
  },
  PROTEINS: {
    TOFU: 1.75,
    CHICKEN: 2.0,
    SHRIMP: 2.5,
  },
  GARDEN_PICKS: {
    BOK_CHOY: 0.75,
    MUSHROOMS: 1.0,
    BEAN_SPROUTS: 0.5,
    CARROTS: 0.5,
  },
  BROTHS: {
    MISO: 0,
    CURRY: 1.0,
  },
  GARNISHES: {
    SEAWEED: 0.5,
    EGG: 0.75,
  },
};

// Utility for robust option selection
const selectOptionByLabel = async (label) => {
  const el = await screen.findByLabelText(new RegExp(label, 'i'));
  fireEvent.click(el);
};

// Always use findByLabelText for ingredient/option selection to match the UI's aria-labels. Do not use findByRole('button') for custom controls.

// Page Object Pattern
export class RamenBuilderPage {
  static async setup() {
    render(<RamenBuilder />);
    return new RamenBuilderPage();
  }

  async selectNoodle(name) {
    await selectOptionByLabel(name);
    return this;
  }

  async selectProteins(proteins) {
    for (const protein of proteins) {
      await selectOptionByLabel(protein);
    }
    return this;
  }

  async selectGardenPicks(picks) {
    for (const pick of picks) {
      await selectOptionByLabel(pick);
    }
    return this;
  }

  async selectBroth(name) {
    await selectOptionByLabel(name);
    return this;
  }

  async selectGarnishes(garnishes) {
    for (const garnish of garnishes) {
      await selectOptionByLabel(garnish);
    }
    return this;
  }

  async nextStep() {
    fireEvent.click(screen.getByLabelText(/next/i));
    return this;
  }

  async finish() {
    fireEvent.click(screen.getByLabelText(/finish/i));
    return this;
  }

  async goToStep(stepIdx) {
    const navBtns = screen.getAllByRole('button', { name: '' });
    fireEvent.click(navBtns[stepIdx]);
    return this;
  }

  async verifySelections(selections) {
    for (const item of selections) {
      expect(screen.getByText(new RegExp(item, 'i'))).toBeInTheDocument();
    }
    return this;
  }

  async verifyPrice(expectedTotal) {
    expect(screen.getByText(new RegExp(`total: \$${expectedTotal.toFixed(2)}`, 'i'))).toBeInTheDocument();
    return this;
  }

  async verifyButtonState(buttonName, isSelected) {
    const button = screen.getByLabelText(new RegExp(buttonName, 'i'));
    expect(button).toHaveAttribute('aria-pressed', isSelected.toString());
    return this;
  }

  async verifyItemNotPresent(itemName) {
    expect(screen.queryByText(new RegExp(itemName, 'i'))).not.toBeInTheDocument();
    return this;
  }
}