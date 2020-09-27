import React, { Fragment, useContext } from 'react';

import Navigation from './Navigation';
import HomePage from './HomePage';
import './App.css';
import TodoContext from './context/TodoContext';

const App = () => {
  const todoContext = useContext(TodoContext);

  return (
    <Fragment>
      <div className={`app ${todoContext.theme ? todoContext.theme : ''}`}>
        <Navigation />
        <HomePage />
      </div>
    </Fragment>
  );
};

export default App;
