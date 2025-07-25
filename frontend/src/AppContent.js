import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Loyalty from './pages/Loyalty';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import { fetchCart, addToCart, removeFromCart, updateLoyalty, checkout, setCartItemQuantity } from './utils/api';

// Placeholder components for Login, Notifications, Help Desk
const Notifications = () => <div className="container mx-auto py-6 text-center">Notifications (Coming Soon)</div>;
const HelpDesk = () => <div className="container mx-auto py-6 text-center">Customer Care (Coming Soon)</div>;

const OfferSlider = () => (
  <div className="w-full bg-gradient-to-r from-yellow-200 to-pink-200 py-10 flex items-center justify-center mb-10 min-h-[180px] md:min-h-[220px]">
    <div className="w-11/12 md:w-2/3 overflow-hidden relative">
      {/* Replace with a real slider later */}
      <div className="animate-pulse text-2xl md:text-3xl font-bold text-center text-pink-700">🔥 Summer Sale! Up to 50% off on Electronics! 🔥</div>
    </div>
  </div>
);

// SearchBar with lens icon
const SearchBar = ({ value, onChange }) => (
  <div className="relative w-full md:w-96">
    <input
      type="text"
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
      placeholder="Search products..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ minWidth: 200 }}
    />
    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
      {/* Lens SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
      </svg>
    </span>
  </div>
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

  // Simulate user login state (replace with real auth logic)
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const [dotsOpen, setDotsOpen] = useState(false);
  const dotsRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (dotsRef.current && !dotsRef.current.contains(event.target)) {
        setDotsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // On mount, try to get user info from localStorage
    const email = localStorage.getItem('userEmail');
    if (email) setUser({ email });
  }, []);

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
        <div className="flex items-center gap-4 justify-end relative">
          {/* User dropdown (right of search bar) */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(v => !v)} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
              <span className="font-bold text-blue-700 uppercase">{user ? user.email : 'Account'}</span>
              <svg className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg z-50 py-2">
                {user ? (
                  <>
                    <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      My Profile
                    </Link>
                    <Link to="/loyalty" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <svg className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4" /></svg>
                      Loyalty Level
                    </Link>
                    <Link to="/orders" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" /></svg>
                      Orders
                    </Link>
                    <Link to="/wishlist" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
                      Wishlist
                    </Link>
                    <Link to="/coupons" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m2 2a2 2 0 11-4 0 2 2 0 014 0zm-6 6a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      Coupons
                    </Link>
                    <Link to="/giftcards" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7V5a2 2 0 012-2h12a2 2 0 012 2v2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16" /></svg>
                      Gift Cards
                    </Link>
                    <Link to="/notifications" className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                      Notifications
                    </Link>
                    <button className="flex items-center px-4 py-2 w-full hover:bg-gray-100 text-left" onClick={() => setUser(null)}>
                      <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l4-4m-4 4l4 4m13-4a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
          {/* Cart (right of user) */}
          <Link to="/cart" className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
            {/* Cart Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M16 17a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart ({cart.items.length})
          </Link>
          {/* 3-dot menu (right of cart) */}
          <div className="relative" ref={dotsRef}>
            <button className="p-2 hover:bg-gray-200 rounded-full" title="More options" onClick={() => setDotsOpen(v => !v)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="5" cy="12" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="19" cy="12" r="1.5" />
              </svg>
            </button>
            {dotsOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow-lg z-50 py-2">
                <Link to="/help" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636A9 9 0 105.636 18.364 9 9 0 0018.364 5.636zM9 10h.01M15 10h.01M12 17a5 5 0 005-5H7a5 5 0 005 5z" /></svg>
                  Customer Care
                </Link>
                <Link to="/about" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" /></svg>
                  About Us
                </Link>
              </div>
            )}
          </div>
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/help" element={<HelpDesk />} />
        </Routes>
      </main>
    </div>
  );
}

export default AppContent; 