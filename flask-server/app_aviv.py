from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mysqldb import MySQL
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "allow_headers": ["Content-Type"]}})


app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'michalgoa'
app.config['MYSQL_CHARSET'] = 'utf8mb4'

mysql = MySQL(app)


@app.route('/survey/<int:survey_id>/results', methods=['GET'])
def get_survey_results(survey_id):
    cursor = mysql.connection.cursor()
    try:
        cursor.execute("""
            SELECT q.q_id, q.questionText, a.a_id, a.answerText, COUNT(r.response_id) as response_count
            FROM question q
            LEFT JOIN answer a ON q.q_id = a.q_id
            LEFT JOIN response r ON a.a_id = r.a_id AND r.s_id = %s
            WHERE q.s_id = %s
            GROUP BY q.q_id, a.a_id
        """, (survey_id, survey_id))
        rows = cursor.fetchall()

        survey_results = {}
        for row in rows:
            question_id = row[0]
            question_text = row[1]
            answer_id = row[2]
            answer_text = row[3]
            response_count = row[4]

            if question_id not in survey_results:
                survey_results[question_id] = {
                    'question_text': question_text,
                    'answers': []
                }

            survey_results[question_id]['answers'].append({
                'answer_id': answer_id,
                'answer_text': answer_text,
                'response_count': response_count
            })

        return jsonify({'survey_results': survey_results}), 200

    except Exception as e:
        print(f"Error fetching survey results: {e}")
        return jsonify({'error': 'Failed to fetch survey results'}), 500
    finally:
        cursor.close()


@app.route('/surveys', methods=['GET'])
def get_surveys():
    cursor = mysql.connection.cursor()
    try:
        cursor.execute("SELECT survey_id, title, startDate FROM survey")
        surveys = cursor.fetchall()
        survey_data = [
            {
                'survey_id': survey[0],
                'title': survey[1],
                'start_date': survey[2]
            }
            for survey in surveys
        ]
        return jsonify({'surveys': survey_data}), 200
    except Exception as e:
        print(f"Error fetching surveys: {e}")
        return jsonify({'error': 'Failed to fetch surveys'}), 500
    finally:
        cursor.close()


@app.route('/send-emails', methods=['POST'])
def send_emails():
    data = request.json
    survey_id = data.get('surveyId')

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT email FROM customer_club")
    rows = cursor.fetchall()
    emails = [row[0] for row in rows]
    cursor.close()

    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    smtp_user = "triangle321123@gmail.com"
    smtp_password = ""

    subject = "סקר חדש!"
    body = f" קיים סקר חדש במערכתנו, לחצו על הקישור הבא כדי לצפות בסקר החדש: http://localhost:3000/Survey-LandingPage/{survey_id}"

    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = smtp_user  
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    msg['Bcc'] = ", ".join(emails)  
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, emails, msg.as_string())
        server.quit()
        return jsonify({"message": "Emails sent successfully"}), 200
    except smtplib.SMTPException as e:
        print(f"SMTP error occurred: {e}")
        return jsonify({"error": f"SMTP error occurred: {e}"}), 500
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": f"An error occurred: {e}"}), 500


@app.route('/survey/<int:survey_id>', methods=['GET'])
def get_survey_questions(survey_id):
    cursor = mysql.connection.cursor()
    try:
        cursor.execute("SELECT q.q_id, q.questionText, a.a_id, a.answerText FROM question q LEFT JOIN answer a ON q.q_id = a.q_id WHERE q.s_id = %s", (survey_id,))
        rows = cursor.fetchall()
        
        survey_questions = []
        for row in rows:
            q_id = row[0]  
            questionText = row[1] 
            a_id = row[2] 
            answerText = row[3] 
            
            question = next((q for q in survey_questions if q['q_id'] == q_id), None)
            if not question:
                question = {
                    'q_id': q_id,
                    'questionText': questionText,
                    'answers': []
                }
                survey_questions.append(question)
            
            if a_id:
                question['answers'].append({
                    'a_id': a_id,
                    'answerText': answerText
                })
        
        return jsonify({'survey_questions': survey_questions}), 200
    
    except Exception as e:
        print(f"Error fetching survey data from database: {e}")
        return jsonify({'error': 'Failed to fetch survey data from database'}), 500
    
    finally:
        cursor.close()
    
@app.route('/surveys', methods=['POST'])
def create_survey():
    if request.method == 'POST':
        data = request.json
        title = data.get('title')
        description = data.get('description')

        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO survey (title, description) VALUES (%s, %s)", (title, description))
        mysql.connection.commit()

        # Get the last inserted id
        survey_id = cursor.lastrowid
        cursor.close()

        return jsonify({'message': 'Survey created successfully!', 'survey_id': survey_id}), 201
    else:
        return jsonify({'error': 'Method not allowed'}), 405

@app.route('/questions/<int:survey_id>', methods=['POST'])
def add_question(survey_id):
    if request.method == 'POST':
        data = request.json
        question_text = data.get('questionText')

        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO question (s_id, questionText) VALUES (%s, %s)", (survey_id, question_text))
        mysql.connection.commit()

        # Get the last inserted id
        question_id = cursor.lastrowid
        cursor.close()

        return jsonify({'message': 'Question added successfully!', 'question_id': question_id}), 201
    else:
        return jsonify({'error': 'Method not allowed'}), 405

@app.route('/answers/<int:question_id>', methods=['POST'])
def add_answer(question_id):
    if request.method == 'POST':
        data = request.json
        answer_text = data.get('answerText')

        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO answer (q_id, answerText) VALUES (%s, %s)", (question_id, answer_text))
        mysql.connection.commit()
        cursor.close()

        return jsonify({'message': 'Answer added successfully!'}), 201
    else:
        return jsonify({'error': 'Method not allowed'}), 405

@app.route('/responses', methods=['POST'])
def submit_response():
    if request.method == 'POST':
        data = request.json
        survey_id = data.get('survey_id')
        responses = data.get('responses')

        cursor = mysql.connection.cursor()
        try:
            for response in responses:
                question_id = response.get('q_id')
                answer_id = response.get('a_id')
                cursor.execute("INSERT INTO response (s_id, q_id, a_id) VALUES (%s, %s, %s)", (survey_id, question_id, answer_id))
            mysql.connection.commit()
        except Exception as e:
            print(f"Error submitting responses: {e}")
            mysql.connection.rollback()
            return jsonify({'error': 'Failed to submit responses'}), 500
        finally:
            cursor.close()

        return jsonify({'message': 'Responses submitted successfully!'}), 201
    else:
        return jsonify({'error': 'Method not allowed'}), 405

@app.route('/submit_customer_club', methods=['POST'])
def submit_customer_club():
    if request.method == 'POST':
        data = request.json
        cursor = mysql.connection.cursor()
        cursor.execute("""
            INSERT INTO customer_club (phone, firstName, lastName, email, dob, country, street, city, state, zip)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            data['phone'],
            data['firstName'],
            data['lastName'],
            data['email'],
            data['dob'],
            data['country'],
            data['street'],
            data['city'],
            data['state'],
            data['zip']
        ))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'Data saved successfully'}), 201
    else:
        return jsonify({'error': 'Method not allowed'}), 405

if __name__ == '__main__':
    # app.run(debug=True, port=3000)
    app.run(debug=True)





















