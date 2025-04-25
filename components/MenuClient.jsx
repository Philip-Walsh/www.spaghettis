'use client';
import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import { getMenuItems } from '../utils/getMenuItems';

export default function MenuClient() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        getMenuItems().then(setMenuItems);
    }, []);

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Noodle Menu</h2>
            <Menu items={menuItems} />
        </section>
    );
}
