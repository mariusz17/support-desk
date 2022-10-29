"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3030;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to support desk API" });
});
// Routes
app.use("/api/users", userRoutes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
