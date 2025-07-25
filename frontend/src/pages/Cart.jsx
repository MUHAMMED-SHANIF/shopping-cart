import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import PriceBreakdown from '../components/PriceBreakdown';
import axios from 'axios';

const API_URL = 'http://localhost:5000';
const DUMMY_USER_ID = 'replace_with_real_user_id'; // Replace with real user ID from auth

const Cart = ({ cart, breakdown, onRemove, onQuantityChange, loyaltyLevel, onLoyaltyChange, onCheckout }) => {
  const [address, setAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({ street: '', city: '', state: '', pin: '', country: '' });
  const [loyalty, setLoyalty] = useState({ level: 'None', monthlySpending: 0 });
  const [loadingLoyalty, setLoadingLoyalty] = useState(true);
  const [checkoutError, setCheckoutError] = useState('');
  // Replace this with a real user ID from authentication
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Simulate fetching userId from auth (replace with real logic)
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;
    // Fetch address
    axios.get(`${API_URL}/auth/profile/${userId}`).then(res => {
      if (res.data.address) setAddress(res.data.address);
    });
    // Fetch loyalty level
    axios.get(`${API_URL}/orders/loyalty/${userId}`).then(res => {
      setLoyalty({ level: res.data.loyaltyLevel, monthlySpending: res.data.monthlySpending });
      setLoadingLoyalty(false);
    });
  }, [userId]);

  const handleAddressChange = e => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = async () => {
    await axios.post(`${API_URL}/auth/address/${userId}`, addressForm);
    setAddress(addressForm);
    setShowAddressForm(false);
  };

  const handleCheckout = () => {
    setCheckoutError('');
    if (!address) {
      setShowAddressForm(true);
      setCheckoutError('Please enter your address before checking out.');
      return;
    }
    onCheckout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-8 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-blue-700 flex items-center gap-2">
          <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M16 17a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          Shopping Cart
        </h2>
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="h-28 w-28 text-blue-200 mb-6" fill="none" viewBox="0 0 48 48" stroke="currentColor">
              <rect x="8" y="16" width="32" height="20" rx="6" fill="#e0e7ff" />
              <circle cx="16" cy="38" r="3" fill="#60a5fa" />
              <circle cx="32" cy="38" r="3" fill="#60a5fa" />
              <path stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 16l2-6h20l2 6" />
            </svg>
            <div className="text-2xl font-bold text-blue-600 mb-2">Your cart is empty!</div>
            <div className="text-gray-500 mb-6 text-center">Looks like you haven't added anything to your cart yet.<br/>Start shopping to fill it up!</div>
            <a href="/" className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all font-semibold text-lg">Shop Now</a>
          </div>
        ) : (
          <>
            <div className="mb-6 space-y-4">
              {cart.items.map(item => (
                <CartItem key={item.product.id} item={item} onRemove={onRemove} onQuantityChange={onQuantityChange} />
              ))}
            </div>
            {/* Address Section */}
            <div className="mb-6 bg-blue-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-blue-700">Billing Address</span>
                {!address && !showAddressForm && (
                  <button className="text-blue-600 underline" onClick={() => setShowAddressForm(true)}>Add Address</button>
                )}
                {address && !showAddressForm && (
                  <button className="text-blue-600 underline" onClick={() => setShowAddressForm(true)}>Edit</button>
                )}
              </div>
              {showAddressForm ? (
                <div className="space-y-2">
                  <input name="street" value={addressForm.street} onChange={handleAddressChange} placeholder="Street" className="border p-2 rounded w-full" />
                  <input name="city" value={addressForm.city} onChange={handleAddressChange} placeholder="City" className="border p-2 rounded w-full" />
                  <input name="state" value={addressForm.state} onChange={handleAddressChange} placeholder="State" className="border p-2 rounded w-full" />
                  <input name="pin" value={addressForm.pin} onChange={handleAddressChange} placeholder="PIN" className="border p-2 rounded w-full" />
                  <input name="country" value={addressForm.country} onChange={handleAddressChange} placeholder="Country" className="border p-2 rounded w-full" />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2" onClick={handleSaveAddress}>Save Address</button>
                </div>
              ) : address ? (
                <div className="text-gray-700">
                  {address.street && <div>{address.street}</div>}
                  {address.city && <div>{address.city}, {address.state} {address.pin}</div>}
                  {address.country && <div>{address.country}</div>}
                </div>
              ) : (
                <div className="text-gray-400">No address on file.</div>
              )}
            </div>
            {/* Loyalty Section */}
            <div className="mb-6">
              <div className="font-semibold text-yellow-700 mb-1">Loyalty Level: {loadingLoyalty ? 'Loading...' : loyalty.level}</div>
              <div className="text-gray-500 text-sm">Monthly Spending: ${loyalty.monthlySpending.toFixed(2)}</div>
            </div>
            <div className="mb-6">
              <PriceBreakdown breakdown={breakdown} />
            </div>
            {checkoutError && <div className="text-red-600 mb-2">{checkoutError}</div>}
            <button className="w-full mt-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow hover:bg-green-700 transition" onClick={handleCheckout}>Checkout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 