import React, { useEffect, useContext } from 'react';
import TodoContext from './context/TodoContext';

const DisplayTheme = () => {
  const todoContext = useContext(TodoContext);

  useEffect(() => {
    todoContext.getTheme(todoContext.username);
  }, []);

  const changeTheme = (e) => {
    let themeVal = e.target.value;
    todoContext.setTheme(todoContext.username, themeVal);
  };
  return (
    <span className="select-sort">
        <label class="theme-label"> Display Theme: </label>
    <select className="theme" value={todoContext.theme} onChange={changeTheme}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="colorful">Colorful</option>
    </select>
    </span>
  );
};  

export default DisplayTheme;
