import axios from "axios";
import { __BASEURL__ } from "lib/constants/baseurl";

// Fallback to local if constant is missing or undefined
const API_BASE_URL = __BASEURL__;

export const api_client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

api_client.interceptors.response.use(
  (response) => {
    // Basic validation: Ensure response exists and has data
    if (!response || !response.data) {
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
    return Promise.reject({
      status: {
        success: false,
        code: error.response?.status || 500,
        message: error_message
      },
      data: null,
      error: error
    });
  }
);
