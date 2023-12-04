import os
from flask import Flask, render_template 
from flas_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"oringins":["https://iotfront-b4cb0f781573.herokuapp.com", "https://iot-backen-5cc85ad97e0a.herokuapp.com"]}})

@app.route("/", methods=["GET"])
def index():
    return render_template('index.html')

@app.route("/led", methods=["GET"])
def led():
    return render_template('led.html')

@app.route("/potenciometro", methods=["GET", "POST"])
def potenciometro():
    return render_template('potenciometro.html')


if __name__ =='__main__':
    app.run(debug=True, host='0.0.0.0', port=ini(os.enviaron.get('PORT', 5000)))