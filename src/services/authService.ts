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

// Instancia separada para refresh sin interceptores
const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
}

function redirectToLogin() {
  // Limpiar estado
  isRefreshing = false;
  failedQueue = [];
  delete api.defaults.headers.common['Authorization'];
  
  // Redirigir solo si no estamos ya en login
  if (!window.location.pathname.includes('/login')) {
    window.location.href = "/login?expired=true";
  }
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Solo manejar errores 401 y evitar requests ya procesados
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Si es una petición a /refresh que falló, redirigir directamente
    if (originalRequest.url?.includes('/refresh')) {
      redirectToLogin();
      return Promise.reject(error);
    }

    // Si ya estamos refrescando el token, agregar a la cola
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ 
          resolve: (token: string) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(api(originalRequest));
          }, 
          reject 
        });
      });
    }

    // Marcar request como reintentado y comenzar refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      console.log('Attempting token refresh...');
      const refreshResponse = await refreshApi.post("/refresh");
      
      if (!refreshResponse.data?.accessToken) {
        throw new Error('No access token received');
      }

      const newToken = refreshResponse.data.accessToken;
      console.log('Token refreshed successfully');
      
      // Actualizar headers
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

      // Procesar cola de peticiones pendientes
      processQueue(null, newToken);

      // Reintentar petición original
      return api(originalRequest);

    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      processQueue(refreshError, null);
      redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;