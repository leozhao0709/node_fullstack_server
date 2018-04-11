"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passport_google_oauth2_1 = require("passport-google-oauth2");
var environment_1 = require("../environment/environment");
var express_1 = require("express");
var User_1 = require("../models/User");
exports.googleOauth = express_1.Router();
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User_1.User.findById(id)
        .then(function (user) {
        if (!user) {
            done(null, undefined);
        }
        done(null, user);
    })
        .catch(function (err) { return done(err); });
});
passport.use(new passport_google_oauth2_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || environment_1.environment.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || environment_1.environment.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
}, function (_0, _1, profile, done) {
    var id = profile.id, email = profile.email;
    User_1.User.findOne({ googleId: id })
        .then(function (exisingUser) {
        if (!exisingUser) {
            var user = new User_1.User({ email: email, googleId: id, source: User_1.UserSource.GOOGLE_OAUTH });
            user.save()
                .then(function (doc) { return done(null, doc); })
                .catch(function (err) { return done(err); });
        }
        done(null, exisingUser);
    })
        .catch(function (err) {
        done(err);
    });
}));
exports.googleOauth.get('/', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
exports.googleOauth.get('/callback', passport.authenticate('google'), function (req, res) {
    if (req.user) {
        return res.redirect('/');
    }
    res.redirect('/');
});
exports.googleOauth.get('/current_user', function (req, res) {
    // res.send(req.session);
    res.send(req.user);
});
exports.googleOauth.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
