'use client';

import { useState, useEffect } from 'react';

/**
 * Device Information Panel with Amazon Q branding
 * Displays various client-side information and device capabilities
 */
export default function DeviceInfoPanel() {
  const [deviceInfo, setDeviceInfo] = useState({
    userAgent: '',
    screenSize: '',
    colorScheme: '',
    language: '',
    timezone: '',
    touchEnabled: false,
    cookiesEnabled: false,
    localStorage: false,
    geolocation: false,
    notifications: false,
    camera: false,
    microphone: false
  });

  useEffect(() => {
    // Get basic device information
    const info = {
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light',
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      touchEnabled: 'ontouchstart' in window,
      cookiesEnabled: navigator.cookieEnabled,
      localStorage: !!window.localStorage,
      geolocation: !!navigator.geolocation,
      notifications: 'Notification' in window,
      camera: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
      microphone: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    };
    
    setDeviceInfo(info);
  }, []);

  return (
    <div className="p-4 rounded-lg shadow-lg" 
         style={{ 
           background: 'linear-gradient(135deg, #232F3E 0%, #00A1C9 50%, #6B43BC 100%)',
           border: '1px solid rgba(255, 255, 255, 0.1)'
         }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FFFFFF" />
            <path d="M2 17L12 22L22 17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Device Information
        </h3>
        <span className="text-xs text-white opacity-70">Powered by Amazon Q</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="bg-white bg-opacity-10 p-2 rounded">
          <span className="text-teal-200 font-medium">Screen:</span> 
          <span className="text-white ml-1">{deviceInfo.screenSize}</span>
        </div>
        
        <div className="bg-white bg-opacity-10 p-2 rounded">
          <span className="text-teal-200 font-medium">Theme:</span> 
          <span className="text-white ml-1">{deviceInfo.colorScheme}</span>
        </div>
        
        <div className="bg-white bg-opacity-10 p-2 rounded">
          <span className="text-teal-200 font-medium">Language:</span> 
          <span className="text-white ml-1">{deviceInfo.language}</span>
        </div>
        
        <div className="bg-white bg-opacity-10 p-2 rounded">
          <span className="text-teal-200 font-medium">Timezone:</span> 
          <span className="text-white ml-1">{deviceInfo.timezone}</span>
        </div>
      </div>
      
      <h4 className="text-white mt-4 mb-2 font-medium">Device Capabilities:</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <Capability name="Touch" enabled={deviceInfo.touchEnabled} />
        <Capability name="Cookies" enabled={deviceInfo.cookiesEnabled} />
        <Capability name="Storage" enabled={deviceInfo.localStorage} />
        <Capability name="Location" enabled={deviceInfo.geolocation} />
        <Capability name="Notifications" enabled={deviceInfo.notifications} />
        <Capability name="Camera" enabled={deviceInfo.camera} />
      </div>
    </div>
  );
}

// Helper component for capabilities
function Capability({ name, enabled }) {
  return (
    <div className="flex items-center">
      <div className={`w-2 h-2 rounded-full mr-2 ${enabled ? 'bg-green-400' : 'bg-red-400'}`}></div>
      <span className="text-white text-sm">{name}</span>
    </div>
  );
}