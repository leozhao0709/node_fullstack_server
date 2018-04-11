"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var environment_1 = require("./environment/environment");
var usersApi_1 = require("./api/usersApi");
var google_1 = require("./oauth/google");
var passport = require("passport");
var cookieSession = require("cookie-session");
var port = process.env.PORT || environment_1.environment.PORT;
exports.app = express();
exports.app.use(bodyParser.json());
exports.app.use(cookieSession({
    name: 'session',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [environment_1.environment.COOKIE_KEY]
}));
exports.app.use(passport.initialize());
exports.app.use(passport.session());
// oauth
exports.app.use('/auth/google', google_1.googleOauth);
// api
exports.app.use('/users', usersApi_1.usersApi);
exports.app.listen(port, function () {
    // tslint:disable-next-line:no-console
    console.log("Server is up on " + port);
});
