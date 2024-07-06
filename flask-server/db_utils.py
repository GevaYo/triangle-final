# db_utils.py
import mysql.connector
from mysql.connector import Error


# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

db_config = {
    
    # 'host': 'localhost',
    # 'user': 'root',
    # 'password': '1234',
    # 'database': 'michaldb'

    'host': '127.0.0.1',
    'user': 'root',
    'password': '',
    'database': 'michalgoa'
}

def create_db_connection():
    """Create and return a database connection."""
    try:
        connection = mysql.connector.connect(
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password'],
            database=db_config['database']
        )
        if connection.is_connected():
            print("Successfully connected to the database")
            return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None


# if __name__ == '__main__':
#     app.run(debug=True, port=3001)
