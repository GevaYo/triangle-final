// // import express from 'express';
// // import bodyParser from 'body-parser';
// // import cors from 'cors';
// // import dotenv from 'dotenv';
// // import { OpenAI } from 'openai';
// // import moment from 'moment';

// // dotenv.config();

// // const app = express();
// // const port = process.env.PORT || 3001;

// // app.use(cors());
// // app.use(bodyParser.json());

// // const openai = new OpenAI({
// //   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
// // });

// // function extractDate(event) {
// //   const dateRegex = /\b\d{4}-\d{2}-\d{2}\b/;
// //   const match = event.match(dateRegex);
// //   return match ? match[0] : null;
// // }

// // async function generateAIEvents(prompt, retries = 5) {
// //   console.log('Starting OpenAI API call...');
// //   try {
// //     const start = Date.now();
// //     const response = await openai.chat.completions.create({
// //       model: 'gpt-3.5-turbo',
// //       messages: [{ role: 'user', content: prompt }],
// //       max_tokens: 500,
// //     });
// //     const end = Date.now();
// //     console.log(`OpenAI API response received in ${end - start}ms`);
// //     console.log('OpenAI API response:', response);

// //     const events = response.choices[0].message.content.trim().split('\n');
// //     console.log('Generated events:', events);

// //     const eventObjects = events.map(event => {
// //       const date = extractDate(event);
// //       if (!date) {
// //         console.error(`Invalid date format: ${event}`);
// //         return null;
// //       }

// //       const eventParts = event.split(' - ');
// //       if (eventParts.length < 3) {
// //         console.error(`Invalid event format: ${event}`);
// //         return null;
// //       }

// //       const [index, title, description] = eventParts.map(part => part.trim());
// //       const parsedDate = moment(date, 'YYYY-MM-DD', true);

// //       if (!parsedDate.isValid()) {
// //         console.error(`Invalid date format: ${date}`);
// //         return null;
// //       }

// //       return {
// //         summary: title,
// //         description: description,
// //         start: {
// //           dateTime: parsedDate.toISOString(),
// //           timeZone: 'Asia/Jerusalem',
// //         },
// //         end: {
// //           dateTime: parsedDate.add(1, 'hour').toISOString(), // 1 hour later
// //           timeZone: 'Asia/Jerusalem',
// //         },
// //       };
// //     }).filter(event => event !== null);

// //     return eventObjects;
// //   } catch (error) {
// //     if (error.response && error.response.status === 429 && retries > 0) {
// //       const delay = Math.pow(2, 5 - retries) * 1000; // Exponential backoff delay
// //       console.error(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
// //       await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
// //       return generateAIEvents(prompt, retries - 1); // Retry with one less attempt
// //     } else {
// //       console.error('Error generating AI events:', error.message);
// //       throw new Error('Error generating AI events');
// //     }
// //   }
// // }

// // app.post('/generate-ai-events', async (req, res) => {
// //   const prompt = `Generate a list of holiday events with dates in YYYY-MM-DD format and descriptions for a travel and camping business in Hebrew. Ensure each event has a date in the format YYYY-MM-DD followed by a title and description separated by " - ". For example:
// //   1. 2024-10-01 - יום הקפה הבינלאומי - מבצע מיוחד על ציוד להכנת קפה בשטח.
// //   2. 2024-09-27 - יום התיירות העולמי - הנחות על כל מוצרי הטיולים והקמפינג.
// //   3. 2024-06-01 - חודש הקמפינג הלאומי - 20% הנחה על כל הציוד לקמפינג.
// //   `;

// //   console.log('Received request to generate AI events');

// //   try {
// //     const eventObjects = await generateAIEvents(prompt);
// //     console.log('Event objects:', eventObjects);

// //     res.json(eventObjects);
// //   } catch (error) {
// //     res.status(500).send(error.message);
// //   }
// // });

// // app.listen(port, () => {
// //   console.log(`Server running on port ${port}`);
// // });

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
//       max_tokens: 300,
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
//         id: index,
//         summary: title,
//         description: description,
//         start: {
//           dateTime: parsedDate.toISOString(),
//           timeZone: 'Asia/Jerusalem',
//         },
//         end: {
//           dateTime: parsedDate.add(1, 'hour').toISOString(),
//           timeZone: 'Asia/Jerusalem',
//         },
//       };
//     }).filter(event => event !== null);

//     return eventObjects;
//   } catch (error) {
//     if (error.response && error.response.status === 429 && retries > 0) {
//       const delay = Math.pow(2, 5 - retries) * 1000;
//       console.error(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
//       await new Promise(resolve => setTimeout(resolve, delay));
//       return generateAIEvents(prompt, retries - 1);
//     } else {
//       console.error('Error generating AI events:', error.message);
//       throw new Error('Error generating AI events');
//     }
//   }
// }

