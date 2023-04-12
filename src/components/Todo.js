import React from 'react';
import { useSelector } from 'react-redux';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { VscArrowDown } from "react-icons/vsc";
import { VscArrowUp } from "react-icons/vsc";
import { useState } from 'react';
import TodoForm from './TodoForm';
import { FaCommentDots } from "react-icons/fa";

const Todo = ({ removeTodo, updateTodo, addComment, removeComment, updateComment}) => {
  const todos = useSelector((state) => state.todo);
  const [edit, setEdit] = useState({
    id: null,
    user_id: null,
    value: '',
    comments: []
  });
  const [comments, setComments] = useState({
    id:null,
    value: '',
    user_id: null,
    comments: []
  })
  const [editComments, setEditComments] = useState({
    id:null,
    value: '',
    user_id: null,
    comments: []
  })
  const [hideComments, setHideComments] = useState(true);
  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
      user_id: null,
      comments: []
    });
  };

  const submitAddComment = value => {
    addComment(comments.id, value);
    setHideComments(true);
    setComments({
      id: null,
      value: '',
      user_id: null,
      comments: []
    });
  }

  const submitUpdateComment = value => {
    updateComment(editComments.id, value);
    setHideComments(true);
    setEditComments({
      id: null,
      value: '',
      user_id: null,
      comments: []
    });
  }

  const hideCommentsClick = () => {
    if(hideComments){
      setHideComments(false);
    }else{
      setHideComments(true);
    }
  }

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  if(comments.id){
    return <TodoForm comments={comments} onSubmit={submitAddComment} />;
  }

  if(editComments.id){
    return <TodoForm editComments={editComments} onSubmit={submitUpdateComment} />;
  }

  return todos.map((todo, index) => (
    <div key={index}>
      <div
        className={'todo-row'}
      >  
        <div>{todo.text}</div>
        <div className='icons'>
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className='delete-icon'
          />
          <TiEdit
            onClick={() => setEdit({ id: todo.id,user_id: todo.user_id, value: todo.text, comments: todo.comments})}
            className='edit-icon'
          />
          <FaCommentDots 
            className='edit-icon ms-2'
            onClick={() => setComments({ id: todo.id,user_id: todo.user_id, value: todo.text, comments: todo.comments })}
          />
          { hideComments ? <VscArrowDown onClick={hideCommentsClick}/> : <VscArrowUp onClick={hideCommentsClick}/> }
        </div>
      </div>
      {hideComments ?
      todo.comments.map((commentss, index) => (
        <div key={index}>
          <div className='todo-row-comments'>
            <div>{commentss.text === undefined ? null : commentss.text}</div>
              <div>
                <RiCloseCircleLine onClick={() => removeComment(todo.id, commentss.id)} className='delete-icon' />
                <TiEdit className='edit-icon' onClick={() => setEditComments({ id: todo.id,user_id: todo.user_id, value: todo.text, comments: todo.comments, comment_id: commentss.id, comment_text: commentss.text})}/>
              </div>
          </div>
        </div>
      )) : null
      }
    </div>
  ));
};

export default Todo;