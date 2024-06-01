import axios from 'axios';

export const fetchAIEvents = async () => {
  try {
    const response = await axios.post('http://localhost:3001/generate-ai-events');
    return response.data;
  } catch (error) {
    console.error('Error fetching AI events:', error);
    return [];
  }
};
