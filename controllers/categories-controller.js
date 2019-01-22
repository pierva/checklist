const Category = require('../models/category');

module.exports = {

  addChecklist(req, res, next){
    const checklistProps = req.body.checklist;
    Category.findById(req.params.id)
      .then((category) => {
        category.checklists.push(checklistProps);
        category.save()
          .then((updatedCategory) => {
            let out = {};
            const index = updatedCategory.checklists.length-1;
            out.category = updatedCategory;
            out.checklist = updatedCategory.checklists[index];
            res.send(out);
          })
          .catch(next);
      });
  },

  deleteChecklist(req, res, next){
    const categoryId = req.params.id;
    const checklistId = req.params.checklist_id;
    Category.findById(categoryId)
      .then((category) => {
        const checklist = category.checklists.id(checklistId);
        if(checklist !== null){
          checklist.remove();
          category.save()
            .then(updatedCategory => res.send(updatedCategory))
            .catch(next);
        } else {
          res.status(404).send('Invalid checklist id.');
          next();
        }
      });
  },

  updateChecklist(req, res, next){
    const categoryId = req.params.id;
    const checklistId = req.params.checklist_id;
    const checklistProps = req.body;
    Category.findOneAndUpdate({ "_id": categoryId, "checklists._id": checklistId},
      {
        "$set": {
          "checklists.$": checklistProps.checklist
      }
    }, {new: true})
      .then((category) => {
        let out = {};
        const index = category.checklists.length-1;
        out.category = category;
        out.checklist = category.checklists[index];
        res.send(out);
      })
      .catch(next);
  }
};
