import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

export default function Register() {
  const [data, setData] = useState({
    name: '', 
    email: '',
    password: '',
  });

  const registerUser = (e) => {
    e.preventDefault();
axios.post('http://localhost:8000/api/user/signup', data)
  .then(response => {
    console.log(response.data);
    // Optionally, perform additional actions upon successful registration
  })
  .catch(error => {
    console.error('Registration failed:', error);
  });

  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={registerUser}>
        <h2>Register</h2>
        <div className="form-group">
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={data.name} 
            onChange={(e) => setData({...data, name: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={data.email} 
            onChange={(e) => setData({...data, email: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={data.password} 
            onChange={(e) => setData({...data, password: e.target.value})} 
            minLength="8"
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
