const { calculateCart } = require('./pricingService');

describe('Pricing Service', () => {
  it('applies correct taxes and no discounts', () => {
    const cart = {
      items: [
        { product: { id: 1, name: 'Laptop', category: 'Electronics', price: 1000 }, quantity: 1 },
        { product: { id: 2, name: 'JavaScript Book', category: 'Books', price: 20 }, quantity: 1 },
        { product: { id: 3, name: 'T-shirt', category: 'Clothing', price: 25 }, quantity: 1 }
      ],
      loyaltyLevel: 'Bronze'
    };
    const breakdown = calculateCart(cart);
    expect(breakdown.tax).toBeCloseTo(100 + 0 + 1.25, 2);
    expect(breakdown.itemDiscounts).toBe(0);
    expect(breakdown.bulkDiscount).toBe(0);
    expect(breakdown.loyaltyDiscount).toBeGreaterThan(0);
    expect(breakdown.finalTotal).toBeGreaterThan(0);
  });

  it('applies item-specific discount for electronics', () => {
    const cart = {
      items: [
        { product: { id: 4, name: 'Headphones', category: 'Electronics', price: 150 }, quantity: 3 }
      ],
      loyaltyLevel: 'Bronze'
    };
    const breakdown = calculateCart(cart);
    expect(breakdown.itemDiscounts).toBeCloseTo(0.15 * 450, 2);
  });

  it('applies bulk discount if total > $200', () => {
    const cart = {
      items: [
        { product: { id: 1, name: 'Laptop', category: 'Electronics', price: 1000 }, quantity: 1 }
      ],
      loyaltyLevel: 'Bronze'
    };
    const breakdown = calculateCart(cart);
    expect(breakdown.bulkDiscount).toBeGreaterThan(0);
  });

  it('applies loyalty discount correctly', () => {
    const cart = {
      items: [
        { product: { id: 3, name: 'T-shirt', category: 'Clothing', price: 25 }, quantity: 10 }
      ],
      loyaltyLevel: 'Gold'
    };
    const breakdown = calculateCart(cart);
    expect(breakdown.loyaltyDiscount).toBeCloseTo(0.15 * (250 + 12.5), 1);
  });
}); 