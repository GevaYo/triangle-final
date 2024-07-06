import io
import pandas as pd
from flask import Blueprint, request, make_response, jsonify
from mysql.connector import Error
from db_utils import create_db_connection

pareto_bp = Blueprint('pareto', __name__)

@pareto_bp.route('/analysis', methods=['GET'])
def pareto_analysis_endpoint():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    criterion = request.args.get('criterion', 'total_sales')
    percentage = float(request.args.get('percentage', 80))

    sales_data = fetch_sales_data(start_date, end_date)
    if sales_data is None:
        return jsonify({'error': 'Failed to fetch sales data'}), 500

    try:
        result = pareto_analysis(sales_data, criterion, percentage)
        result_dict = result.to_dict(orient='records')
    except KeyError as e:
        return jsonify({'error': str(e)}), 400

    return jsonify(result_dict)

@pareto_bp.route('/')
def index():
    return 'Hello, World!'

@pareto_bp.route('/analysis/download', methods=['GET'])
def download_pareto_analysis():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    criterion = request.args.get('criterion', 'total_sales')
    percentage = float(request.args.get('percentage', 80))

    sales_data = fetch_sales_data(start_date, end_date)
    if sales_data is None:
        return jsonify({'error': 'Failed to fetch sales data'}), 500

    try:
        result = pareto_analysis(sales_data, criterion, percentage)
    except KeyError as e:
        return jsonify({'error': str(e)}), 400

    output = io.StringIO()
    result.to_csv(output, index=False)
    output.seek(0)

    response = make_response(output.getvalue())
    response.headers["Content-Disposition"] = "attachment; filename=pareto_analysis.csv"
    response.headers["Content-type"] = "text/csv"
    return response

def fetch_sales_data(start_date, end_date):
    connection = create_db_connection()
    if connection is None:
        return None

    cursor = connection.cursor(dictionary=True)
    query = """
        SELECT catalog_number, product_name,
            SUM(quantity) as total_quantity,
            SUM(total_befor_VAT) as total_sales,
            product_color, product_size
        FROM michalgoa_NewDB
        WHERE STR_TO_DATE(production_date, '%d/%m/%Y') BETWEEN STR_TO_DATE(%s, '%Y-%m-%d') AND STR_TO_DATE(%s, '%Y-%m-%d')
        GROUP BY catalog_number, product_name, product_color, product_size;
    """
    params = [start_date, end_date]

    try:
        cursor.execute(query, params)
        rows = cursor.fetchall()
        print("Executed Query:", cursor.statement)
        print("Fetched Rows:", rows)
    except Error as e:
        print(f"Error executing query: {e}")
        rows = []

    cursor.close()
    connection.close()

    return rows

def pareto_analysis(data, criterion, percentage):
    df = pd.DataFrame(data)
    if df.empty:
        return pd.DataFrame()

    df = df.sort_values(by=criterion, ascending=False)
    df['cumulative_percentage'] = df[criterion].cumsum() / df[criterion].sum() * 100
    pareto_cutoff = df[df['cumulative_percentage'] <= percentage]

    return pareto_cutoff
