const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.Mixed, required: true },
  quantity: { type: Number, default: 1 }
});

const CartSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  items: [CartItemSchema],
  loyaltyLevel: { type: String, enum: ['Bronze', 'Silver', 'Gold'], default: 'Bronze' }
});

module.exports = mongoose.model('Cart', CartSchema); 