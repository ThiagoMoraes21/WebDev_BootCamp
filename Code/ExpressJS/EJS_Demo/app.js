var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.get("/", function(req, res){
  res.render("home.ejs");
});

app.get("/drama/:picture", function(req, res){
  var picture = req.params.picture;
  res.render("drama.ejs", {dramaPic : picture});
});

app.get("/posts", function(req, res){
  var posts = [
    {title: "Duro de matar", author: "John McTiernan"},
    {title: "Alien", author: "Ridley Scott"},
    {title: "Jurassic Park", author: "Steven Spilberg"}
  ];
  res.render("posts.ejs", {posts: posts});
});

app.listen(port, function(){
  console.log("Server running on port " + port);
});
