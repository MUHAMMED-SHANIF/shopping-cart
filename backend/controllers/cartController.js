const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { calculateCart } = require('../services/pricingService');

// For demo: use a single cart in-memory (for multi-user, use sessions or userId)
let cart = { items: [], loyaltyLevel: 'Bronze' };

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findOne({ id: productId });
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const existing = cart.items.find(i => i.product.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ product: product.toObject(), quantity });
  }
  return res.json({ message: 'Added to cart', cart });
};

exports.removeFromCart = (req, res) => {
  const id = parseInt(req.params.id);
  cart.items = cart.items.filter(i => i.product.id !== id);
  return res.json({ message: 'Removed from cart', cart });
};

exports.getCart = (req, res) => {
  const breakdown = calculateCart(cart);
  return res.json({ cart, breakdown });
};

exports.checkout = (req, res) => {
  // For demo: just clear cart and return breakdown
  const breakdown = calculateCart(cart);
  cart.items = [];
  return res.json({ message: 'Order processed', breakdown });
};

exports.setLoyaltyLevel = (req, res) => {
  const { loyaltyLevel } = req.body;
  cart.loyaltyLevel = loyaltyLevel;
  return res.json({ message: 'Loyalty level updated', cart });
};

exports.setCartItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findOne({ id: productId });
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const existing = cart.items.find(i => i.product.id === productId);
  if (existing) {
    existing.quantity = quantity;
  } else {
    cart.items.push({ product: product.toObject(), quantity });
  }
  return res.json({ message: 'Quantity set', cart });
}; 