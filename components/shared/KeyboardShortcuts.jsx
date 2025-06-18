'use client';

import { useEffect, useState } from 'react';
import styles from './styles/KeyboardShortcuts.module.css';

export default function KeyboardShortcuts() {
  const [showShortcuts, setShowShortcuts] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+/ to toggle shortcuts panel
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }
      
      // Escape to close shortcuts panel
      if (e.key === 'Escape' && showShortcuts) {
        setShowShortcuts(false);
      }
      
      // ? to toggle help (if not in an input field)
      if (e.key === '?' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (typeof window !== 'undefined' && window.toggleHelp) {
          window.toggleHelp();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showShortcuts]);
  
  if (!showShortcuts) return null;
  
  return (
    <div className={styles.overlay} onClick={() => setShowShortcuts(false)}>
      <div className={styles.shortcutsPanel} onClick={e => e.stopPropagation()}>
        <div className={styles.shortcutsHeader}>
          <h3 className={styles.shortcutsTitle}>Keyboard Shortcuts</h3>
          <button 
            className={styles.closeButton} 
            onClick={() => setShowShortcuts(false)}
          >
            ×
          </button>
        </div>
        
        <div className={styles.shortcutsContent}>
          <div className={styles.shortcutsSection}>
            <h4 className={styles.sectionTitle}>Navigation</h4>
            <div className={styles.shortcutsList}>
              <div className={styles.shortcutItem}>
                <div className={styles.shortcutKeys}>
                  <kbd>?</kbd>
                </div>
                <div className={styles.shortcutDescription}>Toggle help panel</div>
              </div>
              <div className={styles.shortcutItem}>
                <div className={styles.shortcutKeys}>
                  <kbd>Esc</kbd>
                </div>
                <div className={styles.shortcutDescription}>Close dialogs</div>
              </div>
              <div className={styles.shortcutItem}>
                <div className={styles.shortcutKeys}>
                  <kbd>Ctrl</kbd> + <kbd>/</kbd>
                </div>
                <div className={styles.shortcutDescription}>Show this shortcuts panel</div>
              </div>
            </div>
          </div>
          
          <div className={styles.shortcutsSection}>
            <h4 className={styles.sectionTitle}>Actions</h4>
            <div className={styles.shortcutsList}>
              <div className={styles.shortcutItem}>
                <div className={styles.shortcutKeys}>
                  <kbd>Ctrl</kbd> + <kbd>R</kbd>
                </div>
                <div className={styles.shortcutDescription}>Refresh data</div>
              </div>
              <div className={styles.shortcutItem}>
                <div className={styles.shortcutKeys}>
                  <kbd>Ctrl</kbd> + <kbd>D</kbd>
                </div>
                <div className={styles.shortcutDescription}>Toggle dark mode</div>
              </div>
            </div>
          </div>
          
          <div className={styles.shortcutsSection}>
            <h4 className={styles.sectionTitle}>Commands</h4>
            <div className={styles.shortcutsList}>
              <div className={styles.shortcutItem}>
                <div className={styles.shortcutKeys}>
                  <kbd>/help</kbd>
                </div>
                <div className={styles.shortcutDescription}>Show help options</div>
              </div>
              <div className={styles.shortcutItem}>
                <div className={styles.shortcutKeys}>
                  <kbd>/clear</kbd>
                </div>
                <div className={styles.shortcutDescription}>Clear notifications</div>
              </div>
              <div className={styles.shortcutItem}>
                <div className={styles.shortcutKeys}>
                  <kbd>/refresh</kbd>
                </div>
                <div className={styles.shortcutDescription}>Refresh device data</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}