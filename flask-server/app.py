# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # import joblib
# # import pandas as pd
# # from sqlalchemy import create_engine

# # app = Flask(__name__)
# # CORS(app)  # Enable CORS

# # # Load the trained model
# # model = joblib.load('best_model.pkl')

# # # Database connection using SQLAlchemy
# # db_connection_str = 'mysql+pymysql://root:@localhost/michalgoa'
# # db_connection = create_engine(db_connection_str)

# # @app.route('/predict', methods=['POST'])
# # def predict():
# #     data_input = request.get_json(force=True)
# #     catalog_number = data_input['catalog_number']

# #     # Fetch the most recent record for the given catalog number
# #     query = f"SELECT category, purchase_price, item_price_before_VAT, quantity, production_date FROM michalgoa_NewDB WHERE catalog_number = '{catalog_number}' ORDER BY production_date DESC LIMIT 1"
# #     record = pd.read_sql(query, db_connection).iloc[0]

# #     # Extract features from the record
# #     production_date = pd.to_datetime(record['production_date'])
# #     features = [
# #         record['category'],
# #         record['purchase_price'], 
# #         record['item_price_before_VAT'], 
# #         record['quantity'], 
# #         production_date.month, 
# #         production_date.year
# #     ]

# #     # Ensure the features are in the correct order and format for the model
# #     features = [features]

# #     prediction = model.predict(features)
# #     return jsonify({'prediction': prediction[0]})

# # if __name__ == '__main__':
# #     app.run(debug=True, host='0.0.0.0', port=5000)







# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import pymysql
# import pandas as pd
# import joblib
# from sklearn.preprocessing import OneHotEncoder, StandardScaler
# from sklearn.compose import ColumnTransformer
# from sklearn.pipeline import Pipeline
# from sklearn.impute import SimpleImputer
# from sklearn.ensemble import RandomForestRegressor
# # from sqlalchemy import create_engine

# app = Flask(__name__)
# CORS(app)

# # Configuration for the MySQL database
# app.config['MYSQL_HOST'] = '127.0.0.1'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'michalgoa'

# def get_db_connection():
#     connection = pymysql.connect(
#         host=app.config['MYSQL_HOST'],
#         user=app.config['MYSQL_USER'],
#         password=app.config['MYSQL_PASSWORD'],
#         db=app.config['MYSQL_DB'],
#         cursorclass=pymysql.cursors.DictCursor
#     )
#     return connection

# # Load the trained model
# model = joblib.load('best_model.pkl')

# # Function to preprocess data for prediction
# def preprocess_data(df):
#     # Convert production_date to datetime
#     df['production_date'] = pd.to_datetime(df['production_date'], dayfirst=True)
    
#     # Extract date features
#     df['production_month'] = df['production_date'].dt.month
#     df['production_year'] = df['production_date'].dt.year
    
#     # Drop unnecessary columns
#     df.drop(columns=['catalog_number', 'product_name', 'document_type', 'document_number', 'item', 'manufacturer', 'production_date'], inplace=True)
    
#     # print(df)
#     return df

# @app.route('/')
# def index():
#     return 'Hello, World!'

# # Route to predict quantities to order
# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     catalog_number = data['catalog_number']

#     # Fetch data from MySQL
#     conn = get_db_connection()
#     try:
#         with conn.cursor() as cursor:
#             sql = "SELECT catalog_number, product_name, category, document_type, document_number, item, purchase_price, item_price_before_VAT, quantity, total_befor_VAT, manufacturer, production_date, product_color, product_size FROM michalgoa_NewDB WHERE catalog_number = %s"
#             cursor.execute(sql, (catalog_number,))
#             result = cursor.fetchall()
#             df = pd.DataFrame(result)
#     finally:
#         conn.close()
    
#     if df.empty:
#         return jsonify({'error': 'Catalog number not found'}), 404
    
#     # Preprocess the data
#     df_processed = preprocess_data(df.copy())
    
#     # Predict using the loaded model
#     X_pred = df_processed.drop(columns=['quantity'])
#     predictions = model.predict(X_pred)
    
#     # Prepare the response
#     response = []
#     for idx, pred in enumerate(predictions):
#         item = {
#             'catalog_number': df.iloc[idx]['catalog_number'],
#             'quantity_to_order': round(pred),
#             'product_color': df.iloc[idx]['product_color'],
#             'product_size': df.iloc[idx]['product_size']
#         }
#         response.append(item)
    
#     return jsonify(response)

# if __name__ == '__main__':
#     app.run(debug=True)





from flask import Flask, jsonify
import subprocess

app = Flask(__name__)


scripts = ["app_aviv.py", "main.py", "train.py", "prediction.py"]


for script in scripts:
    subprocess.Popen(["python", script])



