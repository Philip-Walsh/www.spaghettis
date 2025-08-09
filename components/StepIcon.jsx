import React from 'react';

export default function StepIcon({ icon, label }) {
  return (
    <span
      role="img"
      aria-label={label}
      style={{ fontSize: '1.6em', marginRight: 8, verticalAlign: 'middle' }}
    >
      {icon}
    </span>
  );
}
