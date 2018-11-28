const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../models/user');
const Checklist = require('../models/checklist');

describe('Deleting a user', () => {
  let pierva;

  beforeEach((done) => {
    pierva = new User({username: 'Pierva'});
    pierva.save()
      .then(() => done());
  });

  it('remove the model instance', (done) => {
    pierva.remove()
      .then(() => User.findOne({username: 'Pierva'}))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('class method remove', (done) => {
    User.deleteOne({username: 'Pierva'})
      .then(() => User.findOne({username: 'Pierva'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndDelete({_id: pierva._id})
      .then(() => User.findOne({username: 'Pierva'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});

describe('Deleting a checklist', () => {
  const checklist = new Checklist({name: 'Take over'});
  it('deletes a checklist', (done) => {

  Checklist.findByIdAndDelete({_id: checklist._id})
    .then(() => Checklist.findOne({name: 'Take over'}))
      .then((check) => {
        assert(check === null);
        done();
      });
  })
});
