const { createEvent } = require('./googleCalendar');
const { generateEvents } = require('./openaiModel');

async function main() {
  const events = await generateEvents();
  for (const event of events) {
    await createEvent(event);
  }
}

main().catch(console.error);
