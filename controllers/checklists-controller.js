const ChecklistInstance = require('../models/checklist');
const Category = require('../models/category');

module.exports = {

  addChecklistInstance(req, res){
    const code = req.params.code;
    const checklistProps = req.body.checklist;
    const author = {
      id: req.user._id,
      username: req.user.username
    }
    const newChecklist = new ChecklistInstance({
      code,
      author,
      values: checklistProps.values});
    //find category
    Category.findById(req.params.categoryId)
      .then((category) => {
        category.checklistsCompleted.push(newChecklist);
        Promise.all([category.save(), newChecklist.save()])
          .then((newCategory) => {
            req.flash("success", `${code} checklist successfully saved.`);
            res.redirect("back");
          })
          .catch(err => {
            return res.redirect("back", {"error": err.message});
          });
      });
  },

  deleteChecklistInstance(req, res, next){
    const checklistId = req.params.checklist_id;
    ChecklistInstance.findById(checklistId)
      .then((checklist) => {
        if(checklist !== null){
          checklist.remove();
          next();
        } else {
          res.status(404).send('Invalid checklist id.');
          next();
        }
      });
  },

  updateChecklistInstance(req, res, next){
    const checklistId = req.params.id;
    const checklistProps = req.body;
  }

}
