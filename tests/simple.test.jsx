import { render, screen } from '@testing-library/react';
import React from 'react';

// Simple component to test our basic setup
function SimpleComponent() {
  return <div>Hello Test</div>;
}

describe('Basic Test Setup', () => {
  it('should render a simple component', () => {
    render(<SimpleComponent />);
    expect(screen.getByText('Hello Test')).toBeInTheDocument();
  });

  it('should handle basic imports', () => {
    const utils = require('../components/utils');
    expect(typeof utils.calculateTotalPrice).toBe('function');
  });
});
