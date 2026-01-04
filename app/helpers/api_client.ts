import axios from "axios";
import { __BASEURL__ } from "lib/constants/baseurl";

const API_BASE_URL = __BASEURL__;

export const api_client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api_client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
