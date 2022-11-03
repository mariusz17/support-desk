"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./env"));
const connectDB = async () => {
    try {
        const mongoConnection = await mongoose_1.default.connect(env_1.default.MONGO_URI);
        console.log(`Mongo DB connected: ${mongoConnection.connection.host}`.cyan);
    }
    catch (error) {
        console.log(`Error connecting to Mongo DB: ${error.message}`.red);
        process.exit(1);
    }
};
exports.default = connectDB;
