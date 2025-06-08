import axios from "axios";
import { LoginUser} from '../types/userTypes';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Función para iniciar sesión
export const loginUser = async (credentials: LoginUser) => {
  try {
    const response = await api.post('/login', credentials);
    return {
      success: true,
      message: 'Login successful',
      data: response.data.access_token,  // Tipar correctamente los datos recibidos
    };
  } catch (error) {
    // Manejo de errores
      console.error(error)
  }
};

export default api;
