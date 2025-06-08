// src/types/userTypes.ts

// Definición del tipo 'role' como una unión de literales de cadena.
// Esto asegura que 'role' solo pueda tener uno de estos valores predefinidos.
export type role = "Administrador" | "Instructor" | "Aprendiz";

// Definición del tipo para el estado (activo/inactivo)
// He creado un nuevo tipo 'statusType' para mayor claridad y control.
// Puedes ajustar los valores literales ('activo', 'inactivo') según lo que use tu backend.
export type statusType = boolean | "Activo" | "Inactivo"; // Ejemplo: puedes usar boolean o string literales

// Definición de la interfaz User
// Asegúrate de que esta interfaz coincide con la estructura de tu objeto de usuario del backend
export interface User {
  id?: number; // 'id' puede ser opcional si el backend lo asigna.
  identification: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  role: role; // Utiliza el tipo 'role' definido anteriormente
  password?: string; // La contraseña es opcional aquí si no la envías/recibes en cada carga de usuario.
  status: statusType; // Utiliza el tipo 'statusType'
}

// Definición de la interfaz AuthContextType
export type AuthContextType = {
  user: User | null;
  // El tipo de retorno de 'login' ahora refleja los tipos definidos.
  // Añadimos 'role?: role' para mantener la consistencia del tipo 'role'.
  login: (credentials: { identification: string; password: string }) => Promise<{ success: boolean; message?: string; role?: role }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  role: role | null; // <-- CORRECCIÓN: Usando el tipo 'role' definido.
  name: string | null;
  isLoading: boolean;
};

// Definición de los tipos de datos usados en el login
export interface LoginUser {
  identification: string;
  password: string;
}

// Definición de los tipos de respuesta del servidor (genérico)
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T; // 'T' será el tipo de los datos contenidos en la respuesta (ej. User)
}