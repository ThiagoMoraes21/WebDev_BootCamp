var express = require('express'),
    app = express(),
    port  = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverrid = require('method-override'),
    expressSanitizer = require('express-sanitizer');

//  APP CONFIG
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.static('public'));
app.use(methodOverrid('_method'));
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
  req.body.blog.body = req.sanatize(req.body.blog.bory);
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

//  show route
app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if (err) {
      console.log(err);
      res.send("BLOG POST NOT FOUND");
    } else {
      res.render("show", {blog: foundBlog});
    }
  });
});

//  edit route
app.get("/blogs/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if (err) {
      console.log(err);
      res.redirect("/blogs");
    } else {
      // render the edit form
      res.render("edit", {blog: foundBlog});
    }
  });
});

//  update route
app.put("/blogs/:id", function(req, res){
  req.body.blog.body = req.sanatize(req.body.blog.bory);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if (err){
      console.log(err);
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

//  delete route
app.delete("/blogs/:id", function(req, res){
  // destroy blog
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});

//  404 erro handling route
app.get("*", function(req, res){
  res.send("ERROR 404 (PAGE NOT FOUND)");
});

app.listen(port, function() {
  console.log("Server is running at port: " + port);
});
