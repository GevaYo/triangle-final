from flask import Flask, render_template
from flask_mysqldb import MySQL
import os 


app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config["MYSQL_PORT"] = 3306
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'michalgoa_NewDB'


mysql = MySQL(app)

@app.route('/')
def Home():
    cur = mysql.connection.cursur()
    cur.execute("SELECT * FROM User_names")
    fetchdata = cur.fetchall()
    cur.close()
    return render_template('home.html')


if __name__ == '__main__':
    app.run(debug=True)

