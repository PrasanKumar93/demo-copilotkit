import type { Request, Response, NextFunction } from "express";

// Standard API Response
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Express middleware type
type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

// MongoDB document with _id
interface WithId {
  _id?: string;
}

// Health check response
interface HealthCheckResponse {
  status: "ok" | "error";
  timestamp: string;
  uptime: number;
  mongodb?: "connected" | "disconnected";
}

// Hello response
interface HelloResponse {
  message: string;
}

export {
  ApiResponse,
  AsyncHandler,
  WithId,
  HealthCheckResponse,
  HelloResponse,
};
