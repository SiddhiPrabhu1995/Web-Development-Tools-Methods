import React, { useState, useContext } from 'react';
import spinner from './spinner.svg';
import CouponContext from './CouponContext';
const LoginPage = () => {
  const couponContext = useContext(CouponContext);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setLoginStatus, networkError } = couponContext;

  const loginAction = () => {
    setIsLoading(true);
    setLoginStatus(username);
    setIsLoading(false);
  };

  return (
    
    <div className="login-container">
      <input
        className="user-info"
        placeholder="Enter User name"
        maxLength="20"
        onChange={(e) => setUsername(e.target.value)}
      />
      {isLoading ? (
        <img alt="loading" src={spinner} />
      ) : (
        <button className="login-button" onClick={loginAction}>
          Login
        </button>
      )}
      <div className="error-message">{networkError}</div>
    </div>
  );
};

export default LoginPage;
