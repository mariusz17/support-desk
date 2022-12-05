import express from "express";
import path from "path";
import userRoutes from "./routes/userRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import errorHandler from "./middleware/errorMiddleware";
import { connectDB, config } from "./config/config";
import "colors";

// Connect to database
connectDB();

const PORT = config.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

if (config.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/build/")));
  app.get("*", (req, res) => {
    res.sendFile("index.html");
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to support desk API" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
