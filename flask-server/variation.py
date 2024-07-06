import re
from flask import Blueprint, jsonify, request
from mysql.connector import Error
from db_utils import create_db_connection
import pandas as pd

variation_bp = Blueprint('variation', __name__)

@variation_bp.route('/products', methods=['GET'])
def get_products():
    connection = create_db_connection()
    if connection is None:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    cursor = connection.cursor(dictionary=True)
    query = "SELECT DISTINCT product_name FROM michalgoa_NewDB"
    try:
        cursor.execute(query)
        rows = cursor.fetchall()
        products = [row['product_name'] for row in rows]
        products = list(set(products)) 
    except Error as e:
        print(f"Error executing query: {e}")
        return jsonify({'error': 'Failed to fetch products'}), 500
    finally:
        cursor.close()
        connection.close()

    return jsonify(products)

@variation_bp.route('/analysis', methods=['GET'])
def variation_analysis():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    product_name = request.args.get('product_name')

    print(f"Product Name: {product_name}")

    sales_data = fetch_sales_data(start_date, end_date, product_name)
    if sales_data is None:
        return jsonify({'error': 'Failed to fetch sales data'}), 500

    print(f"Sales Data: {sales_data}")

    df = pd.DataFrame(sales_data)
    if df.empty:
        return jsonify([])

    df['base_product'] = df['product_name']
    df['color'] = df['product_color']
    df['size'] = df['product_size']

    print(f"DataFrame: {df}")


    variation_summary = df.groupby(['base_product', 'color', 'size']).agg({
        'total_quantity': 'sum',
        'total_sales': 'sum'
    }).reset_index().sort_values(by='total_quantity', ascending=False)

    print(f"Variation Summary: {variation_summary}")

    return jsonify(variation_summary.to_dict(orient='records'))

def fetch_sales_data(start_date, end_date, product_name=None, variation=None):
    connection = create_db_connection()
    if connection is None:
        return None

    cursor = connection.cursor(dictionary=True)
    query = """
        SELECT catalog_number, product_name, product_color, product_size, SUM(quantity) as total_quantity, SUM(ABS(total_befor_VAT)) as total_sales
        FROM michalgoa_NewDB
        WHERE STR_TO_DATE(production_date, '%d/%m/%Y') BETWEEN STR_TO_DATE(%s, '%Y-%m-%d') AND STR_TO_DATE(%s, '%Y-%m-%d')
    """
    params = [start_date, end_date]

    if product_name:
        query += " AND product_name LIKE %s"
        params.append(f"{product_name}%")

    if variation:
        query += " AND catalog_number = %s"
        params.append(variation)

    query += " GROUP BY catalog_number, product_name, product_color, product_size"

    print(f"Executing query: {query}")
    print(f"With parameters: {params}")

    try:
        cursor.execute(query, params)
        rows = cursor.fetchall()
        print(f"Rows fetched: {rows}")
    except Error as e:
        print(f"Error executing query: {e}")
        rows = []

    cursor.close()
    connection.close()

    return rows












