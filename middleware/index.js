//middlewares
const User         = require("../models/user");
const Category         = require("../models/category");
var middlewareObj  = {};

middlewareObj.isLoggedIn = function (req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "Please login to access the page.");
  res.redirect("/");
}

middlewareObj.isFirstUser = function(req, res, next){
  User.find({}, (err, users) =>{
    if(err){
      req.flash("error", "An error occurred while connecting to the database.");
      res.redirect("back");
    } else {
      if(!users){
        return next()
      }
    }
  });
  if(req.isAuthenticated() && req.user.isAdmin){
    return next();
  }
  req.flash("error", "Not sufficient rights to access the page. Please login with admin credentials.");
  res.redirect("back");
}

middlewareObj.isAdmin = function(req, res, next){
  //check if no user is registered allow registration without admin rights;
  if(req.isAuthenticated() && req.user.isAdmin){
    return next();
  }
  req.flash("error", "Not sufficient rights to access the page. Please login with admin credentials.");
  res.redirect("back");
}


module.exports = middlewareObj;
