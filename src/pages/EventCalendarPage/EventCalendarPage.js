import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EventCalendarPage.css';
import { gapi } from 'gapi-script';
import { initClient } from '../../googleApi';
import { fetchAIEvents } from '../../aiEvents';
import { generateMockEvents } from '../../openaiModel';

const localizer = momentLocalizer(moment);

const EventCalendarPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const handleBackClick = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleClientLoad = () => {
      initClient(() => {
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          fetchEvents();
        } else {
          gapi.auth2.getAuthInstance().signIn().then(() => {
            fetchEvents();
          });
        }
      });
    };

    const fetchEvents = async () => {
      try {
        const response = await gapi.client.calendar.events.list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: 'startTime',
        });
        const googleEvents = response.result.items.map((event) => ({
          id: event.id,
          title: event.summary,
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
        }));

        const aiEvents = await fetchAIEvents();
        const mockEvents = generateMockEvents();

        setEvents([...googleEvents, ...aiEvents, ...mockEvents]);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    handleClientLoad();
  }, []);

  return (
    <div className="event-calendar-container">
      <div className="back-button" onClick={handleBackClick}>
        &lt; Back
      </div>
      <h1 className="title">Event Calendar Management</h1>
      <div className="event-list">
        <h2>Event Calendar</h2>
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            className="rbc-calendar"
          />
        </div>
      </div>
    </div>
  );
};

export default EventCalendarPage;
