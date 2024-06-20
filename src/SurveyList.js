import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/SurveyList.css'; // Ensure the CSS file is correctly imported

const SurveyList = ({ onSurveyClick }) => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get('http://localhost:3001/surveys');
      setSurveys(response.data.surveys);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    }
  };

  return (
    <div className="SurveyList">
      <h1>סקרים</h1>
      <ul>
        {surveys.map((survey) => (
          <li key={survey.survey_id} onClick={() => onSurveyClick(survey.survey_id)} className="survey-item">
            <span className="survey-title">{survey.title}</span>
            <span className="survey-date">{new Date(survey.start_date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyList;
