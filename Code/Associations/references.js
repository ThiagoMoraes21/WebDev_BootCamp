var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_reference', { useNewUrlParser: true });

//  POST - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String
});

//  Create a post model on DB
var Post = mongoose.model("Post", postSchema);


//  USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }]
});

//  Create a user model on DB
var User = mongoose.model("User", userSchema);

//  create and save a new user to the DB
User.create({
  email: "bob@gmail.com",
  name: "Bob Belcher"
});

// create a new post
Post.create({
  title: "How to cock the best burguer pt.3",
  content: "Let's take a look at how to cock the best burguer of your life!..."
}, function(err, post){
    if (err) {
      console.log("Create user error\n" + err);
    } else {
      // find the user
      User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
        if(err){
          console.log("Finding user error\n" + err);
        } else {
          //  take the post and push into the user posts array
          foundUser.posts.push(post);
          foundUser.save(function(err, data){ // save the user
            if (err) {
              console.log("Saving post error\n" + err);
            } else {
              console.log(data); // print out the saved post
            }
          });
        }
      });
    }
});

//  Query to retrive the data and fild in
//  the post array with all the data not only the Id's
User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
  if (err) {
    console.log("Query to find posts error: \n" + err);
  } else {
    console.log(user);
  }
});
