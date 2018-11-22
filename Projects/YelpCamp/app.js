var express = require('express'),
    app = express(),
    port  = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    seedDB = require('./seeds'),
    Comment   = require("./models/comment");

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
seedDB(); // remove existent campgrounds and recreate them

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
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
  res.render("campgrounds/new.ejs");
});

// SHOW - Show information about a specific campground
app.get("/campgrounds/:id", function(req, res){
  // find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec( function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      // render show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});


// ====================
//  COMMENTS ROUTES
// ====================

app.get("/campgrounds/:id/comments/new", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res){
  //  lookup campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log("Error trying to find the campground\n" + err);
      res.redirect("/campgrounds")
    } else {
      //  create new comment
      Comment.create(req.body.comment, function(err, comment){
        if (err) {
          console.log("Error on creating a new comment: \n" + err);
        } else {
          // push the new comment into the especified campground
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id); //  redirect to show page
        }
      });
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
