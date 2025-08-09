import React from 'react';
import styles from './styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        <a href="https://windsurf.com/refer?referral_code=f181515cf7" target="_blank" rel="noopener noreferrer">
          Built With Windsurf
          <img src="https://windsurf.com/favicon.ico" alt="Windsurf logo" style={{ display: 'inline', verticalAlign: 'middle', width: 16, height: 16, marginLeft: 4 }} />
        </a>
        {" | "}
        <a href="https://www.cursor.so/" target="_blank" rel="noopener noreferrer">
          Built With Cursor AI
          <img src="https://www.cursor.so/favicon.ico" alt="Cursor AI logo" style={{ display: 'inline', verticalAlign: 'middle', width: 16, height: 16, marginLeft: 4 }} />
        </a>
      </span>
    </footer>
  );
}

