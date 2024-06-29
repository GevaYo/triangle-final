import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import '../css/SurveyLandingPage.css';

const SurveyLandingPage = () => {
  const { id } = useParams();
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      fetchSurveyData(id);
    }
  }, [id]);

  const fetchSurveyData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/survey/${id}`);
      setSurveyQuestions(response.data.survey_questions);
      initializeResponses(response.data.survey_questions);
    } catch (error) {
      console.error('Error fetching survey data:', error);
    }
  };

  const initializeResponses = (questions) => {
    const initialResponses = questions.map((question) => ({
      q_id: question.q_id,
      answer_id: null
    }));
    setResponses(initialResponses);
    setErrors(new Array(questions.length).fill(false));
  };

  const handleAnswerChange = (questionIndex, answerId) => {
    const updatedResponses = [...responses];
    updatedResponses[questionIndex].answer_id = answerId;
    setResponses(updatedResponses);

    const updatedErrors = [...errors];
    updatedErrors[questionIndex] = false;
    setErrors(updatedErrors);
  };

  const validateResponses = () => {
    const validationErrors = responses.map(response => response.answer_id === null);
    setErrors(validationErrors); // Update errors immediately
    return !validationErrors.includes(true);
  };

  const submitSurvey = async () => {
    const hasEmptyAnswers = responses.some(response => response.answer_id === null);

    if (hasEmptyAnswers) {
      const updatedErrors = responses.map(response => response.answer_id === null);
      setErrors(updatedErrors);
      alert('באחת או יותר מהשאלות חסרות תשובות. אנא בדוק אם כל השאלות מולאו כהלכה.');
      return;
    }
    
    try {
      const submittedResponses = responses.map(({ q_id, answer_id }) => ({
        q_id,
        a_id: answer_id,
      }));

      await axios.post('http://localhost:3001/responses', {
        survey_id: id,
        responses: submittedResponses,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('הגשת הסקר נכשלה:', error);
    }
  };

  return (
    <div className="SurveyLandingPage">
      <h1>שאלון:</h1>
      {isSubmitted ? (
        <p>תודה על השתתפותך בסקר!</p>

      ) : surveyQuestions.length > 0 ? (
        <form>
          {surveyQuestions.map((question, index) => (
            <div key={question.q_id}>
              <h2 className={`question-containerSLP ${errors[index] ? 'error' : ''}`}>
                {question.questionText} <span className="required-asterisk">*</span>
              </h2>
              {errors[index] && <span className="error-message">השאלה הזו היא חובה</span>}
              {question.answers.map((answer) => (
                <div key={answer.a_id} className='answer-option'>
                  <label>
                    <input className='answer-option-input'
                      type="radio"
                      name={`question_${index}`}
                      value={answer.a_id}
                      onChange={() => handleAnswerChange(index, answer.a_id)}
                      checked={responses[index].answer_id === answer.a_id}
                    />
                    {answer.answerText}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button type="button" onClick={submitSurvey}>הגש סקר</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
};

export default SurveyLandingPage;
