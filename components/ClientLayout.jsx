'use client';

import { useState, useEffect } from 'react';
import SimplePerformanceMonitor from './SimplePerformanceMonitor';

export default function ClientLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <SimplePerformanceMonitor />
    </>
  );
}