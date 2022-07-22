var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var AccountSchema = new Schema({


  userName: {
        type: String,
        required: false,
        unique: true,
    },
  email: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'super-admin'],
        default: 'admin'
    },
});

AccountSchema.pre('save', function (next) {
    var account = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(account.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                account.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});


AccountSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};




module.exports = mongoose.model('Account', AccountSchema);