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
          checklistOptions[name] = {};
          checklistOptions[name].checklists = _.map(foundCategory.checklists,
                _.partial(_.ary(_.pick,2), _, ['name', 'code']));
          checklistOptions[name].categoryId = foundCategory._id;
        });
        req.app.locals.navOptions = checklistOptions;
        next();
      }
    });
  }
}
