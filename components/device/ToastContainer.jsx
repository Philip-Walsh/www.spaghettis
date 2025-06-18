'use client';

import { useState, useEffect } from 'react';
import ToastNotification from './ToastNotification';
import styles from './styles/ToastContainer.module.css';

/**
 * Container for managing multiple toast notifications
 */
export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  
  // Add this to window so it can be called from anywhere
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.showToast = (message, type = 'info', duration = 5000) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type, duration }]);
        return id;
      };
      
      window.dismissToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete window.showToast;
        delete window.dismissToast;
      }
    };
  }, []);
  
  const handleDismiss = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  return (
    <div className={styles.container}>
      {toasts.map((toast, index) => (
        <div 
          key={toast.id} 
          className={styles.toastWrapper}
          style={{ bottom: `${(index * 70) + 20}px` }}
        >
          <ToastNotification
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onDismiss={() => handleDismiss(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}