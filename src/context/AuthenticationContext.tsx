import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/authService";
import { User, AuthContextType, role } from "@/types/userTypes";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<role | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Verifica si el usuario tiene sesión activa y obtiene sus datos
  const fetchProfile = async () => {
    try {
      const res = await api.get("/protected");
      const userData = res.data.logged_in_as;

      if (userData) {
        setUser(userData);
        setRole(userData.role);
        setName(userData.fullname);
        console.log("Sesión activa. Usuario:", userData);
        return { success: true, role: userData.role };
      } else {
        console.warn("No se encontraron datos de usuario.");
        setUser(null);
        setRole(null);
        setName(null);
        return { success: false, message: "Datos de usuario no encontrados." };
      }
    } catch (error) {
      console.error("Error al verificar sesión:", error);
      setUser(null);
      setRole(null);
      setName(null);
      return { success: false, message: "Sesión inválida o expirada." };
    }
  };

  // Verificación automática al iniciar la app (recarga o F5)
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await fetchProfile();
      setIsLoading(false);
    };
    initAuth();
  }, []);

  // Login con manejo de cookies HttpOnly
  const login = async (credentials: { identification: string; password: string }) => {
    setIsLoading(true);
    try {
      const loginResponse = await api.post("/login", credentials);
      console.log("Login exitoso:", loginResponse.data);

      const protectedCheckResult = await fetchProfile();
      if (protectedCheckResult.success) {
        return { success: true, role: protectedCheckResult.role };
      } else {
        return {
          success: false,
          message: protectedCheckResult.message || "No se pudo cargar el perfil.",
        };
      }
    } catch (error: any) {
      console.error("Error en login:", error);
      setUser(null);
      setRole(null);
      setName(null);

      let errorMessage = "Error inesperado durante el login.";
      if (error.response) {
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 401) {
          errorMessage = "Credenciales incorrectas.";
        } else {
          errorMessage = `Error del servidor: ${error.response.status}`;
        }
      } else if (error.request) {
        errorMessage = "Sin respuesta del servidor.";
      } else {
        errorMessage = error.message;
      }

      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout: destruye la cookie y resetea estado
  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post("/logout");
      setUser(null);
      setRole(null);
      setName(null);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, role, name, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};