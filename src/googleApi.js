// src/googleApi.js
import { gapi } from 'gapi-script';

export const initClient = (callback) => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: 'AIzaSyDZbYLzSf4yq-t5MN1MU0jlSSGi9jD9N0c',
      clientId: '493216426178-o4pvbm00oetmg4hr6io59ntbkkv80pcl.apps.googleusercontent.com',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
    }).then(() => {
      if (callback) {
        callback();
      }
    });
  });
};
