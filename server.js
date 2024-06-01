const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { generateEventSuggestions } = require('./openaiModel');

const app = express();
const port = 3002; // Change to a different port number

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// API endpoint
app.post('/generate-ai-events', async (req, res) => {
  try {
    const aiEvents = await generateEventSuggestions();
    res.json(aiEvents);
  } catch (error) {
    console.error('Error generating AI events:', error);
    res.status(500).json({ error: 'Failed to generate AI events' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
