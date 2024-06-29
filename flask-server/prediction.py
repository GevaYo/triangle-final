from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql
import pandas as pd
import joblib
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor
from sqlalchemy import create_engine

app = Flask(__name__)
CORS(app)

# Configuration for the MySQL database
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'michalgoa'

def get_db_connection():
    connection = pymysql.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        db=app.config['MYSQL_DB'],
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection
@app.route('/')
def index():
    return 'Hello, World!'


@app.route('/sales', methods=['GET'])
def get_sales():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM sales"
            cursor.execute(sql)
            result = cursor.fetchall()
            return jsonify(result)
    finally:
        connection.close()

        


# def preprocess_data(df):
#     # Convert production_date to datetime
#     df['production_date'] = pd.to_datetime(df['production_date'], dayfirst=True)
    
#     # Extract date features
#     df['production_month'] = df['production_date'].dt.month
#     df['production_year'] = df['production_date'].dt.year
    
#     # Drop unnecessary columns
#     df.drop(columns=['catalog_number', 'document_type', 'document_number', 'item', 'manufacturer', 'production_date'], inplace=True)
    
#     return df




#   works !!!!! - only catalog number ----

model = joblib.load('best_model.pkl')

# Function to preprocess data for prediction
def preprocess_data(df):
    # Convert production_date to datetime
    df['production_date'] = pd.to_datetime(df['production_date'], dayfirst=True)
    
    # Extract date features
    df['production_month'] = df['production_date'].dt.month
    df['production_year'] = df['production_date'].dt.year
    
    # Drop unnecessary columns
    df.drop(columns=['catalog_number', 'document_type', 'document_number', 'item', 'manufacturer', 'production_date'], inplace=True)
    
    # print(df)
    return df

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    catalog_number = data.get('catalog_number')

    if not catalog_number:
        return jsonify({'error': 'Catalog number is required'}), 400
    
    # Fetch data from MySQL
    conn = get_db_connection()
    try:
         with conn.cursor() as cursor:
            sql = """
            SELECT DISTINCT catalog_number, product_name, category, document_type, document_number, item,
                purchase_price, item_price_before_VAT, quantity, total_befor_VAT, manufacturer,
                production_date, product_color, product_size
            FROM michalgoa_NewDB WHERE catalog_number = %s
            """
            cursor.execute(sql, (catalog_number,))
            result = cursor.fetchall()
            df = pd.DataFrame(result)
    finally:
        conn.close()
    
    if df.empty:
        return jsonify({'error': 'Catalog number not found'}), 404
    
    # Preprocess the data
    df_processed = preprocess_data(df.copy())
    
    # Predict using the loaded model
    X_pred = df_processed.drop(columns=['total_befor_VAT'])
    predictions = model.predict(X_pred)
    
    # Prepare the response
    response = []
    seen_items = set()
    
    for idx, pred in enumerate(predictions):
        item = {
            'catalog_number': df.iloc[idx]['catalog_number'],
            'product_name': df.iloc[idx]['product_name'],
            'quantity_to_order': round(pred), 
            'product_color': df.iloc[idx]['product_color'] if pd.notnull(df.iloc[idx]['product_color']) else 'None',
            'product_size': df.iloc[idx]['product_size'] if pd.notnull(df.iloc[idx]['product_size']) else 'None'
        }
        item_tuple = (item['catalog_number'],item['product_name'], item['quantity_to_order'], item['product_color'], item['product_size'])
        if item_tuple not in seen_items:
            seen_items.add(item_tuple)
            response.append(item)
    
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
