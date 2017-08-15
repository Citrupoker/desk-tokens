var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var Employer = require('../models/Employer');
// Register new users
router.post('/register', function(req, res) {
    if(!req.body.email || !req.body.password) {
        res.json({ success: false, message: 'Please enter email and password.' });
    } else {
        var newEmployer = new Employer({
            email: req.body.email,
            password: req.body.password
        });

        // Attempt to save the user
        newEmployer.save(function(err) {
            if (err) {
                return res.json({ success: false, message: 'That email address already exists.'});
            }
            res.json({ success: true, message: 'Successfully created new employer.' });
        });
    }
});

router.post('/authenticate', function(req, res) {
    Employer.findOne({
        email: req.body.email
    }, function(err, employer) {
        if (err) throw err;

        if (!employer) {
            res.send({ success: false, message: 'Authentication failed. Employer not found.' });
        } else {
            // Check if password matches
            employer.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(employer, process.env.secret, {
                        expiresIn: 10080 // in seconds
                    });
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
            });
        }
    });
});

router.get('/employer', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
});

module.exports = router;
