from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

todos = ["Flask Tutorial", "MongoDB Tutorial", "Readings for Other Classes"]

@app.route('/')
def hello_world():
    return render_template("index.html", todos=todos)

if __name__ == "__main__":
    app.run(debug=True)