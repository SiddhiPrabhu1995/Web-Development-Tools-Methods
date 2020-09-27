import React, { useState, useContext } from 'react';
import CouponContext from './CouponContext';
import categories from './Categories';

const CreateCoupon = ({ onSetComponent }) => {
  const couponContext = useContext(CouponContext);
  const { addCoupons, setAlert } = couponContext;

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState('');
  const [desc, setDesc] = useState('');

  const backAction = () => {
    onSetComponent(false);
    setAlert('');
  };

  const addAction = (e) => {
    e.preventDefault();
    setAlert('');
    if (addCoupons(name, code, type, desc)) {
      onSetComponent(false);
    }
  };

  return (
    <div className="add-coupon">
      <button className="back-button" onClick={backAction}>
        Back
      </button>
      <div className="add-form">
        <input
          className="form-elements"
          type="text"
          value={name}
          maxLength="30"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Coupon Name"
        />
        <input
          className="form-elements"
          type="text"
          maxLength="15"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Coupon Code"
        />
        <div>
          <select
            className="form-elements"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <textarea
          className="coupon-desc-inputarea"
          type="text"
          value={desc}
          maxLength="30"
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter Coupon Description"
        />
      </div>
      <button class="createcoupon-button" onClick={addAction}>ADD COUPON</button>
    </div>
  );
};

export default CreateCoupon;
