import React from 'react';
import { useContext } from 'react';
import CouponContext from './CouponContext';

const RefreshPage = () => {
  const couponContext = useContext(CouponContext);
  const { getAllCoupons } = couponContext;

  const refreshAction = (e) => {
    e.preventDefault();
    getAllCoupons();
  };

  return (
    <div>
      <button className="refresh-button" onClick={refreshAction}>
        Refresh
      </button>
    </div>
  );
};

export default RefreshPage;
