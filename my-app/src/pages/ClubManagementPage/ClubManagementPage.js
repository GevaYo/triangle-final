import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ClubManagementPage.css';
import logo from '../../photos/logo.png'; 

const ClubManagementPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/menu');
  };

  const handleEventCalendarClick = () => {
    navigate('/event-calendar');
  };

  const handleCustomerClubFormClick = () => {
    navigate('/CustomerClubForm');
  };

  const handleNewSurveyClick = () => {
    navigate('/Survey-CreationForm');
  };

  const handleSurveyResultsClick = () => {
    navigate('/SurveyList');
  };

  return (
    <div className="club-management-container">
      <div className="back-button" onClick={handleBackClick}> Back
      </div>
        <div className="logo-container_club_managment">
          <img src={logo} alt="Triangle Analytics Logo" className="logo_new" />
        </div>
        {/* <img src={logo} alt="Triangle Analytics Logo" className="logo_new" /> */}
        <div className="options-container">
          <h2>ניהול מועדון הלקוחות</h2>
          {/* <button className="option-button" onClick={handleEventCalendarClick}>ניהול סקרים</button>
          <button className="option-button" onClick={handleEventCalendarClick}>רישום לקוח חדש לדף המועדון</button>
          <button className="option-button" onClick={handleEventCalendarClick}>ניהול מבצעים</button>
          <button className="option-button" onClick={handleEventCalendarClick}>ניהול יומן אירועים</button> */}
          <button  onClick={handleCustomerClubFormClick}>רישום לקוח חדש לדף המועדון</button>
          <button  onClick={handleNewSurveyClick}>יצירת סקר חדש</button>
          <button  onClick={handleSurveyResultsClick}>תוצאות הסקרים</button>
          <button  onClick={handleEventCalendarClick}>ניהול יומן אירועים</button>
      </div>
    </div>
  );
};

export default ClubManagementPage;