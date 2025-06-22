'use client';

import { useState, useEffect } from 'react';
import styles from './admin.module.css';

export default function MenuAdmin() {
    const [menuData, setMenuData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        icon: '🍜',
        description: '',
        tags: [],
        categoryId: 1,
        isActive: true,
        sortOrder: 0
    });

    useEffect(() => {
        fetchMenuData();
    }, []);

    const fetchMenuData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/menu/admin');
            if (!response.ok) throw new Error('Failed to fetch menu data');
            const data = await response.json();
            setMenuData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/menu/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to add menu item');

            // Reset form and refresh data
            setFormData({
                name: '',
                price: 0,
                icon: '🍜',
                description: '',
                tags: [],
                categoryId: 1,
                isActive: true,
                sortOrder: 0
            });
            fetchMenuData();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const response = await fetch(`/api/menu/admin/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete menu item');

            fetchMenuData();
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className={styles.container}>Loading...</div>;
    if (error) return <div className={styles.container}>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <h1>Menu Admin</h1>

            <div className={styles.sections}>
                <div className={styles.section}>
                    <h2>Add New Menu Item</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Price:</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Icon:</label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Description:</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Category:</label>
                            <select
                                value={formData.categoryId}
                                onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                                required
                            >
                                {menuData?.categories?.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className={styles.button}>
                            Add Item
                        </button>
                    </form>
                </div>

                <div className={styles.section}>
                    <h2>Current Menu Items</h2>
                    {menuData?.menuOptions &&
                        Object.entries(menuData.menuOptions).map(([categoryKey, category]) => (
                            <div key={categoryKey} className={styles.category}>
                                <h3>{category.label}</h3>
                                <div className={styles.items}>
                                    {category.choices.map((item) => (
                                        <div key={item.id} className={styles.item}>
                                            <div className={styles.itemInfo}>
                                                <span className={styles.itemIcon}>{item.icon}</span>
                                                <span className={styles.itemName}>{item.name}</span>
                                                <span className={styles.itemPrice}>${item.price}</span>
                                            </div>
                                            <div className={styles.itemActions}>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className={styles.deleteButton}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
