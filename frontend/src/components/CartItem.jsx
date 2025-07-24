import React from 'react';

const CartItem = ({ item, onRemove, onQuantityChange }) => (
  <div className="flex items-center justify-between bg-gray-50 rounded p-3 mb-2 shadow">
    <div>
      <div className="font-semibold">{item.product.name}</div>
      <div className="text-sm text-gray-500">{item.product.category}</div>
      <div className="text-sm">${item.product.price} x {item.quantity}</div>
    </div>
    <div className="flex items-center gap-2">
      <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => onQuantityChange(item.product.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
      <span>{item.quantity}</span>
      <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => onQuantityChange(item.product.id, item.quantity + 1)}>+</button>
      <button className="ml-4 px-2 py-1 bg-red-500 text-white rounded" onClick={() => onRemove(item.product.id)}>Remove</button>
    </div>
  </div>
);

export default CartItem; 