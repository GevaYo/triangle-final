import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EventCalendarPage.css';
import { generateEvents } from '../../APIfiles/generateEvents.js';
import EventGenerationModal from '../../APIfiles/EventGenerationModal.js';

const localizer = momentLocalizer(moment);

const EventCalendarPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [generatedEvents, setGeneratedEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate('/club-management');
  };

  const handleCreateEvents = async (input) => {
    const aiEvents = await generateEvents(input);
    setGeneratedEvents(aiEvents);
  };

  const handleAddEvents = () => {
    const selectedEvents = generatedEvents.filter(event => event.selected);
    setEvents((prevEvents) => [...prevEvents, ...selectedEvents]);
    setGeneratedEvents([]);
    setIsModalOpen(false);
  };

  return (
    <div className="event-calendar-container">
      <div className="back-button" onClick={handleBackClick}>
        &lt; Back
      </div>
      <h1 className="title">ניהול יומן אירועים</h1>
      {/* <button onClick={() => setIsModalOpen(true)}>Create Events</button> */}
      <button className="button_events" onClick={() => setIsModalOpen(true)}>Create Events</button>
      <EventGenerationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleCreateEvents}
      />
      {generatedEvents.length > 0 && (
        <div>
          <h2>Generated Events</h2>
          <ul>
            {generatedEvents.map((event, index) => (
              <li key={index}>
                <input type="checkbox" checked={event.selected || false} onChange={() => {
                  const updatedEvents = [...generatedEvents];
                  updatedEvents[index].selected = !updatedEvents[index].selected;
                  setGeneratedEvents(updatedEvents);
                }} />
                <input
                  type="date"
                  value={moment(event.start).format('YYYY-MM-DD')}
                  onChange={(e) => {
                    const updatedEvents = [...generatedEvents];
                    const newDate = moment(e.target.value, 'YYYY-MM-DD').toISOString();
                    updatedEvents[index].start = newDate;
                    updatedEvents[index].end = moment(newDate).add(1, 'hour').toISOString();
                    setGeneratedEvents(updatedEvents);
                  }}
                />
                <input
                  type="text"
                  value={event.title}
                  onChange={(e) => {
                    const updatedEvents = [...generatedEvents];
                    updatedEvents[index].title = e.target.value;
                    setGeneratedEvents(updatedEvents);
                  }}
                />
                <input
                  type="text"
                  value={event.description}
                  onChange={(e) => {
                    const updatedEvents = [...generatedEvents];
                    updatedEvents[index].description = e.target.value;
                    setGeneratedEvents(updatedEvents);
                  }}
                />
              </li>
            ))}
          </ul>
          <button onClick={handleAddEvents}>Add Selected Events</button>
        </div>
      )}
      <div className="event-list">
        <h2>יומן אירועים</h2>
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            titleAccessor="title"
            className="rbc-calendar"
            onSelectEvent={(event) => {
              alert(`Event: ${event.title}\nDescription: ${event.description}`);
            }}
            selectable
          />
        </div>
      </div>
    </div>
  );
};

export default EventCalendarPage;
