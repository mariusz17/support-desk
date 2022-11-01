import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) throw new Error("Could not read Mongo URI from env file.");

    const mongoConnection = await mongoose.connect(mongoUri);

    console.log(`Mongo DB connected: ${mongoConnection.connection.host}`.cyan);
  } catch (error) {
    console.log(
      `Error connecting to Mongo DB: ${(error as Error).message}`.red
    );
    process.exit(1);
  }
};

export default connectDB;
