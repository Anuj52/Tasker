import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          <Link to="/login">Task Manager</Link>
        </h1>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
          <Link to="/ToDoFast" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Tasks</Link>
          {isAuthenticated ? (
            <>
              <Link to="/tasks/new" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Add Task</Link>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                className="text-white hover:bg-gray-700 px-3 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Login</Link>
              <Link to="/register" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Register</Link>
            </>
          )}
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-gray-800 p-4 rounded-lg">
            <Link to="/" className="block text-white hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
            <Link to="/tasks" className="block text-white hover:bg-gray-700 px-3 py-2 rounded">Tasks</Link>
            {isAuthenticated ? (
              <>
                <Link to="/tasks/new" className="block text-white hover:bg-gray-700 px-3 py-2 rounded">Add Task</Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                  }}
                  className="block text-white hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-white hover:bg-gray-700 px-3 py-2 rounded">Login</Link>
                <Link to="/register" className="block text-white hover:bg-gray-700 px-3 py-2 rounded">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
