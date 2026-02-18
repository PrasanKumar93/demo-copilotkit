import { isConnected } from "../utils/mongodb/index.js";
import type { HelloResponse, HealthCheckResponse } from "../types/index.js";

/**
 * Returns a Hello World message
 * @param _input - Request body (unused)
 */
const getHello = (_input: unknown): HelloResponse => {
  return {
    message: "Hello World",
  };
};

/**
 * Returns server health status
 * @param _input - Request body (unused)
 */
const getHealth = (_input: unknown): HealthCheckResponse => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: isConnected() ? "connected" : "disconnected",
  };
};

export { getHello, getHealth };

