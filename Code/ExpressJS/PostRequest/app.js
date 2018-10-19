var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Friends list
var friends = [
  "Raquelzinha",
  "Demonia",
  "Erky",
  "Giovaninha",
  "Brobinho"
]


app.get("/", function(req, res){
  res.render("home");
});

app.post("/addfriend", function(req, res){
  var newFriend = req.body.newfriend;
  friends.push(newFriend);
  res.redirect("/friends");
});

app.get("/friends", function(req, res){
  res.render("friends", {friends : friends});
});

app.get("*", function(req, res){
  res.send("ERROR 404 (PAGE NOT FOUND)");
});

app.listen(port, function(){
  console.log("Server is running on port" + port);
});
