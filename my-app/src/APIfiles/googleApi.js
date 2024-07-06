import { gapi } from 'gapi-script';

export const initClient = (callback) => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      // apiKey: 'AIzaSyDZbYLzSf4yq-t5MN1MU0jlSSGi9jD9N0c',
      apiKey: 'sk-proj-KdtckerHGq81gndzIom1T3BlbkFJTmYsjtf3vYtzcZYd8pTD',
      clientId: '493216426178-o4pvbm00oetmg4hr6io59ntbkkv80pcl.apps.googleusercontent.com', 
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar', 
    }).then(() => {
      console.log('Google API client initialized');
      if (callback) {
        callback();
      }
    }).catch(error => {
      console.error('Error initializing Google API client:', error);
    });
  });
};

export const addEventToCalendar = async (event) => {
  try {
    const response = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: {
        summary: event.summary,
        description: event.description,
        start: {
          dateTime: event.start.toISOString(),
          timeZone: 'Asia/Jerusalem',
        },
        end: {
          dateTime: event.end.toISOString(),
          timeZone: 'Asia/Jerusalem',
        },
      },
    });
    console.log('Event added to Google Calendar:', response);
  } catch (error) {
    console.error('Error adding event to Google Calendar:', error);
  }
};