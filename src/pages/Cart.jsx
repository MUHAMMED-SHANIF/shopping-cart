import React from 'react';
import CartItem from '../components/CartItem';
import LoyaltySelector from '../components/LoyaltySelector';
import PriceBreakdown from '../components/PriceBreakdown';

const Cart = ({ cart, breakdown, onRemove, onQuantityChange, loyaltyLevel, onLoyaltyChange, onCheckout }) => (
  <div className="container mx-auto py-6">
    <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
    {cart.items.length === 0 ? (
      <div className="text-gray-500">Your cart is empty.</div>
    ) : (
      <>
        <div className="mb-4">
          {cart.items.map(item => (
            <CartItem key={item.product.id} item={item} onRemove={onRemove} onQuantityChange={onQuantityChange} />
          ))}
        </div>
        <LoyaltySelector value={loyaltyLevel} onChange={onLoyaltyChange} />
        <PriceBreakdown breakdown={breakdown} />
        <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition" onClick={onCheckout}>
          Checkout
        </button>
      </>
    )}
  </div>
);

export default Cart; 