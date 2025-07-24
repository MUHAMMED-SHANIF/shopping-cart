import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ onAdd, search = '' }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => setProducts(res.data));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuyNow = (product) => {
    onAdd(product);
    setTimeout(() => navigate('/cart'), 200); // slight delay to ensure cart updates
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} onBuyNow={handleBuyNow} />
        ))}
        {filtered.length === 0 && <div className="col-span-full text-center text-gray-500">No products found.</div>}
      </div>
    </div>
  );
};

export default ProductList; 