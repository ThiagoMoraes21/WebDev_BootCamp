var express = require("express");
var app = express();

app.get("/", function(req, res){
  console.log("Got a request to '/'");
  res.send("Hi there, wecome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
  console.log("Got a request to /speak/" + req.params.animal);
  var animal = req.params.animal;
  var sounds = {
    pig: "OINK",
    dog: "WOOF WOOF",
    cow: "MOO",
    cat: "I HATE YOU HUMAN",
    fish: "..."
  }
  var say = sounds[animal];
  res.send("The " + animal + " says " + say);
});

app.get("/repeat/:message/:repeat", function(req, res){
  console.log("Got a request to /speak/" + req.params.message);
  var message = req.params.message;
  var repeat = Number(req.params.repeat);
  var print = "";

  for(var i = 0; i < repeat; i++){
    print += message + " ";
  }

  res.send(print);
});

app.get("*", function(req, res){
  console.log("Got a 404 request");
  res.send("ERROR 404 PAGE NOT FOUND, WHAT ARE YOU DOING WITH YOUR LIFE?");
});


app.listen(3000, function(){
  console.log("Server running on port 3000");
});
