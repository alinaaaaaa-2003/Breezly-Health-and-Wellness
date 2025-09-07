// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // if you separated styles

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">Breezly</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/journal" className="px-4 py-2 text-pink-300 font-bold hover:underline">Journal</Link>
      </div>
    </div>
  );
};

export default Navbar;
