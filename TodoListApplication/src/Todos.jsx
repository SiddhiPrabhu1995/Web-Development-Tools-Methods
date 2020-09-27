import React, { useState, useEffect, useContext } from 'react';
import TodoContext from './context/TodoContext';
import Filter from './Filter';
import constants from './context/Constants';

const Todos = () => {
  const todoContext = useContext(TodoContext);
  const [task, setTask] = useState('');

  useEffect(() => {
    todoContext.getAllTasks(todoContext.username);
  }, []);

  const performAddTask = (e) => {
    e.preventDefault();

    todoContext.addNewTask(todoContext.username, task);
    setTask('');
  };

  const onChange = (e) => setTask(e.target.value);

  const performToggleTodo = (e) => {
    todoContext.toggleTodo(e.target.id);
  };

  const performDeleteTask = (e) => {
    todoContext.deleteTask(e.target.id);
  };

  const performUpdateTask = (e) => {
    todoContext.updateTask(e.target.id, e.target.value);
  };

  const performRefreshTask = () => {
    todoContext.getAllTasks(todoContext.username);
    todoContext.refreshTasks();
  };

  return (
    <div>
      <div className="todo-container">
        <Filter />
        <div className="add-todo-container">
          <input
            className="todo-input"
            onChange={onChange}
            value={task}
            type="text"
            placeholder="Enter Todo here"
            maxLength="50"
          />
          <button className="btn-todo-add" onClick={performAddTask}>
            Add
          </button>
          <button className="btn-refresh" onClick={performRefreshTask}>
            Refresh
          </button>
          <div className="todo-display">
            <ul>
              {Object.values(todoContext.tasks)
                .filter((task) =>
                  todoContext.taskStatusFilter === constants.COMPLETE
                    ? task.done === constants.TRUE
                    : constants.TRUE
                )
                .filter((task) =>
                  todoContext.taskStatusFilter === constants.ACTIVE
                    ? task.done === constants.FALSE
                    : constants.TRUE
                )
                .map((task, index) => (
                  <li key={index}>
                    <input
                      id={task.taskId}
                      className="todo-checkbox"
                      type="checkbox"
                      checked={task.done ? 'checked' : ''}
                      onChange={performToggleTodo}
                    />
                    <input
                      type="text"
                      id={task.taskId}
                      className={`todo ${task.done ? 'todo complete' : 'todo'}`}
                      value={task.name}
                      onChange={performUpdateTask}
                      contentEditable="true"
                    />

                    <button
                      id={task.taskId}
                      className="task-delete"
                      onClick={performDeleteTask}
                    >
                      X
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
