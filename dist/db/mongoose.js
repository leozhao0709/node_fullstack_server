"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var environment_1 = require("../environment/environment");
mongoose.connect(process.env.MONGODB_URI || environment_1.environment.MONGODB_URI);
exports.default = mongoose;
