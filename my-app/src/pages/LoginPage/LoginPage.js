import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../../photos/logo.png'; 
import video from '../../photos/video.mp4';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('אנא הכנס כתובת מייל תקינה');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('הסיסמא חייבת להכיל לפחות שמונה תווים');
      return;
    }

    console.log('הרשם:', email, password);

    setEmail('');
    setPassword('');
    setErrorMessage('');

    navigate('/menu');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='FullPage'>
      <div className='LoginPage'>
        <img id='logo' src={logo} alt="Logo" />
        <h1 id='Login_1'> ,שלום</h1>
        <h1 id='Login_2'> !ברוכים הבאים</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="כתובת מייל"
              required
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="סיסמא"
              required
            />
            <button type="button" className="toggle-password-btn" onClick={toggleShowPassword}>
              {showPassword ? 'הסתר' : 'הצג'}
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="submit-btn">הכנס</button>
        </form>
      </div>
      <video src={video} autoPlay muted className='video' style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};

export default LoginPage;
