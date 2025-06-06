import axios from "axios";
import { LoginUser} from '../types/userTypes';

const api = axios.create({
  baseURL: import.meta.env?.VITE_API_BASE_URL,
  withCredentials: true,
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



// // Función para registrar un usuario
// export const registerUser = async (newUser: RegisterUser): Promise<ApiResponse<User>> => {
//   try {
//     const response = await api.post('/auth/register', newUser);
//     return {
//       success: true,
//       message: 'Registration successful',
//       data: response.data.user as User,  // Tipar correctamente los datos recibidos
//     };
//   } catch (error) {
//     // Manejo de errores
//     return {
//       success: false,
//       message: error.response?.data?.message || 'Registration failed',
//       data: null,
//     };
//   }
// };

// // Función para obtener los datos del perfil del usuario
// export const fetchUserProfile = async (token: string): Promise<ApiResponse<User>> => {
//   try {
//     const response = await api.get('/auth/profile', {
//       headers: {
//         Authorization: `Bearer ${token}`,  // Enviar token de autenticación
//       },
//     });
//     return {
//       success: true,
//       message: 'User profile fetched successfully',
//       data: response.data.user as User,
//     };
//   } catch (error) {
//     // Manejo de errores
//     return {
//       success: false,
//       message: error.response?.data?.message || 'Failed to fetch user profile',
//       data: null,
//     };
//   }
// };
