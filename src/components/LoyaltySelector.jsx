import React from 'react';

const LoyaltySelector = ({ value, onChange }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">Loyalty Level</label>
    <select
      className="border rounded px-3 py-2 w-full"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="Bronze">Bronze (5%)</option>
      <option value="Silver">Silver (10%)</option>
      <option value="Gold">Gold (15%)</option>
    </select>
  </div>
);

export default LoyaltySelector; 