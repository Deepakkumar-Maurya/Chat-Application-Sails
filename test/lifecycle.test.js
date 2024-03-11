var sails = require('sails');

// before function to execute before all tests
before((done) => {

  // Lift sails application
  sails.lift({

    hooks: { grunt: false },
    log: { level: 'warn' },

  }, (err) => {
    if (err) { return done(err); }
    return done();
  });
});

// after function to execute after all tests
after((done) => {
  sails.lower(done);
});
