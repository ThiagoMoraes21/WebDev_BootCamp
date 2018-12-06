var express    = require('express');
var router     = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware'); // requires index.js by default

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
router.post("/", middleware.isLoggedIn, function(req, res){
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
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new.ejs");
});

// SHOW - Show information about a specific campground
router.get("/:id", function(req, res){
  // find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec( function(err, foundCampground){
    if(err || !foundCampground){
      req.flash('error', 'Campground not found');
      res.redirect('back');
    } else {
      // render show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

//  EDIT - Show a form to edit the campground
router.get("/:id/edit", middleware.checkCampOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
      res.render('campgrounds/edit', {campground: foundCamp});
    });
});

//  UPDATE - Update the form and redirect somewhere
router.put('/:id', middleware.checkCampOwnership, function(req, res){
  //  find the campground and update
  Campground.findByIdAndUpdate(req.params.id, req.body.campground,
   function(err, updatedCamp){
      if (err) {
        console.log('Error trying to update campground: \n' + err);
        req.flash('error', err.message);
        res.redirect('/campgrounds/' + req.params.id);
      } else {
        //  redirect to show page
        res.redirect('back');
      }
  });
});

//  DESTROY - Delete a especific campground
router.delete('/:id', middleware.checkCampOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      console.log('Error trying to delete campground:\n' + err);
      req.flash('error', err.message);
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;
