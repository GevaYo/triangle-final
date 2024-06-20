

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import './EventCalendarPage.css';
// import { gapi } from 'gapi-script';
// import { initClient } from '../../googleApi.js';
// import { generateEvents } from '../../openaiModel.js';

// const localizer = momentLocalizer(moment);

// const EventCalendarPage = () => {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState([]);

//   const handleBackClick = () => {
//     navigate('/club-management');
//   };

//   useEffect(() => {
//     const handleClientLoad = () => {
//       initClient(() => {
//         if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
//           fetchEvents();
//         } else {
//           gapi.auth2.getAuthInstance().signIn().then(() => {
//             fetchEvents();
//           });
//         }
//       });
//     };

//     const fetchEvents = async () => {
//       try {
//         const aiEvents = await generateEvents();
//         setEvents(aiEvents);
//       } catch (error) {
//         console.error('Error generating AI events:', error);
//       }

//       gapi.client.calendar.events
//         .list({
//           calendarId: 'primary',
//           timeMin: new Date().toISOString(),
//           showDeleted: false,
//           singleEvents: true,
//           maxResults: 10,
//           orderBy: 'startTime',
//         })
//         .then((response) => {
//           const events = response.result.items.map((event) => ({
//             id: event.id,
//             title: event.summary,
//             start: new Date(event.start.dateTime || event.start.date),
//             end: new Date(event.end.dateTime || event.end.date),
//           }));
//           setEvents((prevEvents) => [...prevEvents, ...events]);
//         })
//         .catch((error) => {
//           console.error('Error fetching events:', error);
//         });
//     };

//     handleClientLoad();
//   }, []);

//   return (
//     <div className="event-calendar-container">
//       <div className="back-button" onClick={handleBackClick}>
//         &lt; Back
//       </div>
//       <h1 className="title">ניהול יומן אירועים</h1>
//       <div className="event-list">
//         <h2>יומן אירועים</h2>
//         <div className="calendar-container">
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             className="rbc-calendar"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCalendarPage;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import './EventCalendarPage.css';
// import { gapi } from 'gapi-script';
// import { initClient } from '../../googleApi.js';
// import { generateEvents } from '../../openaiModel.js';

// const localizer = momentLocalizer(moment);

// const EventCalendarPage = () => {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState([]);

//   const handleBackClick = () => {
//     navigate('/club-management');
//   };

//   useEffect(() => {
//     const handleClientLoad = () => {
//       initClient(() => {
//         if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
//           fetchEvents();
//         } else {
//           gapi.auth2.getAuthInstance().signIn().then(() => {
//             fetchEvents();
//           });
//         }
//       });
//     };

//     const fetchEvents = async () => {
//       try {
//         const aiEvents = await generateEvents();
//         console.log('AI Events:', aiEvents);
//         setEvents(aiEvents);
//       } catch (error) {
//         console.error('Error generating AI events:', error);
//       }

//       gapi.client.calendar.events
//         .list({
//           calendarId: 'primary',
//           timeMin: new Date().toISOString(),
//           showDeleted: false,
//           singleEvents: true,
//           maxResults: 10,
//           orderBy: 'startTime',
//         })
//         .then((response) => {
//           const events = response.result.items.map((event) => {
//             const start = new Date(event.start.dateTime || event.start.date);
//             const end = new Date(event.end.dateTime || event.end.date);
//             console.log('Fetched Event Start:', start, 'End:', end);
//             return {
//               id: event.id,
//               title: event.summary,
//               start: start,
//               end: end,
//             };
//           });
//           setEvents((prevEvents) => [...prevEvents, ...events]);
//         })
//         .catch((error) => {
//           console.error('Error fetching events:', error);
//         });
//     };

//     handleClientLoad();
//   }, []);

//   return (
//     <div className="event-calendar-container">
//       <div className="back-button" onClick={handleBackClick}>
//         &lt; Back
//       </div>
//       <h1 className="title">ניהול יומן אירועים</h1>
//       <div className="event-list">
//         <h2>יומן אירועים</h2>
//         <div className="calendar-container">
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             className="rbc-calendar"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCalendarPage;


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
      <button onClick={() => setIsModalOpen(true)}>Create Events</button>
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
                <input type="date" value={moment(event.start.dateTime).format('YYYY-MM-DD')} onChange={(e) => {
                  const updatedEvents = [...generatedEvents];
                  const newDate = moment(e.target.value, 'YYYY-MM-DD').toISOString();
                  updatedEvents[index].start.dateTime = newDate;
                  updatedEvents[index].end.dateTime = moment(newDate).add(1, 'hour').toISOString();
                  setGeneratedEvents(updatedEvents);
                }} />
                <input type="text" value={event.title} onChange={(e) => {
                  const updatedEvents = [...generatedEvents];
                  updatedEvents[index].title = e.target.value;
                  setGeneratedEvents(updatedEvents);
                }} />
                <input type="text" value={event.description} onChange={(e) => {
                  const updatedEvents = [...generatedEvents];
                  updatedEvents[index].description = e.target.value;
                  setGeneratedEvents(updatedEvents);
                }} />
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
