const express    = require('express'),
      router     = express.Router(),
      middleware = require('../middleware'),
      Checklist  = require('../models/checklist');
      Category   = require('../models/category');


router.get("/:id/checklist/new", middleware.isAdmin, (req, res) => {
  Category.findById(req.params.id, (err, foundCategory) =>{
    if(err){
      req.flash("error", "Something went wrong. Please try again.");
      res.redirect("back");
    }else{
      res.json(foundCategory);
    }
  });
});

//Create a new checklist
router.post("/:id/checklists", middleware.isAdmin, (req, res) =>{
  Category.findById(req.params.id, (err, category) =>{
    if(err || !category){
      req.flash("error", "Category not found.");
      res.redirect("back");
    } else {
      Checklist.create(req.body.checklist, (err, checklist) =>{
        if(err){
          req.flash("error", "Something went wrong while saving to the db.");
          res.redirect('back');
        } else{
          checklist.author.id = req.user._id;
          checklist.author.username = req.user._username;
          checklist.category = {
              id: category._id,
              name: category.name
            };
          checklist.save();
          category.checklists.push(checklist);
          category.save();
          if(req.xhr){
            res.json(checklist);
          }else{
            req.flash("success", "Checklist successfully inserted.");
            res.redirect("back");
          }
        }
      });
    };
  });
});

router.put("/:id/checklists/:checklist_id", middleware.isAdmin, (req, res) =>{
  Category.findById(req.params.id, (err, category) =>{
    if(err || !category){
      req.flash("error", "Category not found.");
      res.redirect("back");
    } else {
      Checklist.findOneAndUpdate({"_id": req.params.checklist_id}, req.body.checklist, {new: true}, function(err, checklist){
        if(err){
          req.flash("error", "Something went wrong while saving to the db.");
          res.redirect('back');
        } else{
          checklist.author.id = req.user._id;
          checklist.author.username = req.user._username;
          checklist.category = {
              id: category._id,
              name: category.name
            };
          checklist.save();
          category.checklists.push(checklist);
          category.save();
          if(req.xhr){
            res.json(checklist);
          }else{
            req.flash("success", "Checklist successfully updated.");
            res.redirect("back");
          }
        }
      });
    };
  });
});

router.delete("/:id/checklists/:checklist_id", middleware.isAdmin, (req, res)=>{
  Checklist.findOneAndDelete({"_id": req.params.checklist_id}, (err, checklist) => {
    if(err || !checklist){
      req.flash("error", "An error occurred while processing your request. Unable to remove the selected checklist.");
      res.redirect('back');
    } else {
      Category.findById(req.params.id, (err, category) => {
        if(err){
          req.flash("error", "An error occurred while processing your request. Unable to remove the selected checklist.");
          res.redirect('back');
        } else {
          category.checklists.forEach(function(refChecklist, index){
            if(req.params.checklist_id === refChecklist){
              category.checklists.splice(index);
            }
          });
        }
      })
      res.json(checklist);
    }
  });
});

module.exports = router;
