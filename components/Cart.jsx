import React, { useState } from 'react';
import { menuOptions } from '../data/menuOptions';
import styles from './styles/Cart.module.css';

export default function Cart({ items = [], onAddItem, onRemoveItem }) {
    const [deliveryOption, setDeliveryOption] = useState('takeout');
    const [specialInstructions, setSpecialInstructions] = useState('');

    const calculateTotal = () => {
        const subtotal = (items || []).reduce((sum, item) => sum + item.price, 0);
        const deliveryFee = deliveryOption === 'delivery' ? 3.99 : 0;
        return (subtotal + deliveryFee).toFixed(2);
    };

    const getItemDetails = (item) => {
        const details = [];
        const basePrice = 2.50; // Base price for any noodle selection

        // Base noodles (always add base price plus any additional noodle cost)
        if (item.details.base) {
            const noodle = menuOptions.noodleBase.choices.find(n => n.name === item.details.base);
            details.push({
                name: noodle ? noodle.name : 'Custom Noodles',
                price: basePrice + (noodle ? noodle.price : 0)
            });
        }

        // Protein (handle both string and array formats)
        if (item.details.protein) {
            const proteinArray = Array.isArray(item.details.protein) ? item.details.protein : [item.details.protein];
            proteinArray.forEach(proteinName => {
                const protein = menuOptions.protein.choices.find(p => p.name === proteinName);
                if (protein) {
                    details.push({
                        name: protein.name,
                        price: protein.price
                    });
                }
            });
        }

        // Vegetables (handle both string and array formats)
        if (item.details.vegetables) {
            const vegArray = Array.isArray(item.details.vegetables) ? item.details.vegetables : [item.details.vegetables];
            vegArray.forEach(vegName => {
                const vegetable = menuOptions.gardenPicks.choices.find(v => v.name === vegName);
                if (vegetable) {
                    details.push({
                        name: vegetable.name,
                        price: vegetable.price
                    });
                }
            });
        }

        // Broth (single-select)
        if (item.details.broth) {
            const broth = menuOptions.sauceBroth.choices.find(b => b.name === item.details.broth);
            if (broth) {
                details.push({
                    name: broth.name,
                    price: broth.price
                });
            }
        }

        // Garnish (handle both string and array formats)
        if (item.details.garnish) {
            const garnishArray = Array.isArray(item.details.garnish) ? item.details.garnish : [item.details.garnish];
            garnishArray.forEach(garnishName => {
                const garnish = menuOptions.garnish.choices.find(g => g.name === garnishName);
                if (garnish) {
                    details.push({
                        name: garnish.name,
                        price: garnish.price
                    });
                }
            });
        }

        return details;
    };

    return (
        <div className={styles.cartContainer}>
            <h2 className={styles.cartTitle}>Order Summary</h2>

            <div className={styles.deliveryOptions}>
                <h3 className={styles.sectionTitle}>Delivery Option</h3>
                <div className={styles.optionGroup}>
                    <label className={styles.optionLabel}>
                        <input
                            type="radio"
                            name="delivery"
                            value="takeout"
                            checked={deliveryOption === 'takeout'}
                            onChange={(e) => setDeliveryOption(e.target.value)}
                        />
                        Takeout
                    </label>
                    <label className={styles.optionLabel}>
                        <input
                            type="radio"
                            name="delivery"
                            value="delivery"
                            checked={deliveryOption === 'delivery'}
                            onChange={(e) => setDeliveryOption(e.target.value)}
                        />
                        Delivery (+$3.99)
                    </label>
                </div>
            </div>

            <div className={styles.itemsList}>
                {(items || []).length === 0 ? (
                    <p className={styles.emptyCart}>Your cart is empty</p>
                ) : (
                    (items || []).map((item, index) => {
                        const itemDetails = getItemDetails(item);
                        return (
                            <div key={index} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <h3>{item.name}</h3>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => onRemoveItem(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className={styles.itemDetails}>
                                    {itemDetails.map((detail, i) => (
                                        <div key={i} className={styles.detailRow}>
                                            <span className={styles.detailName}>{detail.name}</span>
                                            <span className={styles.detailPrice}>
                                                ${detail.price.toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.itemTotal}>
                                    <span>Item Total:</span>
                                    <span>${item.price.toFixed(2)}</span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className={styles.specialInstructions}>
                <h3 className={styles.sectionTitle}>Special Instructions</h3>
                <textarea
                    className={styles.instructionsInput}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Add any special instructions here..."
                />
            </div>

            <div className={styles.totalSection}>
                <div className={styles.subtotal}>
                    <span>Subtotal:</span>
                    <span>${items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                </div>
                {deliveryOption === 'delivery' && (
                    <div className={styles.deliveryFee}>
                        <span>Delivery Fee:</span>
                        <span>$3.99</span>
                    </div>
                )}
                <div className={styles.total}>
                    <span>Total:</span>
                    <span>${calculateTotal()}</span>
                </div>
            </div>

            <button
                className={styles.checkoutButton}
                disabled={items.length === 0}
            >
                Proceed to Checkout
            </button>
        </div>
    );
} 