import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const PORT = process.env.PORT || 3030;

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to support desk API" });
});

// Routes
app.use("/api/users", userRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
