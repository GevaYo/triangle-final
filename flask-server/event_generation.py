from flask import Blueprint, request, jsonify
import openai
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import os

event_bp = Blueprint('event', __name__)

OPENAI_API_KEY = ''
openai.api_key = os.getenv('OPENAI_API_KEY')
if not OPENAI_API_KEY:
    raise ValueError("OpenAI API key not found in environment variables.")
openai.api_key = OPENAI_API_KEY

urls = [
    'https://www.daysoftheyear.co.il/p/blog-page_17.html', # January
    'https://www.daysoftheyear.co.il/p/blog-page_20.html', # February
    'https://www.daysoftheyear.co.il/p/blog-page_9.html',  # March
    'https://www.daysoftheyear.co.il/p/blog-page_16.html', # April
    'https://www.daysoftheyear.co.il/p/blog-page_86.html', # May
    'https://www.daysoftheyear.co.il/p/blog-page_27.html', # June
    'https://www.daysoftheyear.co.il/p/blog-page_92.html', # July
    'https://www.daysoftheyear.co.il/p/blog-page_47.html', # August
    'https://www.daysoftheyear.co.il/p/blog-page_54.html', # September
    'https://www.daysoftheyear.co.il/p/blog-page_39.html', # October
    'https://www.daysoftheyear.co.il/p/blog-page_36.html', # November
    'https://www.daysoftheyear.co.il/p/blog-page_87.html'  # December
]

def extract_content_from_link(link):
    response = requests.get(link)
    soup = BeautifulSoup(response.content, 'html.parser')
    return soup.get_text(separator="\n")

def generate_ai_events(month, event_type, additional_comments):
    print(f"Generating AI events for month: {month}, event_type: {event_type}, additional_comments: {additional_comments}")
    month_index = datetime.strptime(month, '%Y-%m').month - 1  
    url = urls[month_index]
    print(f"Fetching page content from URL: {url}")
    page_content = extract_content_from_link(url)

    if not page_content:
        raise ValueError('Failed to fetch page content for the given month.')

    print(f"Fetched page content: {page_content[:500]}...") 

    prompt = f"""
    Generate a list of 6 {event_type or 'promotional'} events for a store specializing in camping and hiking equipment. 
    All events should be in the month of {month} and take place in Israel. Use the following real events and dates as your source:
    {page_content} 

    The events should be directly related to hiking, camping, outdoor adventures, and nature activities. The descriptions should be in Hebrew, and the events should be the most relevant to my store type.

    Ensure each event includes a date in YYYY-MM-DD format followed by a title and description separated by ' - '. 

    Example:
    2024-09-01 - מבצע חזרה לבית הספר - חוגגים את החזרה לבית הספר עם הנחות על כל ציוד הקמפינג והטיולים שלנו.
    2024-09-03 - יום גורדי השחקים - לכבוש פסגות חדשות עם מבצע על כל ציוד הטיפוס שלנו.
        
    {additional_comments}
    """


    print(f"Prompt for OpenAI: {prompt}")

    try:
        response = openai.chat.completions.create(
            model='gpt-4o',
            messages=[{'role': 'user', 'content': prompt}],
            max_tokens=2000,
            temperature=0,
        )

        generated_events_text = response.choices[0].message.content.strip()
        generated_events = [event.strip() for event in generated_events_text.split('\n') if event.strip()]
        event_objects = []

        for index, event in enumerate(generated_events):
            parts = event.split(' - ')
            if len(parts) < 3:
                print(f"Invalid event format: {event}")
                continue

            date_str, title, description = parts[0].strip(), parts[1].strip(), " - ".join(parts[2:]).strip()
            try:
                parsed_date = datetime.strptime(date_str, '%Y-%m-%d')
            except ValueError:
                print(f"Invalid date format: {date_str}")
                continue

            event_objects.append({
                'id': index,
                'summary': title,
                'description': description,
                'start': {
                    'dateTime': parsed_date.isoformat(),
                    'timeZone': 'Asia/Jerusalem',
                },
                'end': {
                    'dateTime': (parsed_date + timedelta(hours=1)).isoformat(),
                    'timeZone': 'Asia/Jerusalem',
                },
            })
        print(f"Generated {len(event_objects)} events")
        return event_objects
    except Exception as e:
        print(f"Error generating AI events: {e}")
        raise ValueError('Error generating AI events')

@event_bp.route('/generate-ai-events', methods=['POST'])
def generate_events_route():
    data = request.get_json()
    month = data.get('month')
    event_type = data.get('eventType')
    additional_comments = data.get('additionalComments', '')
    print(f"Received request: month={month}, event_type={event_type}, additional_comments={additional_comments}")
    try:
        event_objects = generate_ai_events(month, event_type, additional_comments)
        print(f"Returning {len(event_objects)} events")
        return jsonify(event_objects)
    except ValueError as e:
        print(f"ValueError: {e}")
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("event_generation.py loaded")