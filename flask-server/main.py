# from flask import Flask
# from flask_cors import CORS
# from pareto import pareto_bp
# from variation import variation_bp
# import train

# app = Flask(__name__)
# CORS(app)  

# app.register_blueprint(pareto_bp, url_prefix='/pareto')
# app.register_blueprint(variation_bp, url_prefix='/variation')


# if __name__ == '__main__':
#     app.run(debug=True)



from flask import Flask
from flask_cors import CORS
# from data_cleaning import data_cleaning_bp
from pareto import pareto_bp
from variation import variation_bp
# from app_aviv import aviv_bp
# from credentilas import credentials_bp
# from prediction import prediction_bp
# from train import train_bp
from event_generation import event_bp 


app = Flask(__name__)
CORS(app)  

# app.register_blueprint(data_cleaning_bp, url_prefix='/data-cleaning')
app.register_blueprint(pareto_bp, url_prefix='/pareto')
app.register_blueprint(variation_bp, url_prefix='/variation')
# app.register_blueprint(variation_bp, url_prefix='/variation')
app.register_blueprint(event_bp, url_prefix='/event')
# app.register_blueprint(aviv_bp, url_prefix='/aviv')
# app.register_blueprint(credentials_bp, url_prefix='/credentials')
# app.register_blueprint(prediction_bp, url_prefix='/prediction')
# app.register_blueprint(train_bp, url_prefix='/train-model')

if __name__ == '__main__':
    # app.run(debug=True, port=3001)
    app.run(debug=True)

















