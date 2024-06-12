

// import axios from 'axios';

// export async function generateEvents() {
//   try {
//     const response = await axios.post('/generate-ai-events');
//     return response.data;
//   } catch (error) {
//     console.error('Error generating AI events:', error);
//     return [];
//   }
// }

// import axios from 'axios';

// export async function generateEvents() {
//   try {
//     const response = await axios.post('/generate-ai-events');
//     console.log('Generated AI Events:', response.data); // Add this line to log the response
//     return response.data;
//   } catch (error) {
//     console.error('Error generating AI events:', error);
//     return [];
//   }
// }

import axios from 'axios';

export async function generateEvents() {
  try {
    const response = await axios.post('/generate-ai-events');
    console.log('Generated AI Events:', response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error('Rate limit exceeded:', error.response.data);
      alert('Rate limit exceeded. Please try again later.');
    } else {
      console.error('Error generating AI events:', error);
    }
    return [];
  }
}


