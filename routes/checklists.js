const express    = require('express');
const router     = express.Router();
const middleware = require('../middleware');


//INDEX >>> Show the home page
router.get("/", (req, res) => {
  res.render("checklists/", {page: "home"});
});

router.get("/marine", (req, res) => {
  res.render("checklists/marine", {page: "marine"});
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
