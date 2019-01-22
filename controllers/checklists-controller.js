const ChecklistInstance = require('../models/checklist');

module.exports = {

  addChecklistInstance(req, res){
    const checklistProps = req.body.checklist;
    const author = {
      id: req.user._id,
      username: req.user.username
    }
    //find category
    const newChecklist = new ChecklistInstance({
        code: checklistProps.code,
        author: author,
        values: checklistProps.values});
    newChecklist.save((err, checklist) => {
      if(err){
        return res.redirect("back", {"error": err.message});
      }
      else{
        console.log(checklist);
        req.flash("success", `${checklist.code} checklist successfully saved.`);
        res.redirect("back");
      }
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
