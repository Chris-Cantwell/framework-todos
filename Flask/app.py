from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

class task ():
    def __init__ (self, name, status):
        self.name = str(name)
        self.completed = bool(status)

todos = [task(name="Flask Tutorial", status=False), 
         task(name="MongoDB Tutorial", status=False), 
         task(name="191 Readings", status=False),
         task(name="Completed Task", status=True)]

@app.route('/')
def hello_world():
    return render_template("todos.html", todos=todos)

if __name__ == "__main__":
    app.run(debug=True)