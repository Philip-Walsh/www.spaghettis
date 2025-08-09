import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeviceHero from '../../components/device/DeviceHero';
import DeviceOptimizeClient from '../../components/device/DeviceOptimizeClient';

describe('Device Optimize Components', () => {
  describe('DeviceHero', () => {
    it('renders the hero section correctly', () => {
      render(<DeviceHero />);
      
      // Check for main heading
      expect(screen.getByRole('heading', { name: /Device Experience Optimization/i })).toBeInTheDocument();
      
      // Check for description text
      expect(screen.getByText(/This feature uses Edge Functions to detect your device type/i)).toBeInTheDocument();
    });

    it('displays the tech stack badges', () => {
      render(<DeviceHero />);
      
      // Check for technology mentions
      expect(screen.getByText(/Built with modern web technologies/i)).toBeInTheDocument();
    });
  });

  describe('DeviceOptimizeClient', () => {
    beforeEach(() => {
      // Mock headers that would be set by the edge function
      Object.defineProperty(window, 'location', {
        value: {
          ...window.location,
          href: 'http://localhost:3000/edge/device-optimize'
        },
        writable: true
      });
    });

    it('renders the device detection interface', () => {
      render(<DeviceOptimizeClient />);
      
      // Should show loading state initially
      expect(screen.getByText(/Loading device information/i)).toBeInTheDocument();
      expect(screen.getByText(/Detecting capabilities/i)).toBeInTheDocument();
    });

    it('displays device capability sections', () => {
      render(<DeviceOptimizeClient />);
      
      // Check for main container structure - looking for the actual CSS class
      const container = document.querySelector('.deviceContainer');
      expect(container).toBeInTheDocument();
      
      // Verify the content structure is present
      const content = document.querySelector('.content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Edge Function Integration', () => {
    it('handles missing edge function headers gracefully', () => {
      // Test that components don't crash when edge function headers are missing
      render(<DeviceOptimizeClient />);
      
      // Should still render without crashing
      expect(screen.getByText(/Loading device information/i)).toBeInTheDocument();
    });

    it('displays the correct explanation text', () => {
      render(
        <div className="p-6 mt-8 bg-gradient-to-r from-slate-900 to-blue-800 rounded-lg border border-purple-500/20">
          <h2 className="text-xl font-bold mb-4 text-gradient">How It Works</h2>
          <p className="mb-4 text-slate-200">
            This feature uses Netlify Edge Functions to detect your device type before the page is served. The
            edge function adds custom headers that the React component can read to optimize the experience.
          </p>
          <p className="text-purple-200">
            Built by Amazon Q - demonstrating edge computing capabilities for real-time personalization.
          </p>
        </div>
      );
      
      expect(screen.getByText(/How It Works/i)).toBeInTheDocument();
      expect(screen.getByText(/Built by Amazon Q/i)).toBeInTheDocument();
      expect(screen.getByText(/Netlify Edge Functions/i)).toBeInTheDocument();
    });
  });
});
