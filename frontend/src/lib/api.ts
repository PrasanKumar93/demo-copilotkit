import type {
  ApiResponse,
  Student,
  CreateStudentInput,
  HealthCheckData,
  HelloData,
} from "@/types";

// API base URL - defaults to localhost:3000 for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const COPILOTKIT_BASE_URL = `${API_BASE_URL}/copilotkit`;

// Custom error class for API errors
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: ApiResponse<unknown>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Request options type
interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

/**
 * Generic fetch wrapper with error handling
 * @param endpoint - API endpoint (e.g., "/api/hello")
 * @param options - Fetch options including method, headers, body
 * @returns Promise with typed data
 */
const fetchApi = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  const { body, headers, ...restOptions } = options;

  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Add body if present
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const data: ApiResponse<T> = await response.json();

    // Check for API-level errors
    if (!data.success) {
      throw new ApiError(
        data.error,
        response.status,
        data as ApiResponse<unknown>,
      );
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching API:", error);

    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network or parsing errors
    if (error instanceof Error) {
      throw new ApiError(error.message, 0);
    }

    throw new ApiError("An unknown error occurred", 0);
  }
};

/**
 * POST request wrapper
 * @param endpoint - API endpoint (e.g., "/api/hello")
 * @param body - Request body (defaults to empty object)
 * @returns Promise with typed data
 */
const postApi = async <T>(endpoint: string, body: unknown = {}): Promise<T> => {
  return fetchApi<T>(endpoint, {
    method: "POST",
    body,
  });
};

// ============================================
// API Methods
// ============================================

/**
 * Health check endpoint
 */
const checkHealth = async (): Promise<HealthCheckData> => {
  return postApi<HealthCheckData>("/api/health");
};

/**
 * Hello world endpoint
 */
const getHello = async (): Promise<HelloData> => {
  return postApi<HelloData>("/api/hello");
};

/**
 * Get all students
 */
const getAllStudents = async (): Promise<Student[]> => {
  return postApi<Student[]>("/api/getAllStudents");
};

/**
 * Create a new student
 */
const createStudent = async (student: CreateStudentInput): Promise<Student> => {
  return postApi<Student>("/api/createStudent", student);
};

export {
  COPILOTKIT_BASE_URL,
  ApiError,
  fetchApi,
  postApi,
  checkHealth,
  getHello,
  getAllStudents,
  createStudent,
};
