'use client';

import React from 'react';

export default function DeviceHero() {
  return (
    <div className="device-hero bg-device-gradient p-8 mb-8">
      <h1 className="device-hero-title">
        Device Experience Optimization
      </h1>
      <p className="device-hero-text">
        This feature uses Edge Functions to detect your device type before the page is served.
        The edge function adds custom headers that the React component can read to optimize the experience.
        The UI adapts to your device capabilities and preferences in real-time.
      </p>
      <div className="flex items-center">
        <span className="device-badge">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Built with modern web technologies
        </span>
      </div>
    </div>
  );
}