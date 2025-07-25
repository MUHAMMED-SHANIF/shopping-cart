import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/auth';

const Login = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const reset = () => {
    setEmail('');
    setPassword('');
    setMessage('');
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${API_URL}/register`, { email, password });
      setMessage('Registration complete! You can now log in.');
      setMode('login');
      reset();
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  // After successful login, show username
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setMessage('Login successful! Redirecting...');
      setLoggedInUser(res.data.email || email);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('userEmail', res.data.email || email);
      setTimeout(() => {
        navigate('/');
        window.location.reload(); // Ensure navbar updates
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-md">
      <div className="bg-white rounded shadow p-6">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-l ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => { setMode('login'); reset(); }}
          >Login</button>
          <button
            className={`px-4 py-2 rounded-r ${mode === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => { setMode('signup'); reset(); }}
          >Sign Up</button>
        </div>
        {message && <div className="mb-2 text-green-600">{message}</div>}
        {error && <div className="mb-2 text-red-600">{error}</div>}
        {loggedInUser && <div className="mb-4 text-lg font-bold text-center">Welcome, {loggedInUser}!</div>}
        {mode === 'signup' && (
          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <input type="email" className="border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" className="border p-2 rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
            <button className="bg-blue-600 text-white py-2 rounded" type="submit">Sign Up</button>
          </form>
        )}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input type="email" className="border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" className="border p-2 rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
            <button className="bg-blue-600 text-white py-2 rounded" type="submit">Login</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login; 