export type role = "Administrador" | "Instructor" | "Aprendiz";
// Mateo hacer el export para agregar el activo e inactivo

export interface User {
  id?: number ;
  identification: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  role: role;
  password: string;
  status: boolean | string;
}

export type AuthContextType = {
  user: User | null;
  login: (credentials: { identification: string; password: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  role: string | null;
  name: string | null;
  isLoading: boolean;
};

// Definición de los tipos de datos usados en el login
export interface LoginUser {
  identification: string;
  password: string;
}

// Definición de los tipos de respuesta del servidor
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

