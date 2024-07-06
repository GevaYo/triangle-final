#  works !!! 

import pymysql
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib

def get_db_connection():
    connection = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='',
        db='michalgoa',
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection

def fetch_data():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT DISTINCT catalog_number, product_name, category, document_type, document_number, item, purchase_price, item_price_before_VAT, quantity, total_befor_VAT, manufacturer, production_date, product_color, product_size FROM michalgoa_NewDB"
            cursor.execute(sql)
            result = cursor.fetchall()
            df = pd.DataFrame(result)
    finally:
        conn.close()

    df['production_date'] = pd.to_datetime(df['production_date'], dayfirst=True)

    df['production_month'] = df['production_date'].dt.month
    df['production_year'] = df['production_date'].dt.year

    df.drop(columns=['catalog_number','document_type', 'document_number', 'item', 'manufacturer', 'production_date'], inplace=True)

    return df

def train_model(df):
    categorical_features = ['category','product_color', 'product_size','product_name']
    numerical_features = ['purchase_price', 'item_price_before_VAT', 'production_month', 'production_year']

    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(), categorical_features),
            ('num', Pipeline(steps=[
                ('imputer', SimpleImputer(strategy='mean')),
                ('scaler', StandardScaler())
            ]), numerical_features)
        ])

    X = df.drop('quantity', axis=1)
    y = df['quantity']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                               ('model', RandomForestRegressor(random_state=42))])

    pipeline.fit(X_train, y_train)

    joblib.dump(pipeline, 'best_model.pkl')

    y_pred = pipeline.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print(f'MAE: {mae}')
    print(f'MSE: {mse}')
    print(f'R2: {r2}')
    print(df.loc[0,:])
    print("done")

def main():
    df = fetch_data()

    train_model(df)

if __name__ == "__main__":
    main()


