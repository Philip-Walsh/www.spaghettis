'use client';

import React, { useState, useEffect } from 'react';
import RamenBuilder from '../../components/RamenBuilder';

export default function RamenPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <RamenBuilder />
        </main>
    );
}
