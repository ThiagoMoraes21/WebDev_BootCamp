var express = require('express'),
    app     = express(),
    mongoose  = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User = require('./models/user'),
    port = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost/auth_demo', { useNewUrlParser: true });
app.use(require('express-session')({
  secret: 'Bob is the best and custed dog in the world',
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=================
//  ROUTES
//=================
app.get('/', function(req, res){
  res.render('home');
});

app.get('/secret', isLoggedIn, function(req, res){
  res.render('secret');
});

//=================
//  AUTH ROUTES
//=================

//  show sing up form
app.get('/register', function(req, res){
  res.render('register');
});

//  handling user sign up
app.post('/register', function(req, res){
  User.register(
    new User({username: req.body.username}), req.body.password,
    function(err, user){
      if (err) {
        console.log(err);
        return res.render('register');
      }
      //  Uses local strategy, but you could use twitter or facebook
      //  strategy with some changes in the code
      passport.authenticate('local')(req, res, function(){
        res.redirect('/secret');
      });
    });
});

//=================
//  LOGIN ROUTES
//=================

//  render the login form
app.get('/login', function(req, res){
  res.render('login');
});

//  login logic
app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}), function(req, res){
  // write the callback here
});

// logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    // if user is authenticated execute the next parameter
    return next();
  }
  res.redirect('/login');
}

app.get('*', function(req, res){
  res.send("ERROR 404 (PAGE NOT FOUND)");
});

app.listen(port, function(){
  console.log('Server is running at port: ' + port);
});
