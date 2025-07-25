const Order = require('../models/Order');
const User = require('../models/User');

// Place an order
exports.placeOrder = async (req, res) => {
  const { userId, items, total } = req.body;
  if (!userId || !items || !Array.isArray(items) || items.length === 0 || !total) {
    return res.status(400).json({ error: 'Invalid order data' });
  }
  // Calculate category summary
  const categorySummary = {};
  items.forEach(item => {
    const cat = item.product.category;
    categorySummary[cat] = (categorySummary[cat] || 0) + item.quantity;
  });
  const order = new Order({ user: userId, items, total, categorySummary });
  await order.save();
  // Add order to user and update loyalty
  const user = await User.findById(userId);
  if (user) {
    // Increment order count
    user.orders = user.orders || [];
    user.orders.push(order._id);
    // Track total purchase amount
    user.totalPurchase = (user.totalPurchase || 0) + total;
    // Update loyalty level
    if (user.totalPurchase > 2000) user.loyaltyLevel = 'Gold';
    else if (user.totalPurchase > 1000) user.loyaltyLevel = 'Silver';
    else if (user.totalPurchase > 500) user.loyaltyLevel = 'Bronze';
    else user.loyaltyLevel = 'None';
    await user.save();
  }
  res.json({ message: 'Order placed', order });
};

// Get order history for a user
exports.getOrderHistory = async (req, res) => {
  const { userId } = req.params;
  const orders = await Order.find({ user: userId }).sort({ date: -1 });
  res.json({ orders });
};

// Get most purchased category for a user
exports.getMostPurchasedCategory = async (req, res) => {
  const { userId } = req.params;
  const orders = await Order.find({ user: userId });
  const categoryCount = {};
  orders.forEach(order => {
    for (const [cat, count] of Object.entries(order.categorySummary || {})) {
      categoryCount[cat] = (categoryCount[cat] || 0) + count;
    }
  });
  let maxCat = null, maxCount = 0;
  for (const [cat, count] of Object.entries(categoryCount)) {
    if (count > maxCount) {
      maxCat = cat;
      maxCount = count;
    }
  }
  res.json({ mostPurchasedCategory: maxCat, count: maxCount });
};

// Get loyalty level for a user (based on monthly spending)
exports.getLoyaltyLevel = async (req, res) => {
  const { userId } = req.params;
  const now = new Date();
  const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const orders = await Order.find({ user: userId, date: { $gte: monthAgo } });
  const total = orders.reduce((sum, o) => sum + o.total, 0);
  let level = 'None';
  if (total > 500) level = 'Gold';
  else if (total > 250) level = 'Silver';
  else if (total > 100) level = 'Bronze';
  res.json({ loyaltyLevel: level, monthlySpending: total });
}; 