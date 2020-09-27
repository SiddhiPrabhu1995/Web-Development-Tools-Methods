import React, { useContext } from 'react';
import TodoContext from './context/TodoContext';

const SortTodoList = () => {
  const todoContext = useContext(TodoContext);

  const sortTasksByOrder = (e) => {
    todoContext.sortTasksByOrder(e.target.value);
  };

  const sortTasksByDone = (e) => {
    todoContext.sortTasksByDone(e.target.value);
  };

  return (
    <span className="sort-container">
      <span className="select-sort">
        <label class="sortby-name"> Sort By Task Name:</label>
        <select
          className="sort-alphabetically"
          value={todoContext.taskOrderFilter}
          onChange={sortTasksByOrder}
        >
          <option value="select option" disabled>
            Select
          </option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
        <label class="sortby-donenotdone">Sort By Done/Not Done:</label>
        <select
          className="sort-by-status"
          value={todoContext.taskDoneFilter}
          onChange={sortTasksByDone}
        >
          <option value="select option" disabled>
            Select
          </option>
          <option value="done">Done</option>
          <option value="notdone">Not Done</option>
        </select>
      </span>
    </span>
  );
};

export default SortTodoList;
