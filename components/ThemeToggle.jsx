import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        applyTheme(savedTheme);
    }, []);

    const applyTheme = (theme) => {
        // Update data-theme attribute
        document.documentElement.setAttribute('data-theme', theme);

        // Update CSS variables based on theme
        const root = document.documentElement;
        if (theme === 'dark') {
            root.style.setProperty('--color-primary', '#f7b500');
            root.style.setProperty('--color-primary-dark', '#c49000');
            root.style.setProperty('--color-secondary', '#fff3d6');
            root.style.setProperty('--color-background', '#fffbe9');
            root.style.setProperty('--color-text', '#2d1600');
            root.style.setProperty('--color-accent', '#e85d04');
        } else {
            root.style.setProperty('--color-primary', '#00eaff');
            root.style.setProperty('--color-primary-dark', '#00b8cc');
            root.style.setProperty('--color-secondary', '#ff5af7');
            root.style.setProperty('--color-background', '#181c27');
            root.style.setProperty('--color-text', '#ffffff');
            root.style.setProperty('--color-accent', '#fbbf24');
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button
            className="themeToggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
            {theme === 'dark' ? '🌞' : '🌙'}
        </button>
    );
} 