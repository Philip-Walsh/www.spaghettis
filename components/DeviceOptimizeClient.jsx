'use client';

import { useState, useEffect } from 'react';
import styles from './styles/DeviceOptimize.module.css';
import EnhancedLoadingSpinner from './EnhancedLoadingSpinner';

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
      } catch (error) {
        console.error('Error fetching edge data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Network status event listeners
    const handleNetworkChange = () => {
      setSystemInfo(prev => ({ ...prev, network: navigator.onLine }));
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
          <EnhancedLoadingSpinner />
        </div>
      </div>
    );
  }
  
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
          <div className={styles.timeDisplay}>{systemInfo.time}</div>
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
              <div className={styles.statusItem}>
                <div className={`${styles.statusDot} ${systemInfo.network ? styles.active : styles.inactive}`}></div>
                <span className={styles.statusLabel}>Network</span>
              </div>
              <div className={styles.statusItem}>
                <div className={`${styles.statusDot} ${systemInfo.audio ? styles.active : styles.inactive}`}></div>
                <span className={styles.statusLabel}>Audio</span>
              </div>
              <div className={styles.statusItem}>
                <div className={`${styles.statusDot} ${systemInfo.geolocation ? styles.active : styles.inactive}`}></div>
                <span className={styles.statusLabel}>Location</span>
              </div>
              <div className={styles.statusItem}>
                <div className={`${styles.statusDot} ${systemInfo.notifications ? styles.active : styles.inactive}`}></div>
                <span className={styles.statusLabel}>Notifications</span>
              </div>
              <div className={styles.statusItem}>
                <div className={`${styles.statusDot} ${systemInfo.camera ? styles.active : styles.inactive}`}></div>
                <span className={styles.statusLabel}>Camera</span>
              </div>
              <div className={styles.statusItem}>
                <div className={`${styles.statusDot} ${systemInfo.microphone ? styles.active : styles.inactive}`}></div>
                <span className={styles.statusLabel}>Microphone</span>
              </div>
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
            <h3 className={styles.cardTitle}>Edge Function Recommendations</h3>
            <div className={styles.scrollArea}>
              <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                {edgeData.recommendations.map((rec, index) => (
                  <li key={index} style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <div className={styles.footer}>
          <div>Detected by Edge Function</div>
          <div className={styles.badge}>Built with modern web technologies</div>
        </div>
      </div>
    </div>
  );
}