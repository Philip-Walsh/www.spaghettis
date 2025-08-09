import { render, screen, fireEvent } from '@testing-library/react';
import StepControls from '../../components/StepControls';

describe('StepControls', () => {
  const mockProps = {
    onNext: jest.fn(),
    onBack: jest.fn(),
    canProceed: true,
    isLastStep: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders navigation buttons', () => {
    render(<StepControls {...mockProps} />);
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('calls onNext when next button clicked', () => {
    render(<StepControls {...mockProps} />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockProps.onNext).toHaveBeenCalled();
  });

  it('calls onBack when back button clicked', () => {
    render(<StepControls {...mockProps} />);
    fireEvent.click(screen.getByText('Back'));
    expect(mockProps.onBack).toHaveBeenCalled();
  });

  it('disables next when canProceed is false', () => {
    render(<StepControls {...mockProps} canProceed={false} />);
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('disables back button when onBack is not provided', () => {
    render(<StepControls {...mockProps} onBack={null} />);
    expect(screen.getByText('Back')).toBeDisabled();
  });

  it('shows Finish button on last step', () => {
    render(<StepControls {...mockProps} isLastStep={true} />);
    expect(screen.getByText('Finish')).toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });
});