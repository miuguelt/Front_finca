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
  const [role, setRole] = useState<role | null>(null); // Usar el tipo 'role'
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Función para traer el perfil del usuario (usada en useEffect y login)
  const fetchProfile = async () => {
    try {
      const res = await api.get("/protected");
      // <<<<<<<<<<<<<<<< CAMBIO CLAVE AQUÍ >>>>>>>>>>>>>>>>>>
      // El objeto de usuario viene anidado en 'logged_in_as'
      const userData = res.data.logged_in_as; 
      
      if (userData) { // Asegurarse de que userData no sea null/undefined
        setUser(userData);
        setRole(userData.role); // Asumiendo que 'role' está en el objeto userData
        setName(userData.fullname); // Asumiendo que 'fullname' está en el objeto userData
        console.log("fetchProfile exitoso. Usuario:", userData);
        return { success: true, role: userData.role }; // Retornar para el login
      } else {
        console.warn("fetchProfile: No se encontraron datos de usuario en la respuesta protegida.");
        setUser(null);
        setRole(null);
        setName(null);
        return { success: false, message: "Datos de usuario no encontrados." };
      }
    } catch (error) {
      console.error("Error en fetchProfile (verificación de sesión):", error);
      setUser(null);
      setRole(null);
      setName(null);
      // Opcional: Si el error es 401, redirigir al login
      // if (error.response && error.response.status === 401) {
      //   navigate("/login?session=expired", { replace: true });
      // }
      return { success: false, message: "Error al verificar la sesión." };
    }
  };

  // Traer perfil usuario al montar componente para validar sesión inicial
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await fetchProfile(); // Intenta cargar el perfil si hay cookies existentes
      setIsLoading(false); // Deja de cargar una vez que fetchProfile haya terminado
    };
    initAuth();
  }, []); // Se ejecuta solo una vez al montar

  // Login: envía credenciales, espera cookie, luego pide perfil
  const login = async (credentials: { identification: string; password: string }) => {
    setIsLoading(true);
    try {
      // 1. Envía credenciales al backend (el backend establecerá las cookies)
      const loginResponse = await api.post("/login", credentials); 
      console.log("Respuesta del backend a /login:", loginResponse.data);

      // 2. Inmediatamente después, intenta acceder a una ruta protegida
      // para obtener los detalles del usuario, confiando en que el navegador
      // ya ha enviado las cookies HttpOnly recién establecidas.
      const protectedCheckResult = await fetchProfile(); // Reutilizamos fetchProfile
      
      if (protectedCheckResult.success) {
        console.log("Login exitoso y perfil cargado.");
        return { success: true, role: protectedCheckResult.role };
      } else {
        // Si el login fue exitoso en el backend pero fetchProfile falló (ej. cookie no enviada o invalidada)
        console.error("Login exitoso, pero fallo al cargar el perfil después.");
        return { success: false, message: protectedCheckResult.message || "Fallo al cargar el perfil de usuario." };
      }

    } catch (error: any) {
      console.error("Error durante el proceso de login:", error.response?.data || error.message);
      setUser(null);
      setRole(null);
      setName(null);

      let errorMessage = "Error inesperado durante el login.";
      if (error.response) {
        // Manejar errores de respuesta del servidor (ej. 401, 400)
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 401) {
          errorMessage = "Credenciales incorrectas.";
        } else {
          errorMessage = `Error del servidor: ${error.response.status}`;
        }
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        errorMessage = "No se recibió respuesta del servidor. Verifica tu conexión.";
      } else {
        // Algo pasó al configurar la petición
        errorMessage = error.message;
      }
      return { success: false, message: errorMessage };
    } finally {
      // No establecer setIsLoading(false) aquí si fetchProfile ya lo hace.
      // Lo establecemos en el initAuth en useEffect.
      // En el login, fetchProfile se encarga de cambiar isLoading.
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post("/logout"); // El backend eliminará las cookies
      setUser(null);
      setRole(null);
      setName(null);
      navigate("/login", { replace: true }); // Redirige y limpia historial
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