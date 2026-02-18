import express from "express";
import cors from "cors";
import helmet from "helmet";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";
import routes from "./routes/index.js";

// Create Express app
const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", routes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;
