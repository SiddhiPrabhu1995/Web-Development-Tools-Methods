import React, { useState, useContext } from 'react';
import CouponContext from './CouponContext';
import AddMessage from './AddMessage';

const ContactUs = () => {

const couponContext = useContext(CouponContext);
 const [isAddMessage, setIsAddForm] = useState(false);

  const {
    setAlert,
  } = couponContext;

    const setAddForm = (e) => {
        e.preventDefault();
        setAlert('');
        setIsAddForm(true);
      };
    
      const setAddTextMessage = (status) => {
        setIsAddForm(status);
      };

  return (
<div>
      {isAddMessage && <AddMessage onSetComponent={setAddTextMessage} />}
      
      {!isAddMessage && (
        <div>
          <div>
            <button className="contactus-button" onClick={setAddForm}>
              CONTACT US
            </button>
           </div>
        </div>
      )}
    </div>


  );
};

export default ContactUs;
