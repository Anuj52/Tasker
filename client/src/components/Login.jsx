import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      },{
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.success) {
        alert('Login successful');
        // Redirect or handle successful login
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      alert(`Error logging in: ${error.response?.data?.message || error.message}`);
    }
  };
  
  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
