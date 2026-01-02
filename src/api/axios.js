import axios from "axios";
import { DEMO_MODE } from "../config/demo"; // 👈 ADD THIS

const api = axios.create({
  baseURL: "http://192.168.100.33:8000/api",  //localhost:8000
});

api.interceptors.request.use(
  (config) => {

    // DEMO MODE → STOP BACKEND CALLS
    if (DEMO_MODE) {
      console.log("DEMO MODE: Backend call blocked:", config.url);

      // Reject request intentionally
      return Promise.reject({
        isDemoBlocked: true,
        message: "Demo mode: backend disabled",
        config,
      });
    }

    // REAL MODE → attach token
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🚀 Sending Token:", token);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
