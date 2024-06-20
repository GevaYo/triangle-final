import React, { useState } from 'react';

const EventGenerationModal = ({ isOpen, onClose, onGenerate }) => {
  const [month, setMonth] = useState('');
  const [eventType, setEventType] = useState('');

  const handleGenerate = () => {
    onGenerate({ month, eventType });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Generate Events</h2>
        <div>
          <label>Month:</label>
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
        </div>
        <div>
          <label>Event Type:</label>
          <input type="text" value={eventType} onChange={(e) => setEventType(e.target.value)} />
        </div>
        <button onClick={handleGenerate}>Generate</button>
      </div>
    </div>
  );
};

export default EventGenerationModal;
