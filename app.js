require('dotenv').config();

const express             = require('express'),
      app                 = express(),
      bodyParser          = require('body-parser'),
      expressSanitizer    = require('express-sanitizer'),
      mongoose            = require("mongoose"),
      flash               = require("connect-flash"),
      passport            = require("passport"),
      LocalStrategy       = require("passport-local"),
      User                = require("./models/user.js");


//Require the routes
const indexRoutes         = require("./routes/index");
const users               = require("./routes/users");
const checklists          = require("./routes/checklists");
const settings            = require("./routes/settings");
const settingsChecklists  = require("./routes/settings-checklists");
const categories          = require("./routes/categories");

const db_url = process.env.DATABASEURL;
mongoose.connect(db_url, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false); //avoid deprecation warning when updating records
mongoose.connection
  .then(() => {
    console.log("database ready to use");
  })
  .catch((err) => console.warn("Unable to connect to the db", err));

//express setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash()); //this line must come before the passport configuration

app.locals.moment = require('moment');

//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//this custom middleware make sure that we pass the user object to all the routes
//without send them manually on each route {currentUser: req.user}
//This middleware must be after the passport configuration
//Also we make the error and success messages accessible to all the routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error =  req.flash("error");
  res.locals.success =  req.flash("success");
  next();
});

//USE THE ROUTES
app.use(indexRoutes);
app.use("/checklists", checklists);
app.use("/settings", settings);
app.use("/settings/users", users);
app.use("/settings/categories", settingsChecklists);
categories(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err._message });
});

app.listen(3000, function(){
  console.log(`Server started on port 3000`);
});
