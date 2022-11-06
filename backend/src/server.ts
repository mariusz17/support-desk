import express from "express";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorMiddleware";
import { connectDB, config } from "./config/config";
import "colors";

// Connect to database
connectDB();

const PORT = config.PORT;

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
