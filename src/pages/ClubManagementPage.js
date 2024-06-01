import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ClubManagementPage.css';
import logo from 'my-app/src/photos/logo.jpeg';

const ClubManagementPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleEventCalendarClick = () => {
    navigate('/event-calendar');
  };

  return (
    <div className="club-management-container">
      <div className="back-button" onClick={handleBackClick}>
        &lt; Back
      </div>
      <h1 className="title">ניהול מועדון הלקוחות</h1>
      <div className="options-container">
        <button className="option-button">ניהול סקרים</button>
        <button className="option-button">צפייה בפרטי לקוחות</button>
        <button className="option-button">ניהול מבצעים</button>
        <button className="option-button" onClick={handleEventCalendarClick}>ניהול יומן אירועים</button>
      </div>
      <div className="logo-container">
        <img src={logo} alt="Triangle Analytics Logo" className="logo" />
      </div>
    </div>
  );
};

export default ClubManagementPage;
