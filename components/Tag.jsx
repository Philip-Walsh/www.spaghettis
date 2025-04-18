'use client';

import React from 'react';

const tagColors = {
    vegan: 'bg-green-100 text-green-800',
    meat: 'bg-red-100 text-red-800',
    seafood: 'bg-blue-100 text-blue-800',
    vegetarian: 'bg-yellow-100 text-yellow-800'
};

export default function Tag({ label, type }) {
    if (!label) return null;

    return (
        <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tagColors[type] || 'bg-gray-100 text-gray-800'}`}
        >
            {label}
        </span>
    );
}
