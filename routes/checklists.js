const express    = require('express');
const router     = express.Router();
const middleware = require('../middleware');


//INDEX >>> Show the home page
router.get("/", (req, res) => {
  res.render("checklists/", {page: "home"});
});

router.get("/:category", (req, res) => {
  const category = req.params.category;
  Category.find({"name": new RegExp(category, "i")})
    .populate('checklistsCompleted')
    .exec((err, category) => {
    if(err){
      return res.redirect('back', {"error" : "Unable to retrieve checklists for this category from the database."});
    } else {
      res.render("checklists/checklist-list", {page: category[0].name, category});
    }
  });
});

router.get("/:categoryId/:code", (req, res) => {
  var code = req.params.code;
  var categoryId = req.params.categoryId;
  res.render(`templates/${code}`, {page: {code: code, categoryId: categoryId}});
});

router.get("/technical", (req, res) => {
  res.render("checklists/technical", {page: "technical"});
});

router.get("/marine/emergency", (req, res) => {
  res.render("checklists/marine-emergency", {page: "marineEmergency"});
});

router.get("/technical/emergency", (req, res) => {
  res.render("checklists/technical-emergency", {page: "technicalEmergency"});
});


module.exports = router;
