"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri)
            throw new Error("Could not read Mongo URI from env file.");
        const mongoConnection = await mongoose_1.default.connect(mongoUri);
        console.log(`Mongo DB connected: ${mongoConnection.connection.host}`.cyan);
    }
    catch (error) {
        console.log(`Error connecting to Mongo DB: ${error.message}`.red);
        process.exit(1);
    }
};
exports.default = connectDB;
