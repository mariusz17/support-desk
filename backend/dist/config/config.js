"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.config = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
require("colors");
dotenv_1.default.config();
// Config from .env file
const envData = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
};
for (const [key, value] of Object.entries(envData)) {
    if (typeof value !== "string") {
        throw new Error(`Missing key ${key} in env file.`);
    }
}
exports.config = envData;
// Database config
const connectDB = async () => {
    try {
        const mongoConnection = await mongoose_1.default.connect(exports.config.MONGO_URI);
        console.log(`Mongo DB connected: ${mongoConnection.connection.host}`.cyan);
    }
    catch (error) {
        console.log(`Error connecting to Mongo DB: ${error.message}`.red);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
