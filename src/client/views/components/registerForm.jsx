// src/client/views/components/RegisterForm.jsx
import React, { useState } from 'react';
import './RegisterForm.css'; // Make sure you have a CSS file for custom styles
import { Link } from 'react-router-dom';


function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); // Check if passwords match

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the logic for user registration

    if (password === confirmPassword) {

      setPasswordMatch(true);

      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
    } else {
      setPasswordMatch(false);
    }
  };

  

  return (
    <div className="register-form-container">
      <div className="logo-container">
        <div className="logo-text keep">Keep</div>
        <div className="logo-text time">Time</div>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
          />
          {!passwordMatch && <p className="error-message">Passwords don't match!</p>}
        </div>
        <button type="submit" className="outlined-button">Sign Up</button>
        <Link to="/" className="home-button">Back to Home</Link>
      </form>
    </div>
  );
}

export default RegisterForm;

