import React, { useContext, useEffect } from 'react';
import CouponContext from './CouponContext';
import { ALL, TRUE } from './constants';
import messages from './messages';

const SavedCoupon = () => {
  const couponContext = useContext(CouponContext);
  const {
    getUserCoupons,
    removeUserCoupon,
    userCoupons,
    alert,
    setShowFav,
    couponFilter,
    setAlert,
  } = couponContext;

  useEffect(() => {
    getUserCoupons();
  }, []);

  const deleteAction = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    removeUserCoupon(id);
  };

  const backAction = (e) => {
    e.preventDefault();
    setShowFav(false);
  };

  const copyToClipboard = (e) => {
    e.preventDefault();
    const coupon = userCoupons[e.target.dataset.id];
    navigator.clipboard.writeText(coupon.code);
    setAlert(messages.COPIED);
  };

  return (
    <div className="coupons-container">
      <h4 className="saved-coupons-header">Saved Coupons</h4>
      <button className="back-button" onClick={backAction}>
        Back
      </button>
      <p className="error-message">{alert}</p>
      <div className="coupon-container">
        {Object.values(userCoupons)
          .filter((coupon) =>
            couponFilter === ALL ? TRUE : coupon.type === couponFilter
          )
          .map((coupon, index) => (
            <div key={index} className="coupon-details">
              <button
                className="delete-button"
                data-id={coupon.couponId}
                onClick={deleteAction}
              >
                X
              </button>
              <h3 data-id={coupon.couponId}> {coupon.name}</h3>
              <h4 data-id={coupon.couponId}> CODE : '{coupon.code}'</h4>
              <p data-id={coupon.couponId}> {coupon.description}</p>
              <button
                data-id={coupon.couponId}
                className="copy-button"
                onClick={copyToClipboard}
              >
                Copy to Clipboard
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SavedCoupon;
