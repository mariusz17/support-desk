"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
// Connect to database
(0, db_1.default)();
const PORT = process.env.PORT || 3030;
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
