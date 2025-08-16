import React from 'react';
import { Link } from 'react-router-dom';
import '../Styling/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-title">Book Management</Link>
      <div className="nav-links">
        <Link to="/books" className="nav-item">Display All Books</Link>
        <Link to="/create" className="nav-item">Create New Book</Link>
        <Link to="/search" className="nav-item">Search Book</Link>
      </div>
    </nav>
  );
}

export default Navbar;