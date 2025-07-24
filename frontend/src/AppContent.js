import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import { fetchCart, addToCart, removeFromCart, updateLoyalty, checkout, setCartItemQuantity } from './utils/api';

// Placeholder components for Login, Notifications, Help Desk
const Login = () => <div className="container mx-auto py-6 text-center">Login Page (Coming Soon)</div>;
const Notifications = () => <div className="container mx-auto py-6 text-center">Notifications (Coming Soon)</div>;
const HelpDesk = () => <div className="container mx-auto py-6 text-center">Help Desk (Coming Soon)</div>;

const OfferSlider = () => (
  <div className="w-full bg-gradient-to-r from-yellow-200 to-pink-200 py-10 flex items-center justify-center mb-10 min-h-[180px] md:min-h-[220px]">
    <div className="w-11/12 md:w-2/3 overflow-hidden relative">
      {/* Replace with a real slider later */}
      <div className="animate-pulse text-2xl md:text-3xl font-bold text-center text-pink-700">🔥 Summer Sale! Up to 50% off on Electronics! 🔥</div>
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

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="absolute left-4 top-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
      onClick={() => navigate('/')}
    >
      ← Go Back
    </button>
  );
};

function AppContent() {
  const [cart, setCart] = useState({ items: [], loyaltyLevel: 'Bronze' });
  const [breakdown, setBreakdown] = useState({ subtotal: 0, itemDiscounts: 0, tax: 0, bulkDiscount: 0, loyaltyDiscount: 0, finalTotal: 0 });
  const [search, setSearch] = useState('');
  const location = useLocation();

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
    setCartItemQuantity(id, quantity).then(loadCart);
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
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between relative">
        <div className="flex items-center gap-4 mb-2 md:mb-0">
          <Link to="/" className="font-bold text-xl">Smart Cart</Link>
        </div>
        {/* Only show search bar on main page */}
        {location.pathname === '/' && (
          <div className="flex-1 flex justify-center mb-2 md:mb-0">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        )}
        <div className="flex items-center gap-4 justify-end">
          <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium">Cart ({cart.items.length})</Link>
          <Link to="/notifications" className="text-gray-700 hover:text-blue-600 font-medium">Notifications</Link>
          <Link to="/help" className="text-gray-700 hover:text-blue-600 font-medium">Help Desk</Link>
        </div>
        {/* Go Back button for all pages except main */}
        {location.pathname !== '/' && <GoBackButton />}
      </nav>
      {/* Offer Slider only on main page */}
      {location.pathname === '/' && <OfferSlider />}
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
  );
}

export default AppContent; 