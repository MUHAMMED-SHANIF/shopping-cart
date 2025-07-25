import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const Orders = () => {
  // Replace this with a real user ID from authentication
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching userId from auth (replace with real logic)
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;
    axios.get(`${API_URL}/orders/history/${userId}`).then(res => {
      setOrders(res.data.orders || []);
      setLoading(false);
    });
  }, [userId]);

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Order History</h2>
        {loading ? (
          <div>Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-gray-500 text-center py-12">No orders found.</div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Order Date:</span>
                  <span className="text-gray-600">{new Date(order.date).toLocaleString()}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Total:</span> <span className="text-blue-700 font-bold">${order.total.toFixed(2)}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Items:</span>
                  <ul className="ml-4 list-disc">
                    {order.items.map((item, idx) => (
                      <li key={idx}>{item.product.name} x {item.quantity} (${item.price.toFixed(2)} each)</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 