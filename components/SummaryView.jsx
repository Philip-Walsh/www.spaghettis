import React from 'react';
import styles from './styles/RamenBuilder.module.css';

export default function SummaryView({ selectedItems, totalPrice, onOrderMore }) {
    return (
        <div className={styles['card']}>
            <h2>Selection Complete!</h2>
            <div className={styles['order-summary-list']}>
                <h3>Your Order</h3>
                <ul>
                    {Object.entries(selectedItems).map(([key, val]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {Array.isArray(val) ? val.join(', ') : val}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles['price-value']}>Total: ${totalPrice.toFixed(2)}</div>
            <button onClick={onOrderMore} className={styles['buttonPrimary']}>
                Order More
            </button>
        </div>
    );
}