// app.post('/generate-ai-events', async (req, res) => {
//   const { month, eventType } = req.body;
//   const year = moment(month).format('YYYY');
//   const monthFormatted = moment(month).format('MM');
//   const prompt = `
//     צור רשימה של אירועי ${eventType} עם תאריכים בפורמט YYYY-MM-DD ותיאורים לחנות המתמחה בציוד טיולים וקמפינג. כל האירועים צריכים להיות בחודש ${monthFormatted}-${year} ובישראל. לדוגמה:
//     - אם מדובר על אירועים שיווקיים או מבצעיים, ניתן לכלול אירועים כמו "יום גרביים בינלאומי" או חגי ישראל כמו "חנוכה", "פורים", ו"סוכות".
//     - אם מדובר על אירועים של הדרכות, יש לכלול הדרכות רלוונטיות כמו "הדרכת שימוש בציוד קמפינג", "טיול מודרך בשטח", ו"הכנת ארוחות שטח".

//     ודא שכל אירוע מכיל תאריך בפורמט YYYY-MM-DD ואחריו כותרת ותיאור מופרדים ב-" - ". לדוגמה:
//     1. ${year}-${monthFormatted}-01 - יום גרביים בינלאומי - מבצע מיוחד על כל גרבי הטיולים.
//     2. ${year}-${monthFormatted}-15 - סדנת קמפינג למשפחות - הדרכת שימוש בציוד קמפינג למשפחות בשטח.
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





// New Michal 

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import moment from 'moment';
import axios from 'axios';
import cheerio from 'cheerio';

dotenv.config();



const app = express();
const port = process.env.PORT || 3001;


app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());


const openai = new OpenAI({ apiKey: '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' });

const urls = [
  'https://www.daysoftheyear.co.il/p/blog-page_17.html', // January
  'https://www.daysoftheyear.co.il/p/blog-page_20.html', // February
  'https://www.daysoftheyear.co.il/p/blog-page_9.html',  // March
  'https://www.daysoftheyear.co.il/p/blog-page_16.html', // April
  'https://www.daysoftheyear.co.il/p/blog-page_27.html', // May
  'https://www.daysoftheyear.co.il/p/blog-page_27.html', // June
  'https://www.daysoftheyear.co.il/p/blog-page_92.html', // July
  'https://www.daysoftheyear.co.il/p/blog-page_47.html', // August
  'https://www.daysoftheyear.co.il/p/blog-page_54.html', // September
  'https://www.daysoftheyear.co.il/p/blog-page_39.html', // October
  'https://www.daysoftheyear.co.il/p/blog-page_36.html', // November
  'https://www.daysoftheyear.co.il/p/blog-page_87.html'  // December
];

async function fetchEvents(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const events = [];

    $('li').each((index, element) => {
      const dateText = $(element).find('strong').text().trim();
      const titleText = $(element).find('span').text().trim();

      if (dateText && titleText) {
        events.push({ date: dateText, title: titleText });
      }
    });

    return events;
  } catch (error) {
    console.error(`Error fetching events from ${url}:`, error);
    return [];
  }
}

function extractDate(event) {
  const dateRegex = /\b\d{4}-\d{2}-\d{2}\b/;
  const match = event.match(dateRegex);
  return match ? match[0] : null;
}

async function generateAIEvents(month, eventType) {
  const monthIndex = moment(month).month(); 
  const url = urls[monthIndex];
  const events = await fetchEvents(url);

  const prompt = `
    Generate a list of ${eventType} events for a store specializing in camping and hiking equipment. All events should be in the month of ${month} and take place in Israel. Use the following real events and dates as your source:
    ${events.map(event => `${event.date} - ${event.title}`).join('\n')}
    Ensure each event includes a date in YYYY-MM-DD format followed by a title and description separated by " - ". For example:
    1. ${events[0].date} - ${events[0].title} - Special promotion on all hiking socks.
    2. ${events[1].date} - ${events[1].title} - Tutorial on using camping equipment for families outdoors.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0,
    });

        const generatedEvents = response.choices[0].message.content.trim().split('\n');
    const eventObjects = generatedEvents.map(event => {
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
    console.error('Error generating AI events:', error.message);
    throw new Error('Error generating AI events');
  }
}

app.post('/generate-ai-events', async (req, res) => {
  const { month, eventType } = req.body;
  console.log('Received request to generate AI events');

  try {
    const eventObjects = await generateAIEvents(month, eventType);
    console.log('Event objects:', eventObjects);
    res.json(eventObjects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});