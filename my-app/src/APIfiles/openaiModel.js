async function generateEvents() {
  try {
    const response = await fetch('http://localhost:5000/generate-ai-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();


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

