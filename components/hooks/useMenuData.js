'use client';

import { useState, useEffect } from 'react';
import { getMenuOptions } from '../../utils/getMenuItems';

export function useMenuData() {
    const [menuOptions, setMenuOptions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchMenuData = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getMenuOptions();

                if (isMounted) {
                    setMenuOptions(data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    console.error('Error fetching menu data:', err);
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchMenuData();

        return () => {
            isMounted = false;
        };
    }, []);

    const refreshMenuData = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getMenuOptions();
            setMenuOptions(data);
            setLoading(false);
        } catch (err) {
            console.error('Error refreshing menu data:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    return {
        menuOptions,
        loading,
        error,
        refreshMenuData
    };
} 