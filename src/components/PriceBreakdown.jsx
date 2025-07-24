import React from 'react';

const PriceBreakdown = ({ breakdown }) => (
  <div className="bg-white rounded shadow p-4 mt-4">
    <h4 className="font-bold mb-2">Price Breakdown</h4>
    <div className="text-sm mb-1">Subtotal: <span className="float-right">${breakdown.subtotal.toFixed(2)}</span></div>
    <div className="text-sm mb-1">Item Discounts: <span className="float-right">-${breakdown.itemDiscounts.toFixed(2)}</span></div>
    <div className="text-sm mb-1">Tax: <span className="float-right">${breakdown.tax.toFixed(2)}</span></div>
    <div className="text-sm mb-1">Bulk Discount: <span className="float-right">-${breakdown.bulkDiscount.toFixed(2)}</span></div>
    <div className="text-sm mb-1">Loyalty Discount: <span className="float-right">-${breakdown.loyaltyDiscount.toFixed(2)}</span></div>
    <div className="font-bold text-lg mt-2">Final Total: <span className="float-right">${breakdown.finalTotal.toFixed(2)}</span></div>
  </div>
);

export default PriceBreakdown; 