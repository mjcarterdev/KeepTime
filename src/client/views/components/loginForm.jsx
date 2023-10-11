// src/client/views/components/LoginForm.jsx

import React, { useState } from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para verificar el correo y la contraseña
    // Por ahora, simplemente mostraremos los valores ingresados
    console.log('Email:', email);
    console.log('Contraseña:', password);
  };


  return (
    <div className="login-form-container">
      <div className="logo-container">
        <div className="logo-text keep">Keep</div>
        <div className="logo-text time">Time</div>
      </div>
      <form onSubmit={handleSubmit} className="form">
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
        <button type="submit" className="outlined-button">Log In</button>
        <Link to="/" className="home-button">Back to Home</Link>
      </form>
    </div>
  );
}

export default LoginForm;