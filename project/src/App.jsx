import React, { useContext, useEffect, Fragment } from 'react';
import './App.css';
import CouponContext from './CouponContext';
import LoginPage from './LoginPage';
import NavigationPanel from './NavigationPanel';
import Coupon from './Coupon';
import AdminLogin from './AdminLogin';
import ContactUs from './ContactUs';

function App() {
  const { isLoggedIn, getLoginStatus, isAdmin } = useContext(CouponContext);
  
  /*Initial rendering by fetching login status
  Runs only once - []*/
  useEffect(() => {
    getLoginStatus();
  }, []);

  let content;
/*If isloggedIn status is true and user is admin then it renders admin page else render normal users page*/
  if (isLoggedIn) {
    if (isAdmin) {
      content = (
        <Fragment>
          <NavigationPanel />
          <AdminLogin />
        </Fragment>
      );
    } else {
      content = (
        <Fragment>
          <NavigationPanel />
          <Coupon />
        </Fragment>
      );
    }
  } 
  /*If isLoggedIn is false render Login page and display Coupons*/
  else {
    content = (
      <Fragment>
        <LoginPage />
        <Coupon />
        <ContactUs />
      </Fragment>
    );
  }

  /*Render Application header and Login home page and navigation panel based on the islogged in status*/ 
  return (
    <div className="App">
      <p className="header">COUPON FACTORY</p>
      <p className="image"></p>
      {content}
    </div>
  );

}

export default App;
