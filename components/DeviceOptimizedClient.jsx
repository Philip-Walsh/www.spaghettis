'use client';

import { useEffect, useState } from 'react';

/**
 * Client component that adapts content based on device type detected by edge function
 */
export default function DeviceOptimizedClient({ 
  children,
  mobileContent,
  desktopContent,
  showRecommendations = false
}) {
  const [deviceType, setDeviceType] = useState(null);
  const [builtBy, setBuiltBy] = useState(null);
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get device type from response headers set by edge function
    fetch('/', { method: 'HEAD' })
      .then(response => {
        const deviceType = response.headers.get('X-Device-Type') || 'desktop';
        const builtBy = response.headers.get('X-Built-By');
        
        setDeviceType(deviceType);
        setBuiltBy(builtBy);
        
        // Fetch device-specific data from our API
        return fetch('/api/device-data');
      })
      .then(response => response.json())
      .then(data => {
        setDeviceData(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to client-side detection if edge function fails
        const isMobile = /mobile|android|iphone|ipad|ipod/i.test(navigator.userAgent);
        setDeviceType(isMobile ? 'mobile' : 'desktop');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading optimized content...</div>;
  }

  // Render content based on device type
  return (
    <>
      {deviceType === 'mobile' ? mobileContent : desktopContent || children}
      
      {showRecommendations && deviceData && (
        <div className="mt-6 p-4 bg-blue-700 rounded-lg">
          <h3 className="font-bold mb-2">Recommendations for {deviceData.deviceType} users:</h3>
          <ul className="list-disc pl-5">
            {deviceData.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
      
      {builtBy && (
        <div className="text-xs text-blue-300 mt-4 text-right">
          Optimized for {deviceType} by {builtBy}
        </div>
      )}
    </>
  );
}