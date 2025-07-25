const mongoose = require('mongoose');
const Cart = require('../models/Cart');

async function clearCarts() {
  await mongoose.connect('mongodb://localhost:27017/ecommers');
  await Cart.deleteMany({});
  console.log('All carts cleared!');
  await mongoose.disconnect();
}

clearCarts(); 