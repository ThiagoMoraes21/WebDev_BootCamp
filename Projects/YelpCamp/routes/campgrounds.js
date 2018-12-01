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
router.post("/", isLoggedIn, function(req, res){
  // get the data from the form
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author
  }
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, createdCampground){
    if(err){
      console.log('Create new campground failed: \n' + err);
      res.redirect('/campgrounds/new');
    } else {
      // redirect back to campgrounds page
      console.log(createdCampground);
      res.redirect("/campgrounds/" + createdCampground._id);
    }
  });
});

// NEW - Show form to create new campground
router.get("/new", isLoggedIn, function(req, res){
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

//  EDIT - Show a form to edit the campground
router.get("/:id/edit", function(req, res){
  Campground.findById(req.params.id, function(err, foundCamp){
    if (err) {
      console.log('Error trying to find the campground' + err);
      res.redirect('/campgrounds/' + req.params.id);
    } else {
      res.render('campgrounds/edit', {campground: foundCamp});
    }
  });
});

//  UPDATE - Update the form and redirect somewhere
router.put('/:id', function(req, res){
  //  find the campground and update
  Campground.findByIdAndUpdate(req.params.id, req.body.campground,
   function(err, updatedCamp){
      if (err) {
        console.log('Error trying to update campground: \n' + err);
        res.redirect('/campgrounds/' + req.params.id);
      } else {
        //  redirect to show page
        res.redirect('/campgrounds');
      }
  });
});

//  Middleware that checks user authentication
function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
