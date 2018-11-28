const assert = require('assert');
const User = require('../models/user');
const Category = require('../models/category');
const Checklist = require('../models/checklist');
const moment = require('moment');

describe('Updating records', () => {
  let pierva, category, checklist;

  beforeEach((done) => {
    pierva = new User({username: 'Pierva'});
    category = new Category({name: 'Marine'});
    checklist = new Checklist({name: 'Take over'});

    Promise.all([pierva.save(), category.save(), checklist.save()])
      .then(() => done());
  });

  it('Update the user admin rights', (done) => {
    User.findByIdAndUpdate(pierva._id, {isAdmin: true})
      .then(() => User.findOne({username: 'Pierva'}))
      .then((user) => {
        assert(user.isAdmin === true);
        done();
      });
  });

  it('Update the category name', (done) => {
    Category.findOneAndUpdate({name: 'Marine'}, {name: 'Marine Ops'})
      .then(() => Category.findById(category._id))
      .then((categ) => {
        assert(categ.name === 'Marine Ops');
        done();
      });
  });

  it('Update the checklist values', (done) => {
    Checklist.findByIdAndUpdate(checklist._id, {values: {"location": "At Sea"}})
      .then(() => Checklist.findOne({name: 'Take over'}))
      .then((checkl) => {
        assert(checkl.values.location === 'At Sea');
        done();
      });
  });
});
