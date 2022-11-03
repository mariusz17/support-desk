import dotenv from "dotenv";

dotenv.config();

const envData = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

interface EnvConfig {
  NODE_ENV: string;
  PORT: string;
  MONGO_URI: string;
  JWT_SECRET: string;
}

for (const [key, value] of Object.entries(envData)) {
  if (typeof value !== "string") {
    throw new Error(`Missing key ${key} in env file.`);
  }
}

const envConfig = envData as EnvConfig;

export default envConfig;
