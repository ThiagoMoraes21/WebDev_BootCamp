var express = require('express');
var app = express();
var port  = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

var campgrounds = [
  {
    name: "Some Camp",
    image: "https://source.unsplash.com/eJ_OyOeGFHI"
  },
  {
    name: "Granite Hill",
    image: "https://source.unsplash.com/1azAjl8FTnU"
  },
  {
    name: "Lagosta Camp",
    image: "https://source.unsplash.com/W6dRiZHDZAo"
  },
  {
    name: "Mountains Ghost's Rest",
    image: "https://source.unsplash.com/XJuhZqEE4Go"
  }
];

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
  // get the data from the form
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  // redirect back to campgrounds page
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");
});

app.get("*", function(req, res){
  res.send("ERROR 404 (PAGE NOT FOUND)");
});

app.listen(port, function(){
  console.log("Server is running at port "+ port);
});
