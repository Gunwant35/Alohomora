import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (location.pathname === '/login') {
      document.body.classList.add('hide-navbar');
    } else {
      document.body.classList.remove('hide-navbar');
    }
  }, [location]);

  if (location.pathname === '/login') {
    return null; // Don't render the Navbar on the login page
  }

  return (
    <nav className={`navbar ${mode}`}>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/home" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/students" className="navbar-link">
            Students
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/books" className="navbar-link">
            Books
          </Link>
        </li>
        <li className="navbar-item">
          <button onClick={toggleMode}>
            {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
