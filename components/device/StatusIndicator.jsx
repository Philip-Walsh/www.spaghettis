'use client';

import { useState } from 'react';
import styles from './styles/StatusIndicator.module.css';

/**
 * Reusable status indicator component with tooltip
 * @param {string} status - 'active', 'inactive', or 'warning'
 * @param {string} label - Label text
 * @param {string} tooltip - Tooltip text
 * @param {string} icon - Optional emoji icon
 */
export default function StatusIndicator({ status, label, tooltip, icon }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className={styles.statusItem}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`${styles.statusDot} ${styles[status]}`}></div>
      {icon && <span className={styles.statusIcon}>{icon}</span>}
      <span className={styles.statusLabel}>{label}</span>
      
      {showTooltip && tooltip && (
        <div className={styles.tooltip}>
          {tooltip}
        </div>
      )}
    </div>
  );
}