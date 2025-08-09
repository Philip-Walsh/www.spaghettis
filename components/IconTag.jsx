'use client';

import React from 'react';

const tagIcons = {
  vegan: '🌱',
  meat: '🥩',
  seafood: '🐟',
  vegetarian: '🥬',
  base: '🍜'
};

export default function IconTag({ tag }) {
  return (
    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
      {tagIcons[tag]}
      <span className="ml-1">{tag}</span>
    </span>
  );
}
