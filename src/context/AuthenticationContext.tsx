
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { User, AuthContextType } from "@/types/userTypes"; // Importar los tipos

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode<{ sub: User }>(storedToken);
      setUser(decodedToken.sub);
      setRole(decodedToken.sub.role)
      setName(decodedToken.sub.fullname)
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    const decodedToken = jwtDecode<{ sub: User }>(newToken);
    setUser(decodedToken.sub);
    navigateBasedOnRole(decodedToken.sub.role);
    setRole(decodedToken.sub.role)
    setName(decodedToken.sub.fullname)
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setRole(null)
    setName(null)
    navigate("/login");
  };

  const navigateBasedOnRole = (role: string) => {
    if (role === "Administrador") {
      navigate("/admin");
    } else if (role === "Instructor") {
      navigate("/instructor");
    } else if (role === "Aprendiz") {
      navigate("/apprentice");
    } else {
      navigate("/unauthorized");
    }
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated, role, name }}
    >
      {children}
    </AuthContext.Provider>
  );
};