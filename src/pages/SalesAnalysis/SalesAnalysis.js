import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SalesAnalysis.css';
import logo from '../../photos/logo.jpeg'; 

const SalesAnalysis = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/menu');
  };

  return (
    <div className='Sales-analysis'>
      <div className="sales-analysis-container">
        <div className="back-button" onClick={handleBackClick}>
          &lt; Back
        </div>
        <h1 className="title">ניתוחי מכירות</h1>
        <div className="options-container">
        <button className="option-button">ניתוח פארטו</button>
          <button className="option-button">ניתוח לפי וריאציה</button>
          <button className="option-button">ניתוח לפי מוצר ספציפי</button>
        </div>
        <div className="logo-container">
          <img src={logo} alt="Triangle Analytics Logo" className="logo" />
        </div>
      </div>
    </div>
  );
};

export default SalesAnalysis;
