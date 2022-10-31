import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorMiddleware";
import connectDB from "./config/db";

dotenv.config();

// Connect to database
connectDB();

const PORT = process.env.PORT || 3030;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to support desk API" });
});

// Routes
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
