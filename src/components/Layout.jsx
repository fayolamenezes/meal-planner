// src/components/Layout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <>
     <header>
      <h1>My Recipe Manager</h1>
      <div className="nav-wrapper">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/planner">Meal Planner</Link>
          <Link to="/grocery-list">Grocery List</Link>
        </nav>
      </div>
    </header>
      <main>{children}</main>
      <footer>
        &copy; {new Date().getFullYear()} My Recipe Manager
      </footer>
    </>
  );
}
