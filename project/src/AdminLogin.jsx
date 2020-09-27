import React, { useContext, useState } from 'react';
import categories from './Categories';
import CouponContext from './CouponContext';
import RefreshPage from './RefreshPage';
import CreateCoupon from './CreateCoupon';
import { NAME, CODE, TYPE, DESC, ALL, TRUE } from './constants';

const AdminLogin = () => {
  const couponContext = useContext(CouponContext);

  const {
    allCoupons,
    updateCoupons,
    updateCouponState,
    deleteCoupon,
    alert,
    setAlert,
    couponFilter,
  } = couponContext;

  const [isAddComponent, setIsAddComponent] = useState(false);
  const [name, setCouponName] = useState('');
  const [code, setCouponCode] = useState('');
  const [type, setCouponType] = useState('');
  const [desc, setCouponDesc] = useState('');

  const setAddCoupon = (e) => {
    e.preventDefault();
    setAlert('');
    setIsAddComponent(true);
  };

  /* This function updates the coupon details using context.
   performUpdate is called after user clicks on Update button*/
  const updateAction = (e) => {
    e.preventDefault();
    updateCoupons(e.target.dataset.id, name, code, type, desc);
    setCouponName('');
    setCouponCode('');
    setCouponType('');
    setCouponDesc('');
  };

  /*Updates the coupon details by updating couponstate using a context */
  const updateCouponInfo = (id, value, type) => {
    switch (type) {
      case NAME:
        updateCouponState(NAME, id, value);
        return setCouponName(value);
      case CODE:
        updateCouponState(CODE, id, value);
        return setCouponCode(value);
      case TYPE:
        updateCouponState(TYPE, id, value);
        return setCouponType(value);
      case DESC:
        updateCouponState(DESC, id, value);
        return setCouponDesc(value);
      default:
        return;
    }
  };

    const deleteAction = (e) => {
    e.preventDefault();
    deleteCoupon(e.target.dataset.id);
  };

  const setAddComponent = (status) => {
    setIsAddComponent(status);
  };

  return (
    <div>
      {isAddComponent && <CreateCoupon onSetComponent={setAddComponent} />}
      <p className="error-msg">{alert}</p>
      {!isAddComponent && (
        <div>
          <div>
            <button className="add-button" onClick={setAddCoupon}>
              Add Coupon
            </button>
            <RefreshPage />
          </div>
          <div className="admin-coupon-container">
            <div className="admin-label-container">
              <span className="header-name">Coupon Name</span>
              <span className="header-code">Coupon Code</span>
              <span className="header-label">Coupon Type</span>
              <span className="header-desc">Coupon Description</span>
            </div>
            {Object.values(allCoupons)
              .filter((coupon) =>
                couponFilter === ALL ? TRUE : coupon.type === couponFilter
              )
              .map((coupon, index) => (
                <div key={index} className="admin-list">
                  <input
                    className="coupon-name"
                    data-id={coupon.couponId}
                    type="text"
                    maxLength="30"
                    value={coupon.name}
                    onChange={(e) =>
                      updateCouponInfo(
                        e.target.dataset.id,
                        e.target.value,
                        NAME
                      )
                    }
                  />
                  <input
                    className="coupon-code"
                    data-id={coupon.couponId}
                    value={coupon.code}
                    maxLength="15"
                    onChange={(e) =>
                      updateCouponInfo(
                        e.target.dataset.id,
                        e.target.value,
                        CODE
                      )
                    }
                  />
                  <select
                    className="coupon-items"
                    data-id={coupon.couponId}
                    value={coupon.type}
                    onChange={(e) =>
                      updateCouponInfo(
                        e.target.dataset.id,
                        e.target.value,
                        TYPE
                      )
                    }
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <textarea
                    className="coupon-description"
                    data-id={coupon.couponId}
                    value={coupon.description}
                    maxLength="30"
                    onChange={(e) =>
                      updateCouponInfo(
                        e.target.dataset.id,
                        e.target.value,
                        DESC
                      )
                    }
                  />
                  <button
                    className="update-button"
                    data-id={coupon.couponId}
                    onClick={updateAction}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    data-id={coupon.couponId}
                    onClick={deleteAction}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
