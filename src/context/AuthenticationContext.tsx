// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/authService";
import { User } from "@/types/userTypes";

interface AuthContextType {
  user: User | null;
  role: string | null;
  name: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { identification: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar estado de autenticación al cargar
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Pequeña pausa para asegurar cookies
  
        const res = await api.get("/protected");
        const userData = res.data.logged_in_as;
        console.log(res)
        console.log("Usuario autenticado:", userData);
        if (userData) {
          setUser(userData);
          setRole(userData.role);
          setName(userData.fullname);
        }
      } catch (error) {
        console.log(error)
        console.error("Error verificando autenticación:", error);
        setUser(null);
        setRole(null);
        setName(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  // Función de inicio de sesión
  const login = async (credentials: { identification: string; password: string }) => {
  setIsLoading(true);
  try {
    
    const resp = await api.post('/login', credentials);
    console.log("------------------------Respuesta del login:---------", resp);
    const res = await api.get('/protected');
    console.log("Datos protegidos:", res.data);
    const userData = res.data.logged_in_as;
    console.log("--------------Datos protegidos:-------------------", userData);
    if (userData) {
      console.log("User found, navigating by role:-----------------------------", userData.role);
      setUser(userData);
      setRole(userData.role);
      setName(userData.fullname);
      navigateBasedOnRole(userData.role);
    } else {
      throw new Error("No se recibieron datos de usuario válidos");
    }
  } catch (error) {
    console.error("Login failed", error);
    setUser(null);
    setRole(null);
    setName(null);

    if (typeof error === "object" && error !== null && "message" in error && typeof (error as any).message === "string" && (error as any).message.includes("Token has expired")) {
      navigate('/login?session=expired');
    } else {
      throw error;
    }
  } finally {
    setIsLoading(false);
  }
};


  // Función de cierre de sesión
  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post('/logout');
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      setRole(null);
      setName(null);
      navigate("/login");
      setIsLoading(false);
    }
  };

  // Redirección basada en rol
  const navigateBasedOnRole = (role: string) => {
    if (role === "Administrador") navigate("/admin");
    else if (role === "Instructor") navigate("/instructor");
    else if (role === "Aprendiz") navigate("/apprentice");
    else navigate("/unauthorized");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        role, 
        name, 
        isLoading, 
        isAuthenticated, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};