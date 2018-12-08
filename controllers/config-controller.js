const Category   = require('../models/category'),
      _          = require('lodash');


module.exports ={

  updateNavBarDropDown(req, res, next) {
    Category.find({}, (err, categories) => {
      let checklistOptions = {};
      if(err){
        console.log(err);
        next();
      }else {
        categories.forEach(function(foundCategory){
          let name = foundCategory.name;
          checklistOptions[name] = _.map(foundCategory.checklists, 'name');
        });
        req.app.locals.navOptions = checklistOptions;
        next();
      }
    });
  }
}
