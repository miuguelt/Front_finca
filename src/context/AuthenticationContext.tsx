// src/context/AuthenticationContext.tsx
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { User, AuthContextType } from "@/types/userTypes";
import api from "@/services/authService";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/protected"); // 👈 usa api.get
        const data = res.data;
        setUser(data);
        setRole(data.role);
        setName(data.fullname);
      } catch (error) {
        console.error("Error al verificar sesión:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const login = async (credentials: { identification: string; password: string }) => {
    setIsLoading(true);
    try {
      await api.post("/login", credentials); // 👈 usa api.post
      const res = await api.get("/protected");
      const data = res.data;
      setUser(data);
      setRole(data.role);
      setName(data.fullname);
      navigateBasedOnRole(data.role);
    } catch (error: any) {
      throw new Error("Credenciales inválidas");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout"); // 👈 usa api.post
      setUser(null);
      setRole(null);
      setName(null);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const navigateBasedOnRole = (role: string) => {
    if (role === "Administrador") navigate("/admin");
    else if (role === "Instructor") navigate("/instructor");
    else if (role === "Aprendiz") navigate("/apprentice");
    else navigate("/unauthorized");
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
