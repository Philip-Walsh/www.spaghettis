'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function NavWithTheme() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Check if we're on the device optimization page
  const isDeviceOptimizePage = pathname === '/edge/device-optimize';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className={`noodle-nav ${isDeviceOptimizePage ? 'device-nav' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo" aria-label="Forbidden Ramen Home">
          <span role="img" aria-label="noodles" className="nav-emoji">🍜</span>
          <span className={`nav-title ${isDeviceOptimizePage ? 'nav-title-gradient' : ''}`}>
            Forbidden Ramen
          </span>
        </Link>
        <div className="nav-controls">
          <ThemeToggle />
          <button
            className="nav-toggle"
            aria-label="Toggle Menu"
            onClick={() => setOpen(!open)}
          >
            <span className="nav-emoji">🍜</span>
          </button>
        </div>
        <ul className={`nav-links${open ? ' open' : ''}`}>
          <li><Link href="/ramen" onClick={() => setOpen(false)}>Ramen</Link></li>
          <li><Link href="/about" onClick={() => setOpen(false)}>About</Link></li>
          <li>
            <Link 
              href="/edge/device-optimize" 
              onClick={() => setOpen(false)}
              className={isDeviceOptimizePage ? 'text-purple-200 font-bold' : ''}
            >
              Edge Demo
              <span className="ml-1 text-xs bg-accent-gradient px-1 rounded">New</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}