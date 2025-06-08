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

// Instancia separada para refresh (también con cookies)
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
  resolve: (value?: any) => void;
  reject: (err: any) => void;
}> = [];

function processQueue(error: any) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedQueue = [];
}

function redirectToLogin() {
  isRefreshing = false;
  failedQueue = [];
  
  if (!window.location.pathname.includes('/login')) {
    window.location.href = "/login?expired=true";
  }
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    console.log('Interceptor error:', {
      status: error.response?.status,
      url: originalRequest.url,
      message: error.response?.data?.msg || error.message,
      retry: originalRequest._retry
    });
    
    // Solo manejar errores 401 y evitar requests ya procesados
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Si es una petición a /refresh que falló, redirigir directamente
    if (originalRequest.url?.includes('/refresh')) {
      console.log('Refresh endpoint failed, redirecting to login');
      redirectToLogin();
      return Promise.reject(error);
    }

    // Si ya estamos refrescando el token, agregar a la cola
    if (isRefreshing) {
      console.log('Already refreshing, adding to queue');
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(api(originalRequest)),
          reject
        });
      });
    }

    // Marcar request como reintentado y comenzar refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      console.log('Attempting token refresh...');
      
      // Solo hacer POST a /refresh, las cookies se envían automáticamente
      const refreshResponse = await refreshApi.post("/refresh");
      
      console.log('Refresh response:', refreshResponse.status);
      
      // Con cookies, no necesitamos manejar tokens manualmente
      // El backend debería actualizar las cookies automáticamente
      
      // Procesar cola de peticiones pendientes
      processQueue(null);
      
      // Reintentar petición original
      console.log('Retrying original request');
      return api(originalRequest);

    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      
      // Verificar si es un error de red o del servidor
      if (axios.isAxiosError(refreshError) && refreshError.response?.status === 401) {
        console.log('Refresh token expired, redirecting to login');
      } else {
        console.log('Network or server error during refresh');
      }
      
      processQueue(refreshError);
      redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;