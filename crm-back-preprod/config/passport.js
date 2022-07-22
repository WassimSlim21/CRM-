var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the Account model
var Account = require('../models/account');
var config = require('../config/database'); // get db config file

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    Account.findOne({id: jwt_payload.id}, function(err, account) {
          if (err) {
              return done(err, false);
          }
          if (account) {
              done(null, account);
          } else {
              done(null, false);
          }
      });
  }));
};