"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("../db/mongoose");
var validator = require("validator");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var environment_1 = require("../environment/environment");
var UserSource;
(function (UserSource) {
    UserSource["SIGNUP"] = "signUp";
    UserSource["GOOGLE_OAUTH"] = "googleOauth";
})(UserSource = exports.UserSource || (exports.UserSource = {}));
var userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{Value} is not a valid email'
        }
    },
    password: {
        type: String,
        required: [passwordRequiredValidator, 'password is required'],
        minlength: 6
    },
    googleId: {
        type: String,
        required: googleIdRequiredValidator
    },
    tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            },
            expired: {
                type: Date,
                default: function () { return Date.now() + 7 * 24 * 3600 * 1000; }
            }
        }],
    source: {
        type: String,
        required: true,
        trim: true,
        validate: function (source) { return Object.values(UserSource).includes(source); },
    }
});
function passwordRequiredValidator() {
    return this.source === UserSource.SIGNUP;
}
function googleIdRequiredValidator() {
    return this.source === UserSource.GOOGLE_OAUTH;
}
userSchema.pre('save', function (next) {
    var user = this;
    if (user.password && user.isModified('password')) {
        bcrypt.genSalt(10)
            .then(function (salt) {
            return bcrypt.hash(user.password, salt);
        })
            .then(function (hash) {
            user.password = hash;
            next();
        })
            .catch(function (err) {
            return Promise.reject(err);
        });
    }
    else {
        next();
    }
});
userSchema.methods.toJSON = function () {
    var user = this;
    var _id = user._id, email = user.email;
    return { _id: _id, email: email };
};
userSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull: {
            tokens: { token: token }
        }
    });
};
userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id, access: access }, environment_1.environment.AUTH_SECRET);
    user.tokens = user.tokens.concat([{ access: access, token: token }]);
    return user.save().then(function () {
        return token;
    }).catch(function (err) {
        return Promise.reject(err);
    });
};
userSchema.statics.findByToken = function (token) {
    var user = this;
    var decode;
    try {
        decode = jwt.verify(token, environment_1.environment.AUTH_SECRET);
    }
    catch (error) {
        return Promise.reject(error);
    }
    var _a = decode, _id = _a._id, access = _a.access;
    return user.findOne({
        _id: _id,
        'tokens.token': token,
        'tokens.access': access,
        'tokens.expired': {
            $gte: Date.now()
        }
    });
};
userSchema.statics.findByCrediential = function (email, password) {
    var user = this;
    var notFoundMessage = { error: 'no user find' };
    return user.findOne({ email: email }).then(function (doc) {
        if (!doc) {
            return Promise.reject(notFoundMessage);
        }
        return bcrypt.compare(password, doc.password)
            .then(function (result) {
            if (result) {
                return Promise.resolve(doc);
            }
            return Promise.reject(notFoundMessage);
        }).catch(function (err) {
            return Promise.reject(err);
        });
    }).catch(function (err) {
        return Promise.reject(err);
    });
};
exports.User = mongoose_1.default.model('User', userSchema);
