var express    = require('express');
var router     = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment    = require('../models/comment');

//  Comments new
router.get("/new", isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

//  Comments create
router.post("/", isLoggedIn, function(req, res){
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
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
          // push the new comment into the especified campground
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id); //  redirect to show page
        }
      });
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
