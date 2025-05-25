import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
const ProtectedRoute = ({ allowedRoles, children }) => {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login" });
    }
    if (user && allowedRoles.includes(user.role)) {
        return children;
    }
    else {
        return _jsx(Navigate, { to: "/unauthorized" });
    }
};
export default ProtectedRoute;
