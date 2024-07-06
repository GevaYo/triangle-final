from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import os

def add_event_to_calendar(event):
    try:
        creds = Credentials.from_authorized_user_file('token.json', ['https://www.googleapis.com/auth/calendar'])
        service = build('calendar', 'v3', credentials=creds)
        
        event = service.events().insert(calendarId='primary', body=event).execute()
        print(f"Event created: {event.get('htmlLink')}")
    except Exception as e:
        print(f"Error adding event to Google Calendar: {e}")

# Example of adding an event
if __name__ == '__main__':
    event = {
        'summary': 'Google I/O 2024',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2024-07-04T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
        },
        'end': {
            'dateTime': '2024-07-04T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
        },
        'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'},
        ],
        'reminders': {
            'useDefault': False,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
        },
    }
    add_event_to_calendar(event)
