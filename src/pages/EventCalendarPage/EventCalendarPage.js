

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

//         for (const event of aiEvents) {
//           await gapi.client.calendar.events.insert({
//             calendarId: 'primary',
//             resource: event,
//           });
//         }

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
//           }).catch(error => {
//             console.error('Error signing in', error);
//           });
//         }
//       });
//     };

//     const fetchEvents = async () => {
//       try {
//         const aiEvents = await generateEvents();
//         console.log('AI Events:', aiEvents);

//         for (const event of aiEvents) {
//           const response = await gapi.client.calendar.events.insert({
//             calendarId: 'primary',
//             resource: event,
//           });
//           console.log('Event inserted:', response);
//         }

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
//           console.log('Fetched Events:', events);
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EventCalendarPage.css';
import { gapi } from 'gapi-script';
import { initClient } from '../../googleApi.js';
import { generateEvents } from '../../openaiModel.js';

const localizer = momentLocalizer(moment);

const EventCalendarPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const handleBackClick = () => {
    navigate('/club-management');
  };

  useEffect(() => {
    const handleClientLoad = () => {
      initClient(() => {
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          fetchEvents();
        } else {
          gapi.auth2.getAuthInstance().signIn().then(() => {
            fetchEvents();
          }).catch(error => {
            console.error('Error signing in', error);
          });
        }
      });
    };

    const fetchEvents = async () => {
      try {
        const aiEvents = await generateEvents();
        console.log('AI Events:', aiEvents);

        setEvents(aiEvents);
      } catch (error) {
        console.error('Error generating AI events:', error);
      }

      gapi.client.calendar.events
        .list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: 'startTime',
        })
        .then((response) => {
          const events = response.result.items.map((event) => ({
            id: event.id,
            title: event.summary,
            start: new Date(event.start.dateTime || event.start.date),
            end: new Date(event.end.dateTime || event.end.date),
          }));
          setEvents((prevEvents) => [...prevEvents, ...events]);
          console.log('Fetched Events:', events);
        })
        .catch((error) => {
          console.error('Error fetching events:', error);
        });
    };

    handleClientLoad();
  }, []);

  return (
    <div className="event-calendar-container">
      <div className="back-button" onClick={handleBackClick}>
        &lt; Back
      </div>
      <h1 className="title">ניהול יומן אירועים</h1>
      <div className="event-list">
        <h2>יומן אירועים</h2>
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

