"use client";
import Link from 'next/link';
import styles from './styles/Nav.module.css';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: "/ramen", label: "Order" },
  { href: "/about", label: "About" },
  { href: "https://github.com/Philip-Walsh/www.spaghettis", label: "GitHub", external: true }
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const handleNav = () => setOpen(v => !v);
  const closeNav = () => setOpen(false);

  return (
    <nav className={styles.togoNav}>
      <motion.button
        className={styles.togoBtn}
        onClick={handleNav}
        aria-label="Menu"
        whileTap={{ scale: 0.92 }}
        aria-expanded={open}
        aria-controls="nav-togo-menu"
      >
        <span role="img" aria-label="to-go box" className={styles.togoIcon}>🥡</span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.togoMenu}
            id="nav-togo-menu"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {navLinks.map(link => link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.togoMenuLink}
                onClick={closeNav}
              >{link.label}</a>
            ) : (
              <Link key={link.href} href={link.href} className={styles.togoMenuLink} onClick={closeNav}>{link.label}</Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
