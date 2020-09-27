import React, { useState, useContext } from 'react';
import CouponContext from './CouponContext';
import messages from './messages';

const AddMessage = ({ onSetComponent }) => {
  
  const couponContext = useContext(CouponContext);
  const { setAlert, alert, addMessage } = couponContext;

  const [newuser, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [messagetext, setMessage] = useState('');

  const backAction = () => {
    
    onSetComponent(false);
    setAlert('');
  };

  /*Called when ADD MESSAGE button is clicked and the message is added by calling addMessage function
  & Form submitted message is displayed & sets all fields as blank*/
  const addAction = (e) => {
    e.preventDefault();
    setAlert(messages.FORM_SUBMITTED);
    addMessage(newuser, email, messagetext);
    setUserName('');
    setEmail('');
    setMessage('');
  };

  /*Renders Contact Us form & onclick add button it calls addAction */
  return (
    <div className="add-coupon">
      <button className="msgback-button" onClick={backAction}>
        Back
      </button>
      <p className="contactus-errormessage">{alert}</p>
      <div className="add-form">
        <input
          className="form-elements"
          type="text"
          value={newuser}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter user Name"
          maxLength='30'
        />
        <input
          className="form-elements"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          maxLength='50'
        />

        <textarea
          className="coupon-desc-inputarea"
          type="text"
          value={messagetext}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter Message"
          maxLength='200'
        />
      </div>
      <button class="msgsend-button" onClick={addAction}>SEND MESSAGE</button>
    </div>
  );
};

export default AddMessage;
