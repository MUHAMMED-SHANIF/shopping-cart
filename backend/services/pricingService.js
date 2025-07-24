// Pricing calculation service for Smart Shopping Cart

const TAX_RATES = {
  Electronics: 0.10,
  Books: 0.0,
  Clothing: 0.05
};

const LOYALTY_DISCOUNTS = {
  Bronze: 0.05,
  Silver: 0.10,
  Gold: 0.15
};

function calculateCart(cart) {
  let breakdown = {
    items: [],
    subtotal: 0,
    itemDiscounts: 0,
    tax: 0,
    bulkDiscount: 0,
    loyaltyDiscount: 0,
    finalTotal: 0
  };

  // 1. Calculate item prices, taxes, and item-specific discounts
  for (const item of cart.items) {
    const { product, quantity } = item;
    const basePrice = product.price * quantity;
    let itemTax = TAX_RATES[product.category] * basePrice;
    let itemDiscount = 0;

    // Item-specific discount: 15% off Electronics if quantity > 2
    if (product.category === 'Electronics' && quantity > 2) {
      itemDiscount = 0.15 * basePrice;
    }

    breakdown.items.push({
      ...product,
      quantity,
      basePrice,
      itemTax,
      itemDiscount,
      totalAfterDiscount: basePrice - itemDiscount + itemTax
    });
    breakdown.subtotal += basePrice;
    breakdown.itemDiscounts += itemDiscount;
    breakdown.tax += itemTax;
  }

  // 2. Bulk discount: 10% off if subtotal > $200 (after item discounts, before loyalty)
  let totalAfterItemDiscounts = breakdown.subtotal - breakdown.itemDiscounts + breakdown.tax;
  if (totalAfterItemDiscounts > 200) {
    breakdown.bulkDiscount = 0.10 * totalAfterItemDiscounts;
  }

  // 3. Loyalty discount on final amount
  let totalAfterBulk = totalAfterItemDiscounts - breakdown.bulkDiscount;
  breakdown.loyaltyDiscount = LOYALTY_DISCOUNTS[cart.loyaltyLevel || 'Bronze'] * totalAfterBulk;

  // 4. Final total
  breakdown.finalTotal = totalAfterBulk - breakdown.loyaltyDiscount;

  return breakdown;
}

module.exports = { calculateCart }; 