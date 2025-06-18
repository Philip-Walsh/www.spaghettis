import React from 'react';

/**
 * A badge component that shows "Built by Amazon Q" attribution
 */
export default function AmazonQBadge({ className = '' }) {
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-medium shadow-md ${className}`}>
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="mr-1.5"
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
      Built by Amazon Q
    </div>
  );
}