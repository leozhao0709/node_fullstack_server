"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var jwt = require("jsonwebtoken");
var environment_1 = require("../../environment/environment");
var User_1 = require("../../models/User");
var userOneId = new mongodb_1.ObjectID().toHexString();
var userTwoId = new mongodb_1.ObjectID().toHexString();
exports.users = [
    {
        _id: userOneId,
        email: 'testOne@test.com',
        password: 'testOne',
        tokens: [{
                access: 'auth',
                token: jwt.sign({ _id: userOneId, access: 'auth' }, environment_1.environment.AUTH_SECRET)
            }]
    },
    {
        _id: userTwoId,
        email: 'testTwo@test.com',
        password: 'testtwo'
    }
];
exports.populateUers = function () {
    return User_1.User.remove({}).then(function () {
        var userOne = new User_1.User(exports.users[0]).save();
        var userTwo = new User_1.User(exports.users[1]).save();
        return Promise.all([userOne, userTwo]);
    });
};
