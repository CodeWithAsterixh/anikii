import axios from "axios";

const __BASEURL__ = "https://ab-stream-apiv2.abrahamdw882.workers.dev/";

export const abApi = axios.create({
  baseURL: __BASEURL__,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
