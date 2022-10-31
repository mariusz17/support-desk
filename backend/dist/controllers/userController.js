"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
//@desc		Register a new user
//@route	/api/users
//@access	Public
const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please include all fields");
    }
    res.send("Register route");
};
exports.registerUser = registerUser;
//@desc		Login a user
//@route	/api/users/login
//@access	Public
const loginUser = (req, res) => {
    res.send("Login route");
};
exports.loginUser = loginUser;
