import React, { useContext, useEffect, useState } from 'react';
import SavedCoupon from './SavedCoupon';
import CouponContext from './CouponContext';
import messages from './messages';
import { TRUE, ALL } from './constants';
import CouponDetails from './CouponDetails';
import RefreshPage from './RefreshPage';
import CouponCategory from './CouponCategory';

const Coupon = () => {
  const couponContext = useContext(CouponContext);
  const [id, setId] = useState('');

  /*Calls coupon context*/
  const {
    getAllCoupons,
    allCoupons,
    addUserCoupons,
    isLoggedIn,
    alert,
    setAlert,
    showFav,
    setShowFav,
    isCouponDetails,
    setShowCouponDetails,
    couponFilter,
  } = couponContext;

    /*Initial rendering by fetching getAllCoupons and displaying the coupons
  Runs only once - []*/
  useEffect(() => {
    getAllCoupons();
  }, []);

  /*Retrieves id from e.target DOM element and passes id to addusercoupon function
  or else displays login to save message*/
  const saveCoupon = (e) => {
    const id = e.target.dataset.id;
    if (isLoggedIn) {
      addUserCoupons(id); 
    } else {
      setAlert(messages.LOGIN_TO_SAVE);
    }
  };

  /*This function calls setShowFav from couponcontext.js and the 
  the provider sets the status as true as we click on my coupon button*/
  const myCoupons = () => {
    setShowFav(true);
  };

  /*This function is triggered when user clicks on Show code button and it retrieves id from DOM element
   and sets id using usestate and displays coupon code by setting setShowCouponDetails as true*/
  const displayCouponInfo = (e) => {
    const id = e.target.dataset.id;
    setId(id);
    setShowCouponDetails(TRUE);
  };

  return (
    <div>
      {!isCouponDetails && <CouponCategory />}
      {showFav && <SavedCoupon />}
      {!showFav && isCouponDetails && <CouponDetails couponId={id} />}
      {!showFav && !isCouponDetails && <RefreshPage />}
      {!showFav && !isCouponDetails && (
        <div className="coupons-container">
          {isLoggedIn && (
            <button class="mycoupon-button" onClick={myCoupons}>My Coupons</button>
          )}
          <p className="error-msg">{alert}</p>
          <div className="coupon-container">
            {Object.values(allCoupons)
              .filter((coupon) =>
                couponFilter === ALL ? TRUE : coupon.type === couponFilter
              )
              .map((coupon, index) => (
                <div key={index} className="coupon-details">
                  <h3 data-id={coupon.couponId}>{coupon.name}</h3>
                  <p data-id={coupon.couponId}>{coupon.description}</p>
                  <button
                    className="showcode-button"
                    data-id={coupon.couponId}
                    onClick={displayCouponInfo}
                  >
                    VIEW CODE
                  </button>
                  <button
                    className="savecode-button"
                    data-id={coupon.couponId}
                    onClick={saveCoupon}
                  >
                    SAVE CODE
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupon;
