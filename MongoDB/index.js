// Dependencies 
const express = require("express");
const app = express();

const dotenv = require("dotenv")
dotenv.config();

const mongoose = require("mongoose");

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
app.get('/',(req, res) => { 
    res.render('todo.ejs');
    }); // GET Request, renders page

app.post('/', (req, res) => {
    console.log(req.body);
}); // POST Method
    

