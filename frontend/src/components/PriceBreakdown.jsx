import React from 'react';

const PriceBreakdown = ({ breakdown }) => {
  // Provide default values to avoid crashes
  const safe = (v) => typeof v === 'number' && !isNaN(v) ? v : 0;
  const subtotal = safe(breakdown?.subtotal);
  const itemDiscounts = safe(breakdown?.itemDiscounts);
  const tax = safe(breakdown?.tax);
  const bulkDiscount = safe(breakdown?.bulkDiscount);
  const loyaltyDiscount = safe(breakdown?.loyaltyDiscount);
  // Calculate the final total as the sum of all values
  const finalTotal = subtotal + tax - itemDiscounts - bulkDiscount - loyaltyDiscount;

  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <h4 className="font-bold mb-2">Price Breakdown</h4>
      <div className="text-sm mb-1">Subtotal: <span className="float-right">${subtotal.toFixed(2)}</span></div>
      <div className="text-sm mb-1">Item Discounts: <span className="float-right">-${itemDiscounts.toFixed(2)}</span></div>
      <div className="text-sm mb-1">Tax: <span className="float-right">${tax.toFixed(2)}</span></div>
      <div className="text-sm mb-1">Bulk Discount: <span className="float-right">-${bulkDiscount.toFixed(2)}</span></div>
      <div className="text-sm mb-1">Loyalty Discount: <span className="float-right">-${loyaltyDiscount.toFixed(2)}</span></div>
      <div className="font-bold text-lg mt-2">Final Total: <span className="float-right">${finalTotal.toFixed(2)}</span></div>
    </div>
  );
};

export default PriceBreakdown; 