var express = require('express'),
    app = express(),
    port  = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

//  APP CONFIG
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//  MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//  RESTIFUL ROUTES
app.get("/", function(req, res){
  res.redirect("/blogs");
});

//  index route
app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if (err){
      console.log(err);
    } else {
      res.render("index", {blogs: blogs});
    }
  });
});

//  new route
app.get("/blogs/new", function(req, res){
  res.render("new");
});

//  create route
app.post("/blogs", function(req, res){
  //  create blog
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      console.log(err);
      //  reload the new page
      res.render("new");
    } else {
      //  redirect to the indexs
      res.redirect("/blogs");
    }
  });
});

app.listen(port, function() {
  console.log("Server is running at port: " + port);
});
