const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  pin: String,
  country: String
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  otp: { type: String },
  otpExpires: { type: Date },
  verified: { type: Boolean, default: false },
  address: AddressSchema,
  loyaltyLevel: { type: String, enum: ['None', 'Bronze', 'Silver', 'Gold'], default: 'None' },
  totalPurchase: { type: Number, default: 0 },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = mongoose.model('User', UserSchema); 