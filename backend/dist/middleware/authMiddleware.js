"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const config_1 = require("../config/config");
const protect = async (req, res, next) => {
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            // Get token from header
            const token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded = jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET);
            // Get user from token
            const user = await userModel_1.default.findById(decoded.id).select("-password");
            // Check if user is found
            if (user === null) {
                throw new Error("User not found");
            }
            req.body.user = user;
            next();
        }
        else {
            throw new Error("Token not found");
        }
    }
    catch (e) {
        console.log(e);
        res.status(401);
        next(new Error("Not authorized"));
    }
};
exports.default = protect;
