const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../models/user');
const Category = require('../models/category');
const Checklist = require('../models/checklist');

describe('Associations', () => {
  let pierva, category, checklist;
  beforeEach((done) => {
    pierva = new User({username: 'Pierva'});
    category = new Category({name: 'Marine', createdAt: new Date()});
    checklist = new Checklist({category: 'Marine', name: 'Take Over The Watch', code: 'MAR01'});

    category.checklistsCompleted.push(checklist);
    checklist.author.id = pierva;
    checklist.author.username = pierva.name;

    Promise.all([pierva.save(), category.save(), checklist.save()])
      .then(() => done());
  });

  it('saves a relation between a category, checklist and user', (done) => {
    Category.findOne({name: 'Marine'})
      .populate('checklistsCompleted')
      .then((categ) => {
        assert(categ.checklistsCompleted[0].code === 'MAR01');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    Category.findOne({ name: 'Marine'})
      .populate({
        path: 'checklistsCompleted',
        populate: {
          path: 'author.id',
          model: 'User'
        }
      })
      .then((categ) => {
        assert(categ.name === 'Marine');
        assert(categ.checklistsCompleted[0].name === 'Take Over The Watch');
        assert(categ.checklistsCompleted[0].author.id.username === 'Pierva');
        done();
      })
  })
});
