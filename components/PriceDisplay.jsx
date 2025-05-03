import React from 'react';

export default function PriceDisplay({ totalPrice }) {
    return (
        <div className="priceContainer">
            <div className="priceLabel">Total Price:</div>
            <div className="priceValue">
                <span className="currency">$</span>
                {totalPrice.toFixed(2)}
            </div>
        </div>
    );
}
