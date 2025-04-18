'use client';

import React from 'react';

export default function ProgressBar({ currentStep, totalSteps }) {
    const steps = Array.from({ length: totalSteps }, (_, i) => i);
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
            />
            <div className="absolute -top-8 left-0 text-sm font-medium text-gray-600">
                {currentStep + 1} of {totalSteps} steps
            </div>
        </div>
    );
}
