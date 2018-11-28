const assert = require('assert');
const Category = require('../models/category');

describe('Subdocuments', () => {
  it('can create a subdocument (checklist)', (done) => {
    const category = new Category({name: 'Marine', checklists:
          [{name: "Take Over The Watch", code: "MAR01"}, {name: "Arrival", code: "MAR02"}]
    });

    category.save()
      .then(() => Category.findOne({name: 'Marine'}))
      .then((category) => {
        assert(category.checklists[0].code === "MAR01");
        done();
      });
  });

  it('Can add subdocuments to an existing record', (done) => {
    const category = new Category({
      name: 'Marine',
      posts: []
    });

    category.save()
    //The below line is similar to write .then(() => {return User.findOne({name: 'Joe'})})
    //if we omit the curly braces, when using arrow function, the return is implicit
      .then(() => Category.findOne({name: 'Marine'}))
      .then((categ) => {
        categ.checklists.push({name: 'Take Over The Watch'});
        return categ.save();
      })
      .then(() => Category.findOne({name: 'Marine'}))
      .then((categ) => {
        assert(categ.checklists[0].name === 'Take Over The Watch');
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
    const category = new Category({
      name: 'Marine',
      checklists: [{name: "Take Over The Watch"}]
    });

    category.save()
      .then(() => Category.findOne({name: 'Marine'}))
      .then((categ) => {
        categ.checklists[0].remove();
        return categ.save();
      })
      .then(() => Category.findOne({name: 'Marine'}))
      .then((categ) => {
        assert(categ.checklists.length === 0);
        done();
      });
  });
});
