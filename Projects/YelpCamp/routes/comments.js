var express    = require('express');
var router     = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment    = require('../models/comment');

//  COMMENTS NEW ROUTE
router.get("/new", isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

//  COMMENTS CREATE ROUTE
router.post("/", isLoggedIn, function(req, res){
  //  lookup campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log("Error trying to find the campground\n" + err);
      res.redirect("back")
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
          res.redirect("/campgrounds/" + req.params.id); //  redirect to show page
        }
      });
    }
  });
});

//  COMMENTS EDIT ROUTE
router.get('/:comment_id/edit', checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if (err) {
      console.log('Error trying to find the comment: \n' + err);
      res.redirect('back');
    } else {
      res.render('comments/edit', {
        campground_id: req.params.id,
        comment: foundComment
      });
    }
  });
});

//  COMMENTS UPDATE ROUTE
router.put('/:comment_id', checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,
    function(err, updatedComment){
      if (err) {
        console.log('Error trying to update the comment: \n' + err);
        res.redirect('back');
      } else {
        res.redirect('/campgrounds/' + req.params.id);
      }
  });
});

//  COMMENT DESTROY ROUTE
router.delete('/:comment_id', checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
     if(err){
        console.log('Error trying to delete comment: \n' + err);
        res.redirect("back");
     } else {
        res.redirect("/campgrounds/" + req.params.id);
     }
  });
});

//  Middleware that checks the comment ownership
function checkCommentOwnership(req, res, next){
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
function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
