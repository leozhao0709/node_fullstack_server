"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../models/User");
var auth_1 = require("../middleware/auth");
exports.usersApi = express_1.Router();
exports.usersApi.post('/', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password, source = _a.source;
    var user = new User_1.User({ email: email, password: password, source: source });
    user.generateAuthToken()
        .then(function (token) {
        res.header('x-auth', token).send(user);
    })
        .catch(function (err) {
        res.status(400).send(err);
    });
});
exports.usersApi.get('/me', auth_1.auth, function (req, res) {
    res.send(req.user);
});
exports.usersApi.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    User_1.User.findByCrediential(email, password)
        .then(function (user) {
        return user.generateAuthToken().then(function (token) {
            res.header('x-auth', token).send(user);
        });
    })
        .catch(function (_) {
        res.status(400).send();
    });
});
exports.usersApi.delete('/me/token', auth_1.auth, function (req, res) {
    req.user.removeToken(req.params.token).then(function () {
        res.status(200).send();
    }).catch(function (_) {
        res.status(400).send();
    });
});
