import axios from "axios";
import { __BASEURL__ } from "lib/constants/baseurl";

// Fallback to local if constant is missing or undefined
const API_BASE_URL = __BASEURL__;

export class ApiError extends Error {
  status: {
    success: boolean;
    code: number;
    message: string;
  };
  data: any;
  error: any;

  constructor(message: string, code: number, error: any) {
    super(message);
    this.name = "ApiError";
    this.status = {
      success: false,
      code: code,
      message: message,
    };
    this.data = null;
    this.error = error;
  }
}

export const api_client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Reduced from 60s for better responsiveness
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest", // Helps prevent CSRF in some backend setups
  },
  withCredentials: true, // If cookies are used for session/CSRF later
});

api_client.interceptors.request.use(
  (config) => {
    // Ensure all requests are over HTTPS in production if baseURL is external
    if (import.meta.env.PROD && config.baseURL?.startsWith("http://")) {
      config.baseURL = config.baseURL.replace("http://", "https://");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api_client.interceptors.response.use(
  (response) => {
    // Basic validation: Ensure response exists and has data
    if (!response?.data) {
      console.warn("API returned an empty response body");
      return { status: { success: false, message: "Empty response" }, data: null };
    }
    return response.data;
  },
  (error) => {
    const error_message = error.response?.data?.status?.message || 
                         error.message || 
                         "An unexpected network error occurred";
    
    console.error("API Resilience Error:", {
      message: error_message,
      url: error.config?.url,
      status: error.response?.status
    });

    // Normalize error response so the app doesn't crash
    return Promise.reject(
      new ApiError(
        error_message,
        error.response?.status || 500,
        error
      )
    );
  }
);
