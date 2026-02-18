// Re-export types inferred from zod schemas (single source of truth)
import type {
  Student,
  CreateStudentInput,
  StudentAddress,
} from "@/lib/validators";

// API Response types
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

interface ApiErrorResponse {
  success: false;
  error: string;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Health check response data
interface HealthCheckData {
  status: "ok" | "error";
  timestamp: string;
  uptime: number;
  mongodb: "connected" | "disconnected";
}

// Hello response data
interface HelloData {
  message: string;
}

export type {
  Student,
  CreateStudentInput,
  StudentAddress,
  ApiSuccessResponse,
  ApiErrorResponse,
  ApiResponse,
  HealthCheckData,
  HelloData,
};
