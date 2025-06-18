'use client';

import { useState, useEffect } from 'react';

/**
 * Client component that demonstrates edge function capabilities
 * with Amazon Q attribution
 */
export default function EdgeFunctionDemo() {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get headers from edge function
    fetch('/api/device-data')
      .then(response => response.json())
      .then(data => {
        setDeviceInfo(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching device data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading device information...</div>;
  }

  return (
    <div className="bg-blue-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Edge Function Demo
        <span className="ml-2 text-sm bg-blue-600 px-2 py-1 rounded">Built by Amazon Q</span>
      </h2>
      
      {deviceInfo ? (
        <div>
          <p className="mb-4">
            Your device has been detected as: <strong>{deviceInfo.deviceType}</strong>
          </p>
          
          <div className="mt-4 p-4 bg-blue-700 rounded-lg">
            <h3 className="font-bold mb-2">Recommended Features:</h3>
            <ul className="list-disc pl-5">
              {deviceInfo.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4 p-4 bg-blue-700 rounded-lg">
            <h3 className="font-bold mb-2">Tips for {deviceInfo.deviceType} users:</h3>
            <ul className="list-disc pl-5">
              {deviceInfo.recommendations.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4 text-right text-xs text-blue-300">
            Data generated at: {new Date(deviceInfo.timestamp).toLocaleString()}
          </div>
        </div>
      ) : (
        <p>Unable to detect device information. Please try again.</p>
      )}
    </div>
  );
}