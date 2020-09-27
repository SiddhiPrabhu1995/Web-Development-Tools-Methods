import React, { useContext, useEffect, Fragment } from 'react';
import TodoContext from './context/TodoContext';
import DisplayTheme from './DisplayTheme';
import Todos from './Todos';
import Login from './Login';

const HomePage = () => {
  const todoContext = useContext(TodoContext);

  useEffect(
    () => {
      todoContext.getLoginStatus();
    },
       []
  );

  let content;

  if (todoContext.isLoggedIn) {
    content = (
      <Fragment>
        <div className="second-header">
          Logged In as : {todoContext.username.toUpperCase()}
          <DisplayTheme />
        </div>
        <p className="error-msg">{todoContext.error}</p>

        <Todos />
      </Fragment>
    );
  } else {
    content = <Login />;
  }

  return <div>{content}</div>;
};

export default HomePage;
