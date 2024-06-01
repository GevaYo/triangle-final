// openaiModel.js

// Function to generate mock events
const generateMockEvents = () => {
  const mockEvents = [
    {
      id: '1',
      title: 'Mock Event 1',
      start: new Date(2024, 5, 1, 10, 0), // June 1, 2024, 10:00 AM
      end: new Date(2024, 5, 1, 12, 0), // June 1, 2024, 12:00 PM
    },
    {
      id: '2',
      title: 'Mock Event 2',
      start: new Date(2024, 5, 2, 14, 0), // June 2, 2024, 2:00 PM
      end: new Date(2024, 5, 2, 16, 0), // June 2, 2024, 4:00 PM
    },
    // Add more mock events as needed
  ];

  return mockEvents;
};

module.exports = { generateMockEvents };
