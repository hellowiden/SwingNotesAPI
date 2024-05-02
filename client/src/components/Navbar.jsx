// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">SwingNotesAPI</Link>
      </div>
      <div className="navbar-right">
        <Link to="/register" className="navbar-link">Register</Link>
        {isLoggedIn ? (
          <Link to="/" className="navbar-link" onClick={handleLogout}>Logout</Link>
        ) : (
          <Link to="/login" className="navbar-link">Login</Link>
        )}
      </div>
    </nav>
  );
}
