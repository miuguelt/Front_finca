import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import { role } from "@/types/userTypes";

interface ProtectedRouteProps {
  allowedRoles: role[];
  children: JSX.Element;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user && allowedRoles.includes(user.role)) {
    return children;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default ProtectedRoute;