const assert = require('assert');
const User = require('../models/user');
const Category = require('../models/category');
const Checklist = require('../models/checklist');
const moment = require('moment');

describe('Creating users', () => {
  it('saves a user', (done) => {
    const joe = new User({name: "Joe"});
    joe.save()
      .then(() => {
        //Has joe been saved successfully?
        assert(!joe.isNew);
        done();
      });
  });
  it('creates a user with admin rights', (done) => {
    const joe = new User({name: "Joe", isAdmin: true});
    joe.save()
      .then(() => {
        assert(joe.isAdmin);
        done();
      });
  });
});

describe('Create a category and checklist', () => {
  it('creates a category', (done) => {
    const category = new Category({name: "Marine", author:{username :'Pierva'}});
    category.save()
      .then((category) => {
        assert(category.name === 'Marine');
        done();
    });
  });

  it('creates a checklist', (done) => {
    const checklist = new Checklist({name: "Take over", code: "MAR01"});
    checklist.save()
      .then((checklist) => {
        assert(checklist.name === 'Take over');
        assert(moment(checklist.createdAt).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD"));
        done();
      });
  });
});
