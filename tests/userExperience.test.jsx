import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import RamenBuilder from '../components/RamenBuilder';

// Utility: select option by label
const selectOptionByLabel = async (label) => {
  const option = await screen.findByLabelText(new RegExp(label, 'i'));
  option.focus();
  await screen.findByLabelText(new RegExp(label, 'i'));
  option.click();
};

describe('RamenBuilder User Experience', () => {
  afterEach(() => {
    jest.clearAllMocks && jest.clearAllMocks();
  });

  it('shows welcome and lets user complete a simple order', async () => {
    render(<RamenBuilder />);
    await screen.findByText(/choose your noodle base/i);
    await selectOptionByLabel('forbidden ramen');
    screen.getByLabelText(/next/i).click();
    await screen.findByText(/choose your protein/i);
    await selectOptionByLabel('tofu');
    await selectOptionByLabel('chicken');
    screen.getByLabelText(/next/i).click();
    await screen.findByText(/choose your garden picks/i);
    await selectOptionByLabel('bok choy');
    screen.getByLabelText(/next/i).click();
    await screen.findByText(/sauce|broth|soup/i);
    await selectOptionByLabel('miso');
    screen.getByLabelText(/next/i).click();
    await screen.findByText(/garnish/i);
    await selectOptionByLabel('seaweed');
    screen.getByLabelText(/finish/i).click();
    expect(screen.getByText(/forbidden ramen/i)).toBeInTheDocument();
    expect(screen.getByText(/tofu/i)).toBeInTheDocument();
    expect(screen.getByText(/chicken/i)).toBeInTheDocument();
    expect(screen.getByText(/bok choy/i)).toBeInTheDocument();
    expect(screen.getByText(/miso/i)).toBeInTheDocument();
    expect(screen.getByText(/seaweed/i)).toBeInTheDocument();
    expect(screen.getByText(/total: \$/i)).toBeInTheDocument();
  });

  it('pre-ticks defaults for Quantum Soba', async () => {
    render(<RamenBuilder />);
    await screen.findByText(/choose your noodle base/i);
    await selectOptionByLabel('quantum soba');
    screen.getByLabelText(/next/i).click();
    await screen.findByText(/choose your protein/i);
    screen.getByLabelText(/next/i).click();
    await screen.findByText(/garden picks/i);
    // Should have mushrooms and bean sprouts pre-selected
    const mushrooms = screen.getByLabelText(/mushrooms/i);
    const beanSprouts = screen.getByLabelText(/bean sprouts/i);
    expect(mushrooms).toBeChecked();
    expect(beanSprouts).toBeChecked();
    // Deselect bean sprouts, check price
    beanSprouts.click();
    expect(mushrooms).toBeChecked();
    expect(beanSprouts).not.toBeChecked();
    // Reselect bean sprouts
    beanSprouts.click();
    expect(beanSprouts).toBeChecked();
  });

  it('does not allow next step without selection', async () => {
    render(<RamenBuilder />);
    await screen.findByText(/choose your noodle base/i);
    // Next should be disabled
    expect(screen.getByLabelText(/next/i)).toBeDisabled();
    await selectOptionByLabel('neo udon');
    expect(screen.getByLabelText(/next/i)).not.toBeDisabled();
  });

  it('supports keyboard navigation for selection', async () => {
    render(<RamenBuilder />);
    await screen.findByText(/choose your noodle base/i);
    const option = screen.getByLabelText(/neo udon/i);
    option.focus();
    fireEvent.keyDown(option, { key: ' ', code: 'Space' });
    expect(option).toBeChecked();
  });

  it('is robust to random navigation and selection changes', async () => {
    render(<RamenBuilder />);
    await screen.findByText(/choose your noodle base/i);
    await selectOptionByLabel('neo udon');
    screen.getByLabelText(/next/i).click();
    await screen.findByText(/choose your protein/i);
    await selectOptionByLabel('shrimp');
    screen.getByLabelText(/next/i).click();
    await screen.findByText(/choose your protein/i);
    await selectOptionByLabel('tofu');
    screen.getByLabelText(/next/i).click();
    await screen.findByText(/garden picks/i);
    await selectOptionByLabel('carrots');
    screen.getByLabelText(/next/i).click();
    await screen.findByText(/curry/i);
    await selectOptionByLabel('curry');
    screen.getByLabelText(/next/i).click();
    await screen.findByText(/garnish/i);
    await selectOptionByLabel('egg');
    screen.getByLabelText(/finish/i).click();
    expect(screen.getByText(/neo udon/i)).toBeInTheDocument();
    expect(screen.getByText(/shrimp/i)).toBeInTheDocument();
    expect(screen.getByText(/tofu/i)).toBeInTheDocument();
    expect(screen.getByText(/carrots/i)).toBeInTheDocument();
    expect(screen.getByText(/curry/i)).toBeInTheDocument();
    expect(screen.getByText(/egg/i)).toBeInTheDocument();
    expect(screen.getByText(/total: \$/i)).toBeInTheDocument();
  });
});
