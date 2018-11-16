var express = require('express'),
    app = express(),
    port  = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//  SETUP SCHEMA
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

//  Create a model using the campgroundSchema
var Campground = mongoose.model("Compground", campgroundSchema);

// Campground.create(
//   {
//     name: "Lagosta Camp",
//     image: "https://source.unsplash.com/W6dRiZHDZAo",
//     description: "This is the Lagosta Camp. A place where you can fish lagostas! No equipament incluede..."
//   },
//   function(err, campground){
//     if(err){
//       console.log(err);
//     } else {
//       console.log("Newly created campground: " + campground);
//     }
//   });



app.get("/", function(req, res){
  res.render("landing");
});

// INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
  // Get all campgrounds from the database
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("index", {campgrounds: allCampgrounds});
    }
  });
});

// CREATE - Add new campground to DB
app.post("/campgrounds", function(req, res){
  // get the data from the form
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc}
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, createdCampground){
    if(err){
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

// NEW - Show form to create new campground
app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");
});

// SHOW - Show information about a specific campground
app.get("/campgrounds/:id", function(req, res){
  // find the campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      // render show template with that campground
      res.render("show", {campground: foundCampground});
    }
  });
});

// ERROR 404 PAGE NOT FOUND
app.get("*", function(req, res){
  res.send("ERROR 404 (PAGE NOT FOUND)");
});

app.listen(port, function(){
  console.log("Server is running at port " + port);
});

// { "_id" : ObjectId("5be0cbeab0eb86107ba1a03a"), "name" : "Some Camp", "image" : "https://source.unsplash.com/eJ_OyOeGFHI", "__v" : 0 }
// { "_id" : ObjectId("5be0cc89bc53ac108d7339b0"), "name" : "Granite Hill", "image" : "https://source.unsplash.com/1azAjl8FTnU", "__v" : 0 }
// { "_id" : ObjectId("5bee186bd073080b81721b12"), "name" : "Lagosta Camp", "image" : "https://source.unsplash.com/W6dRiZHDZAo", "__v" : 0 }
// { "_id" : ObjectId("5bee1f7a6ad3e70bad909aaf"), "name" : "Mountains Ghost's Rest", "image" : "https://source.unsplash.com/XJuhZqEE4Go", "__v" : 0 }
