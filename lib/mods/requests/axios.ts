import axios from "axios";

const __BASEURL__ = "/api";

export const anikiiApi = axios.create({
  baseURL: __BASEURL__,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});
