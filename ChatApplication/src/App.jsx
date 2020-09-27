import React, { useState, useEffect, useCallback } from 'react';
import { fetchLoginStatus, fetchUsers, fetchMessage } from './services';
import useInterval from './Interval';
import Navigation from './Navigation';
import LoginPage from './LoginPage';
import UserList from './UserList';
import Message from './Message';
import AddMessage from './AddMessage';
import messages from './messages';
import './App.css';

const App = () => {
  const [userState, setLoginState] = useState({ isLoggedIn: false });
  const [userListState, setuserListState] = useState([]);
  const [messageState, setMessageListState] = useState([]);
  const [error, setError] = useState('');

  const getChats = useCallback(() => {
    getUsers();
    getMessages();
  }, []);

  useEffect(() => {
    fetchLoginStatus()
      .then(userInfo => {
        setLoginState({
          isLoggedIn: true,
          username: userInfo.username
        });
        if (userState.isLoggedIn) {
          getChats();
        }
        setError('');
      })
      .catch(err => {
        setError(messages[err.code || 'DEFAULT']);
      });
  }, [getChats, userState.isLoggedIn]);

  const login = username => {
    setLoginState({
      isLoggedIn: true,
      username
    });
    getChats();
  };

  const logout = () => {
    setLoginState({
      isLoggedIn: false
    });
  };

  const getUsers = () => {
    fetchUsers()
      .then(usersList => {
        setuserListState(Object.values(usersList));
      })
      .catch(err => {
        setError(messages[err.code || 'DEFAULT']);
      });
  };

  const getMessages = () => {
    fetchMessage()
      .then(messageList => {
        setMessageListState(messageList);
      })
      .catch(err => {
        setError(messages[err.code || 'DEFAULT']);
      });
  };

  useInterval(() => {
    if (userState.isLoggedIn) {
      getChats();
    }
  }, 3000);

  let content;

  const checkError = errCode => {
    if (errCode === 'LOGIN_REQUIRED' || errCode === 'LOGIN_UNAUTHORIZED') {
      logout();
    }
  };

  if (userState.isLoggedIn) {
    content = (
      <React.Fragment>
        <AddMessage onAddMessage={getMessages} onError={checkError} />
        <div className="container">
          <UserList userList={userListState} />
          <Message messageList={messageState} />
        </div>
      </React.Fragment>
    );
  } else {
    content = <LoginPage onLogin={login} />;
  }

  return (
    <div className="app">
      <Navigation user={userState} onLogout={logout} onError={checkError} />
      <p>{error}</p>
      {content}
    </div>
  );
};

export default App;