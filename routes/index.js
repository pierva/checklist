const express      = require("express"),
      router       = express.Router(),
      passport     = require("passport"),
      User         = require("../models/user"),
      middleware   = require("../middleware"),
      navBarConfig = require("../controllers/config-controller");


//HOME >>> Landing page
router.get("/", (req, res) =>{
  //GET ALL THE USERS
  User.find({}, (err, users) => {
    if(err){
      req.flash("error", "Error while reading data from the database.");
      res.render("landing", {page: "landing"});
    } else {
      res.render("landing", {page: "landing", users: users.length});
    }
  });
});


//AUTH ROUTES
//show register form
router.get("/register", middleware.isFirstUser, (req, res) =>{
  res.render("register", {page: "register"});
});


//handle sign up logic
router.post("/register", middleware.isFirstUser, (req, res) =>{
  var newUser = new User({username: req.body.username});
  if(req.body.adminCode === process.env.ADMINCODE){
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, (err, user) =>{
    if(err){
      return res.render("register", {"error": err.message});
    }
    req.flash("success", "New user " + user.username + " successfully created.");
    res.redirect("back");
  });
});

//handle login logic
router.post("/login", navBarConfig.updateNavBarDropDown, passport.authenticate("local",
    {
      successRedirect: "/checklists",
      failureRedirect: "/",
      badRequestMessage : 'Invalid credentials.',
      failureFlash: true,
    }));

//logout route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully logged out!");
    res.redirect("/");
});


module.exports = router;
