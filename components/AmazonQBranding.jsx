'use client';

import { useState, useEffect } from 'react';

/**
 * Amazon Q Branding component with Amazon Q color palette
 * Colors based on Amazon Q's brand colors: blue, teal, and purple gradients
 */
export default function AmazonQBranding() {
  const [currentTime, setCurrentTime] = useState('');
  const [networkStatus, setNetworkStatus] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(null);
  
  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    }, 1000);
    
    // Check network status
    const handleNetworkChange = () => {
      setNetworkStatus(navigator.onLine);
    };
    
    // Check if audio is enabled
    const checkAudio = async () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        setAudioEnabled(audioContext.state !== 'suspended');
      } catch (e) {
        setAudioEnabled(false);
      }
    };
    
    // Check battery status if available
    const checkBattery = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await navigator.getBattery();
          setBatteryLevel(Math.round(battery.level * 100));
          
          battery.addEventListener('levelchange', () => {
            setBatteryLevel(Math.round(battery.level * 100));
          });
        } catch (e) {
          console.log('Battery API not supported');
        }
      }
    };
    
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    
    checkAudio();
    checkBattery();
    
    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);
  
  return (
    <div className="amazon-q-branding p-4 rounded-lg shadow-lg" 
         style={{ 
           background: 'linear-gradient(135deg, #232F3E 0%, #00A1C9 50%, #6B43BC 100%)',
           border: '1px solid rgba(255, 255, 255, 0.1)'
         }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FFFFFF" />
            <path d="M2 17L12 22L22 17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-bold text-white">Amazon Q</span>
        </div>
        <div className="text-sm text-white opacity-90">{currentTime}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-white bg-opacity-10 p-2 rounded flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${networkStatus ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-white">Network: {networkStatus ? 'Online' : 'Offline'}</span>
        </div>
        
        <div className="bg-white bg-opacity-10 p-2 rounded flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${audioEnabled ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
          <span className="text-white">Audio: {audioEnabled ? 'Enabled' : 'Disabled'}</span>
        </div>
        
        {batteryLevel !== null && (
          <div className="bg-white bg-opacity-10 p-2 rounded flex items-center col-span-2">
            <div className="w-8 h-3 border border-white rounded-sm mr-2 relative">
              <div 
                className="absolute top-0 left-0 bottom-0 bg-green-400" 
                style={{ width: `${batteryLevel}%` }}
              ></div>
              <div className="absolute w-1 h-2 bg-white right-[-4px] top-[0.5px]"></div>
            </div>
            <span className="text-white">Battery: {batteryLevel}%</span>
          </div>
        )}
      </div>
    </div>
  );
}