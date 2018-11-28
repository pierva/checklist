const Checklist  = require('../../models/checklist'),
      Category   = require('../../models/category'),
      _          = require('lodash');


let checklistOptions = {};

Category.find({}, (err, categories) => {
  if(err){
    console.log(err);
  }else {
    categories.forEach(function(foundCategory){
      let name = foundCategory.name;
      checklistOptions[name] = _.map(foundCategory.checklists, 'name');
      console.log(checklistOptions);
    });
  }
});

module.exports = checklistOptions;
