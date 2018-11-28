const CategoriesController = require('../controllers/categories-controller');

module.exports = (app) => {
  app.post('/api/categories/:id', CategoriesController.addChecklist);
  app.put('/api/categories/:id/checklists/:checklist_id', CategoriesController.updateChecklist);
  app.delete('/api/categories/:id/checklists/:checklist_id', CategoriesController.deleteChecklist);
}
