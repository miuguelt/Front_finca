import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Esto es crucial para enviar cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      try {
        const refreshResponse = await axios.post('/refresh', {}, { withCredentials: true });
        document.cookie = `access_token_cookie=${refreshResponse.data.access_token}; Path=/; Domain=isladigital.xyz; Secure; HttpOnly; SameSite=None`;
        error.config._retry = true;
        return axios(error.config);
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;