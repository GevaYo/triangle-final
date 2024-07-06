import axios from 'axios';

export const generateEvents = async (input) => {
  try {
    const response = await axios.post('http://localhost:5000/event/generate-ai-events', input);
    const data = response.data;
    console.log('Fetched data from backend:', data);

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


