var express        = require('express'),
    app            = express(),
    port           = process.env.PORT || 3000,
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    LocalStrategy  = require('passport-local'),
    User           = require('./models/user'),
    Campground     = require('./models/campground'),
    seedDB         = require('./seeds'),
    Comment        = require('./models/comment'),
    methodOverride = require('method-override'),
    flash          = require('connect-flash');

//  requesting routers
var commentRoutes    = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes      = require('./routes/index');

// mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });
mongoose.connect('mongodb://thiago:323Sowhat@ds255784.mlab.com:55784/yelpcamp', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(flash());
app.use(require('express-session')({  // passport config
  secret: 'Bob is the best dog of the world!',
  resave: false,
  saveUninitialized: false
}));
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error =  req.flash('error');
  res.locals.success =  req.flash('success');
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
//  require passport methods for authentication
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// remove existent campgrounds and recreate them
// seedDB();

//  requiring routes
app.use('/campgrounds/:id/comments',commentRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/', indexRoutes);

//  ERROR 404 PAGE NOT FOUND
app.get("*", function(req, res){
  res.render('notFound');
});

app.listen(port, process.env.IP, function(){
  console.log("Server is running at port " + port);
});
