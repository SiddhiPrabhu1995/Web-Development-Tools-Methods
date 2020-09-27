import React from 'react';
import categories from './Categories';
import { useContext } from 'react';
import CouponContext from './CouponContext';
const CouponCategory = () => {
  const couponContext = useContext(CouponContext);
  const { couponFilter, setCategoryFilter } = couponContext;

  const setFilterbyCategory = (e) => {
    setCategoryFilter(e.target.value);
  };

  return (
    <div className="filterby-category">
      <label className="select-label">Select Coupon By Category: </label>
      <select value={couponFilter} onChange={setFilterbyCategory}>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CouponCategory;
