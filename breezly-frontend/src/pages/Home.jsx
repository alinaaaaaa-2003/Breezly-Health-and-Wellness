import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-heading">🌸 Breezly 🌸 </h1>
      <p className="tagline">Your Companion for Mental & Physical Wellness</p>
      
      <div className="button-group">
        <button className="home-btn register-btn" onClick={() => navigate('/register')}>Register</button>
        <p className="login-prompt">
          Already registered?{' '}
          <span className="login-link" onClick={() => navigate('/login')}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;

  