from flask import Flask
from flask_cors import CORS
# from data_cleaning import data_cleaning_bp
from pareto import pareto_bp
from variation import variation_bp
import train

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Register blueprints
# app.register_blueprint(data_cleaning_bp, url_prefix='/data-cleaning')
app.register_blueprint(pareto_bp, url_prefix='/pareto')
app.register_blueprint(variation_bp, url_prefix='/variation')


# def train_model_before_first_request():
#     print("Starting model training...")
#     train.train_model()  # Call the training function
#     print("Model training completed.")


if __name__ == '__main__':
    app.run(debug=True, port=5000)










