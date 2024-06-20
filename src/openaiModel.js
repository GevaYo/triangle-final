
// import axios from 'axios';

// export async function generateEvents() {
//   try {
//     const response = await axios.post('/generate-ai-events');
//     console.log('Generated AI Events:', response.data);
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.status === 429) {
//       console.error('Rate limit exceeded:', error.response.data);
//       alert('Rate limit exceeded. Please try again later.');
//     } else {
//       console.error('Error generating AI events:', error);
//     }
//     return [];
//   }
// }

// async function generateEvents() {
//   try {
//     const response = await fetch('http://localhost:3001/generate-ai-events', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error generating events:", error);
//     return [];
//   }
// }

// export { generateEvents };

async function generateEvents() {
  try {
    const response = await fetch('http://localhost:3001/generate-ai-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    
    // Ensure the date format is correct
    const events = data.map(event => ({
      ...event,
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime),
    }));

    return events;
  } catch (error) {
    console.error("Error generating events:", error);
    return [];
  }
}

export { generateEvents };



