'use client';

import { useEffect } from 'react';

/**
 * PerformanceMonitor component that tracks and reports web vitals
 * This is a client-side only component
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Load web-vitals only on client side
    const reportWebVitals = async () => {
      try {
        const webVitals = await import('web-vitals');
        const { getCLS, getFID, getLCP, getFCP, getTTFB } = webVitals;
        
        getCLS(metric => console.log('CLS:', metric.value));
        getFID(metric => console.log('FID:', metric.value));
        getLCP(metric => console.log('LCP:', metric.value));
        getFCP(metric => console.log('FCP:', metric.value));
        getTTFB(metric => console.log('TTFB:', metric.value));
      } catch (error) {
        console.error('Failed to load web-vitals:', error);
      }
    };

    reportWebVitals();
  }, []);

  // This component doesn't render anything visible
  return null;
}