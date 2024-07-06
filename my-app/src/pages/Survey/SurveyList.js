import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SurveyList.css';

const SurveyList = ({ onSurveyClick }) => {
  const [surveys, setSurveys] = useState([]);

  const
  handleSurveyClick = (surveyId) => {
    navigate(`/survey/${surveyId}/results`);
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/club-management');
  };
  

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get('http://localhost:5000/surveys');
      setSurveys(response.data.surveys);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    }

  };

  return (

    
    <div className="FullPage_survey_list">
      <div className="back-button" onClick={handleBackClick}>
        Back
      </div>
      <h2>סקרים</h2>
      <ul>
        {surveys.map((survey) => (
          <li key={survey.survey_id} onClick={() => handleSurveyClick(survey.survey_id)} className="survey-item">
            <span className="survey-title">{survey.title}</span>
            <span className="survey-date">{new Date(survey.start_date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyList;

