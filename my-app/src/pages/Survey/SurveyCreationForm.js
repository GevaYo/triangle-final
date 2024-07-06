import React, { useState } from 'react';
import './SurveyCreationForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SurveyCreationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [{ questionText: '', answers: [''] }]
  });

  const handleBackClick = () => {
    navigate('/club-management');
  }

  const navigate = useNavigate();

  const handleInputChange = (e, index, answerIndex) => {
    const { name, value } = e.target;
    if (name === 'question') {
      const questions = [...formData.questions];
      questions[index].questionText = value;
      setFormData({ ...formData, questions });
    } else if (name === 'answer') {
      const questions = [...formData.questions];
      questions[index].answers[answerIndex] = value;
      setFormData({ ...formData, questions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { questionText: '', answers: [''] }]
    });
  };

  const addAnswer = (index) => {
    const questions = [...formData.questions];
    questions[index].answers.push('');
    setFormData({ ...formData, questions });
  };

  const removeQuestion = (index) => {
    const questions = [...formData.questions];
    questions.splice(index, 1);
    setFormData({ ...formData, questions });
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    const questions = [...formData.questions];
    questions[questionIndex].answers.splice(answerIndex, 1);
    setFormData({ ...formData, questions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const surveyResponse = await fetch('http://localhost:5000/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description
        })
      });

      if (!surveyResponse.ok) {
        throw new Error('Error creating survey');
      }

      const surveyData = await surveyResponse.json();
      const survey_id = surveyData.survey_id;


      for (let i = 0; i < formData.questions.length; i++) {
        const question = formData.questions[i];

 
        const questionResponse = await fetch(`http://localhost:5000/questions/${survey_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            questionText: question.questionText
          })
        });

        if (!questionResponse.ok) {
          throw new Error('Error adding question');
        }

        const questionData = await questionResponse.json();
        const questionId = questionData.question_id;

        for (let j = 0; j < question.answers.length; j++) {
          const answer = question.answers[j];

          const answerResponse = await fetch(`http://localhost:5000/answers/${questionId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              answerText: answer
            })
          });

          if (!answerResponse.ok) {
            throw new Error('Error adding answer');
          }
        }
      }

      
      const emailResponse = await fetch('http://localhost:5000/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          surveyId: survey_id
        })
      });

      if (!emailResponse.ok) {
        throw new Error('Error sending emails');
      }

      alert('Survey created and emails sent successfully!');
      setFormData({
        title: '',
        description: '',
        questions: [{ questionText: '', answers: [''] }]
      });

     
      // navigate(`/Survey-LandingPage/${survey_id}`);
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating survey');
    }
  };

  return (
    <div className="SurveyCreationForm">
      <div className="back-button" onClick={handleBackClick}>
        Back
      </div>
      <div className="survey_container">
        <h2>יצירת סקר</h2>
        <form onSubmit={handleSubmit}>
          <div className='form_row'></div>
            <div className="form-groupSCF">
              <label htmlFor="title" className="required">כותרת הסקר</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-groupSCF">
              <label htmlFor="description" >תיאור הסקר</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            {formData.questions.map((q, index) => (
              <div key={index} className="form-groupSCF">
                <label className="required">שאלה {index + 1}</label>
                <div className="question-containerSCF">
                  <input
                    type="text"
                    name="question"
                    value={q.questionText}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                  />
                  <button type="button" onClick={() => removeQuestion(index)}>
                    X
                  </button>
                </div>
                <label className='required'> תשובות: </label>
                {q.answers.map((answer, answerIndex) => (
                  <div key={answerIndex} className="answer-containerSCF">
                    <input
                      type="text"
                      name="answer"
                      value={answer}
                      onChange={(e) => handleInputChange(e, index, answerIndex)}
                      required
                    />
                    <button type="button" onClick={() => removeAnswer(index, answerIndex)}>
                      X
                    </button>
                  </div>
                ))}
                <button type="button" className='submit-button' onClick={() => addAnswer(index)}>הוסף תשובה</button>
                <button type="button" className='submit-button' onClick={addQuestion}>הוסף שאלה</button>
                <button type="submit" className='submit-button'>סיים ושלח</button>
              </div>
            ))}
        </form>
      </div>
    </div>
  );
};

export default SurveyCreationForm;