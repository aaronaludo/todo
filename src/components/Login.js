import React from 'react';
import "./Login.css";
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserData } from '../redux/actions/user';
import { addTodo } from '../redux/actions/todo';
import { CgNotes } from "react-icons/cg";

const Login = ({history}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [note, setNote] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    
    for (let i = 0; i < 20000; i++) {
      if(username === `user${i}` && password === `password${i}`){
        const new_data = {
          id: i,
          username: `user${i}`,
        }
        const old_data = JSON.parse(localStorage.getItem(i));
        const data = old_data === null ? new_data : old_data;
        
        const no_todos = [];
        const with_todos = JSON.parse(localStorage.getItem(`todos_${i}`));
        const todos = with_todos === null ? no_todos : with_todos;

        dispatch(loadUserData(data));
        dispatch(addTodo(todos));
        localStorage.setItem(i, JSON.stringify(data));
        localStorage.setItem(`user_data`,JSON.stringify(data));
        setError(false);
        history.push('/todo');
      }else{
          setError(true);
      }
    }

  }

  return (
    <>
    <div className='position-absolute m-5'>
      {note ?
      <div id="code" onClick={() => setNote(false)}>
        Username: user(you can choose any number between 1-20000) <br/>
        Password: password(same number in username)<br/><br/><br/>
        <small>click me to minimize</small>
      </div>
      : <CgNotes style={{ color: 'white', fontSize: '60px' }}onClick={() => setNote(true)}>Note</CgNotes>
      }
    </div>
    <div className='body'>
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Login</h1>
            {error === true ? <div className="alert alert-danger" role="alert">Error</div> : null}
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" placeholder="Username" name='Username' onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor="floatingInput">Username <small className='text-secondary'>(ex. user23)</small></label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <label htmlFor="floatingPassword">Password <small className='text-secondary'>(ex. password23)</small></label>
          </div>
          <button className="w-100 btn btn-lg btn-primary">Sign in</button>
        </form>
      </main>
    </div>
    </>
  )
}

export default withRouter(Login);

