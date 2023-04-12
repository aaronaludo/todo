import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/user';
import { addTodo as addTodo2} from '../redux/actions/todo';
import { clearTodo } from '../redux/actions/todo';
import "./Todo.css";
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList({history}) {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);
  const user = useSelector((state) => state.user);

  const logoutUserData = () => {
    dispatch(logoutUser());
    dispatch(clearTodo());
    localStorage.removeItem('user_data');
    history.push('/login');
  }

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    dispatch(addTodo2(newTodos));
    localStorage.setItem(`todos_${user.id}`, JSON.stringify(newTodos));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    dispatch(addTodo2(removedArr));
    localStorage.setItem(`todos_${user.id}`, JSON.stringify(removedArr));
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    const updated = todos.map(d => d.id === todoId ? newValue : d);
    dispatch(addTodo2(updated));
    localStorage.setItem(`todos_${user.id}`, JSON.stringify(updated));
  };

  const addComment = (todoId, value) => {
    if (!value.comments.text || /^\s*$/.test(value.comments.text)) {
      return;
    }

    const added = todos.map(d => d.id === todoId ? {id: d.id, user_id: d.user_id, text: d.text, comments: [value.comments, ...d.comments]} : d);
    dispatch(addTodo2(added));
    localStorage.setItem(`todos_${user.id}`, JSON.stringify(added));
  }

  const removeComment = (todoId, id) => {
    const removed = todos.map(d => d.id !== todoId ? d : {id: d.id, user_id: d.user_id, text: d.text, comments: d.comments.filter(d => d.id !== id)});
    dispatch(addTodo2(removed));
    localStorage.setItem(`todos_${user.id}`, JSON.stringify(removed));
  }

  const updateComment = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    const updated = todos.map(d => d.id === todoId ? newValue : d);
    dispatch(addTodo2(updated));
    localStorage.setItem(`todos_${user.id}`, JSON.stringify(updated));
  }

  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1 className='ms-3'>{`user${user.id}`}</h1>
        <h1>Todo</h1>
        <button className="btn btn-danger me-3" onClick={logoutUserData}>Logout</button>
      </div>
      <TodoForm onSubmit={addTodo} />
      <Todo
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        addComment={addComment}
        removeComment={removeComment}
        updateComment={updateComment}
      />
    </>
  );
}

export default withRouter(TodoList);