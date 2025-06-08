import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/authService";
import { User, AuthContextType } from "@/types/userTypes";
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Traer perfil usuario al montar componente para validar sesión
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/protected");
        const data = res.data; // Ajustar si backend devuelve { success, data }
        setUser(data);
        setRole(data.role);
        setName(data.fullname);
      } catch (error) {
        console.error("Error al verificar sesión:", error);
        setUser(null);
        setRole(null);
        setName(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Login: envía credenciales, espera cookie, luego pide perfil
  // Ya NO navega aquí
  const login = async (credentials: { identification: string; password: string }) => {
    setIsLoading(true);
    try {
      await api.post("/login", credentials); // backend envía cookies HttpOnly
      const res = await api.get("/protected"); // fetch perfil con cookies
      const data = res.data; // Ajustar si backend devuelve { success, data }
      setUser(data);
      setRole(data.role);
      setName(data.fullname);
      return { success: true, role: data.role };
    } catch (error) {
      console.error("Error en login:", error);
      setUser(null);
      setRole(null);
      setName(null);
      return { success: false, message: "Credenciales inválidas" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post("/logout"); // backend elimina cookies
      setUser(null);
      setRole(null);
      setName(null);
      navigate("/login");
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
