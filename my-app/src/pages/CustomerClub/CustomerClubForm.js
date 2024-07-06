import React, { useState, useEffect } from 'react';
import countryList from 'react-select-country-list';
import { useNavigate } from 'react-router-dom';
import './CustomerClubForm.css';

const CustomerClubForm = () => {
  
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/club-management');
  };
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    country: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const countries = countryList().getData().filter(country => country.label !== 'Palestine, State of');

  useEffect(() => {
    setFormData({ ...formData, country: '' });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert('בבקשה הכנס כתובת אימייל חוקית');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/submit_customer_club', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('נתונים נשמרו בהצלחה!');
      } else {
        alert('בעיית שמירת נתונים');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving data');
    }
  };

  useEffect(() => {
    const formLabels = document.querySelectorAll('label[for]');
    formLabels.forEach(label => {
      const inputId = label.getAttribute('for');
      const inputElement = document.getElementById(inputId);
      if (inputElement && inputElement.hasAttribute('required')) {
        label.classList.add('required');
      }
    });
  }, []);

  return (
    <div className='FullPage_customer'>
      <div className="back-button" onClick={handleBackClick}>
        Back
      </div>
      <div className="CustomerClubForm">
        <h2>מועדון לקוחות</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="required">שם פרטי</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="required">שם משפחה</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="required">כתובת אימייל</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="required">מספר טלפון</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="\d*"
              maxLength="15"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">תאריך לידה</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">מדינה/אזור</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">בחר מדינה</option>
              {countries.map((country, index) => (
                <option key={index} value={country.label}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="street">רחוב</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">עיר</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">איזור</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">מיקוד</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit">שמור</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerClubForm;

