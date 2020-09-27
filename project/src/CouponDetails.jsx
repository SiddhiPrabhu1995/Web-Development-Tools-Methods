import React, { useContext } from 'react';
import CouponContext from './CouponContext';
import { FALSE } from './constants';
import messages from './messages';

const CouponDetails = ({ couponId }) => {
  const couponContext = useContext(CouponContext);
  const { allCoupons, setShowCouponDetails, alert, setAlert } = couponContext;
  const coupon = allCoupons[couponId];

  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(coupon.code);
    setAlert(messages.COPIED);
  };

  const backAction = (e) => {
    e.preventDefault();
    setShowCouponDetails(FALSE);
  };

  return (
    <div>
      <button className="back-button" onClick={backAction}>
        Back
      </button>
      <div className="coupon-details-container">
        <p className="alert-message">{alert}</p>
        <h3>{coupon.name}</h3>
        <p>{coupon.description}</p>
        <h4>CODE: '{coupon.code}'</h4>
        <button className="copy-button" onClick={copyToClipboard}>
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default CouponDetails;
