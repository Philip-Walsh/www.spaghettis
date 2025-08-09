import React from 'react';
import './styles/main.css';

export default function ThemeTest() {
    return (
        <div className="container">
            <h1 style={{ color: 'var(--color-text)' }}>Theme Test</h1>
            <p style={{ color: 'var(--color-text)' }}>This text should change color with the theme</p>
            <div style={{
                background: 'var(--color-background)',
                padding: '20px',
                borderRadius: '10px',
                color: 'var(--color-text)'
            }}>
                This background should change with the theme
            </div>
        </div>
    );
} 