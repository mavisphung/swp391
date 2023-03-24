import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7179/api",
});

api.interceptors.request.use(
  (config) => {
    console.log("REQUEST", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
