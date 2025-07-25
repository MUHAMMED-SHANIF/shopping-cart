import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const Profile = () => {
  // Replace this with a real user ID from authentication
  const [userId, setUserId] = useState(null);
  const [address, setAddress] = useState({ street: '', city: '', state: '', pin: '', country: '' });
  const [editing, setEditing] = useState(false);
  const [mostCategory, setMostCategory] = useState(null);
  const [message, setMessage] = useState('');

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
    // Fetch most purchased category
    axios.get(`${API_URL}/orders/most-category/${userId}`).then(res => {
      setMostCategory(res.data.mostPurchasedCategory);
    });
  }, [userId]);

  const handleChange = e => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await axios.post(`${API_URL}/auth/address/${userId}`, address);
    setEditing(false);
    setMessage('Address updated!');
  };

  return (
    <div className="container mx-auto py-8 max-w-xl">
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Address</span>
            <button className="text-blue-600 underline" onClick={() => setEditing(v => !v)}>{editing ? 'Cancel' : 'Edit'}</button>
          </div>
          {editing ? (
            <div className="space-y-2">
              <input name="street" value={address.street} onChange={handleChange} placeholder="Street" className="border p-2 rounded w-full" />
              <input name="city" value={address.city} onChange={handleChange} placeholder="City" className="border p-2 rounded w-full" />
              <input name="state" value={address.state} onChange={handleChange} placeholder="State" className="border p-2 rounded w-full" />
              <input name="pin" value={address.pin} onChange={handleChange} placeholder="PIN" className="border p-2 rounded w-full" />
              <input name="country" value={address.country} onChange={handleChange} placeholder="Country" className="border p-2 rounded w-full" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2" onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div className="text-gray-700">
              {address.street && <div>{address.street}</div>}
              {address.city && <div>{address.city}, {address.state} {address.pin}</div>}
              {address.country && <div>{address.country}</div>}
              {!address.street && <div className="text-gray-400">No address on file.</div>}
            </div>
          )}
          {message && <div className="text-green-600 mt-2">{message}</div>}
        </div>
        <div className="mb-6">
          <span className="font-semibold">Most Purchased Category: </span>
          <span className="text-blue-700 font-bold">{mostCategory || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile; 