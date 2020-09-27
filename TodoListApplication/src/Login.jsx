import React, { useState, useContext } from 'react';
import spinner from './spinner.svg';
import TodoContext from './context/TodoContext';
const Login = () => {
  const todoContext = useContext(TodoContext);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const performLogin = () => {
    setIsLoading(true);
    todoContext.setLoginStatus(username);
    setIsLoading(false);
  };

  return (
    <div className="login">
      <input
        className="user-info"
        placeholder="Enter User name"
        onChange={(e) => setUsername(e.target.value)}
        maxLength="20"
      />
      {isLoading ? (
        <img alt="spinner" src={spinner} />
      ) : (
        <button className="to-login" onClick={performLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default Login;
