import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuClient from '../../components/MenuClient';

// Mock data for testing
const mockMenuItems = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with creamy sauce'
  },
  {
    id: 2,
    name: 'Penne Arrabbiata',
    description: 'Spicy tomato sauce with penne'
  }
];

describe('MenuClient', () => {
  beforeEach(() => {
    // Mock the API call
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // Clean up the mock
    global.fetch.mockRestore();
  });

  it('renders menu title and heading', () => {
    render(<MenuClient />);
    expect(screen.getByText('Noodle Menu')).toBeInTheDocument();
  });

  it('fetches and displays menu items from API', async () => {
    // Mock successful API response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockMenuItems)
    });

    render(<MenuClient />);

    // Wait for menu items to load
    await waitFor(() => {
      expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
      expect(screen.getByText('Penne Arrabbiata')).toBeInTheDocument();
    });
  });

  it('falls back to local data when API fails', async () => {
    // Mock failed API response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.reject(new Error('API error'))
    });

    render(<MenuClient />);

    // Wait for fallback local menu items to load
    await waitFor(() => {
      expect(screen.getByText('Forbidden Ramen')).toBeInTheDocument();
      expect(screen.getByText('Neo Udon')).toBeInTheDocument();
      expect(screen.getByText('Quantum Soba')).toBeInTheDocument();
    });
  });

  it('handles empty menu items gracefully', async () => {
    // Mock empty menu response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([])
    });

    render(<MenuClient />);

    // Wait for empty state to be rendered
    await waitFor(() => {
      expect(screen.getByText('No menu items available.')).toBeInTheDocument();
    });
  });
});
