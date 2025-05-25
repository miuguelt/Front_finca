import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [name, setName] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            const decodedToken = jwtDecode(storedToken);
            setUser(decodedToken.sub);
            setRole(decodedToken.sub.role);
            setName(decodedToken.sub.fullname);
        }
    }, []);
    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        const decodedToken = jwtDecode(newToken);
        setUser(decodedToken.sub);
        navigateBasedOnRole(decodedToken.sub.role);
        setRole(decodedToken.sub.role);
        setName(decodedToken.sub.fullname);
    };
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setRole(null);
        setName(null);
        navigate("/login");
    };
    const navigateBasedOnRole = (role) => {
        if (role === "Administrador") {
            navigate("/admin");
        }
        else if (role === "Instructor") {
            navigate("/instructor");
        }
        else if (role === "Aprendiz") {
            navigate("/apprentice");
        }
        else {
            navigate("/unauthorized");
        }
    };
    const isAuthenticated = !!localStorage.getItem("token");
    return (_jsx(AuthContext.Provider, { value: { user, token, login, logout, isAuthenticated, role, name }, children: children }));
};
