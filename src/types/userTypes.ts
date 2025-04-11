export type role = "Administrador" | "Instructor" | "Aprendiz";
// Mateo hacer el export para agregar el activo e inactivo

export interface User {
  id?: number ;
  identification: number | string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  role: role;
  password: string;
  status: boolean | string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  role: string | null;
  name: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Definición de los tipos de datos usados en el login
export interface LoginUser {
  identification: number;
  password: string;
}

// Definición de los tipos de respuesta del servidor
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

