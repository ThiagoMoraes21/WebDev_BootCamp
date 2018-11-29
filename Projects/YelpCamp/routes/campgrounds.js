var express    = require('express');
var router     = express.Router();
var Campground = require('../models/campground');

router.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

// INDEX - Show all campgrounds
router.get("/", function(req, res){
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
router.post("/", function(req, res){
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
router.get("/new", function(req, res){
  res.render("campgrounds/new.ejs");
});

// SHOW - Show information about a specific campground
router.get("/:id", function(req, res){
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

module.exports = router;
