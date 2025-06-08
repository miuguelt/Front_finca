// src/services/authService.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    console.log(err)
    console.log(err.config)

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/refresh");
        return api(originalRequest); // reintenta la solicitud original
      } catch (refreshError) {
        console.log(refreshError)
        console.error("Refresh token falló, redirigiendo al login");
        window.location.href = "/login?expired=true";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  }
);


export default api;