import React from 'react';

export default function StepIcon({ icon, selected }) {
    return (
        <span
            className={`stepIcon${selected ? ' selected' : ''}`}
            style={{
                fontFamily:
                    'Noto Emoji, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, EmojiOne Color, sans-serif',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            role="img"
            aria-label="step icon"
        >
            {icon}
        </span>
    );
}
