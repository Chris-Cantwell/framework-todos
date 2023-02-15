// Dependencies 
const express = require("express");
const app = express();

const dotenv = require("dotenv")
dotenv.config();

const mongoose = require("mongoose");

const TodoTask = require("./models/TodoTask");

// Configuration
app.use("/static", express.static("public")); // Access CSS
app.use(express.urlencoded({extended: true}));

// Connect to DB, Launch Server    
// mongoose.set("useFindAndModify", false); -- indicated by tutorial, throws an error
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
    app.listen(3000, () => console.log("Server Up and running"));
});

/* #Template */
// Configure view engine
app.set("view engine", "ejs"); // Access Embedded JS Files

/* Routing */
// Gets stored tasks from database
app.get('/',(req, res) => { 
    TodoTask.find({}, (err, tasks) => {
        res.render('todo.ejs', {todoTasks: tasks});
    })
}); // GET Request, renders page

// Adds added tasks to database
app.post('/', async (req, res) => {
    console.log(req.body);

    const todoTask = new TodoTask({
        content: req.body.content
    });

    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
}); // POST Method
    
//UPDATE
app
.route("/edit/:id")
.get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
        res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
})
.post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
});

