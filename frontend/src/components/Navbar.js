import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">EventHub</h1>
        <div className="nav-links">
          {user ? (
            <>
              <a href="/events">Events</a>
              <a href="/dashboard">Dashboard</a>
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
