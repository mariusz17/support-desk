"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const config_1 = require("../config/config");
//@desc		Register a new user
//@route	/api/users
//@access	Public
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // Validation
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please include all fields");
        }
        // Find if user already exists
        const userExists = await userModel_1.default.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const hashedPassword = await (0, bcryptjs_1.hash)(password, salt);
        // Create user
        const user = await userModel_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
        else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    }
    catch (e) {
        next(e);
    }
};
exports.registerUser = registerUser;
//@desc		Login a user
//@route	/api/users/login
//@access	Public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            res.status(400);
            throw new Error("Please include all fields");
        }
        const user = await userModel_1.default.findOne({ email });
        // Check user and passwords match
        if (user && (await (0, bcryptjs_1.compare)(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
        else {
            res.status(401);
            throw new Error("Invalid credentials");
        }
    }
    catch (e) {
        next(e);
    }
};
exports.loginUser = loginUser;
//@desc		Get current user
//@route	/api/users/me
//@access	Private
const getMe = async (req, res, next) => {
    try {
        const user = {
            id: req.body.user._id.toString(),
            email: req.body.user.email,
            name: req.body.user.name,
        };
        res.status(200).json(user);
    }
    catch (e) {
        next(e);
    }
};
exports.getMe = getMe;
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, config_1.config.JWT_SECRET, {
        expiresIn: "30d",
    });
};
