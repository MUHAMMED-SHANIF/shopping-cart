const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const MONGO_URI = 'mongodb://localhost:27017/smartcart';

async function createAdmin() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const existing = await User.findOne({ username: 'admin' });
  if (existing) {
    console.log('Admin user already exists.');
    process.exit(0);
  }
  const hashed = await bcrypt.hash('admin123', 10);
  const user = new User({
    username: 'admin',
    email: 'admin@example.com',
    password: hashed,
    verified: true
  });
  await user.save();
  console.log('Admin user created:', user);
  process.exit(0);
}

createAdmin(); 