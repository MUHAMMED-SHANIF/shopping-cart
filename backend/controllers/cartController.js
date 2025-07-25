const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { calculateCart } = require('../services/pricingService');
const User = require('../models/User');

// Remove in-memory cart
// let cart = { items: [], loyaltyLevel: 'Bronze' };

// Helper to get or create a user's cart
async function getOrCreateCart(userId) {
  // If no userId, use a default guest cart
  const effectiveUserId = userId || 'guest';
  let cart = await Cart.findOne({ user: effectiveUserId });
  if (!cart) {
    cart = new Cart({ user: effectiveUserId, items: [], loyaltyLevel: 'Bronze' });
    await cart.save();
  }
  return cart;
}

exports.addToCart = async (req, res) => {
  let { userId, productId, quantity } = req.body;
  if (!userId) userId = 'guest';
  const product = await Product.findOne({ id: Number(productId) });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const cart = await getOrCreateCart(userId);
  const existing = cart.items.find(i => i.product.id === Number(productId));
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ product: product.toObject(), quantity });
  }
  await cart.save();
  return res.json({ message: 'Added to cart', cart });
};

exports.removeFromCart = async (req, res) => {
  let { userId } = req.query;
  if (!userId) userId = 'guest';
  const id = parseInt(req.params.id);
  const cart = await getOrCreateCart(userId);
  cart.items = cart.items.filter(i => i.product.id !== id);
  await cart.save();
  return res.json({ message: 'Removed from cart', cart });
};

exports.getCart = async (req, res) => {
  let { userId } = req.query;
  if (!userId) userId = 'guest';
  const user = await User.findById(userId).catch(() => null);
  let userLoyalty = user && user.loyaltyLevel ? user.loyaltyLevel : 'None';
  const cart = await getOrCreateCart(userId);
  const cartWithLoyalty = { ...cart.toObject(), loyaltyLevel: userLoyalty };
  const breakdown = calculateCart(cartWithLoyalty);
  // Debug log
  console.log('CART DEBUG:', JSON.stringify(cartWithLoyalty, null, 2));
  console.log('BREAKDOWN DEBUG:', JSON.stringify(breakdown, null, 2));
  return res.json({ cart: cartWithLoyalty, breakdown });
};

exports.checkout = async (req, res) => {
  let { userId } = req.body;
  if (!userId) userId = 'guest';
  const user = await User.findById(userId).catch(() => null);
  let userLoyalty = user && user.loyaltyLevel ? user.loyaltyLevel : 'None';
  const cart = await getOrCreateCart(userId);
  const cartWithLoyalty = { ...cart.toObject(), loyaltyLevel: userLoyalty };
  const breakdown = calculateCart(cartWithLoyalty);
  cart.items = [];
  await cart.save();
  return res.json({ message: 'Order processed', breakdown });
};

exports.setLoyaltyLevel = async (req, res) => {
  let { userId, loyaltyLevel } = req.body;
  if (!userId) userId = 'guest';
  const cart = await getOrCreateCart(userId);
  cart.loyaltyLevel = loyaltyLevel;
  await cart.save();
  return res.json({ message: 'Loyalty level updated', cart });
};

exports.setCartItemQuantity = async (req, res) => {
  let { userId, productId, quantity } = req.body;
  if (!userId) userId = 'guest';
  const product = await Product.findOne({ id: Number(productId) });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const cart = await getOrCreateCart(userId);
  const existing = cart.items.find(i => i.product.id === Number(productId));
  if (existing) {
    existing.quantity = quantity;
  } else {
    cart.items.push({ product: product.toObject(), quantity });
  }
  await cart.save();
  return res.json({ message: 'Quantity set', cart });
}; 