import express from "express";
import cors from "cors";
import helmet from "helmet";

import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";
import routes from "./routes/index.js";
import { handleCopilotKit } from "./copilotkit.js";
import { COPILOTKIT_ENDPOINT } from "./constants/general.js";
import { handleCopilotKitLanggraph } from "./agent/copilotkit-langgraph.js";

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

app.use(COPILOTKIT_ENDPOINT, async (req, res, next) => {
  // Express sets req.url to the path after the mount ("/" for /copilotkit).
  // CopilotKit's handler builds the request URL from req.url; its Hono app has basePath(COPILOTKIT_ENDPOINT)
  // and only matches when the path starts with that. Restore the full path so the handler can route.
  req.url = COPILOTKIT_ENDPOINT + (req.url === "/" ? "" : req.url);

  console.log("[CopilotKit] Incoming request:", {
    method: req.method,
    body: req.body,
    path: req.path,
    url: req.originalUrl,
    contentType: req.headers["content-type"],
    timestamp: new Date().toISOString(),
  });
  try {
    let test = 2;
    if (test === 1) {
      await handleCopilotKit(req, res);
    } else {
      await handleCopilotKitLanggraph(req, res);
    }
    //await handleCopilotKitLanggraph(req, res);
  } catch (err) {
    next(err);
  }
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;
