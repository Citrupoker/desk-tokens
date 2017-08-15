var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var EmployerSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Employer', 'Admin'],
        default: 'Employer'
    }
});

// Saves the user's password hashed (plain text password storage is not good)
EmployerSchema.pre('save', function (next) {
    var employer = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(employer.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                employer.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Create method to compare password input to password saved in database
EmployerSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Employer', EmployerSchema);