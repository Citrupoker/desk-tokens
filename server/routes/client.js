var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var Client = require('../models/Client');
// Register new users
router.post('/register', function(req, res) {  
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newClient = new Client({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newClient.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new client.' });
    });
  }
});

router.post('/authenticate', function(req, res) {  
  Client.findOne({
    email: req.body.email
  }, function(err, client) {
    if (err) throw err;

    if (!client) {
      res.send({ success: false, message: 'Authentication failed. Client not found.' });
    } else {
      // Check if password matches
      client.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(client, process.env.secret, {
            expiresIn: 60*60*24 // in seconds
          });
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json({ success: true, status: 1 });
});

module.exports = router;
