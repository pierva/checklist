var express      = require("express"),
    router       = express.Router(),
    User         = require("../models/user"),
    middleware   = require("../middleware");


//GET ALL THE USERS
router.get("/", middleware.isAdmin, function(req, res){
  User.find({}, function(err, users){
    if(err){
        res.redirect("back");
      }else{
        res.json(users);
      }
    });
});

//UPDATE USER ADMIN RIGTHS
router.put("/:id", middleware.isAdmin, function(req, res){
  var admin = false;
  //find first the admin status
  User.findById(req.params.id, function(err, user){
    if(err){
      return res.redirect("back", {"error": "Unable to find the requested user."});
    } else {
      admin = user.isAdmin;
      User.findByIdAndUpdate(req.params.id, {$set: {isAdmin: !admin}}, {new: true}, function(err, user){
        if(err){
          return res.redirect("back", {"error": "An error occurred while processing your request. Unable to update that name."});
        }else {
          res.json(user);
          req.flash("success", "Admin rights for " + user.username + " successfully updated.");
        }
      });
    }
  });
});

//REMOVE USER
router.delete("/:id", middleware.isAdmin, function(req, res){
  User.findOneAndDelete({"_id": req.params.id}, function(err, user){
    if(err){
      return res.render("back", {"error": "An error occurred while processing your request. Unable to remove the selected user."});
    } else{
      res.json(user);
    }
  });
});


module.exports = router;
