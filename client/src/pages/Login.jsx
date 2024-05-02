import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

export default function Login({ onLogin }) {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/user/login', data)
      .then(response => {
        console.log(response.data);
        onLogin(); 
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={loginUser}>
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
