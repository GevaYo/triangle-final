import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SalesAnalysis.css';
import logo from '../../photos/logo.png';

const SalesAnalysis = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/menu');
  };

  const handleParetoClick = () => {
    navigate('/pareto-analysis');
  };

  const handleVariationClick = () => {
    navigate('/variation-analysis');
  };

  const handleProductClick = () => {
  };

  return (
    <div className='Sales-analysis'>
      <div className="back-button" onClick={handleBackClick}>
          Back
      </div>
      <div className="sales-analysis-container">
        <img src={logo} alt="Triangle Analytics Logo" className="logo_sales" />
        </div>
        <div className="options-container">
          <h2>ניתוחי מכירות</h2>
          <button className="option-button" onClick={handleParetoClick}>ניתוח פארטו</button>
          <button className="option-button" onClick={handleVariationClick}>ניתוח לפי וריאציה</button>
          {/* <button className="option-button" onClick={handleProductClick}>ניתוח לפי מוצר ספציפי</button> */}
        </div>
    </div>
  );
};

export default SalesAnalysis;



