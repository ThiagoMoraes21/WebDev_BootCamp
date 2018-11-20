var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo', { useNewUrlParser: true });

//  POST - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String
});

var Post = mongoose.model("Post", postSchema);


//  USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

//  Create a new user and save to the DB
// var newUser = new User({
//   email: "emilly@gmail.com",
//   name: "Emilly Sanches"
// });
//
// newUser.posts.push({
//   title: "How to become a hacker!",
//   content: "Just kidding. Go back to college!"
// });
//
// newUser.save(function(err, user){
//   if (err){
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

//  Create a new post and save it to the DB
// var newPost = new Post({
//   title: "Reflections about apples",
//   content: "They are delicius!"
// });
//
// newPost.save(function(err, post){
//   if (err){
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });


// Add more post contents to a existent user
User.findOne({name: "Emilly Sanches"}, function(err, user){
  if(err){
    console.log(err);
  } else {
    user.posts.push({
      title: "How to find answers when you're stuck in code",
      content: "Go to stack overflow!"
    });
    user.save(function(err, user){
      if(err){
        console.log("Save" + err);
      } else {
        console.log(user);
      }
    });
  }
});
