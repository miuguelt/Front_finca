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

  // Función para guardar los datos del usuario (no sensibles) en localStorage
  const saveUserToLocalStorage = (userData: User | null) => {
    if (userData) {
      // Clona el objeto para evitar modificar el original y elimina la contraseña si existe
      const nonSensitiveUserData = { ...userData };
      delete nonSensitiveUserData.password; 
      localStorage.setItem("user_data", JSON.stringify(nonSensitiveUserData));
      console.log("Datos de usuario guardados en localStorage.");
    } else {
      localStorage.removeItem("user_data");
      console.log("Datos de usuario eliminados de localStorage.");
    }
  };

  // Función para cargar los datos del usuario desde localStorage
  const loadUserFromLocalStorage = () => {
    try {
      const storedUserData = localStorage.getItem("user_data");
      if (storedUserData) {
        const parsedData: User = JSON.parse(storedUserData);
        setUser(parsedData);
        setRole(parsedData.role);
        setName(parsedData.fullname);
        console.log("Usuario cargado desde localStorage para pre-hidratación de UI.");
        return true; // Indica que se cargaron datos
      }
    } catch (error) {
      console.error("Error al cargar usuario de localStorage, limpiando:", error);
      localStorage.removeItem("user_data"); // Limpiar datos corruptos
    }
    return false; // No se pudieron cargar datos
  };

  // Verifica si el usuario tiene sesión activa y obtiene sus datos del backend
  const fetchProfile = async () => {
    try {
      const res = await api.get("/protected");
      const userData = res.data.logged_in_as; // Asume que 'logged_in_as' contiene el objeto User

      if (userData) {
        setUser(userData);
        setRole(userData.role);
        setName(userData.fullname);
        saveUserToLocalStorage(userData); // Guarda en localStorage tras validación del backend
        console.log("fetchProfile exitoso. Sesión activa con backend.");
        return { success: true, role: userData.role };
      } else {
        console.warn("fetchProfile: No se encontraron datos de usuario en la respuesta protegida. Limpiando sesión.");
        setUser(null);
        setRole(null);
        setName(null);
        saveUserToLocalStorage(null); // Limpia localStorage si el backend no devuelve datos
        return { success: false, message: "Datos de usuario no encontrados en el backend." };
      }
    } catch (error) {
      console.error("Error en fetchProfile (backend no valida o token expirado/inválido):", error);
      setUser(null);
      setRole(null);
      setName(null);
      saveUserToLocalStorage(null); // Limpia localStorage si la llamada protegida falla
      // Aquí podrías añadir lógica para redirigir al login si el error es de autenticación
      // if (error.response && error.response.status === 401) {
      //   navigate("/login?session=expired", { replace: true });
      // }
      return { success: false, message: "Sesión inválida o expirada en el backend." };
    }
  };

  // Verificación automática al iniciar la app (recarga o F5)
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      // Primero, intenta cargar de localStorage para una experiencia instantánea
      const loadedFromLS = loadUserFromLocalStorage();
      
      // Si no se cargó nada de localStorage, o incluso si se cargó, 
      // siempre valida la sesión con el backend (fuente de verdad).
      await fetchProfile(); 
      setIsLoading(false);
    };
    initAuth();
  }, []); // Se ejecuta solo una vez al montar la aplicación

  // Login con manejo de cookies HttpOnly
  const login = async (credentials: { identification: string; password: string }) => {
    setIsLoading(true);
    try {
      // Envía credenciales al backend (el backend establecerá las cookies HttpOnly)
      const loginResponse = await api.post("/login", credentials);
      console.log("Petición de login exitosa al backend:", loginResponse.data);

      // Inmediatamente después, intenta acceder a una ruta protegida
      // para obtener los detalles del usuario y validar la sesión con las nuevas cookies.
      const protectedCheckResult = await fetchProfile(); // Esto ya guarda en localStorage
      
      if (protectedCheckResult.success) {
        console.log("Login y carga de perfil exitosos.");
        return { success: true, role: protectedCheckResult.role };
      } else {
        // Si el login fue exitoso en el backend, pero fetchProfile falló
        console.error("Login exitoso, pero fallo al cargar el perfil después.");
        return {
          success: false,
          message: protectedCheckResult.message || "Fallo al cargar el perfil de usuario.",
        };
      }
    } catch (error: any) {
      console.error("Error durante el proceso de login:", error.response?.data || error.message);
      setUser(null);
      setRole(null);
      setName(null);
      saveUserToLocalStorage(null); // Limpiar localStorage en caso de fallo de login
      
      // Mensaje de error para el usuario
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
        errorMessage = "No se recibió respuesta del servidor. Verifica tu conexión.";
      } else {
        errorMessage = error.message;
      }
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false); // Asegurarse de que isLoading se resetee al final
    }
  };

  // Logout: solicita al backend que destruya la cookie y resetea el estado local
  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post("/logout"); // El backend eliminará las cookies HttpOnly
      setUser(null);
      setRole(null);
      setName(null);
      saveUserToLocalStorage(null); // Limpia localStorage al cerrar sesión
      navigate("/login", { replace: true }); // Redirige al login y limpia historial
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !!user; // Deriva el estado de autenticación de la existencia del objeto user

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, role, name, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};