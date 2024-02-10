import React, { useState } from 'react';

import axios from "axios";
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      try {
        const response = await axios.post('http://localhost:3003/user/login', user,{withCredentials:true});
        if(response.status === 200){
           navigate("/post"); 
        }
        console.log(response)
        setMessage(response.data.message); 
      } catch (error) {
        console.error('Login error:', error);
        setMessage('Failed to login. Please try again.');
      }
      setUser({ email: '', password: '' });
    } else {
      setMessage('Please fill the form');
    }
  };

  return (
    <div>
      

      <div >
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleUserChange}
            />
          </div>
          <div >
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleUserChange}
            />
          </div>
          <button  type="submit">Login</button>
        </form>
        <div>{message}</div> 
      </div>
    </div>
  );
};

export default Login;
