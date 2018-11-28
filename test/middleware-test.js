const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../models/user');
const Category = require('../models/category');
const Checklist = require('../models/checklist');


describe('Deleting a category', () => {
  let pierva, category, checklist
  beforeEach((done) => {
    pierva = new User({username: 'Pierva'});
    category = new Category({name: 'Marine'});
    checklist = new Checklist({name: 'Take over the watch'});

    category.checklistsCompleted.push(checklist);
    checklist.author.id = pierva;
    checklist.author.username = pierva.name;

    Promise.all([pierva.save(), category.save(), checklist.save()])
      .then(() => done());
    });

    it('deletes the category', (done) => {
      category.remove()
        .then(() => Category.findOne({name: 'Marine'}))
          .then((category) => {
            assert(category === null);
            done();
          });
    });

    it('deletes all the checklists inside the category', (done) => {
      category.remove()
        .then(() => Checklist.countDocuments())
          .then((count) => {
            assert(count === 0);
          })
        .then(() => Checklist.findOne({name: 'Take over the watch'}))
          .then((checklist) => {
            assert(checklist === null);
            done();
          });
    });
});
