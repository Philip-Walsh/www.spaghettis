import React from 'react';

export default function AmazonQAttribution() {
  return (
    <a 
      href="https://aws.amazon.com/amazonq/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center"
    >
      Built with Amazon Q
      <svg 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          display: 'inline', 
          verticalAlign: 'middle', 
          marginLeft: 4,
          filter: 'drop-shadow(0 0 2px var(--accent-gold))'
        }}
      >
        <path 
          d="M12 2L2 7L12 12L22 7L12 2Z" 
          fill="currentColor" 
        />
        <path 
          d="M2 17L12 22L22 17" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M2 12L12 17L22 12" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </a>
  );
}