'use client';

import { useState, useEffect } from 'react';
import ChatHelp from './ChatHelp';
import KeyboardShortcuts from './KeyboardShortcuts';
import ToastContainer from '../device/ToastContainer';

export default function AppProvider({ children }) {
  const [showHelp, setShowHelp] = useState(false);
  
  useEffect(() => {
    // Make toggleHelp available globally
    if (typeof window !== 'undefined') {
      window.toggleHelp = () => setShowHelp(prev => !prev);
    }
    
    // Handle ? key to toggle help
    const handleKeyDown = (e) => {
      if (e.key === '?' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setShowHelp(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      if (typeof window !== 'undefined') {
        delete window.toggleHelp;
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
    <>
      {children}
      
      {/* Global components that should be available on all pages */}
      <KeyboardShortcuts />
      <ToastContainer />
      
      {/* Chat help that appears when ? is pressed */}
      {showHelp && <ChatHelp onClose={() => setShowHelp(false)} />}
    </>
  );
}