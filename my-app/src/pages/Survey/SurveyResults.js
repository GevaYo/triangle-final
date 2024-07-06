import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './SurveyResults.css';

const SurveyResults = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [surveyResults, setSurveyResults] = useState({});
  const [responseCount, setResponseCount] = useState(0);

  useEffect(() => {
    fetchSurveyResults(surveyId);
  }, [surveyId]);

  const handleBackClick = () => {
    navigate('/SurveyList');
  };

  const fetchSurveyResults = async (surveyId) => {
    try {
      const response = await axios.get(`http://localhost:5000/survey/${surveyId}/results`);
      const results = response.data.survey_results;

      const uniqueResponders = new Set();
      Object.values(results).forEach(question => {
        question.answers.forEach(answer => {
          uniqueResponders.add(answer.user_id);
        });
      });

      setSurveyResults(results);
      setResponseCount(uniqueResponders.size);
    } catch (error) {
      console.error('Error fetching survey results:', error);
    }
  };

  return (
    <div className="survey-results">
      {/* <button className="survey-list-button" onClick={() => navigate('/SurveyList')}>Back  </button> */}
      <div className="back-button" onClick={handleBackClick}>
        Back
      </div>
      <h1>תוצאות הסקר</h1>
      <p>סה"כ תגובות: {responseCount}</p>
      {Object.entries(surveyResults).map(([questionId, question]) => (
        <div key={questionId} className="question-section">
          <h2>{question.question_text}</h2>
          {question.answers.map((answer) => (
            <div key={answer.answer_id} className="answer-section">
              <span>{answer.answer_text} - {answer.response_count} תגובות</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SurveyResults;

