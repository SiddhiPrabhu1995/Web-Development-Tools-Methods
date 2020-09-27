import React, { useState } from 'react';
import { fetchLogin } from './services';
import messages from './messages';
import spinner from './spinner.svg';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const performLogin = () => {
    if (!username) {
      setError(messages.USERNAME_REQUIRED);
      return;
    }
    setError('');
    setIsLoading(true);
    fetchLogin(username)
      .then(userInfo => {
        onLogin(userInfo.username);
      })
      .catch(err => {
        setError(messages[err.code || 'DEFAULT']);
        setIsLoading(false);
        setUsername('');
      });
  };

  const onChange = e => setUsername(e.target.value);

  return (
    <div className="login">
      <p className="error">{error}</p>
      <input onChange={onChange} value={username} maxLength='20' />
      {isLoading ? (
        <img alt="spinner" src={spinner} />
      ) : (
        <button onClick={performLogin}>Login</button>
      )}
      <div class="imageheader"> </div>
    </div>
  );
};

export default LoginPage;
