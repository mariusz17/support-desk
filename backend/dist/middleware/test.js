"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test = (err, req, res, next) => {
    console.log("test test test test");
    next();
};
exports.default = test;
