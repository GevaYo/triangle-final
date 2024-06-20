// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { OpenAI } from 'openai';
// import moment from 'moment';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3001;

// app.use(cors());
// app.use(bodyParser.json());

// const openai = new OpenAI({
//   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
// });

// function extractDate(event) {
//   const dateRegex = /\b\d{4}-\d{2}-\d{2}\b/;
//   const match = event.match(dateRegex);
//   return match ? match[0] : null;
// }

// async function generateAIEvents(prompt, retries = 5) {
//   console.log('Starting OpenAI API call...');
//   try {
//     const start = Date.now();
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: prompt }],
//       max_tokens: 500,
//     });
//     const end = Date.now();
//     console.log(`OpenAI API response received in ${end - start}ms`);
//     console.log('OpenAI API response:', response);

//     const events = response.choices[0].message.content.trim().split('\n');
//     console.log('Generated events:', events);

//     const eventObjects = events.map(event => {
//       const date = extractDate(event);
//       if (!date) {
//         console.error(`Invalid date format: ${event}`);
//         return null;
//       }

//       const eventParts = event.split(' - ');
//       if (eventParts.length < 3) {
//         console.error(`Invalid event format: ${event}`);
//         return null;
//       }

//       const [index, title, description] = eventParts.map(part => part.trim());
//       const parsedDate = moment(date, 'YYYY-MM-DD', true);

//       if (!parsedDate.isValid()) {
//         console.error(`Invalid date format: ${date}`);
//         return null;
//       }

//       return {
//         summary: title,
//         description: description,
//         start: {
//           dateTime: parsedDate.toISOString(),
//           timeZone: 'Asia/Jerusalem',
//         },
//         end: {
//           dateTime: parsedDate.add(1, 'hour').toISOString(), // 1 hour later
//           timeZone: 'Asia/Jerusalem',
//         },
//       };
//     }).filter(event => event !== null);

//     return eventObjects;
//   } catch (error) {
//     if (error.response && error.response.status === 429 && retries > 0) {
//       const delay = Math.pow(2, 5 - retries) * 1000; // Exponential backoff delay
//       console.error(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
//       await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
//       return generateAIEvents(prompt, retries - 1); // Retry with one less attempt
//     } else {
//       console.error('Error generating AI events:', error.message);
//       throw new Error('Error generating AI events');
//     }
//   }
// }

// app.post('/generate-ai-events', async (req, res) => {
//   const prompt = `Generate a list of holiday events with dates in YYYY-MM-DD format and descriptions for a travel and camping business in Hebrew. Ensure each event has a date in the format YYYY-MM-DD followed by a title and description separated by " - ". For example:
//   1. 2024-10-01 - יום הקפה הבינלאומי - מבצע מיוחד על ציוד להכנת קפה בשטח.
//   2. 2024-09-27 - יום התיירות העולמי - הנחות על כל מוצרי הטיולים והקמפינג.
//   3. 2024-06-01 - חודש הקמפינג הלאומי - 20% הנחה על כל הציוד לקמפינג.
//   `;

//   console.log('Received request to generate AI events');

//   try {
//     const eventObjects = await generateAIEvents(prompt);
//     console.log('Event objects:', eventObjects);

//     res.json(eventObjects);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import moment from 'moment';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

function extractDate(event) {
  const dateRegex = /\b\d{4}-\d{2}-\d{2}\b/;
  const match = event.match(dateRegex);
  return match ? match[0] : null;
}

async function generateAIEvents(prompt, retries = 5) {
  console.log('Starting OpenAI API call...');
  try {
    const start = Date.now();
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
    });
    const end = Date.now();
    console.log(`OpenAI API response received in ${end - start}ms`);
    console.log('OpenAI API response:', response);

    const events = response.choices[0].message.content.trim().split('\n');
    console.log('Generated events:', events);

    const eventObjects = events.map(event => {
      const date = extractDate(event);
      if (!date) {
        console.error(`Invalid date format: ${event}`);
        return null;
      }

      const eventParts = event.split(' - ');
      if (eventParts.length < 3) {
        console.error(`Invalid event format: ${event}`);
        return null;
      }

      const [index, title, description] = eventParts.map(part => part.trim());
      const parsedDate = moment(date, 'YYYY-MM-DD', true);

      if (!parsedDate.isValid()) {
        console.error(`Invalid date format: ${date}`);
        return null;
      }

      return {
        id: index,
        summary: title,
        description: description,
        start: {
          dateTime: parsedDate.toISOString(),
          timeZone: 'Asia/Jerusalem',
        },
        end: {
          dateTime: parsedDate.add(1, 'hour').toISOString(),
          timeZone: 'Asia/Jerusalem',
        },
      };
    }).filter(event => event !== null);

    return eventObjects;
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      const delay = Math.pow(2, 5 - retries) * 1000;
      console.error(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return generateAIEvents(prompt, retries - 1);
    } else {
      console.error('Error generating AI events:', error.message);
      throw new Error('Error generating AI events');
    }
  }
}

app.post('/generate-ai-events', async (req, res) => {
  const { month, eventType } = req.body;
  const year = moment(month).format('YYYY');
  const monthFormatted = moment(month).format('MM');
  const prompt = `
    צור רשימה של אירועי ${eventType} עם תאריכים בפורמט YYYY-MM-DD ותיאורים לחנות המתמחה בציוד טיולים וקמפינג. כל האירועים צריכים להיות בחודש ${monthFormatted}-${year} ובישראל. לדוגמה:
    - אם מדובר על אירועים שיווקיים או מבצעיים, ניתן לכלול אירועים כמו "יום גרביים בינלאומי" או חגי ישראל כמו "חנוכה", "פורים", ו"סוכות".
    - אם מדובר על אירועים של הדרכות, יש לכלול הדרכות רלוונטיות כמו "הדרכת שימוש בציוד קמפינג", "טיול מודרך בשטח", ו"הכנת ארוחות שטח".

    ודא שכל אירוע מכיל תאריך בפורמט YYYY-MM-DD ואחריו כותרת ותיאור מופרדים ב-" - ". לדוגמה:
    1. ${year}-${monthFormatted}-01 - יום גרביים בינלאומי - מבצע מיוחד על כל גרבי הטיולים.
    2. ${year}-${monthFormatted}-15 - סדנת קמפינג למשפחות - הדרכת שימוש בציוד קמפינג למשפחות בשטח.
  `;

  console.log('Received request to generate AI events');

  try {
    const eventObjects = await generateAIEvents(prompt);
    console.log('Event objects:', eventObjects);

    res.json(eventObjects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
