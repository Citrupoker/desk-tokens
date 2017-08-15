var JwtStrategy = require('passport-jwt').Strategy;  
var ExtractJwt = require('passport-jwt').ExtractJwt;  
var Client = require('../models/Client');
require('dotenv').config()
// Setup work and export for the JWT passport strategy
module.exports = function(passport) {  
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = process.env.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    Client.findOne({id: jwt_payload.id}, function(err, client) {
      if (err) {
        return done(err, false);
      }
      if (client) {
        done(null, client);
      } else {
        done(null, false);
      }
    });
  }));
};