import React from 'react';

const ProductCard = ({ product, onAdd, onBuyNow }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition">
    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
    <p className="text-gray-500 mb-1">Category: {product.category}</p>
    <p className="text-xl font-bold mb-3">${product.price}</p>
    <div className="flex gap-2">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => onAdd(product)}
      >
        Add to Cart
      </button>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        onClick={() => onBuyNow(product)}
      >
        Buy Now
      </button>
    </div>
  </div>
);

export default ProductCard; 