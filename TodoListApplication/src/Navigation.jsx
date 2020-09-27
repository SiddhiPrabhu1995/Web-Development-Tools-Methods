import React, { useContext } from 'react';

import TodoContext from './context/TodoContext';

const Navigation = () => {
  const todoContext = useContext(TodoContext);

  const logout = () => {
    todoContext.setLogout();
  };

  return (
    <div>
      <div className="header">Plan Your Tasks</div>
      <div className="error-msg">{todoContext.networkError}</div>
      <ul className="navigation">
        {todoContext.isLoggedIn && (
          <li className="logout action" onClick={logout}>
            Logout
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
