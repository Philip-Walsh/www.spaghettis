'use client';

import { useState, useEffect } from 'react';
import styles from './styles/DeviceOptimize.module.css';
import LoadingSpinner from './LoadingSpinner';
import StatusIndicator from './StatusIndicator';

export default function DeviceOptimizeClient() {
  const [deviceInfo, setDeviceInfo] = useState({
    userAgent: '',
    screenSize: '',
    colorScheme: '',
    language: '',
    timezone: '',
    deviceType: 'desktop',
    orientation: ''
  });
  
  const [systemInfo, setSystemInfo] = useState({
    time: '',
    date: '',
    battery: null,
    charging: false,
    network: true,
    audio: false,
    geolocation: false,
    notifications: false,
    camera: false,
    microphone: false
  });
  
  const [edgeData, setEdgeData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      const now = new Date();
      setSystemInfo(prev => ({
        ...prev,
        time: now.toLocaleTimeString(),
        date: now.toLocaleDateString()
      }));
    }, 1000);
    
    // Get device information
    const getDeviceInfo = () => {
      const isMobile = /mobile|android|iphone|ipad|ipod/i.test(navigator.userAgent);
      
      setDeviceInfo({
        userAgent: navigator.userAgent,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light',
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        deviceType: isMobile ? 'mobile' : 'desktop',
        orientation: window.screen.orientation ? window.screen.orientation.type : 'unknown'
      });
    };
    
    // Get system capabilities
    const getSystemInfo = async () => {
      // Check network status
      setSystemInfo(prev => ({ ...prev, network: navigator.onLine }));
      
      // Check audio capability
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        setSystemInfo(prev => ({ ...prev, audio: audioContext.state !== 'suspended' }));
      } catch (e) {
        setSystemInfo(prev => ({ ...prev, audio: false }));
      }
      
      // Check other capabilities
      setSystemInfo(prev => ({
        ...prev,
        geolocation: !!navigator.geolocation,
        notifications: 'Notification' in window,
        camera: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
        microphone: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
      }));
      
      // Check battery status
      if ('getBattery' in navigator) {
        try {
          const battery = await navigator.getBattery();
          setSystemInfo(prev => ({
            ...prev,
            battery: Math.round(battery.level * 100),
            charging: battery.charging
          }));
          
          battery.addEventListener('levelchange', () => {
            setSystemInfo(prev => ({
              ...prev,
              battery: Math.round(battery.level * 100)
            }));
          });
          
          battery.addEventListener('chargingchange', () => {
            setSystemInfo(prev => ({
              ...prev,
              charging: battery.charging
            }));
          });
        } catch (e) {
          console.log('Battery API not supported');
        }
      }
    };
    
    // Get edge function data
    const getEdgeData = async () => {
      try {
        const response = await fetch('/api/device-data');
        const data = await response.json();
        setEdgeData(data);
        
        // Show toast notification when edge data is loaded
        if (typeof window !== 'undefined' && window.showToast) {
          window.showToast(`Optimized for ${data.deviceType} devices`, 'info');
        }
      } catch (error) {
        console.error('Error fetching edge data:', error);
        
        // Show error toast
        if (typeof window !== 'undefined' && window.showToast) {
          window.showToast('Could not load edge function data', 'error');
        }
      } finally {
        setLoading(false);
      }
    };
    
    // Network status event listeners
    const handleNetworkChange = () => {
      const isOnline = navigator.onLine;
      setSystemInfo(prev => ({ ...prev, network: isOnline }));
      
      // Show toast notification when network status changes
      if (typeof window !== 'undefined' && window.showToast) {
        if (isOnline) {
          window.showToast('Network connection restored', 'success');
        } else {
          window.showToast('Network connection lost', 'warning');
        }
      }
    };
    
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    
    // Orientation change
    const handleOrientationChange = () => {
      setDeviceInfo(prev => ({
        ...prev,
        orientation: window.screen.orientation ? window.screen.orientation.type : 'unknown'
      }));
    };
    
    if (window.screen.orientation) {
      window.screen.orientation.addEventListener('change', handleOrientationChange);
    }
    
    // Initialize
    getDeviceInfo();
    getSystemInfo();
    getEdgeData();
    
    // Cleanup
    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
      if (window.screen.orientation) {
        window.screen.orientation.removeEventListener('change', handleOrientationChange);
      }
    };
  }, []);
  
  if (loading) {
    return (
      <div className={`${styles.deviceContainer} ${styles.container}`}>
        <div className={styles.content}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  
  // Define capability tooltips
  const capabilityInfo = {
    network: {
      active: 'Your device is connected to the internet',
      inactive: 'Your device is currently offline'
    },
    audio: {
      active: 'Audio is enabled and ready to use',
      inactive: 'Audio is not available or permission denied'
    },
    geolocation: {
      active: 'Location services are available',
      inactive: 'Location services are not available'
    },
    notifications: {
      active: 'Notification API is supported by your browser',
      inactive: 'Notifications are not supported by your browser'
    },
    camera: {
      active: 'Camera is available for use (requires permission)',
      inactive: 'Camera is not available on this device'
    },
    microphone: {
      active: 'Microphone is available for use (requires permission)',
      inactive: 'Microphone is not available on this device'
    }
  };
  
  const handleHelpClick = () => {
    if (typeof window !== 'undefined' && window.toggleHelp) {
      window.toggleHelp();
    } else {
      // Fallback if global help isn't available
      if (typeof window !== 'undefined' && window.showToast) {
        window.showToast('Press ? key to access help system', 'info');
      }
    }
  };
  
  const handleInfoClick = () => {
    if (typeof window !== 'undefined' && window.showToast) {
      window.showToast('Edge functions run on servers close to users, detecting device information before the page loads', 'info', 8000);
    }
  };
  
  return (
    <div className={`${styles.deviceContainer} ${styles.container}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.deviceIcon}>
              {deviceInfo.deviceType === 'mobile' ? '📱' : '💻'}
            </span>
            {deviceInfo.deviceType === 'mobile' ? 'Mobile' : 'Desktop'} Experience
          </h2>
          <div className={styles.headerControls}>
            <button 
              className={styles.helpButton} 
              onClick={handleHelpClick}
              aria-label="Toggle help"
            >
              ?
            </button>
            <div className={styles.timeDisplay}>{systemInfo.time}</div>
          </div>
        </div>
        
        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.animateFadeIn} ${styles.delay1}`}>
            <h3 className={styles.cardTitle}>Device Information</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Screen:</span>
                <span className={styles.infoValue}>{deviceInfo.screenSize}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Theme:</span>
                <span className={styles.infoValue}>{deviceInfo.colorScheme}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Language:</span>
                <span className={styles.infoValue}>{deviceInfo.language}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Timezone:</span>
                <span className={styles.infoValue}>{deviceInfo.timezone}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Date:</span>
                <span className={styles.infoValue}>{systemInfo.date}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Orientation:</span>
                <span className={styles.infoValue}>{deviceInfo.orientation}</span>
              </div>
            </div>
          </div>
          
          <div className={`${styles.card} ${styles.animateFadeIn} ${styles.delay2}`}>
            <h3 className={styles.cardTitle}>System Capabilities</h3>
            <div className={styles.statusGrid}>
              <StatusIndicator 
                status={systemInfo.network ? 'active' : 'inactive'}
                label="Network"
                tooltip={systemInfo.network ? capabilityInfo.network.active : capabilityInfo.network.inactive}
                icon="📶"
              />
              <StatusIndicator 
                status={systemInfo.audio ? 'active' : 'inactive'}
                label="Audio"
                tooltip={systemInfo.audio ? capabilityInfo.audio.active : capabilityInfo.audio.inactive}
                icon="🔊"
              />
              <StatusIndicator 
                status={systemInfo.geolocation ? 'warning' : 'inactive'}
                label="Location"
                tooltip={systemInfo.geolocation ? capabilityInfo.geolocation.active : capabilityInfo.geolocation.inactive}
                icon="📍"
              />
              <StatusIndicator 
                status={systemInfo.notifications ? 'warning' : 'inactive'}
                label="Notifications"
                tooltip={systemInfo.notifications ? capabilityInfo.notifications.active : capabilityInfo.notifications.inactive}
                icon="🔔"
              />
              <StatusIndicator 
                status={systemInfo.camera ? 'warning' : 'inactive'}
                label="Camera"
                tooltip={systemInfo.camera ? capabilityInfo.camera.active : capabilityInfo.camera.inactive}
                icon="📷"
              />
              <StatusIndicator 
                status={systemInfo.microphone ? 'warning' : 'inactive'}
                label="Microphone"
                tooltip={systemInfo.microphone ? capabilityInfo.microphone.active : capabilityInfo.microphone.inactive}
                icon="🎤"
              />
            </div>
            
            {systemInfo.battery !== null && (
              <div className={styles.batteryInfo}>
                <div className={styles.infoItem} style={{ marginTop: '1rem' }}>
                  <span className={styles.infoLabel}>Battery:</span>
                  <span className={styles.infoValue}>
                    {systemInfo.battery}% {systemInfo.charging && '(Charging)'}
                  </span>
                </div>
                <div className={styles.batteryContainer}>
                  <div 
                    className={styles.batteryLevel} 
                    style={{ 
                      width: `${systemInfo.battery}%`,
                      background: systemInfo.battery < 20 
                        ? 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)' 
                        : undefined
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {edgeData && (
          <div className={`${styles.card} ${styles.animateFadeIn} ${styles.delay3}`} style={{ marginTop: '1rem' }}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Edge Function Recommendations</h3>
              <button 
                className={styles.infoButton}
                onClick={handleInfoClick}
                aria-label="Show edge function info"
              >
                ℹ️
              </button>
            </div>
            
            <div className={styles.recommendationsList}>
              {edgeData.recommendations.map((rec, index) => (
                <div key={index} className={styles.recommendationItem}>
                  <div className={styles.recommendationIcon}>💡</div>
                  <div className={styles.recommendationText}>{rec}</div>
                </div>
              ))}
            </div>
            
            <div className={styles.footer}>
              <div className={styles.edgeLabel}>
                <span className={styles.edgeDot}></span>
                Detected by Edge Function
              </div>
              <div className={styles.builtWith}>Built with modern web technologies</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}