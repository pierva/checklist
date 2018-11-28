const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//before is only executed one time for the entire test cases
before((done) => {
  mongoose.connect('mongodb://localhost/checklists_test', {useNewUrlParser: true});
  mongoose.set('useFindAndModify', false); //avoids the deprecation warning when updating records
  mongoose.connection
  .then(() => { done();})
  .catch((error) => console.warn('Warning', error))
  after(done => {
    mongoose.connection.close(() => done());
  });
});

// Hook function - it will be executed before any test
beforeEach((done) => {
  const { users, categories, checklists } = mongoose.connection.collections;
  users.drop(() => {
    categories.drop(() => {
      checklists.drop(() => {
        done();
      });
    });
  });
  //Ready to run the next test!
});
