import React, { useContext } from 'react';
import TodoContext from './context/TodoContext';
import SortTodoList from './SortTodoList';

const Filter = () => {
  const todoContext = useContext(TodoContext);

  const filterTasksByStatus = (e) => {
    todoContext.filterTasksByStatus(e.target.value);
  };

  return (
    <div className="filter-todos">
      <span className="filter-container">
        <label className="task-filter-label">Filter By:</label>
        <select
          className="filter-task"
          value={todoContext.taskStatusFilter}
          onChange={filterTasksByStatus}
        >
          <option value="all">All Tasks</option>
          <option value="active">Active Tasks</option>
          <option value="complete">Complete Tasks</option>
        </select>
      </span>
      <SortTodoList />
    </div>
  );
};

export default Filter;
