const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, enum: ['Electronics', 'Books', 'Clothing'], required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Product', ProductSchema); 