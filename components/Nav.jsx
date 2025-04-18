"use client";
import Link from 'next/link';
import styles from './styles/Nav.module.css';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: "/ramen", label: "Order", gridArea: 'link1' },
  { href: "/about", label: "About", gridArea: 'link2' },
  { href: "https://github.com/Philip-Walsh/www.spaghettis", label: "GitHub", external: true, gridArea: 'link3' }
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const handleNav = () => setOpen((v) => !v);
  const closeNav = () => setOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoBox}>
        <Link href="/" className={styles.logoText}>
          <span role="img" aria-label="ramen" className={styles.logoIcon + ' ' + styles.hideOnMobile}>🍜</span>
          <span role="img" aria-label="to-go box" className={styles.logoIcon + ' ' + styles.showOnMobile}>🥡</span>
          Forbidden Ramen
        </Link>
      </div>
      <motion.button
        className={styles.mobileMenuBtn}
        onClick={handleNav}
        aria-label="Menu"
        whileTap={{ scale: 0.92 }}
        aria-expanded={open}
        aria-controls="nav-mindmap"
      >
        <span role="img" aria-label="to-go box" className={styles.mobileMenuIcon}>🥡</span>
      </motion.button>
      <div className={styles.links}>
        {navLinks.map(link => link.external ? (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>{link.label}</a>
        ) : (
          <Link key={link.href} href={link.href} className={styles.link}>{link.label}</Link>
        ))}
      </div>
      {/* Mobile Mindmap Overlay and Links */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className={styles.navOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={closeNav}
            />
            <motion.div
              className={styles.mindmapNav}
              id="nav-mindmap"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.28 }}
              style={{ display: 'grid', gridTemplateAreas: "'link1 link2 link3'" }}
            >
              <span className={styles.mindmapEmoji} role="img" aria-label="to-go box">🥡</span>
              {navLinks.map(link => {
                const linkProps = {
                  className: styles.mindmapLink,
                  style: { gridArea: link.gridArea },
                  onClick: closeNav
                };
                return link.external ? (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...linkProps}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ delay: 0.08, duration: 0.18 }}
                  >{link.label}</motion.a>
                ) : (
                  <motion.div
                    key={link.href}
                    style={{ ...linkProps.style, position: 'relative' }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ delay: 0.08, duration: 0.18 }}
                  >
                    <Link href={link.href} className={styles.mindmapLink} onClick={closeNav}>{link.label}</Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
