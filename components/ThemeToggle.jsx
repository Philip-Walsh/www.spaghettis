import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        setTheme(initialTheme);
        applyTheme(initialTheme);
        setMounted(true);

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                setTheme(newTheme);
                applyTheme(newTheme);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
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

    // Prevent hydration mismatch
    if (!mounted) {
        return null;
    }

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