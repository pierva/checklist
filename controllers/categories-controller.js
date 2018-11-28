const Category = require('../models/category');
const Checklist = require('../models/checklist-schema');

module.exports = {

 /*
  This is the working method that returns the whole parent document.
 */
  // addChecklist(req, res, next){
  //   const checklistProps = req.body.checklist;
  //   Category.findById(req.params.id)
  //     .then((category) => {
  //       category.checklists.push(checklistProps);
  //       category.save()
  //         .then(updatedCategory => res.send(updatedCategory))
  //         .catch(next);
  //     });
  // },

/*
  This is the ideal solution (not working as I can't create a new Instance of a non constructor schema),
  where ideally the promises solve sending back an object with the parent category and the newly checklist
*/
  addChecklist(req, res, next){
    const checklistProps = req.body.checklist;
    Category.findById(req.params.id)
      .then((category) => {
        const checklist = new Checklist(checklistProps); //This line is wrong
        category.checklists.push(checklistProps);
        Promise.all([checklist.save(), category.save()])
          .then((newValues) => {
              res.send({checklist: newValues[0], category: newValues[1]});
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
          "checklists.$": checklistProps
      }
    }, {new: true})
      .then((category) => {
        //the below line doesn't work because the updated checklist has a different id
        const checklist = category.checklists.id(checklistId);
        console.log(checklistId);
        res.send(checklist); //I need to send back the updated checklist
      })
      .catch(next);
  }


};
