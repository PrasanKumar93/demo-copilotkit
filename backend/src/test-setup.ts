import dotenv from "dotenv";
import path from "path";

// Load .env.test for test environment
dotenv.config({ path: path.resolve(process.cwd(), ".env.test") });
