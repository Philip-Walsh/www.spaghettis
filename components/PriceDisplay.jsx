import React from 'react';

export default function PriceDisplay({ totalPrice = 0, total }) {
    // Support both prop names for backward compatibility
    const price = totalPrice !== undefined ? totalPrice : (total || 0);
    
    return (
        <div className="priceContainer" role="status" aria-live="polite">
            <div className="priceLabel">Total Price:</div>
            <div className="priceValue">
                <span className="currency">$</span>
                {price.toFixed(2)}
            </div>
        </div>
    );
}
