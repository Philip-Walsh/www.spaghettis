'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="noodle-nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" aria-label="Forbidden Ramen Home">
          <span role="img" aria-label="noodles" className="nav-emoji">🍜</span>
          <span className="nav-title">Forbidden Ramen</span>
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
        </ul>
      </div>
    </nav>
  );
}
