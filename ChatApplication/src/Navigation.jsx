import React, { useState } from 'react';
import { fetchLogout } from './services';
import messages from './messages';

const Navigation = ({ user, onLogout, onError }) => {
  const [error, setError] = useState('');

  const logout = () => {
    fetchLogout()
      .then(() => {
        onLogout();
      })
      .catch(err => {
        onError(err.code);
        setError(messages[err.code || 'DEFAULT']);
      });
  };
  return (
    <div>
      <ul className="navigation">
        {user.username && <li> LoggedIn as {user.username}</li>}
        <p className="welcome-header"> Chat Box</p>
        
        {user.isLoggedIn && (
          <li className="logout action" onClick={logout}>
            Logout
          </li>
        )}
      </ul>
      <p>{error}</p>
    </div>
  );
};

export default Navigation;
