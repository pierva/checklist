const express    = require('express'),
      router     = express.Router(),
      middleware = require('../middleware'),
      Category   = require('../models/category');

//INDEX >>> Show the home page
router.get("/", middleware.isLoggedIn, (req, res) => {
    res.render("settings/index", {page: "settings"});
});

//CATEGORIES >>> Show the category setup page
router.get("/categories", middleware.isAdmin, (req, res) => {
  Category.find({})
    .populate('checklists')
    .exec((err, categories) => {
    if(err){
      return res.redirect('back', {"error" : "Unable to retrieve categories from the database."});
    } else {
      req.xhr ? res.json(categories) : res.render("settings/categories", {page: "categories", categories});
    }
  });
});

//CATEGORIES >>> handle new category insert
router.post("/categories", (req, res) =>{
  const categoryName = req.body.categoryName;
  const author = {
    id: req.user._id,
    username: req.user.username
  }
  const newCategory = new Category({name: categoryName, author});
  //Check if category already exists
  Category.find({name: {$regex: /categoryName/i} }, (err, foundCategory) => {
    if(err){
      return res.redirect("/categories", {"error": err.message});
    } else{
      //if category not present create a new one
      if(foundCategory.length === 0 || !foundCategory){
        Category.create(newCategory, (err, category) =>{
          if(err){
            return res.redirect("back", {"error": err.message});
          }
          if(req.xhr){
            res.json(category);
          }
          else{
            req.flash("success", `New category ${category.name} created at ${category.createdAt}.`);
            res.redirect("back");
          }
        });
      //if category already exists show error
      }else{
        req.flash("error", "A category with similar name already exists. Please change the name and try again.");
        res.redirect('back');
      }
    }
  });
});

router.delete("/categories/:id", middleware.isAdmin, (req, res) => {
  Category.findOneAndDelete({'_id': req.params.id}, (err, category) => {
    if(err || !category){
      req.flash("error", "An error occurred while processing your request. Unable to remove the selected category.");
    } else{
      res.json(category);
    }
  });
});

module.exports = router;
