import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

      alert('Login successful!');
      console.log(res.data);
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login to Breezly</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
