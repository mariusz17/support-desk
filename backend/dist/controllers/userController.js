"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const registerUser = (req, res) => {
    res.send("Register route");
};
exports.registerUser = registerUser;
const loginUser = (req, res) => {
    res.send("Login route");
};
exports.loginUser = loginUser;
