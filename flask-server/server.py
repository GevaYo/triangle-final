from flask import Flask, request, jsonify
import joblib
import pandas as pd
from datetime import datetime
import pymysql

app = Flask(__name__)

# Load the trained model and preprocessor
model = joblib.load('best_model.pkl')
preprocessor = joblib.load('preprocessor.pkl')

# Database connection
db_connection = pymysql.connect(
    host='127.0.0.1',
    user='root',
    password='',
    database='michalgoa'
)

def preprocess_data(df):
    # Convert dates to datetime
    df['production_date'] = pd.to_datetime(df['production_date'], dayfirst=True)

    # Extract date features
    df['production_month'] = df['production_date'].dt.month
    df['production_year'] = df['production_date'].dt.year

    # Drop unused columns
    df.drop(columns=['catalog_number', 'product_name', 'document_type', 'document_number', 'item', 'manufacturer', 'production_date'], inplace=True)

    return df

@app.route('/')
def home():
    return "Welcome to the Travel Equipment Sales Prediction API!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from the request (assuming only catalog number is sent)
        data = request.json
        catalog_number = data['catalog_number']

        # Query the database to get the necessary data
        query = f"SELECT catalog_number, product_name, category, document_type, document_number, item, purchase_price, item_price_before_VAT, quantity, total_befor_VAT, manufacturer, production_date FROM sales WHERE catalog_number = '{catalog_number}'"
        df = pd.read_sql(query, db_connection)

        # Preprocess the data
        processed_data = preprocess_data(df)

        # Preprocess the data using the preprocessor
        processed_data = preprocessor.transform(processed_data)

        # Make prediction
        prediction = model.predict(processed_data)

        # Return the prediction
        return jsonify({'predicted_quantity': prediction[0]})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
