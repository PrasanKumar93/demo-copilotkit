import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const CURR_NODE_ENV = process.env.NODE_ENV || "development";

const ENV = {
  // Server
  PORT: parseInt(process.env.PORT || "3001", 10),
  LANGGRAPH_DEPLOYMENT_URL:
    process.env.LANGGRAPH_DEPLOYMENT_URL || "http://localhost:2024",
  LANGSMITH_API_KEY: process.env.LANGSMITH_API_KEY || "",
  NODE_ENV: CURR_NODE_ENV,

  // MongoDB
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/demoNextNodeDb",
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "demoNextNodeDb",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",

  // Derived
  IS_PRODUCTION: CURR_NODE_ENV === "production",
  IS_DEVELOPMENT: CURR_NODE_ENV === "development",
  IS_TEST: CURR_NODE_ENV === "test",
} as const;

type Env = typeof ENV;

export { ENV, Env };
