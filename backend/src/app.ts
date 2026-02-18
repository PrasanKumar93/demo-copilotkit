import express from "express";
import cors from "cors";
import helmet from "helmet";

import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";
import routes from "./routes/index.js";
import { handleCopilotKit } from "./copilotkit.js";

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

app.use("/copilotkit", async (req, res, next) => {
  console.log("[CopilotKit] Incoming request:", {
    method: req.method,
    body: req.body,
    path: req.path,
    url: req.originalUrl,
    contentType: req.headers["content-type"],
    timestamp: new Date().toISOString(),
  });
  try {
    await handleCopilotKit(req, res);
    console.log("[CopilotKit] Request completed:", req.method, req.originalUrl);
  } catch (err) {
    console.error("[CopilotKit] Request failed:", err);
    next(err);
  }
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;
