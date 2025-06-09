import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import { role } from "@/types/userTypes"; // Asegúrate de importar el tipo 'role'
// Opcional: Si quieres un spinner más visual
// import { ClimbingBoxLoader } from "react-spinners"; 

interface ProtectedRouteProps {
  allowedRoles: role[];
  children: JSX.Element;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  // <<<<<<<<<<<<<<<< ESTE ES EL CAMBIO CLAVE >>>>>>>>>>>>>>>>>>
  // Ahora también obtenemos 'isLoading' del hook useAuth
  const { isAuthenticated, user, isLoading } = useAuth(); 

  // Paso 1: Si la autenticación está en curso (isLoading es true),
  // mostramos un indicador de carga. Esto EVITA la redirección prematura.
  if (isLoading) {
    // Puedes personalizar este return para mostrar un spinner real
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Cargando sesión...</p>
        {/* Ejemplo con un spinner (requiere la importación de react-spinners) */}
        {/* <ClimbingBoxLoader color="#10B981" loading={true} size={15} /> */}
      </div>
    );
  }

  // Paso 2: Una vez que isLoading es false, verificamos si está autenticado.
  // Si no lo está (porque fetchProfile falló o no encontró cookies válidas),
  // entonces redirigimos al login.
  if (!isAuthenticated) {
    console.log("ProtectedRoute: No autenticado después de la carga inicial. Redirigiendo a /login.");
    // Pasar el estado 'from' para que el usuario pueda volver a la página que intentaba acceder
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  // Paso 3: Si está autenticado, verificamos el rol.
  if (user && allowedRoles.includes(user.role)) {
    console.log("ProtectedRoute: Autenticado y rol permitido. Renderizando hijos.");
    return children;
  } else {
    // Paso 4: Autenticado pero rol no permitido, redirige a no autorizado.
    console.log("ProtectedRoute: Autenticado pero rol NO permitido. Redirigiendo a /unauthorized.");
    return <Navigate to="/unauthorized" replace />;
  }
};

export default ProtectedRoute;
