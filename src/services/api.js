import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Attach Basic Auth header on every request if credentials are stored
api.interceptors.request.use((config) => {
  const credentials = localStorage.getItem("auth");
  if (credentials) {
    config.headers.Authorization = `Basic ${credentials}`;
  }
  return config;
});

export default api;
