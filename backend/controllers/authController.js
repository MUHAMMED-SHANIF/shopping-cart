const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { sendOTPEmail } = require('../services/emailService');
const crypto = require('crypto');

// Helper to generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
  const existingEmail = await User.findOne({ email });
  if (existingEmail) return res.status(400).json({ error: 'Email already registered' });
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed, verified: true });
  await user.save();
  res.json({ message: 'Registration successful' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });
  if (!user.verified) return res.status(400).json({ error: 'User not verified' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid password' });
  // Return user info for frontend
  res.json({ message: 'Login successful', userId: user._id, username: user.username, email: user.email });
};

exports.getProfile = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ address: user.address || null });
};

exports.updateAddress = async (req, res) => {
  const { userId } = req.params;
  const { street, city, state, pin, country, loyaltyLevel } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.address = { street, city, state, pin, country };
  if (loyaltyLevel) user.loyaltyLevel = loyaltyLevel;
  await user.save();
  res.json({ message: 'Address and loyalty level updated', address: user.address, loyaltyLevel: user.loyaltyLevel });
}; 