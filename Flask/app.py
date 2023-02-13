from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

## Initialize Flask app, database connection
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# [Concept: Persistent Storage]
db = SQLAlchemy(app)

## Define Tasks 
class Task (db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100))
    complete = db.Column(db.Boolean)
    
    # Old definition structure for a non-database model
    '''
    def __init__ (self, name, status):
        self.name = str(name)
        self.completed = bool(status)

todos = [Task(name="Flask Tutorial", status=False), 
         Task(name="MongoDB Tutorial", status=False), 
         Task(name="191 Readings", status=False),
         Task(name="Completed Task", status=True)]
'''

### Routing [Concept: #Routing]
## Pages and Views
@app.route('/')
def home():
    todos = Task.query.all()
    return render_template("todos.html", todos=todos)

## Page Actions
@app.route('/add', methods=["POST"])
def add():
    name = request.form.get("name")
    new_todo = Task(name=name, complete=False)
    db.session.add(new_todo)
    db.session.commit()
    return redirect(url_for("home"))

@app.route("/update/<int:todo_id>")
def update(todo_id):
    todo = Task.query.filter_by(id=todo_id).first()
    todo.complete = not todo.complete
    db.session.commit()
    return redirect(url_for("home"))

@app.route("/delete/<int:todo_id>")
def delete(todo_id):
    todo = Task.query.filter_by(id=todo_id).first()
    db.session.delete(todo)
    db.session.commit()
    return redirect(url_for("home"))

## Run Application
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)