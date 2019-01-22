const ChecklistController = require('../controllers/checklists-controller');


module.exports = (app) => {
  app.post('/api/checklist', ChecklistController.addChecklistInstance);
  app.put('/api/checklist/:id', ChecklistController.updateChecklistInstance);
  app.delete('/api/checklist/:id', ChecklistController.deleteChecklistInstance);
}
