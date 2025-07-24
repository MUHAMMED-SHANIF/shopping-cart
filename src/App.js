import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import { fetchCart, addToCart, removeFromCart, updateLoyalty, checkout, updateQuantity } from './utils/api';

// Placeholder components for Login, Notifications, Help Desk
const Login = () => <div className="container mx-auto py-6 text-center">Login Page (Coming Soon)</div>;
const Notifications = () => <div className="container mx-auto py-6 text-center">Notifications (Coming Soon)</div>;
const HelpDesk = () => <div className="container mx-auto py-6 text-center">Help Desk (Coming Soon)</div>;

const OfferSlider = () => (
  <div className="w-full bg-gradient-to-r from-yellow-200 to-pink-200 py-4 flex items-center justify-center mb-6">
    <div className="w-11/12 md:w-2/3 overflow-hidden relative">
      {/* Replace with a real slider later */}
      <div className="animate-pulse text-xl font-bold text-center text-pink-700">🔥 Summer Sale! Up to 50% off on Electronics! 🔥</div>
    </div>
  </div>
);

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    className="w-full md:w-96 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    placeholder="Search products..."
    value={value}
    onChange={e => onChange(e.target.value)}
    style={{ minWidth: 200 }}
  />
);

function App() {
  const [cart, setCart] = useState({ items: [], loyaltyLevel: 'Bronze' });
  const [breakdown, setBreakdown] = useState({ subtotal: 0, itemDiscounts: 0, tax: 0, bulkDiscount: 0, loyaltyDiscount: 0, finalTotal: 0 });
  const [search, setSearch] = useState('');

  const loadCart = () => {
    fetchCart().then(res => {
      setCart(res.data.cart);
      setBreakdown(res.data.breakdown);
    });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product.id, 1).then(loadCart);
    // TODO: show toast
  };

  const handleRemove = (id) => {
    removeFromCart(id).then(loadCart);
    // TODO: show toast
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity).then(loadCart);
  };

  const handleLoyaltyChange = (level) => {
    updateLoyalty(level).then(loadCart);
  };

  const handleCheckout = () => {
    checkout().then(res => {
      loadCart();
      // TODO: show toast
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-white shadow p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4 mb-2 md:mb-0">
            <Link to="/" className="font-bold text-xl">Smart Cart</Link>
          </div>
          <div className="flex-1 flex justify-center mb-2 md:mb-0">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="flex items-center gap-4 justify-end">
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium">Cart ({cart.items.length})</Link>
            <Link to="/notifications" className="text-gray-700 hover:text-blue-600 font-medium">Notifications</Link>
            <Link to="/help" className="text-gray-700 hover:text-blue-600 font-medium">Help Desk</Link>
          </div>
        </nav>
        {/* Offer Slider */}
        <OfferSlider />
        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<ProductList onAdd={handleAddToCart} search={search} />} />
            <Route path="/cart" element={
              <Cart
                cart={cart}
                breakdown={breakdown}
                onRemove={handleRemove}
                onQuantityChange={handleQuantityChange}
                loyaltyLevel={cart.loyaltyLevel}
                onLoyaltyChange={handleLoyaltyChange}
                onCheckout={handleCheckout}
              />
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/help" element={<HelpDesk />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
