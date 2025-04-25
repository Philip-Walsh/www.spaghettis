import React from 'react';

export default function Menu({ items }) {
    if (!items || items.length === 0) {
        return <div>No menu items available.</div>;
    }
    return (
        <div className="menu-list">
            <h2 className="mb-4 text-xl font-bold">Menu</h2>
            <ul className="space-y-4">
                {items.map((item) => (
                    <li key={item.id} className="p-4 border rounded shadow-sm">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-gray-600">{item.description}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
