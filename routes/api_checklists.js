const ChecklistController = require('../controllers/checklists-controller');


module.exports = (app) => {
  app.post('/api/:categoryId/:code', ChecklistController.addChecklistInstance);
  app.put('/api/:category/checklist/:id', ChecklistController.updateChecklistInstance);
  app.delete('/api/:category/checklist/:id', ChecklistController.deleteChecklistInstance);
}
