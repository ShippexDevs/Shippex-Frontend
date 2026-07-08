import axios from "axios";
import { API_BASE_URL } from "../config/env";
import { getToken } from "../utils/tokenStorage";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(

  (config) => {

    const token = getToken();

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  }

);

export default axiosClient;