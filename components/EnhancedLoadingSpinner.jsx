'use client';

import React from 'react';

export default function EnhancedLoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="relative w-16 h-16">
                {/* Outer circle */}
                <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>

                {/* Inner circle */}
                <div
                    className="absolute inset-2 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"
                    style={{ animationDirection: 'reverse', animationDuration: '1s' }}
                ></div>

                {/* Center dot */}
                <div className="absolute inset-[30%] bg-gradient-to-br from-blue-500 to-purple-500 rounded-full pulse"></div>
            </div>

            <div className="mt-4 text-center">
                <p className="text-lg font-medium animated-text-gradient">Loading device information</p>
                <p className="text-sm text-blue-300 mt-2">Detecting capabilities...</p>
            </div>
        </div>
    );
}
