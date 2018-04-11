"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models/User");
exports.auth = function (req, res, next) {
    var token = req.header('x-auth');
    User_1.User.findByToken(token)
        .then(function (user) {
        if (!user) {
            throw 'user not found';
        }
        req.user = user;
        req.token = token;
        next();
    })
        .catch(function (_) {
        res.status(401).send();
    });
};
