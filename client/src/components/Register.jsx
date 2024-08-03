import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData, { withCredentials: true });
      console.log('Response:', response); // Log response for debugging

      // Check for success message or other indicators of a successful registration
      if (response.data && response.data.success) {
        // Redirect to login page or home page
        navigate('/login'); // Redirect to login page if that's the next step
      } else {
        console.error('Unexpected response structure:', response);
      }
    } catch (err) {
      console.error(err.response ? err.response.data : 'Error:', err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input 
            id="username"
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={onChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            id="email"
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={onChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input 
            id="password"
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={onChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
