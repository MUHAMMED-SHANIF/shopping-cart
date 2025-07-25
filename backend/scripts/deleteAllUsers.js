const mongoose = require('mongoose');
const User = require('../models/User');

const MONGO_URI = 'mongodb://localhost:27017/smartcart';

async function deleteAllUsers() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const result = await User.deleteMany({});
  console.log('All users deleted:', result);
  process.exit(0);
}

deleteAllUsers(); 