// import axios from 'axios';

// export const fetchAIEvents = async () => {
//   try {
//     const response = await axios.post('http://localhost:3001/generate-ai-events');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching AI events:', error);
//     return [];
//   }
// };


import axios from 'axios';

export const generateEvents = async (input) => {
  try {
    const response = await axios.post('http://localhost:3001/generate-ai-events', input);
    const data = response.data;
    console.log('Fetched data from backend:', data);

    // Ensure the date format is correct
    const events = data.map(event => ({
      id: event.id,
      title: event.summary,
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime),
      description: event.description,
    }));

    console.log('Formatted Events:', events);
    return events;
  } catch (error) {
    console.error('Error generating events:', error);
    return [];
  }
};




