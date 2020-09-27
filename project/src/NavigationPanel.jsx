import React, { useContext } from 'react';
import CouponContext from './CouponContext';

const NavigationPanel = () => {
  const couponContext = useContext(CouponContext);
  const { isLoggedIn, setLogout, username } = couponContext;

  /*This function calls setLogout in couponContext in which default value is overriden by CouponStates value*/
  const logout = (e) => {
    e.preventDefault();
    setLogout();
  };

  /*Renders the Home page with username and logout button displayed*/
  return (
    <div>
      <ul className="nav">
        {isLoggedIn && <li>Welcome, {username}</li>}
        {isLoggedIn && (
          <li className="logout-action" onClick={logout}>
            Logout
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavigationPanel;
