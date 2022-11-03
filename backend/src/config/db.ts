import mongoose from "mongoose";
import env from "./env";

const connectDB = async () => {
  try {
    const mongoConnection = await mongoose.connect(env.MONGO_URI);

    console.log(`Mongo DB connected: ${mongoConnection.connection.host}`.cyan);
  } catch (error) {
    console.log(
      `Error connecting to Mongo DB: ${(error as Error).message}`.red
    );
    process.exit(1);
  }
};

export default connectDB;
