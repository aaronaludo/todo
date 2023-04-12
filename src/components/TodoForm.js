import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function TodoForm(props) {
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState(props.edit ? props.edit.value : props.editComments ? props.editComments.comment_text : '');
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: props.edit ? props.edit.id :  Date.now() ,
      user_id: user.id,
      text: props.comments ? props.comments.value : props.editComments ? props.editComments.value : input,
      comments: props.comments ? { id: Date.now(), text:input } : props.editComments ? props.editComments.comments.map(d => d.id === props.editComments.comment_id ? {id: props.editComments.comment_id, text: input} : d) :props.edit ? props.edit.comments : []
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form d-flex justify-content-center'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (props.comments) ? (
        <>
        <input
          placeholder='Add a Comment'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          name='text'
          className='todo-input-comment'
          ref={inputRef}
        />
        <button onClick={handleSubmit} className='todo-button-comment'>
          Add Comments
        </button>
      </>
      ) : (props.editComments) ? (
        <>
          <input
            placeholder='Update Comment'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name='text'
            className='todo-input-comment'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button-comment'>
            Update Comment
          </button>
        </>
      ) :
      <>
      <input
        placeholder='Add a todo'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        name='text'
        className='todo-input'
        ref={inputRef}
      />
      <button onClick={handleSubmit} className='todo-button'>
        Add todo
      </button>
    </>}
    </form>
  );
}

export default TodoForm;