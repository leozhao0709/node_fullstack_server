"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = require('../config/env.json');
if (process.env.NODE_ENV === 'production') {
    var prodEnv = require('../config/env.prod.json');
    exports.environment = __assign({}, exports.environment, prodEnv);
}
else if (process.env.NODE_ENV === 'test') {
    var testEnv = require('../config/env.test.json');
    exports.environment = __assign({}, exports.environment, testEnv);
}
