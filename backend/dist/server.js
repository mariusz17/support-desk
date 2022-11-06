"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const config_1 = require("./config/config");
require("colors");
// Connect to database
(0, config_1.connectDB)();
const PORT = config_1.config.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to support desk API" });
});
// Routes
app.use("/api/users", userRoutes_1.default);
app.use(errorMiddleware_1.default);
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
