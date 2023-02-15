// Dependencies 
const express = require("express");
const app = express();

// Access CSS
app.use("/static", express.static("public"));

/* #Template */
// Access Embedded JS Files
app.set("view engine", "ejs");

// GET Request
app.get('/',(req, res) => {
    res.render('todo.ejs');
    });

// Launch Server    
app.listen(3000, () => console.log("Server Up and running"));
