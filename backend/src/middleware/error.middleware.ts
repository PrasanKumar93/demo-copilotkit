import type { Request, Response, NextFunction } from "express";
import { ENV } from "../config/env.js";
import type { ApiResponse } from "../types/index.js";

/**
 * Custom error class for API errors
 */
class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Global error handling middleware
 */
const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;

  console.error(`[ERROR] ${err.name}: ${err.message}`, {
    stack: err.stack,
    statusCode,
  });

  const message = ENV.IS_PRODUCTION ? "Internal server error" : err.message;
  const response: ApiResponse = {
    success: false,
    error: message,
  };
  res.status(statusCode).json(response);
};

/**
 * 404 Not Found handler
 */
const notFoundHandler = (_req: Request, res: Response): void => {
  const response: ApiResponse = {
    success: false,
    error: "Route not found",
  };
  res.status(404).json(response);
};

export { ApiError, errorHandler, notFoundHandler };
