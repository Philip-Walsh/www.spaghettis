"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="noodle-nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" aria-label="Spaghetti Codes Home">
          <span role="img" aria-label="noodles" className="nav-emoji">🍜</span>
          <span className="nav-title">Spaghetti Codes</span>
        </Link>
        <button
          className="nav-toggle"
          aria-label="Toggle Menu"
          onClick={() => setOpen(!open)}
        >
          <span className="nav-emoji">🍜</span>
        </button>
        <ul className={`nav-links${open ? ' open' : ''}`}>
          <li><Link href="/menu" onClick={() => setOpen(false)}>Menu</Link></li>
          <li><Link href="/order" onClick={() => setOpen(false)}>Order</Link></li>
          <li><Link href="/about" onClick={() => setOpen(false)}>About</Link></li>
        </ul>
      </div>
    </nav>
  );
}
