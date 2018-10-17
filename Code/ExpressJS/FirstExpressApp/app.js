var express = require("express");
var app = express();

app.get("/", function(req, res){
    console.log("New request to /");
    res.send("Hi there!");
});

app.get("/bye", function(req, res){
    console.log("New request to /bye");
    res.send("Goodbye!");
});

app.get("/dog", function(req, res){
    console.log("New request to /dog");
   res.send("MEOW!"); 
});

app.get("/r/:subjectName", function(req, res){
   var subject = req.params.subjectName;
   res.send("WELCOME TO THE " + subject.toUpperCase() + " SECTION!");
});


app.get("*", function(req, res){
    console.log("Got a 404 request");
   res.send("Error 404! Page not found."); 
});

// Start server, tell to express to listen for requests
// In you computer put the request listener on port 3000 ot 8080 
app.listen(3000, function(){
    console.log("Server running on localhost:3000");
});
