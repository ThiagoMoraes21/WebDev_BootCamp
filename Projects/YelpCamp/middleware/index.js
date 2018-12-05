//  all meddlewares goes here
var middlewareObj = {};
var Campground    = require('../models/campground');
var Comment       = require('../models/comment');

//  Middleware that checks the campground ownership
middlewareObj.checkCampOwnership = function(req, res, next){
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCamp){
      if (err) {
        console.log('Error trying to find the campground' + err);
        res.redirect('back');
      } else {
        //  check if the user own the campground
        if (foundCamp.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('/login');
  }
}

//  Middleware that checks the comment ownership
middlewareObj.checkCommentOwnership = function(req, res, next){
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if (err) {
        console.log('Error trying to find the campground' + err);
        res.redirect('back');
      } else {
        //  check if the user own the comment
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('/login');
  }
}

//  Middleware that checks user authentication
middlewareObj.isLoggedIn = function(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = middlewareObj;
