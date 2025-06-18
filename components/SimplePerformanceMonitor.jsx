'use client';

import { useEffect } from 'react';

/**
 * A simplified performance monitor that doesn't rely on web-vitals
 * Uses browser's native Performance API
 */
export default function SimplePerformanceMonitor() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || !window.performance) return;

    // Log basic performance metrics
    const logPerformance = () => {
      // Get navigation timing
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        console.log('Page Load Time:', navigation.loadEventEnd - navigation.startTime, 'ms');
        console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.startTime, 'ms');
        console.log('Server Response Time:', navigation.responseEnd - navigation.requestStart, 'ms');
      }

      // Log resource timing
      const resources = performance.getEntriesByType('resource');
      console.log(`Resources loaded: ${resources.length}`);
    };

    // Log performance after page load
    if (document.readyState === 'complete') {
      logPerformance();
    } else {
      window.addEventListener('load', logPerformance);
      return () => window.removeEventListener('load', logPerformance);
    }
  }, []);

  // This component doesn't render anything visible
  return null;
}