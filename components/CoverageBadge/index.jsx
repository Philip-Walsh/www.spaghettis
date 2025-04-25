'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

export default function CoverageBadge() {
    const [coverage, setCoverage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoverage = async () => {
            try {
                const response = await fetch('/api/coverage');
                if (!response.ok) {
                    throw new Error('Failed to fetch coverage data');
                }
                const data = await response.json();
                setCoverage(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching coverage:', err);
            }
        };

        fetchCoverage();
    }, []);

    if (error) {
        return <div className={styles.error}>Error loading coverage data</div>;
    }

    if (!coverage) {
        return <div className={styles.loading}>Loading coverage data...</div>;
    }

    const color = coverage.total >= 80 ? 'brightgreen' : coverage.total >= 60 ? 'yellow' : 'red';

    return (
        <div className={styles.badgeContainer}>
            <a
                href="/coverage/lcov-report/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.badgeLink}
            >
                <Image
                    src={`https://img.shields.io/badge/coverage-${coverage.total}%25-${color}`}
                    alt={`Test Coverage: ${coverage.total}%`}
                    width={120}
                    height={20}
                    className={styles.badge}
                />
            </a>
            <div className={styles.details}>
                <div>Lines: {coverage.lines}%</div>
                <div>Branches: {coverage.branches}%</div>
                <div>Functions: {coverage.functions}%</div>
                <div>Statements: {coverage.statements}%</div>
            </div>
        </div>
    );
}
