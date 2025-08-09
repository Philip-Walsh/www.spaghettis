'use client';

import { useState, useEffect } from 'react';
import styles from './styles/ToastNotification.module.css';

/**
 * Toast notification component
 * @param {string} message - Notification message
 * @param {string} type - 'info', 'success', 'warning', or 'error'
 * @param {number} duration - Duration in milliseconds before auto-dismiss
 * @param {function} onDismiss - Callback when toast is dismissed
 */
export default function ToastNotification({ message, type = 'info', duration = 5000, onDismiss }) {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onDismiss) onDismiss();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);
  
  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };
  
  if (!visible) return null;
  
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };
  
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.icon}>{icons[type]}</div>
      <div className={styles.message}>{message}</div>
      <button className={styles.closeButton} onClick={handleDismiss}>×</button>
    </div>
  );
}