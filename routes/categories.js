const CategoriesController = require('../controllers/categories-controller'),
      navBarConfig         = require('../controllers/config-controller');


module.exports = (app) => {
  app.post('/api/categories/:id', CategoriesController.addChecklist, navBarConfig.updateNavBarDropDown);
  app.put('/api/categories/:id/checklists/:checklist_id', CategoriesController.updateChecklist, navBarConfig.updateNavBarDropDown);
  app.delete('/api/categories/:id/checklists/:checklist_id', CategoriesController.deleteChecklist, navBarConfig.updateNavBarDropDown);
}
