'use client';

import { useState } from 'react';
import styles from './styles/DeviceCapabilities.module.css';

export default function DeviceCapabilities({ systemInfo }) {
  const [showTooltip, setShowTooltip] = useState(null);
  
  // Define capability status and explanations
  const capabilities = [
    {
      name: 'Network',
      status: systemInfo.network ? 'active' : 'inactive',
      icon: systemInfo.network ? '📶' : '📵',
      explanation: systemInfo.network 
        ? 'Your device is connected to the internet'
        : 'Your device is offline'
    },
    {
      name: 'Audio',
      status: systemInfo.audio ? 'active' : 'permission',
      icon: systemInfo.audio ? '🔊' : '🔇',
      explanation: systemInfo.audio 
        ? 'Audio is enabled and ready to use'
        : 'Audio permission not granted or unavailable'
    },
    {
      name: 'Location',
      status: systemInfo.geolocation ? 'permission' : 'inactive',
      icon: systemInfo.geolocation ? '📍' : '🚫',
      explanation: systemInfo.geolocation 
        ? 'Location services available (permission required)'
        : 'Location services not available'
    },
    {
      name: 'Notifications',
      status: systemInfo.notifications ? 'permission' : 'inactive',
      icon: systemInfo.notifications ? '🔔' : '🔕',
      explanation: systemInfo.notifications 
        ? 'Notifications available (permission required)'
        : 'Notifications not supported'
    },
    {
      name: 'Camera',
      status: systemInfo.camera ? 'permission' : 'inactive',
      icon: systemInfo.camera ? '📷' : '⛔',
      explanation: systemInfo.camera 
        ? 'Camera available (permission required)'
        : 'Camera not available on this device'
    },
    {
      name: 'Microphone',
      status: systemInfo.microphone ? 'permission' : 'inactive',
      icon: systemInfo.microphone ? '🎤' : '⛔',
      explanation: systemInfo.microphone 
        ? 'Microphone available (permission required)'
        : 'Microphone not available on this device'
    }
  ];

  return (
    <div className={styles.capabilitiesCard}>
      <h3 className={styles.cardTitle}>System Capabilities</h3>
      <p className={styles.cardSubtitle}>Hover over items for more information</p>
      
      <div className={styles.capabilitiesGrid}>
        {capabilities.map((capability, index) => (
          <div 
            key={index} 
            className={styles.capabilityItem}
            onMouseEnter={() => setShowTooltip(index)}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <div className={styles.capabilityIcon}>{capability.icon}</div>
            <div className={styles.capabilityContent}>
              <div className={styles.capabilityName}>{capability.name}</div>
              <div className={`${styles.statusIndicator} ${styles[capability.status]}`}>
                <div className={styles.statusDot}></div>
                <span className={styles.statusText}>
                  {capability.status === 'active' ? 'Available' : 
                   capability.status === 'permission' ? 'Requires Permission' : 'Unavailable'}
                </span>
              </div>
              {showTooltip === index && (
                <div className={styles.tooltip}>
                  {capability.explanation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {systemInfo.battery !== null && (
        <div className={styles.batterySection}>
          <div className={styles.batteryHeader}>
            <span className={styles.batteryTitle}>
              <span className={systemInfo.charging ? '⚡' : '🔋'} style={{ marginRight: '0.5rem' }}></span>
              Battery
            </span>
            <span className={styles.batteryPercentage}>
              {systemInfo.battery}% {systemInfo.charging && '(Charging)'}
            </span>
          </div>
          <div className={styles.batteryContainer}>
            <div 
              className={`${styles.batteryLevel} ${systemInfo.battery < 20 ? styles.batteryLow : ''}`} 
              style={{ width: `${systemInfo.battery}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className={styles.infoFooter}>
        <div className={styles.infoNote}>
          <span className={styles.infoIcon}>ℹ️</span>
          <span>These capabilities are detected by your browser</span>
        </div>
      </div>
    </div>
  );
}