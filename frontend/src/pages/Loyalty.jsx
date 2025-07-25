import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Dummy user state for demonstration (replace with real auth logic)
const useUser = () => {
  // Simulate user: null if not logged in, or { loyaltyLevel: 'Bronze' | 'Silver' | 'Gold' }
  // You can replace this with context or props
  return { username: 'SHANIF P', loyaltyLevel: 'Gold' };
};

const loyaltyInfo = [
  { level: 'None', requirement: 'Not logged in', discount: '0%' },
  { level: 'Bronze', requirement: 'Spend > $100/month', discount: '5%' },
  { level: 'Silver', requirement: 'Spend > $250/month', discount: '10%' },
  { level: 'Gold', requirement: 'Spend > $500/month', discount: '15%' },
];

const Loyalty = () => {
  const user = useUser();

  // Replace this with a real user ID from authentication
  const [userId, setUserId] = useState(null);
  const [loyalty, setLoyalty] = useState({ level: 'None', monthlySpending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching userId from auth (replace with real logic)
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;
    axios.get(`${API_URL}/orders/loyalty/${userId}`).then(res => {
      setLoyalty({ level: res.data.loyaltyLevel, monthlySpending: res.data.monthlySpending });
      setLoading(false);
    });
  }, [userId]);

  if (loading) {
    return <div className="text-center py-8">Loading loyalty information...</div>;
  }

  return (
    <div className="container mx-auto py-8 max-w-xl">
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-yellow-600">Loyalty Level</h2>
        <div className="mb-6">
          <span className="font-semibold">Your Loyalty Level: </span>
          <span className="text-lg font-bold text-yellow-700">{loyalty.level}</span>
        </div>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3">Level</th>
              <th className="py-2 px-3">Requirement</th>
              <th className="py-2 px-3">Discount</th>
            </tr>
          </thead>
          <tbody>
            {loyaltyInfo.map(info => (
              <tr key={info.level} className={info.level === loyalty.level ? 'bg-yellow-50 font-bold' : ''}>
                <td className="py-2 px-3">{info.level}</td>
                <td className="py-2 px-3">{info.requirement}</td>
                <td className="py-2 px-3">{info.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 text-gray-600 text-sm">
          Loyalty level is calculated based on your total spending per month. Upgrade your level by shopping more!
        </div>
      </div>
    </div>
  );
};

export default Loyalty; 